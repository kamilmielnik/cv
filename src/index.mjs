import cero from '0http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import serveStatic from 'serve-static';

import { keepPdfFresh } from './pdf.mjs';
import { getClientTrackingData, getServerTrackingData, trackEvent } from './tracking.mjs';
import { formatNumberOfMonths, minify, sumTimePeriods } from './utils.mjs';

const HOST = '127.0.0.1';
const PORT = 3000;
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');
const HTML_TEMPLATE_PATH = path.join(import.meta.dirname, 'index.html');
const CSS_TEMPLATE_PATH = path.join(import.meta.dirname, 'style.css');
const TEMPLATE_PATHS = [HTML_TEMPLATE_PATH, CSS_TEMPLATE_PATH];
const IMMUTABLE_FILE_EXTENSIONS = new Set(['.woff2']);
const SITE_URL = 'https://kamilmielnik.com';
const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const PDF_FILENAME = 'KamilMielnik.pdf';
const PDF_FILEPATH = path.join(ROOT_DIR, PDF_FILENAME);
const RENDER_URL = `http://${HOST}:${PORT}`;
const VALID_TRACK_ACTIONS = new Set(['github', 'pdf', 'print', 'visit']);
const MAX_TRACK_BODY_BYTES = 1024;

const { router, server } = cero();
const lastModified = getLastModified();
const indexHtml = getIndexHtml(lastModified);
const contentSecurityPolicy = createContentSecurityPolicy(indexHtml);
const sitemapXml = renderSitemapXml(lastModified);

router.use(setSecurityHeaders);
router.use(rejectTrailingSlash);

router.get('/', sendIndexHtml);
router.head('/', sendIndexHtml);
router.get('/pdf', sendPdf);
router.head('/pdf', sendPdf);
router.get('/sitemap.xml', sendSitemapXml);
router.head('/sitemap.xml', sendSitemapXml);
router.post('/track/:action', trackAction);
router.use('/', serveStatic(PUBLIC_DIR, { maxAge: '1d', setHeaders: setStaticCacheControl }));

server.listen(PORT, HOST, () => {
  console.log(`app listening on http://${HOST}:${PORT}/`);
  keepPdfFresh(PDF_FILEPATH, RENDER_URL);
});

function setSecurityHeaders(_request, response, next) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');
  next();
}

function rejectTrailingSlash(request, response, next) {
  if (request.path.length > 1 && request.path.endsWith('/')) {
    sendStatus(response, 404);
    return;
  }

  next();
}

function sendIndexHtml(request, response) {
  try {
    const html = renderIndexHtml();
    const etag = createEtag(html);
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Security-Policy', contentSecurityPolicy);
    response.setHeader('ETag', etag);

    if (request.headers['if-none-match'] === etag) {
      response.statusCode = 304;
      response.end();
      return;
    }

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(html);
  } catch (error) {
    sendServerError(response, error);
  }
}

async function sendPdf(request, response) {
  try {
    const file = await openPdf();

    if (file === null) {
      response.setHeader('Retry-After', '10');
      sendStatus(response, 503);
      return;
    }

    try {
      await sendPdfFile(file, request, response);
    } finally {
      await file.close();
    }
  } catch (error) {
    sendServerError(response, error);
  }
}

async function openPdf() {
  try {
    return await fs.promises.open(PDF_FILEPATH);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

async function sendPdfFile(file, request, response) {
  const { size, mtime } = await file.stat();
  const lastModified = mtime.toUTCString();
  response.setHeader('Cache-Control', 'no-cache');
  response.setHeader('Last-Modified', lastModified);

  if (request.headers['if-modified-since'] === lastModified) {
    response.statusCode = 304;
    response.end();
    return;
  }

  response.setHeader('Content-Disposition', `inline; filename="${PDF_FILENAME}"`);
  response.setHeader('Content-Length', size);
  response.setHeader('Content-Type', 'application/pdf');
  response.setHeader('Link', `<${SITE_URL}/>; rel="canonical"`);

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  await pipeline(file.createReadStream({ autoClose: false }), response);
}

function sendSitemapXml(_request, response) {
  response.setHeader('Cache-Control', 'public, max-age=86400');
  response.setHeader('Content-Type', 'application/xml; charset=utf-8');
  response.end(sitemapXml);
}

async function trackAction(request, response) {
  try {
    const { action } = request.params;

    if (!VALID_TRACK_ACTIONS.has(action)) {
      sendStatus(response, 404);
      return;
    }

    if (!isSameOrigin(request)) {
      sendStatus(response, 403);
      return;
    }

    if (!isJsonRequest(request)) {
      sendStatus(response, 415);
      return;
    }

    const body = await readBody(request, MAX_TRACK_BODY_BYTES);

    if (body === null) {
      response.setHeader('Connection', 'close');
      sendStatus(response, 413);
      return;
    }

    const client = getClientTrackingData(parseJson(body));

    if (client === null) {
      sendStatus(response, 400);
      return;
    }

    await trackEvent({ action, client, server: getServerTrackingData(request) });
    response.statusCode = 204;
    response.end();
  } catch (error) {
    sendServerError(response, error);
  }
}

function getLastModified() {
  const modifiedAt = TEMPLATE_PATHS.map((filepath) => fs.statSync(filepath).mtimeMs);
  return new Date(Math.max(...modifiedAt)).toISOString().slice(0, 'YYYY-MM-DD'.length);
}

function getIndexHtml(lastModified) {
  const html = fs.readFileSync(HTML_TEMPLATE_PATH, 'utf-8');
  const css = fs.readFileSync(CSS_TEMPLATE_PATH, 'utf-8');
  const htmlWithCss = replaceOnce(html, '<style></style>', `<style>${css}</style>`);
  return minify(replaceOnce(htmlWithCss, '{{ dateModified }}', lastModified));
}

function renderIndexHtml() {
  const start = new Date(2023, 4, 15);
  const months = sumTimePeriods([{ start, end: null }]);
  return replaceOnce(indexHtml, '{{ currentPositionDuration }}', formatNumberOfMonths(months));
}

function renderSitemapXml(lastModified) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `<url><loc>${SITE_URL}/</loc><lastmod>${lastModified}</lastmod></url>`,
    '</urlset>',
  ].join('');
}

function replaceOnce(text, search, replacement) {
  if (!text.includes(search)) {
    throw new Error(`"${search}" not found`);
  }

  return text.replace(search, replacement);
}

function createContentSecurityPolicy(html) {
  return [
    "default-src 'none'",
    `script-src '${hashInlineElement(html, /<script>([^]*?)<\/script>/)}'`,
    `style-src '${hashInlineElement(html, /<style>([^]*?)<\/style>/)}'`,
    "font-src 'self'",
    "img-src 'self'",
    "connect-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; ');
}

function hashInlineElement(html, pattern) {
  const match = html.match(pattern);

  if (match === null) {
    throw new Error(`No inline element matched ${pattern}`);
  }

  return `sha256-${crypto.createHash('sha256').update(match[1]).digest('base64')}`;
}

function createEtag(content) {
  return `"${crypto.createHash('sha1').update(content).digest('base64url')}"`;
}

function setStaticCacheControl(response, filepath) {
  if (IMMUTABLE_FILE_EXTENSIONS.has(path.extname(filepath))) {
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
}

function isSameOrigin(request) {
  const { origin, host } = request.headers;
  return typeof origin === 'string' && URL.canParse(origin) && new URL(origin).host === host;
}

function isJsonRequest(request) {
  return Boolean(request.headers['content-type']?.startsWith('application/json'));
}

function readBody(request, maxBytes) {
  if (Number(request.headers['content-length']) > maxBytes) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    let bytes = 0;

    request.on('data', (chunk) => {
      bytes += chunk.length;

      if (bytes > maxBytes) {
        request.pause();
        resolve(null);
        return;
      }

      chunks.push(chunk);
    });
    request.on('end', () => resolve(Buffer.concat(chunks).toString()));
    request.on('error', reject);
  });
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function sendServerError(response, error) {
  if (isClientDisconnect(error)) {
    return;
  }

  console.error(error);

  if (response.headersSent) {
    response.destroy();
    return;
  }

  sendStatus(response, 500);
}

function isClientDisconnect(error) {
  return error.code === 'ECONNRESET' || error.code === 'ERR_STREAM_PREMATURE_CLOSE';
}

function sendStatus(response, statusCode) {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.statusCode = statusCode;
  response.end(http.STATUS_CODES[statusCode]);
}

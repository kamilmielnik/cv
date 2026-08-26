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

const PORT = 3000;
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');
const SOURCE_FILENAMES = ['index.html', 'style.css'];
const IMMUTABLE_FILE_EXTENSIONS = new Set(['.woff2']);
const SITE_URL = 'https://kamilmielnik.com';
const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const PDF_FILENAME = 'KamilMielnik.pdf';
const PDF_FILEPATH = path.join(ROOT_DIR, PDF_FILENAME);
const PDF_URL = `http://127.0.0.1:${PORT}`;
const VALID_TRACK_ACTIONS = new Set(['github', 'pdf', 'print', 'visit']);
const MAX_TRACK_BODY_BYTES = 1024;

const { router, server } = cero();
const lastModified = getLastModified();
const indexHtml = getIndexHtml(lastModified);
const sitemapXml = renderSitemapXml(lastModified);

router.use('/', serveStatic(PUBLIC_DIR, { maxAge: '1d', setHeaders: setStaticCacheControl }));

router.get('/', sendIndexHtml);
router.head('/', sendIndexHtml);
router.get('/pdf', sendPdf);
router.head('/pdf', sendPdf);
router.get('/sitemap.xml', sendSitemapXml);
router.head('/sitemap.xml', sendSitemapXml);
router.post('/track/:action', trackAction);

server.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}/`);
  keepPdfFresh(PDF_FILEPATH, PDF_URL);
});

function sendIndexHtml(request, response) {
  try {
    const html = renderIndexHtml();
    const etag = createEtag(html);
    response.setHeader('Cache-Control', 'no-cache');
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
    if (!fs.existsSync(PDF_FILEPATH)) {
      response.setHeader('Retry-After', '10');
      sendStatus(response, 503);
      return;
    }

    response.setHeader('Content-Disposition', `inline; filename="${PDF_FILENAME}"`);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Link', `<${SITE_URL}/>; rel="canonical"`);
    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    await pipeline(fs.createReadStream(PDF_FILEPATH), response);
  } catch (error) {
    sendServerError(response, error);
  }
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
    response.end();
  } catch (error) {
    sendServerError(response, error);
  }
}

function getLastModified() {
  const modifiedAt = SOURCE_FILENAMES.map((filename) => fs.statSync(path.join(import.meta.dirname, filename)).mtimeMs);
  return new Date(Math.max(...modifiedAt)).toISOString().slice(0, 'YYYY-MM-DD'.length);
}

function getIndexHtml(lastModified) {
  const html = fs.readFileSync(path.join(import.meta.dirname, 'index.html'), 'utf-8');
  const css = fs.readFileSync(path.join(import.meta.dirname, 'style.css'), 'utf-8');
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
    throw new Error(`"${search}" not found in index.html`);
  }

  return text.replace(search, replacement);
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
  console.error(error);

  if (response.headersSent) {
    response.destroy();
    return;
  }

  sendStatus(response, 500);
}

function sendStatus(response, statusCode) {
  response.statusCode = statusCode;
  response.end(http.STATUS_CODES[statusCode]);
}

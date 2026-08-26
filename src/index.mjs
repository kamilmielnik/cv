import cero from '0http';
import http from 'node:http';
import path from 'node:path';
import serveStatic from 'serve-static';

import { keepSiteFresh } from './build.mjs';
import { getClientTrackingData, getServerTrackingData, trackEvent } from './tracking.mjs';

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT ?? 3000);
const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist');
const PREVIEW_URL = `http://${HOST}:${PORT}`;
const VALID_TRACK_ACTIONS = new Set(['github', 'pdf', 'print', 'visit']);
const MAX_TRACK_BODY_BYTES = 1024;

const { router, server } = cero();

router.post('/track/:action', trackAction);
router.use('/', serveStatic(DIST_DIR));

// puppeteer's SIGTERM handler closes Chrome but leaves the server running
process.on('SIGTERM', () => process.exit());

server.listen(PORT, HOST, () => {
  console.log(`app listening on http://${HOST}:${PORT}/`);
  keepSiteFresh(DIST_DIR, PREVIEW_URL);
});

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

import cero from '0http';
import compression from 'compression';
import fs from 'node:fs';
import path from 'node:path';
import serveStatic from 'serve-static';

import { createPdfIfNeeded } from './pdf.mjs';
import { getClientTrackingData, getServerTrackingData, trackingDb } from './tracking.mjs';
import { formatNumberOfMonths, minify, sumTimePeriods } from './utils.mjs';

const PORT = 3000;
const SITE_URL = 'https://kamilmielnik.com';
const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const PDF_FILENAME = 'KamilMielnik.pdf';
const PDF_FILEPATH = path.join(ROOT_DIR, PDF_FILENAME);
const PDF_URL = `http://127.0.0.1:${PORT}`;
const VALID_TRACK_ACTIONS = new Set(['github', 'pdf', 'print', 'visit']);

const { router, server } = cero();
const indexHtml = getIndexHtml();

router.use('/', compression());
router.use('/', serveStatic(path.resolve(import.meta.dirname, 'public')));

router.get('/', (_request, response) => {
  try {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(renderIndexHtml());
  } catch (error) {
    sendServerError(response, error);
  }
});

router.get('/pdf', async (_request, response) => {
  try {
    await createPdfIfNeeded(PDF_FILEPATH, PDF_URL);
    response.setHeader('Content-Disposition', `attachment; filename="${PDF_FILENAME}"`);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Link', `<${SITE_URL}/>; rel="canonical"`);
    fs.createReadStream(PDF_FILEPATH).pipe(response);
  } catch (error) {
    sendServerError(response, error);
  }
});

router.post('/track/:action', (request, response) => {
  try {
    const { action } = request.params;

    if (!VALID_TRACK_ACTIONS.has(action)) {
      response.statusCode = 404;
      response.end('Not Found');
      return;
    }

    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      try {
        trackingDb.data.track.push({
          action,
          client: getClientTrackingData(body ? JSON.parse(body) : {}),
          server: getServerTrackingData(request),
        });
        trackingDb.write();
        response.end();
      } catch (error) {
        sendServerError(response, error);
      }
    });
  } catch (error) {
    sendServerError(response, error);
  }
});

server.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}/`);
});

function getIndexHtml() {
  const indexHtml = fs.readFileSync(path.resolve(import.meta.dirname, 'index.html'), 'utf-8');
  const css = fs.readFileSync(path.resolve(import.meta.dirname, 'style.css'), 'utf-8');
  const minifiedIndexHtml = minify(indexHtml);
  const minifiedCss = minify(css);
  const minifiedHtml = minifiedIndexHtml.replace('<style></style>', `<style>${minifiedCss}</style>`);
  return minifiedHtml;
}

function renderIndexHtml() {
  const start = new Date(2023, 4, 15);
  const months = sumTimePeriods([{ start, end: null }]);
  const currentPositionDuration = formatNumberOfMonths(months);
  const html = indexHtml.replace('{{ currentPositionDuration }}', currentPositionDuration);
  return html;
}

function sendServerError(response, error) {
  console.error(error);
  response.statusCode = 500;
  response.end('Server error');
}

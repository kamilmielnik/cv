import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createPdfIfNeeded } from './pdf.mjs';
import { getClientTrackingData, getServerTrackingData, trackingDb } from './tracking.mjs';
import { formatNumberOfMonths, minify, sumTimePeriods } from './utils.mjs';

const PORT = 3000;
const PDF_FILENAME = 'KamilMielnik.pdf';
const PDF_FILEPATH = path.resolve(PDF_FILENAME);
const PDF_URL = `http://127.0.0.1:${PORT}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = createApp();
const indexHtml = getIndexHtml();

app.get('/', (_request, response) => {
  try {
    response.send(renderIndexHtml());
  } catch (error) {
    response.status(500).send(error?.message ?? 'Server error');
    console.error(error);
  }
});

app.get('/pdf', async (_request, response) => {
  try {
    await createPdfIfNeeded(PDF_FILEPATH, PDF_URL);
    response.download(PDF_FILEPATH, PDF_FILENAME);
  } catch (error) {
    response.status(500).send(error?.message ?? 'Server error');
    console.error(error);
  }
});

app.post(/^\/track\/(github|pdf|print|visit)$/, (request, response) => {
  try {
    trackingDb.data.track.push({
      action: request.path.split('/').at(-1),
      client: getClientTrackingData(request),
      server: getServerTrackingData(request),
    });
    trackingDb.write();
    response.send();
  } catch (error) {
    response.status(500).send(error?.message ?? 'Server error');
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

function createApp() {
  const app = express();
  app.use(compression());
  app.use(express.static(path.resolve(__dirname, 'public')));
  app.use(bodyParser.json());
  return app;
}

function getIndexHtml() {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
  const css = fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf-8');
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

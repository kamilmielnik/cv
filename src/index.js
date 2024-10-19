import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createPdfIfNeeded } from './pdf.js';
import { getClientTrackingData, getServerTrackingData, trackingDb } from './tracking.js';
import { formatNumberOfMonths, minify, sumTimePeriods } from './utils.js';

const PORT = 3000;
const PDF_FILENAME = 'KamilMielnik.pdf';
const PDF_FILEPATH = path.resolve(PDF_FILENAME);
const PDF_URL = `http://127.0.0.1:${PORT}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexHtml = getIndexHtml();
const app = createApp();

app.get('/', (_request, response) => {
  try {
    const html = renderTemplate(indexHtml, {
      currentPositionDuration: formatNumberOfMonths(sumTimePeriods([{ start: new Date(2023, 4, 15), end: null }])),
    });

    response.send(html);
  } catch (error) {
    response.status(500).send(error?.message ?? 'Server error');
  }
});

app.get('/pdf', async (_request, response) => {
  try {
    await createPdfIfNeeded(PDF_FILEPATH, PDF_URL);
    response.download(PDF_FILEPATH, PDF_FILENAME);
  } catch (error) {
    response.status(500).send(error?.message ?? 'Server error');
  }
});

app.post(/^\/track\/(github|pdf|print|visit)$/, async (request, response) => {
  try {
    trackingDb.data.track.push({
      action: request.path.split('/').at(-1),
      client: getClientTrackingData(request),
      server: getServerTrackingData(request),
    });
    await trackingDb.write();
    response.send();
  } catch (error) {
    response.status(500).send(error?.message ?? 'Server error');
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
  const minifiedIndexHtml = minify(readIndexHtml());
  const minifiedCss = minify(readStyleCss());
  const minifiedHtml = minifiedIndexHtml.replace('<style></style>', `<style>${minifiedCss}</style>`);
  return minifiedHtml;
}

function readIndexHtml() {
  return fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
}

function readStyleCss() {
  return fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf-8');
}

function renderTemplate(html, { currentPositionDuration }) {
  return html.replace('{{ currentPositionDuration }}', currentPositionDuration);
}

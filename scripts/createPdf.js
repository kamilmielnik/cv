const path = require('path');
const puppeteer = require('puppeteer');
const { HttpServer } = require('http-server');
const { logInfo, logSuccess } = require('./utils');

const BUILD_DIRECTORY = './build';
const PDF_FILENAME = 'KamilMielnik.pdf';
const HOST = '127.0.0.1';
const PORT = 8080;
const URL = `http://${HOST}:${PORT}`;

const createPdf = async () => {
  logInfo('HTTP server: starting');
  const server = new HttpServer({ root: BUILD_DIRECTORY });
  server.listen(PORT);
  logSuccess(`HTTP server: listening at ${URL}`);
  logInfo('Puppeteer: launching');
  const browser = await puppeteer.launch();
  logInfo(`Puppeteer: visiting ${URL}`);
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2' });
  logInfo('Puppeteer: generating PDF');
  await page.pdf({ path: path.join(BUILD_DIRECTORY, PDF_FILENAME), format: 'A4' });
  logInfo('Puppeteer: closing');
  await browser.close();
  logInfo('HTTP server: closing');
  server.close();
};

createPdf();

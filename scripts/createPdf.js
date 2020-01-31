const dotenv = require('dotenv');
const { HttpServer } = require('http-server');
const path = require('path');
const puppeteer = require('puppeteer');

const logger = require('./logger');

dotenv.config();

const HOST = '127.0.0.1';
const PORT = 8080;
const URL = `http://${HOST}:${PORT}`;

const createPdf = async () => {
  logger.info('HTTP server: starting');
  const server = new HttpServer({ root: process.env.DEPLOY_SOURCE_DIRECTORY });
  server.listen(PORT);
  logger.success(`HTTP server: listening at ${URL}`);
  logger.info('Puppeteer: launching');
  const browser = await puppeteer.launch();
  logger.info(`Puppeteer: visiting ${URL}`);
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2' });
  logger.info('Puppeteer: generating PDF');
  await page.pdf({
    path: path.join(process.env.DEPLOY_SOURCE_DIRECTORY, process.env.REACT_APP_PDF_FILENAME),
    format: 'A4'
  });
  logger.info('Puppeteer: closing');
  await browser.close();
  logger.info('HTTP server: closing');
  server.close();
};

createPdf();

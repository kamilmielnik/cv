const dotenv = require('dotenv');
const path = require('path');
const puppeteer = require('puppeteer');

const logger = require('./logger');
const runHttpServer = require('./runHttpServer');

dotenv.config();

const createPdf = () => {
  runHttpServer(async (server, url) => {
    logger.info('Puppeteer: launching');
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    logger.info(`Puppeteer: visiting ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    logger.info('Puppeteer: generating PDF');
    await page.pdf({
      path: path.join(process.env.DEPLOY_SOURCE_DIRECTORY, process.env.REACT_APP_PDF_FILENAME),
      format: 'A4'
    });
    logger.info('Puppeteer: closing');
    await browser.close();
  });
};

createPdf();

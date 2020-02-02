const cheerio = require('cheerio');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const logger = require('./logger');

dotenv.config();

const inlineCss = async () => {
  logger.info('Inline CSS: reading index.html');
  const indexHtmlFilepath = path.join(process.env.DEPLOY_SOURCE_DIRECTORY, 'index.html');
  const html = fs.readFileSync(indexHtmlFilepath, 'utf-8');
  logger.info('Inline CSS: parsing index.html');
  const $ = cheerio.load(html);
  const $stylesheet = $('link[rel=stylesheet][href$=css]');
  if ($stylesheet.length === 1) {
    const cssFilepath = path.join(process.env.DEPLOY_SOURCE_DIRECTORY, $stylesheet.attr('href'));
    logger.info(`Inline CSS: stylesheet found: "${cssFilepath}"`);
    const css = fs.readFileSync(cssFilepath, 'utf-8');
    $stylesheet.replaceWith(`<style>${css}</style>`);
    logger.info('Inline CSS: writing index.html');
    fs.writeFileSync(indexHtmlFilepath, $.html());
  } else {
    logger.info('Inline CSS: stylesheet not found');
  }
};

inlineCss();

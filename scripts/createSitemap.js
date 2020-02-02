const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

const logger = require('./logger');
const runHttpServer = require('./runHttpServer');

dotenv.config();

const DEPLOY_URL = `https://${process.env.DEPLOY_DOMAIN}`;
const SITEMAP_FILEPATH = path.join(process.env.DEPLOY_SOURCE_DIRECTORY, 'sitemap.xml');

const createSitemap = () => {
  runHttpServer(async (server, url) => {
    logger.info('Sitemap: creating');
    const sitemap = new SitemapStream({ hostname: url });
    sitemap.write('/');
    sitemap.end();
    let sitemapXml = String(await streamToPromise(sitemap));
    while (sitemapXml.includes(url)) {
      sitemapXml = sitemapXml.replace(url, DEPLOY_URL);
    }
    logger.info('Sitemap: saving XML file');
    fs.writeFileSync(SITEMAP_FILEPATH, sitemapXml);
  });
};

createSitemap();

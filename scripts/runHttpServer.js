const dotenv = require('dotenv');
const { HttpServer } = require('http-server');

const logger = require('./logger');

dotenv.config();

const HOST = '127.0.0.1';
const PORT = 8080;
const URL = `http://${HOST}:${PORT}`;

const runHttpServer = async (callback) => {
  logger.info('HTTP server: starting');
  const server = new HttpServer({ root: process.env.DEPLOY_SOURCE_DIRECTORY });
  server.listen(PORT);
  logger.success(`HTTP server: listening at ${URL}`);
  await callback(server, URL);
  logger.info('HTTP server: closing');
  server.close();
};

module.exports = runHttpServer;

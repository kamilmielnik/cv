const dotenv = require('dotenv');
const NodeSsh = require('node-ssh');

const logger = require('./logger');

dotenv.config();

const connect = async (ssh) => {
  logger.info('> Connecting');
  await ssh.connect({
    host: process.env.DEPLOY_HOST,
    username: process.env.DEPLOY_USERNAME,
    password: process.env.DEPLOY_PASSWORD
  });
};

const removeOldFiles = async (ssh) => {
  try {
    logger.info('> Removing old files');
    await ssh.exec(`rm -rf ${process.env.DEPLOY_TARGET_DIRECTORY}`, [], {
      cwd: process.env.DEPLOY_DIRECTORY
    });
  } catch (error) {
    logger.error('> Failed to remove old files');
    logger.log(error, 1);
  }
};

const ensureDirectoryExists = async (ssh) => {
  logger.info('> Ensuring directory exists');
  await ssh.exec(`mkdir ${process.env.DEPLOY_TARGET_DIRECTORY}`, [], {
    cwd: process.env.DEPLOY_DIRECTORY
  });
};

const upload = async (ssh) => {
  logger.info('> Uploading');
  await ssh.putDirectory(
    process.env.DEPLOY_SOURCE_DIRECTORY,
    `${process.env.DEPLOY_DIRECTORY}/${process.env.DEPLOY_TARGET_DIRECTORY}/`,
    {
      recursive: true
    }
  );
};

const disconnect = (ssh) => {
  logger.info('> Disconnecting');
  ssh.dispose();
};

const retry = async (action, retries = 3) => {
  try {
    await action();
  } catch (error) {
    if (retries > 0) {
      logger.log(error, 1);
      await retry(action, retries - 1);
    } else {
      throw error;
    }
  }
};

const deploy = async () => {
  const ssh = new NodeSsh();

  try {
    await connect(ssh);
    await removeOldFiles(ssh);
    await ensureDirectoryExists(ssh);
    await retry(() => upload(ssh));
  } catch (error) {
    logger.log(error, 1);
  } finally {
    disconnect(ssh);
  }
};

deploy();

const dotenv = require('dotenv');
const NodeSsh = require('node-ssh');

const { log, logError, logInfo, logSuccess } = require('./utils');

dotenv.config();

const connect = async (ssh) => {
  logInfo('> Connecting');
  await ssh.connect({
    host: process.env.DEPLOY_HOST,
    username: process.env.DEPLOY_USERNAME,
    password: process.env.DEPLOY_PASSWORD
  });
};

const removeOldFiles = async (ssh) => {
  try {
    logInfo('> Removing old files');
    await ssh.exec(`rm -rf ${process.env.DEPLOY_TARGET_DIRECTORY}`, [], {
      cwd: process.env.DEPLOY_DIRECTORY
    });
  } catch (error) {
    logError('> Failed to remove old files');
    log(error, 1);
  }
};

const ensureDirectoryExists = async (ssh) => {
  logInfo('> Ensuring directory exists');
  await ssh.exec(`mkdir ${process.env.DEPLOY_TARGET_DIRECTORY}`, [], {
    cwd: process.env.DEPLOY_DIRECTORY
  });
};

const upload = async (ssh) => {
  logInfo('> Uploading');
  await ssh.putDirectory(
    process.env.DEPLOY_SOURCE_DIRECTORY,
    `${process.env.DEPLOY_DIRECTORY}/${process.env.DEPLOY_TARGET_DIRECTORY}/`,
    {
      recursive: true
    }
  );
};

const disconnect = (ssh) => {
  logInfo('> Disconnecting');
  ssh.dispose();
};

const retry = async (action, retries = 3) => {
  try {
    await action();
  } catch (error) {
    if (retries > 0) {
      log(error, 1);
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
    log(error, 1);
  } finally {
    disconnect(ssh);
  }
};

deploy();

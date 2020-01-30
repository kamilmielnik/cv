const WHITE = '\x1b[37m%s\x1b[0m';
const YELLOW = '\x1b[33m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';

// eslint-disable-next-line no-console
const log = (message) => console.log(WHITE, message);
// eslint-disable-next-line no-console
const logError = (error) => console.log(RED, error);
// eslint-disable-next-line no-console
const logInfo = (message) => console.log(YELLOW, message);
// eslint-disable-next-line no-console
const logSuccess = (message) => console.log(GREEN, message);

module.exports = {
  log,
  logError,
  logInfo,
  logSuccess
};

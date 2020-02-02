/* eslint-disable no-console */

const WHITE = '\x1b[37m%s\x1b[0m';
const YELLOW = '\x1b[33m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';

const logger = {
  log: (message) => console.log(WHITE, message),
  error: (error) => console.log(RED, error),
  info: (message) => console.log(YELLOW, message),
  success: (message) => console.log(GREEN, message)
};

module.exports = logger;

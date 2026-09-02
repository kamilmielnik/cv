import cero from '0http';
import path from 'node:path';
import serveStatic from 'serve-static';

import { keepSiteFresh } from './build.mjs';
import { trackAction } from './track.mjs';

const HOST = '127.0.0.1';
const PORT = parsePort(process.env.PORT ?? 3000);
const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist');
const PREVIEW_URL = `http://${HOST}:${PORT}`;

const { router, server } = cero();

router.post(/^\/track\/(?<action>\w+)$/, trackAction);
router.use('/', serveStatic(DIST_DIR));

// puppeteer's SIGTERM listener overrides the default exit, leaving the process running
process.on('SIGTERM', () => process.exit());

server.listen(PORT, HOST, () => {
  console.log(`app listening on http://${HOST}:${PORT}/`);
  keepSiteFresh(DIST_DIR, PREVIEW_URL).catch(exitWithError);
});

function parsePort(value) {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: "${value}"`);
  }

  return port;
}

function exitWithError(error) {
  console.error(error);
  process.exit(1);
}

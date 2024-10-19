import fs from 'fs';
import puppeteer from 'puppeteer';

const HOUR = 60 * 60 * 1000;
const CACHE_TTL = 24 * HOUR;

export async function createPdfIfNeeded(filepath, url) {
  if (!canUseCache(filepath)) {
    await createPdf(filepath, url);
  }
}

function canUseCache(filepath) {
  if (cacheExists(filepath)) {
    const timestamp = readCacheTimestamp(filepath);
    return timestamp + CACHE_TTL > Date.now();
  }

  return false;
}

function cacheExists(filepath) {
  return fs.existsSync(filepath);
}

function readCacheTimestamp(filepath) {
  const stats = fs.statSync(filepath);
  const date = new Date(stats.mtime);
  const timestamp = Number(date);
  return timestamp;
}

async function createPdf(filepath, url) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'a4', path: filepath });
  await browser.close();
  return pdfBuffer;
}

import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const DAY = 24 * 60 * 60 * 1000;

export function keepPdfFresh(filepath, url) {
  const regenerate = () => createPdf(filepath, url).catch(console.error);
  regenerate();
  setInterval(regenerate, DAY);
}

async function createPdf(filepath, url) {
  const temporaryFilepath = `${filepath}.tmp`;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await browser.newPage();
    await ignoreTracking(page);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({ format: 'a4', path: temporaryFilepath });
  } finally {
    await browser.close();
  }

  await fs.rename(temporaryFilepath, filepath);
}

async function ignoreTracking(page) {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.startsWith('/track/')) {
      request.abort();
    } else {
      request.continue();
    }
  });
}

import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

export async function createPdf(filepath, url) {
  const temporaryFilepath = `${filepath}.tmp`;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({ format: 'a4', path: temporaryFilepath });
  } finally {
    await browser.close();
  }

  await fs.rename(temporaryFilepath, filepath);
}

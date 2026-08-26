import puppeteer from 'puppeteer';

export async function createPdf(url) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(url, { waitUntil: 'networkidle0' });
    return await page.pdf({ format: 'a4' });
  } finally {
    await browser.close();
  }
}

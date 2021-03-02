import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import puppeteer from 'puppeteer';

const PDF_FILENAME = 'KamilMielnik.pdf';
const PDF_FILEPATH = path.resolve(PDF_FILENAME);
const URL = 'http://127.0.0.1:3000';

const pdf = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  let pdfBuffer: Buffer = null;

  if (!canUseCache()) {
    pdfBuffer = await createPdf();
  }

  if (!pdfBuffer) {
    pdfBuffer = fs.readFileSync(PDF_FILEPATH);
  }

  response.setHeader('Content-Type', 'application/pdf');
  response.setHeader('Content-disposition', `attachment; filename="${PDF_FILENAME}"`);
  response.status(200).send(pdfBuffer);
};

const canUseCache = (): boolean => {
  if (cacheExists()) {
    const timestamp = readCacheTimestamp();
    return timestamp + 24 * 60 * 60 * 1000 > Date.now();
  }

  return false;
};

const cacheExists = (): boolean => fs.existsSync(PDF_FILEPATH);

const readCacheTimestamp = (): number => {
  const stats = fs.statSync(PDF_FILEPATH);
  const date = new Date(stats.mtime);
  const timestamp = Number(date);
  return timestamp;
};

const createPdf = async (): Promise<Buffer> => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'a4', path: PDF_FILEPATH });
  await browser.close();
  return pdfBuffer;
};

export default pdf;

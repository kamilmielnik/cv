import minifyHtml from '@minify-html/node';
import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';
import puppeteer from 'puppeteer';

import htmlTemplate from './index.html' with { type: 'text' };
import cssTemplate from './style.css' with { type: 'text' };

const DAY = 24 * 60 * 60 * 1000;
const SITE_URL = 'https://kamilmielnik.com';
const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const TEMPORARY_DIR = path.join(ROOT_DIR, '.tmp');
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');
const HTML_TEMPLATE_PATH = path.join(import.meta.dirname, 'index.html');
const CSS_TEMPLATE_PATH = path.join(import.meta.dirname, 'style.css');
const TEMPLATE_PATHS = [HTML_TEMPLATE_PATH, CSS_TEMPLATE_PATH];
const PDF_FILENAME = 'KamilMielnik.pdf';
const HASHED_FILE_EXTENSIONS = new Set(['.woff2']);
const HASH_LENGTH = 8;
const FONT_URL_PATTERN = /\/([\w.-]+\.woff2)/g;
const CURRENT_POSITION_START = new Date(2023, 4, 15);
const NUMBER_OF_MONTHS_IN_YEAR = 12;
const NUMBER_OF_MONTHS_IN_HALF_YEAR = 6;
const BROTLI_OPTIONS = { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY } };
const GZIP_OPTIONS = { level: zlib.constants.Z_BEST_COMPRESSION };

const brotliCompress = promisify(zlib.brotliCompress);
const execFileAsync = promisify(execFile);
const gzip = promisify(zlib.gzip);

export async function keepSiteFresh(distDir, previewUrl) {
  await buildSite(distDir, previewUrl);
  setInterval(rebuild, DAY);

  function rebuild() {
    buildSite(distDir, previewUrl).catch(console.error);
  }
}

async function buildSite(distDir, previewUrl) {
  await fs.mkdir(distDir, { recursive: true });
  await fs.mkdir(TEMPORARY_DIR, { recursive: true });
  const lastModified = await getLastModified();
  const distFilenames = await copyPublicFiles(distDir);
  const sitemapFilenames = await writeTextFile(distDir, 'sitemap.xml', renderSitemapXml(lastModified));
  const indexFilenames = await writeTextFile(distDir, 'index.html', renderIndexHtml(lastModified, distFilenames));
  await writeFileAtomically(path.join(distDir, PDF_FILENAME), await createPdf(previewUrl));
  await removeStaleFiles(
    distDir,
    new Set([...distFilenames.values(), ...sitemapFilenames, ...indexFilenames, PDF_FILENAME]),
  );
}

async function getLastModified() {
  const templateChange = await getLastTemplateChange();
  const durationChange = getLastDurationChange();
  return templateChange > durationChange ? templateChange : durationChange;
}

async function getLastTemplateChange() {
  // cv.service runs git as root in a checkout owned by the deploy user
  const { stdout } = await execFileAsync(
    'git',
    ['-c', `safe.directory=${ROOT_DIR}`, 'log', '-1', '--format=%cs', '--', ...TEMPLATE_PATHS],
    { cwd: ROOT_DIR },
  );
  const lastChange = stdout.trim();

  if (lastChange === '') {
    throw new Error('No commit touches the templates');
  }

  return lastChange;
}

// the duration counts whole months, so it last changed when this month began
function getLastDurationChange() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
}

async function copyPublicFiles(distDir) {
  const filenames = await fs.readdir(PUBLIC_DIR);
  return new Map(
    await Promise.all(
      filenames.map(async (filename) => {
        const content = await fs.readFile(path.join(PUBLIC_DIR, filename));
        const distFilename = HASHED_FILE_EXTENSIONS.has(path.extname(filename))
          ? hashFilename(filename, content)
          : filename;
        await writeFileAtomically(path.join(distDir, distFilename), content);
        return [filename, distFilename];
      }),
    ),
  );
}

function hashFilename(filename, content) {
  const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, HASH_LENGTH);
  const extension = path.extname(filename);
  return `${path.basename(filename, extension)}.${hash}${extension}`;
}

function renderSitemapXml(lastModified) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `<url><loc>${SITE_URL}/</loc><lastmod>${lastModified}</lastmod></url>`,
    '</urlset>',
  ].join('');
}

function renderIndexHtml(lastModified, distFilenames) {
  const withCss = replaceAll(htmlTemplate, '<style></style>', `<style>${cssTemplate}</style>`);
  const renamedFiles = [...distFilenames].filter(([filename, distFilename]) => filename !== distFilename);
  const withHashedUrls = renamedFiles.reduce(
    (text, [filename, distFilename]) => replaceAll(text, `/${filename}`, `/${distFilename}`),
    withCss,
  );
  assertFontsExist(withHashedUrls, distFilenames);
  const withDateModified = replaceAll(withHashedUrls, '{{ dateModified }}', lastModified);
  const withDuration = replaceAll(withDateModified, '{{ currentPositionDuration }}', getCurrentPositionDuration());
  const minified = minify(withDuration);
  return replaceAll(minified, '{{ contentSecurityPolicy }}', createContentSecurityPolicy(minified));
}

function getCurrentPositionDuration() {
  return formatNumberOfMonths(sumTimePeriods([{ start: CURRENT_POSITION_START, end: null }]));
}

function formatNumberOfMonths(numberOfMonths) {
  const years = Math.floor(numberOfMonths / NUMBER_OF_MONTHS_IN_YEAR);
  const months = numberOfMonths - years * NUMBER_OF_MONTHS_IN_YEAR;

  if (years === 0 && months === NUMBER_OF_MONTHS_IN_HALF_YEAR) {
    return '0.5 yr';
  }

  if (years === 0) {
    return `${months} ${pluralizeMonths(months)}`;
  }

  if (months === 0) {
    return `${years} ${pluralizeYears(years)}`;
  }

  if (months === NUMBER_OF_MONTHS_IN_HALF_YEAR) {
    return `${years}.5 ${pluralizeYears(years)}`;
  }

  return `${years} ${pluralizeYears(years)} ${months} ${pluralizeMonths(months)}`;
}

function pluralizeMonths(months) {
  return `mo${months === 1 ? '' : 's'}`;
}

function pluralizeYears(years) {
  return `yr${years === 1 ? '' : 's'}`;
}

function sumTimePeriods(timePeriods) {
  return timePeriods.reduce((numberOfMonths, timePeriod) => numberOfMonths + monthDifference(timePeriod), 0);
}

function monthDifference(timePeriod) {
  const endDate = timePeriod.end || new Date();
  const endYear = endDate.getFullYear();
  const startYear = timePeriod.start.getFullYear();
  const fullYearsDifference = NUMBER_OF_MONTHS_IN_YEAR * (endYear - startYear);
  const monthsDifference = endDate.getMonth() - timePeriod.start.getMonth() + 1;
  const difference = fullYearsDifference + monthsDifference;
  return difference;
}

function replaceAll(text, search, replacement) {
  assertIncludes(text, search);
  return text.replaceAll(search, () => replacement);
}

function assertIncludes(text, search) {
  if (!text.includes(search)) {
    throw new Error(`"${search}" not found`);
  }
}

function assertFontsExist(text, distFilenames) {
  const available = new Set(distFilenames.values());

  for (const [, filename] of text.matchAll(FONT_URL_PATTERN)) {
    if (!available.has(filename)) {
      throw new Error(`"${filename}" not found in ${PUBLIC_DIR}`);
    }
  }
}

function minify(html) {
  return String(minifyHtml.minify(Buffer.from(html), { keep_html_and_head_opening_tags: true, minify_css: true }));
}

function createContentSecurityPolicy(html) {
  return [
    "default-src 'none'",
    `script-src ${hashInlineElements(html, /<script\b[^>]*>([^]*?)<\/script>/g)}`,
    `style-src ${hashInlineElements(html, /<style\b[^>]*>([^]*?)<\/style>/g)}`,
    "font-src 'self'",
    "img-src 'self'",
    "connect-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ');
}

function hashInlineElements(html, pattern) {
  const hashes = [...html.matchAll(pattern)].map(([, content]) => toContentSecurityPolicyHash(content));

  if (hashes.length === 0) {
    throw new Error(`No inline element matched ${pattern}`);
  }

  return hashes.join(' ');
}

function toContentSecurityPolicyHash(content) {
  return `'sha256-${crypto.createHash('sha256').update(content).digest('base64')}'`;
}

async function createPdf(url) {
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

async function writeTextFile(distDir, filename, text) {
  const filepath = path.join(distDir, filename);
  const buffer = Buffer.from(text);
  await writeFileAtomically(`${filepath}.br`, await brotliCompress(buffer, BROTLI_OPTIONS));
  await writeFileAtomically(`${filepath}.gz`, await gzip(buffer, GZIP_OPTIONS));
  await writeFileAtomically(filepath, buffer);
  return [`${filename}.br`, `${filename}.gz`, filename];
}

async function writeFileAtomically(filepath, data) {
  const temporaryFilepath = path.join(TEMPORARY_DIR, path.basename(filepath));
  await fs.writeFile(temporaryFilepath, data);
  await fs.rename(temporaryFilepath, filepath);
}

async function removeStaleFiles(distDir, filenames) {
  for (const filename of await fs.readdir(distDir)) {
    if (!filenames.has(filename)) {
      await fs.rm(path.join(distDir, filename));
    }
  }
}

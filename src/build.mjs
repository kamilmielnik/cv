import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

import { createPdf } from './pdf.mjs';
import { formatNumberOfMonths, minify, sumTimePeriods } from './utils.mjs';

const DAY = 24 * 60 * 60 * 1000;
const SITE_URL = 'https://kamilmielnik.com';
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');
const HTML_TEMPLATE_PATH = path.join(import.meta.dirname, 'index.html');
const CSS_TEMPLATE_PATH = path.join(import.meta.dirname, 'style.css');
const TEMPLATE_PATHS = [HTML_TEMPLATE_PATH, CSS_TEMPLATE_PATH];
const PDF_FILENAME = 'KamilMielnik.pdf';
const CURRENT_POSITION_START = new Date(2023, 4, 15);
const BROTLI_OPTIONS = { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY } };
const GZIP_OPTIONS = { level: zlib.constants.Z_BEST_COMPRESSION };

const brotliCompress = promisify(zlib.brotliCompress);
const gzip = promisify(zlib.gzip);

export function keepSiteFresh(distDir, previewUrl) {
  const build = () => buildSite(distDir, previewUrl).catch(console.error);
  build();
  setInterval(build, DAY);
}

async function buildSite(distDir, previewUrl) {
  await fs.mkdir(distDir, { recursive: true });
  await copyPublicFiles(distDir);
  const lastModified = await getLastModified();
  await writeTextFile(distDir, 'sitemap.xml', renderSitemapXml(lastModified));
  await writeTextFile(distDir, 'index.html', await renderIndexHtml(lastModified));
  await createPdf(path.join(distDir, PDF_FILENAME), previewUrl);
}

async function copyPublicFiles(distDir) {
  for (const filename of await fs.readdir(PUBLIC_DIR)) {
    await writeFileAtomically(path.join(distDir, filename), await fs.readFile(path.join(PUBLIC_DIR, filename)));
  }
}

async function getLastModified() {
  const stats = await Promise.all(TEMPLATE_PATHS.map((filepath) => fs.stat(filepath)));
  const modifiedAt = Math.max(...stats.map((stat) => stat.mtimeMs));
  return new Date(modifiedAt).toISOString().slice(0, 'YYYY-MM-DD'.length);
}

function renderSitemapXml(lastModified) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `<url><loc>${SITE_URL}/</loc><lastmod>${lastModified}</lastmod></url>`,
    '</urlset>',
  ].join('');
}

async function renderIndexHtml(lastModified) {
  const html = await fs.readFile(HTML_TEMPLATE_PATH, 'utf-8');
  const css = await fs.readFile(CSS_TEMPLATE_PATH, 'utf-8');
  const withCss = replaceOnce(html, '<style></style>', `<style>${css}</style>`);
  const withDateModified = replaceOnce(withCss, '{{ dateModified }}', lastModified);
  const withDuration = replaceOnce(withDateModified, '{{ currentPositionDuration }}', getCurrentPositionDuration());
  const minified = minify(withDuration);
  return replaceOnce(minified, '{{ contentSecurityPolicy }}', createContentSecurityPolicy(minified));
}

function getCurrentPositionDuration() {
  return formatNumberOfMonths(sumTimePeriods([{ start: CURRENT_POSITION_START, end: null }]));
}

function replaceOnce(text, search, replacement) {
  if (!text.includes(search)) {
    throw new Error(`"${search}" not found`);
  }

  return text.replace(search, replacement);
}

function createContentSecurityPolicy(html) {
  return [
    "default-src 'none'",
    `script-src ${hashInlineElements(html, /<script>([^]*?)<\/script>/g)}`,
    `style-src ${hashInlineElements(html, /<style>([^]*?)<\/style>/g)}`,
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

async function writeTextFile(distDir, filename, text) {
  const filepath = path.join(distDir, filename);
  const buffer = Buffer.from(text);
  await writeFileAtomically(`${filepath}.br`, await brotliCompress(buffer, BROTLI_OPTIONS));
  await writeFileAtomically(`${filepath}.gz`, await gzip(buffer, GZIP_OPTIONS));
  await writeFileAtomically(filepath, buffer);
}

async function writeFileAtomically(filepath, data) {
  const temporaryFilepath = `${filepath}.tmp`;
  await fs.writeFile(temporaryFilepath, data);
  await fs.rename(temporaryFilepath, filepath);
}

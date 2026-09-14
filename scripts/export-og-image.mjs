/**
 * Exports public/logo/og-card.svg to public/logo/og-card.png at 1200x630.
 * Facebook, LinkedIn and WhatsApp ignore SVG link-preview images, so og:image
 * points at this PNG. The PNG is committed, so ordinary builds do not need
 * Chromium for it. Re-run after changing the card:
 *
 *   npm run og-image
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public/logo/og-card.svg'), 'utf8');

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><html><head><style>html,body{margin:0}svg{display:block}</style></head><body>${svg}</body></html>`,
    { waitUntil: 'load' },
  );
  await page.screenshot({
    path: join(root, 'public/logo/og-card.png'),
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
} finally {
  await browser.close();
}

console.log('og-image: wrote public/logo/og-card.png (1200x630)');

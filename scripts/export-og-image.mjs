/**
 * Composes the social card, public/logo/og-card.jpg (1200x630): the
 * og-background photo with the white logo lockup in the calm, misty space on
 * the left. og:image and twitter:image in index.html point at it.
 *
 * Rendered in Chromium because the lockup's wordmark is live text. Saved as
 * JPEG rather than PNG: a PNG of a photo this size runs to about 1 MB, and
 * WhatsApp drops link previews whose image is much over 300 KB.
 *
 *   npm run og-image
 */
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public/logo/og-card.jpg');
const background = readFileSync(join(root, 'public/images/og-background.jpg')).toString('base64');
const mark = readFileSync(join(root, 'public/logo/mark-white.svg'), 'utf8').replace(
  /width="512" height="512"/,
  'width="150" height="150"',
);

const html = `<!doctype html>
<html><head><style>
  html, body { margin: 0; }
  .card {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    background: url(data:image/jpeg;base64,${background}) center / cover;
  }
  /* The fog on the left is pale, so a soft navy shade keeps the white lockup
     readable at thumbnail size while the landscape still shows through. */
  .shade {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(22,50,62,0.78) 0%, rgba(22,50,62,0.6) 38%, rgba(22,50,62,0) 72%);
  }
  .lockup {
    position: absolute; left: 80px; top: 50%; transform: translateY(-50%);
    display: flex; align-items: center; gap: 28px;
  }
  .lockup svg { display: block; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.25)); }
  .wordmark {
    font-family: Georgia, 'Source Serif 4', 'Times New Roman', serif;
    font-size: 78px; font-weight: 700; color: #fff; line-height: 1; white-space: nowrap;
    text-shadow: 0 2px 10px rgba(0,0,0,0.28);
  }
</style></head>
<body><div class="card"><div class="shade"></div>
  <div class="lockup">${mark}<div class="wordmark">My Medicare Angel</div></div>
</div></body></html>`;

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: out, type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630 } });
} finally {
  await browser.close();
}

console.log(`og-image: wrote public/logo/og-card.jpg (1200x630, ${Math.round(statSync(out).size / 1024)} KB)`);

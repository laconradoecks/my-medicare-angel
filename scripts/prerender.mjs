/**
 * Prerenders every URL in dist/sitemap.xml to static HTML. Runs after vite
 * build and the sitemap step (see "build" in package.json).
 *
 * Without this the host serves the same SPA shell for every route: the
 * homepage's title and meta tags and an empty body. Here each route is loaded
 * in headless Chromium against a local preview of dist/, captured once the app
 * has rendered the page's h1 and set its canonical link, and written to
 * dist/<route>/index.html (the homepage replaces dist/index.html). The app
 * still loads on top and takes over, so client-side navigation is unchanged.
 *
 * If Chromium cannot start (some shared hosts cannot run it), the build fails
 * with instructions rather than quietly shipping unprerendered pages.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const port = 4179;
const origin = `http://localhost:${port}`;

function fail(message) {
  console.error(`prerender: ${message}`);
  process.exit(1);
}

// routes.ts stays the source of truth: the sitemap is generated from it, and
// it also carries the article URLs.
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^<\/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
if (routes.length === 0) fail('no URLs found in dist/sitemap.xml');

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  fail('puppeteer is not installed. Run npm install first.');
}

let browser;
try {
  browser = await puppeteer.launch({ headless: true });
} catch (err) {
  fail(
    `could not start headless Chromium (${String(err.message).split('\n')[0]}).\n` +
      'Prerendering needs a machine that can run Chromium. On a shared host that cannot, ' +
      'build on your own computer and upload dist/ instead (see "Namecheap" in README.md).',
  );
}

const server = await preview({
  root,
  logLevel: 'silent',
  preview: { port, strictPort: true, open: false },
});

// Render everything into memory first, and only then write to dist/, so the
// preview server keeps serving the original shell while pages are captured.
const rendered = [];
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', (err) => errors.push(`${page.url()}: ${err.message}`));

  // Only the local preview is needed. Skipping third-party requests (Google
  // Fonts) keeps the build fast and independent of the network.
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.url().startsWith(origin) || req.url().startsWith('data:')) req.continue();
    else req.abort();
  });

  for (const route of routes) {
    await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 30_000 });
    await page.waitForSelector('main h1', { timeout: 15_000 });
    // Seo writes the head in an effect, so wait until it has set this route's canonical.
    await page.waitForFunction(
      (path) => {
        const href = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
        return Boolean(href) && new URL(href).pathname === path;
      },
      { timeout: 15_000 },
      route,
    );
    rendered.push({
      route,
      title: await page.title(),
      html: await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML),
    });
  }
} finally {
  await browser.close();
  server.httpServer.closeAllConnections?.();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

if (errors.length) fail(`JavaScript errors while rendering:\n${errors.join('\n')}`);

const seen = new Map();
for (const { route, title } of rendered) {
  if (seen.has(title)) fail(`"${title}" is the title of both ${seen.get(title)} and ${route}`);
  seen.set(title, route);
}

for (const { route, html } of rendered) {
  const file =
    route === '/' ? join(dist, 'index.html') : join(dist, ...route.slice(1).split('/'), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

console.log(`prerender: wrote ${rendered.length} pages`);
process.exit(0);

/**
 * Writes dist/sitemap.xml from the route table in src/routes.ts.
 * Runs automatically as part of `npm run build`.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

if (!existsSync(dist)) {
  console.error('sitemap: dist/ not found — run `vite build` first.');
  process.exit(1);
}

// Pull the site URL out of the config without importing TypeScript.
const config = readFileSync(join(root, 'src/config/site.ts'), 'utf8');
const baseUrl = (config.match(/url:\s*'([^']+)'/)?.[1] ?? 'https://www.mymedicareangel.com').replace(
  /\/$/,
  '',
);

// Static routes.
const routesSrc = readFileSync(join(root, 'src/routes.ts'), 'utf8');
const pathValues = [...routesSrc.matchAll(/^\s{2}\w+:\s*'(\/[^']*)',/gm)]
  .map((m) => m[1])
  // Skip route patterns like /articles/:slug — the concrete URLs come from the
  // article data below.
  .filter((p) => !p.includes(':'));

// Article detail pages.
const articlesSrc = readFileSync(join(root, 'src/data/articles.ts'), 'utf8');
const slugs = [...articlesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const urls = [...new Set([...pathValues, ...slugs.map((s) => `/articles/${s}`)])].sort();
const today = new Date().toISOString().slice(0, 10);

const priorityFor = (path) => {
  if (path === '/') return '1.0';
  if (['/get-a-quote', '/contact', '/book-a-consultation'].includes(path)) return '0.9';
  if (path.startsWith('/medicare-explained') || path.startsWith('/compare')) return '0.8';
  if (['/privacy-policy', '/terms-of-use', '/medicare-disclaimers'].includes(path)) return '0.3';
  return '0.6';
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) =>
      `  <url>\n    <loc>${baseUrl}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priorityFor(path)}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(dist, 'sitemap.xml'), xml);
console.log(`sitemap: wrote ${urls.length} URLs to dist/sitemap.xml`);

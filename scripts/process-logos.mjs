/**
 * Prepares the carrier logos for the site: trims the flat border around each
 * supplied file, scales it into a common box, and writes 1x and 2x PNGs to
 * public/logos/.
 *
 * The supplied files have a background baked in (white for most, blue for
 * Cigna) rather than real transparency, so the site shows them on white tiles.
 * That is also how carriers generally require their marks to appear.
 *
 * sharp is not a project dependency; CI never runs this.
 *
 *   npm install --no-save sharp
 *   node scripts/process-logos.mjs [source folder]
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = process.argv[2] ?? join(root, 'logos');
const outDir = join(root, 'public/logos');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('process-logos: sharp is not installed. Run: npm install --no-save sharp');
  process.exit(1);
}

/** Display box at 1x. Each logo is fitted inside it, keeping its proportions. */
const BOX = { width: 190, height: 52 };

const SPEC = [
  { name: 'cigna', src: 'Cigna.png' },
  { name: 'unitedhealthcare', src: 'United.png' },
  { name: 'aetna', src: 'aetna.png' },
  { name: 'humana', src: 'humana.png' },
  { name: 'bcbs', src: 'bcbs.png' },
];

mkdirSync(outDir, { recursive: true });
const rows = [];

for (const { name, src } of SPEC) {
  const input = readFileSync(join(sourceDir, src));
  const before = await sharp(input).metadata();
  // Removes the flat border around the mark, so every logo is sized by its own
  // artwork rather than by however much padding the file happened to carry.
  const trimmed = await sharp(input).trim({ threshold: 12 }).toBuffer();
  const after = await sharp(trimmed).metadata();

  for (const scale of [1, 2]) {
    const buf = await sharp(trimmed)
      .resize({
        width: BOX.width * scale,
        height: BOX.height * scale,
        fit: 'inside',
        withoutEnlargement: false,
      })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();
    writeFileSync(join(outDir, scale === 1 ? `${name}.png` : `${name}@2x.png`), buf);
    if (scale === 1) rows.push({ name, before: `${before.width}x${before.height}`, trimmed: `${after.width}x${after.height}`, size: (await sharp(buf).metadata()), bytes: buf.length });
  }
}

console.log('name              source      trimmed     1x shown     1x bytes');
for (const r of rows) {
  console.log(
    `${r.name.padEnd(17)} ${r.before.padEnd(11)} ${r.trimmed.padEnd(11)} ${`${r.size.width}x${r.size.height}`.padEnd(12)} ${Math.round(r.bytes / 1024)}KB`,
  );
}
console.log(`\nwrote ${rows.length * 2} files to public/logos/`);

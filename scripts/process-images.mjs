/**
 * Crops, resizes and compresses the site photography into public/images/, and
 * writes src/data/images.ts with each image's dimensions for SiteImage.
 *
 * sharp is deliberately not a project dependency, because CI never runs this.
 * To process a new batch of images:
 *
 *   npm install --no-save sharp
 *   node scripts/process-images.mjs <source folder>
 *
 * Source files are matched by the names in SPEC, so add new images there.
 * Keep generator-named originals out of the repo.
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = process.argv[2] ?? join(root, 'images');
const outDir = join(root, 'public/images');
const KB = 1024;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('process-images: sharp is not installed. Run: npm install --no-save sharp');
  process.exit(1);
}

/**
 * aspect: target width / height. width: the 1x width. budget: the most a 1x
 * file may weigh (150 KB unless set). crop: an explicit source region, used
 * instead of the centred crop.
 */
const SPEC = [
  // Both homepage images share one page, so together they stay under ~200 KB.
  { name: 'home-hero', src: 'ChatGPT Image Sep 14, 2026, 03_38_45 PM.png', aspect: 4 / 3, width: 1040, budget: 95 * KB },
  { name: 'home-new-england', src: 'ChatGPT Image Sep 14, 2026, 03_40_03 PM.png', aspect: 3 / 2, width: 1200, budget: 100 * KB },
  { name: 'areas-agent-call', src: 'ChatGPT Image Sep 14, 2026, 03_41_14 PM.png', aspect: 16 / 9, width: 1600 },
  { name: 'plan-hmo', src: 'Gemini_Generated_Image_fz0kzyfz0kzyfz0k.jpg', aspect: 16 / 9, width: 1200 },
  // Left-anchored and tighter than a centred crop, so the inn sign at the far
  // right (garbled lettering, from x=1113) falls outside the frame.
  { name: 'plan-ppo', src: 'Gemini_Generated_Image_nkh6oinkh6oinkh6.jpg', aspect: 16 / 9, width: 1200, crop: { left: 0, top: 140, width: 1100, height: 619 } },
  { name: 'plan-pffs', src: 'Gemini_Generated_Image_olhyeaolhyeaolhy.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'plan-msa', src: 'Gemini_Generated_Image_3falo83falo83fal.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'plan-snp', src: 'Gemini_Generated_Image_lgb100lgb100lgb1.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'veterans', src: 'Gemini_Generated_Image_tqdnfdtqdnfdtqdn.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'turning-65', src: 'Gemini_Generated_Image_93l5wy93l5wy93l5.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'employer-retirement', src: 'Gemini_Generated_Image_lanfh7lanfh7lanf.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'contact-office', src: 'Gemini_Generated_Image_imr2btimr2btimr2.jpg', aspect: 3 / 2, width: 1200 },
  { name: 'events-seminar', src: 'Gemini_Generated_Image_ovv8ilovv8ilovv8.jpg', aspect: 16 / 9, width: 1200 },
  { name: 'articles', src: 'Gemini_Generated_Image_1mgt2p1mgt2p1mgt.jpg', aspect: 16 / 9, width: 1200 },
  // Not shown on a page: the base for the social card (scripts/export-og-image.mjs).
  { name: 'og-background', src: 'Gemini_Generated_Image_z30e5mz30e5mz30e.jpg', aspect: 1200 / 630, width: 1200, cardOnly: true },
];

function centredCrop(srcW, srcH, aspect) {
  if (srcW / srcH > aspect) {
    const width = Math.round(srcH * aspect);
    return { left: Math.round((srcW - width) / 2), top: 0, width, height: srcH };
  }
  const height = Math.round(srcW / aspect);
  return { left: 0, top: Math.round((srcH - height) / 2), width: srcW, height };
}

/** Highest quality (from 80 down) whose output fits the byte budget. */
async function encode(pipeline, format, budget) {
  for (let quality = 80; quality >= 50; quality -= 4) {
    const buf =
      format === 'webp'
        ? await pipeline.clone().webp({ quality, effort: 6 }).toBuffer()
        : await pipeline.clone().jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
    if (buf.length <= budget || quality <= 52) return { buf, quality };
  }
}

mkdirSync(outDir, { recursive: true });
const dims = {};
const report = [];

for (const spec of SPEC) {
  const input = readFileSync(join(sourceDir, spec.src));
  const meta = await sharp(input).metadata();
  const crop = spec.crop ?? centredCrop(meta.width, meta.height, spec.aspect);
  const height = Math.round(spec.width / spec.aspect);
  const budget = spec.budget ?? 150 * KB;
  const cropped = sharp(input).extract(crop);

  const oneX = cropped.clone().resize(spec.width, height, { fit: 'fill' });
  const jpg = await encode(oneX, 'jpg', budget);
  writeFileSync(join(outDir, `${spec.name}.jpg`), jpg.buf);
  const row = { name: spec.name, crop: `${crop.width}x${crop.height}`, size: `${spec.width}x${height}`, jpg: jpg.buf.length, jq: jpg.quality };

  if (!spec.cardOnly) {
    const webp = await encode(oneX, 'webp', budget);
    writeFileSync(join(outDir, `${spec.name}.webp`), webp.buf);
    Object.assign(row, { webp: webp.buf.length, wq: webp.quality });

    // A 2x file only helps if the source has meaningfully more pixels than 1x;
    // otherwise it would be an upscale that costs bytes and adds no detail.
    let retinaWidth = null;
    if (crop.width >= spec.width * 1.25) {
      retinaWidth = Math.min(spec.width * 2, crop.width);
      const twoX = cropped.clone().resize(retinaWidth, Math.round(retinaWidth / spec.aspect), { fit: 'fill' });
      const webp2 = await encode(twoX, 'webp', budget * 2);
      writeFileSync(join(outDir, `${spec.name}@2x.webp`), webp2.buf);
      Object.assign(row, { retina: retinaWidth, webp2: webp2.buf.length });
    }
    dims[spec.name] = { width: spec.width, height, retinaWidth };
  }
  report.push(row);
}

const ts = `// Generated by scripts/process-images.mjs. Do not edit by hand.

export const images = ${JSON.stringify(dims, null, 2).replace(/"(\w+)":/g, '$1:')} as const;

export type ImageName = keyof typeof images;
`;
writeFileSync(join(root, 'src/data/images.ts'), ts);

const k = (n) => (n == null ? '' : `${Math.round(n / KB)}KB`);
console.log('name                 crop       1x size     jpg (q)      webp (q)     2x webp');
for (const r of report) {
  console.log(
    `${r.name.padEnd(20)} ${r.crop.padEnd(10)} ${r.size.padEnd(11)} ${`${k(r.jpg)} (${r.jq})`.padEnd(12)} ${r.webp ? `${k(r.webp)} (${r.wq})`.padEnd(12) : ''.padEnd(12)} ${r.retina ? `${r.retina}w ${k(r.webp2)}` : ''}`,
  );
}
const over = report.filter((r) => r.jpg > 150 * KB || (r.webp ?? 0) > 150 * KB);
console.log(over.length ? `OVER 150KB: ${over.map((r) => r.name).join(', ')}` : 'all 1x files within 150KB');
console.log(`wrote ${statSync(join(root, 'src/data/images.ts')).size} bytes to src/data/images.ts`);

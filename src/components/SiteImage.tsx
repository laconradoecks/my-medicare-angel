import { images, type ImageName } from '@/data/images';

/**
 * `sizes` hints for the layouts photography appears in, so the browser picks
 * the smallest file that still looks sharp.
 */
export const imageSizes = {
  hero: '(max-width: 900px) calc(100vw - 48px), 540px',
  article: '(max-width: 900px) calc(100vw - 48px), 780px',
  contact: '(max-width: 900px) calc(100vw - 48px), 520px',
  section: '(max-width: 908px) calc(100vw - 48px), 860px',
  banner: '(max-width: 1200px) calc(100vw - 48px), 1152px',
};

/**
 * Site photography from public/images/ (produced by scripts/process-images.mjs).
 * WebP with a JPEG fallback, explicit dimensions so nothing shifts while it
 * loads, and lazy loading unless `priority` is set (the homepage hero only).
 */
export function SiteImage({
  name,
  alt,
  sizes,
  priority = false,
  className,
}: {
  name: ImageName;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { width, height, retinaWidth } = images[name];
  const base = `/images/${name}`;
  const webpSet = retinaWidth
    ? `${base}.webp ${width}w, ${base}@2x.webp ${retinaWidth}w`
    : `${base}.webp ${width}w`;

  return (
    <picture className={className ? `site-picture ${className}` : 'site-picture'}>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <img
        className="site-img"
        src={`${base}.jpg`}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? undefined : 'async'}
        // React 18 does not recognise fetchPriority yet; the lowercase attribute passes through.
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  );
}

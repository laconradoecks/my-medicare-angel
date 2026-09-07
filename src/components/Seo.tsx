import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '@/config/site';

type SeoProps = {
  title: string;
  description: string;
  /** Set on pages that should not be indexed (e.g. the 404). */
  noindex?: boolean;
};

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/**
 * Per-page title, description, canonical and Open Graph tags. Kept dependency
 * free — it writes directly to document.head on navigation.
 */
export default function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Pages whose title already carries the brand (the homepage) are left alone.
    const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
    const url = `${site.url}${pathname === '/' ? '' : pathname}`;

    document.title = fullTitle;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow',
    });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: site.name });
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertLink('canonical', url);
  }, [title, description, noindex, pathname]);

  return null;
}

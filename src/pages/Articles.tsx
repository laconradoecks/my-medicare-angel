import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { TitleBand } from '@/components/Blocks';
import { SiteImage, imageSizes } from '@/components/SiteImage';
import { publishedArticles } from '@/data/articles';
import { paths } from '@/routes';

/**
 * Only written articles are listed. While the backlog is short that leaves gaps
 * in the three-up grid, so the row is filled out with guides that already exist
 * rather than with cards for articles nobody can read yet.
 */
const guides = [
  {
    to: paths.learn,
    title: 'Medicare Explained',
    excerpt: 'The four parts, what each one covers, and how they fit together.',
  },
  {
    to: paths.enrollment,
    title: 'Medicare Enrollment',
    excerpt: 'Every enrollment window, who it applies to, and the penalties for missing one.',
  },
  {
    to: paths.compare,
    title: 'Compare Your Options',
    excerpt: 'Advantage against Supplement, side by side, in plain language.',
  },
];

export default function Articles() {
  const fillers = guides.slice(0, Math.max(0, 3 - publishedArticles.length));

  return (
    <>
      <Seo
        title="Medicare Articles and Guides for New England"
        description="Plain English answers to the Medicare questions people actually search, written for Massachusetts, New England and New York residents."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Articles' }]}
        title="Medicare Articles & Guides"
        lede="Plain-English answers to the questions people actually search, alongside the guides that go with them."
      />
      <div className="wrap pagebody">
        <SiteImage
          name="articles"
          alt="A reader taking time with a Medicare guide"
          sizes={imageSizes.banner}
          className="banner-media"
        />
        <div className="cards3">
          {publishedArticles.map((article) => (
            <Link className="card-link" key={article.slug} to={paths.article(article.slug)}>
              <article className="card on-cream card-sm" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 21 }}>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="go">Read article →</span>
              </article>
            </Link>
          ))}
          {fillers.map((guide) => (
            <Link className="card-link" key={guide.to} to={guide.to}>
              <article className="card on-cream card-sm" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 21 }}>{guide.title}</h3>
                <p>{guide.excerpt}</p>
                <span className="go">Read guide →</span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

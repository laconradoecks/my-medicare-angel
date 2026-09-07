import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { TitleBand } from '@/components/Blocks';
import { articles } from '@/data/articles';
import { paths } from '@/routes';

export default function Articles() {
  return (
    <>
      <Seo
        title="Medicare Articles & Guides"
        description="Plain-English answers to the Medicare questions people actually search. Guides on enrollment, costs, plan types and appeals."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Articles' }]}
        title="Medicare Articles & Guides"
        lede="Plain-English answers to the questions people actually search. New articles added regularly."
      />
      <div className="wrap pagebody">
        <div className="cards3">
          {articles.map((article) => (
            <Link className="card-link" key={article.slug} to={paths.article(article.slug)}>
              <article className="card on-cream card-sm" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 21 }}>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="go">Read article →</span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

import { Navigate, useParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import { ArticleCta, ArticleLayout, Callout, SideCard, TitleBand } from '@/components/Blocks';
import { getArticle } from '@/data/articles';
import { paths } from '@/routes';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) return <Navigate to={paths.blog} replace />;

  const isDraft = article.body.length === 0;

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        // Unwritten articles stay out of the index until they have real content.
        noindex={isDraft}
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Articles', to: paths.blog },
          { label: article.crumb },
        ]}
        title={article.title}
        lede={`Published ${article.date} · Reviewed by a licensed agent`}
      />
      <ArticleLayout
        sidebar={
          <SideCard
            heading="More articles"
            links={[
              { label: 'All articles', to: paths.blog },
              { label: 'Turning 65 checklist', to: paths.turning65 },
              { label: 'Leaving employer coverage', to: paths.employer },
            ]}
          />
        }
      >
        {isDraft ? (
          <>
            <p>{article.excerpt}</p>
            <Callout>
              <strong>This article is still being written.</strong> In the meantime, a licensed agent
              will answer the same question directly, at no cost — or browse the guides in the
              sidebar.
            </Callout>
          </>
        ) : (
          article.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
            if (block.type === 'callout') return <Callout key={i}>{block.text}</Callout>;
            return (
              <p key={i}>
                {block.strong && <strong>{block.strong}</strong>} {block.text}
              </p>
            );
          })
        )}

        <ArticleCta
          title="Not sure which side you fall on?"
          sub="Tell us your situation and we will give you a straight answer."
        />
      </ArticleLayout>
    </>
  );
}

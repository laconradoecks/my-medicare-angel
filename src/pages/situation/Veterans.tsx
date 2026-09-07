import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  ContactSideCard,
  Parts,
  TitleBand,
} from '@/components/Blocks';
import { paths } from '@/routes';

export default function Veterans() {
  return (
    <>
      <Seo
        title="Medicare for Veterans: VA Benefits, TRICARE For Life and Medicare"
        description="VA care, TRICARE For Life and Medicare fit together in specific ways, and getting the order right can save you real money."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Veterans' }]}
        title="Medicare for Veterans: VA Benefits, TRICARE For Life and Medicare"
        lede="If you served, your benefits work differently. VA care, TRICARE For Life and Medicare fit together in specific ways, and getting the order right can save you real money."
      />
      <ArticleLayout sidebar={<ContactSideCard />}>
        <h2>VA coverage and Medicare are separate systems</h2>
        <p>
          VA health care covers you at VA facilities. Medicare covers you everywhere else. Many
          veterans keep both, because having Medicare means you are covered at any hospital or
          doctor, not only VA locations, and it protects you if VA priority groups or funding ever
          change.
        </p>

        <h2>Common situations we help with</h2>
        <Parts
          rows={[
            {
              term: '•',
              termWidth: 12,
              def: 'You have VA care and are turning 65: should you take Part B, and what happens if you delay?',
            },
            {
              term: '•',
              termWidth: 12,
              def: 'You have TRICARE For Life: how it pairs with Medicare, and what enrolling in Parts A and B means for you.',
            },
            {
              term: '•',
              termWidth: 12,
              def: 'You want drug coverage: when VA prescription benefits are enough, and when a Part D plan adds value.',
            },
          ]}
        />

        <ArticleCta
          title="Served? Let us serve you back."
          sub="A licensed agent who understands veteran benefits will walk you through it."
        />
      </ArticleLayout>
    </>
  );
}

import Seo from '@/components/Seo';
import { ArticleCta, ArticleLayout, Parts, SideCard, TitleBand } from '@/components/Blocks';
import { learnSectionNav } from '@/data/nav';
import { paths } from '@/routes';

export default function MedicareVsMedicaid() {
  return (
    <>
      <Seo
        title="Medicare vs. Medicaid: What Is the Difference?"
        description="Two similar names, two very different programs. The difference in plain terms, and what happens if you qualify for both."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare vs Medicaid' },
        ]}
        title="Medicare vs. Medicaid: What Is the Difference?"
        lede="Two similar names, two very different programs. Here is the difference in plain terms, and what happens if you qualify for both."
      />
      <ArticleLayout
        sidebar={
          <SideCard
            heading="In this section"
            links={learnSectionNav}
            currentPath={paths.learnMedicaid}
          />
        }
      >
        <Parts
          rows={[
            {
              term: 'Medicare',
              termWidth: 110,
              def: 'Federal health insurance based mainly on age (65+) or disability. The same nationwide, regardless of income.',
            },
            {
              term: 'Medicaid',
              termWidth: 110,
              def: 'A joint federal and state program based on income and need. Rules and benefits vary by state.',
            },
          ]}
        />

        <h2>Qualifying for both</h2>
        <p>
          Many people qualify for both programs at once. If that is you, special Medicare Advantage
          plans called Dual-Eligible Special Needs Plans (D-SNPs) are designed for your situation and
          often include significant extra help. This is one of the most valuable and least understood
          corners of Medicare, and well worth a conversation.
        </p>

        <ArticleCta
          title="Think you might qualify for both?"
          sub="A licensed agent will check, at no cost to you."
        />
      </ArticleLayout>
    </>
  );
}

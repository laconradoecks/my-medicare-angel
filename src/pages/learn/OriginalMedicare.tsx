import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  Callout,
  Parts,
  SideCard,
  TitleBand,
} from '@/components/Blocks';
import { learnSectionNav } from '@/data/nav';
import { paths } from '@/routes';

export default function OriginalMedicare() {
  return (
    <>
      <Seo
        title="Original Medicare: What Parts A and B Cover"
        description="The foundation of all Medicare coverage: hospital insurance and medical insurance, what each pays for, and what they leave out."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Original Medicare' },
        ]}
        title="Original Medicare: What Parts A and B Cover"
        lede="The foundation of all Medicare coverage: hospital insurance and medical insurance, what each pays for, and what they leave out."
      />
      <ArticleLayout
        sidebar={
          <SideCard
            heading="In this section"
            links={learnSectionNav}
            currentPath={paths.learnOriginal}
          />
        }
      >
        <h2>Part A: hospital insurance</h2>
        <p>
          Part A covers inpatient hospital stays, care in a skilled nursing facility after a hospital
          stay, hospice care, and some home health care. Most people pay no monthly premium for Part
          A, because they or a spouse paid Medicare taxes while working.
        </p>

        <h2>Part B: medical insurance</h2>
        <p>
          Part B covers doctor visits, outpatient care, preventive services like screenings and
          annual wellness visits, lab tests, and durable medical equipment. Part B has a monthly
          premium of [CURRENT PART B PREMIUM] for most people, and you generally pay 20 percent of
          the cost of covered services after a small annual deductible.
        </p>
        <Callout>
          <strong>The important gap:</strong> Original Medicare has no yearly limit on what you can
          pay out of pocket, and it does not cover most prescription drugs, dental, vision or
          hearing. That is why most people pair it with a Supplement and a Part D plan, or choose a
          Medicare Advantage plan instead.
        </Callout>

        <h2>What you pay</h2>
        <Parts
          rows={[
            {
              term: 'Part A',
              def: 'Usually no premium. A deductible applies per hospital benefit period.',
            },
            {
              term: 'Part B',
              def: 'A monthly premium plus about 20 percent of covered costs, with no annual cap.',
            },
          ]}
        />

        <ArticleCta
          title="Want to know what this means for your budget?"
          sub="A licensed agent will walk through the numbers for your situation."
        />
      </ArticleLayout>
    </>
  );
}

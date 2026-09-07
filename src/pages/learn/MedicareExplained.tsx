import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  Callout,
  ContactSideCard,
  Parts,
  SideCard,
  TitleBand,
} from '@/components/Blocks';
import { learnSectionNav } from '@/data/nav';
import { paths } from '@/routes';

export default function MedicareExplained() {
  return (
    <>
      <Seo
        title="Medicare Explained: Parts A, B, C and D in Plain English"
        description="What Medicare covers, who qualifies, when to enroll, and how Medicare Advantage, Supplements and Part D drug plans fit together."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Medicare Explained' }]}
        title="Medicare Explained: Parts A, B, C and D in Plain English"
        lede="What Medicare covers, who qualifies, when to enroll, and how Medicare Advantage, Supplements and Part D drug plans fit together. Everything starts here."
      />
      <ArticleLayout
        sidebar={
          <>
            <SideCard
              heading="In this section"
              links={[...learnSectionNav, { label: 'Compare your options', to: paths.compare }]}
              currentPath={paths.learn}
            />
            <ContactSideCard />
          </>
        }
      >
        <h2>What is Medicare?</h2>
        <p>
          Medicare is the federal health insurance program for people aged 65 and over, and for some
          younger people with disabilities. It is not one single plan. It comes in parts, and
          understanding those parts is the key to choosing well.
        </p>
        <Parts
          rows={[
            {
              term: 'Part A',
              def: 'Hospital insurance. Covers stays in hospital, care in a skilled nursing facility, and some home health care.',
            },
            {
              term: 'Part B',
              def: 'Medical insurance. Covers doctor visits, outpatient care, preventive services and medical equipment.',
            },
            {
              term: 'Part C',
              def: 'Medicare Advantage. Private all-in-one plans that bundle Parts A and B, and usually drug coverage too.',
            },
            {
              term: 'Part D',
              def: 'Prescription drug coverage, offered through private plans approved by Medicare.',
            },
          ]}
        />

        <h2>Who qualifies, and when?</h2>
        <p>
          Most people qualify at 65. Your first chance to enroll starts three months before the month
          you turn 65 and runs for seven months in total. Missing that window can mean paying more for
          the rest of your life, which is why the timing matters as much as the choice itself.
        </p>
        <Callout>
          <strong>Good to know:</strong> if you are still working at 65 and covered through your
          employer, different rules may apply. This is one of the most common situations we help
          people with.
        </Callout>

        <h2>The choice most people face</h2>
        <p>
          Once enrolled in Parts A and B, most people either add a Supplement and a drug plan, or
          switch to a Medicare Advantage plan. Neither path is better for everyone. The right answer
          depends on your health, your budget, your doctors and where you live, and that is exactly
          the conversation a licensed agent is for.
        </p>

        <ArticleCta
          title="Still have questions? That is normal."
          sub="Talk them through with a licensed agent, free of charge."
        />
      </ArticleLayout>
    </>
  );
}

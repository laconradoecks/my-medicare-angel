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

export default function Supplements() {
  return (
    <>
      <Seo
        title="Medicare Supplement (Medigap) Plans, Explained Simply"
        description="Add-on insurance that pays the share of medical bills Original Medicare leaves to you, in exchange for a predictable monthly premium."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Supplements' },
        ]}
        title="Medicare Supplement (Medigap) Plans, Explained Simply"
        lede="Add-on insurance that pays the share of medical bills Original Medicare leaves to you, in exchange for a predictable monthly premium."
      />
      <ArticleLayout
        sidebar={
          <>
            <SideCard
              heading="In this section"
              links={learnSectionNav}
              currentPath={paths.learnSupplements}
            />
            <SideCard
              heading="Compare"
              links={[{ label: 'Comparing Supplement plans', to: paths.compareSupplements }]}
            />
          </>
        }
      >
        <h2>What a Supplement does</h2>
        <p>
          Original Medicare pays roughly 80 percent of covered medical costs, with no cap on the
          rest. A Medicare Supplement, also called Medigap, picks up some or all of that remaining
          share: deductibles, the 20 percent coinsurance, and hospital costs beyond Medicare’s
          limits. You keep the freedom to see any doctor who accepts Medicare, anywhere in the
          country.
        </p>

        <h2>The good news: plans are standardized</h2>
        <p>
          Supplement plans are named by letters, and every plan with the same letter has identical
          benefits by law. A Plan G from one insurer covers exactly what a Plan G from another does.
          What differs is the price, which is why comparing insurers matters more than comparing
          brochures.
        </p>

        <h2>The plans, letter by letter</h2>
        <Parts
          rows={[
            {
              term: 'Plan A',
              termWidth: 84,
              def: 'The basic benefits: Part A coinsurance and hospital costs, Part B coinsurance or copays, the first three pints of blood, and hospice coinsurance.',
            },
            {
              term: 'Plan B',
              termWidth: 84,
              def: 'Everything in Plan A, plus the Part A deductible.',
            },
            {
              term: 'Plan C',
              termWidth: 84,
              def: 'Adds skilled nursing coinsurance, the Part B deductible and foreign travel emergency care. Only available if you were eligible for Medicare before January 1, 2020.',
            },
            {
              term: 'Plan D',
              termWidth: 84,
              def: 'Like Plan C, but without the Part B deductible.',
            },
            {
              term: 'Plan F',
              termWidth: 84,
              def: 'The most complete coverage, including the Part B deductible and Part B excess charges. Only available if you were eligible before January 1, 2020. A high-deductible version also exists.',
            },
            {
              term: 'Plan G',
              termWidth: 84,
              def: 'Everything in Plan F except the Part B deductible. A high-deductible version is also available.',
            },
            {
              term: 'Plan K',
              termWidth: 84,
              def: 'Pays 50 percent of many costs, with a yearly out-of-pocket limit, for a lower premium.',
            },
            {
              term: 'Plan L',
              termWidth: 84,
              def: 'Pays 75 percent of many costs, with a yearly out-of-pocket limit.',
            },
            {
              term: 'Plan M',
              termWidth: 84,
              def: 'Like Plan D, but pays only half of the Part A deductible.',
            },
            {
              term: 'Plan N',
              termWidth: 84,
              def: 'Similar to Plan G, but with copays of up to $20 for some office visits and up to $50 for emergency room visits that do not lead to an admission, and no coverage for Part B excess charges.',
            },
          ]}
        />
        <p>
          <strong>Live in Massachusetts?</strong> Massachusetts does not use these lettered plans. It
          has its own standardized Supplements: the Core Plan and Supplement 1A, plus Supplement 1 for
          people eligible for Medicare before 2020. Rules in other states can differ too, so ask us
          what applies where you live.
        </p>

        <Callout>
          <strong>Timing matters here more than anywhere:</strong> in the six months after you enroll
          in Part B, insurers must accept you regardless of your health. After that window, they can
          ask health questions and may charge more or decline.
        </Callout>

        <h2>What Supplements do not cover</h2>
        <p>
          Prescription drugs (that is what Part D is for), and generally not dental, vision or
          hearing. Most Supplement holders pair their plan with a Part D drug plan.
        </p>

        <ArticleCta
          title="Same coverage, different prices."
          sub="Let us compare Supplement prices across insurers for your age and zip code."
        />
      </ArticleLayout>
    </>
  );
}

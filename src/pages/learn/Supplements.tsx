import Seo from '@/components/Seo';
import { ArticleCta, ArticleLayout, Callout, SideCard, TitleBand } from '@/components/Blocks';
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

import Seo from '@/components/Seo';
import { ArticleCta, ArticleLayout, SideCard, TitleBand } from '@/components/Blocks';
import { learnSectionNav } from '@/data/nav';
import { paths } from '@/routes';

export default function PartD() {
  return (
    <>
      <Seo
        title="Medicare Part D: Prescription Drug Coverage Explained"
        description="How drug plans work, why the same medicine can cost different amounts on different plans, and why enrolling on time matters."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Part D Drug Plans' },
        ]}
        title="Medicare Part D: Prescription Drug Coverage Explained"
        lede="How drug plans work, why the same medicine can cost different amounts on different plans, and why enrolling on time matters."
      />
      <ArticleLayout
        sidebar={
          <SideCard
            heading="In this section"
            links={learnSectionNav}
            currentPath={paths.learnPartD}
          />
        }
      >
        <h2>How Part D works</h2>
        <p>
          Part D plans are sold by private insurers approved by Medicare. Each plan has a list of
          covered drugs, called a formulary, organized into tiers: generics on lower tiers cost
          little, brand-name and specialty drugs on higher tiers cost more. The same medication can
          sit on a different tier in different plans, which is why the right plan depends on the exact
          medicines you take.
        </p>

        <h2>The late enrollment penalty</h2>
        <p>
          If you go without drug coverage for more than 63 days after becoming eligible, Medicare adds
          a permanent penalty to your premium when you do enroll. Even if you take no medications
          today, a low-cost plan can protect you from that penalty.
        </p>

        <h2>How we help</h2>
        <p>
          We take your list of medications and pharmacies and check what each would actually cost
          across the plans in your area for the year ahead. Ten minutes of checking often saves
          hundreds of dollars.
        </p>

        <ArticleCta
          title="Bring us your medicine list."
          sub="We will find the plan where your prescriptions cost the least."
        />
      </ArticleLayout>
    </>
  );
}

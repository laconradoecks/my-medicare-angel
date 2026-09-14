import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  Callout,
  ImageSlot,
  Parts,
  SideCard,
  TitleBand,
} from '@/components/Blocks';
import { planTypeNav } from '@/data/nav';
import { paths } from '@/routes';

/** Copy from content/pages/hmo.md, used verbatim. */
export default function HmoPlans() {
  return (
    <>
      <Seo
        title="Medicare Advantage HMO Plans, Explained"
        description="How Medicare HMO plans work, what in network means, when referrals are needed, and who an HMO suits best, explained in plain English."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage', to: paths.learnAdvantage },
          { label: "HMO Plans" },
        ]}
        title="Medicare Advantage HMO Plans: How They Work"
        lede="The most common Medicare Advantage plan type, and usually the cheapest. The trade is simple. You accept a network, and the plan rewards you with low costs."
      />
      <ArticleLayout
        sidebar={
          <SideCard heading="Plan types" links={planTypeNav} currentPath={paths.maHmo} />
        }
      >
        <h2>What an HMO is</h2>

        <p>
          HMO stands for Health Maintenance Organization. An HMO plan builds a network of doctors,
          hospitals and pharmacies in your area, and your care happens inside that network.
          Emergencies are covered anywhere, and so is urgent care when you are away from home and
          dialysis, but routine care outside the network generally is not covered at all.
        </p>

        <h2>The rules that come with it</h2>

        <Parts
          rows={[
            {
              term: "Network",
              termWidth: 160,
              def: "You use the plan's doctors and hospitals. Going outside the network for routine care usually means paying the full cost yourself.",
            },
            {
              term: "Primary doctor",
              termWidth: 160,
              def: "Most HMOs ask you to choose a primary care doctor who coordinates your care.",
            },
            {
              term: "Referrals",
              termWidth: 160,
              def: "Seeing a specialist usually requires a referral from that primary doctor first.",
            },
            {
              term: "Drug coverage",
              termWidth: 160,
              def: "Usually built in. If an HMO includes drug coverage, you must take it from the plan, not from a separate Part D plan.",
            },
          ]}
        />

        <h2>What you get in return</h2>

        <p>
          Premiums are often low and frequently zero dollars. Copays are predictable, the plan has a
          yearly out of pocket maximum, and extras like dental, vision and hearing are often
          included. For people whose doctors are already in the network and whose care mostly
          happens near home, an HMO is often the best value in Medicare.
        </p>

        <Callout>
          <strong>The one question that decides it:</strong> are your doctors in the network? We
          check that before anything else, because the best priced plan is worthless if it does not
          include the doctor you trust.
        </Callout>

        <h2>Who an HMO suits</h2>

        <p>
          An HMO fits people who want the lowest monthly cost, get their care close to home, and do
          not mind their care being coordinated through one primary doctor. If you travel for months
          at a time or insist on seeing any specialist directly, look at a PPO instead.
        </p>

        <ImageSlot
          description="photo of a senior with their local doctor"
          alt="A Medicare member visiting a doctor in their HMO network"
        />

        <ArticleCta
          title="Is there a good HMO where you live?"
          sub="Plans change county by county. A licensed agent will check yours, free."
          ctaLabel="Get Free Medicare Help"
          ctaTo={paths.quote}
        />
      </ArticleLayout>
    </>
  );
}

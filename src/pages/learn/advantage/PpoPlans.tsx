import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  Callout,
  Parts,
  SideCard,
  TitleBand,
} from '@/components/Blocks';
import { SiteImage, imageSizes } from '@/components/SiteImage';
import { planTypeNav } from '@/data/nav';
import { paths } from '@/routes';

/** Copy from content/pages/ppo.md, used verbatim. */
export default function PpoPlans() {
  return (
    <>
      <Seo
        title="Medicare Advantage PPO Plans, Explained"
        description="How Medicare PPO plans work, what out of network coverage costs, and who a PPO suits, explained plainly for New England residents."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage', to: paths.learnAdvantage },
          { label: "PPO Plans" },
        ]}
        title="Medicare Advantage PPO Plans: Freedom With a Network"
        lede="A PPO keeps the all in one convenience of Medicare Advantage but loosens the rules. You can go outside the network, you just pay more when you do."
      />
      <ArticleLayout
        sidebar={
          <SideCard heading="Plan types" links={planTypeNav} currentPath={paths.maPpo} />
        }
      >
        <h2>What a PPO is</h2>

        <p>
          PPO stands for Preferred Provider Organization. Like an HMO, a PPO has a network of
          doctors and hospitals where your care costs least. Unlike an HMO, a PPO also covers care
          outside that network. You pay a larger share out of network, but you are covered, and you
          generally do not need referrals to see specialists.
        </p>

        <h2>The rules that come with it</h2>

        <Parts
          rows={[
            {
              term: "Network",
              termWidth: 160,
              def: "Cheapest care inside the network, but out of network care is still covered at a higher cost.",
            },
            {
              term: "Primary doctor",
              termWidth: 160,
              def: "Usually not required. You manage your own care.",
            },
            {
              term: "Referrals",
              termWidth: 160,
              def: "Usually not needed. Book the specialist directly.",
            },
            {
              term: "Drug coverage",
              termWidth: 160,
              def: "Usually built in, like most Medicare Advantage plans.",
            },
          ]}
        />

        <h2>The trade against an HMO</h2>

        <p>
          A PPO usually costs more per month than an HMO in the same county, and copays can be
          higher. What you are buying is flexibility: the specialist your neighbor recommended, the
          hospital across the state line, the doctor you see when visiting family. For people who
          split time between two places, that flexibility can be the whole decision.
        </p>

        <Callout>
          <strong>Living in New England makes this real.</strong> Networks stop at state lines more
          often than people expect, and a Massachusetts HMO may cover nothing routine in New
          Hampshire. If your life crosses borders, a PPO deserves a close look.
        </Callout>

        <h2>Who a PPO suits</h2>

        <p>
          People who want Medicare Advantage prices and extras but will not accept a hard network
          boundary: frequent travelers, people with specialists in another state, and anyone who
          wants to book specialists without asking permission first.
        </p>

        <SiteImage name="plan-ppo" alt="A retired couple who travel and use a Medicare PPO plan" sizes={imageSizes.article} />

        <ArticleCta
          title="HMO or PPO for your situation?"
          sub="Tell us how you live and we will tell you which one fits, free."
          ctaLabel="Get Free Medicare Help"
          ctaTo={paths.quote}
        />
      </ArticleLayout>
    </>
  );
}

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
import { SiteImage, imageSizes } from '@/components/SiteImage';
import { planTypeNav } from '@/data/nav';
import { paths } from '@/routes';

/** Copy from content/pages/pffs.md, used verbatim. */
export default function PffsPlans() {
  return (
    <>
      <Seo
        title="Medicare PFFS (Private Fee for Service) Plans, Explained"
        description="How Private Fee for Service Medicare plans work, why any doctor can accept or decline the plan, and who a PFFS plan actually suits."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage', to: paths.learnAdvantage },
          { label: "PFFS Plans" },
        ]}
        title="PFFS Plans: Private Fee for Service, Explained"
        lede="The least known Medicare Advantage type. No network in the usual sense, but a catch worth understanding before you choose one."
      />
      <ArticleLayout
        sidebar={
          <>
            <SideCard heading="Plan types" links={planTypeNav} currentPath={paths.maPffs} />
            <SideCard
              heading="Related guides"
              links={[
                { label: 'Original Medicare vs Advantage', to: paths.compare },
                { label: 'Medicare Enrollment', to: paths.enrollment },
                { label: 'Areas We Serve', to: paths.areas },
              ]}
            />
            <ContactSideCard />
          </>
        }
      >
        <h2>What a PFFS plan is</h2>

        <p>
          A Private Fee for Service plan is a Medicare Advantage plan that sets its own payment
          terms for doctors and hospitals. Instead of building a fixed network, the plan publishes
          what it will pay, and you can see any provider who agrees to those terms.
        </p>

        <h2>The catch</h2>

        <p>
          The provider decides, visit by visit, whether to accept the plan's terms. Your longtime
          doctor can take the plan in March and decline it in June, and a new doctor can decline it
          before your first appointment. Some PFFS plans do also run a network with providers who
          always accept, which softens this, but the visit by visit rule is what makes PFFS
          different from everything else.
        </p>

        <Parts
          rows={[
            {
              term: "Network",
              termWidth: 160,
              def: "Sometimes none, sometimes partial. Any provider who accepts the plan's terms can treat you.",
            },
            {
              term: "Referrals",
              termWidth: 160,
              def: "Not needed.",
            },
            {
              term: "Primary doctor",
              termWidth: 160,
              def: "Not required.",
            },
            {
              term: "Drug coverage",
              termWidth: 160,
              def: "Included in some PFFS plans, not all. If not included, you can add a separate Part D plan, which most other Advantage types do not allow.",
            },
          ]}
        />

        <Callout>
          <strong>Always ask before every visit.</strong> With a PFFS plan, the right habit is one
          question at the front desk: do you accept this plan's terms of payment? If the answer is
          no, that visit is not covered.
        </Callout>

        <h2>Who a PFFS plan suits</h2>

        <p>
          Honestly, a narrow group. PFFS can suit people in areas with few other Advantage options,
          or people whose regular providers have confirmed they accept the plan. For most people, an
          HMO or PPO gives more certainty. We say that plainly because our advice does not change
          with the plan we sell: it changes with your situation.
        </p>

        <SiteImage name="plan-pffs" alt="A Medicare member confirming that a clinic accepts their PFFS plan" sizes={imageSizes.article} />

        <ArticleCta
          title="Not sure if PFFS is right for you?"
          sub="It usually is not, but sometimes it is exactly right. A licensed agent will give you a straight answer."
          ctaLabel="Get Free Medicare Help"
          ctaTo={paths.quote}
        />
      </ArticleLayout>
    </>
  );
}

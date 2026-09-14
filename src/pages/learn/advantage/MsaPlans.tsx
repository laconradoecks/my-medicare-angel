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

/** Copy from content/pages/msa.md, used verbatim. */
export default function MsaPlans() {
  return (
    <>
      <Seo
        title="Medicare MSA (Medical Savings Account) Plans, Explained"
        description="How Medicare MSA plans combine a high deductible with a bank deposit you control, what they do not cover, and who they suit."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage', to: paths.learnAdvantage },
          { label: "MSA Plans" },
        ]}
        title="Medicare MSA Plans: A Deposit, a Deductible, and You in Control"
        lede="The most unusual Medicare Advantage type. The plan puts money into a savings account for you, and you manage your own care costs up to a high deductible."
      />
      <ArticleLayout
        sidebar={
          <SideCard heading="Plan types" links={planTypeNav} currentPath={paths.maMsa} />
        }
      >
        <h2>How an MSA works</h2>

        <p>
          A Medicare Medical Savings Account plan has two parts working together. First, a high
          deductible health plan: you pay for your Medicare covered care yourself until you reach
          the deductible, and after that the plan pays in full. Second, a savings account: each year
          the plan deposits money into an account you control, and you use it toward that
          deductible. Money you do not spend stays yours and rolls over to next year.
        </p>

        <Parts
          rows={[
            {
              term: "Premium",
              termWidth: 160,
              def: "Usually zero dollars for the plan itself.",
            },
            {
              term: "Deposit",
              termWidth: 160,
              def: "The plan funds your account every year. The deposit is smaller than the deductible, so the gap is your risk.",
            },
            {
              term: "Freedom",
              termWidth: 160,
              def: "See any provider who accepts Medicare. No networks, no referrals.",
            },
            {
              term: "Drug coverage",
              termWidth: 160,
              def: "Not included. You add a separate Part D plan for prescriptions.",
            },
          ]}
        />

        <h2>The trade to understand</h2>

        <p>
          In a healthy year, an MSA can feel brilliant: little care needed, the deposit rolls over,
          and your account grows. In a hard year you pay the full gap between the deposit and the
          deductible before the plan takes over. It rewards people who can absorb a bad year without
          hardship.
        </p>

        <Callout>
          <strong>Watch the account rules.</strong> MSA money spent on things that are not qualified
          medical expenses is taxed and penalized. Keep receipts, and ask us before using the
          account for anything unusual.
        </Callout>

        <h2>Who an MSA suits</h2>

        <p>
          Comfortable self managers: people in good health, with savings behind them, who want
          maximum provider freedom and like the idea of being rewarded for low usage. If predictable
          copays help you sleep, an HMO, PPO or a Supplement will suit you better.
        </p>

        <SiteImage name="plan-msa" alt="A Medicare member managing their Medical Savings Account" sizes={imageSizes.article} />

        <ArticleCta
          title="Could an MSA work for you?"
          sub="It depends on your health, your savings and your nerves. Talk it through with a licensed agent, free."
          ctaLabel="Get Free Medicare Help"
          ctaTo={paths.quote}
        />
      </ArticleLayout>
    </>
  );
}

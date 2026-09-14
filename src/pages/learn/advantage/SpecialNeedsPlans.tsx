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

/** Copy from content/pages/snp.md, used verbatim. */
export default function SpecialNeedsPlans() {
  return (
    <>
      <Seo
        title="Medicare Special Needs Plans (D-SNP and C-SNP), Explained"
        description="What Medicare Special Needs Plans are, who qualifies for a D-SNP or C-SNP, and the extra help these plans include, explained plainly."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage', to: paths.learnAdvantage },
          { label: "Special Needs Plans" },
        ]}
        title="Special Needs Plans: Medicare Built Around Your Situation"
        lede="Medicare Advantage plans designed for specific groups of people, with benefits shaped around their needs. If you qualify, these are often the most generous plans available."
      />
      <ArticleLayout
        sidebar={
          <SideCard heading="Plan types" links={planTypeNav} currentPath={paths.maSnp} />
        }
      >
        <h2>What a Special Needs Plan is</h2>

        <p>
          A Special Needs Plan is a Medicare Advantage plan that only accepts people in a particular
          situation, and in exchange tailors everything to that situation: the drug list, the
          specialists in the network, the extra benefits, even the care coordinators who call to
          check on you. Every SNP includes prescription drug coverage.
        </p>

        <h2>The two kinds you will meet here</h2>

        <Parts
          rows={[
            {
              term: "D-SNP",
              termWidth: 80,
              def: "For people who qualify for both Medicare and Medicaid at the same time, called dual eligibility. These plans often carry very low or zero costs and substantial extras, such as dental, transport to appointments and allowances for over the counter items or groceries.",
            },
            {
              term: "C-SNP",
              termWidth: 80,
              def: "For people living with certain chronic conditions, most commonly diabetes, heart conditions or lung disease. The plan's networks and drug lists are built around treating that condition well.",
            },
          ]}
        />

        <Callout>
          <strong>Many people who qualify never find out.</strong> Dual eligibility in particular
          goes unnoticed, because nobody connects the Medicaid card in one pocket with the Medicare
          card in the other. If money is tight, ask us to check. It costs nothing and the answer can
          change everything.
        </Callout>

        <h2>How qualifying works</h2>

        <p>
          For a D-SNP, we confirm your Medicaid status with the state. For a C-SNP, your doctor
          confirms the qualifying condition. Enrollment can often happen outside the usual windows,
          because qualifying for an SNP is itself a Special Enrollment event.
        </p>

        <h2>Who should ask about an SNP</h2>

        <p>
          Anyone on both Medicare and Medicaid, anyone finding Medicare costs genuinely hard to
          afford, and anyone managing a serious chronic condition. If that is you or someone you
          love, this is the first conversation to have.
        </p>

        <SiteImage name="plan-snp" alt="A family member helping a senior explore Medicare Special Needs Plans" sizes={imageSizes.article} />

        <ArticleCta
          title="Think you might qualify?"
          sub="We will check, free, and tell you plainly either way."
          ctaLabel="Get Free Medicare Help"
          ctaTo={paths.quote}
        />
      </ArticleLayout>
    </>
  );
}

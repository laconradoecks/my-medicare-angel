import Seo from '@/components/Seo';
import { ArticleCta, ArticleLayout, Callout, SideCard, TitleBand } from '@/components/Blocks';
import { paths } from '@/routes';

export default function EmployerCoverage() {
  return (
    <>
      <Seo
        title="Retiring After 65: Moving From Employer Coverage to Medicare"
        description="If you worked past 65 with employer insurance, you have a special enrollment window when that coverage ends. Here is how to land smoothly."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Leaving Employer Coverage' }]}
        title="Retiring After 65: Moving From Employer Coverage to Medicare"
        lede="If you worked past 65 with employer insurance, you have a special enrollment window when that coverage ends. Here is how to land smoothly."
      />
      <ArticleLayout
        sidebar={
          <SideCard
            heading="Related guides"
            links={[
              { label: 'Turning 65 checklist', to: paths.turning65 },
              { label: 'Part D drug plans', to: paths.learnPartD },
              { label: 'Supplements (Medigap)', to: paths.learnSupplements },
            ]}
          />
        }
      >
        <h2>Your special enrollment period</h2>
        <p>
          When you (or your spouse) stop working or lose employer coverage, you get an eight-month
          window to enroll in Part B without penalty. But drug coverage follows a stricter clock: you
          have about two months to get Part D coverage in place. Acting in the first month keeps
          everything seamless.
        </p>

        <h2>Watch out for COBRA</h2>
        <Callout>
          <strong>COBRA does not count</strong> as employer coverage for Medicare’s purposes. Staying
          on COBRA past 65 without enrolling in Part B can trigger lifelong penalties. This catches
          many people; do not let it catch you.
        </Callout>

        <h2>The order of operations</h2>
        <p>
          Confirm your last day of coverage, enroll in Parts A and B timed to that date, then choose
          your path (Supplement plus Part D, or Medicare Advantage) so everything starts the day your
          employer plan ends. We coordinate all three steps routinely.
        </p>

        <ArticleCta
          title="Retiring soon?"
          sub="Tell us your last day of work and we will map the exact dates for you."
        />
      </ArticleLayout>
    </>
  );
}

import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  Callout,
  Parts,
  SideCard,
  TitleBand,
} from '@/components/Blocks';
import { paths } from '@/routes';

export default function Turning65() {
  return (
    <>
      <Seo
        title="Turning 65: Your Medicare Enrollment Checklist"
        description="Your first enrollment window opens three months before your 65th birthday month. What to do, in order, so you never pay a late penalty."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Turning 65' }]}
        title="Turning 65: Your Medicare Enrollment Checklist"
        lede="Your first enrollment window opens three months before your 65th birthday month. Here is what to do, in order, so you never pay a late penalty."
      />
      <ArticleLayout
        sidebar={
          <SideCard
            heading="Related guides"
            links={[
              { label: 'Medicare Explained', to: paths.learn },
              { label: 'Leaving employer coverage', to: paths.employer },
              { label: 'Compare your options', to: paths.compare },
            ]}
          />
        }
      >
        <Parts
          rows={[
            {
              term: '3 months before',
              termWidth: 150,
              def: 'Your Initial Enrollment Period opens. Decide whether you need Part B now (yes for most people not covered by a current employer).',
            },
            {
              term: '2 months before',
              termWidth: 150,
              def: 'Choose your path: Original Medicare with a Supplement and Part D, or a Medicare Advantage plan. This is the conversation to have with an agent.',
            },
            {
              term: '1 month before',
              termWidth: 150,
              def: 'Enroll, so your coverage starts the month you turn 65 with no gap.',
            },
            {
              term: 'After 65',
              termWidth: 150,
              def: 'Your Medigap open enrollment continues for six months after Part B starts. Supplements are easiest to get in this window.',
            },
          ]}
        />
        <Callout>
          <strong>Still working with employer coverage?</strong> Different rules may apply and you
          may be able to delay without penalty. See our guide on leaving employer coverage, or just
          ask us.
        </Callout>

        <ArticleCta
          title="Your birthday is the deadline. Let us handle the rest."
          sub="One conversation now saves penalties later."
        />
      </ArticleLayout>
    </>
  );
}

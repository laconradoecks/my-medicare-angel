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
import { learnSectionNav } from '@/data/nav';
import { paths } from '@/routes';

/** Enrollment periods, added per client feedback (Initial, Annual, Special). */
export default function Enrollment() {
  return (
    <>
      <Seo
        title="Medicare Enrollment Periods: Initial, Annual, Special and Open"
        description="Every Medicare enrollment window explained: Initial, Annual (October 15 to December 7), Open (January 1 to March 31) and Special Enrollment Periods."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Enrollment' },
        ]}
        title="Medicare Enrollment Periods: Initial, Annual, Special and Open"
        lede="You can only join or change Medicare coverage at certain times. Here is when each enrollment period happens, who it is for, and what you can do during it."
      />
      <ArticleLayout
        sidebar={
          <>
            <SideCard
              heading="In this section"
              links={learnSectionNav}
              currentPath={paths.enrollment}
            />
            <SideCard
              heading="Related guides"
              links={[
                { label: 'Turning 65 checklist', to: paths.turning65 },
                { label: 'Leaving employer coverage', to: paths.employer },
              ]}
            />
            <ContactSideCard />
          </>
        }
      >
        <Parts
          rows={[
            {
              term: 'Initial',
              termWidth: 96,
              def: 'Your first chance to sign up, around your 65th birthday.',
            },
            {
              term: 'Annual',
              termWidth: 96,
              def: 'October 15 to December 7 every year, for changing your coverage.',
            },
            {
              term: 'Open',
              termWidth: 96,
              def: 'January 1 to March 31, for people already on a Medicare Advantage plan.',
            },
            {
              term: 'Special',
              termWidth: 96,
              def: 'Opens after certain life changes, such as losing employer coverage or moving.',
            },
          ]}
        />

        <h2 id="initial">Initial Enrollment Period</h2>
        <p>
          Your Initial Enrollment Period lasts seven months: the three months before the month you
          turn 65, your birthday month, and the three months after. During this window you can sign up
          for Part A and Part B, and join a Medicare Advantage plan or a Part D drug plan.
        </p>
        <p>
          If you already receive Social Security or Railroad Retirement benefits, you are enrolled in
          Parts A and B automatically. Everyone else signs up themselves. Signing up in the months
          before your birthday month means your coverage starts on the first day of the month you
          turn 65.
        </p>
        <Callout>
          <strong>Supplements have their own window:</strong> your Medigap Open Enrollment Period lasts
          six months, starting the month you are 65 or older and enrolled in Part B. Rules can differ
          by state, so ask us what applies where you live.
        </Callout>

        <h2 id="annual">Annual Enrollment Period</h2>
        <p>
          From October 15 to December 7 each year, anyone with Medicare can review and change their
          coverage, and the changes take effect on January 1. You can switch from Original Medicare
          to a Medicare Advantage plan or back again, move to a different Medicare Advantage plan, and
          join, switch or drop a Part D drug plan.
        </p>
        <p>
          From January 1 to March 31 each year there is also a General Enrollment Period, for
          signing up for Part A or Part B if you missed your Initial Enrollment Period; late
          enrollment penalties may apply.
        </p>

        <h2 id="open">Medicare Advantage Open Enrollment Period</h2>
        <p>
          If you are already in a Medicare Advantage plan and January arrives with regrets, you get
          one more chance. From January 1 to March 31 each year, you can switch to a different
          Medicare Advantage plan, or drop Medicare Advantage and return to Original Medicare with a
          Part D drug plan. You can make one change during this window, and it is only for people
          who already have a Medicare Advantage plan. Few people know this period exists, which is
          exactly why it is worth a call if your new plan is not what you expected.
        </p>

        <h2 id="special">Special Enrollment Periods</h2>
        <p>
          Certain life changes let you sign up or change plans outside the usual windows. If you or
          your spouse are still working and covered by that employer’s group health plan, you can sign
          up for Part A and Part B at any time while that coverage lasts, and for up to eight months
          after the job or the coverage ends, whichever happens first.
        </p>
        <p>
          Other common reasons include moving out of your plan’s service area, losing other health
          coverage, qualifying for Medicaid or Extra Help, and moving into or out of a nursing home.
          How long the window lasts, and which changes it allows, depends on the reason.
        </p>
        <Callout>
          <strong>COBRA and retiree coverage do not count</strong> as coverage from current
          employment. Relying on either past 65 without enrolling in Part B can lead to a late
          enrollment penalty.
        </Callout>

        <ArticleCta
          title="Not sure which enrollment period applies to you?"
          sub="Tell us your situation and a licensed agent will work out your dates with you."
        />
      </ArticleLayout>
    </>
  );
}

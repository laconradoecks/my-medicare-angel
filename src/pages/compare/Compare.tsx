import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { CompareTable, Guidance, TitleBand } from '@/components/Blocks';
import type { CompareTableData } from '@/components/Blocks';
import { paths } from '@/routes';

const table: CompareTableData = {
  keyHeading: 'What matters to you',
  columns: [
    { title: 'Original Medicare', small: '+ Supplement + Part D' },
    { title: 'Medicare Advantage', small: 'all-in-one plan' },
  ],
  rows: [
    {
      label: 'Choice of doctors',
      cells: [
        'See any doctor in the country who accepts Medicare. No referrals needed.',
        'Usually a network of doctors in your area; referrals may be required.',
      ],
    },
    {
      label: 'Monthly cost',
      cells: [
        'Higher monthly premiums, but very predictable out-of-pocket costs.',
        'Often low or $0 premium, but you pay as you go when you use care.',
      ],
    },
    {
      label: 'Drug coverage',
      cells: ['Added separately through a Part D plan.', 'Usually built into the plan.'],
    },
    {
      label: 'Extras (dental, vision, hearing)',
      cells: ['Not included; bought separately if wanted.', 'Often included, varies by plan.'],
    },
    {
      label: 'Travel',
      cells: [
        'Coverage travels with you across the country.',
        'Best suited to care near home; emergencies covered anywhere.',
      ],
    },
    {
      label: 'A good fit if you…',
      cells: [
        'want maximum freedom and predictable bills, and don’t mind a higher premium.',
        'want one simple plan, a low premium, and extras like dental included.',
      ],
    },
  ],
};

export default function Compare() {
  return (
    <>
      <Seo
        title="Original Medicare vs. Medicare Advantage: Which Is Right for You?"
        description="The biggest Medicare decision most people face, compared side by side: doctors, monthly costs, drug coverage, extras and travel."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Compare Plans' }]}
        title="Original Medicare vs. Medicare Advantage: Which Is Right for You?"
        lede="The biggest Medicare decision most people face, compared side by side: doctors, monthly costs, drug coverage, extras and travel. Neither is better for everyone; this table shows what actually differs."
      >
        <div className="pillrow">
          <Link className="pill" to={paths.compareAdvantage}>
            Comparing Advantage plans
          </Link>
          <Link className="pill" to={paths.compareSupplements}>
            Comparing Supplement plans
          </Link>
          <Link className="pill" to={paths.partners}>
            Our insurance partners
          </Link>
        </div>
      </TitleBand>

      <div className="wrap pagebody">
        <CompareTable data={table} />
        <Guidance>
          <strong>Your health, your doctors and your zip code change this picture.</strong> A
          ten-minute call with a licensed agent turns this general table into your specific answer.
        </Guidance>
      </div>
    </>
  );
}

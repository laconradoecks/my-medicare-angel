import Seo from '@/components/Seo';
import { CompareTable, Guidance, TitleBand } from '@/components/Blocks';
import type { CompareTableData } from '@/components/Blocks';
import { paths } from '@/routes';

const table: CompareTableData = {
  keyHeading: 'What matters to you',
  columns: [{ title: 'HMO' }, { title: 'PPO' }],
  rows: [
    {
      label: 'Doctors you can see',
      cells: [
        'The plan’s network; referrals usually needed for specialists.',
        'Any doctor, but network doctors cost less; usually no referrals.',
      ],
    },
    {
      label: 'Typical premium',
      cells: ['Lowest, often $0.', 'Somewhat higher for the extra freedom.'],
    },
    {
      label: 'Best suited to',
      cells: [
        'People whose doctors are in network and who value the lowest cost.',
        'People who want flexibility or see doctors in more than one place.',
      ],
    },
  ],
};

export default function CompareAdvantage() {
  return (
    <>
      <Seo
        title="Comparing Medicare Advantage Plans: HMO vs. PPO vs. SNP"
        description="Once you have chosen the Advantage path, the plan types differ in freedom, cost and who they are built for."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Compare Plans', to: paths.compare },
          { label: 'Medicare Advantage Plans' },
        ]}
        title="Comparing Medicare Advantage Plans: HMO vs. PPO vs. SNP"
        lede="Once you have chosen the Advantage path, the plan types differ in freedom, cost and who they are built for."
      />
      <div className="wrap pagebody">
        <CompareTable data={table} />
        <Guidance>
          <strong>There is a third type:</strong> Special Needs Plans (SNPs) serve people with
          certain chronic conditions or who qualify for both Medicare and Medicaid, and often include
          substantial extra help. Ask us whether you qualify.
        </Guidance>
      </div>
    </>
  );
}

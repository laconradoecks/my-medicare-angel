import Seo from '@/components/Seo';
import { CompareTable, Guidance, TitleBand } from '@/components/Blocks';
import type { CompareTableData } from '@/components/Blocks';
import { paths } from '@/routes';

const table: CompareTableData = {
  keyHeading: 'What matters to you',
  columns: [{ title: 'Plan G' }, { title: 'Plan N' }],
  rows: [
    {
      label: 'Coverage',
      cells: [
        'The most complete coverage available to new enrollees. After the small Part B deductible, virtually nothing to pay.',
        'Nearly as complete, but with small copays for some doctor and ER visits.',
      ],
    },
    {
      label: 'Premium',
      cells: ['Higher.', 'Lower, in exchange for the copays.'],
    },
    {
      label: 'Best suited to',
      cells: [
        'People who want maximum predictability and see doctors often.',
        'People in good health who prefer a lower monthly cost.',
      ],
    },
  ],
};

export default function CompareSupplements() {
  return (
    <>
      <Seo
        title="Comparing Medicare Supplement Plans: G, N and High-Deductible G"
        description="Supplement plans are standardized by law, so the real comparison is between a few popular letters, and then between insurers on price."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Compare Plans', to: paths.compare },
          { label: 'Supplement Plans' },
        ]}
        title="Comparing Medicare Supplement Plans: G, N and High-Deductible G"
        lede="Supplement plans are standardized by law, so the real comparison is between a few popular letters, and then between insurers on price."
      />
      <div className="wrap pagebody">
        <CompareTable data={table} />
        <Guidance>
          <strong>Remember: a Plan G is a Plan G everywhere.</strong> The benefits are identical by
          law, so the smart move is comparing what different insurers charge for the same letter. That
          comparison is exactly what we do for you, free.
        </Guidance>
      </div>
    </>
  );
}

import Seo from '@/components/Seo';
import { ArticleCta, ArticleLayout, Parts, SideCard, TitleBand } from '@/components/Blocks';
import { learnSectionNav } from '@/data/nav';
import { paths } from '@/routes';

export default function MedicareAdvantage() {
  return (
    <>
      <Seo
        title="Medicare Advantage (Part C): HMO, PPO and SNP Plans Explained"
        description="All-in-one plans from private insurers that replace how you receive your Medicare benefits, often with drug coverage and extras built in."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage' },
        ]}
        title="Medicare Advantage (Part C): HMO, PPO and SNP Plans Explained"
        lede="All-in-one plans from private insurers that replace how you receive your Medicare benefits, often with drug coverage and extras built in."
      />
      <ArticleLayout
        sidebar={
          <>
            <SideCard
              heading="In this section"
              links={learnSectionNav}
              currentPath={paths.learnAdvantage}
            />
            <SideCard
              heading="Compare"
              links={[
                { label: 'Original Medicare vs Advantage', to: paths.compare },
                { label: 'Comparing Advantage plans', to: paths.compareAdvantage },
              ]}
            />
          </>
        }
      >
        <h2>How Medicare Advantage works</h2>
        <p>
          With a Medicare Advantage plan, a private insurer approved by Medicare bundles your Part A
          and Part B benefits into one plan, usually adds drug coverage, and often includes extras
          like dental, vision and hearing. You still have Medicare; you simply receive it through the
          plan. Premiums are often low or even $0, and every plan has a yearly out-of-pocket maximum,
          which Original Medicare alone does not.
        </p>

        <h2>The main plan types</h2>
        <Parts
          rows={[
            {
              term: 'HMO',
              termWidth: 64,
              def: 'You use the plan’s network of doctors and usually need a referral for specialists. Typically the lowest premiums.',
            },
            {
              term: 'PPO',
              termWidth: 64,
              def: 'More freedom: you can see out-of-network doctors at a higher cost, and referrals are usually not needed.',
            },
            {
              term: 'SNP',
              termWidth: 64,
              def: 'Special Needs Plans, designed for people with certain chronic conditions or who qualify for both Medicare and Medicaid.',
            },
          ]}
        />

        <h2>The trade-off to understand</h2>
        <p>
          In exchange for the low premium and the extras, you generally agree to use the plan’s
          network and follow its rules. Whether that trade is worth it depends on your doctors, your
          medications and how much you travel, which is exactly what we help you weigh.
        </p>

        <ArticleCta
          title="Curious what Advantage plans exist in your area?"
          sub="Plans vary by county. A licensed agent will show you your actual options."
        />
      </ArticleLayout>
    </>
  );
}

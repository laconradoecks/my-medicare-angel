import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import {
  ArticleCta,
  ArticleLayout,
  ContactSideCard,
  Parts,
  SideCard,
  TitleBand,
} from '@/components/Blocks';
import { learnSectionNav, planTypeLinks } from '@/data/nav';
import { paths } from '@/routes';

export default function MedicareAdvantage() {
  return (
    <>
      <Seo
        title="Medicare Advantage Plans in Massachusetts and New England"
        description="HMO, PPO, PFFS, MSA and Special Needs Plans explained. Compare Medicare Advantage options across Greater Boston, New England and New York with a licensed agent, free."
      />
      <TitleBand
        crumbs={[
          { label: 'Home', to: paths.home },
          { label: 'Medicare Explained', to: paths.learn },
          { label: 'Medicare Advantage' },
        ]}
        title="Medicare Advantage (Part C): HMO, PPO, PFFS, MSA and Special Needs Plans"
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
            <SideCard heading="Plan types" links={planTypeLinks} />
            <SideCard
              heading="Compare"
              links={[
                { label: 'Original Medicare vs Advantage', to: paths.compare },
                { label: 'Comparing Advantage plans', to: paths.compareAdvantage },
              ]}
            />
            <ContactSideCard />
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
              term: (
                <Link to={paths.maHmo} style={{ color: 'inherit' }}>
                  HMO
                </Link>
              ),
              termWidth: 76,
              def: 'You use the plan’s network of doctors and usually need a referral for specialists. Typically the lowest premiums.',
            },
            {
              term: (
                <Link to={paths.maPpo} style={{ color: 'inherit' }}>
                  PPO
                </Link>
              ),
              termWidth: 76,
              def: 'More freedom: you can see out-of-network doctors at a higher cost, and referrals are usually not needed.',
            },
            {
              term: (
                <Link to={paths.maPffs} style={{ color: 'inherit' }}>
                  PFFS
                </Link>
              ),
              termWidth: 76,
              def: 'Private Fee-for-Service. The plan sets what it pays providers and what you pay. You can see any Medicare-approved doctor or hospital that accepts the plan’s terms, and they can decide visit by visit. If drug coverage is not included, you can usually add a separate Part D plan.',
            },
            {
              term: (
                <Link to={paths.maMsa} style={{ color: 'inherit' }}>
                  MSA
                </Link>
              ),
              termWidth: 76,
              def: 'Medical Savings Account. A high-deductible plan paired with a savings account the plan deposits money into each year, for health costs before you reach the deductible. MSA plans do not include drug coverage, so you would add a separate Part D plan.',
            },
            {
              term: (
                <Link to={paths.maSnp} style={{ color: 'inherit' }}>
                  D-SNP
                </Link>
              ),
              termWidth: 76,
              def: 'Dual-Eligible Special Needs Plan, for people who have both Medicare and Medicaid. These plans coordinate the two programs and typically include drug coverage and extra benefits, often at little or no premium.',
            },
            {
              term: (
                <Link to={paths.maSnp} style={{ color: 'inherit' }}>
                  C-SNP
                </Link>
              ),
              termWidth: 76,
              def: 'Chronic Condition Special Needs Plan, for people living with certain severe or disabling chronic conditions, such as diabetes, chronic heart failure or chronic lung disease. Doctors, benefits and drug coverage are organized around that condition.',
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

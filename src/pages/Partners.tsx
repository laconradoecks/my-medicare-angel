import Seo from '@/components/Seo';
import { Guidance, TitleBand } from '@/components/Blocks';
import { carriers } from '@/data/carriers';
import { paths } from '@/routes';

export default function Partners() {
  return (
    <>
      <Seo
        title="The Insurance Carriers We Work With"
        description="We are independent, which means we compare plans across multiple carriers and recommend what fits you, not what fits a quota."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Our Insurance Partners' }]}
        title="The Insurance Carriers We Work With"
        lede="We are independent, which means we compare plans across multiple carriers and recommend what fits you, not what fits a quota."
      />
      <div className="wrap pagebody">
        <div className="cards3" style={{ marginBottom: 36 }}>
          {carriers.map((carrier, i) => (
            <div className="card on-cream" key={i}>
              <div className="chip" style={{ height: 70 }}>
                {carrier.logo ? <img src={carrier.logo} alt={carrier.name} /> : carrier.name}
              </div>
              <p style={{ fontSize: 16 }}>{carrier.blurb}</p>
            </div>
          ))}
        </div>
        <Guidance>
          We do not offer every plan available in your area. Any information we provide is limited to
          the plans we do offer. For all options, contact Medicare.gov or 1-800-MEDICARE.
        </Guidance>
      </div>
    </>
  );
}

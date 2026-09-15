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
import { SiteImage, imageSizes } from '@/components/SiteImage';
import { paths } from '@/routes';

/** Copy from content/pages/areas-we-serve.md, used verbatim. */
export default function AreasWeServe() {
  return (
    <>
      <Seo
        title="Medicare Help in Massachusetts, New England and New York"
        description="My Medicare Angel serves Greater Boston and communities across Massachusetts, Maine, New Hampshire, Rhode Island, Connecticut and New York, by phone or in person."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Areas We Serve' }]}
        title="Where We Work: Greater Boston, New England and New York"
        lede="Medicare advice has to be local, because the plans are. Here is where we serve, and why your location is the first thing we ask."
      />
      <ArticleLayout
        sidebar={
          <>
            <SideCard
              heading="Explore"
              links={[
                { label: 'Get Medicare Help', to: paths.quote },
                { label: 'Book a Call', to: paths.book },
                { label: 'Medicare Explained', to: paths.learn },
                { label: 'Compare Plans', to: paths.compare },
              ]}
            />
            <SideCard
              heading="Popular guides"
              links={[
                { label: 'Turning 65', to: paths.turning65 },
                { label: 'Leaving Employer Coverage', to: paths.employer },
                { label: 'Medicare Enrollment', to: paths.enrollment },
              ]}
            />
            <ContactSideCard />
          </>
        }
      >
        <h2>Based in Waltham, at home across the region</h2>

        <p>
          Our office is at 56 Russell Street, Suite A in Waltham, Massachusetts, minutes from
          Boston. Most of our clients never need to visit: nearly everything we do happens in one or
          two phone calls. That is how one agency can genuinely serve six states without losing the
          local knowledge that makes the advice good.
        </p>

        <h2>Why local matters in Medicare</h2>

        <p>
          Medicare itself is the same everywhere, but the plans built on top of it are not. Medicare
          Advantage and Part D drug plans are approved county by county, networks of doctors and
          hospitals change at state lines, and Supplement prices for the very same lettered plan
          differ from one state to the next. A recommendation that ignores geography is a guess.
          Ours starts with where you live.
        </p>

        <h2>The areas we serve</h2>

        <Parts
          rows={[
            {
              term: "Massachusetts",
              termWidth: 160,
              def: "Our home state. Greater Boston, MetroWest and communities across the Commonwealth.",
            },
            {
              term: "Maine",
              termWidth: 160,
              def: "From Portland to the smaller towns, by phone wherever you are.",
            },
            {
              term: "New Hampshire",
              termWidth: 160,
              def: "Plan options change fast near the Massachusetts border; we know both sides of it.",
            },
            {
              term: "Rhode Island",
              termWidth: 160,
              def: "Providence and statewide.",
            },
            {
              term: "Connecticut",
              termWidth: 160,
              def: "Hartford, New Haven and across the state.",
            },
            {
              term: "New York",
              termWidth: 160,
              def: "From the city to upstate, we compare the plans available in your county.",
            },
          ]}
        />

        <Callout>
          <strong>Snowbirds welcome.</strong> If you winter in Florida or Arizona and summer in New
          England, tell us. Plan networks treat travel very differently, and it changes which plan
          we recommend.
        </Callout>

        <h2>The same help, wherever you are</h2>

        <p>
          Whichever state you call from, the process is the same: tell us your situation, we compare
          the plans actually offered where you live, and we help you enroll. Our guidance is free,
          because agents are paid by insurance carriers, never by you.
        </p>

        <SiteImage name="areas-agent-call" alt="A licensed Medicare agent helping a client over the phone" sizes={imageSizes.article} />

        <ArticleCta
          title="Tell us where you live and take it from there."
          sub="A licensed agent will call you back with the options for your area."
          ctaLabel="Get Free Medicare Help"
          ctaTo={paths.quote}
        />
      </ArticleLayout>
    </>
  );
}

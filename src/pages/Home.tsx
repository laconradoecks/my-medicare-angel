import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { CtaBand, Testimonial } from '@/components/Blocks';
import { CardIcon, ClockIcon, ShieldIcon, TickIcon } from '@/components/Icons';
import { homepageCarriers } from '@/data/carriers';
import { paths } from '@/routes';
import { site } from '@/config/site';

const paths3 = [
  {
    icon: <CardIcon />,
    title: 'Original Medicare',
    body: 'The government program itself: Part A for hospital care and Part B for doctor visits. The foundation everything else builds on.',
    to: paths.learnOriginal,
  },
  {
    icon: <ClockIcon />,
    title: 'Medicare Advantage',
    body: 'All-in-one plans from private insurers that bundle hospital, doctor and often drug coverage, sometimes with dental and vision.',
    to: paths.learnAdvantage,
  },
  {
    icon: <ShieldIcon />,
    title: 'Medicare Supplements',
    body: 'Add-on plans that pay the costs Original Medicare leaves behind, so an unexpected bill never catches you off guard.',
    to: paths.learnSupplements,
  },
];

const steps = [
  {
    n: 1,
    title: 'Tell us about yourself',
    body: 'Fill in a short form or call us. Two minutes, a few simple questions.',
  },
  {
    n: 2,
    title: 'Talk it through',
    body: 'A licensed agent explains the plans available where you live and answers every question, with no pressure.',
  },
  {
    n: 3,
    title: 'Enroll with confidence',
    body: 'We handle the paperwork and stay your point of contact for as long as you keep the plan.',
  },
];

export default function Home() {
  return (
    <>
      <Seo title={`${site.name} — Medicare Made Clear`} description={site.description} />

      {/* Hero */}
      <div className="wrap">
        <section className="hero">
          <div className="hero-copy">
            <div className="kicker">MEDICARE, MADE CLEAR</div>
            <h1>The right Medicare plan, chosen with someone you trust.</h1>
            <div className="hero-sub">
              Turning 65 or reviewing your coverage? A licensed agent will walk you through your
              options in plain English and help you enroll. Our guidance costs you nothing.
            </div>
            <div className="hero-cta">
              <Link className="btn btn-amber" to={paths.quote}>
                Get My Free Quote
              </Link>
              <Link className="navlink" to={paths.learn} style={{ fontSize: 18 }}>
                New to Medicare? Start here
              </Link>
            </div>
            <div className="ticks">
              <span className="tick">
                <TickIcon /> No cost to you
              </span>
              <span className="tick">
                <TickIcon /> Licensed agents
              </span>
              <span className="tick">
                <TickIcon /> No obligation
              </span>
            </div>
          </div>
          {/* TODO: replace with the real hero photograph before launch. */}
          <div className="photo">[Photo: a couple in their late 60s, relaxed and smiling]</div>
        </section>
      </div>

      {/* Three paths */}
      <div className="band-white">
        <section className="wrap sect">
          <h2>Three ways to get covered</h2>
          <div className="sub">Most people end up on one of these paths. We help you find yours.</div>
          <div className="cards3">
            {paths3.map((p) => (
              <div className="card" key={p.title}>
                {p.icon}
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link className="go" to={p.to}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* How it works */}
      <section className="wrap sect">
        <h2>How it works</h2>
        <div className="sub">Three steps, and we stay with you after you enroll.</div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="stepnum" aria-hidden="true">
                {s.n}
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Independent help */}
      <div className="band-white">
        <section className="wrap sect">
          <h2>Independent Medicare help, built around you</h2>
          <p style={{ maxWidth: 860, fontSize: 19, margin: '0 0 36px' }}>
            {site.name} is an independent Medicare insurance agency. We help people compare Medicare
            Advantage plans, Medicare Supplement (Medigap) plans and Part D prescription drug
            coverage, whether you are turning 65, retiring and leaving employer coverage, or
            reviewing your options during the Annual Enrollment Period. Because we are independent,
            our advice starts with your situation, not with any one carrier’s products.
          </p>
          <div className="cards4">
            <Link className="card-link" to={paths.book}>
              <div className="card card-sm" style={{ height: '100%' }}>
                <h3>Book online</h3>
                <p>Pick a time that suits you. No phone tag, no waiting on hold.</p>
                <span className="go">Book a consultation →</span>
              </div>
            </Link>
            <div className="card card-sm">
              <h3>Clear comparisons</h3>
              <p>Side-by-side tables and plain English, never walls of jargon.</p>
            </div>
            <div className="card card-sm">
              <h3>With you every year</h3>
              <p>We review your plan at every enrollment period, for as long as you keep it.</p>
            </div>
            <div className="card card-sm">
              <h3>Independent advice</h3>
              <p>We compare across carriers and tell you honestly what we can and cannot offer.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Carriers */}
      <section className="wrap" style={{ padding: '44px 24px' }}>
        <div className="eyebrow">WE WORK WITH TRUSTED CARRIERS</div>
        <div className="carriers">
          {homepageCarriers.map((carrier, i) => (
            <div className="chip" key={i}>
              {carrier.logo ? <img src={carrier.logo} alt={carrier.name} /> : carrier.name}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial — TODO: replace with a real, permissioned client quote. */}
      <Testimonial
        quote="I put off dealing with Medicare for months because it felt overwhelming. One phone call sorted the whole thing out."
        attribution="[Client name], [City]"
      />

      <CtaBand />
    </>
  );
}

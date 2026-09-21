import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes';
import { site } from '@/config/site';
import type { Carrier } from '@/data/carriers';
import { InfoIcon, QuoteMarkIcon } from './Icons';

/* ---------------------------------------------------------------- Title band */

type Crumb = { label: string; to?: string };

export function TitleBand({
  crumbs,
  title,
  lede,
  region = false,
  mobileCta = false,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lede?: ReactNode;
  /** Adds the service-area line under the lede. */
  region?: boolean;
  /** Adds a phone-only "Get Medicare Help" button, so plan pages carry one at the top as well as the foot. */
  mobileCta?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="titleband">
      <div className="wrap">
        <div className="crumb">
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`}>
              {i > 0 && ' › '}
              {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
            </span>
          ))}
        </div>
        <h1>{title}</h1>
        {lede && <div className="lede">{lede}</div>}
        {region && (
          <p className="region-note">
            Licensed agents serving Greater Boston, Massachusetts and all of New England, plus New
            York. <Link to={paths.areas}>See the areas we serve</Link>
          </p>
        )}
        {mobileCta && (
          <Link className="btn btn-amber mobile-cta" to={paths.quote}>
            Get Medicare Help
          </Link>
        )}
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Article layout */

export function ArticleLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <div className="wrap article-layout">
      <article className="article">{children}</article>
      {sidebar && <aside className="sidebar">{sidebar}</aside>}
    </div>
  );
}

export function SideCard({
  heading,
  links,
  currentPath,
}: {
  heading: string;
  links: { label: string; to: string }[];
  currentPath?: string;
}) {
  return (
    <div className="sidecard">
      <div className="h">{heading}</div>
      {links.map((link) =>
        link.to === currentPath ? (
          <span className="here" key={link.to}>
            {link.label}
          </span>
        ) : (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
}

export function ContactSideCard() {
  return (
    <div className="sidecard sidecall">
      <div className="h">Have a question?</div>
      <div style={{ fontSize: 16, color: 'var(--muted)' }}>
        Send us a message and a licensed agent will get back to you within one business day.
      </div>
      <Link className="btn btn-teal btn-block" to={paths.contact}>
        Contact Us
      </Link>
      <div style={{ fontSize: 15, color: 'var(--muted)' }}>
        Or call{' '}
        <a href={site.phone.href}>
          <strong>{site.phone.display}</strong>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Callouts */

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="callout">
      <InfoIcon />
      <div>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------- Parts / rows */

export type PartRow = { term: ReactNode; def: ReactNode; termWidth?: number };

export function Parts({ rows }: { rows: PartRow[] }) {
  return (
    <div className="parts">
      {rows.map((row, i) => (
        <div className="partrow" key={i}>
          <div className="p" style={row.termWidth ? { minWidth: row.termWidth } : undefined}>
            {row.term}
          </div>
          <div>{row.def}</div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------- CTAs */

export function ArticleCta({
  title,
  sub,
  ctaLabel = 'Get Medicare Help',
  ctaTo = paths.quote,
  secondaryLabel,
  secondaryTo,
}: {
  title: string;
  sub: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <div className="article-cta">
      <div>
        <div className="t">{title}</div>
        <div className="s">{sub}</div>
      </div>
      <div className="cta-actions">
        <Link className="btn btn-amber" to={ctaTo}>
          {ctaLabel}
        </Link>
        {secondaryLabel && secondaryTo && (
          <Link className="btn btn-ghost" to={secondaryTo}>
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

export function CtaBand() {
  return (
    <div className="ctaband">
      <div className="wrap ctaband-in">
        <div>
          <h2>Ready to make sense of Medicare?</h2>
          <div className="sub">Talk to a licensed agent today. Free, friendly, and in plain English.</div>
        </div>
        <div className="acts">
          <Link className="btn btn-amber" to={paths.quote}>
            Get Medicare Help
          </Link>
          <Link className="btn btn-ghost" to={paths.compare}>
            Compare Plans First
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Guidance({
  children,
  ctaLabel = 'Get Medicare Help',
  ctaTo = paths.quote,
}: {
  children: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <div className="guidance">
      <div className="txt">{children}</div>
      <Link className="btn btn-amber" to={ctaTo}>
        {ctaLabel}
      </Link>
    </div>
  );
}

/* ----------------------------------------------------------- Compare tables */

export type CompareTableData = {
  keyHeading: string;
  columns: { title: string; small?: string }[];
  rows: { label: string; cells: string[] }[];
};

export function CompareTable({ data }: { data: CompareTableData }) {
  return (
    <div className="cmp">
      <div className="cmp-scroll">
        <div className="cmp-grid" role="table">
          <div className="cmp-h dim" role="columnheader">
            {data.keyHeading}
          </div>
          {data.columns.map((col) => (
            <div className="cmp-h" role="columnheader" key={col.title}>
              {col.title}
              {col.small && <span className="small">{col.small}</span>}
            </div>
          ))}
          {data.rows.map((row) => (
            <Row key={row.label} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ row }: { row: { label: string; cells: string[] } }) {
  return (
    <>
      <div className="cmp-k" role="rowheader">
        {row.label}
      </div>
      {row.cells.map((cell, i) => (
        <div className="cmp-c" role="cell" key={i}>
          {cell}
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ Testimonials */

export function Testimonials({
  items,
  placeholders = false,
}: {
  items: { quote: string; attribution: string }[];
  placeholders?: boolean;
}) {
  return (
    <div className="band-white">
      <section className="wrap sect">
        <h2>What clients say</h2>
        {placeholders && (
          <div className="sub">
            [Sample testimonials, shown until real client quotes are collected]
          </div>
        )}
        <div className="testimonials">
          {items.map((t) => (
            <figure className="card on-cream testimonial" key={t.quote}>
              <QuoteMarkIcon />
              <blockquote className="q">“{t.quote}”</blockquote>
              <figcaption className="attrib">{t.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- Carriers */

/** A carrier's logo on a white tile, or its name where there is no logo. */
export function CarrierChip({ carrier, height }: { carrier: Carrier; height?: number }) {
  const style = height ? { height } : undefined;
  if (!carrier.logo) {
    return (
      <div className="chip named" style={style}>
        {carrier.name}
      </div>
    );
  }
  return (
    <div className="chip logo" style={style}>
      <img
        src={carrier.logo}
        srcSet={`${carrier.logo} 1x, ${carrier.logo.replace('.png', '@2x.png')} 2x`}
        alt={carrier.name}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ------------------------------------------------------- Reassurance points */

export function Point({ children }: { children: ReactNode }) {
  return <div className="point">{children}</div>;
}

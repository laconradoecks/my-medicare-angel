import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes';
import { InfoIcon, QuoteMarkIcon } from './Icons';

/* ---------------------------------------------------------------- Title band */

type Crumb = { label: string; to?: string };

export function TitleBand({
  crumbs,
  title,
  lede,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lede?: ReactNode;
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
      <Link className="btn btn-teal" style={{ width: '100%' }} to={paths.contact}>
        Contact Us
      </Link>
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
  ctaLabel = 'Get My Free Quote',
  ctaTo = paths.quote,
}: {
  title: string;
  sub: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <div className="article-cta">
      <div>
        <div className="t">{title}</div>
        <div className="s">{sub}</div>
      </div>
      <Link className="btn btn-amber" to={ctaTo}>
        {ctaLabel}
      </Link>
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
            Get My Free Quote
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
  ctaLabel = 'Get My Free Quote',
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

/* ------------------------------------------------------------- Testimonial */

export function Testimonial({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className="wrap sect">
      <figure className="quoteblock" style={{ margin: 0 }}>
        <QuoteMarkIcon />
        <blockquote className="q" style={{ margin: 0 }}>
          “{quote}”
        </blockquote>
        <figcaption className="attrib">{attribution}</figcaption>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------- Reassurance points */

export function Point({ children }: { children: ReactNode }) {
  return <div className="point">{children}</div>;
}

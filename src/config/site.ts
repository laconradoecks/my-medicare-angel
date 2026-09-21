/**
 * Single source of truth for everything that differs between the prototype and
 * the live site. Anything still marked TODO was a placeholder in the designs
 * and must be filled in before launch — see README.md.
 */

export const site = {
  name: 'My Medicare Angel',
  legalName: 'My Medicare Angel',
  parentCompany: 'Kyzer Solutions',
  /** Used for canonical URLs, sitemap.xml and Open Graph tags. */
  url: 'https://www.mymedicareangel.com',
  tagline: 'Medicare, made clear',
  description:
    'Independent Medicare agency serving Greater Boston, Massachusetts and all of New England plus New York. Licensed agents explain your options in plain English and help you enroll, free.',
  /**
   * Footer brand block, in two paragraphs. Every claim here already appears on
   * the site (the homepage "Independent Medicare help" section and the How it
   * works steps) — nothing about the agency's history or scale is invented.
   */
  blurb:
    'An independent Medicare insurance agency. We explain your options in plain English, compare plans across carriers, and help you enroll with confidence, at no cost to you.',
  blurbMore:
    'From Greater Boston across New England and New York, whether you are turning 65, leaving employer coverage or reviewing your plan at Annual Enrollment, a licensed agent compares your options and stays your point of contact.',

  phone: {
    display: '(617) 560-0821',
    href: 'tel:+16175600821',
  },
  hours: 'Mon–Fri, 9am–5pm',
  // TODO: confirm the public inbox before launch (placeholder in the designs).
  email: 'info@mymedicareangel.com',
  address: {
    street: '56 Russell Street, Suite A',
    city: 'Waltham',
    state: 'MA',
    zip: '02453',
    get oneLine() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },

  /** CMS-required marketing disclaimer, shown in the footer on every page. */
  disclaimer:
    'My Medicare Angel is a Kyzer Solutions company. We are a non-governmental agency, not affiliated with or endorsed by any government program. We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.',

  /**
   * Where the lead forms POST. Production defaults to public/api/lead.php,
   * which runs on the site's own hosting and mails enquiries to the agency, so
   * leads never pass through a third-party form service. VITE_FORM_ENDPOINT
   * overrides it. In dev there is no PHP, so forms stay in preview mode:
   * they validate and show the success state without sending anything.
   */
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT ?? (import.meta.env.DEV ? '' : '/api/lead.php'),
} as const;

export const isDemoForms = !site.formEndpoint;

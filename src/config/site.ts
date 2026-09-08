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
    'Independent Medicare insurance agency. Licensed agents explain Medicare Advantage, Supplements and Part D in plain English and help you enroll, at no cost to you.',
  /** Footer only. The condensed wording from the MobileHome artboard — the long
      version made the footer's brand block twice the height of the link columns. */
  blurb:
    'An independent Medicare insurance agency. Plain-English guidance, plans compared across carriers, no cost to you.',

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
   * Where the lead forms POST. Set VITE_FORM_ENDPOINT in .env to a real
   * handler (Formspree, Netlify Forms, your own API). When it is unset the
   * forms run in demo mode: they validate and show the success state without
   * sending anything, exactly like the prototype.
   */
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT ?? '',
} as const;

export const isDemoForms = !site.formEndpoint;

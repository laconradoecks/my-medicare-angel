/**
 * The carriers the agency works with, as confirmed by the client. Listed in the
 * client's order and shown as text names: carriers set brand-usage rules for
 * agents, so add a `logo` (a path under /public) only once there is permission
 * to use it: the supplied files are processed by scripts/process-logos.mjs.
 * `blurb` is optional; leave it out rather than guess at a carrier's plans or
 * strengths.
 */

export type Carrier = {
  name: string;
  logo?: string;
  blurb?: string;
};

export const carriers: Carrier[] = [
  { name: 'Cigna', logo: '/logos/cigna.png' },
  { name: 'UnitedHealthcare', logo: '/logos/unitedhealthcare.png' },
  { name: 'Aetna', logo: '/logos/aetna.png' },
  { name: 'Humana', logo: '/logos/humana.png' },
  { name: 'Blue Cross Blue Shield', logo: '/logos/bcbs.png' },
];

/** The homepage strip shows all of them. */
export const homepageCarriers = carriers;

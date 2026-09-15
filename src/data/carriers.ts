/**
 * The carriers the agency works with, as confirmed by the client. Listed in the
 * client's order and shown as text names: carriers set brand-usage rules for
 * agents, so add a `logo` (a path under /public) only once there is permission
 * to use it. `blurb` is optional; leave it out rather than guess at a carrier's
 * plans or strengths.
 */

export type Carrier = {
  name: string;
  logo?: string;
  blurb?: string;
};

export const carriers: Carrier[] = [
  { name: 'Cigna' },
  { name: 'UnitedHealthcare' },
  { name: 'Aetna' },
  { name: 'Humana' },
  { name: 'Blue Cross Blue Shield' },
];

/** The homepage strip shows all of them. */
export const homepageCarriers = carriers;

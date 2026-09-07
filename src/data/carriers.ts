/**
 * Carrier logos were placeholders in the designs and must reflect actual
 * contracts before launch (see the canvas annotation and the disclaimers page).
 * Add `logo` (a path under /public) and a real `blurb` as each is confirmed.
 */

export type Carrier = {
  name: string;
  logo?: string;
  blurb: string;
};

export const carriers: Carrier[] = [
  {
    name: '[Carrier logo]',
    blurb: '[One line on this carrier’s strengths, e.g. strong Advantage network in this state]',
  },
  { name: '[Carrier logo]', blurb: '[One line on this carrier’s strengths]' },
  { name: '[Carrier logo]', blurb: '[One line on this carrier’s strengths]' },
  { name: '[Carrier logo]', blurb: '[One line on this carrier’s strengths]' },
  { name: '[Carrier logo]', blurb: '[One line on this carrier’s strengths]' },
  { name: '[Carrier logo]', blurb: '[One line on this carrier’s strengths]' },
];

/** The homepage strip shows the first five. */
export const homepageCarriers = carriers.slice(0, 5);

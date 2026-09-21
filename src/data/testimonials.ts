/**
 * Testimonials shown on the homepage.
 *
 * These are PLACEHOLDERS. The client has not supplied real client quotes yet,
 * so the section is labelled as showing samples and every attribution is left
 * in the bracket style used elsewhere on the site for unfinished content.
 * Publishing invented quotes as though real clients said them would be a fake
 * review, so replace the text and the attributions together.
 *
 * When the real ones arrive: keep them about the service received. Quotes that
 * praise a particular plan or name a carrier need that carrier's approval
 * before they can be published.
 */

export type Testimonial = {
  quote: string;
  attribution: string;
};

export const testimonialsArePlaceholders = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      'I put off dealing with Medicare for months because it felt overwhelming. One phone call sorted the whole thing out.',
    attribution: '[Client name], [Town]',
  },
  {
    quote:
      'I had a stack of options and no idea which one fitted. We went through them line by line until it made sense.',
    attribution: '[Client name], [Town]',
  },
  {
    quote:
      'My employer coverage was ending and I did not know where to start. Everything was in place before my last day.',
    attribution: '[Client name], [Town]',
  },
  {
    quote:
      'They check in every autumn to make sure my coverage still suits me. I have never once had to chase them.',
    attribution: '[Client name], [Town]',
  },
];

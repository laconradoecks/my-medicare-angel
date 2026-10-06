/**
 * Testimonials shown on the homepage.
 *
 * Supplied by the client on 2026-10-06 as the clients' own words, published with
 * first name and town. Keep any future ones to the same standard: a real client,
 * their words, their permission. A quote we write, or a name put to words
 * someone did not say, is a fake review.
 *
 * Keep them about the service received. Medicare marketing rules rule out
 * "best", "cheapest" and the like here as much as anywhere else on the site, and
 * a quote that praises a particular plan or names a carrier needs that
 * carrier's approval before it can be published.
 */

export type Testimonial = {
  quote: string;
  attribution: string;
};

/** True only while the quotes are samples; shows a "sample testimonials" note. */
export const testimonialsArePlaceholders = false;

export const testimonials: Testimonial[] = [
  {
    quote:
      'I was overwhelmed by all the Medicare options and didn’t know where to begin. My Medicare Angel took the time to explain everything clearly and helped me understand which options made the most sense for me. I never felt pressured, and I left feeling confident about my decision.',
    attribution: 'Linda, Cambridge, MA',
  },
  {
    quote:
      'Medicare felt complicated until I had someone walk me through it step by step. They answered all my questions, explained the differences between the plans, and made the whole process much easier than I expected.',
    attribution: 'Haley, Woburn, MA',
  },
  {
    quote:
      'I didn’t realize how many things I needed to consider when choosing my Medicare coverage. My Medicare Angel made it simple, answered my questions in plain English, and helped me feel confident that I was making the right choice.',
    attribution: 'Tony, Portland, ME',
  },
  {
    quote:
      'What I appreciated most was having someone I could actually talk to. They took the time to understand what I needed, explained my options without all the jargon, and stayed available when I had questions. It made the whole experience much less stressful.',
    attribution: 'Bill, Manchester, NH',
  },
];

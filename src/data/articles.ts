/**
 * Article index + bodies.
 *
 * The prototype shipped six cards on the Articles page and one fully written
 * article ("Can I Delay Medicare Part B If I Am Still Working?"). That article
 * is reproduced verbatim below. The other five keep their designed titles and
 * excerpts and render a clearly-marked draft state, matching the placeholder
 * convention used elsewhere in the designs. Fill in `body` to publish one.
 */

export type Block =
  /** `strong` renders as a bold lead-in before the paragraph text. */
  | { type: 'p'; text: string; strong?: string }
  | { type: 'h2'; text: string }
  | { type: 'callout'; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** Shown in the title band. Set a real date when the article is published. */
  date: string;
  crumb: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'delay-medicare-part-b-still-working',
    title: 'Can I Delay Medicare Part B If I Am Still Working?',
    excerpt:
      'When employer coverage lets you wait, when it does not, and the one trap (COBRA) that catches people.',
    date: '[DATE]',
    crumb: 'Delaying Part B',
    body: [
      {
        type: 'p',
        strong: 'The short answer:',
        text: 'if you or your spouse are actively working and you are covered by that employer’s group health plan, you can usually delay Part B without penalty. When the work or the coverage ends, an eight-month special enrollment window opens.',
      },
      { type: 'h2', text: 'When delaying is safe' },
      {
        type: 'p',
        text: 'The employer coverage must come from current, active employment. Size matters too: for employers with 20 or more employees, the group plan pays first and Medicare can wait. Under 20 employees, Medicare generally needs to be in place at 65, because it pays first.',
      },
      { type: 'h2', text: 'When it is not' },
      {
        type: 'p',
        text: 'Retiree coverage and COBRA do not count as active employment coverage. Staying on either past 65 without Part B is the most common and most expensive mistake we see, because the penalty is permanent.',
      },
    ],
  },
  {
    slug: 'what-does-medicare-cost',
    title: 'What Does Medicare Actually Cost in [YEAR]?',
    excerpt:
      'Premiums, deductibles and the out-of-pocket picture for each path, in one honest overview.',
    date: '[DATE]',
    crumb: 'What Medicare costs',
    body: [],
  },
  {
    slug: 'medicare-advantage-denials-your-rights',
    title: 'Medicare Advantage Denials: What Your Rights Are',
    excerpt: 'What to do when a plan says no, and how often appeals actually succeed.',
    date: '[DATE]',
    crumb: 'Advantage denials',
    body: [],
  },
  {
    slug: 'annual-enrollment-period-explained',
    title: 'The Annual Enrollment Period, Explained',
    excerpt: 'October 15 to December 7: what you can change, and how to decide if you should.',
    date: '[DATE]',
    crumb: 'Annual Enrollment Period',
    body: [],
  },
  {
    slug: 'plan-g-vs-plan-n',
    title: 'Plan G vs. Plan N: Which Supplement Wins?',
    excerpt:
      'The two most popular Medigap plans compared on coverage, copays and long-term price.',
    date: '[DATE]',
    crumb: 'Plan G vs Plan N',
    body: [],
  },
  {
    slug: 'moving-and-your-medicare-plan',
    title: 'New to Town? Moving and Your Medicare Plan',
    excerpt:
      'Moving can open a special enrollment window. Here is what changes when your zip code does.',
    date: '[DATE]',
    crumb: 'Moving and Medicare',
    body: [],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

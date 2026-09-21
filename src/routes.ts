/**
 * Route paths in one place. The prototype navigated by element id (go('learn'));
 * here each of those becomes a real, SEO-friendly URL. Keep this file as the
 * single source — the nav, footer and sitemap generator all read from it.
 */

export const paths = {
  home: '/',

  learn: '/medicare-explained',
  learnOriginal: '/medicare-explained/original-medicare',
  learnAdvantage: '/medicare-explained/medicare-advantage',
  learnSupplements: '/medicare-explained/medicare-supplements',
  learnPartD: '/medicare-explained/part-d-drug-plans',
  learnMedicaid: '/medicare-explained/medicare-vs-medicaid',
  enrollment: '/medicare-enrollment',
  maHmo: '/medicare-explained/medicare-advantage/hmo',
  maPpo: '/medicare-explained/medicare-advantage/ppo',
  maPffs: '/medicare-explained/medicare-advantage/pffs',
  maMsa: '/medicare-explained/medicare-advantage/msa',
  maSnp: '/medicare-explained/medicare-advantage/special-needs-plans',

  compare: '/compare',
  compareAdvantage: '/compare/advantage-plans',
  compareSupplements: '/compare/supplement-plans',
  partners: '/insurance-partners',

  turning65: '/turning-65',
  employer: '/leaving-employer-coverage',
  veterans: '/veterans',
  areas: '/areas-we-serve',

  blog: '/articles',
  article: (slug: string) => `/articles/${slug}`,
  articlePattern: '/articles/:slug',
  faqs: '/faqs',
  /** Hidden for now: no route, nav link or sitemap entry until dates are confirmed. */
  events: '/events',
  refer: '/refer-a-friend',

  contact: '/contact',
  book: '/book-a-consultation',
  quote: '/get-a-quote',

  privacy: '/privacy-policy',
  terms: '/terms-of-use',
  disclaimers: '/medicare-disclaimers',
} as const;

/** Every static route, for the sitemap generator. */
export const staticRoutes: string[] = [
  paths.home,
  paths.learn,
  paths.learnOriginal,
  paths.learnAdvantage,
  paths.learnSupplements,
  paths.learnPartD,
  paths.learnMedicaid,
  paths.enrollment,
  paths.maHmo,
  paths.maPpo,
  paths.maPffs,
  paths.maMsa,
  paths.maSnp,
  paths.compare,
  paths.compareAdvantage,
  paths.compareSupplements,
  paths.partners,
  paths.turning65,
  paths.employer,
  paths.veterans,
  paths.areas,
  paths.blog,
  paths.faqs,
  paths.refer,
  paths.contact,
  paths.book,
  paths.quote,
  paths.privacy,
  paths.terms,
  paths.disclaimers,
];

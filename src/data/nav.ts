import { paths } from '@/routes';

export type NavItem = { label: string; blurb: string; to: string };
export type NavGroup = { label: string; items: NavItem[] };

/** The five header dropdowns, exactly as laid out in the prototype header. */
export const navGroups: NavGroup[] = [
  {
    label: 'Learn Medicare',
    items: [
      { label: 'Medicare Explained', blurb: 'Start here: the whole picture', to: paths.learn },
      { label: 'Original Medicare', blurb: 'Parts A & B', to: paths.learnOriginal },
      { label: 'Medicare Advantage', blurb: 'HMO, PPO & SNP plans', to: paths.learnAdvantage },
      { label: 'Supplements (Medigap)', blurb: 'Cover the gaps', to: paths.learnSupplements },
      { label: 'Part D Drug Plans', blurb: 'Prescription coverage', to: paths.learnPartD },
      { label: 'Medicare vs Medicaid', blurb: 'The difference, plainly', to: paths.learnMedicaid },
    ],
  },
  {
    label: 'Compare',
    items: [
      { label: 'Original vs Advantage', blurb: 'The big decision', to: paths.compare },
      { label: 'Advantage Plans', blurb: 'HMO vs PPO vs SNP', to: paths.compareAdvantage },
      { label: 'Supplement Plans', blurb: 'Plan G vs Plan N', to: paths.compareSupplements },
      { label: 'Our Insurance Partners', blurb: 'Who we work with', to: paths.partners },
    ],
  },
  {
    label: 'Your Situation',
    items: [
      { label: 'Turning 65', blurb: 'Your enrollment checklist', to: paths.turning65 },
      { label: 'Leaving Employer Coverage', blurb: 'Retiring after 65', to: paths.employer },
      { label: 'Veterans', blurb: 'VA, TRICARE & Medicare', to: paths.veterans },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Articles', blurb: 'Guides & answers', to: paths.blog },
      { label: 'FAQs', blurb: 'Quick answers', to: paths.faqs },
      { label: 'Events & Seminars', blurb: 'Free sessions', to: paths.events },
      { label: 'Refer a Friend', blurb: 'Send someone our way', to: paths.refer },
    ],
  },
  {
    label: 'Contact',
    items: [
      { label: 'Contact Us', blurb: 'Message, phone or visit', to: paths.contact },
      { label: 'Book a Call', blurb: 'Pick a time that suits you', to: paths.book },
    ],
  },
];

/**
 * Footer link columns.
 *
 * Grouped to mirror the header nav rather than by page order: Articles and FAQs
 * sit with the other resources instead of padding out Learn, and the three
 * conversion links get their own column so they are not buried. The address,
 * hours and phone moved up into the brand block, which was otherwise empty.
 */
export type FooterColumn = {
  heading: string;
  links: { label: string; to: string }[];
  /** Rendered as a button at the foot of the column. */
  cta?: { label: string; to: string };
};

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Learn',
    links: [
      { label: 'Medicare Explained', to: paths.learn },
      { label: 'Compare Plans', to: paths.compare },
      { label: 'Our Insurance Partners', to: paths.partners },
      { label: 'Turning 65', to: paths.turning65 },
      { label: 'Leaving Employer Coverage', to: paths.employer },
      { label: 'Veterans', to: paths.veterans },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Articles', to: paths.blog },
      { label: 'FAQs', to: paths.faqs },
      { label: 'Events & Seminars', to: paths.events },
      { label: 'Refer a Friend', to: paths.refer },
    ],
  },
  {
    heading: 'Get in touch',
    links: [
      { label: 'Book an Appointment', to: paths.book },
      { label: 'Contact Us', to: paths.contact },
    ],
    cta: { label: 'Get My Free Quote', to: paths.quote },
  },
];

/**
 * Legal pages live in the bottom bar rather than a "Company" column — they are
 * compliance links, not navigation, and pulling them out lets the footer sit on
 * a single row alongside the contact block.
 */
export const legalLinks = [
  { label: 'Privacy Policy', to: paths.privacy },
  { label: 'Terms of Use', to: paths.terms },
  { label: 'Medicare Disclaimers', to: paths.disclaimers },
];

/** The "In this section" sidebar shared across the Learn pages. */
export const learnSectionNav = [
  { label: 'Medicare Explained', to: paths.learn },
  { label: 'Original Medicare (A & B)', to: paths.learnOriginal },
  { label: 'Medicare Advantage (Part C)', to: paths.learnAdvantage },
  { label: 'Supplements (Medigap)', to: paths.learnSupplements },
  { label: 'Part D Drug Plans', to: paths.learnPartD },
  { label: 'Medicare vs Medicaid', to: paths.learnMedicaid },
];

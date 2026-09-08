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
 * Footer link columns. The "Visit or call" column is rendered separately in
 * Footer.tsx because it holds contact details rather than links.
 */
export type FooterColumn = {
  heading: string;
  links: { label: string; to: string }[];
};

/** Columns per designs/footer-reference.html. */
export const footerColumns: FooterColumn[] = [
  {
    heading: 'Learn',
    links: [
      { label: 'Medicare Explained', to: paths.learn },
      { label: 'Compare Plans', to: paths.compare },
      { label: 'Turning 65', to: paths.turning65 },
      { label: 'Leaving Employer Coverage', to: paths.employer },
      { label: 'Veterans', to: paths.veterans },
      { label: 'FAQs', to: paths.faqs },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Get a Quote', to: paths.quote },
      { label: 'Book an Appointment', to: paths.book },
      { label: 'Events & Seminars', to: paths.events },
      { label: 'Refer a Friend', to: paths.refer },
      { label: 'Contact Us', to: paths.contact },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Insurance Partners', to: paths.partners },
      { label: 'Articles', to: paths.blog },
      { label: 'Privacy Policy', to: paths.privacy },
      { label: 'Terms of Use', to: paths.terms },
      { label: 'Medicare Disclaimers', to: paths.disclaimers },
    ],
  },
];

/** Repeated in the bottom bar, as the reference does. */
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

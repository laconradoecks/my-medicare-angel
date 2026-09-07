/** Dates, times and venues were placeholders in the designs. */

export type SiteEvent = {
  id: string;
  when: string;
  title: string;
  description: string;
  venue: string;
};

export const events: SiteEvent[] = [
  {
    id: 'medicare-101',
    when: '[DATE] · [TIME]',
    title: 'Medicare 101: Turning 65 This Year',
    description:
      'The full picture in one evening: the parts, the paths, the deadlines, and the mistakes to avoid. Bring your questions.',
    venue: '[VENUE / or Online]',
  },
  {
    id: 'annual-enrollment',
    when: '[DATE] · [TIME]',
    title: 'Annual Enrollment: Is Your Plan Still Right?',
    description:
      'What changes each year, how to read your plan’s annual notice, and when switching saves money.',
    venue: '[VENUE / or Online]',
  },
  {
    id: 'veterans',
    when: '[DATE] · [TIME]',
    title: 'Medicare for Veterans',
    description:
      'How VA benefits, TRICARE For Life and Medicare fit together, explained by someone who works with veterans weekly.',
    venue: '[VENUE / or Online]',
  },
];

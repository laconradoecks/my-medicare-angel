/** SVG icons lifted verbatim from the designs. */

type IconProps = { size?: number; className?: string };

/**
 * The My Medicare Angel mark, from logo/mymedicareangel-logo-pack.zip.
 * Source files also live in public/logo/ for use outside React.
 *
 * Two cuts, as supplied in the pack:
 *  - "small" (mark-small.svg) — three feathers per wing, heavier strokes, drawn
 *    to stay legible at header/favicon sizes. This is what the designs use in
 *    the header, so it is the default.
 *  - "full" (mark.svg) — four feathers, finer strokes, for large display.
 *
 * `tone="light"` swaps the navy for white (mark-white.svg) for use on the navy
 * bands; the gold halo is constant in every variant.
 */
export const LogoMark = ({
  size = 32,
  variant = 'small',
  tone = 'dark',
}: IconProps & { variant?: 'small' | 'full'; tone?: 'dark' | 'light' }) => {
  const ink = tone === 'light' ? '#FFFFFF' : '#14477D';
  const gold = '#C99532';

  // [cx, cy, rx, ry, rotation] per feather, right wing; the left is mirrored.
  const feathers =
    variant === 'small'
      ? [
          [352.6, 248.8, 69, 26, -6],
          [331.0, 310.2, 60, 23, 28],
          [292.0, 337.6, 43, 18, 56],
        ]
      : [
          [357.9, 239.3, 73, 20, -10],
          [349.3, 289.0, 69, 19, 16],
          [319.9, 324.0, 56, 16, 40],
          [289.7, 334.8, 41, 13, 58],
        ];

  const ringWidth = variant === 'small' ? 30 : 22;
  const haloWidth = variant === 'small' ? 26 : 18;

  const wing = feathers.map(([cx, cy, rx, ry, rot], i) => (
    <ellipse
      key={i}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={ink}
      transform={`rotate(${rot} ${cx} ${cy})`}
    />
  ));

  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <circle cx="256" cy="256" r="230" fill="none" stroke={ink} strokeWidth={ringWidth} />
      <ellipse
        cx="256"
        cy="112"
        rx="58"
        ry="20"
        fill="none"
        stroke={gold}
        strokeWidth={haloWidth}
      />
      <circle cx="256" cy="196" r="38" fill={ink} />
      <g>{wing}</g>
      <g transform="translate(512,0) scale(-1,1)">{wing}</g>
    </svg>
  );
};

export const TickIcon = ({ size = 17 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10.5 L8.5 15 L16 5.5" stroke="#14477D" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const CheckCircleIcon = ({ size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: 3 }}
  >
    <circle cx="12" cy="12" r="10" stroke="#14477D" strokeWidth="1.8" />
    <path
      d="M7.5 12.5 L10.5 15.5 L16.5 8.5"
      stroke="#C99532"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InfoIcon = ({ size = 26 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: 2 }}
  >
    <circle cx="12" cy="12" r="10" stroke="#3A6B96" strokeWidth="1.8" />
    <path d="M12 8 L12 13 M12 16 L12 16.01" stroke="#3A6B96" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const CardIcon = ({ size = 38 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="14" rx="2" stroke="#14477D" strokeWidth="1.8" />
    <path d="M12 10 L12 16 M9 13 L15 13" stroke="#C99532" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClockIcon = ({ size = 38 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="#14477D" strokeWidth="1.8" />
    <path d="M12 7 L12 12 L15.5 14" stroke="#C99532" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ShieldIcon = ({ size = 38 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3 L20 6.5 L20 12 C20 17 16.5 20 12 21.5 C7.5 20 4 17 4 12 L4 6.5 Z"
      stroke="#14477D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 12 L11 14.5 L15.5 9.5"
      stroke="#C99532"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const QuoteMarkIcon = () => (
  <svg width="40" height="31" viewBox="0 0 44 34" fill="none" aria-hidden="true">
    <path
      d="M2 34 L2 20 C2 9 8 2 18 0 L18 8 C13 9.5 10.5 13 10 18 L18 18 L18 34 Z M26 34 L26 20 C26 9 32 2 42 0 L42 8 C37 9.5 34.5 13 34 18 L42 18 L42 34 Z"
      fill="#E2CE9A"
    />
  </svg>
);

export const BurgerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17"
      stroke="#16323E"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const SuccessIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#14477D" strokeWidth="1.8" />
    <path
      d="M7.5 12.5 L10.5 15.5 L16.5 8.5"
      stroke="#C99532"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

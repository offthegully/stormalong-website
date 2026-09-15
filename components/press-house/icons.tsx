/**
 * The line icons used across Press House. Drawn at 24x24 on a 1.7
 * stroke to match the artboards, and inheriting `currentColor` so a
 * caller sets colour with a text utility rather than a fill prop.
 */

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function base({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

export function BarrelIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h12l2 9-2 9H6l-2-9Z" />
      <path d="M4 12h16M9 3v18M15 3v18" />
    </svg>
  );
}

/** The Rare Apple Series mark — a faceted gem. */
export function RareIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 3h10l4 6-9 12L3 9Z" />
      <path d="M3 9h18M9.5 3 7 9l5 12M14.5 3 17 9l-5 12" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function DropIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.7 6.6 9.3a7 7 0 1 0 10.8 0Z" />
    </svg>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 7c-1-1.5-2.6-2-4-2-2.2 0-4 2-4 5.5C4 15 7 21 9.5 21c1 0 1.7-.6 2.5-.6s1.5.6 2.5.6C17 21 20 15 20 10.5 20 7 18.2 5 16 5c-1.4 0-3 .5-4 2Z" />
      <path d="M12 7c0-2 1-3.5 3-4" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7h4v-7h3l1-4h-4V7.5A.5.5 0 0 1 12.5 7H15Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** The six-point star that separates items in labels and tickers. */
export function Star({ className }: { className?: string }) {
  return (
    <span aria-hidden className={className}>
      ★
    </span>
  );
}

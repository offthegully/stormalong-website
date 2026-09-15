import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Star } from "./icons";

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

/**
 * Three actions, and the design never uses more than one of the top
 * two in a single band:
 *   gold    the primary call to action, only ever on ink or a tile
 *   brick   the primary action when the ground is cream
 *   outline secondary, borrows the ground's own ink
 *
 * Square corners throughout. Nothing in Press House has a radius.
 */
type ButtonTone = "gold" | "brick" | "outline" | "outline-gold";

const toneClasses: Record<ButtonTone, string> = {
  gold: "bg-gold text-ink hover:bg-gold-pale",
  brick: "bg-brick text-paper border-2 border-gold hover:bg-brick-dark",
  outline:
    "border-2 border-current text-ink hover:bg-ink hover:text-paper-light",
  "outline-gold": "border-2 border-gold text-gold hover:bg-gold hover:text-ink",
};

export function PhButton({
  href,
  tone = "gold",
  children,
  icon,
  className,
  ...rest
}: {
  href?: string;
  tone?: ButtonTone;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "ph-label inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-colors duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    toneClasses[tone],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {icon}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section furniture                                                   */
/* ------------------------------------------------------------------ */

/** The star-flanked eyebrow above almost every section heading. */
export function Eyebrow({
  children,
  stars = true,
  className,
}: {
  children: ReactNode;
  stars?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("ph-label text-gold", className)}>
      {stars && <Star className="mr-1.5" />}
      {children}
      {stars && <Star className="ml-1.5" />}
    </span>
  );
}

/**
 * Eyebrow, then a hairline that runs to a right-hand note. Used at the
 * head of every band in Direction D.
 */
export function SectionRule({
  eyebrow,
  note,
  onInk = false,
}: {
  eyebrow: ReactNode;
  note?: ReactNode;
  onInk?: boolean;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <span
        className={cn(
          "h-px flex-grow",
          onInk ? "bg-gold/30" : "bg-ink/15",
        )}
      />
      {note && (
        <span
          className={cn(
            "ph-label hidden md:block",
            onInk ? "text-paper/40" : "text-prose-faint",
          )}
        >
          {note}
        </span>
      )}
    </div>
  );
}

/**
 * A value the business has not confirmed. Rendered visibly rather than
 * silently guessed — the bracketed-placeholder discipline the canvas
 * review singled out as worth keeping.
 */
export function Tbc({ children }: { children?: ReactNode }) {
  return (
    <span
      className="ph-num text-brick"
      title="Not yet confirmed — see data/shelf.ts"
    >
      [{children ?? "TBC"}]
    </span>
  );
}

/** Gold-on-ink spec pair. ABV, sweetness, run size, apple count. */
export function Spec({
  label,
  value,
  onInk = false,
}: {
  label: string;
  value: ReactNode;
  onInk?: boolean;
}) {
  return (
    <div>
      <div
        className={cn(
          "ph-label mb-1 text-[0.53rem]",
          onInk ? "text-paper/45" : "text-prose-faint",
        )}
      >
        {label}
      </div>
      <div className="ph-num text-[0.95rem] font-semibold">{value}</div>
    </div>
  );
}

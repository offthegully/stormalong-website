import { cn } from "@/lib/utils";

/**
 * The award seal: a rayed medallion over a ribbon. Drawn rather than
 * imported so it takes the gold treatment for a Best of Class and the
 * quieter cream one for everything else.
 *
 * The two groups carry `ph-seal-rays` and `ph-seal-body` so that a
 * parent marked `group` can turn the rays and swell the medallion on
 * hover — see the rules in globals.css. The seal has no hover
 * behaviour of its own; it only answers when something around it is
 * being pointed at.
 */
export function MedalSeal({
  tone = "cream",
  className,
}: {
  tone?: "gold" | "cream";
  className?: string;
}) {
  const gold = tone === "gold";
  return (
    <svg
      viewBox="0 0 64 80"
      className={cn("h-[62px] w-[50px]", className)}
      aria-hidden="true"
    >
      <g
        className="ph-seal-body"
        stroke="currentColor"
        fill="none"
        strokeWidth={gold ? 1.6 : 1.5}
        opacity={gold ? 1 : 0.85}
      >
        <path d="M20 46 L14 76 L32 68 L50 76 L44 46" strokeWidth={1.4} />
        <circle cx="32" cy="30" r="25" />
        <circle cx="32" cy="30" r="20" />
      </g>
      <g
        className="ph-seal-rays"
        stroke="currentColor"
        strokeWidth={gold ? 1.1 : 1}
        opacity={gold ? 1 : 0.7}
      >
        <line x1="32" y1="30" x2="32" y2="7" />
        <line x1="32" y1="30" x2="48" y2="14" />
        <line x1="32" y1="30" x2="55" y2="30" />
        <line x1="32" y1="30" x2="48" y2="46" />
        <line x1="32" y1="30" x2="32" y2="53" />
        <line x1="32" y1="30" x2="16" y2="46" />
        <line x1="32" y1="30" x2="9" y2="30" />
        <line x1="32" y1="30" x2="16" y2="14" />
      </g>
    </svg>
  );
}

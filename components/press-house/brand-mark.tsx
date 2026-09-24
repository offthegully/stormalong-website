import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The brand's own lettering, as supplied: white artwork on a
 * transparent ground.
 *
 * They are drawn as a CSS mask over a solid fill rather than as an
 * <img>, so one file renders in any colour of the palette — paper on
 * ink, ink on cream, gold for a stamp — without keeping a recoloured
 * copy of each file in step with the original. Size a mark by its
 * WIDTH; the height follows from the artwork's own proportions.
 */
const marks = {
  wordmark: {
    src: "/images/stormalong-logo.png",
    ratio: "900 / 224",
    label: "Stormalong",
  },
  respect: {
    src: "/images/respect-the-apple.png",
    ratio: "1742 / 1209",
    label: "Respect the apple!",
  },
} as const;

const tones = {
  paper: "bg-paper",
  gold: "bg-gold",
  ink: "bg-ink",
} as const;

export type BrandMarkName = keyof typeof marks;
export type BrandMarkTone = keyof typeof tones;

export function BrandMark({
  mark,
  tone = "paper",
  decorative = false,
  className,
}: {
  mark: BrandMarkName;
  tone?: BrandMarkTone;
  /** Hide from assistive tech when the same words are already spoken
   *  nearby, e.g. beside a visible heading that says them. */
  decorative?: boolean;
  className?: string;
}) {
  const { src, ratio, label } = marks[mark];
  const style: CSSProperties = {
    aspectRatio: ratio,
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
  };

  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      className={cn("ph-mark", tones[tone], className)}
      style={style}
    />
  );
}

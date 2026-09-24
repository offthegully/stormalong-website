import type { CSSProperties } from "react";
import Image from "next/image";
import type { CiderPhoto } from "@/lib/cider-photos";
import { cn } from "@/lib/utils";

/**
 * The photography band that sits directly beneath a cider's hero.
 *
 * Every pane is sized to the shape of the photograph in it, so what the
 * photographer framed is what shows. The shots are not all one shape —
 * most sets are 4:3, but some are square, 4:5 or 9:16 — so the layout
 * is chosen from the set:
 *
 * - Spread: three 4:3 shots. One leads at twice the size and the others
 *   stack beside it, which reads as a composed spread rather than a row
 *   of thumbnails. Two-thirds by two stacked thirds is exactly 4:3 in
 *   every pane when the band is half as tall as it is wide.
 * - Row: any other set. The shots stand side by side at a shared height,
 *   each column as wide as its photo's ratio, so a portrait is never
 *   letterboxed to fit a landscape slot.
 *
 * On a phone the lead takes the full width and the rest share a row
 * beneath it by the same ratio rule; a pair shares one row. Hairline
 * gutters and square corners throughout, the same grid the shelf tiles
 * use.
 *
 * The band is never taller than 45rem nor wider than the 1440px content
 * column. Rather than crop to fit, it narrows and centres on the
 * cider's tile colour, the ground the can stood on in the hero — so on
 * a wide screen, or for a pair of tall shots, the photographs sit on a
 * mount instead of losing their tops and bottoms.
 *
 * Every photograph here is decorative. They are editorial shots whose
 * subject differs per cider, and describing them accurately needs
 * someone who has seen them; until then the surrounding copy carries
 * the meaning and a wrong description would be worse than none.
 */
const MAX_HEIGHT_PX = 720;
const MAX_WIDTH_PX = 1440;

/** A full-width pane on a phone stays between 4:5 and 16:9. */
const PHONE_MIN = 4 / 5;
const PHONE_MAX = 16 / 9;

/** What counts as "a 4:3 shot" for the spread. */
const isLandscape = (ratio: number) => ratio >= 1.2 && ratio <= 1.5;

type Pane = {
  photo: CiderPhoto;
  /** Phone: the pane takes the full width rather than sharing a row. */
  full: boolean;
  aspect: number;
  /** `auto` lets the spread's lead take its height from the grid. */
  aspectMd: number | "auto";
  tallMd: boolean;
  sizes: string;
};

const fr = (ratios: number[]) =>
  ratios.map((r) => `minmax(0,${r.toFixed(3)}fr)`).join(" ");

const vw = (share: number) => `${Math.round(share * 100)}vw`;

const clampPhone = (ratio: number) =>
  Math.min(PHONE_MAX, Math.max(PHONE_MIN, ratio));

export function PhotoSpread({
  photos,
  ground,
}: {
  photos: CiderPhoto[];
  /** Shows either side of the band once it stops at its widest. */
  ground: string;
}) {
  const shown = photos.slice(0, 3);
  if (shown.length === 0) return null;

  const ratios = shown.map((p) => p.ratio);
  const spread = shown.length === 3 && ratios.every(isLandscape);

  // Phone: a pair shares one row; otherwise the lead goes full width
  // and whatever follows shares the row beneath it.
  const phoneRow = shown.length === 2 ? ratios : ratios.slice(1);
  const phoneRowSum = phoneRow.reduce((a, b) => a + b, 0);
  const rowSum = ratios.reduce((a, b) => a + b, 0);

  // The band's width over its height at desktop: a spread is two
  // stacked 4:3 panes tall and a 4:3 lead plus a third wide.
  const bandRatio = spread ? 2 : rowSum;
  const bandMax = Math.round(Math.min(MAX_WIDTH_PX, MAX_HEIGHT_PX * bandRatio));

  const panes: Pane[] = shown.map((photo, i) => {
    const full = shown.length !== 2 && i === 0;
    const phoneSizes = full ? "100vw" : vw(photo.ratio / phoneRowSum);

    let aspectMd: Pane["aspectMd"] = photo.ratio;
    let tallMd = false;
    let share = photo.ratio / rowSum;

    if (spread) {
      tallMd = i === 0;
      aspectMd = i === 0 ? "auto" : 4 / 3;
      share = i === 0 ? 2 / 3 : 1 / 3;
    }

    return {
      photo,
      full,
      aspect: full ? clampPhone(photo.ratio) : photo.ratio,
      aspectMd,
      tallMd,
      sizes: [
        `(min-width: ${bandMax}px) ${Math.round(share * bandMax)}px`,
        `(min-width: 768px) ${vw(share)}`,
        phoneSizes,
      ].join(", "),
    };
  });

  const gridStyle = {
    "--cols": shown.length === 1 ? fr([1]) : fr(phoneRow),
    "--cols-md": spread ? fr([2, 1]) : fr(ratios),
    // Only ever reached on a wide screen, so the phone layout's
    // different shape does not matter here.
    maxWidth: bandMax,
  } as CSSProperties;

  return (
    <div style={{ backgroundColor: ground }}>
      <ul
        style={gridStyle}
        className="mx-auto grid grid-cols-[var(--cols)] gap-px bg-ink/15 md:grid-cols-[var(--cols-md)]"
      >
        {panes.map((pane) => (
          <li
            key={pane.photo.src}
            style={
              {
                "--aspect": pane.aspect.toFixed(3),
                "--aspect-md":
                  pane.aspectMd === "auto" ? "auto" : pane.aspectMd.toFixed(3),
              } as CSSProperties
            }
            className={cn(
              "relative aspect-[var(--aspect)] md:col-span-1 md:aspect-[var(--aspect-md)]",
              pane.full && "col-span-full",
              pane.tallMd && "md:row-span-2",
            )}
          >
            <Image
              src={pane.photo.src}
              alt=""
              fill
              sizes={pane.sizes}
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

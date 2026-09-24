import { Fragment, type ReactNode } from "react";
import { barrelLine } from "@/lib/catalogue";
import type { Addition, Blend } from "@/types/cider";
import { BlendMarkIcon } from "./blend-marks";
import { Star } from "./icons";

/**
 * "What goes in", the right-hand half of the blend band, set as an
 * ingredient table: one row per kind of thing in the can, the kind on
 * the left with the same icon the /ciders tile uses, the names on the
 * right.
 *
 * This replaces four layouts chosen by apple count — a numbered list,
 * numbered cards, a single-varietal portrait and a prose pull quote.
 * The numbers read as a ranking a blend does not have, the two-card
 * layout left Mass Appeal's panel mostly empty, and whatever else went
 * in the can — the barrel, the fruit, the farms — sat underneath as a
 * footnote even when it was the whole point of the cider. One table
 * holds one apple or fifteen, and puts the yuzu on the same footing
 * as the apples.
 *
 * The last row is the same on every page: the three claims that hold
 * for the whole house. They are the site's own words (the FAQ and the
 * "We respect the apple" block) and there is no data field behind
 * them, which is why they are stated once here and not sprinkled onto
 * individual products as if they varied. On a two-apple cider they
 * also keep the table from being a single row beside a tall column.
 */
export function BlendPanel({ blend }: { blend: Blend }) {
  const rows = blendRows(blend);

  return (
    <dl className="border-t-2 border-ink">
      {rows.map((row) => (
        <div
          key={row.key}
          className="grid gap-x-6 gap-y-2.5 border-b border-ink/12 py-5 sm:grid-cols-[10rem_1fr] lg:grid-cols-1 xl:grid-cols-[10rem_1fr]"
        >
          <dt className="flex items-center gap-2.5 self-start sm:pt-1 lg:pt-0 xl:pt-1">
            <span className="flex w-5 justify-center text-gold-dark">
              {row.icon}
            </span>
            <span className="ph-label text-[0.56rem] text-prose-muted">
              {row.label}
            </span>
          </dt>
          <dd>
            {/* The label sits beside the names wherever the table has
                the width for it: full-width below lg, and from xl. In
                the lg column it goes on top, or two columns of apple
                names would not fit beside it. */}
            <div
              className={
                row.large
                  ? "font-franklin text-[1.3rem] font-medium leading-snug sm:text-[1.45rem]"
                  : "font-franklin text-[1.05rem] font-medium leading-relaxed"
              }
            >
              {row.value}
            </div>
            {row.note && (
              <p className="mt-1.5 max-w-[52ch] font-franklin text-[0.9rem] leading-relaxed text-prose-muted">
                {row.note}
              </p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */

interface BlendRow {
  key: string;
  icon: ReactNode;
  label: string;
  value: ReactNode;
  note?: string;
  /** Set a short value large. Fifteen apple names at that size would
   *  run to five lines, so a long run stays at reading size. */
  large?: boolean;
}

const additionLabels: Record<Addition["kind"], string> = {
  fruit: "Fruit",
  botanical: "Botanical",
  spice: "Spice",
  sweetener: "Sweetener",
};

/** Apples first, then where they came from, then everything else in
 *  the order it changes the cider most: wood, fruit, botanicals,
 *  spice, sweetener. */
function blendRows(blend: Blend): BlendRow[] {
  const rows: BlendRow[] = [];
  const { varieties } = blend;

  if (blend.singleVarietal) {
    rows.push({
      key: "single",
      icon: <BlendMarkIcon kind="single" />,
      label: "Single varietal",
      value: varieties[0],
      note: blend.appleNote,
      large: true,
    });
  } else if (varieties.length > 0) {
    rows.push({
      key: "apples",
      icon: <BlendMarkIcon kind="apples" />,
      label: varieties.length === 1 ? "Apple" : "Apples",
      value: <Names items={varieties} />,
      note: blend.appleNote,
      large: varieties.length <= 3,
    });
  } else {
    // The house describes the apples rather than naming them. Its own
    // sentence is the value, not a note under an empty list.
    rows.push({
      key: "apples",
      icon: <BlendMarkIcon kind="apples" />,
      label: "Apples",
      value: (blend.appleNote ?? "Fresh pressed New England apples").replace(/\.$/, ""),
    });
  }

  const orchards = blend.orchards ?? [];
  if (orchards.length > 0) {
    rows.push({
      key: "orchard",
      icon: <BlendMarkIcon kind="orchard" />,
      label: orchards.length === 1 ? "Orchard" : "Orchards",
      value: <Names items={orchards} />,
    });
  }

  if (blend.barrel) {
    rows.push({
      key: "barrel",
      icon: <BlendMarkIcon kind="barrel" />,
      label: "Barrel aged",
      value: barrelLine(blend.barrel).replace(/\.$/, ""),
    });
  }

  const additions = blend.additions ?? [];
  for (const kind of ["fruit", "botanical", "spice", "sweetener"] as const) {
    const ofKind = additions.filter((a) => a.kind === kind);
    if (ofKind.length === 0) continue;
    rows.push({
      key: kind,
      icon: <BlendMarkIcon kind={kind} />,
      label: additionLabels[kind],
      value: (
        <Names
          items={ofKind.map((a) => (
            <>
              {a.name}
              {a.origin && (
                <span className="font-normal text-prose-muted">
                  {" "}
                  from {a.origin}
                </span>
              )}
            </>
          ))}
        />
      ),
    });
  }

  rows.push({
    key: "house",
    icon: <Star className="text-[0.95rem]" />,
    label: "In every can",
    value: <Names items={houseClaims} stacked />,
  });

  return rows;
}

const houseClaims = [
  "100% fresh pressed",
  "Never from concentrate",
  "Naturally gluten free",
];

/**
 * The names in a row. Up to three run on one line, separated by a gold
 * point; each point is glued to the name before it, so a wrapped line
 * never opens on a separator. Four or more — Legendary Dry's fifteen —
 * would wrap into a ragged paragraph with points hanging off every
 * line end, so they are set as a plain list instead. Unnumbered: a
 * blend has no running order.
 */
function Names({
  items,
  stacked = false,
}: {
  items: ReactNode[];
  /** Always one per line, however few. */
  stacked?: boolean;
}) {
  if (stacked || items.length > 3) {
    return (
      <ul
        className={
          stacked ? "space-y-1" : "grid gap-x-8 gap-y-1 sm:grid-cols-2"
        }
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>
          <span className="whitespace-nowrap">
            {item}
            {index < items.length - 1 && (
              <>
                <span className="sr-only">,</span>
                <span aria-hidden className="ml-2 mr-1 text-gold-dark">
                  ·
                </span>
              </>
            )}
          </span>
          {index < items.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

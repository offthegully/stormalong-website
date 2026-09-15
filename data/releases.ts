/* ====================================================================
   PROVISIONAL — the release calendar needs confirming with production.
   --------------------------------------------------------------------
   The Rare Apple Series is described on stormalong.com as selling out
   fast, but nothing on the live site carries a date, a vintage or a
   sold-out state. This calendar is drafted from the ciders that are in
   the series today; which release lands in which month, and how big
   each run is, are the two things nobody has confirmed.

   Run sizes are deliberately null rather than guessed. The UI renders
   a visible [TBC] instead of a number.
   ==================================================================== */

export type ReleaseStatus = "pouring" | "next" | "gone";

export interface Release {
  slug: string;
  /** First of the month the release lands. ISO, so it sorts. */
  date: string;
  status: ReleaseStatus;
  /** Short line under the status chip. */
  note: string;
  /** Bottles in the run. Null until production confirms. */
  runSize: number | null;
}

export const releases: Release[] = [
  {
    slug: "kingston-black",
    date: "2026-09-01",
    status: "pouring",
    note: "On shelves now",
    runSize: null,
  },
  {
    slug: "boston-heirloom",
    date: "2026-11-01",
    status: "next",
    note: "Club members first",
    runSize: null,
  },
  {
    slug: "happy-holidays",
    date: "2026-12-01",
    status: "next",
    note: "Seasonal",
    runSize: null,
  },
  {
    slug: "grand-banks",
    date: "2026-03-01",
    status: "gone",
    note: "Sold out",
    runSize: null,
  },
  {
    slug: "white-mountain-magic",
    date: "2025-10-01",
    status: "gone",
    note: "Sold out",
    runSize: null,
  },
];

/**
 * The series' own description, lifted word for word from the cider
 * pages on stormalong.com rather than rewritten.
 */
export const seriesDescription =
  "In 2017, we started making small batch ciders with some of our favourite rare apples, such as the British Kingston Black apple, and other American Heirloom varieties that were among some of the first apples cultivated in the United States. These apples are incredibly rare in the United States and many of the American Heirloom varieties were pretty much wiped out after Prohibition. They have only recently started to make a small comeback through the efforts of apple evangelists.";

/** Club facts, from the live Cider Club page. */
export const clubFacts: {
  figure: string;
  label: string;
  copy: string;
  confirmed: boolean;
}[] = [
  {
    figure: "2×",
    label: "A year",
    copy: "Spring and Fall, we ship club members a variety of small batch ciders.",
    confirmed: true,
  },
  {
    figure: "4–6",
    label: "Ciders a box",
    copy: "In each club shipment, with the apple varieties that went into them.",
    confirmed: true,
  },
  {
    figure: "—",
    label: "Bottles a run",
    copy: "How many bottles are in a run. Confirm with production.",
    confirmed: false,
  },
];

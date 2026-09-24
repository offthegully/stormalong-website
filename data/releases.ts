/* ====================================================================
   The Rare Apple Series page's copy. There is no release calendar:
   a drafted one (months, "pouring now", "sold out") was never
   confirmed and has been removed. The series itself is read from the
   shelf, so this file only holds the words around it.
   ==================================================================== */

/**
 * The series' own description, lifted word for word from the cider
 * pages on stormalong.com rather than rewritten.
 */
export const seriesDescription =
  "In 2017, we started making small batch ciders with some of our favorite rare apples, such as the British Kingston Black apple, and other American Heirloom varieties that were among some of the first apples cultivated in the United States. These apples are incredibly rare in the United States and many of the American Heirloom varieties were pretty much wiped out after Prohibition. They have only recently started to make a small comeback through the efforts of apple evangelists.";

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
    copy: "Small batch ciders in every club shipment.",
    confirmed: true,
  },
  {
    figure: "—",
    label: "Bottles a run",
    copy: "How many bottles are in a run. Confirm with production.",
    confirmed: false,
  },
];

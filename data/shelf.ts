/* ====================================================================
   PROVISIONAL — replace this file when the authoritative list arrives.
   --------------------------------------------------------------------
   This is the single seam between the redesign and the cider
   catalogue. Nothing else in the app hardcodes which ciders exist,
   what group they sit in, or what colour their tile is, so swapping
   the real list means editing this file and nothing else.

   Why it exists: the canvas review (findings 01 and 03) found three
   sources that disagree.

     data/ciders.ts   18 ciders, no group field
     stormalong.com   15 ciders in 3 groups
     the artboards    a 4th taxonomy matching neither

   Until the real list lands, the shelf below follows the live site,
   because that is what is actually on sale. Specifically:

     - 5 records in data/ciders.ts are NOT on the live shelf and are
       omitted here: pog-punch, lady-legendary, ragtime-reserve,
       the-big-appeal, bittersweet-symphonie. Their data is untouched
       and their detail pages still resolve; they simply do not appear
       on /ciders. (Note: lady-legendary IS promoted on the current
       home page but absent from the live /ciders — one more thing the
       real list needs to settle.)
     - 2 ciders on the live shelf are missing from data/ciders.ts
       entirely: Alyson's Orchard and Blue Hills. Both are 4.5%
       year-round core products with their own live pages. They are
       stubbed at the bottom of this file, read off the live site, and
       flagged `provisional` — their sweetness is genuinely unknown.

   Open questions for the real list, in priority order:
     1. Which 15 (or n) ciders are on the shelf, and in which group?
     2. Kingston Black: 6.5% / dry per the data, 7.0% / semi-dry per
        the artboard. Is the 2026 vintage genuinely different?
     3. Farmstand Unfiltered: 4.5% (data) or 6.2% (artboard)?
     4. Red Skies at Night: semi-dry / 2 (data) or medium / 3 (artboard)?
     5. Sweetness for Alyson's Orchard and Blue Hills.
   ==================================================================== */

import type { CiderGroup, CiderType } from "@/types/cider";

/** Shelf order and grouping, top to bottom of /ciders. */
export const shelfOrder: { slug: string; group: CiderGroup }[] = [
  { slug: "legendary-dry", group: "core" },
  { slug: "farmstand-unfiltered", group: "core" },
  { slug: "mass-appeal", group: "core" },
  { slug: "light-of-the-sun", group: "core" },
  { slug: "red-skies-at-night", group: "core" },
  { slug: "massive-appeal", group: "core" },
  { slug: "alysons-orchard", group: "core" },
  { slug: "blue-hills", group: "core" },
  { slug: "happy-holidays", group: "seasonal" },
  { slug: "white-mountain-magic", group: "seasonal" },
  { slug: "blue-skies", group: "seasonal" },
  { slug: "beachcomber-cidah", group: "rare" },
  { slug: "boston-heirloom", group: "rare" },
  { slug: "grand-banks", group: "rare" },
  { slug: "kingston-black", group: "rare" },
];

/**
 * Tile grounds. NOT an eyedropper of the label — the fifteen cans
 * collapse into only five hue families, which would produce eleven
 * pairs of tiles that read identically. Hue is taken from the can,
 * then separated *by value* within each family. All fifteen clear
 * 4.5:1 against paper.light (#FBF6EA); the lowest is 5.44:1.
 * See canvas review, finding 09. Mirrors `colors.cider` in
 * tailwind.config.ts — keep the two in sync.
 */
export const tileColors: Record<string, string> = {
  "legendary-dry": "#164A7A",
  "farmstand-unfiltered": "#12482C",
  "mass-appeal": "#07253F",
  "light-of-the-sun": "#5A6015",
  "red-skies-at-night": "#722710",
  "massive-appeal": "#471813",
  "alysons-orchard": "#216156",
  "blue-hills": "#68521A",
  "happy-holidays": "#161206",
  "white-mountain-magic": "#3C3831",
  "blue-skies": "#27636B",
  "beachcomber-cidah": "#194340",
  "boston-heirloom": "#352A0C",
  "grand-banks": "#3D5A49",
  "kingston-black": "#181A22",
};

/** Fallback for a cider with no tile colour assigned yet. */
export const fallbackTileColor = "#0A1A2B";

/**
 * The two ciders the live site sells that data/ciders.ts does not
 * contain. Read off stormalong.com, not invented — but unverified,
 * hence `provisional`. Sweetness is a placeholder in both cases.
 */
export const missingFromData: CiderType[] = [
  {
    id: "alysons-orchard",
    name: "Alyson's Orchard",
    slug: "alysons-orchard",
    tagline: "Made with apples from Alyson's Orchard",
    description:
      "A single orchard cider pressed from fruit grown at Alyson's Orchard in Walpole, New Hampshire.",
    image: "/images/ciders/alysons-orchard.png",
    abv: 4.5,
    availability: "Year-round",
    features: [],
    flavor: "Crisp & Refreshing",
    apples: "Alyson's Orchard blend",
    sweetness: 2, // [TBC] — not published on the live site
  },
  {
    id: "blue-hills",
    name: "Blue Hills",
    slug: "blue-hills",
    tagline: "Made with New England apples",
    description:
      "A year-round New England cider, crisp and easy-drinking.",
    image: "/images/ciders/blue-skies.png", // [TBC] — no artwork in the repo
    abv: 4.5,
    availability: "Year-round",
    features: [],
    flavor: "Crisp & Easy-Drinking",
    apples: "New England blend",
    sweetness: 2, // [TBC] — not published on the live site
  },
];

/** Slugs whose specs are known to be unverified. Drives the UI's
 *  [TBC] marks so nothing presents a guess as a fact. */
export const provisionalSlugs = new Set(["alysons-orchard", "blue-hills"]);

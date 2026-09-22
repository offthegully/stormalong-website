export type Availability = "Year-round" | "Seasonal" | "Limited";

/**
 * How the shelf is grouped on /ciders. This is the taxonomy the live
 * site uses. The redesign's filter row originally proposed a fourth
 * option (Barrel-Aged) that matched neither the data nor the shelf;
 * it was dropped. See canvas review, finding 03.
 */
export type CiderGroup = "core" | "seasonal" | "rare";

/* ------------------------------------------------------------------ */
/* What is in the can                                                  */
/* ------------------------------------------------------------------ */

/**
 * Anything that goes in that is not an apple. `kind` drives the icon
 * and the heading it groups under, because "Wild Maine blueberries"
 * and "jasmine green tea" are not the same sort of ingredient and the
 * old single `apples` string could not tell them apart.
 */
export interface Addition {
  name: string;
  kind: "fruit" | "botanical" | "spice" | "sweetener";
  /** Where it comes from, when the provenance is part of the story. */
  origin?: string;
}

/** Time in wood, for the two ciders that get it. */
export interface Barrel {
  /** What was in the barrel first. */
  spirit: string;
  /** Whose barrels, when the house names them. */
  cooperage?: string;
  months?: number;
}

/**
 * The recipe, structured.
 *
 * This replaces the old `apples: string`, which was one field doing
 * two incompatible jobs: for ten ciders it held a varietal list
 * ("Ashton Bitter, Dabinett, ..."), and for six it held prose about
 * the apples instead ("Blend of New England Apples"). The detail page
 * split both on commas and printed a numbered list, which turned
 * Happy Holidays into the three "varieties" *Blend of McIntosh*,
 * *Golden Delicious* and *other New England Apples*, and rendered
 * Big Appeal — separated by an ampersand, which the splitter did not
 * know about — as a single variety called "Golden Delicious &
 * McIntosh".
 *
 * Splitting the two apart also gives the page something to say about
 * the ciders whose story is not the apple list: Grand Banks is ten
 * months in Bully Boy barrels, Light of the Sun is citrus and
 * jasmine tea, White Mountain Magic is two named New Hampshire farms.
 */
export interface Blend {
  /** Varieties the house names, in its own order. Empty when it does
   *  not name them. */
  varieties: string[];
  /** The house's own words when it describes the apples rather than
   *  naming them, or qualifies a list it has only partly given. */
  appleNote?: string;
  /** Pressed on its own, not blended. Kingston Black, so far. */
  singleVarietal?: boolean;
  additions?: Addition[];
  barrel?: Barrel;
  /** Named orchards, when the fruit's provenance is the point. */
  orchards?: string[];
}

export interface CiderType {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  abv: number;
  availability: Availability;
  features: string[];
  flavor: string;
  blend: Blend;
  sweetness: number; // 1-5 scale, 1 = driest
  awards?: string[];
}

/**
 * A cider as the Press House pages consume it: the raw record plus the
 * two things the design needs that the data file does not carry.
 */
export interface ShelfCider extends CiderType {
  /** Which block of /ciders it sits in. */
  group: CiderGroup;
  /** Tile ground. Hue from the can, value separated within its hue
   *  family so no two tiles read alike. See canvas review, finding 09. */
  tileColor: string;
  /** True while any spec on this cider is unverified, so the UI can
   *  mark it rather than quietly present a guess as fact. */
  provisional?: boolean;
}

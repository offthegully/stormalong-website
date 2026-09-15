export type Availability = "Year-round" | "Seasonal" | "Limited";

/**
 * How the shelf is grouped on /ciders. This is the taxonomy the live
 * site uses. The redesign's filter row originally proposed a fourth
 * option (Barrel-Aged) that matched neither the data nor the shelf;
 * it was dropped. See canvas review, finding 03.
 */
export type CiderGroup = "core" | "seasonal" | "rare";

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
  apples: string;
  sweetness: number; // 1-5 scale, 1 = driest
  awards?: string[];
}

/**
 * A cider as the Press House pages consume it: the raw record plus the
 * three things the design needs that the data file does not carry.
 */
export interface ShelfCider extends CiderType {
  /** Which block of /ciders it sits in. */
  group: CiderGroup;
  /** Tile ground. Hue from the can, value separated within its hue
   *  family so no two tiles read alike. See canvas review, finding 09. */
  tileColor: string;
  /** Number of apple varieties in the blend, for the spec row. */
  appleCount: number;
  /** True while any spec on this cider is unverified, so the UI can
   *  mark it rather than quietly present a guess as fact. */
  provisional?: boolean;
}

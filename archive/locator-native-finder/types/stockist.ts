/**
 * Where you can buy the cider.
 *
 * This type is the contract between the locator UI and whatever ends
 * up supplying the list. Today that is a curated file (data/stockists.ts);
 * tomorrow it may be a feed from VIP, the distributor-data vendor whose
 * hosted widget the live site embeds. The UI imports this type and the
 * two functions in lib/stockists.ts and knows nothing else, so changing
 * the source is a change to one file.
 *
 * Every field the UI *needs* is required. Everything a real feed might
 * not carry is optional, and the UI degrades rather than showing a gap.
 */

/**
 * The trade's own split, and the one distinction shoppers actually
 * care about: are you buying a can to take home, or a glass to drink
 * here?
 *
 *   off  off-premise — package stores, supermarkets, bottle shops
 *   on   on-premise  — bars, restaurants, taprooms
 */
export type Premise = "off" | "on";

export interface Stockist {
  /** Stable key. A feed's own account number if it has one. */
  id: string;
  name: string;
  premise: Premise;
  /** Free text, shown as the tile's kicker: "Package store", "Taproom". */
  kind: string;
  street: string;
  town: string;
  /** Two-letter code, matching `distribution.states` in site-config. */
  state: string;
  zip: string;
  /**
   * Coordinates. Optional because a hand-kept list will not always
   * have them, and a stockist without them is still worth listing —
   * it simply cannot take part in a radius search or carry a distance.
   * See `resolveOrigin` in lib/stockists.ts.
   */
  lat?: number;
  lng?: number;
  phone?: string;
  url?: string;
  /**
   * Which ciders this account carries, by slug. Rarely known: a
   * distributor feed reports that a case shipped, not what is on the
   * shelf this morning. Shown only where present.
   */
  products?: string[];
  /** ISO date this listing was last confirmed at source. */
  confirmed?: string;
}

/**
 * The list plus the honesty about it. `status` is the important field:
 * the locator renders a standing warning while it is `"sample"`, so
 * placeholder rows can never be mistaken for real stockists by a
 * visitor — or by us, six months from now.
 */
export interface StockistDataset {
  status: "sample" | "live";
  /** ISO date the list was last refreshed at source, if known. */
  updated: string | null;
  /** Human description of where these rows came from. */
  source: string;
  stockists: Stockist[];
}

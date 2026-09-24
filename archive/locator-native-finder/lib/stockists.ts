import type { Premise, Stockist, StockistDataset } from "@/types/stockist";

/**
 * Searching the stockist list.
 *
 * All of it runs in the browser over a list that is already in the
 * page payload. For a few hundred accounts that is the right call for
 * the same reason the cider shelf filters client-side: there is no
 * request, no spinner and no empty first paint. If the list ever runs
 * to thousands of rows this is the file to move behind a route
 * handler — the component calls `findStockists` and nothing else.
 */

/* ------------------------------------------------------------------ */
/* Geography                                                           */
/* ------------------------------------------------------------------ */

export interface Origin {
  lat: number;
  lng: number;
  /** What to call this place in the results heading. */
  label: string;
}

/** A stockist that took part in a located search, with its distance. */
export interface StockistHit extends Stockist {
  /** Miles from the search origin. Absent when the search had none. */
  distance?: number;
}

const EARTH_MILES = 3958.8;

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Great-circle distance in miles. Good to a fraction of a percent at
 * these ranges, which is far better than the input deserves — a search
 * anchors on a town, not on the doorstep of the person searching.
 */
export function milesBetween(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * EARTH_MILES * Math.asin(Math.sqrt(h));
}

/** Casefold and strip punctuation so "St. Johnsbury" matches "st johnsbury". */
function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const hasCoords = (
  s: Stockist,
): s is Stockist & { lat: number; lng: number } =>
  typeof s.lat === "number" && typeof s.lng === "number";

/** Mean position of a set of stockists. Only called with a non-empty set. */
function centroid(group: (Stockist & { lat: number; lng: number })[]) {
  const lat = group.reduce((sum, s) => sum + s.lat, 0) / group.length;
  const lng = group.reduce((sum, s) => sum + s.lng, 0) / group.length;
  return { lat, lng };
}

/**
 * Turn what someone typed into a point to measure from.
 *
 * THE LIMITATION, STATED PLAINLY: we have no geocoder, so the only
 * places we can find on a map are places we already have a stockist
 * in. Type a ZIP we stock and the search anchors on it and sweeps the
 * radius properly, picking up neighbouring towns. Type a ZIP we have
 * never sold into and there is no point to measure from, so the search
 * falls back to plain text matching and the radius is ignored.
 *
 * That failure is the honest one. "No results within 10 miles of
 * 04605" and "we cannot place 04605" are different answers, and
 * `findStockists` reports which it gave so the UI can say so.
 *
 * Fixing it properly means coordinates for towns we do NOT stock,
 * which is either a geocoding API or a New England ZIP centroid table
 * (~6,000 rows, ~150KB). Both are real options; neither is worth it
 * until the real stockist list is in and we know the shape of the
 * misses. Until then this covers the common case, and it gets better
 * automatically as the list grows.
 */
export function resolveOrigin(
  query: string,
  stockists: Stockist[],
): Origin | null {
  const q = normalise(query);
  if (!q) return null;

  const located = stockists.filter(hasCoords);

  // A ZIP is exact or it is nothing — no partial matching on digits.
  if (/^\d{5}$/.test(q)) {
    const inZip = located.filter((s) => s.zip === q);
    if (inZip.length) return { ...centroid(inZip), label: q };
    return null;
  }

  // Town, then "Town, ST", then state name or code.
  const byTown = located.filter((s) => normalise(s.town) === q);
  if (byTown.length) {
    const { state } = byTown[0];
    return { ...centroid(byTown), label: `${byTown[0].town}, ${state}` };
  }

  const townState = located.filter(
    (s) => normalise(`${s.town} ${s.state}`) === q,
  );
  if (townState.length) {
    return {
      ...centroid(townState),
      label: `${townState[0].town}, ${townState[0].state}`,
    };
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* The search                                                          */
/* ------------------------------------------------------------------ */

export interface SearchRequest {
  /** A town, a ZIP, or part of a shop's name. Empty shows everything. */
  query?: string;
  /** Miles. Only applied when the search found an origin. */
  radius?: number;
  /** `null` means both. */
  premise?: Premise | null;
  /** From the browser's geolocation. Beats anything typed. */
  here?: { lat: number; lng: number } | null;
}

export interface SearchResult {
  hits: StockistHit[];
  /** The point distances were measured from, if there was one. */
  origin: Origin | null;
  /**
   * How the query was answered, so the UI can explain itself:
   *   all       nothing was asked for
   *   located   we found a point and swept the radius
   *   text      we matched names and towns; radius did not apply
   *   unplaced  it looks like a place, but not one we could find
   */
  mode: "all" | "located" | "text" | "unplaced";
}

/**
 * One entry point, so the component holds state and nothing else.
 *
 * Order of precedence: the device's own position beats a typed place,
 * a typed place beats plain text, and text beats showing everything.
 */
export function findStockists(
  dataset: StockistDataset,
  { query = "", radius = 25, premise = null, here = null }: SearchRequest,
): SearchResult {
  const pool = premise
    ? dataset.stockists.filter((s) => s.premise === premise)
    : dataset.stockists;

  const withDistance = (origin: Origin): StockistHit[] =>
    pool
      .filter(hasCoords)
      .map((s) => ({ ...s, distance: milesBetween(origin, s) }))
      .filter((s) => s.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

  if (here) {
    const origin: Origin = { ...here, label: "your location" };
    return { hits: withDistance(origin), origin, mode: "located" };
  }

  const q = normalise(query);
  if (!q) return { hits: byPlace(pool), origin: null, mode: "all" };

  const origin = resolveOrigin(query, dataset.stockists);
  if (origin) return { hits: withDistance(origin), origin, mode: "located" };

  // Not a place we know. Match the text against what is on the tile.
  const hits = pool.filter((s) =>
    [s.name, s.town, s.state, s.zip, s.kind]
      .map(normalise)
      .some((field) => field.includes(q)),
  );

  // A bare ZIP or a lone word that matched nothing reads as a place we
  // could not find, which is a different message from "no results".
  const looksLikePlace = /^\d{5}$/.test(q) || !q.includes(" ");
  return {
    hits: byPlace(hits),
    origin: null,
    mode: hits.length === 0 && looksLikePlace ? "unplaced" : "text",
  };
}

/** State, then town, then name. The order an unsearched list reads in. */
function byPlace(stockists: Stockist[]): StockistHit[] {
  return [...stockists].sort(
    (a, b) =>
      a.state.localeCompare(b.state) ||
      a.town.localeCompare(b.town) ||
      a.name.localeCompare(b.name),
  );
}

/**
 * Results as the page prints them: town headings with their stockists
 * under them. Input order is preserved, so a distance-sorted search
 * yields towns in distance order and an unsearched list yields them
 * alphabetically — the grouping never re-sorts behind the caller.
 */
export function groupByTown(
  hits: StockistHit[],
): { town: string; state: string; hits: StockistHit[] }[] {
  const groups: { town: string; state: string; hits: StockistHit[] }[] = [];
  for (const hit of hits) {
    const last = groups[groups.length - 1];
    if (last && last.town === hit.town && last.state === hit.state) {
      last.hits.push(hit);
    } else {
      groups.push({ town: hit.town, state: hit.state, hits: [hit] });
    }
  }
  return groups;
}

/* ------------------------------------------------------------------ */
/* Links out                                                           */
/* ------------------------------------------------------------------ */

const fullAddress = (s: Stockist) =>
  `${s.name.replace(/^SAMPLE — /, "")}, ${s.street}, ${s.town}, ${s.state} ${s.zip}`;

/**
 * Directions. Deliberately not a map embed per row: on a phone this
 * hands off to whichever map app the reader already uses and is signed
 * into, which is the thing they actually want when they have decided
 * where they are going.
 */
export function directionsUrl(s: Stockist): string {
  const q =
    hasCoords(s) ? `${s.lat},${s.lng}` : fullAddress(s);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
}

/**
 * The map panel. OpenStreetMap's own embed: no account, no API key and
 * no client library, which is what keeps a secondary map from costing
 * us a vendor decision and 200KB of JavaScript.
 *
 * The trade is that we cannot style it and it takes a single marker.
 * That is the right trade while the map is secondary. If it is ever
 * promoted to the main event, this is the function to replace — swap
 * in MapLibre GL with a hand-tuned ink-and-gold vector style, which
 * does need a tile provider (MapTiler, Protomaps) and therefore a key
 * and a bill. Nothing else in the UI would change.
 */
export function osmEmbedUrl(hits: StockistHit[]): string | null {
  const located = hits.filter(hasCoords);
  if (!located.length) return null;

  const lats = located.map((s) => s.lat);
  const lngs = located.map((s) => s.lng);
  // A single pin has no extent of its own, so give it a little.
  const pad = located.length === 1 ? 0.02 : 0.05;
  const bbox = [
    Math.min(...lngs) - pad,
    Math.min(...lats) - pad,
    Math.max(...lngs) + pad,
    Math.max(...lats) + pad,
  ].join(",");

  const params = new URLSearchParams({ bbox, layer: "mapnik" });
  if (located.length === 1) {
    params.set("marker", `${located[0].lat},${located[0].lng}`);
  }
  return `https://www.openstreetmap.org/export/embed.html?${params}`;
}

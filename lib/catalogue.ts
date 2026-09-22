import { ciders } from "@/data/ciders";
import {
  fallbackTileColor,
  missingFromData,
  provisionalSlugs,
  shelfOrder,
  tileColors,
} from "@/data/shelf";
import type {
  Addition,
  Blend,
  CiderGroup,
  CiderType,
  ShelfCider,
} from "@/types/cider";

/**
 * Everything the Press House pages know about the catalogue goes
 * through this module. Pages never import `data/ciders.ts` directly, so
 * replacing the provisional shelf in `data/shelf.ts` is a one-file
 * change. See the header of that file for what is still unverified.
 */

/** Every cider record known to the app, shelf or not. */
const allRecords: CiderType[] = [...ciders, ...missingFromData];

const bySlug = new Map(allRecords.map((c) => [c.slug, c]));

function toShelfCider(record: CiderType, group: CiderGroup): ShelfCider {
  return {
    ...record,
    group,
    tileColor: tileColors[record.slug] ?? fallbackTileColor,
    provisional: provisionalSlugs.has(record.slug) || undefined,
  };
}

/**
 * The shelf, in the order it is displayed. Any slug in `shelfOrder`
 * with no matching record is skipped rather than rendering a hole.
 */
export const shelf: ShelfCider[] = shelfOrder.flatMap(({ slug, group }) => {
  const record = bySlug.get(slug);
  return record ? [toShelfCider(record, group)] : [];
});

const shelfBySlug = new Map(shelf.map((c) => [c.slug, c]));

export const groupLabels: Record<CiderGroup, string> = {
  core: "Core line-up",
  seasonal: "Seasonal",
  rare: "Rare Apple Series",
};

export const groupBlurbs: Record<CiderGroup, string> = {
  core: "On shelves all year.",
  seasonal: "Here for a stretch, then gone until next year.",
  rare: "Small batch ciders made with extraordinary heirloom apples, many of them rare in the United States. Club members get first access.",
};

export const groupOrder: CiderGroup[] = ["core", "seasonal", "rare"];

export function cidersInGroup(group: CiderGroup): ShelfCider[] {
  return shelf.filter((c) => c.group === group);
}

/**
 * Detail-page lookup. Falls back to the raw record so the five ciders
 * that are in the data but off the shelf keep working URLs.
 */
export function getCider(slug: string): ShelfCider | undefined {
  const onShelf = shelfBySlug.get(slug);
  if (onShelf) return onShelf;
  const record = bySlug.get(slug);
  return record ? toShelfCider(record, "core") : undefined;
}

/** Every slug that should get a statically generated detail page. */
export function allCiderSlugs(): string[] {
  return allRecords.map((c) => c.slug);
}

export function relatedCiders(slug: string, limit = 3): ShelfCider[] {
  const cider = getCider(slug);
  if (!cider) return shelf.slice(0, limit);
  const sameGroup = shelf.filter(
    (c) => c.slug !== slug && c.group === cider.group,
  );
  const rest = shelf.filter((c) => c.slug !== slug && c.group !== cider.group);
  return [...sameGroup, ...rest].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Sweetness                                                           */
/* ------------------------------------------------------------------ */

/** 1-5, driest first. The scale the live site already uses. */
export const sweetnessLabels = [
  "Dry",
  "Semi-dry",
  "Medium",
  "Semi-sweet",
  "Sweet",
] as const;

export function sweetnessLabel(value: number): string {
  return sweetnessLabels[Math.min(Math.max(value, 1), 5) - 1];
}

/* ------------------------------------------------------------------ */
/* The trophy case                                                     */
/* ------------------------------------------------------------------ */

export interface AwardRecord {
  slug: string;
  ciderName: string;
  competition: string;
  /** Undefined for the one entry in the data that carries no year
   *  (Kingston Black's LA Invitational Best of Class). */
  year?: number;
  medal: string;
  isBestOfClass: boolean;
}

/**
 * Medal words as they actually appear in `data/ciders.ts`, longest
 * first so "best of class" wins over "class" and "double gold" over
 * "gold". Three of these are not medals in the usual sense — Winner,
 * Judge's Pick and Runner Up — but they are awards the brand won and
 * the data records them the same way.
 */
const MEDAL_WORDS: [needle: string, label: string][] = [
  ["best of class", "Best of Class"],
  ["best in class", "Best of Class"],
  ["double gold", "Double Gold"],
  ["judge's pick", "Judge's Pick"],
  ["judges pick", "Judge's Pick"],
  ["runner up", "Runner Up"],
  ["winner", "Winner"],
  ["gold", "Gold"],
  ["silver", "Silver"],
  ["bronze", "Bronze"],
];

/**
 * Award strings are free text and inconsistently punctuated across the
 * data file: hyphens and en dashes, several spellings per competition,
 * and one entry with no year at all. Parse rather than trust, so the
 * trophy case counts what is actually in the data.
 *
 * Verified against the canvas review's recount (finding 02): 26 awards
 * across 8 ciders and 7 competitions, 2015 to 2024, with THREE Best of
 * Class. The artboard said two, which undersells the brand.
 */
export function parseAward(
  slug: string,
  ciderName: string,
  raw: string,
): AwardRecord | null {
  const lower = raw.toLowerCase();

  const found = MEDAL_WORDS.find(([needle]) => lower.includes(needle));
  if (!found) return null;
  const [needle, label] = found;

  const yearMatch = raw.match(/\b(?:19|20)\d{2}\b/);
  const year = yearMatch ? Number(yearMatch[0]) : undefined;

  // Competition is whatever precedes the year, or the medal word when
  // there is no year. Trailing separators and the "Best in Class"
  // fragment some names carry are trimmed off.
  const head = yearMatch
    ? raw.slice(0, yearMatch.index)
    : raw.slice(0, lower.indexOf(needle));
  const competition = head
    .replace(/best (of|in) class/i, "")
    .replace(/[-–—,\s]+$/, "")
    .trim();

  return {
    slug,
    ciderName,
    // Normalised, not raw. The tally at the foot of the trophy case was
    // already collapsing these; the seals above it and the per-cider
    // award lists were not, so one seal read "Los Angeles Invitational
    // Wine & Spirits" directly above a tally that called the same body
    // "LA Invitational", and every detail page printed the data's
    // "SFChronicle" with the space missing. One canonical name, used
    // everywhere it is shown.
    competition: normaliseCompetition(competition),
    year,
    medal: label,
    isBestOfClass: label === "Best of Class",
  };
}

export const awards: AwardRecord[] = allRecords.flatMap((cider) =>
  (cider.awards ?? []).flatMap((raw) => {
    const parsed = parseAward(cider.slug, cider.name, raw);
    return parsed ? [parsed] : [];
  }),
);

/**
 * The same competition is written several ways across the data:
 * "GLINTCAP" and "GLINTCAP Best in Class"; "LA Invitational",
 * "LA Invitational Wine & Spirits" and "Los Angeles Invitational Wine
 * & Spirits"; "NY" and "New York International Cider Competition".
 * Without this the count comes out too high.
 */
function normaliseCompetition(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("glintcap")) return "GLINTCAP";
  if (lower.includes("los angeles") || lower.includes("la invitational"))
    return "LA Invitational";
  if (lower.includes("sfchronicle") || lower.includes("san francisco"))
    return "SF Chronicle";
  if (lower.includes("new york") || lower.startsWith("ny "))
    return "NY International Cider Competition";
  if (lower.includes("uk international")) return "UK International Cider Awards";
  if (lower.includes("good food")) return "Good Food Awards";
  if (lower.includes("cidercraft")) return "CiderCraft Awards";
  return name;
}

const awardYears = awards
  .map((a) => a.year)
  .filter((y): y is number => y !== undefined);

export const trophyCase = {
  total: awards.length,
  ciders: new Set(awards.map((a) => a.slug)).size,
  competitions: new Set(awards.map((a) => normaliseCompetition(a.competition)))
    .size,
  bestOfClass: awards.filter((a) => a.isBestOfClass),
  firstYear: Math.min(...awardYears),
  lastYear: Math.max(...awardYears),
};

export function awardsFor(slug: string): AwardRecord[] {
  return awards
    .filter((a) => a.slug === slug)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

/**
 * Medals per competition, biggest first, for the trophy case tally.
 * Derived rather than typed out, so the numbers cannot drift from the
 * data the way the artboard's "Two Best of Class" did.
 */
export const medalsByCompetition: { competition: string; count: number }[] =
  Object.entries(
    awards.reduce<Record<string, number>>((acc, award) => {
      const key = normaliseCompetition(award.competition);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([competition, count]) => ({ competition, count }))
    .sort((a, b) => b.count - a.count || a.competition.localeCompare(b.competition));

/**
 * The four seals shown on the home page: every Best of Class, then the
 * most notable remaining award to fill the row.
 *
 * Note for the record: the artboard credits the third Best of Class to
 * Blue Skies, but `data/ciders.ts` attributes "GLINTCAP Best in Class
 * 2021 - Gold" to Bittersweet Symphonie, which is not on the live
 * shelf. Driven from the data here so whatever the real list says,
 * this follows it.
 */
export const featuredAwards: AwardRecord[] = [
  ...trophyCase.bestOfClass,
  ...awards.filter(
    (a) => !a.isBestOfClass && ["Winner", "Judge's Pick"].includes(a.medal),
  ),
].slice(0, 4);

/* ------------------------------------------------------------------ */
/* Running order                                                       */
/* ------------------------------------------------------------------ */

/**
 * Previous and next cider in shelf order, wrapping at both ends. The
 * five records that are in the data but off the live shelf have no
 * place in the running order, so they get no neighbours rather than
 * being spliced into a sequence they are not part of.
 */
export function ciderNeighbours(slug: string): {
  prev?: ShelfCider;
  next?: ShelfCider;
} {
  const index = shelf.findIndex((c) => c.slug === slug);
  if (index === -1 || shelf.length < 2) return {};
  return {
    prev: shelf[(index - 1 + shelf.length) % shelf.length],
    next: shelf[(index + 1) % shelf.length],
  };
}

/* ------------------------------------------------------------------ */
/* The blend                                                           */
/* ------------------------------------------------------------------ */

/** "Ten months in Bully Boy whiskey barrels." */
export function barrelLine(barrel: NonNullable<Blend["barrel"]>): string {
  const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  const months = barrel.months
    ? `${words[barrel.months - 1] ?? barrel.months} months in `
    : "";
  const whose = barrel.cooperage ? `${barrel.cooperage} ` : "";
  const head = `${months}${whose}${barrel.spirit.toLowerCase()} barrels`;
  return `${head.charAt(0).toUpperCase()}${head.slice(1)}.`;
}

/**
 * The at-a-glance marks on a cider tile: what is in the can, one icon
 * each, in the same reading order as the detail page's blend panel.
 *
 * Built from `blend` rather than the old `features` flags. Those put a
 * gold and a red apple on almost every can and named varieties no
 * blend contains, so they could not be trusted to say anything. Every
 * mark here is something the detail page backs up.
 *
 * Additions collapse to one mark per kind, so Pog Punch's four fruits
 * read "Fruit" once rather than filling the tile with the same icon.
 */
export type BlendMarkKind =
  | "apples"
  | "single"
  | "barrel"
  | "orchard"
  | Addition["kind"];

export interface BlendMark {
  kind: BlendMarkKind;
  label: string;
}

const additionMarkLabels: Record<Addition["kind"], string> = {
  fruit: "Fruit",
  botanical: "Botanical",
  spice: "Spice",
  sweetener: "Sweetener",
};

export function blendMarks(blend: Blend): BlendMark[] {
  const marks: BlendMark[] = [];
  const count = blend.varieties.length;

  if (blend.singleVarietal) {
    marks.push({ kind: "single", label: "Single varietal" });
  } else if (count > 1) {
    marks.push({ kind: "apples", label: `${count} apples` });
  } else {
    marks.push({ kind: "apples", label: "Apples" });
  }

  if (blend.barrel) marks.push({ kind: "barrel", label: "Barrel aged" });

  const orchards = blend.orchards ?? [];
  if (orchards.length > 0) {
    marks.push({
      kind: "orchard",
      label: orchards.length === 1 ? "One orchard" : `${orchards.length} orchards`,
    });
  }

  const kinds = new Set((blend.additions ?? []).map((a) => a.kind));
  for (const kind of ["fruit", "botanical", "spice", "sweetener"] as const) {
    if (kinds.has(kind)) marks.push({ kind, label: additionMarkLabels[kind] });
  }

  return marks;
}

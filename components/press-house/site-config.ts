/**
 * One place for the things that appear in more than one band of
 * chrome: the routes, the wordmark subtitle and the ticker.
 */

export const routes = {
  home: "/",
  ciders: "/ciders",
  releases: "/releases",
  club: "/cider-club",
  locator: "/locator",
  ourStory: "/our-story",
  contact: "/contact",
  /** Built to the design but deliberately unlinked — see below. */
  taproom: "/taproom",
} as const;

/**
 * The masthead. Taproom is absent on purpose: the canvas review found
 * no taproom, hours, address or phone anywhere on stormalong.com, so
 * the page exists at /taproom with bracketed placeholders but is not
 * advertised until the business confirms there is a room to visit.
 *
 * /shop is absent for the same class of reason — an empty stub on the
 * live site and a 404 in the rebuild. Every "buy" intent goes to the
 * locator instead.
 */
export const primaryNav = [
  { label: "Ciders", href: routes.ciders },
  { label: "Releases", href: routes.releases },
  { label: "The Club", href: routes.club },
] as const;

export const footerNav = {
  cider: [
    { label: "Our ciders", href: routes.ciders },
    { label: "Rare Apple Series", href: routes.releases },
    { label: "How dry is it?", href: `${routes.ciders}#sweetness` },
    { label: "Awards", href: `${routes.home}#awards` },
  ],
  more: [
    { label: "Find our cider", href: routes.locator },
    { label: "Our story", href: routes.ourStory },
    { label: "Rare Apple Club", href: routes.club },
    { label: "Contact", href: routes.contact },
  ],
} as const;

export const site = {
  name: "Stormalong",
  tagline: "Quality craft hard cider",
  origin: "Sherborn, Mass. · Est. 2014",
  blurb:
    "Unfiltered. 100% fresh pressed apples. That's it. Made in Sherborn, Massachusetts since 2014.",
  email: "info@stormalong.com",
  instagram: "https://www.instagram.com/stormalongcider/",
  facebook: "https://www.facebook.com/stormalongcider/",
} as const;

/**
 * The ticker. Kept deliberately short-lived — anything here needs
 * changing when it stops being true, which is a job nobody does for
 * long, so it holds three lines at most.
 *
 * The taproom line from the artboard has been removed along with the
 * nav item.
 */
export const ticker = [
  "Kingston Black is on shelves now",
  "19.2 oz tall cans have landed",
  "Free shipping to club members",
] as const;

/**
 * Distribution, for the "Find a can" band.
 *
 * Counts are null because nobody has supplied real ones. The artboard
 * showed "701 locations" and per-state figures; those were invented for
 * the mockup and the review flagged them as placeholders to watch. The
 * UI renders the state without a number rather than printing a guess.
 * Fill `count` in from the distributor finder's own data when it is
 * available.
 */
export const distribution: {
  states: { code: string; name: string; count: number | null }[];
  retailCount: number | null;
  onPremiseCount: number | null;
} = {
  states: [
    { code: "MA", name: "Massachusetts", count: null },
    { code: "NH", name: "New Hampshire", count: null },
    { code: "RI", name: "Rhode Island", count: null },
    { code: "CT", name: "Connecticut", count: null },
    { code: "ME", name: "Maine", count: null },
    { code: "VT", name: "Vermont", count: null },
  ],
  retailCount: null,
  onPremiseCount: null,
};

/**
 * The stockist finder.
 *
 * stormalong.com/locator already runs a working embedded distributor
 * finder from finder.vtinfo.com (custID SMC), and every "Find It" on
 * the live cider pages points at it. The rebuild's own /locator was a
 * 404 — a regression the redesign introduced, not a missing capability.
 *
 * This page supplies the frame; the finder keeps its own data. Set
 * NEXT_PUBLIC_LOCATOR_EMBED_URL to the embed's URL and it drops in.
 * Until then the page renders a clearly marked slot rather than a
 * search box that does nothing.
 *
 * Still to decide with the vendor: whether the embed can be themed, or
 * whether its data can be read directly. A native list would let each
 * cider link straight to its own results.
 */
export const locator = {
  embedUrl: process.env.NEXT_PUBLIC_LOCATOR_EMBED_URL ?? null,
  vendor: "finder.vtinfo.com",
  customerId: "SMC",
  /** The finder that is live today, for as long as ours has no embed. */
  liveFallbackUrl: "https://stormalong.com/locator",
} as const;

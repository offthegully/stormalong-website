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
  { label: "Our Story", href: routes.ourStory },
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
  /** Canonical origin, for metadataBase and absolute OG image URLs.
   *  Override with NEXT_PUBLIC_SITE_URL on preview deployments. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stormalong.com",
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
 * /locator embeds VIP's hosted widget — the same one running on
 * stormalong.com today. VIP (finder.vtinfo.com) aggregate our
 * distributors' depletion reports, so the widget knows which accounts
 * actually bought cider recently. That freshness is the whole product
 * and we cannot reproduce it from a list we keep by hand, which is why
 * the native finder built against this page is shelved rather than
 * shipped. It is in archive/locator-native-finder/, with a README on
 * what would bring it back.
 *
 * HOW THE EMBED IS GATED — worth knowing before it "mysteriously breaks".
 *
 * VIP serve the widget only when BOTH hold:
 *
 *   1. It is genuinely framed. The request must carry
 *      `Sec-Fetch-Dest: iframe`. Open the URL in a tab and you get
 *      "Please view our Finder from the parent website" — that notice
 *      means top-level navigation, not a broken URL.
 *   2. The Referer is on their allowlist. stormalong.com passes and
 *      localhost passes, so development works out of the box. An
 *      arbitrary host does not.
 *
 * Point 2 is the one that will bite: a preview deployment, a staging
 * domain or the new production domain must be added to the allowlist
 * by VIP before the finder renders there. Ask them first, not after.
 *
 * Point 2 also means the embed depends on the browser sending a
 * referrer. Setting `Referrer-Policy: no-referrer` anywhere that
 * covers this page would silently blank the finder, so the iframe
 * names its own `referrerPolicy` rather than inheriting a site-wide
 * one. See app/locator/page.tsx.
 *
 * ON THEMING. The widget cannot be styled from here — it is
 * cross-origin, it exposes no CSS custom properties and it carries its
 * own Bootswatch theme. But its body tag is
 * `class="SUPP_SMC THEME_bs-litera"`: the theme is a per-supplier
 * setting on VIP's side, and the `SUPP_SMC` hook exists so they can
 * ship CSS scoped to our account. So the way to make the finder match
 * this site is to ask VIP for it, quoting those two class names. Until
 * then the page frames the widget as a deliberate inset — see the
 * comment on `Finder` in app/locator/page.tsx.
 */
export const locator = {
  /**
   * The embed. The default is the URL stormalong.com serves today; the
   * environment variable is there because `uuid` is an account
   * identifier of the kind that gets rotated, and when it does, this
   * can be corrected without a deploy.
   */
  embedUrl:
    process.env.NEXT_PUBLIC_LOCATOR_EMBED_URL ??
    "https://finder.vtinfo.com/finder/web/v2/iframe?custID=SMC&uuid=ZAQWdr6j3M398zgTxnr8ZnpzohvaD4NgBX2U&from=srsweb",
  vendor: "finder.vtinfo.com",
  customerId: "SMC",
} as const;

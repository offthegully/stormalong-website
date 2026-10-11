/**
 * The photo-shoot images in `public/images/landing-page/`, for the home
 * page. Unlike the per-cider sets in `cider-photos.ts`, these are wide
 * scene-setting shots — a can on a barrel in an orchard, two carved
 * figures on a harbor dock — so they are listed by hand with the cider
 * each one shows and where it should link.
 *
 * The line-up shot is the home page's shelf (`LineupShelf`); the rest
 * fill the photo spread beneath the medals (`PhotoMosaic`).
 *
 * Some are seasonal, and a pumpkin on the home page in May looks like
 * nobody is minding the site. `homePhotos()` puts whatever is in season
 * first and the evergreen shots after it. The windows follow the
 * availability the brand publishes for each cider in `data/ciders.ts`:
 * Happy Holidays September to December, White Mountain Magic late
 * December to March.
 *
 * The rugby sponsorship shot is deliberately left out: no product in
 * frame and a crowd of identifiable people. It belongs on Our Story if
 * anywhere.
 */

export type HomePhoto = {
  src: string;
  alt: string;
  /** What the photo shows, as a caption and link label. */
  label: string;
  href: string;
  width: number;
  height: number;
  /** CSS object-position, for when a pane crops the shot. */
  focus?: string;
};

const DIR = "/images/landing-page";

const photos = {
  orchard: {
    src: `${DIR}/legendary-dry-landing.jpg`,
    alt: "Three cans of Legendary Dry and a full glass on an old barrel head, surrounded by apples, with an orchard behind",
    label: "Legendary Dry",
    href: "/ciders/legendary-dry",
    width: 3000,
    height: 1875,
    focus: "50% 60%",
  },
  captains: {
    src: `${DIR}/award-winning-landing.jpg`,
    alt: "Cans of Mass Appeal, Legendary Dry and Red Skies at Night between two carved wooden figures, a sea captain and a fisherman in oilskins, on a harbor dock",
    label: "Award winners",
    href: "/ciders#awards",
    width: 6215,
    height: 4081,
    focus: "50% 55%",
  },
  heirloom: {
    src: `${DIR}/boston-heirloom-landing.jpg`,
    alt: "A can of Boston Heirloom on a windowsill beside a weathered fisherman figurine in a yellow oilskin and a small carved whale",
    label: "Boston Heirloom",
    href: "/ciders/boston-heirloom",
    width: 3000,
    height: 1500,
    focus: "45% 50%",
  },
  lineup: {
    src: `${DIR}/lineup-2025.jpg`,
    alt: "Five cans in a row on a dock by the water: Light of the Sun, Mass Appeal, Legendary Dry, Red Skies at Night and Farmstand Unfiltered",
    label: "The line-up",
    href: "/ciders",
    width: 3000,
    height: 1320,
  },
  canWall: {
    src: `${DIR}/farm-stand-landing.jpg`,
    alt: "A wall of stacked Farmstand Unfiltered cans",
    label: "Farmstand Unfiltered",
    href: "/ciders/farmstand-unfiltered",
    width: 3000,
    height: 1660,
  },
  rareApple: {
    src: "/images/cider-club/3-drinks-rare-apple.jpg",
    alt: "Two bottles and a can from the Rare Apple Series on a wooden shelf beside a carved sea captain figure and weathered wooden floats",
    label: "Rare Apple Series",
    href: "/releases",
    width: 3000,
    height: 2250,
    focus: "50% 55%",
  },
  farmstandFall: {
    src: `${DIR}/farmstand-fall.jpg`,
    alt: "Three cans of Farmstand Unfiltered on the tailgate of a red pickup, among pumpkins beside a farm stand chalkboard",
    label: "Farmstand Unfiltered",
    href: "/ciders/farmstand-unfiltered",
    width: 3000,
    height: 1320,
    focus: "60% 50%",
  },
  holidaysPumpkins: {
    src: `${DIR}/happy-holidays-fall.jpg`,
    alt: "Three cans of Happy Holidays among pumpkins and gourds in front of a red truck",
    label: "Happy Holidays",
    href: "/ciders/happy-holidays",
    width: 3000,
    height: 1320,
  },
  holidaysPie: {
    src: `${DIR}/happy-holidays-landing.jpg`,
    alt: "A can and a mug of Happy Holidays on a table with apples and slices of apple strudel",
    label: "Happy Holidays",
    href: "/ciders/happy-holidays",
    width: 3000,
    height: 1600,
    focus: "35% 50%",
  },
  snow: {
    src: `${DIR}/white-mountain-magic-landing.jpg`,
    alt: "Two cans of White Mountain Magic standing in fresh snow beside a frozen waterfall",
    label: "White Mountain Magic",
    href: "/ciders/white-mountain-magic",
    width: 6720,
    height: 3967,
    focus: "60% 60%",
  },
} satisfies Record<string, HomePhoto>;

/** The shelf shot. Kept out of the spread so it never shows twice. */
export const lineupPhoto: HomePhoto = photos.lineup;

/**
 * Five, so the spread is full in the months with nothing in season.
 * The Rare Apple shot is from the club page rather than this shoot,
 * and is last so it only shows when it is needed.
 */
const evergreen: HomePhoto[] = [
  photos.orchard,
  photos.captains,
  photos.heirloom,
  photos.canWall,
  photos.rareApple,
];

/** Indexed by month, January first. */
const seasonal: HomePhoto[][] = [
  [photos.snow], // Jan
  [photos.snow], // Feb
  [photos.snow], // Mar
  [], // Apr
  [], // May
  [], // Jun
  [], // Jul
  [], // Aug
  [photos.farmstandFall, photos.holidaysPumpkins], // Sep
  [photos.farmstandFall, photos.holidaysPumpkins], // Oct
  [photos.holidaysPie, photos.farmstandFall], // Nov
  [photos.holidaysPie, photos.snow], // Dec
];

/**
 * In-season shots first, then the evergreen set. `month` is 0–11; it
 * defaults to the current month. No two seasonal shots in a month share
 * a cider, and an evergreen shot drops out when its cider is already in
 * season — so one cider never takes two panes.
 */
export function homePhotos(month = new Date().getMonth()): HomePhoto[] {
  const now = seasonal[month] ?? [];
  const hrefs = new Set(now.map((p) => p.href));
  return [...now, ...evergreen.filter((p) => !hrefs.has(p.href))];
}

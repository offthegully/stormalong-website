import fs from "node:fs";
import path from "node:path";

/**
 * The cider photography in `public/images/cider-details-images/`.
 *
 * Three shots per cider — typically the fruit, the can in situ, and a
 * pour — at 1800 to 4500px. They are the best images in the repo and
 * they were on the old detail pages, so they belong on the new ones.
 *
 * The manifest is read from disk rather than typed out, so dropping a
 * new `<slug>-4.jpg` in the folder is enough to make it appear and
 * nothing goes stale. Each photo's pixel size is read from its header
 * too: the spread picks a layout from the shapes it is given, and a
 * portrait shot forced into a landscape pane loses two thirds of
 * itself. This module is server-only: every page that uses it
 * prerenders, so the directory is read at build time and never at
 * request time.
 */
const PUBLIC_DIR = "images/cider-details-images";
const DISK_DIR = path.join(process.cwd(), "public", PUBLIC_DIR);

const FILE = /^(.+)-(\d+)\.(?:jpg|jpeg|png)$/i;

export type CiderPhoto = {
  src: string;
  /** Width over height, from the file itself. */
  ratio: number;
};

/**
 * Which shot leads, where the numbered order does not serve the page.
 * Listed by file number; any number not listed follows in its own order.
 *
 * - grand-banks, farmstand-unfiltered: the -1 files are 1080 and 1200px
 *   wide, soft at lead size on a retina screen.
 * - massive-appeal: the sparkler shot is the one image of the three that
 *   reads at a glance; the hand-held can is a 9:16 close-up.
 * - light-of-the-sun: cans on ice over a studio packshot.
 * - ragtime-reserve: the can and glass before the label close-up.
 */
const LEAD_ORDER: Record<string, number[]> = {
  "grand-banks": [3, 1, 2],
  "farmstand-unfiltered": [2, 3, 1],
  "massive-appeal": [3, 1, 2],
  "light-of-the-sun": [3, 2, 1],
  "ragtime-reserve": [2, 1],
};

/** Pixel size from a JPEG or PNG header, without decoding the image. */
function imageSize(file: string): { width: number; height: number } | null {
  const buf = fs.readFileSync(file);

  // PNG: IHDR is always the first chunk.
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk the segments to the first start-of-frame marker.
  if (buf.readUInt16BE(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return null;
    const marker = buf[offset + 1];
    const isFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isFrame) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return null;
}

function readManifest(): Map<string, CiderPhoto[]> {
  const bySlug = new Map<string, (CiderPhoto & { index: number })[]>();

  let files: string[] = [];
  try {
    files = fs.readdirSync(DISK_DIR);
  } catch {
    // No folder in this checkout — pages render without a photo band.
    return new Map();
  }

  for (const file of files) {
    const match = FILE.exec(file);
    if (!match) continue;
    const [, slug, index] = match;
    const size = imageSize(path.join(DISK_DIR, file));
    const list = bySlug.get(slug) ?? [];
    list.push({
      index: Number(index),
      src: `/${PUBLIC_DIR}/${file}`,
      // An unreadable header is treated as the house 4:3 rather than
      // dropped: a slightly wrong crop beats a missing photograph.
      ratio: size ? size.width / size.height : 4 / 3,
    });
    bySlug.set(slug, list);
  }

  return new Map(
    [...bySlug].map(([slug, list]) => {
      const order = LEAD_ORDER[slug] ?? [];
      const rank = (index: number) => {
        const at = order.indexOf(index);
        return at === -1 ? order.length + index : at;
      };
      return [
        slug,
        list
          .sort((a, b) => rank(a.index) - rank(b.index))
          .map(({ src, ratio }) => ({ src, ratio })),
      ];
    }),
  );
}

const manifest = readManifest();

/** Photos for a cider, lead first. Empty when it has none. */
export function ciderPhotos(slug: string): CiderPhoto[] {
  return manifest.get(slug) ?? [];
}

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
 * nothing goes stale. This module is server-only: every page that uses
 * it prerenders, so the directory is read at build time and never at
 * request time.
 */
const PUBLIC_DIR = "images/cider-details-images";
const DISK_DIR = path.join(process.cwd(), "public", PUBLIC_DIR);

const FILE = /^(.+)-(\d+)\.(?:jpg|jpeg|png|webp)$/i;

function readManifest(): Map<string, string[]> {
  const bySlug = new Map<string, { index: number; file: string }[]>();

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
    const list = bySlug.get(slug) ?? [];
    list.push({ index: Number(index), file });
    bySlug.set(slug, list);
  }

  return new Map(
    [...bySlug].map(([slug, list]) => [
      slug,
      list
        .sort((a, b) => a.index - b.index)
        .map((entry) => `/${PUBLIC_DIR}/${entry.file}`),
    ]),
  );
}

const manifest = readManifest();

/** Photo paths for a cider, in order. Empty when it has none. */
export function ciderPhotos(slug: string): string[] {
  return manifest.get(slug) ?? [];
}

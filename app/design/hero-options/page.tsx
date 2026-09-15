import type { Metadata } from "next";
import Link from "next/link";
import { shelf, getCider } from "@/lib/catalogue";
import type { ShelfCider } from "@/types/cider";
import { ciderPhotos } from "@/lib/cider-photos";
import {
  HeroBanner,
  HeroCover,
  HeroStacked,
  HeroTriptych,
  HeroWithSpread,
  HeroWithStrip,
} from "@/components/press-house/detail/hero-variants";

/**
 * THROWAWAY. A side-by-side of four ways to put the cider photography
 * at the top of a detail page. Delete this folder and
 * `components/press-house/detail/hero-variants.tsx` once one is chosen
 * and folded into `app/ciders/[slug]/page.tsx`.
 */
export const metadata: Metadata = {
  title: "Hero options",
  robots: { index: false, follow: false },
};

const options = [
  {
    key: "C",
    name: "Photograph, plate, information",
    note: "Three blocks in a row. Watch the can: on most ciders it appears twice, once as the cutout and again inside the photograph.",
    render: (c: ShelfCider, p: string[]) => <HeroTriptych cider={c} photos={p} />,
  },
  {
    key: "D",
    name: "Plate, then a strip",
    note: "Hero untouched; all three photographs move up into an even band beneath it.",
    render: (c: ShelfCider, p: string[]) => <HeroWithStrip cider={c} photos={p} />,
  },
  {
    key: "E",
    name: "Plate over photograph",
    note: "C, stacked instead of side by side. Photograph and can together at the top, but at different sizes so they stop competing — and the information column keeps its full width.",
    render: (c: ShelfCider, p: string[]) => <HeroStacked cider={c} photos={p} />,
  },
  {
    key: "F",
    name: "Photograph above the hero",
    note: "The photograph leads, edge to edge, and the hero is untouched beneath it. Costs no width and no legibility; costs height, which pushes the specs down.",
    render: (c: ShelfCider, p: string[]) => <HeroBanner cider={c} photos={p} />,
  },
  {
    key: "G",
    name: "Plate, then a spread",
    note: "D with the strip composed rather than even: one shot leads at twice the size, the other two stack beside it.",
    render: (c: ShelfCider, p: string[]) => <HeroWithSpread cider={c} photos={p} />,
  },
  {
    key: "H",
    name: "The cover",
    note: "A different skeleton rather than another arrangement of the same one. The photograph becomes the page and carries the name on a flat ink plate; the tile colour shrinks to a dateline band; the information stops being a panel and becomes an article with a rail, where the cutout appears at pack-shot size because the photograph above has already shown the can.",
    render: (c: ShelfCider, p: string[]) => <HeroCover cider={c} photos={p} />,
  },
];

export default async function HeroOptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ cider?: string }>;
}) {
  const { cider: slug } = await searchParams;
  const withPhotos = shelf.filter((c) => ciderPhotos(c.slug).length > 0);
  const cider = getCider(slug ?? "") ?? withPhotos[0];
  const photos = ciderPhotos(cider.slug);

  return (
    <>
      <div className="sticky top-0 z-30 border-b-4 border-double border-gold bg-brick text-paper">
        <div className="ph-gutter flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5">
          <span className="ph-label text-[0.53rem]">Hero options</span>
          <span className="h-3 w-px bg-paper/30" />
          {withPhotos.map((c) => (
            <Link
              key={c.slug}
              href={`/design/hero-options?cider=${c.slug}`}
              className={
                c.slug === cider.slug
                  ? "ph-label text-[0.5rem] text-gold underline underline-offset-4"
                  : "ph-label text-[0.5rem] text-paper/70 hover:text-gold"
              }
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {options.map((option) => (
        <div key={option.key}>
          <div className="bg-paper-dark">
            <div className="ph-gutter py-6">
              <div className="flex items-baseline gap-4">
                <span className="ph-slab text-[2rem] leading-none text-brick">
                  {option.key}
                </span>
                <h2 className="ph-slab text-[1.3rem] leading-none">
                  {option.name}
                </h2>
              </div>
              <p className="mt-2.5 max-w-[70ch] font-franklin text-[0.9rem] leading-relaxed text-prose">
                {option.note}
              </p>
            </div>
          </div>
          {option.render(cider, photos)}
        </div>
      ))}
    </>
  );
}

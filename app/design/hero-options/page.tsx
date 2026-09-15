import type { Metadata } from "next";
import Link from "next/link";
import { shelf, getCider } from "@/lib/catalogue";
import { ciderPhotos } from "@/lib/cider-photos";
import {
  HeroCurrent,
  HeroPhoto,
  HeroTriptych,
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
    key: "A",
    name: "What is there now",
    note: "Flat colour plate, cutout can. Photographs sit far down the page, below the awards and the blend.",
    render: (c: ReturnType<typeof getCider>, p: string[]) =>
      c ? <HeroCurrent cider={c} /> : null,
  },
  {
    key: "B",
    name: "Photograph takes the plate",
    note: "The cutout goes. Colour survives as the solid tag in the corner, which still ties back to the tile you clicked.",
    render: (c: ReturnType<typeof getCider>, p: string[]) =>
      c ? <HeroPhoto cider={c} photos={p} /> : null,
  },
  {
    key: "C",
    name: "Photograph, plate, information",
    note: "Three blocks in a row. Photograph and can side by side at the top; the information column narrows to half.",
    render: (c: ReturnType<typeof getCider>, p: string[]) =>
      c ? <HeroTriptych cider={c} photos={p} /> : null,
  },
  {
    key: "D",
    name: "Plate, then a strip",
    note: "Hero untouched; all three photographs move up into a band directly beneath it.",
    render: (c: ReturnType<typeof getCider>, p: string[]) =>
      c ? <HeroWithStrip cider={c} photos={p} /> : null,
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

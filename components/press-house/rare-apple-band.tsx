import Link from "next/link";
import { groupBlurbs } from "@/lib/catalogue";
import { routes } from "./site-config";
import { Eyebrow } from "./ui";

/** The vault call. Closes the home page and /ciders alike. */
export function RareAppleBand() {
  return (
    <section className="ph-rule-gold border-b-0 border-t-4 bg-ink text-paper">
      <div className="ph-gutter flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <Eyebrow className="mb-2.5 block">In the vault</Eyebrow>
          <h2 className="ph-slab mb-2.5 text-[1.9rem] leading-none">
            The Rare Apple Series
          </h2>
          <p className="max-w-[64ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/80">
            {groupBlurbs.rare}
          </p>
        </div>
        <Link
          href={routes.releases}
          className="ph-press ph-label shrink-0 border-2 border-gold px-6 py-3.5 text-gold hover:bg-gold hover:text-ink"
        >
          See the releases →
        </Link>
      </div>
    </section>
  );
}

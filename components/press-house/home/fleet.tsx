import Link from "next/link";
import { shelf } from "@/lib/catalogue";
import { CiderTile } from "../cider-tile";
import { ArrowRightIcon } from "../icons";
import { routes } from "../site-config";
import { SectionRule } from "../ui";

/**
 * Six tiles on the home page, the whole shelf on /ciders. Colour is
 * doing the identifying work here, not the photography — see the note
 * on CiderTile about why the grounds are a value ladder.
 */
export function Fleet() {
  const featured = shelf.slice(0, 6);

  return (
    <section className="bg-paper">
      <div className="ph-gutter py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="ph-label mb-2.5 text-brick">On shelves now</div>
            <h2 className="ph-slab text-[2rem] leading-none sm:text-[2.4rem]">
              The core line-up
            </h2>
          </div>
          <Link
            href={routes.ciders}
            className="ph-press group ph-label inline-flex items-center gap-1.5 text-brick hover:text-brick-dark"
          >
            All {shelf.length} ciders
            <ArrowRightIcon
              size={12}
              className="ph-move-fast group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cider) => (
            <CiderTile key={cider.slug} cider={cider} showGroupTag />
          ))}
        </div>
      </div>
    </section>
  );
}

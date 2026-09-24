import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sweetnessLabel } from "@/lib/catalogue";
import type { ShelfCider } from "@/types/cider";
import { BlendMarks } from "./blend-marks";
import { ArrowRightIcon } from "./icons";

/**
 * A colour-blocked cider tile — the unit that /ciders and the home
 * fleet are both built from.
 *
 * The can is the tile. The labels are the best thing Stormalong owns
 * and they are what somebody scanning a shelf actually reads, so they
 * get the top half of the tile at a size where the artwork resolves.
 * Everything else is a caption under a photograph.
 *
 * The ground comes from `cider.tileColor`, which is NOT an eyedropper
 * of the can. The fifteen labels collapse into only five hue families,
 * so a straight sample produces eleven pairs of tiles that read
 * identically. Hue is taken from the label and then separated by value
 * within each family; every result clears 4.5:1 against the cream type.
 * See canvas review, finding 09.
 */
export function CiderTile({
  cider,
  showGroupTag = false,
  className,
}: {
  cider: ShelfCider;
  showGroupTag?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/ciders/${cider.slug}`}
      style={{ backgroundColor: cider.tileColor }}
      className={cn(
        "ph-lift ph-ring group flex flex-col text-paper-light",
        "hover:shadow-[0_16px_34px_rgba(10,26,43,0.32)]",
        className,
      )}
    >
      {/* The stage. The tag is positioned rather than stacked so that
          a seasonal and a year-round tile put their cans on exactly
          the same line — otherwise every other tile in a row sits a
          row of small caps lower than its neighbours.

          The tag earns its corner only when it says something the
          group heading has not. "Year-round" is the default and never
          shows. "Seasonal" is dropped inside the Rare Apple Series,
          where three of the four cans carry it and the heading has
          already covered it — that group was labelling its own members
          "Seasonal". "Limited" survives everywhere, because it is
          scarcer than the group it sits in and it is what the home
          page's hero calls Kingston Black. */}
      <div className="relative flex justify-center px-6 pb-6 pt-8">
        {showGroupTag && showsAvailability(cider) && (
          <div className="ph-label absolute left-5 top-5 text-[0.56rem] text-gold">
            {cider.availability}
          </div>
        )}
        <Image
          src={cider.image}
          alt=""
          width={210}
          height={500}
          sizes="(min-width: 1024px) 110px, (min-width: 640px) 95px, 105px"
          className="ph-move h-[225px] w-auto object-contain drop-shadow-[0_16px_26px_rgba(0,0,0,0.45)] group-hover:-translate-y-2.5 group-hover:rotate-3 group-hover:scale-105 group-focus-visible:-translate-y-2.5 group-focus-visible:rotate-3 group-focus-visible:scale-105 lg:h-[250px]"
        />
      </div>

      <div className="flex flex-grow flex-col border-t border-paper-light/25 px-6 pb-6 pt-5">
        <h3 className="ph-slab mb-2 text-[1.3rem] leading-tight">
          {cider.name}
        </h3>

        <p className="mb-4 font-franklin text-[0.85rem] font-light leading-snug text-paper-light/80">
          {cider.flavor}
        </p>

        <BlendMarks blend={cider.blend} className="mb-5" />

        <div className="mt-auto flex gap-5">
          <div>
            <div className="ph-label mb-1 text-[0.5rem] text-paper-light/55">
              ABV
            </div>
            <div className="ph-num text-[0.9rem] font-semibold">
              {cider.abv}%
            </div>
          </div>
          <div>
            <div className="ph-label mb-1 text-[0.5rem] text-paper-light/55">
              Sweetness
            </div>
            <div className="text-[0.9rem] font-semibold">
              {sweetnessLabel(cider.sweetness)}
            </div>
          </div>
        </div>

        {/* This tile goes to the cider, not to the locator, so it says
            so. The old label read "Where to find it", which is the
            locator's promise and a different page. */}
        <span className="ph-label mt-4 inline-flex items-center gap-1.5 text-[0.56rem] text-gold">
          See the cider
          <ArrowRightIcon
            size={12}
            className="ph-move-fast group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * Whether the availability tag adds anything over the group heading the
 * tile is sitting under.
 *
 * "Year-round" is the default state and is never worth a tag. "Seasonal"
 * is worth one in the core and seasonal groups but not in the Rare Apple
 * Series, whose heading has already said it. Anything scarcer than that
 * — "Limited" today — always shows, in any group.
 */
function showsAvailability(cider: ShelfCider): boolean {
  if (cider.availability === "Year-round") return false;
  if (cider.availability === "Seasonal" && cider.group === "rare") return false;
  return true;
}

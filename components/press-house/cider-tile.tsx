import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sweetnessLabel } from "@/lib/catalogue";
import type { ShelfCider } from "@/types/cider";
import { ArrowRightIcon } from "./icons";
import { Tbc } from "./ui";

/**
 * A colour-blocked cider tile — the unit that /ciders and the home
 * fleet are both built from.
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
        "group flex flex-col p-6 text-paper-light transition-shadow hover:shadow-[inset_0_0_0_2px_#C9A227]",
        className,
      )}
    >
      {showGroupTag && cider.availability !== "Year-round" && (
        <div className="ph-label mb-2.5 text-[0.56rem] text-gold">
          {cider.availability}
        </div>
      )}

      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="ph-slab text-[1.3rem] leading-tight">{cider.name}</h3>
        <Image
          src={cider.image}
          alt=""
          width={54}
          height={128}
          className="h-[86px] w-auto shrink-0 object-contain"
        />
      </div>

      <p className="mb-4 font-franklin text-[0.85rem] font-light leading-snug text-paper-light/80">
        {cider.flavor}
      </p>

      <div className="mt-auto flex gap-5 border-t border-paper-light/25 pt-3.5">
        <div>
          <div className="ph-label mb-1 text-[0.5rem] text-paper-light/55">
            ABV
          </div>
          <div className="ph-num text-[0.9rem] font-semibold">{cider.abv}%</div>
        </div>
        <div>
          <div className="ph-label mb-1 text-[0.5rem] text-paper-light/55">
            Sweetness
          </div>
          <div className="text-[0.9rem] font-semibold">
            {cider.provisional ? (
              <Tbc>{sweetnessLabel(cider.sweetness)}</Tbc>
            ) : (
              sweetnessLabel(cider.sweetness)
            )}
          </div>
        </div>
      </div>

      <span className="ph-label mt-4 inline-flex items-center gap-1.5 text-[0.56rem] text-gold">
        Where to find it
        <ArrowRightIcon size={12} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

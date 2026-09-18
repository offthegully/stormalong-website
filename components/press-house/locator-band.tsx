import Link from "next/link";
import { PinIcon } from "./icons";
import { routes } from "./site-config";

/**
 * The locator call. Repeated at the foot of every page except the home
 * page and the locator itself, both of which already answer it at
 * length.
 */
export function LocatorBand() {
  return (
    <section className="bg-brick text-paper">
      <div className="ph-gutter flex flex-col items-start justify-between gap-6 py-9 md:flex-row md:items-center">
        <div>
          <h2 className="ph-slab mb-2 text-2xl leading-tight md:text-[1.75rem]">
            Know which one you want?
          </h2>
          <p className="max-w-[52ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/85">
            Our finder already knows every shop and bar that carries us.
          </p>
        </div>
        <Link
          href={routes.locator}
          className="ph-press ph-label inline-flex shrink-0 items-center gap-2 bg-gold px-7 py-4 text-ink hover:bg-gold-pale"
        >
          <PinIcon size={14} />
          Find it
        </Link>
      </div>
    </section>
  );
}

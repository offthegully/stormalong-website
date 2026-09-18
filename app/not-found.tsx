import Link from "next/link";
import { routes } from "@/components/press-house/site-config";
import { Eyebrow, PhButton } from "@/components/press-house/ui";

export default function NotFound() {
  return (
    <section className="bg-ink text-paper">
      <div className="ph-gutter flex min-h-[60vh] flex-col justify-center py-16">
        <Eyebrow className="mb-5 block">Off the chart</Eyebrow>
        <p className="ph-slab ph-num text-[4.5rem] leading-none text-gold sm:text-[6rem]">
          404
        </p>
        <h1 className="ph-slab mt-3 text-[2rem] leading-tight sm:text-[2.6rem]">
          There is nothing at this address.
        </h1>
        <p className="mt-4 max-w-[52ch] font-franklin text-[0.97rem] font-light leading-relaxed text-paper/75">
          The page has either moved or never existed. The cider, at least, is
          where it always was.
        </p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <PhButton href={routes.ciders} tone="gold">
            See the ciders
          </PhButton>
          <PhButton href={routes.locator} tone="outline-gold">
            Find a can
          </PhButton>
        </div>
        <Link
          href="/"
          className="ph-press ph-label mt-8 text-[0.53rem] text-paper/55 underline-offset-4 hover:text-gold hover:underline"
        >
          Back to the front page
        </Link>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PinIcon } from "@/components/press-house/icons";
import { PageHeader } from "@/components/press-house/page-header";
import {
  distribution,
  locator,
  site,
} from "@/components/press-house/site-config";
import { Eyebrow } from "@/components/press-house/ui";

export const metadata: Metadata = {
  title: "Find our cider",
  description:
    "Find Stormalong Cider near you. Search a town or ZIP code for the package stores, supermarkets, bars and restaurants carrying us across New England.",
};

/**
 * The frame around the finder that already exists. See `locator` in
 * site-config.ts for why this page is framing rather than building.
 */
export default function LocatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Find our cider"
        title="Find a can near you"
        intro="Search a town or a ZIP code and the finder will tell you which package stores, supermarkets, bars and restaurants have Stormalong on the shelf right now."
      />

      <section className="bg-paper">
        <div className="ph-gutter py-12">
          <Finder />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <aside className="border-2 border-ink px-7 py-7">
              <Eyebrow className="mb-3 block text-brick" stars={false}>
                Ask for it
              </Eyebrow>
              <h2 className="ph-slab mb-2.5 text-[1.4rem] leading-tight">
                Ask your local shop
              </h2>
              <p className="mb-4 font-franklin text-[0.92rem] font-light leading-relaxed text-prose">
                If your local shop does not stock us yet, they can order us
                in. It is the quickest way to get a cider into your own
                neighbourhood.
              </p>
              <a
                href={`mailto:${site.email}?subject=Stocking%20Stormalong`}
                className="ph-label inline-flex items-center gap-2 border-2 border-ink px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Get in touch
              </a>
            </aside>

            <aside className="border-2 border-ink bg-ink px-7 py-7 text-paper">
              <Eyebrow className="mb-3 block" stars={false}>
                Not in your area?
              </Eyebrow>
              <h2 className="ph-slab mb-2.5 text-[1.4rem] leading-tight">
                Still stuck?
              </h2>
              <p className="mb-4 font-franklin text-[0.92rem] font-light leading-relaxed text-paper/75">
                Tell us where you are and we will point you at the closest
                place that has it. Email {site.email} and we will do our best
                to come back to you within 48 hours.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="ph-label inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-ink transition-colors hover:bg-gold-pale"
              >
                Email us
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Where we are. States are real; the counts belong to the finder,
          so they are neither duplicated nor invented here. */}
      <section className="border-t-2 border-ink/15 bg-paper-dark">
        <div className="ph-gutter py-11">
          <div className="mb-6 flex items-center gap-4">
            <Eyebrow>Where we are</Eyebrow>
            <span className="h-px flex-grow bg-ink/15" />
            <span className="ph-label hidden text-prose-faint md:block">
              Six states across New England
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {distribution.states.map((state) => (
              <div key={state.code} className="border-t-[3px] border-ink pt-3.5">
                <div className="ph-slab text-[1.6rem] leading-none">
                  {state.code}
                </div>
                <div className="mt-1.5 font-franklin text-[0.84rem] text-prose">
                  {state.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Finder() {
  if (locator.embedUrl) {
    return (
      <div className="border-[3px] border-ink">
        <iframe
          src={locator.embedUrl}
          title="Stormalong stockist finder"
          className="h-[640px] w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  /**
   * No embed configured. Rather than render a search box that does
   * nothing, say plainly what belongs here and send people to the
   * finder that works today.
   */
  return (
    <div className="border-[3px] border-dashed border-ink/40 bg-paper-light px-8 py-12 text-center">
      <PinIcon size={30} className="mx-auto mb-4 text-brick" />
      <h2 className="ph-slab mb-3 text-[1.5rem] leading-tight">
        The finder sits here
      </h2>
      <p className="mx-auto mb-6 max-w-[62ch] font-franklin text-[0.95rem] font-light leading-relaxed text-prose">
        Search, map and stockist list come from the distributor finder
        Stormalong already runs ({locator.vendor}, customer ID{" "}
        {locator.customerId}). It keeps its own data; this page supplies the
        frame and the type around it. Set{" "}
        <span className="ph-num">NEXT_PUBLIC_LOCATOR_EMBED_URL</span> and it
        drops straight in.
      </p>
      <Link
        href={locator.liveFallbackUrl}
        className="ph-label inline-flex items-center gap-2 bg-brick px-7 py-4 text-paper transition-colors hover:bg-brick-dark"
      >
        <PinIcon size={14} className="text-gold" />
        Use the finder that is live today
      </Link>
    </div>
  );
}

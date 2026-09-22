import type { Metadata } from "next";
import { stockistData } from "@/data/stockists";
import { PageHeader } from "@/components/press-house/page-header";
import { distribution, site } from "@/components/press-house/site-config";
import { StockistFinder } from "@/components/press-house/stockist-finder";
import { Eyebrow } from "@/components/press-house/ui";

export const metadata: Metadata = {
  title: "Find our cider",
  description:
    "Find Stormalong Cider near you. Search a town or ZIP code for the package stores, supermarkets, bars and restaurants carrying us across New England.",
};

/**
 * The locator, built here rather than embedded.
 *
 * It used to frame a cross-origin iframe from finder.vtinfo.com. That
 * widget has data we cannot reproduce — our distributors' depletion
 * reports, which know who actually bought cider last month — but it
 * carries its own Bootstrap theme and its own Google Maps key into the
 * middle of the page and cannot be styled past that. So the pieces
 * were split: this app owns the presentation, and the list is a
 * swappable input. See data/stockists.ts for the three ways to fill it.
 */
export default function LocatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Find our cider"
        title="Find a can near you"
        intro="Search a town or a ZIP code and we will tell you which package stores, supermarkets, bars and restaurants have Stormalong on the shelf."
      />

      <section className="bg-paper">
        <div className="ph-gutter py-12">
          <StockistFinder data={stockistData} />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <aside className="ph-tint border-2 border-ink px-7 py-7 hover:border-brick">
              <Eyebrow className="mb-3 block text-brick" stars={false}>
                Ask for it
              </Eyebrow>
              <h2 className="ph-slab mb-2.5 text-[1.4rem] leading-tight">
                Ask your local shop
              </h2>
              <p className="mb-4 font-franklin text-[0.92rem] font-light leading-relaxed text-prose">
                If your local shop does not stock us yet, they can order us
                in. It is the quickest way to get a cider into your own
                neighborhood.
              </p>
              <a
                href={`mailto:${site.email}?subject=Stocking%20Stormalong`}
                className="ph-press ph-label inline-flex items-center gap-2 border-2 border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-paper"
              >
                Get in touch
              </a>
            </aside>

            <aside className="ph-tint border-2 border-ink bg-ink px-7 py-7 text-paper hover:border-gold">
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
                className="ph-press ph-label inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-ink hover:bg-gold-pale"
              >
                Email us
              </a>
            </aside>
          </div>
        </div>
      </section>

      <WhereWeAre />
    </>
  );
}

/**
 * The six states.
 *
 * Counts come from the stockist list itself now that we hold one, so
 * the two can never drift — but only once it is real. While the list
 * is sample data a count would be a made-up number printed in a
 * confident slab face, which is exactly the thing this codebase keeps
 * refusing to do, so the band falls back to naming the states alone.
 */
function WhereWeAre() {
  const live = stockistData.status === "live";
  const counts = new Map<string, number>();
  if (live) {
    for (const s of stockistData.stockists) {
      counts.set(s.state, (counts.get(s.state) ?? 0) + 1);
    }
  }

  return (
    <section className="border-t-2 border-ink/15 bg-paper-dark">
      <div className="ph-gutter py-11">
        <div className="mb-6 flex items-center gap-4">
          <Eyebrow>Where we are</Eyebrow>
          <span className="h-px flex-grow bg-ink/15" />
          <span className="ph-label hidden text-prose-faint md:block">
            All six New England states
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {distribution.states.map((state) => (
            <div
              key={state.code}
              className="ph-tint group border-t-[3px] border-ink pt-3.5 hover:border-brick"
            >
              <div className="ph-figure ph-slab origin-bottom-left text-[1.6rem] leading-none group-hover:scale-110 group-hover:text-brick">
                {state.code}
              </div>
              <div className="mt-1.5 font-franklin text-[0.84rem] text-prose">
                {state.name}
              </div>
              {live && (
                <div className="ph-label ph-num mt-1 text-prose-faint">
                  {counts.get(state.code) ?? 0} places
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

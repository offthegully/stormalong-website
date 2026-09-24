import type { Metadata } from "next";
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
 * The locator: the vendor's finder, framed.
 *
 * A native finder was built for this page and is shelved in
 * archive/locator-native-finder/ — not because it did not work, but
 * because VIP's widget knows which accounts actually bought cider last
 * month and a hand-kept list does not. See `locator` in site-config.ts
 * for how the embed is gated and what theming is possible.
 */
export default function LocatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Find our cider"
        title="Find a can near you"
        intro="Search by town or ZIP code to find the package stores, supermarkets, bars and restaurants that carry Stormalong."
      />

      <section className="bg-paper">
        <div className="ph-gutter py-12">
          <Finder />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <aside className="ph-tint border-2 border-ink px-7 py-7 hover:border-brick">
              <Eyebrow className="mb-3 block text-brick" stars={false}>
                Not on the shelf?
              </Eyebrow>
              <h2 className="ph-slab mb-2.5 text-[1.4rem] leading-tight">
                Ask your local shop
              </h2>
              <p className="mb-4 font-franklin text-[0.92rem] font-light leading-relaxed text-prose">
                If your local shop doesn't stock us yet, ask them to order us
                in. It's the quickest way to get Stormalong into your
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
                Email {site.email} with your town and we&rsquo;ll point you
                to the closest place that has it. We do our best to reply
                within 48 hours.
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
 * States are real; the counts are not ours to print. The finder holds
 * the only list of accounts there is, and it holds it on VIP's side,
 * so a number here would be either duplicated or invented. The
 * artboard's "701 locations" was the latter.
 */
function WhereWeAre() {
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The vendor's widget, framed.
 *
 * It cannot be styled: cross-origin, no CSS custom properties, its own
 * Bootswatch theme (white ground, blue accents) and its own Google
 * Maps key. Dropping that straight onto cream reads as a patch —
 * something that failed to load correctly.
 *
 * So the frame stops apologising for it and commits: a heavy ink rule
 * and an ink caption bar turn it into a boxed inset, the way a
 * newspaper sets an advertisement it did not typeset. The border is
 * doing real work — it is what separates the widget's white from the
 * page's cream, so the seam reads as an edge rather than a mismatch.
 *
 * The height is fixed at a generous 720px because it has to be: the
 * widget sends no postMessage, so there is no way to size the frame to
 * its content, and a frame that is too short gives the reader two
 * scrollbars. Erring tall costs some whitespace on a short result set
 * and is much the better failure.
 *
 * `referrerPolicy` is not boilerplate. VIP serve this only to an
 * allowlisted Referer, so the request must carry one — naming the
 * policy here keeps a future site-wide `no-referrer` header from
 * silently blanking the finder. See `locator` in site-config.ts.
 */
function Finder() {
  return (
    <div>
      <div className="border-[3px] border-ink bg-paper-light">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink bg-ink px-5 py-3.5">
          <Eyebrow className="text-gold">The finder</Eyebrow>
          <span className="ph-label text-paper/45">
            Kept current by our distributors
          </span>
        </div>

        <iframe
          src={locator.embedUrl}
          title="Stormalong stockist finder"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[720px] w-full border-0"
        />
      </div>

      {/* The one failure we cannot see. If VIP have not allowlisted the
          domain, the frame renders their "view from the parent website"
          notice and nothing here can detect it cross-origin — so the
          reader gets a way out that does not depend on us noticing. */}
      <p className="mt-3 font-franklin text-[0.85rem] font-light leading-relaxed text-prose-muted">
        Finder not loading?{" "}
        <a
          href={`mailto:${site.email}?subject=Locator%20trouble`}
          className="ph-wipe text-ink underline decoration-brick underline-offset-4 hover:text-brick"
        >
          Tell us where you are
        </a>{" "}
        and we&rsquo;ll point you to the closest place that has it.
      </p>
    </div>
  );
}

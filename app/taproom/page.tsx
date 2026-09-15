import type { Metadata } from "next";
import { getCider, sweetnessLabel } from "@/lib/catalogue";
import { LocatorBand } from "@/components/press-house/locator-band";
import { PageHeader } from "@/components/press-house/page-header";
import { site } from "@/components/press-house/site-config";
import { Eyebrow, Tbc } from "@/components/press-house/ui";

/**
 * UNVERIFIED PROPOSAL — parked, not advertised.
 *
 * Nothing on stormalong.com mentions a taproom, a tasting room,
 * opening hours or a public address. This page exists because the
 * design called for it and there is an unused photograph of a taproom
 * in the repository, but every fact on it is drafted rather than taken
 * from the brand's own copy.
 *
 * It is deliberately absent from the masthead (see site-config.ts) and
 * excluded from the sitemap and search indexes below. If there is no
 * taproom, delete this file; if there is, replace every [TBC] with the
 * real detail and add it back to `primaryNav`.
 */
export const metadata: Metadata = {
  title: "Taproom",
  robots: { index: false, follow: false },
};

const hours = [
  { day: "Monday", time: null },
  { day: "Tuesday", time: null },
  { day: "Wednesday", time: null },
  { day: "Thursday", time: "4 – 9 pm" },
  { day: "Friday", time: "4 – 9 pm" },
  { day: "Saturday", time: "12 – 8 pm" },
  { day: "Sunday", time: "12 – 8 pm" },
];

const onTap = [
  "legendary-dry",
  "farmstand-unfiltered",
  "kingston-black",
  "blue-skies",
];

const expectations = [
  { title: "Flights and pours", copy: "Confirm what you serve." },
  { title: "Cans to take home", copy: "Confirm what is available to take away." },
  { title: "Food", copy: "Confirm." },
  { title: "Children and dogs", copy: "Confirm the policy." },
  { title: "Groups", copy: "Confirm whether you take bookings." },
  { title: "Getting there", copy: "Confirm parking and transit." },
];

export default function TaproomPage() {
  return (
    <>
      {/* The banner is part of the deliverable, not decoration. Nobody
          should be able to read this page without knowing it is a
          draft. Remove it together with the [TBC]s. */}
      <div className="border-b-2 border-brick bg-brick/10">
        <div className="ph-gutter py-4">
          <div className="ph-label mb-1.5 text-brick">Unverified proposal</div>
          <p className="max-w-[86ch] font-franklin text-[0.88rem] font-light leading-relaxed text-prose">
            Nothing on stormalong.com mentions a taproom, a tasting room,
            opening hours or a public address. This page assumes one exists.
            Everything below is drafted, not taken from Stormalong's own
            copy, and the page is unlinked and hidden from search until
            someone confirms it. If there is no taproom, delete it.
          </p>
        </div>
      </div>

      <PageHeader
        eyebrow="Visit us"
        title="The taproom"
        intro={
          <>
            <Tbc>Draft copy</Tbc> — if the taproom is real, this is where you
            would say what it is and why to come.
          </>
        }
      >
        <div className="mt-7 flex flex-wrap gap-8 border-t border-gold/30 pt-5">
          <div>
            <div className="ph-label mb-1.5 text-[0.53rem] text-paper/45">
              Address
            </div>
            <div className="font-franklin text-[0.95rem]">
              <Tbc>Street address</Tbc>, Sherborn, Mass.
            </div>
          </div>
          <div>
            <div className="ph-label mb-1.5 text-[0.53rem] text-paper/45">
              Thu – Fri
            </div>
            <div className="ph-num font-franklin text-[0.95rem]">4 – 9 pm</div>
          </div>
          <div>
            <div className="ph-label mb-1.5 text-[0.53rem] text-paper/45">
              Sat – Sun
            </div>
            <div className="ph-num font-franklin text-[0.95rem]">12 – 8 pm</div>
          </div>
        </div>
      </PageHeader>

      {/* On tap */}
      <section className="bg-paper">
        <div className="ph-gutter py-12">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Eyebrow className="text-brick" stars={false}>
              On tap
            </Eyebrow>
            <span className="h-px flex-grow bg-ink/15" />
            <span className="ph-label text-prose-faint">
              Updated <Tbc>daily / weekly</Tbc>
            </span>
          </div>
          <h2 className="ph-slab mb-5 text-[1.9rem] leading-none">
            On tap today
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {onTap.map((slug) => {
              const cider = getCider(slug);
              if (!cider) return null;
              return (
                <div
                  key={slug}
                  style={{ backgroundColor: cider.tileColor }}
                  className="px-6 py-5 text-paper-light"
                >
                  <div className="ph-slab mb-3 text-[1.2rem] leading-tight">
                    {cider.name}
                  </div>
                  <div className="flex gap-5 border-t border-paper-light/25 pt-3">
                    <div>
                      <div className="ph-label text-[0.5rem] text-paper-light/55">
                        ABV
                      </div>
                      <div className="ph-num mt-1 text-[0.88rem] font-semibold">
                        {cider.abv}%
                      </div>
                    </div>
                    <div>
                      <div className="ph-label text-[0.5rem] text-paper-light/55">
                        Sweetness
                      </div>
                      <div className="mt-1 text-[0.88rem] font-semibold">
                        {sweetnessLabel(cider.sweetness)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Taproom-only pours. Real taprooms have these; this one's
                are unknown. */}
            {["Cask", "Pilot batch"].map((name) => (
              <div
                key={name}
                className="border-2 border-dashed border-ink/30 px-6 py-5"
              >
                <div className="ph-slab mb-3 text-[1.2rem] leading-tight text-prose-faint">
                  <Tbc>{name}</Tbc>
                </div>
                <p className="font-franklin text-[0.85rem] font-light leading-relaxed text-prose-muted">
                  Taproom-only pours that never get canned. Confirm whether
                  these exist.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="border-t-2 border-ink/15 bg-paper-dark">
        <div className="ph-gutter grid gap-10 py-12 lg:grid-cols-[7fr_4fr]">
          <div>
            <Eyebrow className="mb-3 block text-brick" stars={false}>
              Before you visit
            </Eyebrow>
            <h2 className="ph-slab mb-5 text-[1.9rem] leading-none">
              What to expect
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {expectations.map((item) => (
                <div key={item.title} className="border-t-2 border-ink pt-3.5">
                  <div className="ph-slab mb-1.5 text-[1.05rem] leading-tight">
                    {item.title}
                  </div>
                  <p className="font-franklin text-[0.85rem] font-light leading-relaxed text-prose-muted">
                    <Tbc>{item.copy}</Tbc>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow className="mb-3 block text-brick" stars={false}>
              Opening hours
            </Eyebrow>
            <dl className="border-t-2 border-ink">
              {hours.map((row) => (
                <div
                  key={row.day}
                  className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3"
                >
                  <dt className="font-franklin text-[0.92rem] text-ink">
                    {row.day}
                  </dt>
                  <dd
                    className={
                      row.time
                        ? "ph-num font-franklin text-[0.92rem] font-semibold"
                        : "ph-label text-[0.56rem] text-prose-faint"
                    }
                  >
                    {row.time ?? "Closed"}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-franklin text-[0.8rem] leading-relaxed text-prose-muted">
              Hours are drafted. Confirm before this page is linked from
              anywhere.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="ph-label mt-4 inline-flex items-center gap-2 border-2 border-ink px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      <LocatorBand />
    </>
  );
}

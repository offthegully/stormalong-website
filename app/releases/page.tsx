import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCider, sweetnessLabel } from "@/lib/catalogue";
import { clubFacts, releases, seriesDescription } from "@/data/releases";
import type { Release } from "@/data/releases";
import { LocatorBand } from "@/components/press-house/locator-band";
import { NewsletterForm } from "@/components/press-house/newsletter-form";
import { PageHeader } from "@/components/press-house/page-header";
import { routes } from "@/components/press-house/site-config";
import { Eyebrow } from "@/components/press-house/ui";

export const metadata: Metadata = {
  title: "Rare Apple Series",
  description:
    "Small batch ciders made with rare and American heirloom apples. What is pouring now, what is coming next, and what has already sold out.",
};

const statusStyles = {
  pouring: "border-gold bg-gold text-ink",
  next: "border-ink text-ink",
  gone: "border-ink/25 text-prose-faint",
} as const;

const statusLabels = {
  pouring: "Pouring now",
  next: "Next up",
  gone: "Gone",
} as const;

export default function ReleasesPage() {
  // Two lists, two directions. The archive reads backwards from the
  // most recent, which is what an archive is for. What is current reads
  // FORWARDS, nearest first, so the cider actually on shelves leads and
  // the ones you cannot buy yet follow it. Sorting both descending put
  // "Pouring now" third, behind two months that have not happened.
  const byDate = [...releases].sort((a, b) => a.date.localeCompare(b.date));
  const current = byDate.filter((r) => r.status !== "gone");
  const archive = byDate.filter((r) => r.status === "gone").reverse();

  return (
    <>
      <PageHeader
        eyebrow="In the vault"
        title="Rare Apple Series"
        intro="Small batch ciders made with some of our favorite rare apples. What is out now, what is coming next, and what has already sold out."
      >
        <Link
          href={routes.club}
          className="ph-press ph-label mt-6 inline-flex items-center gap-2 border-2 border-gold px-6 py-3.5 text-gold hover:bg-gold hover:text-ink"
        >
          Club members get first access →
        </Link>
      </PageHeader>

      <section className="bg-paper">
        <div className="ph-gutter py-12">
          <div className="mb-5 flex items-center gap-4">
            <h2 className="ph-label whitespace-nowrap text-brick">
              Out now and next
            </h2>
            <span className="h-px flex-grow bg-ink/15" />
          </div>
          <div className="flex flex-col gap-4">
            {current.map((release) => (
              <ReleaseRow key={release.slug} release={release} />
            ))}
          </div>

          {archive.length > 0 && (
            <>
              {/* A real heading, not an eyebrow. With only styled text
                  here the sold-out archive was structurally
                  indistinguishable from what is pouring now. */}
              <div className="mb-5 mt-12 flex items-center gap-4">
                <h2 className="ph-label whitespace-nowrap text-brick">
                  The archive
                </h2>
                <span className="h-px flex-grow bg-ink/15" />
              </div>
              <div className="flex flex-col gap-4">
                {archive.map((release) => (
                  <ReleaseRow key={release.slug} release={release} />
                ))}
              </div>
            </>
          )}

        </div>
      </section>

      {/* Why they are rare */}
      <section className="border-t-2 border-ink/15 bg-paper-dark">
        <div className="ph-gutter grid gap-10 py-12 lg:grid-cols-[6fr_5fr]">
          <div>
            <Eyebrow className="mb-3 block text-brick" stars={false}>
              About the series
            </Eyebrow>
            <h2 className="ph-slab mb-4 text-[1.9rem] leading-none">
              Why they are rare
            </h2>
            <p className="max-w-[64ch] font-franklin text-[0.97rem] font-light leading-relaxed text-prose">
              {seriesDescription}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* A fact nobody has confirmed is left off rather than
                shown as a blank to fill in. */}
            {clubFacts.filter((fact) => fact.confirmed).map((fact) => (
              <div
                key={fact.label}
                className="ph-tint group flex gap-5 border-t-2 border-ink pt-4 hover:border-brick"
              >
                <div className="w-[68px] shrink-0">
                  <div className="ph-figure ph-slab ph-num origin-left text-[1.7rem] leading-none group-hover:scale-110 group-hover:text-brick">
                    {fact.figure}
                  </div>
                  <div className="ph-label mt-1.5 text-[0.53rem] text-prose-faint">
                    {fact.label}
                  </div>
                </div>
                <p className="font-franklin text-[0.88rem] font-light leading-relaxed text-prose">
                  {fact.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First dibs */}
      <section className="ph-rule-gold border-b-0 border-t-4 bg-ink text-paper">
        <div className="ph-gutter flex flex-col items-start justify-between gap-7 py-11 md:flex-row md:items-center">
          <div>
            <Eyebrow className="mb-3 block">First dibs</Eyebrow>
            <h2 className="ph-slab mb-2.5 text-[1.9rem] leading-none">
              First dibs go to club members
            </h2>
            <p className="max-w-[58ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/80">
              Club members get first access to new releases and limited small
              batch ciders before we release them to the public.
            </p>
          </div>
          <div className="w-full max-w-[340px] shrink-0">
            <NewsletterForm />
            <Link
              href={routes.club}
              className="ph-press ph-label mt-3 inline-block text-gold underline-offset-4 hover:underline"
            >
              Or join the club →
            </Link>
          </div>
        </div>
      </section>

      <LocatorBand />
    </>
  );
}

function ReleaseRow({ release }: { release: Release }) {
  const cider = getCider(release.slug);
  if (!cider) return null;

  const gone = release.status === "gone";
  const month = new Date(release.date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <article
      className={cn(
        "ph-tint group grid gap-6 border-2 border-ink/20 bg-paper-light px-6 py-6 hover:border-ink/50 sm:grid-cols-[110px_1fr_auto] sm:items-center",
        // A sold-out release is dimmed so the current ones read first,
        // but it comes back to full strength under the pointer — the
        // archive is still worth reading, just not first.
        gone && "opacity-70 hover:opacity-100",
      )}
    >
      {/* Date + status */}
      <div>
        <div className="ph-label ph-num text-[0.59rem] text-prose-faint">
          {month.toUpperCase()}
        </div>
        <div
          className={cn(
            "ph-label mt-2 inline-block border-2 px-3 py-1.5 text-[0.53rem]",
            statusStyles[release.status],
          )}
        >
          {statusLabels[release.status]}
        </div>
      </div>

      {/* The cider */}
      <div className="flex items-center gap-5">
        <Image
          src={cider.image}
          alt=""
          width={50}
          height={119}
          sizes="50px"
          className={cn(
            "ph-move h-[118px] w-auto object-contain group-hover:-translate-y-1.5 group-hover:rotate-2",
            gone && "grayscale group-hover:grayscale-0",
          )}
        />
        <div>
          {/* h3: each release sits under the "Out now and next" or
              "The archive" heading for its group, not beside it. */}
          <h3 className="ph-slab mb-1.5 text-[1.35rem] leading-tight">
            <Link
              href={`/ciders/${cider.slug}`}
              className="ph-press hover:text-brick"
            >
              {cider.name}
            </Link>
          </h3>
          <p className="mb-3 max-w-[54ch] font-franklin text-[0.88rem] font-light leading-relaxed text-prose">
            {cider.flavor}. {cider.tagline}.
          </p>
          <div className="flex flex-wrap gap-5">
            <Fact label="ABV" value={`${cider.abv}%`} />
            <Fact label="Sweetness" value={sweetnessLabel(cider.sweetness)} />
            {release.runSize && (
              <Fact label="Run size" value={release.runSize} />
            )}
          </div>
        </div>
      </div>

      <div className="ph-label text-[0.59rem] text-prose-muted sm:text-right">
        {release.note}
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="ph-label text-[0.5rem] text-prose-faint">{label}</div>
      <div className="ph-num mt-1 text-[0.88rem] font-semibold">{value}</div>
    </div>
  );
}

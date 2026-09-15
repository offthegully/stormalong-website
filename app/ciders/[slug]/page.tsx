import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allCiderSlugs,
  appleVarieties,
  awardsFor,
  ciderNeighbours,
  getCider,
  groupLabels,
  sweetnessLabel,
  type AwardRecord,
} from "@/lib/catalogue";
import { ciderPhotos } from "@/lib/cider-photos";
import { CiderBadges, HouseClaims } from "@/components/press-house/cider-badges";
import { LocatorBand } from "@/components/press-house/locator-band";
import { MedalSeal } from "@/components/press-house/medal-seal";
import { PhotoSpread } from "@/components/press-house/photo-spread";
import { SweetnessStrip } from "@/components/press-house/sweetness-strip";
import { PinIcon } from "@/components/press-house/icons";
import { routes } from "@/components/press-house/site-config";
import { PhButton, SectionRule, Spec, Tbc } from "@/components/press-house/ui";

/** Every cider in the data gets a page, shelf or not. */
export function generateStaticParams() {
  return allCiderSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cider = getCider(slug);
  if (!cider) return { title: "Cider not found" };
  return {
    title: cider.name,
    description: cider.tagline,
    openGraph: {
      title: `${cider.name} | Stormalong Cider`,
      description: cider.tagline,
      images: [{ url: cider.image }],
    },
  };
}

/* ------------------------------------------------------------------ */

/** Gold, silver, bronze, or cream for everything that is none of them. */
function medalTone(medal: string): string {
  const m = medal.toLowerCase();
  if (m.includes("gold") || m === "best of class") return "text-gold";
  if (m.includes("silver")) return "text-[#B9BCC2]";
  if (m.includes("bronze")) return "text-[#B07B4A]";
  return "text-paper/70";
}

/**
 * "Two golds, three silvers and one bronze across four competitions
 * since 2015" — counted, not typed out, so it cannot drift from the
 * data the way the artboard's own tally did.
 */
function medalSummary(records: AwardRecord[]): string {
  const counts = new Map<string, number>();
  for (const record of records) {
    counts.set(record.medal, (counts.get(record.medal) ?? 0) + 1);
  }
  const words = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
  const say = (n: number) => words[n - 1] ?? String(n);
  // Gold, silver and bronze are common nouns and pluralise. "Best of
  // Class", "Judge's Pick" and "Winner" are names and do neither.
  const common = ["gold", "silver", "bronze", "double gold"];
  const parts = [...counts.entries()].map(([medal, n]) => {
    if (!common.includes(medal.toLowerCase())) {
      return `${say(n)} ${medal}${n === 1 ? "" : " awards"}`;
    }
    const word = medal.toLowerCase();
    return `${say(n)} ${n === 1 ? word : `${word}s`}`;
  });
  const list =
    parts.length > 1
      ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`
      : parts[0];

  const years = records
    .map((r) => r.year)
    .filter((y): y is number => y !== undefined);
  const since = years.length ? ` since ${Math.min(...years)}` : "";
  return `${list.charAt(0).toUpperCase()}${list.slice(1)}${since}.`;
}

/* ------------------------------------------------------------------ */

export default async function CiderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cider = getCider(slug);
  if (!cider) notFound();

  const medals = awardsFor(slug);
  const { prev, next } = ciderNeighbours(slug);
  // A provisional record's `apples` is a placeholder read off the live
  // site, not a blend on file — so it is not presented as one.
  const varieties = cider.provisional ? [] : appleVarieties(cider.apples);
  const isRare = cider.features.includes("rare-apple-series");
  const photos = ciderPhotos(slug);

  return (
    <>
      {/* Breadcrumb and running order ------------------------------- */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-ink/12 bg-paper-dark"
      >
        <div className="ph-gutter flex items-center justify-between gap-6 py-3">
          <ol className="ph-label flex items-center gap-2.5 text-[0.5rem] text-prose-faint">
            <li>
              <Link href={routes.ciders} className="hover:text-brick">
                Ciders
              </Link>
            </li>
            <li aria-hidden="true">&rsaquo;</li>
            <li className="text-ink">{cider.name}</li>
          </ol>
          {(prev || next) && (
            <div className="ph-label hidden items-center gap-5 text-[0.5rem] text-brick md:flex">
              {prev && (
                <Link
                  href={`/ciders/${prev.slug}`}
                  className="hover:text-brick-dark"
                >
                  &larr; {prev.name}
                </Link>
              )}
              {prev && next && <span className="h-3 w-px bg-ink/20" />}
              {next && (
                <Link
                  href={`/ciders/${next.slug}`}
                  className="hover:text-brick-dark"
                >
                  {next.name} &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero -------------------------------------------------------- */}
      <section className="grid lg:grid-cols-12">
        <div
          style={{ backgroundColor: cider.tileColor }}
          className="relative flex items-center justify-center px-8 py-12 lg:col-span-5 lg:py-16"
        >
          <span className="ph-label absolute left-5 top-5 border border-paper/55 px-3 py-1.5 text-[0.5rem] text-paper">
            {groupLabels[cider.group]} &middot; {cider.availability}
          </span>
          <Image
            src={cider.image}
            alt={`A can of ${cider.name}`}
            width={300}
            height={700}
            priority
            className="h-[300px] w-auto object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)] sm:h-[390px]"
          />
        </div>

        <div className="bg-ink px-5 py-12 text-paper sm:px-8 lg:col-span-7 lg:px-14 lg:py-16">
          <div className="ph-label mb-3.5 text-gold">
            {groupLabels[cider.group]}
          </div>
          <h1 className="ph-slab text-[2.6rem] leading-[0.95] sm:text-[3.4rem]">
            {cider.name}
          </h1>
          <div className="my-5 h-[3px] w-44 bg-gold" />
          <p className="mb-4 max-w-[44ch] font-franklin text-lg font-light leading-snug">
            {cider.flavor}
          </p>
          <p className="mb-7 max-w-[56ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/75">
            {cider.description}
          </p>

          <div className="mb-7 grid grid-cols-2 gap-y-5 border-y border-paper/25 py-4 sm:grid-cols-4">
            <Spec
              label="ABV"
              value={
                cider.provisional ? <Tbc>{cider.abv}%</Tbc> : `${cider.abv}%`
              }
              onInk
            />
            <Spec
              label="Sweetness"
              value={
                cider.provisional ? (
                  <Tbc>{sweetnessLabel(cider.sweetness)}</Tbc>
                ) : (
                  sweetnessLabel(cider.sweetness)
                )
              }
              onInk
            />
            <Spec
              label="Apples"
              value={varieties.length > 0 ? varieties.length : <Tbc />}
              onInk
            />
            <Spec label="Available" value={cider.availability} onInk />
          </div>

          {cider.features.some((f) =>
            ["barrel", "rare-apple-series", "hibiscus", "passionfruit", "guava"].includes(f),
          ) && (
            <div className="mb-7 border-b border-paper/25 pb-7">
              <div className="ph-label mb-3.5 text-[0.53rem] text-paper/45">
                At a glance
              </div>
              <CiderBadges features={cider.features} />
            </div>
          )}

          <div className="mb-8">
            <SweetnessStrip
              value={cider.sweetness}
              provisional={cider.provisional}
            />
          </div>

          {/* Full width on a phone: the primary action should be a
              thumb-sized target, not a chip. */}
          <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
            <PhButton
              href={routes.locator}
              tone="gold"
              icon={<PinIcon size={15} />}
            >
              Find it near me
            </PhButton>
            <PhButton href={routes.ciders} tone="outline-gold">
              All the ciders
            </PhButton>
          </div>
        </div>
      </section>

      {/* Photography --------------------------------------------------
          Butted straight against the hero, no section furniture. The
          can has just been shown as a cutout on a flat colour; these
          are the same cider as a photograph, and the join between the
          two is the point. */}
      <PhotoSpread photos={photos} />

      {/* Medals ------------------------------------------------------ */}
      {medals.length > 0 && (
        <section className="border-t-4 border-double border-gold bg-ink-deep text-paper">
          <div className="ph-gutter grid gap-10 py-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="ph-label mb-3.5 text-gold">Awards</div>
              <div className="mb-3 flex items-baseline gap-2.5">
                <span className="ph-slab ph-num text-[3.4rem] leading-none text-gold">
                  {medals.length}
                </span>
                <span className="ph-slab text-xl">
                  {medals.length === 1 ? "MEDAL" : "MEDALS"}
                </span>
              </div>
              <div className="mb-4 h-[3px] w-28 bg-gold" />
              <p className="font-franklin text-[0.9rem] font-light leading-relaxed text-paper/75">
                {medalSummary(medals)}
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {medals.map((medal, index) => (
                <li
                  key={`${medal.competition}-${medal.year ?? index}-${medal.medal}`}
                  className="flex items-start gap-3.5 border border-paper/20 p-4"
                >
                  <MedalSeal
                    tone={medal.isBestOfClass ? "gold" : "cream"}
                    className={`h-[37px] w-[30px] shrink-0 ${medalTone(medal.medal)}`}
                  />
                  <div>
                    <div
                      className={`ph-label mb-1.5 text-[0.53rem] ${medalTone(medal.medal)}`}
                    >
                      {medal.medal}
                    </div>
                    <div className="font-franklin text-[0.85rem] font-medium leading-snug">
                      {medal.competition}
                    </div>
                    <div className="ph-label ph-num mt-1 text-[0.5rem] text-paper/45">
                      {medal.year ?? <Tbc>year</Tbc>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* The blend --------------------------------------------------- */}
      <section className="ph-gutter py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="ph-label mb-3 text-brick">What is in it</div>
            <h2 className="ph-slab mb-4 text-[1.9rem] leading-tight sm:text-[2.2rem]">
              {isRare
                ? "Made with heirloom apples, many of them rare"
                : `${varieties.length > 1 ? `${varieties.length} varieties` : "The blend"}, pressed and nothing else`}
            </h2>
            <p className="mb-5 max-w-[46ch] font-franklin text-[0.97rem] leading-relaxed text-prose">
              {isRare
                ? "The mission of our Rare Apple Series is to highlight the virtues of extraordinary heirloom apple varieties and their exquisite transformation into distinctive cider. We aim to increase awareness of the diversity of apple cultivars and show what the right apples can do."
                : "Every cider we make starts as whole apples pressed here in Sherborn. What changes from can to can is which apples, and in what proportion."}
            </p>
            <blockquote className="mb-7 border-l-[3px] border-gold pl-5">
              <p className="font-franklin text-[0.97rem] font-medium leading-relaxed">
                {cider.tagline}
              </p>
            </blockquote>
            <HouseClaims />
          </div>

          <div className="lg:col-span-7">
            <SectionRule
              eyebrow="The blend, in full"
              note={
                varieties.length > 0
                  ? `${varieties.length} ${varieties.length === 1 ? "variety" : "varieties"}`
                  : undefined
              }
            />
            {varieties.length > 0 ? (
              <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {varieties.map((variety, index) => (
                  <li
                    key={variety}
                    className="flex items-baseline gap-2.5 border-b border-ink/12 py-2.5 font-franklin text-[0.9rem]"
                  >
                    <span className="ph-label ph-num text-[0.5rem] text-gold-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {variety}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="font-franklin text-[0.95rem] text-prose-muted">
                <Tbc>blend not yet on file</Tbc>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Running order ----------------------------------------------- */}
      {(prev || next) && (
        <section className="border-t border-ink/12 bg-paper-dark">
          <div className="ph-gutter grid grid-cols-2 items-center gap-x-6 gap-y-7 py-8 md:grid-cols-[1fr_auto_1fr]">
            {prev ? (
              <Link
                href={`/ciders/${prev.slug}`}
                className="group flex items-center gap-4"
              >
                <Image
                  src={prev.image}
                  alt=""
                  width={40}
                  height={96}
                  className="h-16 w-auto object-contain"
                />
                <span>
                  <span className="ph-label block text-[0.5rem] text-prose-faint">
                    &larr; Previous
                  </span>
                  <span className="ph-slab block text-base group-hover:text-brick">
                    {prev.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}

            {/* Below md this drops to its own full-width row under the
                two ciders, rather than sitting between them and
                pushing them out of line. */}
            <Link
              href={routes.ciders}
              className="ph-label order-last col-span-2 justify-self-center border-2 border-ink px-6 py-3 text-[0.53rem] transition-colors hover:bg-ink hover:text-paper-light md:order-none md:col-span-1"
            >
              All the ciders
            </Link>

            {next ? (
              <Link
                href={`/ciders/${next.slug}`}
                className="group flex items-center justify-end gap-4 text-right"
              >
                <span>
                  <span className="ph-label block text-[0.5rem] text-prose-faint">
                    Next &rarr;
                  </span>
                  <span className="ph-slab block text-base group-hover:text-brick">
                    {next.name}
                  </span>
                </span>
                <Image
                  src={next.image}
                  alt=""
                  width={40}
                  height={96}
                  className="h-16 w-auto object-contain"
                />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      )}

      <LocatorBand />
    </>
  );
}

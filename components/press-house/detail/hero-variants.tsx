import Image from "next/image";
import {
  appleVarieties,
  groupLabels,
  sweetnessLabel,
} from "@/lib/catalogue";
import type { ShelfCider } from "@/types/cider";
import { CiderBadges } from "../cider-badges";
import { PinIcon } from "../icons";
import { routes } from "../site-config";
import { SweetnessStrip } from "../sweetness-strip";
import { PhButton, Spec, Tbc } from "../ui";

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

const BADGE_FEATURES = [
  "barrel",
  "rare-apple-series",
  "hibiscus",
  "passionfruit",
  "guava",
];

/** The ink information panel. Identical in every option — what is
 *  being compared is only what sits to the left of it. */
function InfoPanel({
  cider,
  className = "",
}: {
  cider: ShelfCider;
  className?: string;
}) {
  const varieties = cider.provisional ? [] : appleVarieties(cider.apples);

  return (
    <div
      className={`bg-ink px-5 py-12 text-paper sm:px-8 lg:px-14 lg:py-16 ${className}`}
    >
      <div className="ph-label mb-3.5 text-gold">{groupLabels[cider.group]}</div>
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
          value={cider.provisional ? <Tbc>{cider.abv}%</Tbc> : `${cider.abv}%`}
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

      {cider.features.some((f) => BADGE_FEATURES.includes(f)) && (
        <div className="mb-7 border-b border-paper/25 pb-7">
          <div className="ph-label mb-3.5 text-[0.53rem] text-paper/45">
            At a glance
          </div>
          <CiderBadges features={cider.features} />
        </div>
      )}

      <div className="mb-8">
        <SweetnessStrip value={cider.sweetness} provisional={cider.provisional} />
      </div>

      <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
        <PhButton href={routes.locator} tone="gold" icon={<PinIcon size={15} />}>
          Find it near me
        </PhButton>
        <PhButton href={routes.ciders} tone="outline-gold">
          All the ciders
        </PhButton>
      </div>
    </div>
  );
}

function GroupTag({
  cider,
  solid = false,
}: {
  cider: ShelfCider;
  solid?: boolean;
}) {
  return (
    <span
      style={solid ? { backgroundColor: cider.tileColor } : undefined}
      className={
        solid
          ? "ph-label absolute left-0 top-0 z-10 px-4 py-2.5 text-[0.5rem] text-paper-light"
          : "ph-label absolute left-5 top-5 z-10 border border-paper/55 px-3 py-1.5 text-[0.5rem] text-paper"
      }
    >
      {groupLabels[cider.group]} &middot; {cider.availability}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* A — colour panel and cutout can. What is on the site today.         */
/* ------------------------------------------------------------------ */

export function HeroCurrent({ cider }: { cider: ShelfCider }) {
  return (
    <section className="grid lg:grid-cols-12">
      <div
        style={{ backgroundColor: cider.tileColor }}
        className="relative flex items-center justify-center px-8 py-12 lg:col-span-5 lg:py-16"
      >
        <GroupTag cider={cider} />
        <Image
          src={cider.image}
          alt={`A can of ${cider.name}`}
          width={300}
          height={700}
          className="h-[300px] w-auto object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)] sm:h-[390px]"
        />
      </div>
      <InfoPanel cider={cider} className="lg:col-span-7" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B — the photograph takes the panel; the cutout goes.                */
/* ------------------------------------------------------------------ */

export function HeroPhoto({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  const lead = photos[0];
  if (!lead) return <HeroCurrent cider={cider} />;

  return (
    <section className="grid lg:grid-cols-12">
      <div className="relative min-h-[360px] lg:col-span-5 lg:min-h-[620px]">
        <Image
          src={lead}
          alt=""
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
          priority
        />
        <GroupTag cider={cider} solid />
      </div>
      <InfoPanel cider={cider} className="lg:col-span-7" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* C — photograph, colour plate and information, three blocks in a row.*/
/* ------------------------------------------------------------------ */

export function HeroTriptych({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  const lead = photos[0];
  if (!lead) return <HeroCurrent cider={cider} />;

  return (
    <section className="grid lg:grid-cols-12">
      <div className="grid sm:grid-cols-2 lg:col-span-6 lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[620px]">
          <Image
            src={lead}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
            priority
          />
          <GroupTag cider={cider} solid />
        </div>
        <div
          style={{ backgroundColor: cider.tileColor }}
          className="flex items-center justify-center px-6 py-12"
        >
          <Image
            src={cider.image}
            alt={`A can of ${cider.name}`}
            width={300}
            height={700}
            className="h-[240px] w-auto object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)] lg:h-[330px]"
          />
        </div>
      </div>
      <InfoPanel cider={cider} className="lg:col-span-6" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* D — colour panel and can, with the photographs immediately under.   */
/* ------------------------------------------------------------------ */

export function HeroWithStrip({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  return (
    <>
      <HeroCurrent cider={cider} />
      {photos.length > 0 && (
        <ul className="grid gap-px bg-ink/15 sm:grid-cols-3">
          {photos.slice(0, 3).map((photo) => (
            <li key={photo} className="relative aspect-[4/3]">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

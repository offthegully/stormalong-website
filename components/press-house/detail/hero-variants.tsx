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

/* ------------------------------------------------------------------ */
/* E — plate over photograph, stacked in the left column.              */
/* ------------------------------------------------------------------ */

/**
 * The compromise between C and D: photograph and can sit together at
 * the top, but stacked rather than side by side, so the information
 * column keeps its full seven columns and the two images are never
 * the same size — which is what stopped the eye in C, where the can
 * appeared once as a cutout and again inside the photograph.
 */
export function HeroStacked({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  const lead = photos[0];

  return (
    <section className="grid lg:grid-cols-12">
      <div className="flex flex-col lg:col-span-5">
        <div
          style={{ backgroundColor: cider.tileColor }}
          className="relative flex flex-grow items-center justify-center px-8 py-11"
        >
          <GroupTag cider={cider} />
          <Image
            src={cider.image}
            alt={`A can of ${cider.name}`}
            width={300}
            height={700}
            className="h-[250px] w-auto object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.5)] lg:h-[330px]"
          />
        </div>
        {lead && (
          <div className="relative h-[190px] shrink-0 lg:h-[230px]">
            <Image
              src={lead}
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
      <InfoPanel cider={cider} className="lg:col-span-7" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* F — a wide photograph above the hero.                               */
/* ------------------------------------------------------------------ */

/**
 * The photograph leads and the hero is untouched beneath it. Costs
 * nothing in width and nothing in legibility; it costs height, which
 * pushes the specs further down.
 */
export function HeroBanner({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  const lead = photos[0];

  return (
    <>
      {lead && (
        <div className="relative h-[240px] sm:h-[320px] lg:h-[420px]">
          <Image
            src={lead}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}
      <HeroCurrent cider={cider} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* G — hero, then one large photograph and two small.                  */
/* ------------------------------------------------------------------ */

/**
 * D, but the strip is not three equal panes. One shot leads at twice
 * the size and the other two stack beside it, which reads as a
 * composed spread rather than a row of thumbnails.
 */
export function HeroWithSpread({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  const [lead, ...rest] = photos;

  return (
    <>
      <HeroCurrent cider={cider} />
      {lead && (
        <ul className="grid gap-px bg-ink/15 sm:h-[420px] sm:grid-cols-3 sm:grid-rows-2">
          <li className="relative aspect-[16/10] sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <Image
              src={lead}
              alt=""
              fill
              sizes="(min-width: 640px) 67vw, 100vw"
              className="object-cover"
            />
          </li>
          {rest.slice(0, 2).map((photo) => (
            <li key={photo} className="relative aspect-[4/3] sm:aspect-auto">
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

/* ------------------------------------------------------------------ */
/* H — the cover. A different skeleton, not a rearrangement.           */
/* ------------------------------------------------------------------ */

/**
 * Every option from A to G is the same frame: a coloured block holding
 * the cutout can, an ink panel holding everything else, and the
 * photographs added somewhere around them. H throws that frame away.
 *
 * The photograph becomes the page and carries the name on a flat ink
 * plate — Press House furniture, so no gradient scrim, just a solid
 * block with the gold rule on top. The tile colour survives as a
 * dateline band rather than a fifth of the screen. And the information
 * stops being a panel and becomes an article: lede, body, and a rail
 * down the side where the cutout can appears at the size a product
 * sheet gives a pack shot, because the photograph above has already
 * shown the can at full size.
 *
 * The plate overlays the photograph from `sm` up. Below that it drops
 * underneath, because at phone width a plate deep enough to hold the
 * name would cover the middle of the shot, which is where the can is
 * in almost all of this photography.
 */
export function HeroCover({
  cider,
  photos,
}: {
  cider: ShelfCider;
  photos: string[];
}) {
  const [lead, ...rest] = photos;
  if (!lead) return <HeroCurrent cider={cider} />;

  const varieties = cider.provisional ? [] : appleVarieties(cider.apples);

  return (
    <>
      <section className="relative">
        <div className="relative h-[380px] sm:h-[520px] lg:h-[620px]">
          <Image
            src={lead}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="border-t-4 border-double border-gold bg-ink px-5 py-8 text-paper sm:absolute sm:bottom-0 sm:left-0 sm:max-w-[38rem] sm:px-10 sm:py-9 lg:max-w-[46rem] lg:px-14">
          <div className="ph-label mb-3 text-gold">
            {groupLabels[cider.group]} &middot; {cider.availability}
          </div>
          <h1 className="ph-slab text-[2.6rem] leading-[0.92] sm:text-[3.6rem] lg:text-[4.4rem]">
            {cider.name}
          </h1>
          <p className="mt-4 max-w-[34ch] font-franklin text-lg font-light leading-snug text-paper/85">
            {cider.flavor}
          </p>
        </div>
      </section>

      {/* The dateline. All four figures on one line, the way a masthead
          carries its volume and price. */}
      <div style={{ backgroundColor: cider.tileColor }}>
        <dl className="ph-gutter grid grid-cols-2 gap-x-6 gap-y-5 py-6 text-paper-light sm:grid-cols-4">
          {[
            ["ABV", cider.provisional ? <Tbc key="a">{cider.abv}%</Tbc> : `${cider.abv}%`],
            [
              "Sweetness",
              cider.provisional ? (
                <Tbc key="s">{sweetnessLabel(cider.sweetness)}</Tbc>
              ) : (
                sweetnessLabel(cider.sweetness)
              ),
            ],
            ["Apples", varieties.length > 0 ? varieties.length : <Tbc key="p" />],
            ["Available", cider.availability],
          ].map(([label, value]) => (
            <div key={String(label)}>
              <dt className="ph-label mb-1 text-[0.53rem] text-paper-light">
                {label}
              </dt>
              <dd className="ph-num text-[0.95rem] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The article. */}
      <section className="ph-gutter grid gap-x-14 gap-y-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <p className="max-w-[40ch] font-franklin text-[1.45rem] font-light leading-[1.3] text-ink sm:text-[1.7rem]">
            {cider.description}
          </p>
          {varieties.length > 0 && (
            <div className="mt-9 border-t border-ink/15 pt-6">
              <div className="ph-label mb-3.5 text-[0.53rem] text-prose-faint">
                Pressed from
              </div>
              <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
                {varieties.map((variety) => (
                  <li
                    key={variety}
                    className="ph-slab text-[1.05rem] leading-none text-ink"
                  >
                    {variety}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cider.features.some((f) => BADGE_FEATURES.includes(f)) && (
            <div className="mt-8 border-t border-ink/15 pt-6">
              <CiderBadges features={cider.features} />
            </div>
          )}
        </div>

        {/* The rail. The cutout at pack-shot size, not hero size. */}
        <aside className="lg:col-span-5">
          <div className="border-2 border-ink">
            <div
              style={{ backgroundColor: cider.tileColor }}
              className="flex items-center justify-center px-6 py-8"
            >
              <Image
                src={cider.image}
                alt={`A can of ${cider.name}`}
                width={300}
                height={700}
                className="h-[190px] w-auto object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)]"
              />
            </div>
            <div className="px-6 py-7">
              <SweetnessStrip
                value={cider.sweetness}
                provisional={cider.provisional}
                onInk={false}
              />
              <div className="mt-7 flex flex-col gap-3">
                <PhButton
                  href={routes.locator}
                  tone="brick"
                  icon={<PinIcon size={15} />}
                >
                  Find it near me
                </PhButton>
                <PhButton href={routes.ciders} tone="outline">
                  All the ciders
                </PhButton>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {rest.length > 0 && (
        <ul className="grid gap-px bg-ink/15 sm:grid-cols-2">
          {rest.slice(0, 2).map((photo) => (
            <li key={photo} className="relative aspect-[4/3]">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

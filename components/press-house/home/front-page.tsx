import Image from "next/image";
import Link from "next/link";
import { getCider, sweetnessLabel } from "@/lib/catalogue";
import { ArrowRightIcon, PinIcon } from "../icons";
import { routes } from "../site-config";
import { SectionRule, Spec, Tbc } from "../ui";

/**
 * The front-page mosaic: one lead and three secondaries, all on screen
 * at once, none of it moving. It replaces the carousel the category
 * defaults to — a carousel shows one thing and hides three, and the
 * three it hides are the ones nobody sees.
 *
 * What is promoted here is editorial, so it lives in `lead` and
 * `secondaries` below rather than being derived. Specs are still read
 * from the catalogue so they cannot drift from the data.
 */

const lead = {
  slug: "kingston-black",
  badge: "Limited · Release No. 07",
  /** Kept in the config because it is a vintage, not the product name. */
  displayName: "Kingston Black",
  note: "Marzipan, sour cherry and bruised apple skin, with a long tannic finish. A single varietal, crash-cooled mid-ferment.",
  /** Unverified — the brand has never published a run size. */
  runSize: null as string | null,
};

const secondaries = [
  {
    href: "/ciders/farmstand-unfiltered",
    eyebrow: "Seasonal · at harvest",
    title: "Farmstand is pouring",
    copy: "Cloudy and tangy, pressed at harvest.",
    image: "/images/ciders/farmstand-unfiltered.png",
    ground: "bg-moss",
  },
  {
    href: routes.locator,
    eyebrow: "New format · MA and NH first",
    title: "Tall cans have landed",
    copy: "19.2 oz of the core line-up, wherever you already find us.",
    image: null,
    ground: "bg-wine",
    figure: { value: "19.2", unit: "oz" },
  },
  {
    href: routes.club,
    eyebrow: "First access",
    title: "The Rare Apple Club",
    copy: "Members get the vault releases before anyone else.",
    image: null,
    ground: "bg-brick",
  },
];

export function FrontPage() {
  const cider = getCider(lead.slug);

  return (
    <section className="bg-ink text-paper">
      <div className="ph-gutter py-8 lg:py-9">
        <SectionRule
          eyebrow="This month"
          note="New release, new format, and the vault"
          onInk
        />

        <div className="grid gap-5 lg:grid-cols-[7fr_5fr]">
          {/* Lead */}
          <article className="flex flex-col items-center gap-8 border-2 border-gold bg-wine px-8 py-9 sm:flex-row lg:min-h-[430px] lg:px-10">
            <div className="flex-grow">
              <div className="mb-5 inline-block border-2 border-gold px-3 py-1.5">
                <span className="ph-label text-[0.59rem] text-gold">
                  ★ {lead.badge} ★
                </span>
              </div>
              {/* h2, not h1 — see the note on the sr-only h1 in
                  app/page.tsx. Unchanged visually. */}
              <h2 className="ph-slab mb-4 text-[2.6rem] leading-[0.95] sm:text-[3.5rem]">
                {lead.displayName}
              </h2>
              <div className="mb-5 h-[3px] w-[170px] bg-gold" />
              <p className="mb-4 max-w-[40ch] font-franklin text-[1.03rem] font-light leading-relaxed text-paper/85">
                {lead.note}
              </p>

              <div className="mb-5 flex flex-wrap gap-5 border-y border-paper/20 py-3">
                <Spec label="ABV" value={`${cider?.abv ?? "—"}%`} onInk />
                <Spec
                  label="Sweetness"
                  value={cider ? sweetnessLabel(cider.sweetness) : "—"}
                  onInk
                />
                <Spec
                  label="This year's run"
                  value={lead.runSize ?? <Tbc>run size</Tbc>}
                  onInk
                />
              </div>

              <Link
                href={routes.locator}
                className="ph-lift ph-label inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-ink hover:bg-gold-pale hover:shadow-[0_12px_26px_rgba(0,0,0,0.5)]"
              >
                <PinIcon size={14} />
                Find it near me
              </Link>
            </div>

            {/* The can breathes. It is the only thing on the page that
                moves without being asked, and it is deliberately a
                photograph rather than any piece of text — six seconds
                a cycle, ten pixels of travel, beside the copy and
                never in it. `ph-float` is the hook the reduced-motion
                block uses to stop it outright. */}
            <Image
              src="/images/ciders/kingston-black.png"
              alt={`${lead.displayName} can`}
              width={210}
              height={500}
              sizes="(min-width: 1024px) 165px, (min-width: 640px) 140px, 105px"
              priority
              className="ph-float h-[240px] w-auto shrink-0 animate-float object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.5)] sm:h-[330px] lg:h-[390px]"
            />
          </article>

          {/* Three secondaries */}
          <div className="flex flex-col gap-5">
            {secondaries.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`ph-lift group flex flex-grow items-center gap-5 border-2 border-paper/30 px-6 py-5 hover:border-gold hover:shadow-[0_14px_30px_rgba(0,0,0,0.5)] ${item.ground}`}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    width={70}
                    height={167}
                    sizes="48px"
                    className="ph-move h-[116px] w-auto shrink-0 object-contain group-hover:-translate-y-1.5 group-hover:rotate-[-4deg] group-focus-visible:-translate-y-1.5 group-focus-visible:rotate-[-4deg]"
                  />
                )}
                {item.figure && (
                  <div className="shrink-0 text-center">
                    <div className="ph-move ph-slab ph-num text-[2.4rem] leading-none text-gold group-hover:scale-110 group-focus-visible:scale-110">
                      {item.figure.value}
                    </div>
                    <div className="ph-label mt-1 text-[0.56rem] text-paper/70">
                      {item.figure.unit}
                    </div>
                  </div>
                )}
                <div>
                  <div className="ph-label mb-2 text-[0.56rem] text-gold">
                    {item.eyebrow}
                  </div>
                  <div className="ph-slab mb-1.5 text-[1.35rem] leading-tight">
                    {item.title}
                  </div>
                  <div className="font-franklin text-[0.85rem] font-light leading-snug text-paper/80">
                    {item.copy}
                  </div>
                </div>
                {/* The arrow both fades and travels: on a tile this
                    wide, opacity alone is easy to miss at the far
                    right of the card. */}
                <ArrowRightIcon
                  size={18}
                  className="ph-reveal ml-auto hidden shrink-0 -translate-x-1 text-gold opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  featuredAwards,
  medalsByCompetition,
  trophyCase,
} from "@/lib/catalogue";
import { MedalSeal } from "../medal-seal";
import { Eyebrow } from "../ui";
import { routes } from "../site-config";

/**
 * Every figure in this band is counted from the awards already in the
 * data, never typed in. The artboard hardcoded "Two Best of Class"
 * and was one short of the truth — see canvas review, finding 02.
 */
export function TrophyCase() {
  const bestOfClassCount = trophyCase.bestOfClass.length;

  return (
    <section
      id="awards"
      className="border-t border-gold/30 bg-ink-deep text-paper"
    >
      <div className="ph-gutter grid gap-10 py-11 lg:grid-cols-[4fr_8fr] lg:items-center lg:gap-14">
        {/* The number */}
        <div>
          <Eyebrow className="mb-3.5 block text-brick">The trophy case</Eyebrow>
          <div className="mb-2.5 flex items-baseline gap-3.5">
            <span className="ph-slab ph-num text-[5.25rem] leading-[0.85] text-gold">
              {trophyCase.total}
            </span>
            <span className="ph-slab text-3xl leading-none">Medals</span>
          </div>
          <div className="mb-4 h-[3px] w-[140px] bg-gold" />
          <p className="mb-5 max-w-[42ch] font-franklin text-[0.97rem] font-light leading-relaxed text-paper/75">
            {/* Not "every year since 2015" — the awards in the data skip
                2018 and 2020, and the tally below this paragraph prints
                the real range. A claim a reader can falsify by looking
                six inches down the page is not worth making. */}
            Across {trophyCase.ciders} ciders and {trophyCase.competitions}{" "}
            competitions, from {trophyCase.firstYear} to {trophyCase.lastYear}.{" "}
            {bestOfClassCount === 1
              ? "One Best of Class."
              : `${capitalise(numberWord(bestOfClassCount))} Best of Class.`}
          </p>
          <Link
            href={`${routes.ciders}#awards`}
            className="ph-lift ph-label inline-block border-2 border-gold px-6 py-3.5 text-gold hover:bg-gold hover:text-ink hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
          >
            See every medal
          </Link>
        </div>

        {/* The seals */}
        <div>
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredAwards.map((award) => {
              const gold = award.isBestOfClass;
              return (
                <Link
                  key={`${award.slug}-${award.competition}-${award.year ?? "n"}`}
                  href={`/ciders/${award.slug}`}
                  className={cn(
                    "ph-lift group block border-2 px-4 py-5 text-center",
                    gold
                      ? "border-gold bg-gold/[0.06] text-gold hover:bg-gold/[0.14]"
                      : "border-paper/35 text-paper hover:border-gold hover:bg-paper/[0.06]",
                    "hover:shadow-[0_14px_30px_rgba(0,0,0,0.5)]",
                  )}
                >
                  <MedalSeal
                    tone={gold ? "gold" : "cream"}
                    className="mx-auto mb-2.5"
                  />
                  <div
                    className={cn(
                      "ph-label mb-1.5 text-[0.53rem]",
                      gold ? "text-gold" : "text-paper/70",
                    )}
                  >
                    {award.medal}
                  </div>
                  <div className="ph-slab mb-1.5 text-sm leading-tight text-paper">
                    {award.ciderName}
                  </div>
                  {/* Kingston Black's Best of Class carries no year; the
                      live site omits it too. Until someone finds it, the
                      line simply ends at the competition. */}
                  <div className="font-franklin text-[0.72rem] leading-snug text-paper/60">
                    {award.competition}
                    {award.year && `, ${award.year}`}
                  </div>
                  {/* The line's space is held open at rest rather than
                      grown on hover. Animating its height and margin
                      made the hovered card taller, and since a grid row
                      is as tall as its tallest cell, the other three
                      seals and everything below them stepped down with
                      it — a reflow every frame, which is both the jerk
                      and the shift. Only opacity and transform move
                      now, so the row is fixed and the reveal is a
                      compositor job. */}
                  <span className="ph-hint ph-label mt-2.5 block -translate-y-1 text-[0.5rem] text-gold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    See the cider &rarr;
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Tally */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/20 pt-5">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {medalsByCompetition.map(({ competition, count }) => (
                <div key={competition}>
                  <span className="ph-slab ph-num text-[1.35rem] text-gold">
                    {count}
                  </span>
                  <span className="ph-label ml-1.5 text-[0.56rem] text-paper/60">
                    {competition}
                  </span>
                </div>
              ))}
            </div>
            <span className="ph-label ph-num text-[0.56rem] text-paper/45">
              {trophyCase.firstYear} – {trophyCase.lastYear}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function numberWord(n: number): string {
  return WORDS[n] ?? String(n);
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

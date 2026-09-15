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
            Across {trophyCase.ciders} ciders and {trophyCase.competitions}{" "}
            competitions, every year since {trophyCase.firstYear}.{" "}
            {bestOfClassCount === 1
              ? "One Best of Class."
              : `${capitalise(numberWord(bestOfClassCount))} Best of Class.`}
          </p>
          <Link
            href={`${routes.ciders}#awards`}
            className="ph-label inline-block border-2 border-gold px-6 py-3.5 text-gold transition-colors hover:bg-gold hover:text-ink"
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
                <div
                  key={`${award.slug}-${award.competition}-${award.year ?? "n"}`}
                  className={cn(
                    "border-2 px-4 py-5 text-center",
                    gold
                      ? "border-gold bg-gold/[0.06] text-gold"
                      : "border-paper/35 text-paper",
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
                  <div className="font-franklin text-[0.72rem] leading-snug text-paper/60">
                    {award.competition}
                    {award.year ? `, ${award.year}` : ""}
                  </div>
                </div>
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

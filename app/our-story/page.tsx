import type { Metadata } from "next";
import Image from "next/image";
import { shelf, trophyCase } from "@/lib/catalogue";
import { LocatorBand } from "@/components/press-house/locator-band";
import { routes } from "@/components/press-house/site-config";
import { Eyebrow, PhButton, SectionRule } from "@/components/press-house/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Stormalong Cider was founded in 2014 in Sherborn, Massachusetts — once home to the largest refined cider mill in the world.",
};

/**
 * Every paragraph here is the live copy from stormalong.com/our-story
 * and the "We respect the apple" block on the home page, word for
 * word. What changed is the arrangement: the live page runs this
 * centred over a patterned ground, which is hard to read at length.
 * Here it is left aligned in two columns with "We respect the apple"
 * pulled out as the heading it already was. See canvas review,
 * finding 07.
 *
 * The three figures under "The right apples" are counted from the
 * catalogue rather than typed in, so they cannot drift.
 */
const respect = [
  "At Stormalong, we're committed to quality and taste. Since our founding, we have always set out to make delicious cider with the highest quality, whole ingredients we can find.",
  "All of our ciders are made with 100% real, whole, carefully sourced local apples which are freshly pressed and fermented with care. We never use concentrates, artificial ingredients, or chemically concocted 'natural' flavors and our ciders are all naturally gluten-free.",
  "We don't cut corners. We respect the apple, the ingredients, and the process.",
];

const founding = [
  "Stormalong Cider was founded in 2014 by Shannon Edgar with the desire to showcase the virtues of cider made with the right apples. Cider is a complex and nuanced beverage, and apple selection and blends are paramount.",
  "We treat cider making as an artistic endeavor, a renaissance of sorts. Using a blend of culinary and rare heirloom varieties, we ferment and age our ciders with traditional and modern techniques showcasing the unique characteristics of these diverse apples.",
];

const mill = [
  "In the late 1800's, the largest refined cider mill in the world was located in Sherborn, MA, exporting a “champagne cider” to England, and other places abroad. Around that time there were some 40 orchards in the town and the owner of the cider mill, Jonathan Holbrook, convinced the Framingham & Mansfield railroad to align their track through Sherborn with his cider mill. The first freight train into the town was loaded with apples headed to Holbrook's mill.",
  "With such a rich history of cider making in the Northeast, it is hard to fathom how this tradition has virtually disappeared. At Stormalong, we are both fascinated and inspired by this robust hard cider lineage, and with the legacy of cider here in Sherborn, MA, it felt like an ideal place to help reignite this tradition.",
];

const captain = [
  "In a semi-forgotten slice of history, we were inspired by the tall-tale of Captain Alfred Bulltop Stormalong, described as a larger-than-life figure, epically tall, originating out of New England and heralded as the greatest deep-water sailor to have ever lived.",
  "The giant “Stormy” was innovative, excelled at his craft and broke down barriers. Literally. He was said to have drilled the course of the Panama Canal. Like Captain Stormalong, we are always pushing the boundaries, learning, growing, and furthering our craft. We hope you'll join us and make it a celebration.",
];

const thenAndNow = [
  { figure: "40", copy: "Orchards in the town around 1900" },
  { figure: "1880–1930", copy: "The mill's working life" },
  { figure: "2014", copy: "Cider made in Sherborn again" },
];

export default function OurStoryPage() {
  const figures = [
    { value: "2014", label: "Founded" },
    { value: String(shelf.length), label: "Ciders" },
    {
      value: String(trophyCase.total),
      label: `Medals since ${trophyCase.firstYear}`,
    },
  ];

  return (
    <>
      {/* Lead --------------------------------------------------------- */}
      <section className="ph-rule-gold border-b-4 border-t-0 bg-ink text-paper">
        <div className="ph-gutter py-16 text-center sm:py-20">
          <Eyebrow className="mb-5 block">Sherborn, Mass. &middot; Est. 2014</Eyebrow>
          <h1 className="ph-slab text-[3.2rem] leading-[0.9] sm:text-[5.5rem]">
            True Cider
          </h1>
          <p className="mx-auto mt-6 max-w-[48ch] font-franklin text-base font-light leading-relaxed text-paper/75">
            Whole apples, pressed here, fermented slowly. Everything else on
            this page follows from that.
          </p>
        </div>
      </section>

      {/* We respect the apple ----------------------------------------- */}
      <section className="ph-gutter py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/images/our-story/anchor-apple.png"
              alt=""
              width={800}
              height={800}
              className="mb-7 h-24 w-24"
            />
            <h2 className="ph-slab text-[2.1rem] leading-[0.98] sm:text-[2.6rem]">
              We respect
              <br />
              the apple.
            </h2>
            <div className="mt-5 h-[3px] w-32 bg-gold" />
          </div>
          <div className="lg:col-span-7">
            {respect.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === respect.length - 1
                    ? "max-w-[62ch] border-l-[3px] border-gold pl-5 font-franklin text-[1.05rem] font-medium leading-relaxed"
                    : "mb-5 max-w-[62ch] font-franklin text-[0.98rem] leading-relaxed text-prose"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* How we started ------------------------------------------------ */}
      <section className="border-y border-ink/12 bg-paper-dark">
        <div className="ph-gutter grid items-center gap-12 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* Deliberately NOT stormalong-taproom.png: that file is an
                architect's proposed-elevation drawing ("PROPOSED PATIO
                PLAN", "NEW SIGNAGE", "OUTHOUSE TO RECEIVE NEW MURAL"),
                not a photograph of a building that exists. */}
            <Image
              src="/images/find-our-cider.jpg"
              alt="Two Stormalong ciders being poured"
              width={1000}
              height={1000}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <div className="ph-label mb-3 text-brick">How we started</div>
            <h2 className="ph-slab mb-5 text-[1.9rem] leading-tight sm:text-[2.3rem]">
              The right apples.
            </h2>
            {founding.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-5 max-w-[58ch] font-franklin text-[0.95rem] leading-relaxed text-prose"
              >
                {paragraph}
              </p>
            ))}
            <dl className="mt-7 grid grid-cols-3 gap-6 border-t border-ink/15 pt-6">
              {figures.map((figure) => (
                <div key={figure.label}>
                  <dt className="sr-only">{figure.label}</dt>
                  <dd>
                    <span className="ph-slab ph-num block text-[1.9rem] leading-none text-ink">
                      {figure.value}
                    </span>
                    <span className="ph-label mt-2 block text-[0.5rem] text-prose-muted">
                      {figure.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The mill ------------------------------------------------------ */}
      <section className="bg-ink text-paper">
        <div className="ph-gutter grid gap-12 py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="ph-label mb-3 text-gold">Sherborn, MA</div>
            <h2 className="ph-slab mb-5 text-[1.8rem] leading-[1.05] sm:text-[2.15rem]">
              Largest refined cider mill
              <br className="hidden sm:block" /> in the world, 1880 to 1930.
            </h2>
            {mill.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-5 max-w-[62ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/75"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="ph-frame-gold p-7">
              <Image
                src="/images/our-story/town-of-sherborn.png"
                alt="Seal of the Town of Sherborn, settled 1652"
                width={800}
                height={800}
                className="mb-6 h-20 w-20 opacity-90 [filter:brightness(0)_invert(1)]"
              />
              <Eyebrow className="mb-5 block">Then and now</Eyebrow>
              <dl>
                {thenAndNow.map((item) => (
                  <div
                    key={item.figure}
                    className="flex items-baseline gap-5 border-t border-paper/20 py-3.5 first:border-t-0 first:pt-0"
                  >
                    <dt className="ph-slab ph-num w-[5.5rem] shrink-0 text-[1.35rem] leading-none text-gold">
                      {item.figure}
                    </dt>
                    <dd className="font-franklin text-[0.88rem] font-light leading-snug text-paper/80">
                      {item.copy}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* The Captain --------------------------------------------------- */}
      <section className="ph-gutter py-14">
        <SectionRule
          eyebrow="Captain Alfred Bulltop Stormalong"
          note="The name on the can"
        />
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/our-story/captain-stormalong.png"
              alt="Captain Alfred Bulltop Stormalong"
              width={800}
              height={800}
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="mx-auto w-full max-w-[280px]"
            />
          </div>
          <div className="lg:col-span-8">
            <h2 className="ph-slab mb-5 text-[1.9rem] leading-tight sm:text-[2.3rem]">
              The &ldquo;Paul Bunyan&rdquo; of the sea.
            </h2>
            {captain.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-5 max-w-[62ch] font-franklin text-[0.95rem] leading-relaxed text-prose"
              >
                {paragraph}
              </p>
            ))}
            <PhButton href={routes.club} tone="brick" className="mt-2">
              Join the Rare Apple Club
            </PhButton>
          </div>
        </div>
      </section>

      <LocatorBand />
    </>
  );
}

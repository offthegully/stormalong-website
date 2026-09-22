import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  clubBenefits,
  clubHeadlines,
  clubIntro,
  clubTerms,
  joinUrl,
} from "@/data/club";
import { LocatorBand } from "@/components/press-house/locator-band";
import { NewsletterForm } from "@/components/press-house/newsletter-form";
import { site } from "@/components/press-house/site-config";
import { Eyebrow, PhButton, SectionRule } from "@/components/press-house/ui";

export const metadata: Metadata = {
  title: "The Rare Apple Club",
  description:
    "Twice a year we ship club members a variety of small batch ciders, released first — and sometimes only — to members.",
};

/**
 * Where "Join" goes. There is no membership checkout yet, so rather
 * than draw a signup form over nothing, the call to action opens an
 * email to the address the membership copy already uses for opting out
 * and updating details. Set `joinUrl` in `data/club.ts` when a real
 * signup exists and this switches to it.
 */
const joinHref =
  joinUrl ??
  `mailto:${site.email}?subject=${encodeURIComponent("Rare Apple Club membership")}&body=${encodeURIComponent(
    "I'd like to join the Rare Apple Club.\n\nName:\nShipping address:\n\nI am 21 or older and can sign for a delivery.",
  )}`;

export default function CiderClubPage() {
  return (
    <>
      {/* Lead --------------------------------------------------------- */}
      <section className="grid lg:grid-cols-12">
        <div className="bg-ink px-5 py-12 text-paper sm:px-8 lg:col-span-7 lg:px-14 lg:py-16">
          <Eyebrow className="mb-4 block">Member offerings</Eyebrow>
          <h1 className="ph-slab text-[2.7rem] leading-[0.95] sm:text-[3.6rem]">
            The Rare <br />
            Apple Club
          </h1>
          <div className="my-6 h-[3px] w-48 bg-gold" />
          <p className="mb-4 max-w-[46ch] font-franklin text-lg font-light leading-snug">
            {clubIntro[0]}
          </p>
          <p className="mb-4 max-w-[58ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/75">
            {clubIntro[1]}
          </p>
          <p className="mb-8 font-franklin text-[0.95rem] font-light leading-relaxed text-paper/75">
            {clubIntro[2]}
          </p>

          <dl className="mb-8 grid grid-cols-1 gap-y-5 border-y border-paper/25 py-5 sm:grid-cols-3">
            {clubHeadlines.map((headline) => (
              <div key={headline.label} className="group">
                <dt className="ph-label mb-1.5 text-[0.53rem] text-paper/45">
                  {headline.label}
                </dt>
                <dd className="ph-figure ph-slab ph-num origin-bottom-left text-[1.35rem] leading-none text-gold group-hover:scale-110">
                  {headline.value}
                </dd>
              </div>
            ))}
          </dl>

          <PhButton href={joinHref} tone="gold">
            Join the Rare Apple Club
          </PhButton>
          <p className="ph-label mt-4 text-[0.5rem] text-paper/50">
            You won't be billed until the shipment goes out.
          </p>
        </div>

        <div className="relative min-h-[280px] lg:col-span-5">
          <Image
            src="/images/cider-club/3-drinks-rare-apple.jpg"
            alt="Three Rare Apple Club ciders"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* What membership includes ------------------------------------- */}
      <section className="ph-gutter py-14">
        <SectionRule
          eyebrow="Membership includes"
          note="Four things, all year"
        />
        {/* Each benefit leads with its photograph. Four paragraphs on
            cream is what the four benefits used to be, and it read as
            a table of terms rather than as the reason to join — the
            photography is the argument. The cards keep the hairline
            grid and the square corners the shelf tiles use, so the
            band still belongs to the page.

            The photographs are decorative, same as on the cider pages:
            the heading and copy beside each one already carry what the
            benefit is, and an alt text repeating them would only be
            read out twice. */}
        <ol className="grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {clubBenefits.map((benefit) => (
            <li
              className="ph-tint group flex flex-col bg-paper hover:bg-paper-light"
              key={benefit.title}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={benefit.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h2 className="ph-tint ph-slab mb-3 text-[1.15rem] leading-tight group-hover:text-brick">
                  {benefit.title}
                </h2>
                <p className="font-franklin text-[0.9rem] leading-relaxed text-prose">
                  {benefit.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Subscription terms ------------------------------------------- */}
      <section className="ph-rule-gold border-b-0 border-t-4 bg-ink-deep text-paper">
        {/* Full bleed rather than gutter-bound, and the photograph on
            the left — the mirror of the lead at the top of the page,
            which runs type left and photograph right. Alternating the
            two gives the page a rhythm it did not have when this band
            was a column of type on flat ink. */}
        <div className="grid lg:grid-cols-12">
          {/* A portrait shot, so a tall column crops it barely at all.
              The rail stretches to whatever height the terms need. */}
          <div className="relative min-h-[300px] lg:col-span-4 lg:min-h-0">
            <Image
              src="/images/cider-details-images/ragtime-reserve-2.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
            {/* Carries the photograph into the ink instead of butting
                it against the type. The edge that needs softening is
                whichever one faces the terms, and that moves with the
                layout: the foot on a phone, where the rail sits above
                them, and the right flank once it sits beside them. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-deep to-transparent lg:hidden"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-ink-deep to-transparent lg:block"
            />
          </div>

          <div className="px-5 py-14 sm:px-8 lg:col-span-8 lg:px-14">
            {/* The heading holds the left edge the numbered terms
                below it sit on, and the crest takes the far end of
                the row — putting it beside the heading instead
                indented the heading off that edge by its own width,
                which read as a mistake. */}
            <div className="mb-10 flex flex-col-reverse items-start justify-between gap-x-10 gap-y-7 sm:flex-row sm:items-center">
              <div>
                <h2 className="ph-slab mb-3 text-[2rem] leading-none">
                  Subscriptions
                </h2>
                <div className="mb-4 h-[3px] w-28 bg-gold" />
                <p className="max-w-[38ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/75">
                  Four things worth knowing before you sign up.
                </p>
              </div>
              {/* The club's own crest, which the site owns and had
                  never put anywhere. Gold line work on a transparent
                  ground — this ink band is the one place on the page
                  it can sit without a box drawn around it. */}
              <Image
                src="/images/cider-club/rare-apple-club.png"
                alt=""
                width={1299}
                height={906}
                sizes="190px"
                className="h-auto w-[150px] shrink-0 sm:w-[190px]"
              />
            </div>
            <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {clubTerms.map((term) => (
                <li
                  key={term}
                  className="ph-tint border-t border-paper/20 pt-4 hover:border-gold/60"
                >
                  <p className="font-franklin text-[0.9rem] font-light leading-relaxed text-paper/80">
                    {term}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Join ---------------------------------------------------------- */}
      <section className="bg-brick text-paper">
        {/* Photograph on the right, the mirror of the Subscriptions band
            — and it stands in the field of empty brick this band used to
            end on. The newsletter column runs a good deal shorter than
            the join copy beside it, and with the locator band below
            sharing the same brick, the two ran together into one large
            red nothing. The rail closes it. */}
        <div className="grid lg:grid-cols-12">
          {/* The two blocks sit side by side only from `xl`, a step
              later than the rail beside them appears. Splitting them
              at `lg` as well left each one about 270px wide between
              1024 and 1280, which broke the heading over three lines
              and clipped the email field's placeholder. Between those
              widths they stack instead and use the whole column. */}
          <div className="grid gap-10 px-5 py-14 sm:px-8 lg:col-span-8 lg:py-16 lg:pl-14 lg:pr-12 xl:grid-cols-2 xl:gap-8">
            <div>
              <h2 className="ph-slab mb-4 text-[2.1rem] leading-[0.98] sm:text-[2.6rem]">
                Join our Rare <br />
                Apple Club
              </h2>
              <p className="mb-7 max-w-[52ch] font-franklin text-[0.97rem] font-light leading-relaxed text-paper/85">
                Members enjoy first access to new product releases and special
                events, as well as a permanent 15% discount on all orders and
                exclusive access to special small batch ciders offered only to
                our Rare Apple Club members.
              </p>
              <PhButton href={joinHref} tone="gold">
                Join the club
              </PhButton>
              <p className="mt-4 max-w-[46ch] font-franklin text-[0.82rem] font-light leading-relaxed text-paper/70">
                {joinUrl
                  ? "You won't be billed until the shipment goes out."
                  : "Membership opens by email while the online signup is being built — tell us where to ship and we'll take it from there."}
              </p>
            </div>

            <div className="border-t border-paper/25 pt-8 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
              <h3 className="ph-slab mb-2.5 text-[1.3rem] leading-tight">
                Not ready to commit?
              </h3>
              <p className="mb-5 max-w-[44ch] font-franklin text-[0.9rem] font-light leading-relaxed text-paper/80">
                The newsletter goes out when a release lands, club or not.
              </p>
              <NewsletterForm />
              <p className="mt-6 font-franklin text-[0.85rem] font-light text-paper/70">
                Questions about a membership already running? Email{" "}
                <Link
                  href={`mailto:${site.email}`}
                  className="ph-press underline underline-offset-4 hover:text-gold"
                >
                  {site.email}
                </Link>
                .
              </p>
            </div>
          </div>

          {/* A crate of rare apples — the thing the club is named for,
              and the one note the page was missing. Deep crimson rather
              than the brick's orange-red, so it separates from the
              ground it sits on instead of sinking into it. */}
          <div className="relative min-h-[300px] lg:col-span-4 lg:min-h-0">
            <Image
              src="/images/cider-details-images/kingston-black-1.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
            {/* Same two fades as the Subscriptions rail, mirrored —
                this rail takes the other side, so the edge facing the
                type is the head on a phone and the left flank on the
                wide layout. */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-brick to-transparent lg:hidden"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-brick to-transparent lg:block"
            />
            {/* And a third along the foot, at every width. The locator
                band underneath is brick as well, so the rail's bottom
                edge has no rule to land on — without this it reads as
                a photograph pasted over the ground rather than as part
                of it. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brick to-transparent lg:h-28"
            />
          </div>
        </div>
      </section>

      <LocatorBand />
    </>
  );
}

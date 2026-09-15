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
import { cidersInGroup } from "@/lib/catalogue";
import { CiderTile } from "@/components/press-house/cider-tile";
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
  const rare = cidersInGroup("rare");

  return (
    <>
      {/* Lead --------------------------------------------------------- */}
      <section className="grid lg:grid-cols-12">
        <div className="bg-ink px-5 py-12 text-paper sm:px-8 lg:col-span-7 lg:px-14 lg:py-16">
          <Eyebrow className="mb-4 block">Member offerings</Eyebrow>
          <h1 className="ph-slab text-[2.7rem] leading-[0.95] sm:text-[3.6rem]">
            The Rare
            <br />
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
              <div key={headline.label}>
                <dt className="ph-label mb-1.5 text-[0.53rem] text-paper/45">
                  {headline.label}
                </dt>
                <dd className="ph-slab ph-num text-[1.35rem] leading-none text-gold">
                  {headline.value}
                </dd>
              </div>
            ))}
          </dl>

          <PhButton href={joinHref} tone="gold">
            Join the Rare Apple Club
          </PhButton>
          <p className="ph-label mt-4 text-[0.5rem] text-paper/50">
            You won&rsquo;t be billed until the shipment goes out.
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
        <ol className="grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {clubBenefits.map((benefit) => (
            <li key={benefit.title} className="bg-paper p-6">
              <h2 className="ph-slab mb-3 text-[1.15rem] leading-tight">
                {benefit.title}
              </h2>
              <p className="font-franklin text-[0.9rem] leading-relaxed text-prose">
                {benefit.copy}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Subscription terms ------------------------------------------- */}
      <section className="ph-rule-gold border-b-0 border-t-4 bg-ink-deep text-paper">
        <div className="ph-gutter grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="ph-slab mb-3 text-[2rem] leading-none">
              Subscriptions
            </h2>
            <div className="mb-4 h-[3px] w-28 bg-gold" />
            <p className="max-w-[38ch] font-franklin text-[0.95rem] font-light leading-relaxed text-paper/75">
              Four things worth knowing before you sign up.
            </p>
          </div>
          <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {clubTerms.map((term, index) => (
              <li key={term} className="flex gap-4 border-t border-paper/20 pt-4">
                <span className="ph-label ph-num shrink-0 text-[0.6rem] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-franklin text-[0.9rem] font-light leading-relaxed text-paper/80">
                  {term}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What members drink ------------------------------------------- */}
      {rare.length > 0 && (
        <section className="ph-gutter py-14">
          <SectionRule
            eyebrow="What members drink"
            note={`${rare.length} in the series`}
          />
          <div className="grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {rare.map((cider) => (
              <CiderTile key={cider.slug} cider={cider} showGroupTag />
            ))}
          </div>
        </section>
      )}

      {/* Join ---------------------------------------------------------- */}
      <section className="bg-brick text-paper">
        <div className="ph-gutter grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="ph-slab mb-4 text-[2.1rem] leading-[0.98] sm:text-[2.6rem]">
              Join our Rare
              <br />
              Apple Club
            </h2>
            <p className="mb-7 max-w-[52ch] font-franklin text-[0.97rem] font-light leading-relaxed text-paper/85">
              Members enjoy first access to new product releases and special
              events, as well as a permanent 15% discount on all orders and
              exclusive access to special small batch ciders offered only to our
              Rare Apple Club members.
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

          <div className="border-t border-paper/25 pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
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
                className="underline underline-offset-4 hover:text-gold"
              >
                {site.email}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <LocatorBand />
    </>
  );
}

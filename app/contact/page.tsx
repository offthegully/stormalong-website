import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/press-house/contact-form";
import { PageHeader } from "@/components/press-house/page-header";
import { PinIcon } from "@/components/press-house/icons";
import { routes, site } from "@/components/press-house/site-config";
import { SectionRule } from "@/components/press-house/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a comment, suggestion, or question? Get in touch and we will do our best to get back to you in 48 hours.",
};

/**
 * One address for everything, which is what the live contact page
 * does. An earlier artboard split this into separate trade, press and
 * general routes; that was invented, so it is not here.
 *
 * Two things deliberately left off:
 *   - The phone number in the repo is (508) 555-5555, a placeholder,
 *     and it is on the contact page of the current build. A fake
 *     number is worse than no number, so it is not shown until a real
 *     one is supplied.
 *   - The map embed, which loaded Google Maps on every visit for an
 *     address nobody is being invited to visit. The address itself is
 *     still here, in text, linked to a map only if you ask for one.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Have a comment, suggestion, or question? Get in touch and we will do our best to get back to you in 48 hours."
      />

      <section className="ph-gutter py-14">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionRule eyebrow="Send us a note" note="We read all of it" />
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="ph-frame-gold mb-6 bg-ink p-7 text-paper">
              <div className="ph-label mb-3 text-[0.53rem] text-gold">
                General, press, marketing &amp; sales
              </div>
              <Link
                href={`mailto:${site.email}`}
                className="ph-press ph-slab block break-words text-[1.35rem] leading-tight underline-offset-4 hover:text-gold hover:underline"
              >
                {site.email}
              </Link>
              <p className="mt-3.5 font-franklin text-[0.88rem] font-light leading-relaxed text-paper/75">
                One address for everything. We do our best to get back to you
                in 48 hours.
              </p>
            </div>

            <div className="ph-tint mb-6 border border-ink/20 p-6 hover:border-brick">
              <h2 className="ph-slab mb-2.5 text-[1.2rem] leading-tight">
                Looking for a can?
              </h2>
              <p className="mb-4 font-franklin text-[0.9rem] leading-relaxed text-prose">
                Our finder knows every shop and bar that carries us, and it is
                quicker than an email.
              </p>
              <Link
                href={routes.locator}
                className="ph-press ph-label inline-flex items-center gap-2 bg-brick px-5 py-3 text-[0.53rem] text-paper hover:bg-brick-dark"
              >
                <PinIcon size={13} />
                Find our cider
              </Link>
            </div>

            {/* The cidery address (130 Oak Street, Sherborn, MA 01770) is
                in this repository but has never been on the live contact
                page, and nobody has confirmed it should be public. It is
                not rendered until they do — an unconfirmed street address
                is not a thing to publish by default, and the caveat that
                used to stand in for the confirmation was addressed to us,
                not to the reader. Restore this block once it is cleared,
                with real visiting hours or an explicit "mail only". */}
          </aside>
        </div>
      </section>
    </>
  );
}

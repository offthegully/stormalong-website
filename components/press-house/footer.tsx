import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { FacebookIcon, InstagramIcon, Star } from "./icons";
import { NewsletterForm } from "./newsletter-form";
import { footerNav, site } from "./site-config";

/**
 * Nothing in the original canvas had a footer. Three of the earlier
 * review findings land here rather than anywhere else: the newsletter
 * that currently collects addresses and discards them, the "drink
 * responsibly" line an alcohol brand is expected to carry, and the
 * legal chrome.
 *
 * The brick locator call that used to sit on top of this lives in
 * LocatorBand now, so pages that already answer "where do I buy it" at
 * length — the home page and the locator itself — do not repeat it.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="ph-rule-gold border-b-0 border-t-4 bg-ink text-paper">
        <div className="ph-gutter pb-8 pt-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[4fr_2fr_2fr_3fr]">
            {/* Identity */}
            <div>
              <BrandMark mark="wordmark" className="w-[180px]" />
              <div className="ph-label mb-4 mt-2 text-[0.53rem] text-gold">
                <Star className="mr-1" />
                {site.tagline}
                <Star className="ml-1" />
              </div>
              <p className="mb-4 max-w-[36ch] font-franklin text-[0.84rem] font-light leading-relaxed text-paper/70">
                {site.blurb}
              </p>
              <div className="flex gap-3">
                <a
                  href={site.instagram}
                  aria-label="Stormalong on Instagram"
                  className="ph-lift flex h-8 w-8 items-center justify-center border border-paper/35 text-paper hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <InstagramIcon size={15} strokeWidth={1.7} />
                </a>
                <a
                  href={site.facebook}
                  aria-label="Stormalong on Facebook"
                  className="ph-lift flex h-8 w-8 items-center justify-center border border-paper/35 text-paper hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <FacebookIcon size={15} strokeWidth={1.7} />
                </a>
              </div>
            </div>

            <FooterColumn title="Cider" links={footerNav.cider} />
            <FooterColumn title="More" links={footerNav.more} />

            <div>
              <div className="ph-label mb-4 text-gold">Stay in touch</div>
              <p className="mb-3.5 font-franklin text-[0.84rem] font-light leading-relaxed text-paper/70">
                New releases and where to find them.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* The sign-off. Every page ends on the brand's own motto, in
              its own lettering, set between rules like a stamp on a
              crate. It stands in for the plain rule that used to sit
              here. */}
          <div className="flex items-center gap-6 py-9">
            <span className="h-px flex-grow bg-paper/20" />
            <BrandMark
              mark="respect"
              tone="gold"
              className="w-[132px] shrink-0 sm:w-[160px]"
            />
            <span className="h-px flex-grow bg-paper/20" />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="ph-label text-[0.56rem] text-paper/45">
              © {year} {site.name} Cider · Please drink responsibly · 21+
            </span>
            <span className="ph-label text-[0.56rem] text-paper/45">
              {site.origin}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="ph-label mb-4 text-gold">{title}</div>
      <div className="flex flex-col gap-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="ph-wipe ph-press inline-block self-start font-franklin text-[0.84rem] font-light text-paper/80 hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

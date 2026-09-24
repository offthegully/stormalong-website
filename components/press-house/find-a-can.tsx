import Link from "next/link";
import { cn } from "@/lib/utils";
import { PinIcon, SearchIcon } from "./icons";
import { distribution, routes, site } from "./site-config";

/**
 * The payoff band. Stormalong sells through distribution, not a cart,
 * so "where can I actually buy this" is the most valuable thing the
 * site can answer — top level in the nav, repeated on every cider, and
 * the whole bottom of the home page.
 *
 * The artboard's third card was the taproom. It is not here: the
 * canvas review found no taproom, hours or address anywhere on
 * stormalong.com. Its slot goes to the one thing that is always true —
 * if you cannot find it, tell us and we will chase the distributor.
 */

function ShopIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <path d="M3 9 5 3h14l2 6" />
      <path d="M9 13h6" />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 21h8" />
      <path d="M12 15v6" />
      <path d="M5 3h14l-1.5 8a6 6 0 0 1-11 0Z" />
    </svg>
  );
}

export function FindACan({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-paper">
      <div className={cn("ph-gutter", compact ? "py-10" : "py-14")}>
        <div className="mb-8 text-center">
          <div className="ph-label mb-3 text-brick">★ ★ ★</div>
          <h2 className="ph-slab mb-3 text-[2.4rem] leading-none sm:text-[2.9rem]">
            Find a can near you
          </h2>
          <p className="mx-auto max-w-[56ch] font-franklin text-[1.03rem] font-light leading-relaxed text-prose">
            Search by town or ZIP code to find the shops and bars that
            carry us.
          </p>
        </div>

        <div className="mb-9 flex justify-center">
          {/* A plain button, not a link dressed as a search field. The
              finder lives in an iframe on /locator and cannot take a
              query from here, so a box you could click into but not
              type in promised something the page could not do. */}
          <Link
            href={routes.locator}
            className="ph-lift ph-label group inline-flex items-center gap-2.5 bg-ink px-8 py-4 text-gold hover:bg-brick hover:text-paper hover:shadow-[0_14px_30px_rgba(10,26,43,0.28)]"
          >
            <SearchIcon
              size={15}
              className="ph-move-fast group-hover:scale-110"
            />
            Open the finder
          </Link>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <Card
            icon={<ShopIcon />}
            title="Take it home"
            copy="Package stores and supermarkets carrying cans and bottles."
            foot={
              distribution.retailCount
                ? `${distribution.retailCount} locations`
                : null
            }
          />
          <Card
            icon={<GlassIcon />}
            title="Drink it there"
            copy="Bars and restaurants pouring Stormalong on draft or by the can."
            foot={
              distribution.onPremiseCount
                ? `${distribution.onPremiseCount} locations`
                : null
            }
          />
          <Card
            dark
            icon={<PinIcon size={26} strokeWidth={1.7} />}
            title="Can't find it?"
            copy="Tell us where you are and we'll track down the nearest place that has it."
            foot={
              <a
                href={`mailto:${site.email}`}
                className="ph-press text-gold underline-offset-4 hover:underline"
              >
                Ask us
              </a>
            }
          />
        </div>

        {/* Where we are. A state shows its count once someone supplies
            it, and its name until then. */}
        <div className="grid grid-cols-3 gap-3.5 sm:grid-cols-6">
          {distribution.states.map((state) => (
            <div
              key={state.code}
              className="ph-tint group border-t-[3px] border-ink pt-3 hover:border-brick"
            >
              <div className="ph-figure ph-slab origin-bottom-left text-[1.6rem] leading-none group-hover:scale-110 group-hover:text-brick">
                {state.code}
              </div>
              <div className="ph-num mt-1.5 font-franklin text-[0.82rem] text-prose">
                {state.count !== null ? (
                  `${state.count} places`
                ) : (
                  <span className="text-prose-faint">{state.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  copy,
  foot,
  dark = false,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  foot: React.ReactNode;
  dark?: boolean;
}) {
  return (
    // Two of these three cards are not clickable, so they deliberately
    // do NOT lift — a panel that rises under the pointer promises a
    // click it cannot honour. The icon answers instead, which reads as
    // the card being alive rather than as an affordance.
    <div
      className={cn(
        "ph-tint group border-2 border-ink px-6 py-6",
        dark ? "bg-ink text-paper hover:border-gold" : "hover:border-brick",
      )}
    >
      <div
        className={cn(
          "ph-move mb-3.5 w-fit origin-bottom-left group-hover:-rotate-6 group-hover:scale-110",
          dark ? "text-gold" : "text-brick",
        )}
      >
        {icon}
      </div>
      <div className="ph-slab mb-2 text-[1.25rem] leading-tight">{title}</div>
      <p
        className={cn(
          "mb-3 font-franklin text-[0.88rem] font-light leading-relaxed",
          dark ? "text-paper/75" : "text-prose",
        )}
      >
        {copy}
      </p>
      {foot && (
        <div
          className={cn(
            "ph-label ph-num text-[0.68rem]",
            dark ? "text-gold" : "text-ink",
          )}
        >
          {foot}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import { CloseIcon, MenuIcon, PinIcon, SearchIcon, Star } from "./icons";
import { primaryNav, routes, site, ticker } from "./site-config";

/**
 * Gold announcement bar, running as a newspaper ticker.
 *
 * The run of items is repeated `TICKER_REPEATS` times to fill a half
 * of the track, and the track carries two identical halves; at -50%
 * the second half is exactly where the first began, so the loop has
 * no seam and no item is ever cut in half. Repeating within the half
 * is what keeps the line CONTINUOUS: three short announcements are
 * narrower than a wide viewport, so a single-run half would clear the
 * screen and leave the bar blank until the second half arrived. Every
 * copy beyond the first is `aria-hidden`, so a screen reader hears the
 * announcements once rather than once per copy.
 *
 * Every star LEADS its item and no run carries a trailing one: the
 * star that separates the last item from the next run is simply the
 * first item's own, so the seam reads like every other join. A
 * trailing star would meet the next run's leading star and print two
 * in a row with a gap around them. `pr-5` is what makes that join
 * measure the same as the `gap-5` between items, since the track
 * itself puts no gap between the runs.
 *
 * It stops under the pointer, and stops outright under reduced
 * motion — a line of text that will not hold still cannot be read.
 * This also replaced the horizontal scroll the phone used to need: the
 * track carries the items past on its own at every width.
 */

/**
 * Copies of the run per half of the track. Three covers a half of
 * roughly three viewport widths, so the line stays unbroken well past
 * any desktop. The stylesheet reads the same number from
 * `--ph-marquee-repeats` to scale the duration with the distance, so
 * the items pass at one speed whatever this is set to.
 */
const TICKER_REPEATS = 3;

function TickerRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-5 pr-5"
      aria-hidden={hidden || undefined}
    >
      {ticker.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-5">
          <Star className="ph-label" />
          <span className="ph-label whitespace-nowrap">{item}</span>
        </span>
      ))}
    </div>
  );
}

function Ticker() {
  return (
    <div className="ph-marquee bg-gold py-2.5 text-ink">
      <div className="ph-marquee__track">
        {Array.from({ length: TICKER_REPEATS * 2 }, (_, i) => (
          <TickerRun key={i} hidden={i > 0} />
        ))}
      </div>
    </div>
  );
}

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href={routes.home}
      className={cn("ph-lift text-center hover:opacity-95", className)}
    >
      <BrandMark mark="wordmark" className="mx-auto w-[136px] sm:w-[168px]" />
      <span className="ph-label mt-2 block whitespace-nowrap text-[0.53rem] text-gold">
        <Star className="mr-1" />
        {site.origin}
        <Star className="ml-1" />
      </span>
    </Link>
  );
}

export function Masthead() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <Ticker />

      <div className="ph-rule-gold bg-ink">
        <div className="ph-gutter flex items-center justify-between gap-6 py-4">
          {/* Left: nav on desktop, menu button on a phone */}
          <div className="flex w-[400px] max-w-[40%] items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="ph-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="ph-press text-paper lg:hidden"
            >
              {/* Both glyphs are always rendered and turned past each
                  other, so the button answers the tap itself rather
                  than only once the drawer has finished opening. A
                  conditional render would have nothing to animate. */}
              <span className="relative block h-[22px] w-[22px]">
                <MenuIcon
                  size={22}
                  className={cn(
                    "ph-reveal absolute inset-0",
                    open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                  )}
                />
                <CloseIcon
                  size={22}
                  className={cn(
                    "ph-reveal absolute inset-0",
                    open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                  )}
                />
              </span>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ph-wipe ph-press ph-label text-paper hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Wordmark />

          {/* Right: search, then the one action the whole site points at */}
          <div className="flex w-[400px] max-w-[40%] items-center justify-end gap-4">
            <Link
              href={routes.ciders}
              aria-label="Search the ciders"
              className="ph-lift text-paper hover:scale-110 hover:text-gold"
            >
              <SearchIcon size={19} strokeWidth={1.7} />
            </Link>
            <Link
              href={routes.locator}
              className="ph-lift ph-label hidden items-center gap-2 border-2 border-gold bg-brick px-6 py-3.5 text-paper hover:bg-brick-dark hover:shadow-[0_10px_22px_rgba(0,0,0,0.45)] sm:inline-flex"
            >
              <PinIcon size={14} className="text-gold" />
              Find a can near you
            </Link>
          </div>
        </div>

        {/* Mobile drawer.

            The `hidden` attribute is gone because an attribute cannot
            be transitioned; `ph-collapse` does the same job in CSS —
            it opens to the drawer's own height, and while closed its
            `visibility: hidden` keeps these links out of the tab order
            and the accessibility tree exactly as `hidden` did. */}
        <div className="ph-collapse lg:hidden" data-open={open}>
          {/* This bare div is load-bearing. `min-height: 0` lets a grid
              child's CONTENT shrink to nothing but cannot touch its own
              padding or border, so with the padding on the clipped
              child the drawer stayed 41px open. It lives one level in,
              where the clipping can reach it. */}
          <div>
            <nav
              id="ph-mobile-nav"
              className="ph-gutter border-t border-gold/25 pb-6 pt-4"
            >
              <div className="flex flex-col gap-4">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="ph-press ph-label text-paper hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={routes.ourStory}
                  onClick={() => setOpen(false)}
                  className="ph-press ph-label text-paper hover:text-gold"
                >
                  Our story
                </Link>
                <Link
                  href={routes.locator}
                  onClick={() => setOpen(false)}
                  className="ph-press ph-label mt-2 inline-flex items-center justify-center gap-2 border-2 border-gold bg-brick px-6 py-3.5 text-paper hover:bg-brick-dark"
                >
                  <PinIcon size={14} className="text-gold" />
                  Find a can near you
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon, MenuIcon, PinIcon, SearchIcon, Star } from "./icons";
import { primaryNav, routes, site, ticker } from "./site-config";

/**
 * Gold announcement bar. Static on desktop, where all three fit; on a
 * phone it scrolls horizontally rather than wrapping to three lines.
 */
function Ticker() {
  return (
    <div className="bg-gold text-ink">
      <div className="ph-gutter flex items-center justify-center gap-3 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Star className="ph-label shrink-0" />
        {ticker.map((item, i) => (
          <span key={item} className="flex shrink-0 items-center gap-3">
            <span className="ph-label whitespace-nowrap">{item}</span>
            {i < ticker.length - 1 && <Star className="ph-label" />}
          </span>
        ))}
        <Star className="ph-label shrink-0" />
      </div>
    </div>
  );
}

function Wordmark({ className }: { className?: string }) {
  return (
    <Link href={routes.home} className={cn("text-center", className)}>
      <span className="ph-slab block text-[1.55rem] leading-none tracking-[0.04em] text-paper">
        {site.name.toUpperCase()}
      </span>
      <span className="ph-label mt-1.5 block text-[0.53rem] text-gold">
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
              className="text-paper lg:hidden"
            >
              {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ph-label text-paper transition-colors hover:text-gold"
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
              className="text-paper transition-colors hover:text-gold"
            >
              <SearchIcon size={19} strokeWidth={1.7} />
            </Link>
            <Link
              href={routes.locator}
              className="ph-label hidden items-center gap-2 border-2 border-gold bg-brick px-6 py-3.5 text-paper transition-colors hover:bg-brick-dark sm:inline-flex"
            >
              <PinIcon size={14} className="text-gold" />
              Find a can near you
            </Link>
          </div>
        </div>

        {/* Mobile drawer */}
        <nav
          id="ph-mobile-nav"
          hidden={!open}
          className="ph-gutter border-t border-gold/25 pb-6 pt-4 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="ph-label text-paper"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={routes.ourStory}
              onClick={() => setOpen(false)}
              className="ph-label text-paper"
            >
              Our story
            </Link>
            <Link
              href={routes.locator}
              onClick={() => setOpen(false)}
              className="ph-label mt-2 inline-flex items-center justify-center gap-2 border-2 border-gold bg-brick px-6 py-3.5 text-paper"
            >
              <PinIcon size={14} className="text-gold" />
              Find a can near you
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

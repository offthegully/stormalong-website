"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AGE_COOKIE, AGE_COOKIE_DAYS } from "./age-gate-bootstrap";
import { Star } from "./icons";
import { site } from "./site-config";

export function AgeGate() {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    document.cookie = `${AGE_COOKIE}=1; path=/; max-age=${
      AGE_COOKIE_DAYS * 24 * 60 * 60
    }; SameSite=Lax`;
    document.documentElement.removeAttribute("data-age-gate");
  }, []);

  const decline = useCallback(() => {
    // Nowhere to send them that is ours. The responsible-drinking body
    // is the conventional destination and does not require a cookie.
    window.location.href = "https://www.responsibility.org/";
  }, []);

  // Focus the confirm button, and keep tab focus inside the panel for
  // as long as the gate is up.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-age-gate")) return;
    confirmRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>("button");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      data-ph-age-gate
      role="dialog"
      aria-modal="true"
      aria-labelledby="ph-age-gate-title"
      className="fixed inset-0 z-[100] items-center justify-center bg-ink/95 p-5"
    >
      <div
        ref={panelRef}
        className="ph-frame-gold w-full max-w-[430px] bg-ink px-8 py-9 text-center"
      >
        <Image
          src="/images/our-story/captain-stormalong.png"
          alt=""
          width={86}
          height={86}
          priority
          className="mx-auto mb-4 h-[86px] w-[86px] object-contain"
        />
        <div className="ph-slab text-xl leading-none tracking-[0.03em] text-paper">
          {site.name.toUpperCase()}
        </div>
        <div className="ph-label mb-6 mt-1.5 text-[0.53rem] text-gold">
          <Star className="mr-1" />
          New England Hard Cider
          <Star className="ml-1" />
        </div>

        <h2
          id="ph-age-gate-title"
          className="ph-slab mb-5 text-[1.7rem] leading-[1.08] text-paper"
        >
          Are you 21{" "}
          <br />
          or older?
        </h2>

        <div className="flex justify-center gap-2.5">
          <button
            ref={confirmRef}
            type="button"
            onClick={dismiss}
            className="ph-press ph-label bg-gold px-7 py-4 text-ink hover:bg-gold-pale"
          >
            Yes, I am
          </button>
          <button
            type="button"
            onClick={decline}
            className="ph-press ph-label border-2 border-paper/50 px-6 py-3.5 text-paper hover:border-paper"
          >
            No
          </button>
        </div>

        <p className="mt-5 font-franklin text-[0.72rem] font-light leading-relaxed text-paper/50">
          By entering you confirm you are of legal drinking age.
        </p>
      </div>
    </div>
  );
}

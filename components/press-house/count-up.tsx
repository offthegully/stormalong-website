"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A figure that counts up to itself the first time it is scrolled into
 * view, once per page load.
 *
 * This is the only scroll-triggered motion on the site, and it is
 * deliberately confined to numbers: a figure that lands on its value
 * is the one place where motion carries the meaning rather than
 * decorating it. No prose is ever withheld waiting for it — the
 * server renders the final number, so a crawler, a reader with
 * JavaScript off and anyone who has asked for reduced motion all get
 * the figure itself and nothing moves.
 *
 * Call sites pair it with `ph-num` (tabular figures) so the digits do
 * not jitter in width on the way up.
 */
export function CountUp({
  value,
  duration = 1100,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Once only. Re-running on every scroll past would turn a
        // flourish into a tic.
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Ease out cubic: most of the distance is covered early, so
          // the number arrives and settles rather than crawling.
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return <span ref={ref}>{shown}</span>;
}

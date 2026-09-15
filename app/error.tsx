"use client";

import { useEffect } from "react";
import { routes } from "@/components/press-house/site-config";
import { Eyebrow, PhButton } from "@/components/press-house/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-ink text-paper">
      <div className="ph-gutter flex min-h-[60vh] flex-col justify-center py-16">
        <Eyebrow className="mb-5 block">Something broke</Eyebrow>
        <h1 className="ph-slab text-[2.2rem] leading-tight sm:text-[2.9rem]">
          That did not work.
        </h1>
        <p className="mt-4 max-w-[52ch] font-franklin text-[0.97rem] font-light leading-relaxed text-paper/75">
          Our fault, not yours. Try again — and if it keeps happening, tell us
          at{" "}
          <a
            href="mailto:info@stormalong.com"
            className="underline underline-offset-4 hover:text-gold"
          >
            info@stormalong.com
          </a>
          .
        </p>
        {error.digest && (
          <p className="ph-label ph-num mt-4 text-[0.5rem] text-paper/45">
            Reference {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3.5">
          <PhButton onClick={reset} tone="gold">
            Try again
          </PhButton>
          <PhButton href={routes.ciders} tone="outline-gold">
            See the ciders
          </PhButton>
        </div>
      </div>
    </section>
  );
}

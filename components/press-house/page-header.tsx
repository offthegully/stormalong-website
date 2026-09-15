import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

/** The ink band that opens every page but the home page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-paper">
      <div className="ph-gutter py-11">
        <div className="mb-4 flex items-center gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <span className="h-px flex-grow bg-gold/30" />
        </div>
        <h1 className="ph-slab text-[2.6rem] leading-[0.98] sm:text-[3.25rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-3.5 max-w-[62ch] font-franklin text-base font-light leading-relaxed text-paper/80">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { groupBlurbs, groupLabels, groupOrder } from "@/lib/catalogue";
import type { CiderGroup, ShelfCider } from "@/types/cider";
import { CiderTile } from "./cider-tile";

/**
 * The shelf with its filter row.
 *
 * The taxonomy is the live site's three groups, not the four the
 * artboard's filter row proposed — that fourth option (Barrel-Aged)
 * matched neither the data nor the shelf. See canvas review,
 * finding 03.
 *
 * Filtering is client-side over a list that is already in the payload,
 * so there is no request and no loading state for fifteen items.
 */
export function CiderShelf({ ciders }: { ciders: ShelfCider[] }) {
  const [filter, setFilter] = useState<CiderGroup | "all">("all");

  const groupsShown = filter === "all" ? groupOrder : [filter];
  const counts = Object.fromEntries(
    groupOrder.map((g) => [g, ciders.filter((c) => c.group === g).length]),
  ) as Record<CiderGroup, number>;

  return (
    <>
      <div className="border-b-2 border-ink/20 bg-paper-dark">
        <div className="ph-gutter flex flex-wrap items-center gap-2.5 py-5">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All {ciders.length}
          </FilterChip>
          {groupOrder.map((group) => (
            <FilterChip
              key={group}
              active={filter === group}
              onClick={() => setFilter(group)}
            >
              {groupLabels[group]} ({counts[group]})
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="ph-gutter py-12">
        {groupsShown.map((group, i) => {
          const inGroup = ciders.filter((c) => c.group === group);
          if (!inGroup.length) return null;
          return (
            <section key={group} className={cn(i > 0 && "mt-14")}>
              <div className="mb-5 border-b-2 border-ink pb-3.5">
                <h2 className="ph-slab text-[1.7rem] leading-none">
                  {groupLabels[group]}
                </h2>
                <p className="mt-2 max-w-[70ch] font-franklin text-[0.92rem] font-light leading-relaxed text-prose">
                  {groupBlurbs[group]}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {inGroup.map((cider) => (
                  <CiderTile key={cider.slug} cider={cider} showGroupTag />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "ph-label border-2 px-5 py-3 text-[0.59rem] transition-colors",
        active
          ? "border-ink bg-ink text-gold"
          : "border-ink/20 text-ink hover:border-ink/50",
      )}
    >
      {children}
    </button>
  );
}

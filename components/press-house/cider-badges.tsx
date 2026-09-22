import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BarrelIcon, DropIcon, LeafIcon, RareIcon } from "./icons";

/**
 * The badge row, rebuilt from the feature flags that actually vary.
 *
 * `apple-gold` is set on 18 of 18 ciders and `apple-red` on 14 of 18,
 * and both label apple varieties ("Gold Rush", "Red Delicious") that
 * appear in no cider's blend — so they distinguished nothing and were
 * inaccurate besides. They are deliberately not mapped here. What is
 * left is the set that genuinely differs between products. Labels are
 * drawn on screen rather than hidden in a hover tooltip, which does
 * not exist on a phone. See canvas review, finding 04.
 */
const featureBadges: Record<string, { label: string; icon: ReactNode }> = {
  barrel: { label: "Barrel aged", icon: <BarrelIcon size={20} /> },
  "rare-apple-series": {
    label: "Rare Apple Series",
    icon: <RareIcon size={20} />,
  },
  hibiscus: { label: "Hibiscus", icon: <LeafIcon size={20} /> },
  passionfruit: { label: "Passionfruit", icon: <DropIcon size={20} /> },
  guava: { label: "Guava", icon: <DropIcon size={20} /> },
};

export function ciderBadgeCount(features: string[]): number {
  return features.filter((f) => f in featureBadges).length;
}

export function CiderBadges({
  features,
  className,
}: {
  features: string[];
  className?: string;
}) {
  const badges = features
    .filter((f) => f in featureBadges)
    .map((f) => ({ key: f, ...featureBadges[f] }));

  if (badges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {badges.map((badge) => (
        <span
          key={badge.key}
          className="ph-label inline-flex items-center gap-2 border border-paper/30 px-3 py-2 text-[0.53rem] text-paper/85"
        >
          <span className="text-gold">{badge.icon}</span>
          {badge.label}
        </span>
      ))}
    </div>
  );
}

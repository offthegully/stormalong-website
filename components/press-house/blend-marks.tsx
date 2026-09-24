import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { blendMarks, type BlendMarkKind } from "@/lib/catalogue";
import type { Blend } from "@/types/cider";
import {
  AppleIcon,
  BarrelIcon,
  DropIcon,
  FruitIcon,
  LeafIcon,
  PinIcon,
  RareIcon,
  SpiceIcon,
} from "./icons";

const markIcons: Record<BlendMarkKind, (size: number) => ReactNode> = {
  apples: (size) => <AppleIcon size={size} />,
  single: (size) => <RareIcon size={size} />,
  barrel: (size) => <BarrelIcon size={size} />,
  orchard: (size) => <PinIcon size={size} />,
  fruit: (size) => <FruitIcon size={size} />,
  botanical: (size) => <LeafIcon size={size} />,
  spice: (size) => <SpiceIcon size={size} />,
  sweetener: (size) => <DropIcon size={size} />,
};

export function BlendMarkIcon({
  kind,
  size = 20,
}: {
  kind: BlendMarkKind;
  size?: number;
}) {
  return <>{markIcons[kind](size)}</>;
}

/**
 * A row of small icons saying what goes into a cider, for the tile.
 *
 * The labels sit on screen beside each icon rather than in a hover
 * tooltip, which does not exist on a phone and leaves a row of
 * pictures nobody can decode. See canvas review, finding 04.
 */
export function BlendMarks({
  blend,
  size = 20,
  className,
}: {
  blend: Blend;
  size?: number;
  className?: string;
}) {
  const marks = blendMarks(blend);

  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2.5", className)}>
      {marks.map((mark) => (
        <li
          key={mark.kind}
          className="ph-label inline-flex items-center gap-2 text-[0.56rem] text-paper-light/80"
        >
          <span className="text-gold">{markIcons[mark.kind](size)}</span>
          {mark.label}
        </li>
      ))}
    </ul>
  );
}

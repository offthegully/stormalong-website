import Image from "next/image";
import { Gem } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CiderFeatureIconsProps {
  features: string[];
  size?: number;
}

const featureDescriptions: Record<string, string> = {
  "apple-gold": "Made with Gold Rush apples",
  "apple-red": "Made with Red Delicious apples",
  barrel: "Barrel-aged cider",
  hibiscus: "Infused with hibiscus",
  passionfruit: "Infused with passionfruit",
  guava: "Infused with guava",
  hops: "Hopped cider",
  "rare-apple-series": "Rare Apple Series - Limited Edition",
};

export function CiderFeatureIcons({
  features,
  size = 42,
}: CiderFeatureIconsProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-3">
        {features.map((feature, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className="transition-transform duration-200 hover:scale-110 cursor-pointer"
                style={{ width: size, height: size }}
              >
                {feature === "rare-apple-series" ? (
                  <Gem
                    className="text-amber-500"
                    style={{ width: size, height: size }}
                  />
                ) : (
                  <Image
                    src={`/images/icons/${feature}.png`}
                    alt={feature}
                    width={size}
                    height={size}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-brand-navy text-white">
              <p className="font-oswald text-sm">
                {featureDescriptions[feature]}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

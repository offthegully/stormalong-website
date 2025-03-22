import Image from "next/image";

interface CiderFeatureIconsProps {
  features: string[];
  size?: number;
}

export function CiderFeatureIcons({
  features,
  size = 32,
}: CiderFeatureIconsProps) {
  const iconMap: Record<string, string> = {
    "apple-gold": "/images/icons/apple-gold.png",
    "apple-red": "/images/icons/apple-red.png",
    barrel: "/images/icons/barrel.png",
    hibiscus: "/images/icons/hibiscus.png",
    passionfruit: "/images/icons/passionfruit.png",
    guava: "/images/icons/guava.png",
    hops: "/images/icons/hops.svg",
  };

  return (
    <div className="flex items-center gap-2">
      {features.map((feature, index) => (
        <div key={index} style={{ width: size, height: size }}>
          <Image
            src={iconMap[feature] || "/placeholder.svg"}
            alt={feature}
            width={size}
            height={size}
            className="h-auto w-auto"
          />
        </div>
      ))}
    </div>
  );
}

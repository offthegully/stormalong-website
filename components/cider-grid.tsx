"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CiderType } from "@/types/cider";
import { Apple, Gem } from "lucide-react";
import { CiderFeatureIcons } from "@/components/cider-feature-icons";

interface CiderGridProps {
  ciders: CiderType[];
  category?: string;
}

export function CiderGrid({ ciders, category }: CiderGridProps) {
  const [displayedCiders, setDisplayedCiders] = useState<CiderType[]>(ciders);

  useEffect(() => {
    // Filter ciders by category if provided
    if (category && category !== "all") {
      const filtered = ciders.filter((cider) => {
        if (category === "core") return cider.availability === "Year-round";
        if (category === "seasonal") return cider.availability === "Seasonal";
        if (category === "rare")
          return cider.features.includes("rare-apple-series");
        if (category === "barrel-aged")
          return cider.features.includes("barrel");
        return true;
      });
      setDisplayedCiders(filtered);
    } else {
      setDisplayedCiders(ciders);
    }
  }, [ciders, category]);

  if (displayedCiders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <h3 className="text-2xl font-oswald text-brand-navy mb-4">
          No Ciders Found
        </h3>
        <p className="text-gray-600">
          We couldn't find any ciders matching your selected category. Try
          selecting a different category or view all ciders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCiders.map((cider) => (
          <CiderCard key={cider.slug} cider={cider} />
        ))}
      </div>
    </div>
  );
}

function CiderCard({ cider }: { cider: CiderType }) {
  return (
    <Link
      href={`/ciders/${cider.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200"
    >
      <div className="relative h-80 overflow-hidden bg-brand-navy/5">
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-200 text-teal-800">
            {cider.availability}
          </span>
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            {cider.abv}% ABV
          </span>
        </div>
        <motion.div
          className="h-full relative"
          animate={{ rotate: 0 }}
          whileHover={{
            rotate: [0, -4, 4, -3, 3, 0],
            transition: {
              duration: 0.7,
              rotate: {
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              },
            },
          }}
        >
          <Image
            src={cider.image || "/placeholder.svg"}
            alt={cider.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </motion.div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-oswald text-brand-navy mb-1 group-hover:text-brand-gold transition-colors duration-200">
          {cider.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 h-10 line-clamp-2">
          {cider.tagline}
        </p>

        <div className="flex items-center gap-2">
          <CiderFeatureIcons features={cider.features} size={24} />
        </div>
      </div>
    </Link>
  );
}

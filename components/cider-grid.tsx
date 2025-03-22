"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CiderType } from "@/types/cider";

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
          return (
            cider.apples.toLowerCase().includes("rare") ||
            cider.name.toLowerCase().includes("rare")
          );
        if (category === "barrel-aged")
          return cider.features.includes("barrel");
        return true;
      });
      setDisplayedCiders(filtered);
    } else {
      setDisplayedCiders(ciders);
    }
  }, [ciders, category]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedCiders.map((cider) => (
        <CiderCard key={cider.slug} cider={cider} />
      ))}
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
        <motion.div
          className="h-full"
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
            className="object-contain"
          />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-oswald text-brand-navy mb-2 group-hover:text-brand-gold transition-colors duration-200">
          {cider.name}
        </h3>
        <p className="text-gray-600 mb-4 h-12 line-clamp-2">{cider.tagline}</p>

        <div className="flex items-center gap-2 mb-4">
          {cider.features.map((feature, index) => (
            <div
              key={index}
              className="w-8 h-8 transition-transform duration-200 hover:scale-110"
            >
              <Image
                src={`/images/icons/${feature}.png`}
                alt={feature}
                width={32}
                height={32}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            {cider.abv}% ABV
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              cider.availability === "Year-round"
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {cider.availability}
          </span>
        </div>
      </div>
    </Link>
  );
}

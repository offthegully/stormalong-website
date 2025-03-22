"use client";

import Image from "next/image";
import Link from "next/link";
import type { CiderType } from "@/types/cider";

interface RelatedCidersProps {
  ciders: CiderType[];
  currentCiderId: string;
}

export function RelatedCiders({ ciders, currentCiderId }: RelatedCidersProps) {
  // Filter out current cider and get 4 related ciders using a deterministic sort
  const relatedCiders = ciders
    .filter((cider) => cider.id !== currentCiderId)
    .sort((a, b) => a.id.localeCompare(b.id)) // Use deterministic sorting
    .slice(0, 4);

  return (
    <div>
      <h2 className="text-3xl font-oswald text-brand-navy uppercase mb-8 text-center">
        You Might Also Like...
      </h2>
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedCiders.map((cider) => (
            <Link
              key={cider.id}
              href={`/ciders/${cider.slug}`}
              className="block text-center"
            >
              <div className="overflow-hidden mb-4 flex justify-center">
                <div className="transition-transform duration-300 hover:scale-105">
                  <Image
                    src={cider.image || "/placeholder.svg"}
                    alt={cider.name}
                    width={200}
                    height={400}
                    className="h-auto w-auto max-h-60 object-contain"
                  />
                </div>
              </div>
              <h3 className="font-oswald text-xl text-brand-navy uppercase mb-1 transition-colors duration-300 hover:text-brand-gold">
                {cider.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ciders } from "@/data/ciders";
import { cn } from "@/lib/utils";

export function FeaturedCarousel() {
  const featuredCiders = ciders.slice(0, 4);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-brand-navy uppercase mb-3">
            Featured Ciders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular craft ciders, made with 100% fresh-pressed
            apples and natural ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCiders.map((cider) => (
            <Link
              key={cider.id}
              href={`/ciders/${cider.slug}`}
              className="block h-full"
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow h-full hover:scale-[1.02] transition-transform">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-[2/3] bg-brand-navy/5">
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
                      className="h-full w-full relative"
                      animate={{ rotate: 0 }}
                      whileHover={{
                        scale: 1.05,
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-oswald text-xl text-brand-navy uppercase mb-2">
                      {cider.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {cider.tagline}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/ciders">
            <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase px-8">
              View All Ciders
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

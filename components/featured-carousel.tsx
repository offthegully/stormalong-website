"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ciders } from "@/data/ciders";
import { cn } from "@/lib/utils";

export function FeaturedCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Filter to show only featured ciders (first 6)
  const featuredCiders = ciders.slice(0, 6);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-16 bg-white">
      <div className="stormalong-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-oswald text-brand-navy uppercase mb-4">
            Featured Ciders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular craft ciders, made with 100% fresh-pressed
            apples and natural ingredients. Each cider tells a unique story of
            flavor and tradition.
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredCiders.map((cider, index) => (
              <CarouselItem
                key={cider.id}
                className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="relative aspect-[2/3] bg-brand-navy/5 overflow-hidden">
                        <motion.div
                          className="h-full w-full"
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
                            className="object-contain"
                          />
                        </motion.div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-oswald text-xl text-brand-navy uppercase mb-1">
                          {cider.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {cider.tagline}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">
                            {cider.abv}% ABV
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              cider.availability === "Year-round"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            )}
                          >
                            {cider.availability}
                          </span>
                        </div>
                        <Link
                          href={`/ciders/${cider.slug}`}
                          className="mt-3 block"
                        >
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-oswald uppercase"
                            >
                              View Details
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-8 gap-2">
            <CarouselPrevious className="static transform-none bg-white border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors duration-200" />
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    current === i + 1
                      ? "bg-brand-gold w-3 h-3"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none bg-white border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors duration-200" />
          </div>
        </Carousel>

        <div className="mt-10 text-center">
          <Link href="/ciders">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase tracking-wider px-8">
                View All Ciders
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}

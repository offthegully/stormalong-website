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

  const featuredCiders = ciders.slice(0, 6);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-oswald text-brand-navy uppercase mb-3">
            Featured Ciders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular craft ciders, made with 100% fresh-pressed
            apples and natural ingredients.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {featuredCiders.map((cider) => (
              <CarouselItem
                key={cider.id}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="border shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-[2/3] bg-brand-navy/5">
                      <div className="absolute top-2 right-2 z-10">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            cider.availability === "Year-round"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {cider.availability}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 z-10">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                          {cider.abv}% ABV
                        </span>
                      </div>
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
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-oswald text-xl text-brand-navy uppercase mb-2">
                        {cider.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {cider.tagline}
                      </p>
                      <Link
                        href={`/ciders/${cider.slug}`}
                        className="block w-full mt-auto"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-oswald uppercase"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center mt-6 gap-4">
            <CarouselPrevious className="static transform-none bg-white border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white" />
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    current === i + 1 ? "bg-brand-gold" : "bg-gray-300"
                  )}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none bg-white border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white" />
          </div>
        </Carousel>

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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SweetnessScale } from "@/components/sweetness-scale";
import { CiderFeatureIcons } from "@/components/cider-feature-icons";
import { CiderSpecs } from "@/components/cider-specs";
import { RelatedCiders } from "@/components/related-ciders";
import { useRouter } from "next/navigation";
import { PatternedSection } from "@/components/patterned-section";

interface CiderDetailClientProps {
  cider: any;
  prevCider: any;
  nextCider: any;
  relatedCiders: any[];
  allCiders: any[];
}

export default function CiderDetailClient({
  cider,
  prevCider,
  nextCider,
  relatedCiders,
  allCiders,
}: CiderDetailClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [cider.slug]);

  const handleNavigation = (slug: string) => {
    setIsLoaded(false);
    setTimeout(() => {
      router.push(`/ciders/${slug}`);
    }, 300);
  };

  return (
    <main
      className={`min-h-screen ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      {/* Hero Section with Navy Background */}
      <div className="relative min-h-[400px]">
        <div className="absolute inset-0">
          <PatternedSection className="h-full w-full" opacity={0.85}>
            <div />
          </PatternedSection>
        </div>

        {/* Navigation Links */}
        <button
          onClick={() => handleNavigation(prevCider.slug)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-brand-gold transition-colors focus:outline-none p-4 cursor-pointer"
          aria-label="Previous Cider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => handleNavigation(nextCider.slug)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-brand-gold transition-colors focus:outline-none p-4 cursor-pointer"
          aria-label="Next Cider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div className="container max-w-4xl mx-auto px-4 relative z-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Cider Can Image */}
            <div className="flex justify-center relative z-20 order-2 md:order-1 md:-mb-36">
              <Image
                src={cider.image || "/placeholder.svg"}
                alt={cider.name}
                width={400}
                height={600}
                className="h-auto max-h-[300px] md:max-h-[500px] w-auto drop-shadow-xl"
                priority
              />
            </div>

            {/* Cider Info */}
            <div className="text-white relative z-20 order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-brand-gold uppercase mb-2">
                {cider.name}
              </h1>
              <p className="text-xl mb-6 font-bebas-neue text-white uppercase">
                MADE WITH {cider.apples}
              </p>
              <div className="flex items-center gap-3 mb-6">
                <CiderFeatureIcons features={cider.features} size={42} />
              </div>
              <div className="flex gap-4 mb-8">
                <Link href="/locator">
                  <Button
                    variant="outline"
                    className="bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy font-oswald uppercase tracking-wider px-8 py-2"
                  >
                    FIND IT
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy font-oswald uppercase tracking-wider px-8 py-2"
                  >
                    BUY NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cider Details Section */}
      <section className="max-w-6xl mx-auto py-8 md:py-16 bg-white mt-0 md:mt-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {/* Description Column */}
            <div className="md:col-span-8">
              <div className="body blue text-gray-700 mb-4 md:mb-8">
                {cider.description}
              </div>

              <div className="mb-4 md:mb-8">
                <h3 className="text-lg font-oswald text-brand-navy uppercase mb-2">
                  FLAVOR
                </h3>
                <div className="body blue text-gray-700">{cider.flavor}</div>
              </div>

              <div className="mb-4 md:mb-8">
                <h3 className="text-lg font-oswald text-brand-navy uppercase mb-2">
                  APPLES
                </h3>
                <div className="body blue text-gray-700">{cider.apples}</div>
              </div>

              <div className="mb-4 md:mb-8">
                <h3 className="text-lg font-oswald text-brand-navy uppercase mb-2">
                  SWEETNESS SCALE
                </h3>
                <SweetnessScale level={cider.sweetness} />
              </div>
            </div>

            {/* Technical Details Column */}
            <div className="md:col-span-4">
              <CiderSpecs
                abv={cider.abv}
                availability={cider.availability}
                category="Core Line-Up"
                awards={cider.awards}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="max-w-6xl mx-auto py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-4 space-y-6">
              <Image
                src={`/images/ciders/${cider.slug}-lifestyle-1.jpg`}
                alt={`${cider.name} lifestyle image 1`}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
              />
              <Image
                src={`/images/ciders/${cider.slug}-lifestyle-2.jpg`}
                alt={`${cider.name} lifestyle image 2`}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

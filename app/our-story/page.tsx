"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { DecorativeFooter } from "@/components/decorative-footer";
import { FadeIn } from "../components/animations/fade-in";
import { StaggerChildren } from "../components/animations/stagger-children";

export default function OurStoryPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`flex flex-col transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Page Header */}
      <PageHeader
        title="Our Story"
        backgroundImage="/images/landing-page/farm-stand-landing.jpg"
        subtitle="Crafting premium cider with tradition and innovation"
      />

      {/* Main Content */}
      <div className="py-12 md:py-20 bg-white max-w-6xl mx-auto">
        <div className="stormalong-container px-4 md:px-8 lg:px-12">
          {/* True Cider Section */}
          <section className="mb-20 md:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <FadeIn from="right">
                  <div className="inline-block border-b-2 border-brand-gold pb-1 mb-2">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald text-brand-navy uppercase">
                      True Cider
                    </h2>
                  </div>
                </FadeIn>

                <FadeIn from="right" delay={0.1}>
                  <div className="text-xl font-medium text-brand-gold italic mb-4">
                    respect the apple
                  </div>
                </FadeIn>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <StaggerChildren
                    from="right"
                    staggerDelay={0.1}
                    baseDelay={0.2}
                  >
                    <p className="mb-6">
                      Stormalong Cider was founded in 2014 by Shannon Edgar with
                      the desire to showcase the virtues of cider made with the
                      right apples. Cider is a complex and nuanced beverage, and
                      apple selection and blends are paramount.
                    </p>
                    <p className="mb-6">
                      We treat cider making as an artistic endeavor, a
                      renaissance of sorts. Using a blend of culinary and rare
                      heirloom varieties, we ferment and age our ciders with
                      traditional and modern techniques showcasing the unique
                      characteristics of these diverse apples.
                    </p>
                    <p>
                      At Stormalong, we are committed to quality. We don't cut
                      corners. We respect the apple, the ingredients, and the
                      process. We aim to increase awareness of the diversity of
                      apple cultivars, some of which have been around since the
                      country was founded, while continuing to innovate and
                      explore in the pursuit of cider's full potential.
                    </p>
                  </StaggerChildren>
                </div>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <FadeIn from="left" delay={0.3}>
                  <div className="relative transform transition-transform duration-700 hover:scale-105">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-navy/10 blur-lg opacity-70"></div>
                    <Image
                      src="/images/our-story/anchor-apple.png"
                      alt="Apple Icon"
                      width={400}
                      height={400}
                      className="relative z-10 w-auto h-auto max-w-[280px] sm:max-w-[350px]"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Divider */}
          <FadeIn>
            <div className="relative h-px w-full bg-gray-200 my-16 md:my-24">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8">
                <Image
                  src="https://web-assets.same.dev/837813956/3232369280.png"
                  alt="Respect the Apple"
                  width={60}
                  height={60}
                  className="w-auto h-12 animate-pulse"
                />
              </div>
            </div>
          </FadeIn>

          {/* Sherborn, MA Section */}
          <section className="mb-20 md:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5 md:order-2 flex justify-center">
                <FadeIn from="left" delay={0.3}>
                  <div className="relative transform transition-transform duration-700 hover:scale-105">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-navy/10 to-brand-gold/20 blur-lg opacity-70"></div>
                    <Image
                      src="/images/our-story/town-of-sherborn.png"
                      alt="Sherborn, MA"
                      width={400}
                      height={400}
                      className="relative z-10 w-auto h-auto max-w-[280px] sm:max-w-[350px]"
                    />
                  </div>
                </FadeIn>
              </div>
              <div className="md:col-span-7 md:order-1 space-y-6">
                <FadeIn from="right">
                  <div className="inline-block border-b-2 border-brand-gold pb-1 mb-2">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald text-brand-navy uppercase">
                      Sherborn, MA
                    </h2>
                  </div>
                </FadeIn>

                <FadeIn from="right" delay={0.1}>
                  <div className="text-xl font-medium text-brand-gold italic mb-4">
                    Largest refined cider mill in the world - 1880-1930
                  </div>
                </FadeIn>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <StaggerChildren
                    from="right"
                    staggerDelay={0.1}
                    baseDelay={0.2}
                  >
                    <p className="mb-6">
                      In the late 1800's, the largest refined cider mill in the
                      world was located in Sherborn, MA, exporting a "champagne
                      cider" to England, and other places abroad. Around that
                      time there were some 40 orchards in the town and the owner
                      of the cider mill, Jonathan Holbrook, convinced the
                      Framingham & Mansfield railroad to align their track
                      through Sherborn with his cider mill.
                    </p>
                    <p>
                      The first freight train into the town was loaded with
                      apples headed to Holbrook's mill. With such a rich history
                      of cider making in the Northeast, it is hard to fathom how
                      this tradition has virtually disappeared. At Stormalong,
                      we are both fascinated and inspired by this robust hard
                      cider lineage, and with the legacy of cider here in
                      Sherborn, MA, it felt like an ideal place to help reignite
                      this tradition.
                    </p>
                  </StaggerChildren>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <FadeIn>
            <div className="relative h-px w-full bg-gray-200 my-16 md:my-24">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8">
                <Image
                  src="https://web-assets.same.dev/837813956/3232369280.png"
                  alt="Respect the Apple"
                  width={60}
                  height={60}
                  className="w-auto h-12 animate-pulse"
                />
              </div>
            </div>
          </FadeIn>

          {/* Captain Stormalong Section */}
          <section className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <FadeIn from="right">
                  <div className="inline-block border-b-2 border-brand-gold pb-1 mb-2">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald text-brand-navy uppercase">
                      Captain Alfred Bulltop Stormalong
                    </h2>
                  </div>
                </FadeIn>

                <FadeIn from="right" delay={0.1}>
                  <div className="text-xl font-medium text-brand-gold italic mb-4">
                    The "Paul Bunyan" of the sea...
                  </div>
                </FadeIn>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <StaggerChildren
                    from="right"
                    staggerDelay={0.1}
                    baseDelay={0.2}
                  >
                    <p className="mb-6">
                      In a semi-forgotten slice of history, we were inspired by
                      the tall-tale of Captain Alfred Bulltop Stormalong
                      described as a larger-than-life figure, epically tall,
                      originating out of New England and heralded as the
                      greatest deep-water sailor to have ever lived.
                    </p>
                    <p>
                      The giant "Stormy" was innovative, excelled at his craft
                      and broke down barriers. Literally. He was said to have
                      drilled the course of the Panama Canal. Like Captain
                      Stormalong, we are always pushing the boundaries,
                      learning, growing, and furthering our craft. We hope
                      you'll join us and make it a celebration.
                    </p>
                  </StaggerChildren>
                </div>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <FadeIn from="left" delay={0.3}>
                  <div className="relative transform transition-transform duration-700 hover:scale-105">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-navy/10 blur-lg opacity-70"></div>
                    <Image
                      src="/images/our-story/captain-stormalong.png"
                      alt="Captain Stormalong"
                      width={400}
                      height={400}
                      className="relative z-10 w-auto h-auto max-w-[280px] sm:max-w-[350px]"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <FadeIn from="bottom">
            <section className="bg-brand-navy text-white rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="p-8 md:p-12 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-oswald uppercase">
                    Visit Our Taproom
                  </h2>
                  <p className="text-lg text-white/80">
                    Experience our ciders firsthand at our taproom in Sherborn,
                    MA. Join us for tastings, tours, and special events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-oswald uppercase tracking-wider transition-all duration-300 hover:scale-105">
                      Plan Your Visit
                    </Button>
                    {/* <Button
                      variant="outline"
                      className="border-white/80 text-white hover:bg-white/10 font-oswald uppercase tracking-wider transition-all duration-300 hover:scale-105"
                    >
                      View Calendar
                    </Button> */}
                  </div>
                </div>
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/images/our-story/stormalong-taproom.png"
                    alt="Stormalong Taproom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-navy/80 md:bg-gradient-to-r"></div>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </div>

      {/* Decorative Footer */}
      <DecorativeFooter />
    </div>
  );
}

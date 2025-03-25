"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ANIMATION_CONFIG, fadeIn, fadeUp } from "@/lib/animation-config";
import { ScrollDownIndicator } from "@/components/scroll-down-indicator";

interface HeroProps {
  imageSrc: string;
  title: string;
  highlightedText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function Hero({
  imageSrc,
  title,
  highlightedText,
  description,
  buttonText,
  buttonLink,
}: HeroProps) {
  return (
    <div className="relative">
      {/* Hero image and content */}
      <div className="relative h-[calc(100vh-4rem)]">
        {/* Background image */}
        <Image
          src={imageSrc}
          alt="Hero background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
          <div className="stormalong-container h-full flex flex-col justify-center">
            <div className="max-w-xl">
              {/* Animated Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: ANIMATION_CONFIG.delay.minimal,
                  ease: ANIMATION_CONFIG.ease.smooth,
                }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald mb-4 sm:mb-5 text-white">
                  {title}
                  <span className="block text-brand-gold mt-1">
                    {highlightedText}
                  </span>
                </h1>
              </motion.div>

              {/* Animated Description */}
              <motion.p
                className="mb-6 sm:mb-8 text-base sm:text-lg text-white/90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: ANIMATION_CONFIG.delay.short,
                  ease: ANIMATION_CONFIG.ease.smooth,
                }}
              >
                {description}
              </motion.p>

              {/* Animated Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: ANIMATION_CONFIG.delay.medium,
                  ease: ANIMATION_CONFIG.ease.smooth,
                }}
              >
                <Link href={buttonLink}>
                  <Button
                    variant="outline"
                    className="bg-transparent text-white border-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-colors font-oswald uppercase tracking-wider"
                  >
                    {buttonText}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* New Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ScrollDownIndicator />
      </div>
    </div>
  );
}

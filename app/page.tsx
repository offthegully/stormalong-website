"use client";

import { motion } from "framer-motion";
import { HeroSlider } from "@/components/hero-slider";
import { SimpleRespectApple } from "@/components/simple-respect-apple";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CiderClub } from "@/components/cider-club";
import { ShopLinks } from "@/components/shop-links";
import { pageTransition } from "@/lib/animation-config";
import { DecorativeFooter } from "@/components/decorative-footer";

export default function Home() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col"
    >
      <HeroSlider />
      <SimpleRespectApple />
      <FeaturedCarousel />
      {/* <TestimonialCarousel /> */}
      <CiderClub />
      <ShopLinks />
      <DecorativeFooter />
    </motion.div>
  );
}

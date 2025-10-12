"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/hero-image";
import { SimpleRespectApple } from "@/components/simple-respect-apple";
import { FeaturedCidersGrid } from "@/components/featured-ciders-grid";
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
      <Hero
        imageSrc="/images/landing-page/farmstand-fall.jpg"
        title="Farmstand"
        highlightedText="Unfiltered"
        description="Unfiltered hard cider reminiscent of freshly pressed cider made at harvest!"
        buttonText="More Details"
        buttonLink="ciders/farmstand-unfiltered"
      />
      <SimpleRespectApple />
      <FeaturedCidersGrid />
      {/* <TestimonialCarousel /> */}
      <CiderClub />
      <ShopLinks />
      <DecorativeFooter />
    </motion.div>
  );
}

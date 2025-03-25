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
        imageSrc="/images/landing-page/legendary-dry-landing.jpg"
        title="Grow With Us"
        highlightedText="Get a piece of Stormalong Cider"
        description="Join us on our journey to revolutionize the craft cider industry. Invest in Stormalong Cider and become part of our growing success story."
        buttonText="INVEST NOW"
        buttonLink="https://www.startengine.com/offering/stormalong-cider"
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

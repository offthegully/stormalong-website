"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PatternedSection } from "@/components/patterned-section";
import { motion } from "framer-motion";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { MotionStaggerContainer } from "@/components/animations/motion-stagger-container";
import { MotionStaggerItem } from "@/components/animations/motion-stagger-item";
import { fadeUp } from "@/lib/animation-config";

export function SimpleRespectApple() {
  return (
    <PatternedSection className="py-16 md:py-24">
      <div className="stormalong-container">
        <div className="max-w-4xl mx-auto text-white text-center">
          {/* Gold divider line */}
          <MotionWrapper variants={fadeUp}>
            <div className="w-32 h-0.5 bg-brand-gold mx-auto mb-8"></div>
          </MotionWrapper>

          <MotionWrapper variants={fadeUp} delay={0.1}>
            <h2 className="text-center text-4xl md:text-5xl font-oswald text-white uppercase mb-8">
              WE RESPECT THE APPLE.
            </h2>
          </MotionWrapper>

          {/* Gold divider line */}
          <MotionWrapper variants={fadeUp} delay={0.2}>
            <div className="w-32 h-0.5 bg-brand-gold mx-auto mb-12"></div>
          </MotionWrapper>

          <MotionStaggerContainer delay={0.3} staggerDelay={0.08}>
            <MotionStaggerItem>
              <p className="mb-6 text-lg">
                At Stormalong, we&apos;re committed to quality and taste. Since
                our founding, we have always set out to make delicious cider
                with the highest quality, whole ingredients we can find.
              </p>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mb-6 text-lg">
                All of our ciders are made with 100% REAL, WHOLE, carefully
                sourced local apples which are freshly pressed and fermented
                with care. We never use concentrates, artificial ingredients, or
                chemically concocted &apos;natural&apos; flavors and our ciders
                are all naturally gluten-free.
              </p>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mb-12 text-lg">
                We combine our passion for cider with our thirst for pushing
                boundaries, learning, growing, and furthering our craft. We want
                to showcase what cider can taste-like and bring something
                authentic to the cider scene while continuing to innovate and
                explore in the pursuit of cider&apos;s full potential.
              </p>
            </MotionStaggerItem>
          </MotionStaggerContainer>

          <MotionWrapper variants={fadeUp} delay={0.7}>
            <div className="flex justify-center">
              <Link href="/our-story">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className="bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy uppercase font-oswald tracking-wider px-12 py-6 text-lg border-2"
                  >
                    LEARN MORE
                  </Button>
                </motion.div>
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </PatternedSection>
  );
}

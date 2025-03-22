"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { fadeLeft, fadeRight } from "@/lib/animation-config";
import { PatternedSection } from "@/components/patterned-section";

export function CiderClub() {
  return (
    <PatternedSection className="py-16" opacity={0.85}>
      <div className="stormalong-container">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="text-center">
              {/* Gold divider line */}
              <MotionWrapper variants={fadeRight}>
                <div className="w-32 h-0.5 bg-brand-gold mx-auto mb-8"></div>
              </MotionWrapper>

              <MotionWrapper variants={fadeRight} delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-oswald text-white uppercase mb-8">
                  JOIN OUR RARE APPLE CLUB!
                </h2>
              </MotionWrapper>

              {/* Gold divider line */}
              <MotionWrapper variants={fadeRight} delay={0.2}>
                <div className="w-32 h-0.5 bg-brand-gold mx-auto mb-12"></div>
              </MotionWrapper>
            </div>

            <MotionWrapper variants={fadeRight} delay={0.3}>
              <p className="text-lg mb-6 text-white/90 text-center">
                Members enjoy FIRST access to new product releases and special
                events, as well as a permanent 15% discount on all orders and
                EXCLUSIVE access to special small batch ciders offered only to
                our Rare Apple Club Members.
              </p>
            </MotionWrapper>

            <MotionWrapper variants={fadeRight} delay={0.4}>
              <p className="text-lg mb-12 text-white/90 text-center">
                We hope you'll join us and make it a celebration.
              </p>
            </MotionWrapper>

            <MotionWrapper variants={fadeRight} delay={0.5}>
              <div className="flex justify-center">
                <Link href="/cider-club">
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

          <div className="md:w-1/2">
            <MotionWrapper variants={fadeLeft}>
              <motion.div
                className="overflow-hidden rounded-md shadow-lg h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                >
                  <Image
                    src="/images/cider-club/3-drinks-rare-apple.jpg"
                    alt="Stormalong Cider Club"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                </motion.div>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </PatternedSection>
  );
}

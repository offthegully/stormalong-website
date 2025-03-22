"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { fadeLeft, fadeRight } from "@/lib/animation-config";

export function CiderClub() {
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="stormalong-container">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <MotionWrapper variants={fadeRight}>
              <h2 className="text-3xl font-oswald uppercase text-brand-navy mb-6">
                JOIN OUR RARE APPLE CLUB!
              </h2>
            </MotionWrapper>

            <MotionWrapper variants={fadeRight} delay={0.1}>
              <p className="text-gray-700 mb-6">
                Members enjoy FIRST access to new product releases and special
                events, as well as a permanent 15% discount on all orders and
                EXCLUSIVE access to special small batch ciders offered only to
                our Rare Apple Club Members.
              </p>
            </MotionWrapper>

            <MotionWrapper variants={fadeRight} delay={0.2}>
              <p className="text-gray-700 mb-6">
                We hope you'll join us and make it a celebration.
              </p>
            </MotionWrapper>

            <MotionWrapper variants={fadeRight} delay={0.3}>
              <Link href="/cider-club">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(15, 42, 71, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white uppercase font-oswald tracking-wider">
                    LEARN more
                  </Button>
                </motion.div>
              </Link>
            </MotionWrapper>
          </div>

          <div className="md:w-1/2">
            <MotionWrapper variants={fadeLeft}>
              <motion.div
                className="overflow-hidden rounded-md shadow-lg"
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
                    className="w-full h-auto rounded-md shadow-md"
                  />
                </motion.div>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

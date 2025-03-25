"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotionStaggerContainer } from "@/components/animations/motion-stagger-container";
import { MotionStaggerItem } from "@/components/animations/motion-stagger-item";

export function ShopLinks() {
  return (
    <section className="py-16 bg-white">
      <div className="stormalong-container">
        <MotionStaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MotionStaggerItem>
              {/* Find Our Cider */}
              <Link
                href="/locator"
                className="group relative overflow-hidden rounded-md block"
              >
                <motion.div
                  className="aspect-w-16 aspect-h-9 relative h-[300px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="h-full w-full relative"
                  >
                    <Image
                      src="/images/find-our-cider.jpg"
                      alt="Find Our Cider"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      className="text-white text-2xl md:text-3xl font-oswald uppercase tracking-wider"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      FIND OUR CIDER
                    </motion.h3>
                  </motion.div>
                </motion.div>
              </Link>
            </MotionStaggerItem>

            <MotionStaggerItem>
              {/* Shop Merch */}
              <Link
                href="/store2"
                className="group relative overflow-hidden rounded-md block"
              >
                <motion.div
                  className="aspect-w-16 aspect-h-9 relative h-[300px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="h-full w-full relative"
                  >
                    <Image
                      src="/images/shop-merch.jpg"
                      alt="Shop Merch"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      className="text-white text-2xl md:text-3xl font-oswald uppercase tracking-wider"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      SHOP MERCH
                    </motion.h3>
                  </motion.div>
                </motion.div>
              </Link>
            </MotionStaggerItem>
          </div>
        </MotionStaggerContainer>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { MotionStaggerContainer } from "@/components/animations/motion-stagger-container";
import { MotionStaggerItem } from "@/components/animations/motion-stagger-item";
import { fadeUp } from "@/lib/animation-config";

type CiderProps = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
};

const ciders: CiderProps[] = [
  {
    id: "legendary-dry",
    name: "Legendary Dry",
    imageUrl: "/images/ciders/legendary-dry.png",
    description: "Crisp, Dry & Champagne-Like",
  },
  {
    id: "farmstand-unfiltered",
    name: "Farmstand Unfiltered",
    imageUrl: "/images/ciders/farm-stand.png",
    description: "Tangy, juicy, and refreshing",
  },
  {
    id: "mass-appeal",
    name: "Mass Appeal",
    imageUrl: "/images/ciders/mass-appeal.png",
    description: "Juicy & Semi-Sweet",
  },
  {
    id: "light-of-the-sun",
    name: "Light of the Sun",
    imageUrl: "/images/ciders/light-of-the-sun.png",
    description: "Easy-Drinking, Bright & Citrusy",
  },
];

export function FeaturedCiders() {
  return (
    <section className="py-16 bg-white">
      <div className="stormalong-container">
        <MotionWrapper variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-oswald text-center text-brand-navy uppercase mb-12">
            OUR CIDERS
          </h2>
        </MotionWrapper>

        <MotionStaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ciders.map((cider) => (
              <MotionStaggerItem key={cider.id}>
                <Link
                  href={`/cider/${cider.id}`}
                  className="flex flex-col items-center group"
                >
                  <motion.div
                    className="overflow-hidden mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Image
                        src={cider.imageUrl || "/placeholder.svg"}
                        alt={cider.name}
                        width={200}
                        height={400}
                        className="h-auto w-auto max-h-60 object-contain"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                  <h3 className="font-oswald text-xl text-brand-navy uppercase mb-1 transition-colors duration-300 group-hover:text-brand-gold">
                    {cider.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-2">
                    {cider.description}
                  </p>
                </Link>
              </MotionStaggerItem>
            ))}
          </div>
        </MotionStaggerContainer>

        <MotionWrapper variants={fadeUp} delay={0.4}>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/shop">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(15, 42, 71, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase">
                  BUY NOW
                </Button>
              </motion.div>
            </Link>
            <Link href="/locator">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(15, 42, 71, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-oswald uppercase"
                >
                  FIND OUR CIDER
                </Button>
              </motion.div>
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}

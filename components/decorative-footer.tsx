"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DecorativeFooter() {
  return (
    <div className="w-full bg-white pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-18">
      <div className="stormalong-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative w-full h-[200px] md:h-[250px] lg:h-[325px]">
            <Image
              src="/images/footer-image.jpg"
              alt="Decorative nautical illustration"
              fill
              className="object-contain animate-float"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

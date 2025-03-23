"use client";

import { motion } from "framer-motion";
import { Apple } from "lucide-react";

export function ScrollDownIndicator() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.0,
      }}
      className="flex flex-col items-center cursor-pointer"
      onClick={scrollToNextSection}
    >
      <span className="text-white text-sm mb-2 font-serif tracking-widest">
        SCROLL DOWN
      </span>
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="relative"
      >
        <Apple className="text-amber-400 h-6 w-6" />
        <div className="absolute -inset-2 border border-amber-400/30 rounded-full animate-pulse" />
      </motion.div>
    </motion.div>
  );
}

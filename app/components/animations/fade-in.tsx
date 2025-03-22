"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "bottom" | "top" | "left" | "right";
  distance?: number;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  from = "bottom",
  distance = 24,
}: FadeInProps) {
  const directions = {
    bottom: { y: distance },
    top: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  };

  const initialDirection = directions[from];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...initialDirection,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

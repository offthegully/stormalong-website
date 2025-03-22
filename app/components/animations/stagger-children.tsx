"use client";

import React from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  from?: "bottom" | "top" | "left" | "right";
  staggerDelay?: number;
  baseDelay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  from = "bottom",
  staggerDelay = 0.1,
  baseDelay = 0,
  className = "",
}: StaggerChildrenProps) {
  const directions = {
    bottom: { y: 24 },
    top: { y: -24 },
    left: { x: -24 },
    right: { x: 24 },
  };

  const initialDirection = directions[from];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, ...initialDirection },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

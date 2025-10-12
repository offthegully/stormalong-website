"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { ANIMATION_CONFIG, staggerContainer } from "@/lib/animation-config"

interface MotionStaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
  viewport?: { once?: boolean; amount?: "some" | "all" | number; margin?: string }
  variants?: Variants
}

export function MotionStaggerContainer({
  children,
  className = "",
  delay = 0,
  staggerDelay = ANIMATION_CONFIG.stagger.medium,
  once = true,
  viewport = ANIMATION_CONFIG.viewport,
  variants = staggerContainer,
}: MotionStaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewport)

  const containerVariants = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...variants.visible.transition,
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

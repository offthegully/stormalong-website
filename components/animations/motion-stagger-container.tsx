"use client"

import { motion, useInView, type Variants, type UseInViewOptions } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { ANIMATION_CONFIG, staggerContainer } from "@/lib/animation-config"

interface MotionStaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
  viewport?: UseInViewOptions
  variants?: Variants
}

export function MotionStaggerContainer({
  children,
  className = "",
  delay = 0,
  staggerDelay = ANIMATION_CONFIG.stagger.medium,
  once = true,
  viewport = ANIMATION_CONFIG.viewport as unknown as UseInViewOptions,
  variants = staggerContainer,
}: MotionStaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewport)

  const containerVariants: Variants = {
    ...variants,
    visible: {
      ...(variants as any).visible,
      transition: {
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

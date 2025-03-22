"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { ANIMATION_CONFIG, fadeUp } from "@/lib/animation-config"

interface MotionWrapperProps {
  children: ReactNode
  variants?: any
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  viewport?: any
  transition?: any
  initial?: any
  animate?: any
  whileHover?: any
  whileTap?: any
  whileInView?: any
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function MotionWrapper({
  children,
  variants,
  delay = 0,
  duration = ANIMATION_CONFIG.duration.medium,
  className = "",
  once = true,
  viewport = ANIMATION_CONFIG.viewport,
  transition,
  initial = "hidden",
  animate,
  whileHover,
  whileTap,
  whileInView = "visible",
  direction,
}: MotionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewport)

  // If animate is provided, use it; otherwise use isInView to determine animation state
  const animateValue = animate || (isInView ? whileInView : initial)

  // If direction is provided but no variants, use the appropriate direction variant
  const finalVariants = variants || (direction ? getDirectionVariant(direction) : fadeUp)

  return (
    <motion.div
      ref={ref}
      variants={finalVariants}
      initial={initial}
      animate={animateValue}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={
        transition || {
          duration,
          delay,
          ease: ANIMATION_CONFIG.ease.smooth,
        }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Helper function to get the appropriate variant based on direction
function getDirectionVariant(direction: "up" | "down" | "left" | "right" | "none") {
  switch (direction) {
    case "up":
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }
    case "down":
      return {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }
    case "left":
      return {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
      }
    case "right":
      return {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
  }
}


"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"
import { fadeUp } from "@/lib/animation-config"

interface MotionStaggerItemProps {
  children: ReactNode
  className?: string
  variants?: Variants
  custom?: unknown
}

export function MotionStaggerItem({ children, className = "", variants = fadeUp, custom }: MotionStaggerItemProps) {
  return (
    <motion.div variants={variants} custom={custom} className={className}>
      {children}
    </motion.div>
  )
}

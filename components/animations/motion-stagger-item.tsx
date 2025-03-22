"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { fadeUp } from "@/lib/animation-config"

interface MotionStaggerItemProps {
  children: ReactNode
  className?: string
  variants?: any
  custom?: any
}

export function MotionStaggerItem({ children, className = "", variants = fadeUp, custom }: MotionStaggerItemProps) {
  return (
    <motion.div variants={variants} custom={custom} className={className}>
      {children}
    </motion.div>
  )
}


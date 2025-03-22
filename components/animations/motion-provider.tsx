"use client"

import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface MotionProviderProps {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname()

  return <AnimatePresence mode="wait">{children}</AnimatePresence>
}


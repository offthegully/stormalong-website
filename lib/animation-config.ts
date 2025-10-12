import type { Easing, Variants } from "framer-motion"

// Animation configuration constants for consistent animations across the site
export const ANIMATION_CONFIG = {
  // Durations (in seconds)
  duration: {
    fast: 0.2,
    medium: 0.3,
    slow: 0.5,
    extraSlow: 0.8,
  },

  // Easing functions
  ease: {
    // Smooth, natural motion
    smooth: [0.25, 0.1, 0.25, 1.0] as const,
    // Bouncy, playful motion
    bounce: [0.175, 0.885, 0.32, 1.275] as const,
    // Quick acceleration, gradual deceleration
    easeOut: [0.0, 0.0, 0.2, 1.0] as const,
    // Gradual acceleration, quick deceleration
    easeIn: [0.4, 0.0, 1, 1] as const,
  },

  // Standard delays
  delay: {
    none: 0,
    minimal: 0.05,
    short: 0.1,
    medium: 0.2,
    long: 0.3,
  },

  // Stagger timing
  stagger: {
    fast: 0.03,
    medium: 0.05,
    slow: 0.08,
  },

  // Viewport margins for triggering animations
  viewport: {
    once: true,
    margin: "0px 0px -100px 0px",
  },
} as const

// Common animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth as unknown as Easing,
    },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth as unknown as Easing,
    },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth as unknown as Easing,
    },
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth as unknown as Easing,
    },
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth as unknown as Easing,
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.medium,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth as unknown as Easing,
    },
  },
}

export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.easeOut as unknown as Easing,
      when: "beforeChildren",
      staggerChildren: ANIMATION_CONFIG.stagger.medium,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.easeIn as unknown as Easing,
    },
  },
} as const

import { useReducedMotion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
}

export const snappyTransition: Transition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
}

const noopVariants: Variants = {
  hidden: {},
  visible: {},
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: defaultTransition },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: defaultTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: defaultTransition },
}

export function staggerContainer(
  stagger = 0.1,
  delay = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }
}

export function useMotionPreference() {
  const prefersReduced = useReducedMotion()
  return {
    prefersReduced: Boolean(prefersReduced),
    variants: (v: Variants) => (prefersReduced ? noopVariants : v),
    container: (stagger?: number, delay?: number) =>
      prefersReduced ? noopVariants : staggerContainer(stagger, delay),
  }
}

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'

// --- Animation registry (module-level, survives remounts, resets on full reload) ---

const playedAnimations = new Set<string>()

function hasPlayed(key: string): boolean {
  return playedAnimations.has(key)
}

function markPlayed(key: string): void {
  playedAnimations.add(key)
}

// --- Transitions ---

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
}

export const snappyTransition: Transition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
}

// --- Variants ---

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

export const navSlide: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: snappyTransition },
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

// --- useAnimateOnce hook ---

export function useAnimateOnce(key: string, viewportAmount = 0.2) {
  const prefersReduced = useReducedMotion()
  const played = hasPlayed(key)
  const markedRef = useRef(false)

  useEffect(() => {
    if (!markedRef.current) {
      markPlayed(key)
      markedRef.current = true
    }
  }, [key])

  const variants = (v: Variants) => (prefersReduced ? noopVariants : v)
  const container = (stagger?: number, delay?: number) =>
    prefersReduced ? noopVariants : staggerContainer(stagger, delay)

  // For initial/animate components (Hero, Nav, Projects page hero/filter)
  const mountProps = played
    ? { initial: false as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const }

  // For whileInView components (About, TechStack, Services, etc.)
  const inViewProps = played
    ? { initial: false as const, animate: 'visible' as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: viewportAmount },
      }

  return {
    mountProps,
    inViewProps,
    variants,
    container,
    prefersReduced: Boolean(prefersReduced),
  }
}

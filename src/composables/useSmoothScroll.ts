import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isClient } from '@/lib/motion'

let lenis: Lenis | null = null
let registered = false

/**
 * Single smooth-scroll instance bridged to the GSAP ticker so Lenis and
 * ScrollTrigger share one rAF loop (no competing loops). Disabled entirely
 * under prefers-reduced-motion — native scroll is used instead.
 */
export function initSmoothScroll(): Lenis | null {
  if (!isClient() || lenis) return lenis

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }

  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time: number) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function destroySmoothScroll(): void {
  lenis?.destroy()
  lenis = null
}

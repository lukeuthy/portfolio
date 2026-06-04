import type { Directive, DirectiveBinding } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ── v-reveal: fade/slide a block in when it enters the viewport ──
   The reveal classes are only attached on the client at mount, so the
   prerendered (no-JS) HTML keeps content fully visible for SEO. */
const revealObservers = new WeakMap<HTMLElement, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding: DirectiveBinding<number | undefined>) {
    if (prefersReducedMotion()) return
    const delay = Number(binding.value ?? 0)
    el.classList.add('reveal-init')
    el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal-in')
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    revealObservers.set(el, io)
  },
  unmounted(el) {
    revealObservers.get(el)?.disconnect()
    revealObservers.delete(el)
  },
}

/* ── v-tilt: pointer-driven 3D tilt ── */
interface Handlers {
  move: (e: PointerEvent) => void
  leave: () => void
}
const tiltHandlers = new WeakMap<HTMLElement, Handlers>()

export const vTilt: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding: DirectiveBinding<number | undefined>) {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const max = Number(binding.value ?? 8)
    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform 0.2s ease'
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-6px)`
    }
    const leave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    tiltHandlers.set(el, { move, leave })
  },
  unmounted(el) {
    const h = tiltHandlers.get(el)
    if (h) {
      el.removeEventListener('pointermove', h.move)
      el.removeEventListener('pointerleave', h.leave)
    }
    tiltHandlers.delete(el)
  },
}

/* ── v-scrub: scroll-scrubbed transform (parallax / drift / flip) ──
   Binding value describes start→end ranges; the tween is linked to the
   element's own scroll progress so each section can move differently. */
export interface ScrubOpts {
  y?: [number, number]
  x?: [number, number]
  rotate?: [number, number]
  scale?: [number, number]
  opacity?: [number, number]
  start?: string
  end?: string
}
const scrubTweens = new WeakMap<HTMLElement, gsap.core.Tween>()

export const vScrub: Directive<HTMLElement, ScrubOpts | undefined> = {
  mounted(el, binding: DirectiveBinding<ScrubOpts | undefined>) {
    if (prefersReducedMotion()) return
    const o = binding.value ?? {}
    const fromVars: gsap.TweenVars = {}
    const toVars: gsap.TweenVars = { ease: 'none' }
    if (o.y) {
      fromVars.y = o.y[0]
      toVars.y = o.y[1]
    }
    if (o.x) {
      fromVars.x = o.x[0]
      toVars.x = o.x[1]
    }
    if (o.rotate) {
      fromVars.rotationY = o.rotate[0]
      toVars.rotationY = o.rotate[1]
      fromVars.transformPerspective = 800
    }
    if (o.scale) {
      fromVars.scale = o.scale[0]
      toVars.scale = o.scale[1]
    }
    if (o.opacity) {
      fromVars.opacity = o.opacity[0]
      toVars.opacity = o.opacity[1]
    }
    const tween = gsap.fromTo(el, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start: o.start ?? 'top bottom',
        end: o.end ?? 'bottom top',
        scrub: true,
      },
    })
    scrubTweens.set(el, tween)
  },
  unmounted(el) {
    const tween = scrubTweens.get(el)
    tween?.scrollTrigger?.kill()
    tween?.kill()
    scrubTweens.delete(el)
  },
}

/* ── v-magnetic: button drifts toward the cursor ── */
const magHandlers = new WeakMap<HTMLElement, Handlers>()

export const vMagnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding: DirectiveBinding<number | undefined>) {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const strength = Number(binding.value ?? 0.3)
    el.style.transition = 'transform 0.2s ease'
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) * strength
      const dy = (e.clientY - r.top - r.height / 2) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const leave = () => {
      el.style.transform = 'translate(0, 0)'
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    magHandlers.set(el, { move, leave })
  },
  unmounted(el) {
    const h = magHandlers.get(el)
    if (h) {
      el.removeEventListener('pointermove', h.move)
      el.removeEventListener('pointerleave', h.leave)
    }
    magHandlers.delete(el)
  },
}

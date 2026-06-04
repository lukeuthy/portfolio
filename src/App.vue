<script setup lang="ts">
import { onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll, destroySmoothScroll, getLenis } from '@/composables/useSmoothScroll'
import { setBackgroundScroll } from '@/composables/useThreeBackground'
import Navbar from '@/components/layout/Navbar.vue'
import CursorGlow from '@/components/layout/CursorGlow.vue'
import Footer from '@/components/layout/Footer.vue'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Projects from '@/components/sections/Projects.vue'
import GitHub from '@/components/sections/GitHub.vue'
import Organizations from '@/components/sections/Organizations.vue'
import Certifications from '@/components/sections/Certifications.vue'

// Code-split the WebGL background into its own chunk; only loads on the client.
const SceneBackground = defineAsyncComponent(
  () => import('@/components/background/SceneBackground.vue'),
)

let onScroll: (() => void) | null = null

onMounted(() => {
  initSmoothScroll()

  const lenis = getLenis()
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? window.scrollY / max : 0
    setBackgroundScroll(progress)
  }
  if (lenis) {
    lenis.on('scroll', update)
  } else {
    onScroll = update
    window.addEventListener('scroll', update, { passive: true })
  }
  update()

  // Recalculate scroll positions once async background + fonts settle.
  setTimeout(() => ScrollTrigger.refresh(), 250)
  window.addEventListener('load', () => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  destroySmoothScroll()
  if (onScroll) window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <SceneBackground />

  <CursorGlow />
  <Navbar />

  <main class="relative" style="z-index: 1">
    <Hero />
    <About />
    <Projects />
    <GitHub />
    <Organizations />
    <Certifications />
    <Footer />
  </main>

  <!-- CRT scanline + vignette over everything -->
  <div class="crt-overlay" aria-hidden="true" />
</template>

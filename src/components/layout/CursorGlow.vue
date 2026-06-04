<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const glow = ref<HTMLDivElement | null>(null)
let raf = 0

onMounted(() => {
  const el = glow.value
  if (!el || typeof window === 'undefined') return
  let cx = window.innerWidth / 2
  let cy = window.innerHeight / 2
  let tx = cx
  let ty = cy

  const onMove = (e: MouseEvent) => {
    tx = e.clientX
    ty = e.clientY
  }
  const tick = () => {
    cx += (tx - cx) * 0.08
    cy += (ty - cy) * 0.08
    el.style.left = `${cx}px`
    el.style.top = `${cy}px`
    raf = requestAnimationFrame(tick)
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(tick)

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <div
    ref="glow"
    class="fixed pointer-events-none z-[55] hidden md:block"
    aria-hidden="true"
    style="
      width: 480px;
      height: 480px;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(120,80,255,0.08) 0%, rgba(56,189,248,0.05) 40%, transparent 70%);
      filter: blur(2px);
    "
  />
</template>

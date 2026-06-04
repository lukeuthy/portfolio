<script setup lang="ts">
import { ref } from 'vue'
import { useThreeBackground } from '@/composables/useThreeBackground'

const container = ref<HTMLElement | null>(null)
useThreeBackground(container)
</script>

<template>
  <div ref="container" class="scene-bg" aria-hidden="true" />
</template>

<style scoped>
.scene-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  /* Static fallback shown until/if WebGL never paints (reduced motion, no GL) */
  background: linear-gradient(180deg, #05030a 0%, #1a0830 55%, #0b0718 100%);
}
</style>

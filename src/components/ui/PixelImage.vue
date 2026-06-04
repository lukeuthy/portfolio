<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * Renders any photo as low-bitrate pixel art to match the arcade theme:
 * downscale to a small buffer, posterize each channel to `levels`, apply
 * ordered (Bayer 4x4) dithering, then CSS-upscale with nearest-neighbour.
 */
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    /** Longest side of the low-res buffer (smaller = chunkier). */
    resolution?: number
    /** Colour levels per channel. */
    levels?: number
    dither?: boolean
  }>(),
  { alt: '', resolution: 120, levels: 6, dither: true },
)

const emit = defineEmits<{ loaded: []; error: [] }>()

const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

// 4x4 Bayer matrix, normalised to 0..1
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => v / 16))

onMounted(() => {
  const img = new Image()
  img.crossOrigin = 'anonymous'

  img.onload = () => {
    const cv = canvas.value
    if (!cv) return
    const longest = Math.max(img.width, img.height)
    const scale = props.resolution / longest
    const w = Math.max(8, Math.round(img.width * scale))
    const h = Math.max(8, Math.round(img.height * scale))
    cv.width = w
    cv.height = h
    const ctx = cv.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = true // smooth on the way DOWN
    ctx.drawImage(img, 0, 0, w, h)

    const levels = Math.max(2, props.levels)
    const step = 255 / (levels - 1)
    const image = ctx.getImageData(0, 0, w, h)
    const d = image.data
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4
        const t = props.dither ? (BAYER[y % 4][x % 4] - 0.5) * step : 0
        for (let c = 0; c < 3; c++) {
          const v = d[i + c] + t
          d[i + c] = Math.min(255, Math.max(0, Math.round(v / step) * step))
        }
      }
    }
    ctx.putImageData(image, 0, 0)

    ready.value = true
    emit('loaded')
  }

  img.onerror = () => emit('error')
  img.src = props.src
})
</script>

<template>
  <canvas
    ref="canvas"
    class="pixelated block w-full h-auto"
    :class="{ 'opacity-0': !ready }"
    role="img"
    :aria-label="alt"
  />
</template>

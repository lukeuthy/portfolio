import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as THREE from 'three'
import { backgroundVert, backgroundFrag } from '@/three/shaders'
import { prefersReducedMotion } from '@/lib/motion'

// Module-level handles so scroll-driven uniforms can be updated from anywhere
// (Phase 7 wires these to Lenis progress / section detection).
let scrollUniform: { value: number } | null = null
let tintUniform: { value: THREE.Color } | null = null
let invalidate: (() => void) | null = null

export function setBackgroundScroll(progress: number): void {
  if (scrollUniform) scrollUniform.value = progress
  invalidate?.()
}

export function setBackgroundTint(hex: string): void {
  tintUniform?.value.set(hex)
  invalidate?.()
}

/** Pixel chunk size — bigger on weak devices (cheaper and more on-brand). */
function pickPixelSize(): number {
  const cores = navigator.hardwareConcurrency ?? 4
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (coarse || cores <= 4) return 6
  return 4
}

export function useThreeBackground(container: Ref<HTMLElement | null>): void {
  let renderer: THREE.WebGLRenderer | null = null
  let material: THREE.ShaderMaterial | null = null
  let raf = 0
  let running = false
  let pixelSize = 4
  let reduce = false
  let startTime = 0

  const scene = new THREE.Scene()
  const camera = new THREE.Camera()

  function size(): { w: number; h: number } {
    return {
      w: Math.max(1, Math.ceil(window.innerWidth / pixelSize)),
      h: Math.max(1, Math.ceil(window.innerHeight / pixelSize)),
    }
  }

  function onResize() {
    if (!renderer || !material) return
    const { w, h } = size()
    renderer.setSize(w, h, false) // false → keep CSS size; canvas buffer stays low-res
    material.uniforms.uRes.value.set(w, h)
    invalidate?.()
  }

  function renderOnce() {
    if (!renderer || !material) return
    material.uniforms.uTime.value = (performance.now() - startTime) / 1000
    renderer.render(scene, camera)
  }

  function loop() {
    if (!running) return
    renderOnce()
    raf = requestAnimationFrame(loop)
  }

  function start() {
    if (running || reduce) return
    running = true
    loop()
  }
  function stop() {
    running = false
    if (raf) cancelAnimationFrame(raf)
  }

  function onVisibility() {
    if (document.hidden) stop()
    else start()
  }

  onMounted(() => {
    const el = container.value
    if (!el || typeof window === 'undefined') return

    pixelSize = pickPixelSize()
    reduce = prefersReducedMotion()
    startTime = performance.now()

    const { w, h } = size()
    renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(1)
    renderer.setSize(w, h, false)
    const canvas = renderer.domElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.classList.add('pixelated')
    el.appendChild(canvas)

    material = new THREE.ShaderMaterial({
      vertexShader: backgroundVert,
      fragmentShader: backgroundFrag,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(w, h) },
        uScroll: { value: 0 },
        uReduce: { value: reduce ? 1 : 0 },
        uTint: { value: new THREE.Color('#ffffff') },
      },
      depthTest: false,
      depthWrite: false,
    })
    scrollUniform = material.uniforms.uScroll
    tintUniform = material.uniforms.uTint
    invalidate = renderOnce

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    quad.frustumCulled = false
    scene.add(quad)

    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    if (reduce) {
      renderOnce() // single static frame
    } else {
      start()
    }
  })

  onBeforeUnmount(() => {
    stop()
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    scrollUniform = null
    tintUniform = null
    invalidate = null
    material?.dispose()
    renderer?.dispose()
    if (renderer?.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement)
    }
    renderer = null
  })
}

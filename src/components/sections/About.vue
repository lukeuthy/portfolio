<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, type FunctionalComponent } from 'vue'
import { CodeXml, Cpu, Globe, Layers } from '@lucide/vue'
import { profile } from '@/data/profile'
import { skills, stats } from '@/data/skills'

const statIcons: Record<string, unknown> = {
  Code2: CodeXml,
  CodeXml,
  Globe,
  Layers,
  Cpu,
}

const counts = reactive(stats.map(() => 0))
const grid = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function runCounters() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  stats.forEach((s, i) => {
    if (reduce) {
      counts[i] = s.target
      return
    }
    const steps = 40
    let step = 0
    const id = setInterval(() => {
      step++
      counts[i] = Math.round(s.target * (step / steps))
      if (step >= steps) clearInterval(id)
    }, 28)
  })
}

onMounted(() => {
  if (!grid.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runCounters()
          observer?.disconnect()
        }
      })
    },
    { threshold: 0.3 },
  )
  observer.observe(grid.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="about" class="relative py-24 md:py-32 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div v-reveal class="mb-16">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-cyan)">// About Me</p>
        </div>
        <h2 class="text-2xl md:text-4xl" style="color: var(--text-primary)">
          WHO I <span class="gradient-text-cyan-violet">AM</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Left: bio + stats -->
        <div v-scrub="{ y: [40, -40] }" class="space-y-6">
          <p v-for="(para, i) in profile.bio" :key="i" class="text-base md:text-lg leading-relaxed" style="color: var(--text-secondary)">
            {{ para }}
          </p>

          <div ref="grid" class="grid grid-cols-2 gap-3 pt-4">
            <div
              v-for="(s, i) in stats"
              :key="s.label"
              v-tilt="6"
              class="panel shimmer-card p-5 flex items-center gap-3"
            >
              <div class="p-2.5 shrink-0" :style="{ background: s.color + '1f', border: '2px solid ' + s.color + '40' }">
                <component :is="(statIcons[s.icon] as FunctionalComponent)" :size="18" :style="{ color: s.color }" />
              </div>
              <div>
                <p class="text-2xl" style="color: var(--text-primary); font-family: var(--font-pixel)">
                  {{ counts[i] }}{{ s.suffix }}
                </p>
                <p class="text-[11px] font-mono" style="color: var(--text-muted)">{{ s.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: skills -->
        <div v-scrub="{ y: [-40, 40] }" class="space-y-7">
          <div v-for="group in skills" :key="group.category">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2 h-2" :style="{ background: group.color, boxShadow: '0 0 8px ' + group.color }" />
              <h3 class="text-[10px] uppercase tracking-[0.2em]" style="color: var(--text-primary); font-family: var(--font-display)">
                {{ group.category }}
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in group.items"
                :key="skill"
                class="px-3 py-1.5 text-xs font-mono cursor-default transition-all duration-150 hover:-translate-y-0.5"
                :style="{
                  background: 'rgba(18,26,70,0.7)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)',
                }"
                @mouseenter="(e) => { const t = e.target as HTMLElement; t.style.borderColor = group.color; t.style.color = group.color }"
                @mouseleave="(e) => { const t = e.target as HTMLElement; t.style.borderColor = 'rgba(255,255,255,0.1)'; t.style.color = 'var(--text-secondary)' }"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

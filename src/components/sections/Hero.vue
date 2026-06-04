<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ChevronDown, Download } from '@lucide/vue'
import { socialIcon } from '@/components/icons/brand'
import { profile, codeSnippets } from '@/data/profile'
import { socials } from '@/data/socials'

/* ── Typewriter ─────────────────────────────────── */
const typed = ref('')
let timer: ReturnType<typeof setTimeout> | null = null
let index = 0
let deleting = false

function loop() {
  const word = profile.roles[index % profile.roles.length]
  if (!deleting && typed.value === word) {
    timer = setTimeout(() => { deleting = true; loop() }, 2000)
    return
  }
  if (deleting && typed.value === '') {
    deleting = false
    index++
    timer = setTimeout(loop, 200)
    return
  }
  typed.value = deleting
    ? word.slice(0, typed.value.length - 1)
    : word.slice(0, typed.value.length + 1)
  timer = setTimeout(loop, deleting ? 40 : 75)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    typed.value = profile.roles[0]
  } else {
    loop()
  }
})
onBeforeUnmount(() => { if (timer) clearTimeout(timer) })

/* Decorative floating fragments scattered across the hero */
const fragments = [
  { text: codeSnippets[0], x: '8%', y: '20%' },
  { text: codeSnippets[1], x: '72%', y: '14%' },
  { text: codeSnippets[2], x: '83%', y: '40%' },
  { text: codeSnippets[3], x: '6%', y: '64%' },
  { text: codeSnippets[7], x: '44%', y: '10%' },
  { text: codeSnippets[5], x: '60%', y: '82%' },
]
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Floating code fragments -->
    <span
      v-for="(f, i) in fragments"
      :key="i"
      class="absolute select-none pointer-events-none text-[11px] font-mono whitespace-nowrap hero-float"
      :style="{ left: f.x, top: f.y, color: 'rgba(167,139,250,0.3)', animationDelay: `${i * 0.7}s` }"
    >{{ f.text }}</span>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-20 w-full">
      <div
        v-scrub="{ y: [0, -90], opacity: [1, 0.15], start: 'top top', end: 'bottom top' }"
        class="flex flex-col items-start"
      >
        <!-- Status badge -->
        <span
          class="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest mb-8"
          style="background: rgba(74,222,128,0.1); border: 2px solid rgba(74,222,128,0.35); color: var(--accent-green)"
        >
          <span class="w-2 h-2 caret" style="background: var(--accent-green); box-shadow: 0 0 8px var(--accent-green)" />
          {{ profile.status }}
        </span>

        <!-- Headline -->
        <h1
          class="leading-[0.95] mb-6 text-[var(--text-primary)]"
          style="font-family: var(--font-pixel); font-size: clamp(3.5rem, 11vw, 8rem)"
        >
          HI, I'M
          <span class="gradient-text-cyan-violet text-glow-violet">{{ profile.firstName }}</span>
        </h1>

        <!-- Typewriter -->
        <div
          class="text-lg md:text-2xl mb-8 flex items-center"
          style="font-family: var(--font-display); min-height: 2.5rem"
        >
          <span class="gradient-text-cyan-violet text-glow-cyan">{{ typed }}</span>
          <span class="inline-block w-[10px] h-5 md:h-6 ml-1 caret" style="background: var(--accent-cyan)" />
        </div>

        <!-- Bio -->
        <p class="max-w-xl text-base md:text-lg leading-relaxed mb-10" style="color: var(--text-secondary)">
          {{ profile.heroBio }}
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4 mb-12">
          <a
            v-magnetic="0.25"
            href="#projects"
            class="px-8 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer text-[#05030a]"
            style="background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet)); border: 2px solid var(--accent-cyan); box-shadow: 0 4px 0 rgba(0,0,0,0.4)"
          >
            View Projects
          </a>
          <a
            v-magnetic="0.25"
            :href="profile.resume"
            class="panel shimmer-card px-8 py-3.5 text-xs font-mono uppercase tracking-widest flex items-center gap-2 cursor-pointer"
            style="color: var(--text-primary)"
          >
            <Download :size="14" />
            Resume
          </a>
        </div>

        <!-- Socials -->
        <div class="flex items-center gap-3">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="panel p-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-1 text-[var(--text-muted)] hover:text-[var(--accent-violet)]"
            :aria-label="s.label"
          >
            <component :is="socialIcon[s.icon]" :size="17" />
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style="color: var(--text-muted)"
    >
      <span class="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
      <ChevronDown :size="16" class="hero-bob" />
    </div>
  </section>
</template>

<style scoped>
.hero-float {
  animation: hero-float 6s ease-in-out infinite;
}
@keyframes hero-float {
  0%, 100% { transform: translateY(0); opacity: 0.25; }
  50% { transform: translateY(-16px); opacity: 0.6; }
}
.hero-bob {
  animation: hero-bob 1.4s ease-in-out infinite;
}
@keyframes hero-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
</style>

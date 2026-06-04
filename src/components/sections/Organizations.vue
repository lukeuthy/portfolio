<script setup lang="ts">
import { ExternalLink, Globe } from '@lucide/vue'
import { organizations } from '@/data/organizations'
</script>

<template>
  <section id="organizations" class="relative py-24 md:py-32 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div v-reveal class="mb-16">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-cyan)">// Community</p>
        </div>
        <h2 class="text-2xl md:text-4xl gradient-text-green-cyan">ORGANIZATIONS</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <div
          v-for="(org, i) in organizations"
          :key="org.name"
          v-scrub="{ y: i === 0 ? [50, -50] : [-50, 50] }"
          class="h-full"
        >
        <article
          v-tilt="6"
          class="panel shimmer-card relative p-6 flex flex-col gap-5 h-full overflow-hidden"
        >
          <div class="absolute inset-0 pointer-events-none" :style="{ background: org.bgPattern }" />
          <span
            class="absolute top-0 left-0 right-0"
            :style="{ height: '3px', background: `linear-gradient(90deg, transparent, ${org.accentColor}, transparent)` }"
          />

          <div class="flex items-start justify-between relative z-10">
            <div class="flex items-center gap-4">
              <div
                class="org-logo w-12 h-12 flex items-center justify-center text-[10px]"
                :style="{ background: org.accentColor + '1f', border: `2px solid ${org.accentColor}40`, color: org.accentColor, fontFamily: 'var(--font-display)' }"
              >
                {{ org.logo }}
              </div>
              <div>
                <h3 class="text-sm" style="color: var(--text-primary); font-family: var(--font-display)">{{ org.name }}</h3>
                <p class="text-[11px] font-mono mt-1" style="color: var(--text-muted)">{{ org.role }}</p>
              </div>
            </div>
            <a
              :href="org.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 cursor-pointer transition-transform hover:scale-110 text-[var(--text-muted)]"
              style="background: rgba(255,255,255,0.05)"
              :aria-label="`Visit ${org.name}`"
              @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = org.accentColor)"
              @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')"
            >
              <ExternalLink :size="14" />
            </a>
          </div>

          <p class="text-sm leading-relaxed relative z-10" style="color: var(--text-secondary)">{{ org.description }}</p>

          <div class="flex items-center gap-3 pt-3 relative z-10" style="border-top: 2px solid rgba(255,255,255,0.07)">
            <span
              class="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1"
              :style="{ background: org.accentColor + '14', border: `2px solid ${org.accentColor}28`, color: org.accentColor }"
            >
              <Globe :size="10" />
              {{ org.type }}
            </span>
          </div>
        </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.org-logo {
  animation: pulse-glow 3s ease-in-out infinite;
}
</style>

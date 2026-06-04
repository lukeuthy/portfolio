<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLink, Star, Zap } from '@lucide/vue'
import { GithubIcon } from '@/components/icons/brand'
import { projects, categories } from '@/data/projects'
import { GITHUB_USERNAME } from '@/data/github'

const filter = ref<string>('All')
const filtered = computed(() =>
  filter.value === 'All' ? projects : projects.filter((p) => p.category === filter.value),
)
</script>

<template>
  <section id="projects" class="relative py-24 md:py-32 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div v-reveal class="mb-12">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-violet), var(--accent-pink))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-violet)">// Work</p>
        </div>
        <h2 class="text-2xl md:text-4xl" style="color: var(--text-primary)">
          FEATURED <span class="gradient-text-violet-pink">PROJECTS</span>
        </h2>
      </div>

      <!-- Filter -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider cursor-pointer transition-all duration-150"
          :style="
            filter === cat
              ? 'background:linear-gradient(135deg,rgba(167,139,250,0.25),rgba(244,114,182,0.15));border:2px solid rgba(167,139,250,0.5);color:var(--accent-violet)'
              : 'background:rgba(18,26,70,0.7);border:2px solid rgba(255,255,255,0.08);color:var(--text-muted)'
          "
          @click="filter = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div v-scrub="{ y: [60, -30] }" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="p in filtered"
          :key="p.title"
          v-tilt="7"
          class="panel shimmer-card relative p-6 flex flex-col gap-4 h-full"
        >
          <!-- accent top bar -->
          <span
            class="absolute top-0 left-0 right-0"
            :style="{ height: '3px', background: `linear-gradient(90deg, transparent, ${p.accentColor}, transparent)` }"
          />

          <header class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl pixelated">{{ p.icon }}</span>
              <div>
                <h3 class="text-sm" style="color: var(--text-primary); font-family: var(--font-display)">{{ p.title }}</h3>
                <span
                  class="text-[10px] font-mono px-2 py-0.5 mt-1 inline-block"
                  :style="{ background: p.accentColor + '1f', border: `2px solid ${p.accentColor}35`, color: p.accentColor }"
                >{{ p.category }}</span>
              </div>
            </div>
            <span
              v-if="p.featured"
              class="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5"
              style="background: rgba(167,139,250,0.12); border: 2px solid rgba(167,139,250,0.3); color: var(--accent-violet)"
            >
              <Zap :size="9" fill="currentColor" /> FEAT
            </span>
          </header>

          <p class="text-sm leading-relaxed flex-1" style="color: var(--text-secondary)">{{ p.description }}</p>

          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="text-[10px] font-mono px-2.5 py-0.5"
              style="background: rgba(120,140,255,0.08); border: 2px solid rgba(255,255,255,0.08); color: var(--text-muted)"
            >{{ tag }}</span>
          </div>

          <footer class="flex items-center justify-between pt-3" style="border-top: 2px solid rgba(255,255,255,0.07)">
            <div class="flex items-center gap-1.5 text-sm" style="color: var(--accent-amber)">
              <template v-if="p.stars > 0">
                <Star :size="13" fill="currentColor" />
                <span class="font-mono">{{ p.stars }}</span>
              </template>
            </div>
            <div class="flex items-center gap-1">
              <a
                :href="p.github"
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 cursor-pointer transition-transform hover:scale-125 text-[var(--text-muted)]"
                :aria-label="`${p.title} on GitHub`"
                @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = p.accentColor)"
                @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')"
              >
                <GithubIcon :size="15" />
              </a>
              <a
                v-if="p.live"
                :href="p.live"
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 cursor-pointer transition-transform hover:scale-125 text-[var(--text-muted)]"
                aria-label="Live link"
                @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = p.accentColor)"
                @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')"
              >
                <ExternalLink :size="15" />
              </a>
            </div>
          </footer>
        </article>
      </div>

      <div class="mt-10 flex justify-center">
        <a
          :href="`https://github.com/${GITHUB_USERNAME}`"
          target="_blank"
          rel="noopener noreferrer"
          class="panel shimmer-card inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-200 hover:-translate-y-1 text-[var(--text-secondary)] hover:text-[var(--accent-violet)]"
        >
          <GithubIcon :size="15" />
          View All Repositories
        </a>
      </div>
    </div>
  </section>
</template>

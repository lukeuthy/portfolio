<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Star, GitFork, BookOpen, Users, TrendingUp } from '@lucide/vue'
import { GithubIcon } from '@/components/icons/brand'
import { GITHUB_USERNAME, CELL_COLORS, MONTHS, FALLBACK_STATS } from '@/data/github'
import type { GithubStats } from '@/types'

const stats = ref<GithubStats>(FALLBACK_STATS)
const live = ref(false)

onMounted(async () => {
  try {
    const res = await fetch('/api/github')
    if (!res.ok) return
    const data = (await res.json()) as GithubStats
    // Only adopt the live payload if it carries a usable grid.
    if (data && data.grid) {
      stats.value = data
      live.value = true
    }
  } catch {
    /* keep deterministic fallback */
  }
})

const grid = computed(() => stats.value.grid ?? FALLBACK_STATS.grid!)
const maxMonthly = computed(() => stats.value.maxMonthly || 1)

const statCards = computed(() => [
  { icon: Star, value: live.value ? stats.value.totalStars : '—', label: 'Stars earned', color: 'var(--accent-amber)' },
  { icon: GitFork, value: live.value ? stats.value.totalForks : '—', label: 'Forks', color: 'var(--accent-violet)' },
  { icon: BookOpen, value: live.value ? stats.value.publicRepos : '—', label: 'Public repos', color: 'var(--accent-cyan)' },
  { icon: Users, value: live.value ? stats.value.followers : '—', label: 'Followers', color: 'var(--accent-green)' },
])
</script>

<template>
  <section id="github" class="relative py-24 md:py-32 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div v-reveal class="mb-16">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-green)">// Open Source</p>
        </div>
        <h2 class="text-2xl md:text-4xl" style="color: var(--text-primary)">
          GITHUB <span class="gradient-text-green-cyan">ACTIVITY</span>
        </h2>
      </div>

      <!-- Stat cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          v-for="card in statCards"
          :key="card.label"
          v-tilt="6"
          class="panel shimmer-card relative p-5"
        >
          <component :is="card.icon" :size="18" :style="{ color: card.color }" class="mb-3" />
          <p class="text-2xl" style="color: var(--text-primary); font-family: var(--font-pixel)">{{ card.value }}</p>
          <p class="text-[11px] font-mono mt-1" style="color: var(--text-muted)">{{ card.label }}</p>
        </div>
      </div>

      <!-- Heatmap -->
      <div v-scrub="{ x: [-50, 0], opacity: [0.35, 1] }" class="panel p-6 mb-5 overflow-x-auto">
        <div class="flex items-center justify-between mb-5">
          <p class="text-xs font-mono uppercase tracking-wider flex items-center gap-2" style="color: var(--text-primary)">
            <TrendingUp :size="15" :style="{ color: 'var(--accent-green)' }" />
            Contribution Activity
          </p>
          <span
            class="text-[11px] font-mono px-2.5 py-1"
            style="background: rgba(74,222,128,0.1); border: 2px solid rgba(74,222,128,0.2); color: var(--accent-green)"
          >
            {{ live ? `${stats.totalContributions.toLocaleString()} contributions` : 'Past 52 weeks' }}
          </span>
        </div>

        <div class="flex gap-[3px] min-w-max">
          <div v-for="(week, wi) in grid" :key="wi" class="flex flex-col gap-[3px]">
            <div
              v-for="(level, di) in week"
              :key="di"
              class="w-3 h-3 cursor-pointer transition-transform hover:scale-150"
              :style="{ backgroundColor: CELL_COLORS[level], boxShadow: level >= 3 ? `0 0 4px ${CELL_COLORS[level]}` : 'none' }"
              :title="`${level} contribution${level !== 1 ? 's' : ''}`"
            />
          </div>
        </div>

        <div class="flex items-center gap-2 mt-5">
          <span class="text-[11px] font-mono" style="color: var(--text-muted)">Less</span>
          <div v-for="(c, i) in CELL_COLORS" :key="i" class="w-3 h-3" :style="{ backgroundColor: c }" />
          <span class="text-[11px] font-mono" style="color: var(--text-muted)">More</span>
        </div>
      </div>

      <!-- Monthly bars -->
      <div v-scrub="{ x: [50, 0], opacity: [0.35, 1] }" class="panel p-6 mb-6">
        <p class="text-xs font-mono uppercase tracking-wider mb-5" style="color: var(--text-primary)">Monthly Contributions</p>
        <div class="flex items-end gap-2 h-24">
          <div v-for="(m, i) in MONTHS" :key="m" class="flex-1 flex flex-col items-center gap-1">
            <div
              class="w-full relative"
              :style="{
                height: `${Math.round((stats.monthlyTotals[i] / maxMonthly) * 100) || 4}%`,
                background: 'rgba(74,222,128,0.18)',
                border: '2px solid rgba(74,222,128,0.25)',
              }"
            />
            <span class="text-[9px] font-mono" style="color: var(--text-muted)">{{ m }}</span>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <a
          :href="`https://github.com/${GITHUB_USERNAME}`"
          target="_blank"
          rel="noopener noreferrer"
          class="panel shimmer-card inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-200 hover:-translate-y-1 text-[var(--text-secondary)] hover:text-[var(--accent-green)]"
        >
          <GithubIcon :size="15" />
          View Full GitHub Profile
        </a>
      </div>
    </div>
  </section>
</template>

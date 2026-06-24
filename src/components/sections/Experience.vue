<script setup lang="ts">
import { GraduationCap } from '@lucide/vue'
import { experience, education } from '@/data/experience'
</script>

<template>
  <section id="experience" class="relative py-24 md:py-32 overflow-hidden">
    <div class="relative z-10 max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div v-reveal class="mb-14">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-amber))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-cyan)">// Career</p>
        </div>
        <h2 class="text-2xl md:text-4xl" style="color: var(--text-primary)">
          <span class="gradient-text-cyan-violet">EXPERIENCE</span>
        </h2>
      </div>

      <!-- Timeline -->
      <div class="space-y-5">
        <article
          v-for="job in experience"
          :key="job.company"
          v-reveal
          class="panel shimmer-card relative p-6 pl-8"
        >
          <span class="absolute top-0 left-0 bottom-0" :style="{ width: '4px', background: job.accentColor }" />
          <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 class="text-sm" style="color: var(--text-primary); font-family: var(--font-display)">{{ job.role }}</h3>
              <p class="text-xs font-mono mt-1" :style="{ color: job.accentColor }">{{ job.company }}</p>
            </div>
            <span
              class="text-[10px] font-mono px-2 py-1 shrink-0"
              :style="{ background: job.accentColor + '14', border: `2px solid ${job.accentColor}30`, color: job.accentColor }"
            >{{ job.period }}</span>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(b, bi) in job.bullets"
              :key="bi"
              class="text-sm leading-relaxed flex gap-2"
              style="color: var(--text-secondary)"
            >
              <span class="mt-2 shrink-0" :style="{ width: '6px', height: '6px', background: job.accentColor }" />
              <span>{{ b }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Education -->
      <div v-reveal class="mt-12">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-violet), var(--accent-pink))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-violet)">// Education</p>
        </div>
        <article class="panel relative p-6">
          <span
            class="absolute top-0 left-0 right-0"
            style="height: 3px; background: linear-gradient(90deg, transparent, var(--accent-violet), transparent)"
          />
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 flex items-center justify-center shrink-0"
              style="background: rgba(167,139,250,0.12); border: 2px solid rgba(167,139,250,0.4); color: var(--accent-violet)"
            >
              <GraduationCap :size="22" />
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-sm" style="color: var(--text-primary); font-family: var(--font-display)">{{ education.school }}</h3>
                <span class="text-[10px] font-mono" style="color: var(--text-muted)">{{ education.period }}</span>
              </div>
              <p class="text-sm font-mono mt-1" style="color: var(--accent-violet)">{{ education.degree }}</p>
              <div class="flex flex-wrap gap-1.5 mt-4">
                <span
                  v-for="course in education.coursework"
                  :key="course"
                  class="text-[10px] font-mono px-2 py-0.5"
                  style="background: rgba(120,140,255,0.07); border: 2px solid rgba(255,255,255,0.08); color: var(--text-muted)"
                >{{ course }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

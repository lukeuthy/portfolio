<script setup lang="ts">
import { Award, ExternalLink, CircleCheck, Shield } from '@lucide/vue'
import { certifications } from '@/data/certifications'
</script>

<template>
  <section id="certifications" class="relative py-24 md:py-32 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div v-reveal class="mb-16">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8" style="height: 3px; background: linear-gradient(90deg, var(--accent-violet), var(--accent-pink))" />
          <p class="text-[10px] font-mono tracking-[0.3em] uppercase" style="color: var(--accent-violet)">// Credentials</p>
        </div>
        <h2 class="text-2xl md:text-4xl gradient-text-violet-pink">CERTIFICATIONS</h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(cert, i) in certifications"
          :key="cert.title"
          v-scrub="{ rotate: i % 2 ? [22, 0] : [-22, 0], opacity: [0.3, 1], start: 'top bottom', end: 'center center' }"
          class="h-full"
          style="perspective: 800px"
        >
        <article
          v-tilt="9"
          class="panel relative p-6 flex flex-col gap-4 h-full overflow-hidden"
        >
          <span
            class="absolute top-0 left-0 right-0 cert-strip"
            :style="{ height: '3px', background: `linear-gradient(90deg, ${cert.accentColor}, var(--accent-violet), var(--accent-pink), ${cert.accentColor})`, backgroundSize: '200%' }"
          />

          <div class="absolute top-4 right-4" style="opacity: 0.6">
            <Shield :size="14" :style="{ color: cert.accentColor }" />
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 flex items-center justify-center text-[10px] shrink-0"
              :style="{ background: cert.accentColor + '1f', border: `2px solid ${cert.accentColor}40`, color: cert.accentColor, fontFamily: 'var(--font-display)' }"
            >
              {{ cert.logo }}
            </div>
            <div class="min-w-0">
              <h3 class="text-xs leading-snug" style="color: var(--text-primary); font-family: var(--font-display)">{{ cert.title }}</h3>
              <p class="text-[11px] font-mono mt-1 truncate" style="color: var(--text-muted)">{{ cert.issuer }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 text-[11px] font-mono" style="color: var(--accent-green)">
              <CircleCheck :size="13" />
              <span>Verified · {{ cert.date }}</span>
            </div>
            <a
              :href="cert.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-1.5 cursor-pointer transition-transform hover:scale-125 text-[var(--text-muted)]"
              style="background: rgba(255,255,255,0.05)"
              aria-label="View certificate"
              @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = cert.accentColor)"
              @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')"
            >
              <ExternalLink :size="13" />
            </a>
          </div>

          <div class="flex flex-wrap gap-1.5 pt-3" style="border-top: 2px solid rgba(255,255,255,0.07)">
            <span
              v-for="skill in cert.skills"
              :key="skill"
              class="text-[10px] font-mono px-2 py-0.5"
              style="background: rgba(120,140,255,0.07); border: 2px solid rgba(255,255,255,0.08); color: var(--text-muted)"
            >{{ skill }}</span>
          </div>

          <p class="text-[10px] font-mono truncate" style="color: rgba(90,105,144,0.8)">{{ cert.credentialId }}</p>
        </article>
        </div>
      </div>

      <div class="mt-12 flex items-center justify-center gap-3 text-sm font-mono" style="color: var(--text-muted)">
        <Award :size="16" :style="{ color: 'var(--accent-violet)' }" />
        <span>{{ certifications.length }} certifications across cloud, DevOps &amp; development</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cert-strip {
  animation: cert-flow 3s linear infinite;
}
@keyframes cert-flow {
  0% { background-position: 0%; }
  100% { background-position: 200%; }
}
</style>

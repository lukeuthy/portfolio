<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { Mail } from '@lucide/vue'
import { socialIcon } from '@/components/icons/brand'
import { footerSocials } from '@/data/socials'
import { footerNavLinks } from '@/data/nav'
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="relative pt-16 pb-8" style="border-top: 2px solid rgba(167,139,250,0.18)">
    <div class="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-2/3" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-12 mb-12">
        <!-- Brand -->
        <div class="space-y-4">
          <a
            href="#"
            class="inline-block text-base cursor-pointer gradient-text-cyan-violet"
            style="font-family: var(--font-display)"
          >
            {{ profile.brand }}
          </a>
          <p class="text-sm leading-relaxed max-w-xs" style="color: var(--text-secondary)">
            Building the web, one commit at a time. Open to new opportunities and collaborations.
          </p>
          <div class="flex items-center gap-2">
            <a
              v-for="s in footerSocials"
              :key="s.label"
              :href="s.href"
              :target="s.href.startsWith('mailto') ? undefined : '_blank'"
              rel="noopener noreferrer"
              class="p-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 text-[var(--text-muted)] hover:text-[var(--accent-violet)]"
              style="background: rgba(10,15,35,0.5); border: 2px solid rgba(120,140,255,0.18)"
              :aria-label="s.label"
            >
              <component :is="socialIcon[s.icon]" :size="15" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="text-[10px] uppercase tracking-wider mb-4" style="color: var(--text-primary); font-family: var(--font-display)">
            Navigation
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerNavLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-sm font-mono cursor-pointer transition-colors duration-200 text-[var(--text-muted)] hover:text-[var(--accent-cyan)]"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-[10px] uppercase tracking-wider mb-4" style="color: var(--text-primary); font-family: var(--font-display)">
            Get In Touch
          </h3>
          <p class="text-sm mb-5" style="color: var(--text-secondary)">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
          <a
            :href="`mailto:${profile.email}`"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style="
              background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(167,139,250,0.2));
              border: 2px solid rgba(120,140,255,0.35);
              color: var(--text-primary);
            "
          >
            <Mail :size="14" />
            Say Hello
          </a>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
        style="border-top: 2px solid rgba(120,140,255,0.12)"
      >
        <p class="text-[11px] font-mono" style="color: var(--text-muted)">
          © {{ year }} {{ profile.name }}. Built with Vue, three.js &amp; Vite.
        </p>
        <button
          class="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider px-3 py-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 text-[var(--text-muted)] hover:text-[var(--accent-violet)]"
          style="background: rgba(10,15,35,0.5); border: 2px solid rgba(120,140,255,0.18)"
          aria-label="Scroll to top"
          @click="scrollToTop"
        >
          <ArrowUp :size="13" />
          Back to top
        </button>
      </div>
    </div>
  </footer>
</template>

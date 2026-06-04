<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import { navLinks } from '@/data/nav'
import { profile } from '@/data/profile'

const scrolled = ref(false)
const mobileOpen = ref(false)
const active = ref('')

let observer: IntersectionObserver | null = null
const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id
      })
    },
    { threshold: 0.4 },
  )
  navLinks.forEach(({ href }) => {
    const el = document.querySelector(href)
    if (el) observer?.observe(el)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass-navbar' : 'bg-transparent'"
    :style="
      scrolled
        ? 'background:rgba(5,3,10,0.85);backdrop-filter:blur(12px);border-bottom:2px solid rgba(167,139,250,0.25);box-shadow:0 4px 0 rgba(0,0,0,0.4)'
        : ''
    "
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Brand -->
      <a
        href="#"
        class="text-sm cursor-pointer select-none gradient-text-cyan-violet text-glow-violet"
        style="font-family: var(--font-display)"
      >
        {{ profile.brand }}
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="relative px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-none transition-colors duration-200 cursor-pointer"
            :class="
              active === link.href.replace('#', '')
                ? 'text-[var(--accent-violet)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            "
          >
            <span
              v-if="active === link.href.replace('#', '')"
              class="absolute inset-0 -z-10"
              style="background: rgba(167,139,250,0.12); border: 2px solid rgba(167,139,250,0.3)"
            />
            <span class="relative">{{ link.label }}</span>
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <a
        :href="`mailto:${profile.email}`"
        class="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
        style="
          background: linear-gradient(135deg, rgba(56,189,248,0.18), rgba(167,139,250,0.18));
          border: 2px solid rgba(120,140,255,0.4);
          color: #f0f4ff;
        "
      >
        Hire Me
      </a>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="fade-down">
      <div
        v-if="mobileOpen"
        class="md:hidden"
        style="background: rgba(5,3,10,0.94); backdrop-filter: blur(12px); border-bottom: 2px solid rgba(167,139,250,0.2)"
      >
        <ul class="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="block px-4 py-3 text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-violet)] cursor-pointer transition-colors"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.fade-down-enter-active,
.fade-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

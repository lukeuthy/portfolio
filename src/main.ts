import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import { vReveal, vTilt, vMagnetic, vScrub } from '@/directives'
import './styles/globals.css'

// vite-ssg drives both the build-time prerender and the client-side hydration/mount.
export const createApp = ViteSSG(App, ({ app }) => {
  app.directive('reveal', vReveal)
  app.directive('tilt', vTilt)
  app.directive('magnetic', vMagnetic)
  app.directive('scrub', vScrub)
})

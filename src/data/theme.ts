// Single source of truth for the neon accent palette.
// Mirrored as CSS custom properties in styles/globals.css and reused by
// three.js shaders so DOM and WebGL share one palette.

export const accents = {
  cyan: '#38bdf8',
  violet: '#a78bfa',
  green: '#4ade80',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const

export type AccentName = keyof typeof accents

export const bg = {
  base: '#05030a',
  panel: '#0b0718',
} as const

/** Ordered palette used to quantize the WebGL background to a limited set. */
export const palette: string[] = [
  bg.base,
  '#1a0f3a',
  accents.violet,
  accents.cyan,
  accents.pink,
  accents.green,
  accents.amber,
  '#eef2ff',
]

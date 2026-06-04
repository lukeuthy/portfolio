import type { GithubStats } from '@/types'

export const GITHUB_USERNAME = 'lukeuthy'

export const CELL_COLORS = [
  'rgba(255,255,255,0.04)',
  'rgba(74,222,128,0.22)',
  'rgba(74,222,128,0.44)',
  'rgba(74,222,128,0.70)',
  '#4ade80',
] as const

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Deterministic fallback grid — identical between server prerender and client. */
export function makeStaticGrid(): number[][] {
  return Array.from({ length: 52 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const seed = (week * 7 + day) * 2654435761
      const rand = ((seed ^ (seed >> 16)) % 100) / 100
      if (rand > 0.65) return 4
      if (rand > 0.5) return 3
      if (rand > 0.38) return 2
      if (rand > 0.26) return 1
      return 0
    }),
  )
}

export const STATIC_GRID = makeStaticGrid()

/** Fallback stats used before/without the live API response. */
export const FALLBACK_STATS: GithubStats = {
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  totalForks: 0,
  totalContributions: 0,
  monthlyTotals: Array(12).fill(50),
  maxMonthly: 100,
  grid: STATIC_GRID,
}

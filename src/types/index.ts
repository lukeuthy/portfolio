// Shared domain types for the portfolio content layer.

export type IconKey = 'github' | 'linkedin' | 'x' | 'mail'

export interface Social {
  label: string
  href: string
  icon: IconKey
}

export interface NavLink {
  label: string
  href: string
}

export type ProjectCategory = 'Web' | 'Mobile' | 'Backend' | 'CLI'

export interface Project {
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  stars: number
  github?: string
  live?: string
  featured?: boolean
  accentColor: string
  /** Emoji/sprite glyph shown on the card. */
  icon: string
}

export interface Org {
  name: string
  role: string
  description: string
  url: string
  logo: string
  accentColor: string
  members?: string
  type: string
  bgPattern: string
}

export interface Cert {
  title: string
  issuer: string
  date: string
  credentialId: string
  url: string
  logo: string
  accentColor: string
  skills: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
  color: string
}

export interface Stat {
  /** lucide-vue-next icon name */
  icon: string
  target: number
  suffix: string
  label: string
  color: string
}

export interface GithubStats {
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  totalContributions: number
  monthlyTotals: number[]
  maxMonthly: number
  grid: number[][] | null
}

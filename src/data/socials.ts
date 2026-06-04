import type { Social } from '@/types'

/** Profile socials (Hero). */
export const socials: Social[] = [
  { href: 'https://github.com/lukeuthy', icon: 'github', label: 'GitHub' },
  { href: 'https://linkedin.com/in/jasper-navarez', icon: 'linkedin', label: 'LinkedIn' },
  { href: 'https://twitter.com/lukeuthy', icon: 'x', label: 'Twitter' },
]

/** Footer adds a mailto entry on top of the profile socials. */
export const footerSocials: Social[] = [
  ...socials,
  { href: 'mailto:navareznikkojasper@gmail.com', icon: 'mail', label: 'Email' },
]

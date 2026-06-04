import type { SkillGroup, Stat } from '@/types'

export const skills: SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java'], color: 'var(--accent-cyan)' },
  { category: 'Frontend', items: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Framer Motion'], color: 'var(--accent-violet)' },
  { category: 'Backend & Cloud', items: ['Node.js', 'C#/.NET', 'REST APIs', 'AWS', 'Firebase', 'Docker'], color: 'var(--accent-green)' },
  { category: 'ML / AI', items: ['XGBoost', 'scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'], color: 'var(--accent-pink)' },
]

export const stats: Stat[] = [
  { icon: 'Code2', target: 6, suffix: '+', label: 'Projects Built', color: 'var(--accent-cyan)' },
  { icon: 'Globe', target: 1, suffix: '+', label: 'Year Experience', color: 'var(--accent-violet)' },
  { icon: 'Layers', target: 1, suffix: '', label: 'npm Package', color: 'var(--accent-green)' },
  { icon: 'Cpu', target: 5, suffix: '', label: 'Certifications', color: 'var(--accent-pink)' },
]

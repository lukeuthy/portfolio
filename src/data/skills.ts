import type { SkillGroup, Stat } from '@/types'

export const skills: SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java'], color: 'var(--accent-cyan)' },
  { category: 'Frameworks', items: ['React', 'React Native (Expo)', 'Next.js', 'Node.js (Express)', '.NET Framework'], color: 'var(--accent-violet)' },
  { category: 'Backend & Cloud', items: ['Firebase', 'AWS', 'REST APIs', 'Docker', 'Linux'], color: 'var(--accent-green)' },
  { category: 'Databases', items: ['MySQL', 'SQLite', 'Firestore', 'Realtime DB'], color: 'var(--accent-amber)' },
  { category: 'ML & Data', items: ['XGBoost', 'Linear Regression', 'scikit-learn', 'Pandas', 'Power BI', 'RAG'], color: 'var(--accent-pink)' },
  { category: 'Security', items: ['NIST CSF 2.0', 'ISO/IEC 27001', 'CIS Controls v8', 'HIPAA'], color: 'var(--accent-cyan)' },
]

export const stats: Stat[] = [
  { icon: 'Code2', target: 6, suffix: '+', label: 'Projects Built', color: 'var(--accent-cyan)' },
  { icon: 'Globe', target: 2, suffix: '+', label: 'Years Experience', color: 'var(--accent-violet)' },
  { icon: 'Layers', target: 1, suffix: '', label: 'npm Package', color: 'var(--accent-green)' },
  { icon: 'Cpu', target: 5, suffix: '', label: 'Certifications', color: 'var(--accent-pink)' },
]

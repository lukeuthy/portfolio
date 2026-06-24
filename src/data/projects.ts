import type { Project, ProjectCategory } from '@/types'

export const categories: (ProjectCategory | 'All')[] = ['All', 'Web', 'Mobile', 'Backend', 'CLI']

export const projects: Project[] = [
  {
    title: '121edc',
    description:
      'Lumina Tech — full-stack ERP for a centralized company management system: role-based access control, attendance management, subprojects, e-signature validation, and QR-based verification. Delivered ~40% of the Phase 2 build.',
    tags: ['ERP', 'RBAC', 'E-Signature', 'QR'],
    category: 'Web',
    stars: 0,
    featured: true,
    accentColor: '#38bdf8',
    icon: '🏢',
  },
  {
    title: 'Passly.ph',
    description:
      "Lumina Tech — secure QR-based authentication platform with user onboarding, access control, and backend-driven account management. Onboarded 150+ attendees at Passly's first event.",
    tags: ['Auth', 'QR Codes', 'Access Control'],
    category: 'Web',
    stars: 0,
    live: 'https://passly.ph',
    featured: true,
    accentColor: '#4ade80',
    icon: '🔐',
  },
  {
    title: 'Orbit',
    description:
      'Lumina Tech — ERP modules spanning attendance tracking, consume requests, and operational workflows, built with Next.js, Express, and MySQL.',
    tags: ['Next.js', 'Express', 'MySQL'],
    category: 'Web',
    stars: 0,
    featured: true,
    accentColor: '#a78bfa',
    icon: '🛰️',
  },
  {
    title: 'CloudPush CLI',
    description:
      'Published open-source npm CLI that abstracts platform-specific deployment tooling across 7 cloud providers — Vercel, Netlify, Railway, Render, Fly.io, Cloudflare Pages, and GitHub Pages — into one unified interface.',
    tags: ['Node.js', 'GitHub Actions', 'REST APIs', 'CLI'],
    category: 'CLI',
    stars: 0,
    github: 'https://github.com/lukeuthy/cloudpush-cli',
    live: 'https://www.npmjs.com/package/cloudpush-cli',
    featured: true,
    accentColor: '#4ade80',
    icon: '☁️',
  },
  {
    title: 'R503 Bus ETA',
    description:
      'Thesis — a machine-learning pipeline for real-time ETA prediction on the R503 Bangkal–Roxas corridor, comparing XGBoost, linear regression, and a time-of-day segmented median baseline across 150+ logged trips. Mobile app + PWA.',
    tags: ['XGBoost', 'Linear Regression', 'React Native', 'PWA'],
    category: 'Mobile',
    stars: 0,
    github: 'https://github.com/lukeuthy/R503-trip-logger',
    featured: true,
    accentColor: '#38bdf8',
    icon: '🚌',
  },
  {
    title: 'PacePoints',
    description:
      'Cross-platform fitness tracker with real-time GPS session tracking and an on-device ML module for pace, distance trends, and activity classification.',
    tags: ['React Native', 'Expo', 'TypeScript', 'ML'],
    category: 'Mobile',
    stars: 0,
    github: 'https://github.com/lukeuthy/PacePoints/tree/Development',
    featured: true,
    accentColor: '#a78bfa',
    icon: '🏃',
  },
  {
    title: 'Joolz',
    description:
      'Dual-purpose platform combining in-store POS functionality and customer-facing e-commerce, built with React (functional components, hooks) and Firebase (Firestore, Auth, Realtime Database).',
    tags: ['React', 'Firebase', 'POS'],
    category: 'Web',
    stars: 0,
    github: 'https://github.com/kyledvngrc/joolz_project',
    accentColor: '#fbbf24',
    icon: '💎',
  },
  {
    title: 'Jewelry Express',
    description:
      'Full-stack e-commerce & appointment-scheduling platform built with Node.js (Express) and vanilla JS — online browsing across 100+ SKUs and real-time consultation booking.',
    tags: ['Node.js', 'Express', 'JavaScript'],
    category: 'Backend',
    stars: 0,
    github: 'https://github.com/Cogiii/jewelry-express',
    accentColor: '#38bdf8',
    icon: '📦',
  },
  {
    title: 'OneChat',
    description:
      'Real-time chat application built with Java and Spring Boot. WebSocket-powered messaging, user rooms, and persistent chat history.',
    tags: ['Java', 'WebSocket', 'Spring Boot'],
    category: 'Backend',
    stars: 0,
    github: 'https://github.com/lukeuthy/OneChat',
    accentColor: '#f472b6',
    icon: '💬',
  },
]

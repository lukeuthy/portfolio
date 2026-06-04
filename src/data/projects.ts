import type { Project, ProjectCategory } from '@/types'

export const categories: (ProjectCategory | 'All')[] = ['All', 'Web', 'Mobile', 'Backend', 'CLI']

export const projects: Project[] = [
  {
    title: 'CloudPush CLI',
    description:
      'Published npm package for zero-config cloud deployments. One command pushes your project to the cloud with smart env detection and real-time logs.',
    tags: ['Node.js', 'CLI', 'npm', 'AWS'],
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
      'Thesis project — XGBoost-powered transit ETA prediction for the R503 route. React Native app with real-time schedule data and ML inference.',
    tags: ['Python', 'XGBoost', 'React Native', 'ML'],
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
      'React Native fitness tracker with ML-based workout recommendations, progress analytics, and dynamic goal-setting powered by TypeScript.',
    tags: ['React Native', 'TypeScript', 'ML'],
    category: 'Mobile',
    stars: 0,
    github: 'https://github.com/lukeuthy/PacePoints/tree/Development',
    featured: true,
    accentColor: '#a78bfa',
    icon: '🏃',
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
  {
    title: 'Joolz',
    description:
      'Freelance e-commerce platform for a jewelry brand. Built with React and Firebase — real-time inventory, cart, checkout, and admin dashboard.',
    tags: ['React', 'Firebase', 'TypeScript'],
    category: 'Web',
    stars: 0,
    github: 'https://github.com/kyledvngrc/joolz_project',
    accentColor: '#fbbf24',
    icon: '💎',
  },
  {
    title: 'Jewelry Express',
    description:
      'Full-stack e-commerce backend for a local jeweler. Node.js REST API with MongoDB, order management, image uploads, and role-based access control.',
    tags: ['Node.js', 'MongoDB', 'REST API'],
    category: 'Backend',
    stars: 0,
    github: 'https://github.com/Cogiii/jewelry-express',
    accentColor: '#38bdf8',
    icon: '📦',
  },
]

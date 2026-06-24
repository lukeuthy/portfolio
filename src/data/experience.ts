export interface ExperienceItem {
  role: string
  company: string
  period: string
  accentColor: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Full-Stack Web Developer',
    company: 'Lumina Tech',
    period: 'Nov 2025 – Present',
    accentColor: '#38bdf8',
    bullets: [
      '121edc — shipped full-stack ERP features (RBAC, attendance management, subprojects, e-signature validation, QR verification), contributing ~40% of the Phase 2 centralized management system.',
      "Passly.ph — built secure QR-based authentication, user onboarding, and access control; onboarded 150+ people at Passly's first event.",
      'Orbit — built ERP modules across attendance tracking, consume requests, and operational workflows with Next.js, Express, and MySQL.',
    ],
  },
  {
    role: 'AI Training Validator',
    company: 'MineBright',
    period: 'Mar 2025 – Dec 2025',
    accentColor: '#a78bfa',
    bullets: [
      'Reviewed and validated 1,000+ model-generated extractions from mining operation documents against ground-truth annotations across structured and semi-structured formats.',
      'Supported RAG model-refinement pipelines — flagging hallucinations and edge-case failures that informed re-training iterations.',
    ],
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Self-employed',
    period: 'Aug 2024 – Nov 2025',
    accentColor: '#4ade80',
    bullets: [
      'Don Macchiatos — architected and delivered a desktop POS system in C# on the .NET Framework.',
      'Jewelry Express — full-stack e-commerce + appointment scheduling (Node.js/Express), 100+ SKUs.',
      'Joolz — dual POS + customer-facing e-commerce platform with React and Firebase.',
    ],
  },
]

export interface EducationItem {
  school: string
  degree: string
  period: string
  coursework: string[]
}

export const education: EducationItem = {
  school: 'Mapúa Malayan Colleges Mindanao',
  degree: 'B.S. in Computer Science',
  period: 'Aug 2023 – May 2027 (Expected)',
  coursework: [
    'Data Structures & Algorithms',
    'Machine Learning',
    'Information Security & Assurance',
    'Operating Systems',
    'Web Development',
    'Software Engineering',
    'Database Systems',
  ],
}

export const profile = {
  name: 'Jasper Nikko Navarez',
  firstName: 'Jasper',
  brand: '<Dev/>',
  email: 'navareznikkojasper@gmail.com',
  resume: '/resume.pdf',
  status: 'Available for work',
  roles: [
    'Full-Stack Developer',
    'Open-Source Developer',
    'Freelance Engineer',
    'React Native Developer',
  ],
  heroBio:
    'Full-stack developer and published npm author building production-grade software across web, mobile, and cloud. Freelance engineer who ships things that matter.',
  bio: [
    "I'm Jasper — a full-stack developer and published npm author specializing in production-grade web and mobile applications. I build across the entire stack: React and React Native on the front end, Node.js and .NET on the back end, and AWS and Firebase in the cloud.",
    "I've applied machine learning with XGBoost to transit prediction systems, contributed AI training data professionally, and shipped freelance products end-to-end from architecture to deployment. I care about clean code, great developer experience, and software that solves real problems.",
  ],
} as const

/** Decorative code fragments floating in the hero. */
export const codeSnippets: string[] = [
  'const dev = () => GO',
  'git push origin main',
  'npm run build',
  'docker compose up',
  'kubectl apply -f .',
  'async/await',
  'O(log n)',
  '<Component />',
  'SELECT * FROM stars',
  'terraform apply',
]

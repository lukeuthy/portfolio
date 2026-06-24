export const profile = {
  name: 'Jasper Nikko Navarez',
  firstName: 'Jasper',
  brand: '<jas/>',
  email: 'navareznikkojasper@gmail.com',
  resume: '/resume.pdf',
  status: 'Available for work',
  roles: [
    'Full-Stack Web Developer',
    'React Native Developer',
    'Open-Source Author',
    'Freelance Engineer',
  ],
  heroBio:
    'Full-stack web developer and published npm author building production-grade software across web, mobile, and cloud. I ship things that matter.',
  bio: [
    "I'm Jasper — a full-stack web developer and published npm author building production-grade web and mobile apps. I work across the stack: React and React Native (Expo) on the front end, Node.js/Express and .NET on the back end, and Firebase and AWS in the cloud.",
    "Right now I'm building ERP, authentication, and QR-verification platforms at Lumina Tech. I've validated AI training data with RAG pipelines at MineBright, applied XGBoost to transit-ETA prediction for my thesis, and shipped freelance products end-to-end. I care about clean code, strong security fundamentals, and software that solves real problems.",
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

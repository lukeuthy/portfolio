"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Star, Zap } from "lucide-react";
import { GithubIcon } from "./icons";

type Project = {
  title: string; description: string; tags: string[];
  category: string; stars: number; github: string;
  live?: string; featured?: boolean; accentColor: string; icon: string;
};

const projects: Project[] = [
  { title: "CloudPush CLI",      description: "Published npm package for zero-config cloud deployments. One command pushes your project to the cloud with smart env detection and real-time logs.",  tags: ["Node.js","CLI","npm","AWS"],          category: "CLI",     stars: 0,  github: "https://github.com/lukeuthy/cloudpush-cli", live: "https://www.npmjs.com/package/cloudpush-cli", featured: true, accentColor: "#4ade80", icon: "☁️" },
  { title: "R503 Bus ETA",       description: "Thesis project — XGBoost-powered transit ETA prediction for the R503 route. React Native app with real-time schedule data and ML inference.",         tags: ["Python","XGBoost","React Native","ML"], category: "Mobile", stars: 0,  github: "https://github.com/lukeuthy", featured: true, accentColor: "#38bdf8", icon: "🚌" },
  { title: "PacePoints",         description: "React Native fitness tracker with ML-based workout recommendations, progress analytics, and dynamic goal-setting powered by TypeScript.",              tags: ["React Native","TypeScript","ML"],     category: "Mobile", stars: 0,  github: "https://github.com/lukeuthy", featured: true, accentColor: "#a78bfa", icon: "🏃" },
  { title: "OneChat",            description: "Real-time chat application built with Java and Spring Boot. WebSocket-powered messaging, user rooms, and persistent chat history.",                    tags: ["Java","WebSocket","Spring Boot"],     category: "Backend", stars: 0,  github: "https://github.com/lukeuthy", accentColor: "#f472b6", icon: "💬" },
  { title: "Joolz",              description: "Freelance e-commerce platform for a jewelry brand. Built with React and Firebase — real-time inventory, cart, checkout, and admin dashboard.",         tags: ["React","Firebase","TypeScript"],      category: "Web",    stars: 0,  github: "https://github.com/lukeuthy", accentColor: "#fbbf24", icon: "💎" },
  { title: "Jewelry Express",    description: "Full-stack e-commerce backend for a local jeweler. Node.js REST API with MongoDB, order management, image uploads, and role-based access control.",   tags: ["Node.js","MongoDB","REST API"],       category: "Backend", stars: 0,  github: "https://github.com/lukeuthy", accentColor: "#38bdf8", icon: "📦" },
];

const categories = ["All","Web","Mobile","Backend","CLI"];

/* ─── 3-D tilt project card ──────────────────────── */
function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 18 });
  const shineX = useTransform(mx, [-0.5, 0, 0.5], ["-30%", "50%", "130%"]);
  const shineO = useTransform(mx, [-0.5, -0.1, 0.1, 0.5], [0, 0.12, 0.12, 0]);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.94 }}
      transition={{ delay: i * 0.07, duration: 0.45 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8 }}
        className="glass shimmer-card relative p-6 flex flex-col gap-4 cursor-default h-full overflow-hidden"
        transition={{ duration: 0.3 }}
      >
        {/* Moving shine */}
        <motion.div className="absolute inset-0 pointer-events-none rounded-[18px]"
          style={{ background: `linear-gradient(105deg, transparent 35%, white 50%, transparent 65%)`, x: shineX, opacity: shineO }} />

        {/* Accent glow top border */}
        <motion.div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
          animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }} />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk',sans-serif" }}>
                {project.title}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}35`, color: project.accentColor }}>
                {project.category}
              </span>
            </div>
          </div>
          {project.featured && (
            <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)", color: "var(--accent-violet)" }}>
              <Zap size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(120,140,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-muted)" }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--accent-amber)" }}>
            {project.stars > 0 && (
              <>
                <Star size={13} fill="currentColor" />
                <span className="font-medium">{project.stars.toLocaleString()}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[
              { href: project.github, Icon: GithubIcon, label: "GitHub" },
              ...(project.live ? [{ href: project.live, Icon: ExternalLink, label: "Live" }] : []),
            ].map(({ href, Icon, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: project.accentColor }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 cursor-pointer transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = project.accentColor)}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                aria-label={label}>
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,var(--accent-violet),var(--accent-pink))" }} />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--accent-violet)" }}>Work</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Featured <span className="gradient-text-violet-pink">Projects</span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <motion.button key={cat} onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 text-sm rounded-full transition-all duration-200 cursor-pointer"
              style={filter === cat
                ? { background: "linear-gradient(135deg,rgba(167,139,250,0.25),rgba(244,114,182,0.15))", border: "1px solid rgba(167,139,250,0.5)", color: "var(--accent-violet)", fontWeight: 600 }
                : { background: "rgba(18,26,70,0.7)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-muted)", backdropFilter: "blur(16px)" }
              }>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectCard key={p.title} project={p} i={i} />)}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center">
          <motion.a href="https://github.com/lukeuthy" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(167,139,250,0.25)" }} whileTap={{ scale: 0.95 }}
            className="glass shimmer-card gradient-border inline-flex items-center gap-2 px-6 py-3 text-sm font-medium cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-violet)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
            <GithubIcon size={15} />
            View All Repositories
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

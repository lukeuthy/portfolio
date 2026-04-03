"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Cpu, Globe, Layers } from "lucide-react";

/* ─── 3D tilt card ────────────────────────────────── */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const shine = useTransform(x, [-0.5, 0, 0.5], ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.06)", "rgba(255,255,255,0.0)"]);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      <motion.div className="absolute inset-0 rounded-[18px] pointer-events-none z-10" style={{ background: shine }} />
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ────────────────────────────── */
function AnimCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVal(Math.round(target * (i / steps)));
      if (i >= steps) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const skills = [
  { category: "Frontend",       items: ["React","Next.js","TypeScript","Tailwind CSS","Framer Motion"], color: "var(--accent-cyan)" },
  { category: "Backend",        items: ["Node.js","Python","Go","REST APIs","GraphQL"],                 color: "var(--accent-violet)" },
  { category: "Cloud & DevOps", items: ["AWS","Docker","Kubernetes","CI/CD","Terraform"],               color: "var(--accent-green)" },
  { category: "Databases",      items: ["PostgreSQL","MongoDB","Redis","Prisma","Drizzle ORM"],         color: "var(--accent-pink)" },
];

const stats = [
  { icon: Code2,  target: 50, suffix: "+", label: "Projects Built",    color: "var(--accent-cyan)" },
  { icon: Globe,  target: 3,  suffix: "+", label: "Years Experience",  color: "var(--accent-violet)" },
  { icon: Layers, target: 20, suffix: "+", label: "Open Source Repos", color: "var(--accent-green)" },
  { icon: Cpu,    target: 10, suffix: "+", label: "Certifications",    color: "var(--accent-pink)" },
];

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itm = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,var(--accent-cyan),var(--accent-violet))" }} />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--accent-cyan)" }}>About Me</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Who I <span className="gradient-text-cyan-violet">Am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div ref={ref} variants={ctn} initial="hidden" animate={inView ? "show" : "hidden"} className="space-y-6">
            <motion.p variants={itm} className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I&apos;m a passionate full-stack developer who loves turning complex problems into
              elegant, user-friendly solutions. With a strong foundation in both frontend and
              backend technologies, I thrive in fast-paced environments.
            </motion.p>
            <motion.p variants={itm} className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              When I&apos;m not coding, you&apos;ll find me contributing to open source, exploring
              new technologies, or writing about software engineering. I believe in writing
              clean, maintainable code and building products that make a real difference.
            </motion.p>

            {/* Stats grid */}
            <motion.div variants={itm} className="grid grid-cols-2 gap-3 pt-4">
              {stats.map(({ icon: Icon, target, suffix, label, color }) => (
                <TiltCard key={label}
                  className="glass shimmer-card gradient-border relative p-5 flex items-center gap-3 cursor-default overflow-hidden"
                >
                  <motion.div className="absolute inset-0 rounded-[18px] opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${color}18 0%, transparent 70%)` }} />
                  <div className="p-2.5 rounded-lg shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk',sans-serif" }}>
                      <AnimCounter target={target} suffix={suffix} />
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — skills */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }} className="space-y-7">
            {skills.map(({ category, items, color }, si) => (
              <motion.div key={category}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: si * 0.1 }}>
                <div className="flex items-center gap-2 mb-3">
                  <motion.div className="w-2 h-2 rounded-full" style={{ background: color }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: si * 0.3 }} />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span key={skill}
                      initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1, borderColor: color, color: color, boxShadow: `0 0 12px ${color}40` }}
                      className="px-3 py-1.5 text-xs rounded-full cursor-default transition-all duration-200"
                      style={{
                        background: "rgba(18,26,70,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "var(--text-secondary)",
                        backdropFilter: "blur(16px)",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

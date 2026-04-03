"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Download, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";

/* ─── Typewriter ──────────────────────────────────── */
const ROLES = ["Full-Stack Developer", "Open Source Contributor", "Cloud Engineer", "Problem Solver"];

function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const cur = words[index % words.length];
    if (!deleting && displayed === cur) { t.current = setTimeout(() => setDeleting(true), 2200); return; }
    if (deleting && displayed === "") { setDeleting(false); setIndex(i => (i + 1) % words.length); return; }
    t.current = setTimeout(() => setDisplayed(deleting ? cur.slice(0, displayed.length - 1) : cur.slice(0, displayed.length + 1)), deleting ? 38 : 72);
    return () => { if (t.current) clearTimeout(t.current); };
  }, [displayed, deleting, index, words]);
  return (
    <span className="gradient-text-cyan-violet text-glow-cyan">
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-9 md:h-11 ml-1 align-middle rounded-full"
        style={{ background: "var(--accent-cyan)" }} />
    </span>
  );
}

/* ─── Floating code fragment ──────────────────────── */
const CODE_SNIPPETS = [
  "const dev = () => 🚀",
  "git push origin main",
  "npm run build",
  "docker compose up",
  "kubectl apply -f .",
  "async/await ✨",
  "O(log n)",
  "<Component />",
  "SELECT * FROM stars",
  "terraform apply",
];

function FloatingCode({ text, x, y, delay }: { text: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none text-xs font-mono"
      style={{
        left: x, top: y,
        color: "rgba(167,139,250,0.35)",
        fontFamily: "'JetBrains Mono', monospace",
        whiteSpace: "nowrap",
      }}
      animate={{ y: [0, -18, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}

/* ─── Orbit ring ──────────────────────────────────── */
function OrbitRing({ radius, duration, color, dotCount }: { radius: number; duration: number; color: string; dotCount: number }) {
  return (
    <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}>
      <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${color}18` }} />
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: color, boxShadow: `0 0 6px ${color}`, transformOrigin: `0 ${radius}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay: (i / dotCount) * duration }}
        />
      ))}
    </div>
  );
}

/* ─── Magnetic button ─────────────────────────────── */
function MagneticButton({ children, href, className, style, onClick }: {
  children: React.ReactNode; href?: string; className?: string;
  style?: React.CSSProperties; onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const onMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  const Tag = href ? motion.a : motion.button;
  return (
    <Tag ref={ref as never} href={href} className={className} style={{ ...style, x: sx, y: sy } as never}
      onMouseMove={onMouse} onMouseLeave={onLeave} whileTap={{ scale: 0.94 }}>
      {children}
    </Tag>
  );
}

/* ─── Star particle (client-only) ────────────────── */
type StarData = { x: number; y: number; delay: number; size: number; dur: number };

function StarParticle({ x, y, delay, size, dur }: StarData) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: "white", boxShadow: `0 0 ${size * 3}px rgba(200,220,255,0.8)` }}
      animate={{ opacity: [0, 0.95, 0], scale: [0, 1, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }} />
  );
}

function generateStars(): StarData[] {
  return Array.from({ length: 22 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    delay: (i * 0.26) % 5, size: Math.random() > 0.72 ? 2 : 1,
    dur: 3.5 + Math.random() * 2.5,
  }));
}

/* ─── Main component ──────────────────────────────── */
const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.25 } } };
const itm = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } } };

export default function Hero() {
  const [stars, setStars] = useState<StarData[]>([]);
  useEffect(() => { setStars(generateStars()); }, []);

  const codeSnippets = [
    { text: CODE_SNIPPETS[0], x: "8%",  y: "18%", delay: 0 },
    { text: CODE_SNIPPETS[1], x: "72%", y: "12%", delay: 1.2 },
    { text: CODE_SNIPPETS[2], x: "85%", y: "38%", delay: 2.4 },
    { text: CODE_SNIPPETS[3], x: "5%",  y: "62%", delay: 0.8 },
    { text: CODE_SNIPPETS[4], x: "78%", y: "72%", delay: 3.1 },
    { text: CODE_SNIPPETS[5], x: "60%", y: "85%", delay: 1.7 },
    { text: CODE_SNIPPETS[6], x: "20%", y: "88%", delay: 2.9 },
    { text: CODE_SNIPPETS[7], x: "42%", y: "8%",  delay: 0.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orbit rings — Hero-specific interactive layer */}
      <div className="absolute top-1/2 left-1/2 opacity-25">
        <OrbitRing radius={320} duration={28} color="#a78bfa" dotCount={2} />
        <OrbitRing radius={480} duration={45} color="#38bdf8" dotCount={1} />
      </div>

      {/* Stars */}
      {stars.map((s, i) => <StarParticle key={i} {...s} />)}

      {/* Floating code */}
      {codeSnippets.map((c, i) => <FloatingCode key={i} {...c} />)}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
        <motion.div variants={ctn} initial="hidden" animate="show" className="flex flex-col items-start">

          {/* Badge */}
          <motion.div variants={itm}>
            <motion.span
              animate={{ boxShadow: ["0 0 8px rgba(167,139,250,0.2)","0 0 24px rgba(167,139,250,0.5)","0 0 8px rgba(167,139,250,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 cursor-default"
              style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", color: "var(--accent-violet)" }}
            >
              <Sparkles size={13} />
              Available for work
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itm}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-5"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Hi, I&apos;m{" "}
            <motion.span className="gradient-text-cyan-violet text-glow-violet inline-block"
              animate={{ filter: ["drop-shadow(0 0 16px rgba(167,139,250,0.4))","drop-shadow(0 0 32px rgba(56,189,248,0.5))","drop-shadow(0 0 16px rgba(167,139,250,0.4))"] }}
              transition={{ duration: 4, repeat: Infinity }}>
              Your Name
            </motion.span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={itm} className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 h-14 flex items-center">
            <TypeWriter words={ROLES} />
          </motion.div>

          {/* Description */}
          <motion.p variants={itm} className="max-w-xl text-lg leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
            I build performant, scalable applications and love contributing to open source.
            Passionate about clean code, great developer experience, and shipping things that matter.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itm} className="flex flex-wrap gap-4 mb-12">
            <MagneticButton href="#projects"
              className="px-8 py-3.5 font-semibold rounded-xl cursor-pointer text-[#03040e] text-sm relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,var(--accent-cyan),var(--accent-violet))", boxShadow: "0 0 32px rgba(56,189,248,0.3)" }}
            >
              <motion.span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg,var(--accent-violet),var(--accent-pink))" }} />
              <span className="relative z-10">View Projects</span>
            </MagneticButton>

            <MagneticButton href="/resume.pdf"
              className="glass shimmer-card gradient-border px-8 py-3.5 font-semibold rounded-xl flex items-center gap-2 cursor-pointer text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              <Download size={15} />
              Resume
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itm} className="flex items-center gap-3">
            {[
              { href: "https://github.com",   icon: GithubIcon,   label: "GitHub" },
              { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
              { href: "https://twitter.com",  icon: XIcon,        label: "Twitter" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(167,139,250,0.4)" }}
                whileTap={{ scale: 0.9 }}
                className="glass shimmer-card p-2.5 rounded-xl cursor-pointer transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-violet)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                aria-label={label}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}>
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

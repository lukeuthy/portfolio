"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Users, Globe } from "lucide-react";

type Org = { name: string; role: string; description: string; url: string; logo: string; accentColor: string; members?: string; type: string; bgPattern: string; };

const organizations: Org[] = [
  { name: "OpenJS Foundation", role: "Technical Contributor",   description: "Contributing to JavaScript ecosystem projects including Node.js core and tooling. Maintaining critical infrastructure used by millions.",    url: "https://openjsf.org",                logo: "OJS",  accentColor: "#fbbf24", members: "500K+", type: "Open Source", bgPattern: "radial-gradient(circle at 80% 20%, rgba(251,191,36,0.12) 0%, transparent 60%)" },
  { name: "CNCF",              role: "Community Member",         description: "Participating in Cloud Native Computing Foundation working groups, contributing to Kubernetes tooling and observability projects.",              url: "https://cncf.io",                    logo: "CNCF", accentColor: "#38bdf8", members: "200K+", type: "Foundation",   bgPattern: "radial-gradient(circle at 80% 20%, rgba(56,189,248,0.12) 0%, transparent 60%)" },
  { name: "Rust Foundation",   role: "Open Source Contributor",  description: "Contributing to the Rust programming language ecosystem, focusing on WebAssembly tooling and performance improvements.",                     url: "https://foundation.rust-lang.org",   logo: "RS",   accentColor: "#f472b6", members: "80K+",  type: "Foundation",   bgPattern: "radial-gradient(circle at 80% 20%, rgba(244,114,182,0.12) 0%, transparent 60%)" },
  { name: "Dev Community",     role: "Top Author & Mentor",      description: "Publishing technical articles on system design, performance engineering, and open source. Mentoring junior developers worldwide.",              url: "https://dev.to",                     logo: "DEV",  accentColor: "#4ade80", members: "1M+",   type: "Community",    bgPattern: "radial-gradient(circle at 80% 20%, rgba(74,222,128,0.12) 0%, transparent 60%)" },
];

/* ─── Pulse ring component ────────────────────────── */
function PulseRings({ color }: { color: string }) {
  return (
    <div className="absolute -inset-2 pointer-events-none">
      {[0, 0.5, 1].map(delay => (
        <motion.div key={delay}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: `${color}40` }}
          animate={{ scale: [1, 1.6, 2], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeOut" }} />
      ))}
    </div>
  );
}

/* ─── Tilt card ───────────────────────────────────── */
function OrgCard({ org, i }: { org: Org; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        className="glass shimmer-card relative p-6 flex flex-col gap-5 cursor-default overflow-hidden h-full"
        transition={{ duration: 0.3 }}>

        {/* BG pattern */}
        <div className="absolute inset-0 rounded-[18px] pointer-events-none" style={{ background: org.bgPattern }} />

        {/* Animated top line */}
        <motion.div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px]"
          style={{ background: `linear-gradient(90deg, transparent, ${org.accentColor}, transparent)` }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2 + i * 0.4, repeat: Infinity }} />

        {/* Logo + info */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            {/* Logo with pulse */}
            <div className="relative shrink-0">
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold"
                style={{ background: `${org.accentColor}18`, border: `1px solid ${org.accentColor}40`, color: org.accentColor, fontFamily: "'Space Grotesk',sans-serif" }}
                whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${org.accentColor}60` }}
                animate={{ boxShadow: [`0 0 0px ${org.accentColor}00`, `0 0 14px ${org.accentColor}50`, `0 0 0px ${org.accentColor}00`] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity }}>
                {org.logo}
              </motion.div>
              <PulseRings color={org.accentColor} />
            </div>

            <div>
              <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk',sans-serif" }}>{org.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{org.role}</p>
            </div>
          </div>

          <motion.a href={org.url} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg cursor-pointer transition-colors"
            style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.05)" }}
            onMouseEnter={e => (e.currentTarget.style.color = org.accentColor)}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label={`Visit ${org.name}`}>
            <ExternalLink size={14} />
          </motion.a>
        </div>

        <p className="text-sm leading-relaxed relative z-10" style={{ color: "var(--text-secondary)" }}>{org.description}</p>

        <div className="flex items-center gap-3 pt-3 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
            style={{ background: `${org.accentColor}12`, border: `1px solid ${org.accentColor}28`, color: org.accentColor }}>
            <Globe size={10} />
            {org.type}
          </span>
          {org.members && (
            <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <Users size={11} /> {org.members} members
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Organizations() {
  return (
    <section id="organizations" className="py-28 relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,var(--accent-cyan),var(--accent-green))" }} />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--accent-cyan)" }}>Community</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            <span className="gradient-text-green-cyan">Organizations</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {organizations.map((org, i) => <OrgCard key={org.name} org={org} i={i} />)}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ExternalLink, CheckCircle2, Shield } from "lucide-react";

type Cert = { title: string; issuer: string; date: string; credentialId: string; url: string; logo: string; accentColor: string; skills: string[]; };

const certifications: Cert[] = [
  { title: "AWS Solutions Architect",      issuer: "Amazon Web Services",            date: "2024", credentialId: "AWS-SAA-C03-XXXX", url: "https://aws.amazon.com/certification",          logo: "AWS",  accentColor: "#fbbf24", skills: ["EC2","S3","VPC","IAM","RDS","Lambda"] },
  { title: "Certified Kubernetes Admin",   issuer: "Cloud Native Computing Fdn",     date: "2024", credentialId: "CKA-XXXX-XXXX",   url: "https://training.linuxfoundation.org",          logo: "CKA",  accentColor: "#38bdf8", skills: ["Pods","Deployments","Networking","Storage"] },
  { title: "Google Cloud Professional",    issuer: "Google Cloud",                   date: "2023", credentialId: "GCP-PCD-XXXX",    url: "https://cloud.google.com/certification",        logo: "GCP",  accentColor: "#f472b6", skills: ["GKE","Cloud Run","Pub/Sub","BigQuery"] },
  { title: "HashiCorp Terraform Assoc.",   issuer: "HashiCorp",                      date: "2023", credentialId: "TF-XXXX",         url: "https://developer.hashicorp.com",               logo: "TF",   accentColor: "#a78bfa", skills: ["IaC","Modules","State","Workspaces"] },
  { title: "GitHub Advanced Security",     issuer: "GitHub",                         date: "2023", credentialId: "GHAS-XXXX",       url: "https://resources.github.com/learn/certifications", logo: "GH",  accentColor: "#4ade80", skills: ["SAST","Secret Scanning","Dependabot"] },
  { title: "Meta React Developer",         issuer: "Meta / Coursera",                date: "2022", credentialId: "REACT-META-XXXX", url: "https://coursera.org",                          logo: "META", accentColor: "#38bdf8", skills: ["React Hooks","Context","Testing","Redux"] },
];

/* ─── Holographic cert card ───────────────────────── */
function CertCard({ cert, i }: { cert: Cert; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });

  // Holographic rainbow shift
  const hueShift = useTransform(mx, [-0.5, 0.5], [0, 60]);
  const shineX  = useTransform(mx, [-0.5, 0, 0.5], ["0%", "50%", "100%"]);
  const shineY  = useTransform(my, [-0.5, 0, 0.5], ["0%", "50%", "100%"]);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.5 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8 }}
        className="glass relative p-6 flex flex-col gap-4 cursor-default overflow-hidden h-full"
        transition={{ duration: 0.3 }}>

        {/* Holographic foil overlay */}
        <motion.div className="absolute inset-0 rounded-[18px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${shineX.get()} ${shineY.get()}, rgba(255,255,255,0.09) 0%, transparent 60%)`,
            mixBlendMode: "overlay",
          }} />

        {/* Spectral shimmer strip */}
        <motion.div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${cert.accentColor}, #a78bfa, #f472b6, ${cert.accentColor})`, backgroundSize: "200%", filter: `hue-rotate(${hueShift.get()}deg)` }}
          animate={{ backgroundPosition: ["0%", "200%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />

        {/* Corner badge */}
        <div className="absolute top-4 right-4">
          <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 4 + i * 0.3, repeat: Infinity }}>
            <Shield size={14} style={{ color: cert.accentColor, opacity: 0.6 }} />
          </motion.div>
        </div>

        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 relative"
            style={{ background: `${cert.accentColor}18`, border: `1px solid ${cert.accentColor}40`, color: cert.accentColor, fontFamily: "'Space Grotesk',sans-serif" }}
            whileHover={{ scale: 1.1, boxShadow: `0 0 24px ${cert.accentColor}60` }}
            animate={{ boxShadow: [`0 0 0 ${cert.accentColor}00`, `0 0 12px ${cert.accentColor}45`, `0 0 0 ${cert.accentColor}00`] }}
            transition={{ duration: 3.5 + i * 0.2, repeat: Infinity }}>
            {cert.logo}
          </motion.div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm leading-snug" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk',sans-serif" }}>
              {cert.title}
            </h3>
            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{cert.issuer}</p>
          </div>
        </div>

        {/* Verified row */}
        <div className="flex items-center justify-between">
          <motion.div className="flex items-center gap-1.5 text-xs"
            animate={{ color: ["var(--accent-green)", "#6ee7b7", "var(--accent-green)"] }}
            transition={{ duration: 3, repeat: Infinity }}>
            <CheckCircle2 size={13} />
            <span>Verified · {cert.date}</span>
          </motion.div>
          <motion.a href={cert.url} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 8 }} whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg cursor-pointer transition-colors"
            style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.05)" }}
            onMouseEnter={e => (e.currentTarget.style.color = cert.accentColor)}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="View certificate">
            <ExternalLink size={13} />
          </motion.a>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {cert.skills.map((skill, si) => (
            <motion.span key={skill}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: si * 0.04 }}
              whileHover={{ scale: 1.08, borderColor: cert.accentColor, color: cert.accentColor }}
              className="text-xs px-2 py-0.5 rounded-full transition-all duration-150 cursor-default"
              style={{ background: "rgba(120,140,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-muted)" }}>
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Credential ID */}
        <p className="text-[10px] font-mono truncate" style={{ color: "rgba(90,105,144,0.8)" }}>
          {cert.credentialId}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,var(--accent-violet),var(--accent-pink))" }} />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--accent-violet)" }}>Credentials</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            <span className="gradient-text-violet-pink">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => <CertCard key={cert.title} cert={cert} i={i} />)}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <Award size={16} style={{ color: "var(--accent-violet)" }} />
          <span>{certifications.length} certifications across cloud, DevOps &amp; development</span>
        </motion.div>
      </div>
    </section>
  );
}

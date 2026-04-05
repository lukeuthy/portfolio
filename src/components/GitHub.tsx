"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, GitPullRequest, GitCommitHorizontal, TrendingUp } from "lucide-react";
import { GithubIcon } from "./icons";

const GITHUB_USERNAME = "lukeuthy";

const contributions = [
  { icon: GitCommitHorizontal, value: "1,247", label: "Commits this year",   color: "var(--accent-green)",  num: 1247 },
  { icon: GitPullRequest,       value: "86",    label: "Pull requests merged", color: "var(--accent-cyan)",   num: 86 },
  { icon: Star,                 value: "342",   label: "Stars earned",          color: "var(--accent-amber)",  num: 342 },
  { icon: GitFork,              value: "124",   label: "Forks",                 color: "var(--accent-violet)", num: 124 },
];

function generateGrid() {
  return Array.from({ length: 52 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const seed = (week * 7 + day) * 2654435761;
      const rand = ((seed ^ (seed >> 16)) % 100) / 100;
      if (rand > 0.65) return 4;
      if (rand > 0.50) return 3;
      if (rand > 0.38) return 2;
      if (rand > 0.26) return 1;
      return 0;
    })
  );
}
const GRID = generateGrid();

const CELL_COLORS = [
  "rgba(255,255,255,0.04)",
  "rgba(74,222,128,0.22)",
  "rgba(74,222,128,0.44)",
  "rgba(74,222,128,0.70)",
  "#4ade80",
];

/* ─── Activity bar chart ──────────────────────────── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_ACTIVITY = [42,68,55,90,73,88,95,62,78,85,71,60];

export default function GitHub() {
  const gridRef = useRef(null);
  const gridVisible = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="github" className="py-28 relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,var(--accent-green),var(--accent-cyan))" }} />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--accent-green)" }}>Open Source</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            GitHub <span className="gradient-text-green-cyan">Activity</span>
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {contributions.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 24, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass shimmer-card gradient-border relative p-5 cursor-default overflow-hidden"
            >
              <motion.div className="absolute inset-0 rounded-[18px]"
                style={{ background: `radial-gradient(circle at 0% 0%, ${color}12 0%, transparent 60%)` }} />
              <Icon size={18} style={{ color }} className="mb-3 relative z-10" />
              <p className="text-2xl font-bold relative z-10" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk',sans-serif" }}>
                {value}
              </p>
              <p className="text-xs mt-1 relative z-10" style={{ color: "var(--text-muted)" }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div ref={gridRef} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="glass p-6 mb-5 overflow-x-auto">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <TrendingUp size={15} style={{ color: "var(--accent-green)" }} />
              Contribution Activity
            </p>
            <span className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "var(--accent-green)" }}>
              Past 52 weeks
            </span>
          </div>

          <div className="flex gap-[3px] min-w-max">
            {GRID.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => {
                  const idx = wi * 7 + di;
                  return (
                    <motion.div key={di}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={gridVisible ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: idx * 0.0006, duration: 0.2 }}
                      whileHover={{ scale: 1.7, zIndex: 10 }}
                      className="w-3 h-3 rounded-sm cursor-pointer relative group transition-transform"
                      style={{ backgroundColor: CELL_COLORS[level], boxShadow: level >= 3 ? `0 0 4px ${CELL_COLORS[level]}` : "none" }}>
                      {level > 0 && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity"
                          style={{ background: "rgba(3,4,14,0.95)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }}>
                          {level} contribution{level !== 1 ? "s" : ""}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-5">
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Less</span>
            {CELL_COLORS.map((c, i) => <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />)}
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>More</span>
          </div>
        </motion.div>

        {/* Monthly bar chart */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="glass p-6 mb-6">
          <p className="text-sm font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Monthly Contributions</p>
          <div className="flex items-end gap-2 h-24">
            {MONTHS.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <motion.div className="w-full rounded-t-md relative overflow-hidden"
                  style={{ height: `${MONTH_ACTIVITY[i]}%`, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.2)" }}
                  initial={{ scaleY: 0, originY: 1 }} whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}>
                  <motion.div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(74,222,128,0.5),rgba(74,222,128,0.1))" }}
                    animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2 + i * 0.1, repeat: Infinity }} />
                </motion.div>
                <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>{m}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="flex justify-center">
          <motion.a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(74,222,128,0.2)" }} whileTap={{ scale: 0.95 }}
            className="glass shimmer-card gradient-border inline-flex items-center gap-2 px-6 py-3 text-sm font-medium cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-green)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
            <GithubIcon size={15} />
            View Full GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

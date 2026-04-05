"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";

const socials = [
  { href: "https://github.com/lukeuthy",                    icon: GithubIcon,   label: "GitHub" },
  { href: "https://linkedin.com/in/jasper-navarez",         icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://twitter.com/lukeuthy",                   icon: XIcon,        label: "Twitter" },
  { href: "mailto:navareznikkojasper@gmail.com",            icon: Mail,         label: "Email" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Organizations", href: "#organizations" },
  { label: "Certifications", href: "#certifications" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{ borderTop: "1px solid rgba(120,140,255,0.12)" }}
    >
      {/* Nebula glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(120,140,255,0.3), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <a
              href="#"
              className="inline-block font-bold text-2xl cursor-pointer"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="gradient-text-cyan-violet">&lt;Dev/&gt;</span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Building the web, one commit at a time. Open to new opportunities and collaborations.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 16px rgba(167,139,250,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    background: "rgba(10,15,35,0.5)",
                    border: "1px solid rgba(120,140,255,0.15)",
                    color: "var(--text-muted)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent-violet)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                  aria-label={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm cursor-pointer transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Get In Touch
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
            <motion.a
              href="mailto:navareznikkojasper@gmail.com"
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(56,189,248,0.35)" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(167,139,250,0.2))",
                border: "1px solid rgba(120,140,255,0.3)",
                color: "var(--text-primary)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Mail size={14} />
              Say Hello
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(120,140,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Jasper Nikko Navarez. Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, boxShadow: "0 0 16px rgba(167,139,250,0.25)" }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(10,15,35,0.5)",
              border: "1px solid rgba(120,140,255,0.18)",
              color: "var(--text-muted)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent-violet)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            aria-label="Scroll to top"
          >
            <ArrowUp size={13} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

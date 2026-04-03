"use client";

// Single fixed background layer for the entire page.
// All nebula blobs are fixed so they move with the viewport — sections see
// the same continuous space environment regardless of scroll position.
// Per-section background overrides in individual components must be removed.

export default function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* ── Deep base ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, #04050f 0%, #060818 35%, #03040e 65%, #050615 100%)"
      }} />

      {/* ── Primary nebula blobs (large, slow, atmospheric) ── */}

      {/* Top-left violet cloud — bleeds into Hero + About */}
      <div className="absolute" style={{
        width: 900, height: 700,
        top: "-10%", left: "-10%",
        background: "radial-gradient(ellipse, rgba(109,40,217,0.28) 0%, rgba(88,28,135,0.12) 45%, transparent 70%)",
        filter: "blur(80px)",
        borderRadius: "50%",
      }} />

      {/* Top-right cyan — Hero accent */}
      <div className="absolute" style={{
        width: 700, height: 600,
        top: "-5%", right: "-8%",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, rgba(14,165,233,0.08) 50%, transparent 70%)",
        filter: "blur(90px)",
        borderRadius: "50%",
      }} />

      {/* Center-left indigo — bridges Hero to About */}
      <div className="absolute" style={{
        width: 800, height: 700,
        top: "22%", left: "-12%",
        background: "radial-gradient(ellipse, rgba(67,56,202,0.2) 0%, rgba(55,48,163,0.08) 55%, transparent 72%)",
        filter: "blur(100px)",
        borderRadius: "50%",
      }} />

      {/* Center-right blue — About to Projects */}
      <div className="absolute" style={{
        width: 750, height: 650,
        top: "32%", right: "-10%",
        background: "radial-gradient(ellipse, rgba(29,78,216,0.2) 0%, rgba(37,99,235,0.08) 50%, transparent 70%)",
        filter: "blur(95px)",
        borderRadius: "50%",
      }} />

      {/* Mid violet — Projects section */}
      <div className="absolute" style={{
        width: 850, height: 600,
        top: "50%", left: "15%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(109,40,217,0.07) 55%, transparent 72%)",
        filter: "blur(110px)",
        borderRadius: "50%",
      }} />

      {/* Mid-right teal — GitHub section */}
      <div className="absolute" style={{
        width: 700, height: 650,
        top: "60%", right: "-5%",
        background: "radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, rgba(6,182,212,0.06) 55%, transparent 70%)",
        filter: "blur(90px)",
        borderRadius: "50%",
      }} />

      {/* Lower-left blue-violet — Orgs */}
      <div className="absolute" style={{
        width: 800, height: 700,
        top: "75%", left: "-8%",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.2) 0%, rgba(67,56,202,0.08) 50%, transparent 70%)",
        filter: "blur(100px)",
        borderRadius: "50%",
      }} />

      {/* Lower-right purple-pink — Certifications */}
      <div className="absolute" style={{
        width: 750, height: 650,
        top: "85%", right: "-5%",
        background: "radial-gradient(ellipse, rgba(147,51,234,0.2) 0%, rgba(192,38,211,0.08) 50%, transparent 70%)",
        filter: "blur(95px)",
        borderRadius: "50%",
      }} />

      {/* Bottom center — Footer fade */}
      <div className="absolute" style={{
        width: 900, height: 500,
        bottom: "-5%", left: "20%",
        background: "radial-gradient(ellipse, rgba(88,28,135,0.18) 0%, rgba(67,56,202,0.07) 55%, transparent 72%)",
        filter: "blur(110px)",
        borderRadius: "50%",
      }} />

      {/* ── Subtle grid ── */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(148,163,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,255,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* ── Top vignette to keep text readable ── */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 120% 50% at 50% 0%, transparent 60%, rgba(3,4,14,0.4) 100%)",
      }} />
    </div>
  );
}

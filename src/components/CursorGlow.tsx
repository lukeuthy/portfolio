"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let raf: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.left = `${cx}px`;
      el.style.top  = `${cy}px`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[9990]"
      style={{
        width: 500,
        height: 500,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(120,80,255,0.07) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)",
        filter: "blur(2px)",
      }}
    />
  );
}

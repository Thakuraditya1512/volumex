"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  { name: "Google", letter: "G" },
  { name: "Microsoft", letter: "M" },
  { name: "Amazon", letter: "a" },
  { name: "Spotify", letter: "♪" },
  { name: "Adobe", letter: "A" },
  { name: "Notion", letter: "N" },
  { name: "Vercel", letter: "▲" },
];

export default function TrustedSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="trusted"
      ref={ref}
      style={{
        padding: "56px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(90deg, #0a0e1a, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(270deg, #0a0e1a, transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 32 }}
        >
          Trusted by Learners & Professionals
        </motion.p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(24px, 4vw, 56px)", flexWrap: "wrap" }}>
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              id={`brand-${brand.name.toLowerCase()}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.08, opacity: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: 0.28,
                cursor: "pointer",
                filter: "grayscale(1)",
                transition: "filter 0.3s, opacity 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "grayscale(0)";
                el.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "grayscale(1)";
                el.style.opacity = "0.28";
              }}
            >
              <div style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                {brand.letter}
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.3px" }}>
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

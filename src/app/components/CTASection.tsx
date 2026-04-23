"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconArrowRight, IconUsers, IconMap, IconStar, IconBook } from "./Icons";

const stats = [
  { value: "10K+", label: "Active Learners", Icon: IconUsers, color: "#a78bfa" },
  { value: "500+", label: "Roadmaps Created", Icon: IconMap, color: "#60a5fa" },
  { value: "98%", label: "Satisfaction Rate", Icon: IconStar, color: "#fbbf24" },
  { value: "50+", label: "Tech Topics", Icon: IconBook, color: "#34d399" },
];

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      style={{ padding: "110px 24px", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="cta-grid">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 100, fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 22 }}>
              Get Started
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Start Your Journey{" "}
              <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Today
              </span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, marginBottom: 34, maxWidth: 420 }}>
              Generate your first roadmap for free and see where it takes you. Join 10,000+ learners already growing their tech careers.
            </p>

            {/* Email form */}
            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              <motion.input
                whileFocus={{ borderColor: "rgba(124,58,237,0.5)", boxShadow: "0 0 0 3px rgba(124,58,237,0.12)" }}
                type="email"
                id="cta-email"
                placeholder="Enter your email..."
                style={{
                  flex: 1, minWidth: 200, padding: "13px 16px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)",
                  color: "#f1f5f9", fontSize: 14, outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              />
              <motion.button
                id="cta-submit"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 22px", fontSize: 14, fontWeight: 700,
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "white",
                  border: "none", borderRadius: 10, cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(124,58,237,0.35)", whiteSpace: "nowrap",
                }}
              >
                Get Your Free Roadmap
                <IconArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </div>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.28)" }}>✓ Free forever · ✓ No credit card · ✓ Cancel anytime</p>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
                style={{
                  padding: "22px 18px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)", textAlign: "center", cursor: "default",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${stat.color}30`;
                  el.style.boxShadow = `0 12px 30px rgba(0,0,0,0.2)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${stat.color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <stat.Icon size={16} strokeWidth={1.5} style={{ color: stat.color }} />
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, letterSpacing: "-1px", marginBottom: 4, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

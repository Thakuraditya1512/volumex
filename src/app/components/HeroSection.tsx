"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IconArrowRight, IconPlay, IconTrendingUp, IconCode, IconMap, IconAward, IconGithub } from "./Icons";

// ── Professional Dashboard Mockup ─────────────────────────────────────────────
const DashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: 8 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    style={{ perspective: 1200, transformStyle: "preserve-3d" }}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#0d1117",
        boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        maxWidth: 620,
        width: "100%",
      }}
    >
      {/* Window chrome */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.9 }} />
          ))}
        </div>
        <div style={{ flex: 1, marginLeft: 8, background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 24, display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>app.skillbridge.io/dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[IconCode, IconTrendingUp].map((Icon, i) => (
            <Icon key={i} size={14} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </div>

      {/* Dashboard layout */}
      <div style={{ display: "flex" }}>
        {/* Thin sidebar */}
        <div style={{ width: 52, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          {[IconMap, IconCode, IconTrendingUp, IconAward, IconGithub, Settings2].map((Icon, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? "rgba(124,58,237,0.2)" : "transparent", border: i === 0 ? "1px solid rgba(124,58,237,0.35)" : "1px solid transparent", cursor: "pointer" }}>
              <Icon size={14} strokeWidth={1.5} style={{ color: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.25)" }} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "16px 14px", minWidth: 0 }}>
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.3px" }}>Dashboard</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>Welcome back, Ananya 👋</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #3b82f6)", fontSize: 10, fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Streak", value: "12d", change: "+3", color: "#a78bfa", icon: "🔥" },
              { label: "Progress", value: "72%", change: "+5%", color: "#34d399", icon: "📈" },
              { label: "Projects", value: "8", change: "+1", color: "#60a5fa", icon: "📦" },
            ].map((kpi) => (
              <div key={kpi.label} style={{ padding: "10px 11px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{kpi.label}</div>
                  <div style={{ fontSize: 9, color: "#34d399", fontWeight: 600 }}>{kpi.change}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: kpi.color, letterSpacing: "-0.5px", lineHeight: 1 }}>{kpi.value}</div>
              </div>
            ))}
          </div>

          {/* Roadmap progress */}
          <div style={{ padding: "12px 13px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9" }}>Full Stack Roadmap</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Step 7 of 15 · Est. 8 weeks left</div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#a78bfa" }}>47%</div>
            </div>
            {/* Progress bar with glow */}
            <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: 10 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "47%" }}
                transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #7c3aed, #3b82f6)", boxShadow: "0 0 10px rgba(124,58,237,0.6)" }}
              />
            </div>
            {/* Tech stack pills */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {[
                { name: "HTML", done: true }, { name: "CSS", done: true }, { name: "JS", done: true },
                { name: "React", done: true }, { name: "Node", done: false }, { name: "MongoDB", done: false },
                { name: "Deploy", done: false },
              ].map((t) => (
                <div key={t.name} style={{ padding: "2px 7px", borderRadius: 5, background: t.done ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${t.done ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}`, fontSize: 8, fontWeight: 600, color: t.done ? "#a78bfa" : "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 3 }}>
                  {t.done && <span style={{ color: "#34d399", fontSize: 7 }}>✓</span>}
                  {t.name}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: GitHub + Recent */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ padding: "10px 11px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                <IconGithub size={12} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.4)" }} />
                <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>GITHUB</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ l: "Repos", v: "24" }, { l: "Commits", v: "128" }].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "10px 11px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>UPCOMING</div>
              {[
                { text: "Finish React Course", d: "2d" },
                { text: "Build Portfolio", d: "5d" },
              ].map((m) => (
                <div key={m.text} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ fontSize: 9, color: "#f1f5f9", lineHeight: 1.3 }}>{m.text}</div>
                  <div style={{ fontSize: 8, color: "#a78bfa", fontWeight: 600, flexShrink: 0, marginLeft: 4 }}>{m.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Floating stat cards */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      style={{
        position: "absolute",
        bottom: -20,
        left: -32,
        padding: "10px 14px",
        borderRadius: 12,
        background: "rgba(13,17,23,0.95)",
        border: "1px solid rgba(124,58,237,0.3)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconTrendingUp size={14} strokeWidth={1.5} style={{ color: "#34d399" }} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9" }}>+12% this week</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Progress streak</div>
      </div>
    </motion.div>

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      style={{
        position: "absolute",
        top: 60,
        right: -40,
        padding: "10px 14px",
        borderRadius: 12,
        background: "rgba(13,17,23,0.95)",
        border: "1px solid rgba(96,165,250,0.3)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 700, color: "#f1f5f9", marginBottom: 2 }}>🎯 Milestone Hit!</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Completed React module</div>
    </motion.div>
  </motion.div>
);

// inline helper — won't import to avoid circular
function Settings2(props: React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  const { size = 20, strokeWidth = 1.5, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// ── Feature bullets ────────────────────────────────────────────────────────────
const features = [
  { icon: IconMap, title: "AI Roadmap Generator", desc: "Personalized learning paths in seconds." },
  { icon: IconCode, title: "Built-in IDE", desc: "Write, run & build projects in one place." },
  { icon: IconTrendingUp, title: "Progress Tracking", desc: "Track streaks, milestones & achievements." },
  { icon: IconGithub, title: "GitHub & LinkedIn Sync", desc: "Showcase & grow your professional profile." },
];

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100vh",
        padding: "100px 24px 120px",
        position: "relative",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Parallax background blobs */}
      <motion.div
        style={{ position: "absolute", inset: 0, y: bgY, pointerEvents: "none", zIndex: 0 }}
      >
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", top: "40%", right: "0%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </motion.div>

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Announcement chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 28 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 100, padding: "6px 14px 6px 6px", cursor: "pointer" }}
              >
                <span style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", borderRadius: 100, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "white" }}>New</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>AI Roadmaps — Generate personalized paths in seconds</span>
                <IconArrowRight size={12} strokeWidth={2} style={{ color: "rgba(255,255,255,0.3)" }} />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              style={{
                fontSize: "clamp(38px, 5.5vw, 72px)",
                fontWeight: 900,
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                marginBottom: 12,
                color: "#f1f5f9",
              }}
            >
              Learn. Code. Track.
              <br />
              <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Grow Together.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 480, marginBottom: 36 }}
            >
              SkillBridge is your all-in-one platform to learn in-demand skills, code in our built-in IDE, track your progress, and showcase your journey with GitHub & LinkedIn integration.
            </motion.p>

            {/* Feature bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px", marginBottom: 36 }}
              className="feature-bullets"
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <f.icon size={13} strokeWidth={1.5} style={{ color: "#a78bfa" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 1 }}>{f.title}</div>
                    <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}
            >
              <motion.a
                href="#pricing"
                id="hero-cta-primary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 26px", fontSize: 15, fontWeight: 700,
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  color: "white", borderRadius: 11, textDecoration: "none",
                  boxShadow: "0 8px 25px rgba(124,58,237,0.35)",
                }}
              >
                Get Started for Free
                <IconArrowRight size={15} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                href="#demo"
                id="hero-cta-demo"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 26px", fontSize: 15, fontWeight: 600,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f1f5f9", borderRadius: 11, textDecoration: "none",
                }}
              >
                <IconPlay size={14} strokeWidth={1.5} />
                View Demo
              </motion.a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ display: "flex", gap: 20, flexWrap: "wrap" }}
            >
              {["✓ Free roadmap", "✓ No credit card", "✓ Cancel anytime"].map((t) => (
                <span key={t} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.32)", fontWeight: 500 }}>{t}</span>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: Dashboard ── */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <DashboardMockup />
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: none;
          }
          .feature-bullets {
            justify-items: start;
            text-align: left;
          }
          #hero {
            padding-top: 90px !important;
            padding-bottom: 60px !important;
          }
        }
        @media (max-width: 480px) {
          .feature-bullets {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

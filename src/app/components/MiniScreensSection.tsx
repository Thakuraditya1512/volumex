"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconMap, IconTrendingUp, IconAward, IconSettings, IconTerminal } from "./Icons";

const miniScreens = [
  {
    id: "roadmap-screen",
    title: "Roadmap",
    Icon: IconMap,
    content: (
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>Full Stack Developer</div>
        <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", width: "47%", borderRadius: 2, background: "linear-gradient(90deg, #7c3aed, #3b82f6)" }} />
        </div>
        {["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Projects", "Deployment", "APIs", "Auth", "Testing", "Advanced"].map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1px solid ${i < 4 ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.1)"}`, background: i < 4 ? "rgba(124,58,237,0.2)" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#a78bfa" }}>
              {i < 4 ? "✓" : ""}
            </div>
            <span style={{ fontSize: 9.5, color: i < 4 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.28)" }}>{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "progress-screen",
    title: "Progress",
    Icon: IconTrendingUp,
    content: (
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f1f5f9", marginBottom: 10 }}>Overall Progress</div>
        {/* Ring chart */}
        <div style={{ width: 72, height: 72, margin: "0 auto 12px", position: "relative" }}>
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle cx="36" cy="36" r="28" fill="none" stroke="url(#prog-grad)" strokeWidth="6" strokeDasharray="175.9" strokeDashoffset="92" strokeLinecap="round" />
            <defs>
              <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#f1f5f9" }}>72%</div>
        </div>
        {[["HTML", 100], ["CSS", 90], ["JavaScript", 75], ["React", 60], ["Node.js", 40]].map(([skill, pct]) => (
          <div key={skill as string} style={{ marginBottom: 7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.5)" }}>{skill}</span>
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)" }}>{pct}%</span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: "linear-gradient(90deg, #7c3aed, #3b82f6)" }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "achievements-screen",
    title: "Achievements",
    Icon: IconAward,
    content: (
      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f1f5f9" }}>12 Achievements</div>
          <span style={{ fontSize: 9, color: "#a78bfa" }}>View All</span>
        </div>
        {[
          { title: "Consistent Learner", desc: "7-day streak", icon: "✦" },
          { title: "Problem Solver", desc: "Solve 20 problems", icon: "◆" },
          { title: "Early Bird", desc: "5 days in a row", icon: "◉" },
          { title: "Project Builder", desc: "Build 3 projects", icon: "▣" },
        ].map((ach, i) => (
          <div key={ach.title} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid rgba(167,139,250,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#a78bfa", flexShrink: 0 }}>{ach.icon}</div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{ach.title}</div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.3)" }}>{ach.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "settings-screen",
    title: "Settings",
    Icon: IconSettings,
    content: (
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f1f5f9", marginBottom: 10 }}>Profile</div>
        {[
          ["Name", "skillup"],
          ["Email", "skillup@example.com"],
          ["Username", "developer"],
          ["Password", "••••••••••"],
        ].map(([label, value]) => (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>{label}</div>
            <div style={{ padding: "5px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 10, color: "rgba(255,255,255,0.65)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
          </div>
        ))}
        <div style={{ padding: "6px 10px", borderRadius: 7, background: "linear-gradient(135deg, #7c3aed, #6366f1)", fontSize: 10, fontWeight: 600, color: "white", textAlign: "center", marginTop: 8, cursor: "pointer" }}>Save Changes</div>
        <div style={{ marginTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>ACCOUNT</div>
          <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.25)" }}>Network: http://192.168.3.1:3000</div>
        </div>
      </div>
    ),
  },
  {
    id: "mobile-screen",
    title: "Mobile App",
    Icon: IconTerminal,
    content: (
      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "white" }}>SB</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9" }}>SkillBridge</span>
        </div>
        {[
          { label: "Home", active: true },
          { label: "Roadmap" }, { label: "Courses" },
          { label: "IDE" }, { label: "Progress" },
          { label: "Achievements" }, { label: "GitHub" },
          { label: "Messages" }, { label: "Settings" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 8px", borderRadius: 6, background: item.active ? "rgba(124,58,237,0.15)" : "transparent", marginBottom: 1, cursor: "pointer" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1px solid ${item.active ? "#a78bfa" : "rgba(255,255,255,0.15)"}`, background: item.active ? "#a78bfa" : "transparent", flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: item.active ? "#a78bfa" : "rgba(255,255,255,0.38)", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function MiniScreensSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="screens"
      ref={ref}
      style={{ padding: "90px 24px", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)", borderRadius: 100, fontSize: 11, fontWeight: 600, color: "#34d399", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>
            All Views
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.035em", marginBottom: 12 }}>
            Every Screen,{" "}
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Beautifully Designed
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", maxWidth: 460, margin: "0 auto" }}>
            From roadmaps to achievements — every part of your learning journey has a home.
          </p>
        </motion.div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}
          className="mini-screens-grid"
        >
          {miniScreens.map((screen, idx) => (
            <motion.div
              key={screen.id}
              id={screen.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.09, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "#0d1117",
                cursor: "pointer",
                transition: "box-shadow 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(124,58,237,0.08)";
                el.style.borderColor = "rgba(124,58,237,0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              {/* Title bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                ))}
                <screen.Icon size={11} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.3)", marginLeft: 4 }} />
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{screen.title}</span>
              </div>
              <div style={{ color: "#f1f5f9", minHeight: 290 }}>{screen.content}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .mini-screens-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .mini-screens-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .mini-screens-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

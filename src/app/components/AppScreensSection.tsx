"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  IconHome, IconMap, IconBook, IconCode,
  IconTrendingUp, IconAward, IconGithub,
  IconMessage, IconSettings, IconTerminal,
} from "./Icons";

// ── Sidebar nav items ──────────────────────────────────────────────────────────
const sideNavItems = [
  { icon: IconHome, label: "Home", id: "dashboard" },
  { icon: IconMap, label: "Roadmap", id: "roadmap" },
  { icon: IconBook, label: "Courses" },
  { icon: IconCode, label: "IDE", id: "ide" },
  { icon: IconTrendingUp, label: "Progress" },
  { icon: IconAward, label: "Achievements" },
  { icon: IconGithub, label: "GitHub" },
  { icon: IconMessage, label: "Messages" },
  { icon: IconSettings, label: "Settings" },
];

// ── Tab definitions ────────────────────────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard", Icon: IconHome },
  { id: "ide", label: "IDE", Icon: IconCode },
  { id: "roadmap", label: "Roadmap", Icon: IconMap },
];

// ── Screen content ─────────────────────────────────────────────────────────────
function DashboardContent() {
  return (
    <div style={{ padding: 20, height: "100%", overflowY: "auto" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 2 }}>Welcome back, Ananya 👋</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Keep learning, keep building, keep growing</div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        {[
          { l: "Streak", v: "12d", c: "#a78bfa" },
          { l: "Progress", v: "72%", c: "#34d399" },
          { l: "Hours", v: "48", c: "#60a5fa" },
          { l: "Badges", v: "12", c: "#fbbf24" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{s.l}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.c, lineHeight: 1 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div style={{ padding: "12px 14px", borderRadius: 11, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9" }}>Full Stack Developer</div>
          <span style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600 }}>47%</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", width: "47%", borderRadius: 3, background: "linear-gradient(90deg, #7c3aed, #3b82f6)", boxShadow: "0 0 10px rgba(124,58,237,0.5)" }} />
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {[{ n: "HTML", d: true }, { n: "CSS", d: true }, { n: "JS", d: true }, { n: "React", d: true }, { n: "Node", d: false }, { n: "MongoDB", d: false }, { n: "Deploy", d: false }].map((t) => (
            <span key={t.n} style={{ padding: "2px 7px", borderRadius: 5, background: t.d ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)", border: `1px solid ${t.d ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)"}`, fontSize: 9, fontWeight: 600, color: t.d ? "#a78bfa" : "rgba(255,255,255,0.3)" }}>{t.n}</span>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { title: "GitHub", rows: [["Repos", "24"], ["Commits", "128"], ["PRs", "18"]] },
          { title: "Upcoming", rows: [["Finish React Course", "2d"], ["Build Portfolio", "5d"], ["30 DSA Problems", "9d"]] },
        ].map((box) => (
          <div key={box.title} style={{ padding: "11px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{box.title}</div>
            {box.rows.map(([a, b]) => (
              <div key={a} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{a}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#f1f5f9" }}>{b}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function IDEContent() {
  return (
    <div style={{ display: "flex", height: "100%", fontFamily: "monospace" }}>
      {/* File tree */}
      <div style={{ width: 150, background: "rgba(0,0,0,0.2)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "10px 8px", overflow: "hidden" }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, textTransform: "uppercase", padding: "0 4px", marginBottom: 8 }}>Explorer</div>
        {[
          { name: "my-project", indent: 0, icon: "📁" },
          { name: "App.jsx", indent: 1, icon: "⚛️", active: true },
          { name: "styles.css", indent: 1, icon: "🎨" },
          { name: "public", indent: 1, icon: "📁" },
          { name: "package.json", indent: 1, icon: "📋" },
        ].map((f) => (
          <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 4px", paddingLeft: 4 + f.indent * 12, borderRadius: 5, background: f.active ? "rgba(124,58,237,0.15)" : "transparent", marginBottom: 1, cursor: "pointer" }}>
            <span style={{ fontSize: 11 }}>{f.icon}</span>
            <span style={{ fontSize: 10, color: f.active ? "#a78bfa" : "rgba(255,255,255,0.45)", fontWeight: f.active ? 600 : 400 }}>{f.name}</span>
          </div>
        ))}
      </div>

      {/* Code editor */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "8px 14px", fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#a78bfa" }}>App.jsx</span>
          <span style={{ opacity: 0.4 }}>×</span>
        </div>
        <div style={{ flex: 1, padding: 14, fontSize: 12, lineHeight: 2, color: "#c9d1d9", overflowY: "auto" }}>
          {[
            [["keyword", "import"], ["plain", " React "], ["keyword", "from"], ["string", " 'react'"], ["plain", ";"]],
            [["keyword", "import"], ["plain", " { "], ["plain", "styles"], ["plain", " } "], ["keyword", "from"], ["string", " './styles.css'"], ["plain", ";"]],
            [],
            [["keyword", "function"], ["fn", " App"], ["plain", "() {"]],
            [["plain", "  "], ["keyword", "return"], ["plain", " ("]],
            [["plain", "    <"], ["tag", "div"], ["attr", " className"], ["plain", "="], ["string", '"app"'], ["plain", ">"]],
            [["plain", "      <"], ["tag", "h1"], ["plain", ">SkillBridge IDE</" ], ["tag", "h1"], ["plain", ">"]],
            [["plain", "    </"], ["tag", "div"], ["plain", ">"]],
            [["plain", "  );"]],
            [["plain", "}"]],
            [],
            [["keyword", "export default"], ["plain", " App;"]],
          ].map((line, li) => (
            <div key={li} style={{ display: "flex", gap: 0 }}>
              {line.length === 0 ? <span>&nbsp;</span> : line.map(([type, text], ti) => (
                <span key={ti} style={{ color: type === "keyword" ? "#ff7b72" : type === "string" ? "#a5d6ff" : type === "fn" ? "#d2a8ff" : type === "tag" ? "#7ee787" : type === "attr" ? "#79c0ff" : "#c9d1d9" }}>{text}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div style={{ height: 90, background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 14px" }}>
          <div style={{ display: "flex", gap: 12, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            <span>PROBLEMS</span><span>OUTPUT</span><span style={{ color: "#a78bfa", borderBottom: "1px solid #a78bfa", paddingBottom: 2 }}>TERMINAL</span>
          </div>
          <div style={{ fontSize: 11, color: "#34d399" }}>✓ Compiled successfully!</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Local: <span style={{ color: "#60a5fa" }}>http://localhost:3000</span></div>
        </div>
      </div>
    </div>
  );
}

function RoadmapContent() {
  return (
    <div style={{ padding: 20, height: "100%", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>Full Stack Developer</div>
        <span style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", fontSize: 11, fontWeight: 700, color: "#34d399" }}>47% Done</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 20 }}>
        <div style={{ height: "100%", width: "47%", borderRadius: 3, background: "linear-gradient(90deg, #7c3aed, #3b82f6)" }} />
      </div>
      {["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Projects", "Deployment", "APIs", "Auth", "Testing", "Advanced"].map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}
        >
          <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${i < 5 ? "#a78bfa" : "rgba(255,255,255,0.1)"}`, background: i < 5 ? "rgba(124,58,237,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: i < 5 ? "#a78bfa" : "rgba(255,255,255,0.2)", flexShrink: 0 }}>
            {i < 5 ? "✓" : i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: i < 5 ? "#f1f5f9" : "rgba(255,255,255,0.35)" }}>{step}</div>
            <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.05)", marginTop: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #7c3aed, #3b82f6)", width: i < 5 ? "100%" : i === 5 ? "60%" : "0%" }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const screenContent: Record<string, React.ReactNode> = {
  dashboard: <DashboardContent />,
  ide: <IDEContent />,
  roadmap: <RoadmapContent />,
};

export default function AppScreensSection() {
  const [active, setActive] = useState("dashboard");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="demo" ref={ref} style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 60%, rgba(59,130,246,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 100, fontSize: 11, fontWeight: 600, color: "#60a5fa", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>
            Live Preview
          </div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.035em" }}>
            See It{" "}
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              In Action
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", maxWidth: 480, margin: "0 auto" }}>
            Explore the powerful tools inside SkillBridge — from the smart dashboard to the full IDE experience.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: "1px solid", cursor: "pointer",
                borderColor: active === tab.id ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)",
                background: active === tab.id ? "rgba(124,58,237,0.12)" : "transparent",
                color: active === tab.id ? "#a78bfa" : "rgba(255,255,255,0.45)",
                transition: "all 0.25s",
              }}
            >
              <tab.Icon size={15} strokeWidth={1.5} />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* App window */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0d1117",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.07)",
          }}
        >
          {/* Chrome bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
            <div style={{ flex: 1, marginLeft: 8, background: "rgba(255,255,255,0.05)", borderRadius: 7, height: 26, display: "flex", alignItems: "center", padding: "0 10px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840", marginRight: 7 }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>app.skillbridge.io/{active}</span>
            </div>
          </div>

          {/* Layout */}
          <div style={{ display: "flex", height: 500 }} className="app-content-area">
            {/* Sidebar */}
            <div style={{ width: 200, background: "rgba(0,0,0,0.2)", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "16px 10px", display: "flex", flexDirection: "column" }} className="app-sidebar">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, padding: "0 4px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>SB</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>SkillBridge</span>
              </div>

              {sideNavItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 3 }}
                  onClick={() => item.id && setActive(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, marginBottom: 2, cursor: "pointer",
                    background: item.id === active ? "rgba(124,58,237,0.15)" : "transparent",
                    border: `1px solid ${item.id === active ? "rgba(124,58,237,0.2)" : "transparent"}`,
                    transition: "all 0.2s",
                  }}
                >
                  <item.icon size={14} strokeWidth={1.5} style={{ color: item.id === active ? "#a78bfa" : "rgba(255,255,255,0.3)" }} />
                  <span style={{ fontSize: 12.5, fontWeight: item.id === active ? 600 : 400, color: item.id === active ? "#a78bfa" : "rgba(255,255,255,0.4)" }}>{item.label}</span>
                </motion.div>
              ))}

              {/* Upgrade */}
              <div style={{ marginTop: "auto", padding: "12px", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 10, background: "rgba(124,58,237,0.06)", cursor: "pointer" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", marginBottom: 3 }}>Upgrade to Pro</div>
                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", marginBottom: 8, lineHeight: 1.4 }}>Unlock all features & AI models</div>
                <div style={{ padding: "5px 10px", background: "linear-gradient(135deg, #7c3aed, #6366f1)", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "white", textAlign: "center" }}>Upgrade Now</div>
              </div>

              {/* User */}
              <div style={{ display: "flex", gap: 8, marginTop: 12, padding: "8px 4px", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>A</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Ananya Singh</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Student</div>
                </div>
              </div>
            </div>

            {/* Main panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                style={{ flex: 1, overflow: "hidden", color: "#f1f5f9" }}
              >
                {screenContent[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .app-sidebar { display: none !important; }
          .app-content-area { height: 420px !important; }
        }
      `}</style>
    </section>
  );
}

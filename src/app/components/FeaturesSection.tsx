"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IconBrain,
  IconCode,
  IconTrendingUp,
  IconLink,
  IconBarChart,
  IconCheck,
  IconArrowRight,
} from "./Icons";

const features = [
  {
    id: "ai-roadmaps",
    Icon: IconBrain,
    title: "AI Roadmaps",
    desc: "Personalized learning paths based on your goals, experience, and available time.",
    accentColor: "#a78bfa",
    borderColor: "rgba(167,139,250,0.2)",
    items: ["Skill gap analysis", "Weekly study plans", "Adaptive learning", "Goal tracking"],
  },
  {
    id: "built-in-ide",
    Icon: IconCode,
    title: "Built-in IDE",
    desc: "Code, test & deploy without leaving the platform. Full syntax highlighting and live preview.",
    accentColor: "#60a5fa",
    borderColor: "rgba(96,165,250,0.2)",
    items: ["Multi-language support", "Live preview", "Code snippets", "Auto-complete"],
  },
  {
    id: "progress-tracking",
    Icon: IconTrendingUp,
    title: "Progress Tracking",
    desc: "Track your streaks, progress & achievements. Visual dashboards keep you motivated every day.",
    accentColor: "#34d399",
    borderColor: "rgba(52,211,153,0.2)",
    items: ["Daily streaks", "Achievement badges", "Learning analytics", "Milestone alerts"],
  },
  {
    id: "integrations",
    Icon: IconLink,
    title: "Integrations",
    desc: "Connect GitHub, LinkedIn & showcase your journey. Automatically sync projects and your network.",
    accentColor: "#fbbf24",
    borderColor: "rgba(251,191,36,0.2)",
    items: ["GitHub sync", "LinkedIn showcase", "Portfolio builder", "Resume export"],
  },
  // {
  //   id: "analytics",
  //   Icon: IconBarChart,
  //   title: "Analytics",
  //   desc: "Dedicated insights to help you grow faster with data-driven recommendations.",
  //   accentColor: "#22d3ee",
  //   borderColor: "rgba(34,211,238,0.2)",
  //   items: ["Performance reports", "Peer comparisons", "Topic mastery", "Smart recommendations"],
  // },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={ref} style={{ padding: "110px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 40%, rgba(124,58,237,0.05) 0%, transparent 55%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 100, fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>
            Everything You Need
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 16, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            One Platform,{" "}
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Infinite Possibilities
            </span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Everything you need to accelerate your tech career — learning, building, and growing in one beautiful place.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}
        >
          {features.map((f) => (
            <motion.div
              key={f.id}
              id={`feature-${f.id}`}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                padding: "28px 24px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = f.borderColor;
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${f.accentColor}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Subtle top glow line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${f.accentColor}40, transparent)`, opacity: 0 }} className="card-top-line" />

              {/* Icon */}
              <div style={{ width: 44, height: 44, borderRadius: 11, border: `1px solid ${f.borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <f.Icon size={20} strokeWidth={1.5} style={{ color: f.accentColor }} />
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, marginBottom: 20 }}>{f.desc}</p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {f.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${f.accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconCheck size={9} strokeWidth={2.5} style={{ color: f.accentColor }} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  style={{ fontSize: 13, fontWeight: 600, color: f.accentColor, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  Learn more <IconArrowRight size={12} strokeWidth={2} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

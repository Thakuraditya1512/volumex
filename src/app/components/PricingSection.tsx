"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconCheck, IconX, IconArrowRight } from "./Icons";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    accentColor: "var(--text-muted)",
    borderColor: "var(--border)",
    features: ["1 AI Roadmap", "Access to IDE", "Basic Progress Tracking", "Community Access", "5 Projects"],
    excluded: ["Advanced Analytics", "Priority Support", "Certificate", "Team Features"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 9,
    accentColor: "var(--accent-purple-light)",
    borderColor: "rgba(167,139,250,0.3)",
    features: ["Unlimited Roadmaps", "Advanced Analytics", "Priority Support", "Certificate", "Unlimited Projects", "GitHub & LinkedIn Sync", "AI Code Review", "Custom Learning Path"],
    excluded: ["Team Analytics", "Team Projects"],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: 29,
    accentColor: "var(--accent-blue)",
    borderColor: "rgba(34,211,238,0.15)",
    features: ["Everything in Pro", "Team Analytics", "Team Projects", "Priority Support", "Admin Controls", "SSO Integration", "Custom Branding", "Dedicated Account Manager"],
    excluded: [],
    cta: "Get Started",
    popular: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} style={{ padding: "110px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 55%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div className="section-badge" style={{ marginBottom: 20 }}>
            Simple Pricing
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Start Your Journey{" "}
            <span className="gradient-text">
              Today
            </span>
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "var(--text-secondary)", maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.7 }}>
            Generate your first roadmap for free and see where it takes you.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontSize: 14, color: annual ? "rgba(255,255,255,0.35)" : "#f1f5f9", fontWeight: 500 }}>Monthly</span>
            <motion.button
              id="billing-toggle"
              onClick={() => setAnnual(!annual)}
              whileTap={{ scale: 0.95 }}
              style={{ width: 50, height: 27, borderRadius: 14, background: annual ? "rgba(124,58,237,0.8)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "background 0.3s" }}
            >
              <motion.div
                animate={{ x: annual ? 23 : 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ width: 19, height: 19, borderRadius: "50%", background: "white", position: "absolute", top: 3, boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
              />
            </motion.button>
            <span style={{ fontSize: 14, color: annual ? "#f1f5f9" : "rgba(255,255,255,0.35)", fontWeight: 500 }}>
              Annual
              <motion.span
                animate={{ scale: annual ? 1 : 0.9 }}
                style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 100, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)", fontSize: 11, fontWeight: 700, color: "#34d399", display: "inline-block" }}
              >
                Save 20%
              </motion.span>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}
          className="pricing-grid"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              id={`plan-${plan.id}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              style={{
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-purple-light)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                }
              }}
            >
              {plan.popular && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", background: "var(--gradient-hero)", borderRadius: 100, fontSize: 11, fontWeight: 700, color: "white", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}>
                  ✦ Most Popular
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginTop: 14 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>$</span>
                  <motion.span
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: 46, fontWeight: 900, color: plan.popular ? plan.accentColor : "#f1f5f9", letterSpacing: "-2px", lineHeight: 1 }}
                  >
                    {annual ? Math.floor(plan.price * 0.8) : plan.price}
                  </motion.span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>/mo</span>
                </div>
              </div>

              <motion.a
                href="#"
                id={`cta-${plan.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={plan.popular ? "btn-primary" : "btn-secondary"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  textDecoration: "none", marginBottom: 28, transition: "all 0.3s ease",
                  width: "100%",
                }}
              >
                {plan.cta}
                <IconArrowRight size={15} strokeWidth={2.5} />
              </motion.a>

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${plan.accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconCheck size={9} strokeWidth={2.5} style={{ color: plan.accentColor }} />
                    </div>
                    {f}
                  </li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconX size={8} strokeWidth={2} style={{ color: "rgba(255,255,255,0.2)" }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(16px, 4vw, 36px)", marginTop: 48, flexWrap: "wrap" }}
        >
          {["No credit card required", "Cancel anytime", "Loved by 10,000+ learners"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "rgba(255,255,255,0.4)" }}>
              <IconCheck size={14} strokeWidth={2} style={{ color: "#34d399" }} />
              {t}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 801px) and (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

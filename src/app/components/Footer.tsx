"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconGithub, IconLinkedin, IconTwitter, IconYoutube, IconGlobe } from "./Icons";

const footerLinks: Record<string, string[]> = {
  Product: ["AI Roadmaps", "Built-in IDE", "Progress Tracking", "Integrations", "Analytics", "Mobile App"],
  Company: ["About Us", "Blog", "Careers", "Press Kit", "Contact"],
  Resources: ["Documentation", "Tutorials", "Community", "Changelog", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  { Icon: IconTwitter, label: "Twitter" },
  { Icon: IconLinkedin, label: "LinkedIn" },
  { Icon: IconGithub, label: "GitHub" },
  { Icon: IconYoutube, label: "YouTube" },
  { Icon: IconGlobe, label: "Website" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      id="footer"
      ref={ref}
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)", padding: "72px 24px 36px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="footer-grid"
          style={{ marginBottom: 60 }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>SB</div>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9" }}>SkillBridge</span>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.75, maxWidth: 250, marginBottom: 24 }}>
              Your all-in-one platform to learn, code, track progress, and grow your tech career.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {socials.map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  id={`social-${label.toLowerCase()}`}
                  title={label}
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  style={{
                    width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.3)", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(167,139,250,0.35)";
                    el.style.color = "#a78bfa";
                    el.style.background = "rgba(124,58,237,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.09)";
                    el.style.color = "rgba(255,255,255,0.3)";
                    el.style.background = "transparent";
                  }}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + ci * 0.07, duration: 0.5 }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 16, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                {category}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      style={{ fontSize: 13.5, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s", display: "block" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f1f5f9")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", marginBottom: 24 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} SkillBridge. All rights reserved. Built with ♡ for learners worldwide.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ color: "#f1f5f9" }}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 400px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

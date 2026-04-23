"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconChevronDown,
  IconMenu,
  IconClose,
  IconArrowRight,
} from "./Icons";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const navLinks = [
  { label: "Product", href: "#features", hasDropdown: true },
  { label: "Features", href: "#features", hasDropdown: true },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "Resources", href: "#", hasDropdown: true },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setRole(profile?.role || "student");
      }
    };
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 24px",
          transition: "background 0.3s ease, border 0.3s ease, backdrop-filter 0.3s ease",
          background: scrolled ? "rgba(10,14,26,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            id="logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
                color: "white",
                boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                letterSpacing: "-0.5px",
              }}
            >
              SB
            </motion.div>
            <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>
              SkillBridge
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className="sb-desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "7px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
                {link.hasDropdown && <IconChevronDown size={12} strokeWidth={2} />}
              </motion.a>
            ))}
          </div>

          {/* CTA group */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <motion.a
              href={user ? (role === "admin" ? "/admin" : role === "employee" ? "/employee" : "/student") : "/login"}
              id="nav-login"
              whileHover={{ y: -1 }}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              className="sb-desktop-nav"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
            >
              {user ? "Dashboard" : "Login"}
            </motion.a>

            <motion.a
              href={user ? (role === "admin" ? "/admin" : role === "employee" ? "/employee" : "/student") : "/signup"}
              id="nav-cta"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                color: "white",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              Get Started Free
              <IconArrowRight size={13} strokeWidth={2.5} />
            </motion.a>

            {/* Hamburger */}
            <motion.button
              id="mobile-menu-btn"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "7px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="sb-mobile-btn"
            >
              {mobileOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{
                overflow: "hidden",
                background: "rgba(10,14,26,0.98)",
                backdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ padding: "16px 20px 24px" }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "13px 0",
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {link.label}
                    {link.hasDropdown && <IconChevronDown size={14} />}
                  </motion.a>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <motion.a
                    href={user ? (role === "admin" ? "/admin" : "/student") : "/login"}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1, textAlign: "center", padding: "12px", borderRadius: 9, border: "1px solid var(--border)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {user ? "Dashboard" : "Login"}
                  </motion.a>
                  <motion.a
                    href="#pricing"
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1, textAlign: "center", padding: "12px", borderRadius: 9, background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "white", textDecoration: "none", fontSize: 14, fontWeight: 600 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @media (max-width: 900px) {
          .sb-desktop-nav { display: none !important; }
          .sb-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

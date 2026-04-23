"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message === "Email not confirmed" ? "Check your inbox to confirm your email." : authError.message);
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profile?.role === 'admin') router.push("/admin");
      else if (profile?.role === 'employee') router.push("/employee");
      else router.push("/student");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900 dot-background relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      {/* LEFT SIDE (FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-10">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-500/20"
            >
              <svg viewBox="0 0 18 18" fill="none" className="w-5 h-5">
                <path d="M9 2L15.5 5.5V12.5L9 16L2.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="9" cy="9" r="2.5" fill="white" />
              </svg>
            </motion.div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">CareerOS</span>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 text-sm font-medium">Enter your credentials to continue your career journey.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <AnimatePresence>
                {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-xs font-bold flex items-center gap-2"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {error}
                </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium placeholder-slate-400"
                />
                </div>

                <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium placeholder-slate-400 pr-12"
                    />
                    <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-indigo-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                </div>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-500 font-bold">
                <input type="checkbox" className="w-4 h-4 rounded-lg text-indigo-600 border-slate-200 focus:ring-indigo-500 cursor-pointer" />
                Stay logged in
              </label>
              <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-black tracking-tight transition-colors">
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRightIcon className="w-4 h-4 stroke-[3px]" /></>
              )}
            </motion.button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-400">Secure Access</span></div>
          </div>

          <p className="text-sm text-center text-slate-500 font-bold">
            New to CareerOS?{" "}
            <Link href="/signup" className="text-indigo-600 font-black hover:underline underline-offset-4 decoration-2">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE (SHOWCASE) */}
      <div className="hidden lg:flex w-1/2 bg-slate-50/50 border-l border-slate-100 items-center justify-center relative p-12">
        <div className="max-w-md relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-black text-slate-600 shadow-sm mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-amber-500" />
            Join 5,000+ top performers
          </motion.div>
          
          <h2 className="text-5xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Unlock your full <span className="text-indigo-600">potential.</span>
          </h2>
          <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed">
            Your career OS for personalized roadmaps, AI-driven mock interviews, and high-performance tracking.
          </p>

          {/* Premium Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 rotate-2"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                </div>
                <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Roadmap</p>
                    <h4 className="text-slate-900 font-black text-lg">Full Stack mastery</h4>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-indigo-600">82%</p>
                <p className="text-[10px] font-black text-slate-400 uppercase">Complete</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">XP Points</p>
                  <p className="font-black text-xl text-slate-900">12,450 ⚡</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Global Rank</p>
                  <p className="font-black text-xl text-slate-900">#142 🏆</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
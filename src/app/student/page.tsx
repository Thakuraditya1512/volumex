"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBook, IconMap, IconCode, IconStar, IconTrophy, IconArrowRight, IconBell, IconSettings, IconSearch, IconChevronRight } from "../components/Icons";
import { supabase } from "@/lib/supabase";

// ── TYPES ───────────────────────────────────────────────────
interface Roadmap {
  id: string;
  title: string;
  progress: number;
  lastActive: string;
  color: string;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// ── COMPONENTS ──────────────────────────────────────────────

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`glass rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <motion.button
    whileHover={{ x: 4, background: "rgba(255,255,255,0.05)" }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-slate-200"
    }`}
  >
    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
    {label}
  </motion.button>
);

// ── MAIN PAGE ───────────────────────────────────────────────

export default function StudentDashboard() {
  const [userName, setUserName] = useState("Ananya");
  const [loading, setLoading] = useState(true);

  // Mock data for initial perfect look
  const roadmaps: Roadmap[] = [
    { id: "1", title: "Full Stack Developer", progress: 72, lastActive: "2 hours ago", color: "#7c3aed" },
    { id: "2", title: "Data Science Specialization", progress: 45, lastActive: "Yesterday", color: "#3b82f6" },
  ];

  const badges: Badge[] = [
    { id: "b1", name: "Consistent", icon: "🔥", color: "#f59e0b" },
    { id: "b2", name: "Bug Hunter", icon: "🐞", color: "#ef4444" },
    { id: "b3", name: "Clean Code", icon: "✨", color: "#10b981" },
    { id: "b4", name: "Roadmap Pro", icon: "🗺️", color: "#6366f1" },
  ];

  useEffect(() => {
    // In real app, we fetch user profile from Supabase
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch profile data here
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0e1a] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 shrink-0 bg-[#0c1120]">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            SB
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SkillBridge</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={IconMap} label="Learning Path" active />
          <NavItem icon={IconBook} label="My Courses" />
          <NavItem icon={IconCode} label="Code Playground" />
          <NavItem icon={IconTrophy} label="Achievements" />
          <NavItem icon={IconStar} label="Saved" />
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
          <NavItem icon={IconSettings} label="Settings" />
          <NavItem icon={IconBell} label="Notifications" />
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-blue-600/10 border border-indigo-500/20 mt-4">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">PRO PLAN</p>
            <p className="text-sm font-semibold text-white">Unlimited Roadmaps</p>
            <button className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <header className="flex items-center justify-between mb-10 relative z-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-extrabold text-white tracking-tight"
            >
              Welcome back, {userName}! <span className="inline-block animate-bounce-subtle">👋</span>
            </motion.h1>
            <p className="text-slate-400 mt-1">You've completed 72% of your current roadmap. Keep it up!</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative glass rounded-xl px-4 py-2 flex items-center gap-3 border-white/10">
              <IconSearch size={18} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none text-sm w-48 text-white placeholder-slate-500"
              />
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-indigo-400 font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6 relative z-10">
          
          {/* Left Column: Progress & Roadmaps */}
          <div className="col-span-8 space-y-6">
            
            {/* Featured Roadmap */}
            <Card className="bg-gradient-to-r from-indigo-900/40 to-blue-900/20 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <IconMap size={120} strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  Currently Learning
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Full Stack Web Development</h2>
                <p className="text-slate-400 text-sm max-w-lg mb-8">
                  You are mastering the MERN stack. Next step: Deep dive into Redux Toolkit and State Management.
                </p>

                <div className="flex items-end gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                      <span>PROGRESS</span>
                      <span>72%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "72%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                      />
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors shrink-0">
                    Continue Learning <IconChevronRight size={16} />
                  </button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white">Daily Streak</h3>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    🔥
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">12 <span className="text-lg font-medium text-slate-500">days</span></div>
                <p className="text-xs text-slate-400">You're in the top 5% of learners this week!</p>
                <div className="mt-6 flex gap-2">
                  {[1,1,1,1,1,0,0].map((active, i) => (
                    <div key={i} className={`flex-1 h-1.5 rounded-full ${active ? "bg-orange-500" : "bg-white/5"}`} />
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white">Focus Time</h3>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-lg">
                    ⏱️
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">48 <span className="text-lg font-medium text-slate-500">hours</span></div>
                <p className="text-xs text-slate-400">Total learning time this month.</p>
                <div className="mt-6 flex items-end gap-1 h-8">
                  {[4,7,3,8,5,9,6].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Other Roadmaps */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Enrolled Roadmaps</h3>
                <button className="text-indigo-400 text-xs font-bold hover:underline">VIEW ALL</button>
              </div>
              <div className="space-y-3">
                {roadmaps.slice(1).map(rm => (
                  <motion.div 
                    key={rm.id}
                    whileHover={{ x: 6 }}
                    className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <IconBook size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{rm.title}</h4>
                        <p className="text-xs text-slate-500">Last active {rm.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs font-bold text-white">{rm.progress}%</div>
                        <div className="w-24 h-1 rounded-full bg-white/5 mt-1 overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${rm.progress}%` }} />
                        </div>
                      </div>
                      <IconArrowRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Activity */}
          <div className="col-span-4 space-y-6">
            
            {/* Achievements */}
            <Card>
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <IconTrophy size={18} className="text-yellow-500" /> 
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.map(badge => (
                  <motion.div 
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    className="p-3 rounded-2xl bg-white/3 border border-white/5 text-center group cursor-help"
                  >
                    <div className="text-3xl mb-2 filter drop-shadow-md group-hover:scale-110 transition-transform">
                      {badge.icon}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{badge.name}</div>
                  </motion.div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 rounded-xl border border-white/5 text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                View All Badges
              </button>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <h3 className="font-bold text-white mb-6">Upcoming Milestones</h3>
              <div className="space-y-4">
                {[
                  { label: "React State Management", time: "Today, 4:00 PM", status: "next" },
                  { label: "Build a Portfolio API", time: "Tomorrow", status: "pending" },
                  { label: "Deployment Basics", time: "Friday", status: "pending" },
                ].map((task, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 ${task.status === "next" ? "bg-indigo-500 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "border-slate-700"}`} />
                      {i < 2 && <div className="w-0.5 flex-1 bg-slate-800 my-1" />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${task.status === "next" ? "text-white" : "text-slate-400"}`}>{task.label}</h4>
                      <p className="text-xs text-slate-500">{task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Feed */}
            <Card>
              <h3 className="font-bold text-white mb-6">Learning Activity</h3>
              <div className="space-y-6">
                {[
                  { type: "completed", msg: "Finished 'CSS Grid Mastery'", time: "1h ago" },
                  { type: "badge", msg: "Earned 'Clean Code' badge", time: "3h ago" },
                  { type: "quiz", msg: "Scored 95% on React Quiz", time: "Yesterday" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      item.type === "completed" ? "bg-green-500" : 
                      item.type === "badge" ? "bg-yellow-500" : "bg-blue-500"
                    }`} />
                    <div>
                      <p className="text-xs text-slate-300">{item.msg}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>
      </main>
    </div>
  );
}

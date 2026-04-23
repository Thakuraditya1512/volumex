"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

// ─── IMPORTS ──────────────────────────────────────────────────────────────────
import { 
  IcoDashboard, IcoUsers, IcoMap, IcoBook, IcoClipboard, IcoBriefcase, 
  IcoServer, IcoSettings, IcoBell, IcoSearch, IcoArrowUpRight, 
  IcoChevRight, IcoChevDown, IcoLogout, IcoBadge, IcoTicket, 
  IcoBilling, IcoIntegrations, IcoReports, IcoAnalytics, IcoPlus, 
  IcoDownload, IcoFilter, IcoEdit, IcoTrash, IcoX 
} from "./components/AdminIcons";

import { 
  StatusDot, RoleBadge, StatusBadge, ProgressBar, CustomTooltip 
} from "@/components/admin/AdminUI";

import { 
  weeklyData, pieData, roadmapData, integrationData, recentActivities, 
  systemStatuses, quickActions, mockUsers 
} from "./mockData";

import { User } from "@/types";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/lib/context/AuthContext";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmapHours = ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"];
const avatarColors = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const { profile, loading: authLoading } = useAuth();
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [heatmap, setHeatmap] = useState<{ day: string; cells: { h: string; v: number }[] }[]>([]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const data = heatmapDays.map((day) => ({
      day,
      cells: heatmapHours.map((h) => ({ h, v: Math.floor(Math.random() * 100) })),
    }));
    setHeatmap(data);

    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const statCards = [
    { label: "Total Users", value: "5,690", sub: "vs last month", change: 12.5, icon: IcoUsers, color: "#4f46e5", bg: "#f5f3ff" },
    { label: "Students", value: "3,214", sub: "vs last month", change: 15.3, icon: IcoBook, color: "#2563eb", bg: "#eff6ff" },
    { label: "Employees", value: "1,987", sub: "vs last month", change: 10.2, icon: IcoBriefcase, color: "#059669", bg: "#ecfdf5" },
    { label: "Admins", value: "89", sub: "vs last month", change: 3.4, icon: IcoSettings, color: "#d97706", bg: "#fffbeb" },
  ];

  const contentStats = [
    { label: "Roadmaps", value: "142", sub: "Total Roadmaps", icon: IcoMap, color: "#4f46e5", link: "View all roadmaps" },
    { label: "Courses", value: "328", sub: "Total Courses", icon: IcoBook, color: "#2563eb", link: "View all courses" },
    { label: "Projects", value: "1,256", sub: "Total Projects", icon: IcoBriefcase, color: "#059669", link: "View all projects" },
    { label: "Assessments", value: "764", sub: "Total Assessments", icon: IcoClipboard, color: "#d97706", link: "View all assessments" },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (authLoading) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dot-background font-sans relative">
      
      {/* ── ADVANCED SIDEBAR ── */}
      <AppSidebar />

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md border-slate-200">
          <div className="flex items-center gap-4">
            <div className="">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Administration Portal</p>
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">System Console</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs shadow-sm">
              <IcoSearch size={14} className="text-slate-400" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search data..." className="bg-transparent outline-none w-40 text-slate-600 placeholder:text-slate-400 font-medium" />
            </div>

            <button className="relative p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
              <IcoBell size={18} className="text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-white bg-indigo-600" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900">{profile?.full_name || "Administrator"}</p>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-indigo-500/20">
                {profile?.full_name?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 lg:p-10 space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group rounded-3xl p-6 border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: s.bg, color: s.color }}><s.icon size={20} /></div>
                  <div className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg"><IcoArrowUpRight size={12} />{s.change}%</div>
                </div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{s.value}</p>
                <p className="text-[11px] font-black uppercase tracking-widest mt-2 text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 rounded-3xl p-8 border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Platform Growth</h3>
                  <p className="text-xs font-bold text-slate-400">Total active users and engagement over time</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-xs font-black text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors shadow-sm"><IcoDownload size={14} /> Report</button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight={600} axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} dx={-10} />
                    <Tooltip cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill: "#4f46e5", strokeWidth: 4, stroke: "#fff" }} activeDot={{ r: 8, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="activeUsers" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: "#2563eb", strokeWidth: 4, stroke: "#fff" }} activeDot={{ r: 8, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-3xl p-8 border border-slate-200 bg-white shadow-sm flex flex-col">
              <h3 className="text-lg font-black text-slate-900 mb-6">User Base</h3>
              <div className="flex-1 flex items-center justify-center relative">
                <PieChart width={200} height={200}>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={6} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-3xl font-black text-slate-900">5.7k</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full shadow-sm" style={{ background: item.color }} /> <span className="text-sm font-bold text-slate-500">{item.name}</span></div>
                    <span className="text-sm font-black text-slate-900">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* USER TABLE */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">User Management</h3>
                <p className="text-xs font-bold text-slate-400">Manage global user accounts and permissions</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white bg-indigo-600 shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-105 transition-all"><IcoPlus size={16} /> New User</button>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr><th className="px-8 py-5">Identities</th><th className="px-8 py-5">Role</th><th className="px-8 py-5">Status</th><th className="px-8 py-5">Account Age</th><th className="px-8 py-5 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user, i) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-xs shadow-md" style={{ background: avatarColors[i % avatarColors.length] }}>{initials(user.full_name)}</div>
                          <div><p className="text-sm font-black text-slate-900 leading-none mb-1">{user.full_name}</p><p className="text-[11px] text-slate-400 font-medium">{user.email}</p></div>
                        </div>
                      </td>
                      <td className="px-8 py-5"><RoleBadge role={user.role} /></td>
                      <td className="px-8 py-5"><StatusBadge status={user.status} /></td>
                      <td className="px-8 py-5 text-xs font-bold text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><IcoEdit size={16} /></button><button className="p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-all"><IcoTrash size={16} /></button></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-black text-indigo-600 hover:underline">View All Users (5,690)</button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  UserGroupIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  ArrowUpRightIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const stats = [
  { label: "Active Students", value: "156", change: "+12%", icon: UserGroupIcon, color: "indigo" },
  { label: "Pending Reviews", value: "24", change: "-5%", icon: ClockIcon, color: "amber" },
  { label: "Success Rate", value: "92%", change: "+3%", icon: AcademicCapIcon, color: "emerald" },
  { label: "Completed Projects", value: "842", change: "+18%", icon: BriefcaseIcon, color: "rose" },
];

const students = [
  { name: "Sarah Chen", email: "sarah.c@example.com", progress: 75, status: "On Track", avatar: "SC", color: "bg-indigo-100 text-indigo-600" },
  { name: "Alex Miller", email: "alex.m@example.com", progress: 42, status: "Needs Attention", avatar: "AM", color: "bg-amber-100 text-amber-600" },
  { name: "Jordan Smith", email: "jordan.s@example.com", progress: 90, status: "Exceptional", avatar: "JS", color: "bg-emerald-100 text-emerald-600" },
  { name: "Taylor Reed", email: "taylor.r@example.com", progress: 15, status: "Just Started", avatar: "TR", color: "bg-slate-100 text-slate-600" },
];

const upcomingEvents = [
  { title: "Mentor Session: React Advanced", time: "2:00 PM", date: "Today", type: "Webinar" },
  { title: "Review: Backend Roadmap", time: "4:30 PM", date: "Tomorrow", type: "Review" },
  { title: "New Student Orientation", time: "10:00 AM", date: "Friday", type: "Event" },
];

export default function EmployeeDashboard() {
  const { profile, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dot-background font-sans">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Employee Console</p>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                Welcome, {profile?.full_name?.split(' ')[0] || "Team Member"} <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Here's an overview of your student performance and upcoming tasks.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 shadow-sm">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-xs font-bold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">
                <PlusIcon className="w-4 h-4 stroke-[3px]" />
                New Update
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-black px-2 py-1 rounded-lg bg-green-50 text-green-600`}>{stat.change}</span>
                </div>
                <p className="text-3xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</p>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Student Table */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                    Student Management
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-400">
                      <MagnifyingGlassIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-400">
                      <FunnelIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Student</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Progress</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((student) => (
                        <tr key={student.email} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-2xl ${student.color} flex items-center justify-center font-black text-xs shadow-sm`}>
                                {student.avatar}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{student.name}</p>
                                <p className="text-[11px] text-slate-400 font-medium">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-32">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-black text-slate-500">{student.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    student.progress > 80 ? 'bg-emerald-500' : student.progress > 40 ? 'bg-indigo-500' : 'bg-amber-500'
                                  }`}
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                              student.status === 'On Track' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                              student.status === 'Exceptional' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 rounded-xl hover:bg-indigo-50 text-slate-300 hover:text-indigo-600 transition-all">
                              <ArrowUpRightIcon className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                  <button className="text-xs font-black text-indigo-600 hover:underline">View All Students</button>
                </div>
              </div>

              {/* Quick Actions Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl shadow-indigo-500/10 group">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-70">Global Analytics</h4>
                  <p className="text-2xl font-bold mb-6 leading-tight">Total Student Productivity up <span className="text-indigo-400">14%</span> this quarter.</p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                    Full Report <ArrowUpRightIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 rounded-[32px] border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Next Milestone</h4>
                    <p className="text-lg font-bold text-slate-900 leading-tight">Mid-term Assessment for "React Basics" Cohort</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">In 2 Days</span>
                    <button className="text-xs font-black text-indigo-600">Review Now</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              
              {/* Upcoming Events */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" /> Upcoming
                </h3>
                <div className="space-y-6">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mb-2 group-hover:scale-150 transition-transform" />
                        <div className="w-0.5 flex-1 bg-slate-100" />
                      </div>
                      <div className="pb-2">
                        <p className="text-xs font-black text-slate-900 leading-tight mb-1">{event.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold mb-2">{event.date} • {event.time}</p>
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-100">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 rounded-2xl bg-slate-50 text-slate-600 text-xs font-black hover:bg-slate-100 transition-colors">
                  View Schedule
                </button>
              </div>

              {/* Performance Card */}
              <div className="rounded-3xl bg-indigo-50 border border-indigo-100 p-8 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ChartBarIcon className="w-24 h-24 text-indigo-900" />
                </div>
                <h4 className="text-sm font-black text-indigo-900 mb-2">Team Goal</h4>
                <p className="text-xs font-bold text-indigo-700/70 mb-6 uppercase tracking-widest">Quarterly Progress</p>
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="white" strokeWidth="12" fill="transparent" />
                    <circle cx="64" cy="64" r="58" stroke="#4f46e5" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="91.1" strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-indigo-900">75%</span>
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-black text-xs shadow-xl shadow-indigo-200 group-hover:scale-105 transition-all">
                  Sync Analytics
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

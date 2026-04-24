"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FireIcon,
  BoltIcon,
  TrophyIcon,
  ClockIcon,
  SparklesIcon,
  PlayCircleIcon,
  MapIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  LockClosedIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { 
  CheckCircleIcon as CheckSolid,
  VideoCameraIcon,
  LinkIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { 
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { UserTask, Module } from "@/types";
import { AppSidebar } from "@/components/AppSidebar";
import GitHubAnalytics from "@/components/github/GitHubAnalytics";
import LeetCodeStats from "@/components/leetcode/LeetCodeStats";
// import LinkedInCard from "@/components/linkedin/LinkedInCard";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  user_id?: string;
  name: string;
  goal: string;
  experience: string;
  status: string;
  progress: number;
  tasks_done: number;
  tasks_total: number;
  xp: number;
  streak: number;
  color: string;
  created_at: string;
  updated_at: string;
}
interface Activity {
  id: string;
  user_id?: string;
  type: string;
  title: string;
  xp_earned: number;
  created_at: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const STREAK_DAYS = [true, true, true, true, false, true, true]; // mock active days

const QUICK_ACTIONS = [
  { icon: PlayCircleIcon, label: "Join Live Class", sub: "Today, 4:00 PM", color: "indigo" },
  { icon: BookOpenIcon, label: "View Classroom", sub: "Continue Learning", color: "violet" },
  { icon: MicrophoneIcon, label: "Mock Interview", sub: "Practice Now", color: "rose" },
  { icon: DocumentTextIcon, label: "AI Resume", sub: "Build & Export", color: "amber" },
  { icon: ChatBubbleLeftRightIcon, label: "Ask AI Coach", sub: "Get Guidance", color: "emerald" },
  { icon: UserGroupIcon, label: "Join a Pod", sub: "Study Together", color: "sky" },
];

const accentMap: Record<string, { bg: string; text: string; ring: string; border: string; solidBg: string }> = {
  indigo:  { bg: "bg-indigo-50 dark:bg-indigo-500/10",  text: "text-indigo-600 dark:text-indigo-400",  ring: "ring-indigo-600",  border: "border-indigo-200 dark:border-indigo-500/30", solidBg: "bg-indigo-600" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-500", border: "border-emerald-200 dark:border-emerald-500/30", solidBg: "bg-emerald-500" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",   text: "text-amber-600 dark:text-amber-400",   ring: "ring-amber-500",   border: "border-amber-200 dark:border-amber-500/30",   solidBg: "bg-amber-500" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-500/10",  text: "text-purple-600 dark:text-purple-400",  ring: "ring-purple-500",  border: "border-purple-200 dark:border-purple-500/30",  solidBg: "bg-purple-500" },
  rose:    { bg: "bg-rose-50 dark:bg-rose-500/10",    text: "text-rose-600 dark:text-rose-400",    ring: "",    border: "border-rose-200 dark:border-rose-500/30",    solidBg: "bg-rose-500" },
  sky:     { bg: "bg-sky-50 dark:bg-sky-500/10",     text: "text-sky-600 dark:text-sky-400",     ring: "",     border: "border-sky-200 dark:border-sky-500/30",     solidBg: "bg-sky-500" },
  violet:  { bg: "bg-violet-50 dark:bg-violet-500/10",  text: "text-violet-600 dark:text-violet-400",  ring: "",  border: "border-violet-200 dark:border-violet-500/30",  solidBg: "bg-violet-500" },
  green:   { bg: "bg-green-50 dark:bg-green-500/10",   text: "text-green-600 dark:text-green-400",   ring: "",   border: "",   solidBg: "bg-green-500" },
};

export default function StudentDashboard() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [userTasks, setUserTasks] = useState<UserTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<UserTask | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const { profile } = useAuth();
  const supabase = createClient();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!profile?.id) return;
    async function load() {
      setDataLoading(true);
      const [{ data: projData }, { data: actData }, { data: modData }, { data: taskData }] = await Promise.all([
        supabase.from("projects").select("*").eq("user_id", profile!.id).order("updated_at", { ascending: false }),
        supabase.from("activities").select("*").eq("user_id", profile!.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("modules").select("*").order("order"),
        supabase.from("user_tasks").select("*").eq("user_id", profile!.id),
      ]);
      setProjects(projData || []);
      setActivities(actData || []);
      setModules(modData || []);
      setUserTasks(taskData || []);
      setDataLoading(false);
    }
    load();

    const channel = supabase
      .channel('tasks-update')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_tasks', filter: `user_id=eq.${profile.id}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setUserTasks(prev => [...prev, payload.new as UserTask]);
        } else if (payload.eventType === 'UPDATE') {
          setUserTasks(prev => prev.map(t => t.id === payload.new.id ? (payload.new as UserTask) : t));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [profile?.id, supabase]);

  const handleTaskClick = async (task: UserTask) => {
    setSelectedTask(task);
  };

  const markTaskDone = async (taskId: string) => {
    const { error } = await (supabase
      .from('user_tasks') as any)
      .update({ status: 'done', completed_at: new Date().toISOString() })
      .eq('id', taskId);
      
    if (!error) {
       setUserTasks(prev => prev.map(t => t.id === taskId ? {...t, status: 'done'} : t));
       if (selectedTask?.id === taskId) setSelectedTask({...selectedTask, status: 'done'});
       
       await (supabase.from('activities') as any).insert({
         user_id: profile!.id,
         type: 'module',
         title: `Completed task: ${selectedTask?.title || 'Unknown'}`,
         xp_earned: 100
       });
    }
  };

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
    else if (url.includes("be/")) videoId = url.split("be/")[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <VideoCameraIcon className="w-4 h-4 text-rose-500" />;
      case 'link': return <LinkIcon className="w-4 h-4 text-blue-500" />;
      case 'quiz': return <QuestionMarkCircleIcon className="w-4 h-4 text-emerald-500" />;
      default: return <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-gray-500" />;
    }
  };
  
  const displayName = profile?.full_name || "Learner";
  const totalXP = profile?.xp ?? (projects.reduce((s, p) => s + p.xp, 0));
  const streak = profile?.streak ?? (projects.length > 0 ? Math.max(...projects.map(p => p.streak)) : 0);

  if (!mounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-white dot-background">
      {/* Side Navigation */}
      <AppSidebar />

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="w-full min-h-full p-6 lg:p-10 space-y-8 animate-in fade-in duration-500" style={{ fontFamily: "var(--font-sans)" }}>

          {/* ── WELCOME HERO ──────────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Mission Control</p>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                Welcome, {displayName.split(' ')[0]} <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Keep learning. Keep building. You've got this!</p>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-5 py-3.5 max-w-lg shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <span className="text-lg select-none">💡</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 leading-tight">Stay Consistent!</p>
                  <p className="text-xs text-slate-500 mt-0.5">Complete today's test to unlock tomorrow's content.</p>
                </div>
                <Link href="#" className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition-all hover:-translate-y-px shadow-md shadow-indigo-500/20">
                  Continue Roadmap
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 shrink-0">
              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 min-w-[240px] shadow-sm self-start">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Streak</p>
                    <p className="text-3xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
                      <FireIcon className="w-7 h-7 text-orange-500 fill-orange-500 stroke-none" />
                      {streak} Days
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-bold">Best: 12 Days</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between mb-1.5 px-1">
                    {DAYS.map((d, i) => (
                      <span key={i} className="text-[10px] font-bold text-slate-400 w-6 text-center">{d}</span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {STREAK_DAYS.map((active, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? "bg-indigo-600 shadow-md shadow-indigo-500/30" : "bg-slate-100 border border-slate-200"}`}>
                        {active && <CheckCircleIcon className="w-3.5 h-3.5 text-white stroke-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── STATS ROW ─────────────────────────────────────────────────── */}
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Completed', value: `${projects.reduce((s,p)=>s+p.tasks_done,0)} / ${projects.reduce((s,p)=>s+p.tasks_total,0)}`, sub: 'Tasks', icon: BookOpenIcon, accent: 'indigo', progress: projects.length > 0 ? Math.round(projects.reduce((s,p)=>s+p.tasks_done,0) / Math.max(projects.reduce((s,p)=>s+p.tasks_total,0),1)*100) : null },
              { label: 'Total XP', value: totalXP.toLocaleString(), sub: '⚡ Earned', icon: BoltIcon, accent: 'amber', progress: null },
              { label: 'Day Streak', value: `${streak} 🔥`, sub: 'Keep going!', icon: FireIcon, accent: 'emerald', progress: null },
              { label: 'Projects', value: projects.length.toString(), sub: projects.length === 0 ? 'Create one!' : 'Active', icon: RocketLaunchIcon, accent: 'purple', progress: null },
            ].map((s) => {
              const c = accentMap[s.accent];
              return (
                <div key={s.label} className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 flex items-center gap-4 hover:shadow-md transition-all group">
                  <div className={`w-11 h-11 shrink-0 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <s.icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase tracking-widest">{s.label}</p>
                    {dataLoading ? <div className="h-6 bg-slate-100 animate-pulse rounded w-16 mt-1" /> : (
                      <p className="text-xl font-black text-slate-900 tracking-tight leading-none">{s.value}</p>
                    )}
                    {s.progress !== null && !dataLoading ? (
                      <div className="mt-2">
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${c.solidBg} transition-all duration-1000`} style={{ width: `${s.progress}%` }} />
                        </div>
                        <p className={`text-[10px] font-bold mt-1 ${c.text}`}>{s.progress}% complete</p>
                      </div>
                    ) : (
                      <p className={`text-xs font-bold mt-1 ${c.text}`}>{s.sub}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          {/* ── DEVELOPER INTELLIGENCE ───────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <GitHubAnalytics />
            </div>
            <div className="lg:col-span-1 space-y-8">
                <LeetCodeStats />
                {/* <LinkedInCard /> */}
            </div>
          </section>

          {/* ── MAIN CONTENT GRID ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* LEFT: Roadmap + Quick Actions */}
            <div className="xl:col-span-2 space-y-8">

              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapIcon className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-900">Your Learning Roadmap</h2>
                  </div>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-1">
                    View Full Roadmap <ChevronRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {dataLoading ? (
                    <div className="p-10 flex justify-center"><ArrowPathIcon className="w-8 h-8 animate-spin text-slate-300" /></div>
                  ) : modules.length === 0 ? (
                    <div className="p-10 text-center text-sm text-slate-500 font-medium">No roadmap modules assigned yet.</div>
                  ) : modules.map((mod, mi) => {
                    const tasks = userTasks.filter(t => t.module_id === mod.id);
                    const isActive = tasks.length > 0 && tasks.some(t => t.status !== 'done');
                    const isDone = tasks.length > 0 && tasks.every(t => t.status === 'done');
                    
                    return (
                      <div key={mod.id}>
                        <div className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive ? "bg-indigo-50/30" : "hover:bg-slate-50"}`}>
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${isDone ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                            {mi + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold ${isActive || isDone ? "text-slate-900" : "text-slate-400"}`}>{mod.title}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{tasks.length} Modules · {mod.description}</p>
                          </div>
                          {isDone ? (
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-green-500 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
                              <CheckBadgeIcon className="w-3.5 h-3.5" /> Completed
                            </div>
                          ) : !isActive && tasks.length === 0 ? (
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400">
                              <LockClosedIcon className="w-3.5 h-3.5" /> Locked
                            </div>
                          ) : null}
                        </div>

                        {(isActive || isDone) && (
                          <div className="bg-white/50 px-6 pb-4 space-y-2 pt-1">
                            {tasks.sort((a,b) => a.title.localeCompare(b.title)).map((task: UserTask) => (
                              <button 
                                key={task.id}
                                onClick={() => handleTaskClick(task)}
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 border transition-all text-left group ${task.status === "done" ? "border-green-100 bg-green-50/20 hover:border-green-200" : "border-slate-100 bg-white hover:border-indigo-500/40 hover:shadow-md"}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${task.status === "done" ? "bg-green-100" : "bg-slate-50 group-hover:bg-indigo-50"}`}>
                                    {task.status === "done" ? <CheckSolid className="w-4 h-4 text-green-600" /> : getTypeIcon(task.type)}
                                  </div>
                                  <span className={`text-xs font-bold ${task.status === "done" ? "text-slate-900" : "text-slate-600 group-hover:text-indigo-600"}`}>
                                    {task.title}
                                  </span>
                                </div>
                                {task.status === 'done' ? (
                                   <span className="text-[9px] font-black tracking-widest text-green-600 bg-green-100 px-2 py-0.5 rounded">DONE</span>
                                ) : (
                                   <ArrowRightIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )})}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 flex items-center gap-2 px-1">
                  <BoltIcon className="w-4 h-4 text-amber-500" /> Accelerated Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {QUICK_ACTIONS.map((a) => {
                    const c = accentMap[a.color];
                    return (
                      <button key={a.label} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 hover:border-indigo-500/40 hover:shadow-xl transition-all text-left">
                        <div className={`w-11 h-11 shrink-0 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <a.icon className={`w-6 h-6 ${c.text}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 leading-tight">{a.label}</p>
                          <p className="text-[11px] text-slate-500 mt-1 font-bold">{a.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: AI Coach + Activity + Leaderboard */}
            <div className="space-y-6">

              {/* NEXT MILESTONE */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-indigo-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="w-5 h-5 text-amber-300" />
                    <h3 className="text-sm font-black uppercase tracking-wider">Milestone</h3>
                  </div>
                  <span className="text-xs font-black bg-white/20 px-2 py-1 rounded-lg">25%</span>
                </div>
                <p className="text-lg font-bold leading-tight mb-4">Complete HTML & CSS Fundamentals</p>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1000" style={{ width: '25%' }} />
                </div>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Next: JavaScript Essentials</p>
              </div>

              {/* AI COACH */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900">Career Coach AI</h3>
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="text-xs font-bold text-slate-500 leading-relaxed mb-4">
                  "Your backend progress is outstanding. I noticed a strong pattern in your Node.js tests. Let's aim for a <span className="text-indigo-600">Mock Interview</span> this Friday to validate your skills."
                </p>
                <button className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 group/btn">
                  Ask AI Anything <ArrowRightIcon className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4" /> Activity Feed
                </h3>
                <div className="space-y-6">
                  {dataLoading ? (
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse shrink-0" /><div className="flex-1 space-y-2"><div className="h-3 bg-slate-100 animate-pulse rounded w-3/4" /><div className="h-2 bg-slate-100 animate-pulse rounded w-1/2" /></div></div>
                      ))}
                    </div>
                  ) : activities.length === 0 ? (
                    <p className="text-xs text-slate-400 font-bold text-center py-6 border-2 border-dashed border-slate-50 rounded-xl">No recent activity detected.</p>
                  ) : activities.map((a) => (
                    <div key={a.id} className="flex items-start gap-3 relative">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white transition-colors">
                        <CheckSolid className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-tight mb-1">{a.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{new Date(a.created_at).toLocaleDateString()}</span>
                          <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 uppercase tracking-widest">{a.type}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500">+{a.xp_earned} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOP PERFORMERS */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <TrophyIcon className="w-4 h-4 text-amber-500" /> Leaderboard
                  </h3>
                  <button className="text-[10px] font-black text-indigo-600 hover:underline">View Global</button>
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Sarah Chen", xp: "24.5k", you: false },
                    { rank: 2, name: "Alex Kumar", xp: "22.1k", you: false },
                    { rank: 12, name: "You", xp: `${totalXP.toLocaleString()}`, you: true },
                  ].map((u) => (
                    <div key={u.rank} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${u.you ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "hover:bg-slate-50"}`}>
                      <span className={`text-[10px] font-black w-5 text-center ${u.rank === 1 ? "text-amber-500" : u.rank === 2 ? "text-slate-400" : u.you ? "text-white" : "text-slate-400"}`}>#{u.rank}</span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${u.you ? "bg-white/20" : "bg-slate-100 text-slate-600"}`}>
                        {u.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold flex-1 truncate">{u.name}</span>
                      <span className={`text-[10px] font-black ${u.you ? "text-white/80" : "text-slate-400"}`}>{u.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── CONTENT MODAL ────────────────────────────────────────────── */}
          {selectedTask && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedTask(null)} />
              <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                 {/* Header */}
                 <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                       <div className="text-white">
                        {selectedTask.type === 'video' ? <VideoCameraIcon className="w-6 h-6" /> : selectedTask.type === 'link' ? <LinkIcon className="w-6 h-6" /> : <BookOpenIcon className="w-6 h-6" />}
                       </div>
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">{selectedTask.title}</h2>
                        <p className="text-[10px] text-indigo-600 font-black flex items-center gap-1 uppercase tracking-[0.15em] mt-0.5">{(selectedTask as UserTask).type} Resource</p>
                     </div>
                   </div>
                   <button onClick={() => setSelectedTask(null)} className="p-2.5 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all">
                     <XMarkIcon className="w-6 h-6" />
                   </button>
                 </div>

                 {/* Content Area */}
                 <div className="p-8 overflow-y-auto max-h-[70vh]">
                   {(selectedTask as UserTask).type === 'video' ? (
                     <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-white/10 mb-8">
                       {getYouTubeEmbedUrl(selectedTask.content_url) ? (
                         <iframe 
                           src={getYouTubeEmbedUrl(selectedTask.content_url)!} 
                           className="w-full h-full" 
                           allowFullScreen 
                           title={selectedTask.title}
                         />
                       ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                            <PlayCircleIcon className="w-12 h-12 opacity-20" />
                            <p className="text-sm font-bold">Invalid or Missing Video URL</p>
                         </div>
                       )}
                     </div>
                   ) : (selectedTask as UserTask).type === 'link' ? (
                     <div className="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mb-8 group hover:border-indigo-500/30 transition-colors">
                       <LinkIcon className="w-16 h-16 text-indigo-500 mx-auto mb-6 opacity-40 group-hover:scale-110 transition-transform" />
                       <p className="text-lg font-black text-slate-900 mb-6">Open external training portal to proceed.</p>
                       <a 
                         href={selectedTask.content_url} 
                         target="_blank" 
                         className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/40 hover:bg-indigo-700 hover:scale-105 transition-all"
                       >
                         Launch Resource <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                       </a>
                     </div>
                   ) : null}

                   {selectedTask.content_body && (
                     <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-8 shadow-inner">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <DocumentTextIcon className="w-4 h-4" /> Material Description
                        </h4>
                        <p className="text-slate-600 font-bold leading-relaxed whitespace-pre-wrap">{selectedTask.content_body}</p>
                     </div>
                   )}

                   {/* Completion Button */}
                   <div className="flex items-center justify-center pt-4">
                     {selectedTask.status === 'done' ? (
                       <div className="flex items-center gap-3 bg-green-500 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-500/30 border-b-4 border-green-700">
                         <CheckBadgeIcon className="w-6 h-6" /> Completed Module
                       </div>
                     ) : (
                       <button 
                         onClick={() => markTaskDone(selectedTask.id)}
                         className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-black shadow-xl shadow-green-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 border-b-4 border-green-700 group"
                       >
                         Finish & Earn XP <BoltIcon className="w-5 h-5 text-amber-300 group-hover:scale-125 transition-transform" />
                       </button>
                     )}
                   </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

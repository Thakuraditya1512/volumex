"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  Square3Stack3DIcon, 
  MapIcon, 
  MicrophoneIcon, 
  ChartPieIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  BookOpenIcon,
  Cog8ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/context/AuthContext";

interface SidebarItem {
  title: string;
  url: string;
  icon: any;
  subItems?: { name: string; url: string }[];
}

const baseItems: SidebarItem[] = [
  { title: "Mission Control", url: "/student", icon: Square3Stack3DIcon },
  { 
    title: "Learning Roadmaps", 
    url: "#", 
    icon: MapIcon,
    subItems: [{ name: "Active Track", url: "#" }, { name: "Explore Topics", url: "#" }, { name: "Completed", url: "#" }]
  },
  { 
    title: "Mock Interviews", 
    url: "#", 
    icon: MicrophoneIcon,
    subItems: [{ name: "Start AI Interview", url: "#" }, { name: "Past Recordings", url: "#" }, { name: "Metrics", url: "#" }]
  },
  { title: "Skill Analytics", url: "#", icon: ChartPieIcon },
  { title: "Community Pods", url: "#", icon: UserGroupIcon },
  { 
    title: "Career Hub", 
    url: "#", 
    icon: DocumentTextIcon,
    subItems: [{ name: "AI Resume Builder", url: "#" }, { name: "Cover Letters", url: "#" }, { name: "Job Tracker", url: "#" }]
  },
  { title: "Settings", url: "#", icon: Cog8ToothIcon },
];

const adminItems: SidebarItem[] = [
  { title: "Back to App", url: "/student", icon: ArrowLeftIcon },
  { title: "User Control", url: "/admin", icon: UserGroupIcon },
  { title: "Course Editor", url: "/admin/courses", icon: BookOpenIcon },
  { title: "System Settings", url: "/admin/settings", icon: Cog8ToothIcon },
];

const employeeItems: SidebarItem[] = [
  { title: "Work Overview", url: "/employee", icon: Square3Stack3DIcon },
  { title: "Assignments", url: "#", icon: DocumentTextIcon },
  { title: "Mentorship", url: "#", icon: UserGroupIcon },
  { title: "System Portal", url: "/admin", icon: ShieldCheckIcon },
];

export function AppSidebar() {
  const { setOpen, state } = useSidebar();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  
  const isExpanded = state === "expanded";
  const isAdminPath = pathname.startsWith('/admin');
  const isEmployeePath = pathname.startsWith('/employee');

  const items = useMemo(() => {
    let currentItems: SidebarItem[] = [];
    if (isAdminPath) currentItems = [...adminItems];
    else if (isEmployeePath) currentItems = [...employeeItems];
    else currentItems = [...baseItems];

    if (!isAdminPath && profile?.role === "admin") {
        currentItems.unshift({ title: "Admin Portal", url: "/admin", icon: ShieldCheckIcon });
    }
    return currentItems;
  }, [isAdminPath, isEmployeePath, profile?.role]);

  const initials = useMemo(() => {
    return profile?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || "??";
  }, [profile?.full_name]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-100 bg-white z-40 transition-all duration-500 shadow-[1px_0_10px_rgba(0,0,0,0.02)]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setOpenMenus({});
      }}
    >
      <SidebarHeader className="flex h-20 items-center justify-center border-b border-slate-50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20"
        >
           <svg viewBox="0 0 18 18" fill="none" className="h-6 w-6">
             <path d="M9 2L15.5 5.5V12.5L9 16L2.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
             <circle cx="9" cy="9" r="2.5" fill="white" />
           </svg>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="bg-white scrollbar-hide py-6">
        <SidebarGroup>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="mb-4 px-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400"
              >
                Platform Menu
              </motion.div>
            )}
          </AnimatePresence>
          
          <SidebarMenu className={`gap-2 transition-all duration-300 ${isExpanded ? "px-3" : "px-0"}`}>
            {items.map((item, idx) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <div className="relative group/nav">
                        {item.subItems ? (
                            <button
                                onClick={() => setOpenMenus(p => ({...p, [item.title]: !p[item.title]}))}
                                className={`flex w-full items-center gap-3 rounded-xl py-3 transition-all duration-300 ${
                                    isExpanded ? "px-3 justify-between" : "px-0 justify-center"
                                } ${
                                    openMenus[item.title] ? "bg-slate-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50/80 hover:text-indigo-600"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div whileHover={{ rotate: 5 }}>
                                        <item.icon className="h-5 w-5 shrink-0" />
                                    </motion.div>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span 
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="font-bold text-sm whitespace-nowrap"
                                            >
                                                {item.title}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {isExpanded && (
                                    <ChevronDownIcon 
                                        className={`h-3.5 w-3.5 transition-transform duration-300 ${openMenus[item.title] ? "rotate-180" : ""}`} 
                                    />
                                )}
                            </button>
                        ) : (
                            <Link
                                href={item.url}
                                className={`flex items-center gap-3 rounded-xl py-3 transition-all duration-300 ${
                                    isExpanded ? "px-3" : "px-0 justify-center"
                                } ${
                                    pathname === item.url 
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                                    : "text-slate-500 hover:bg-slate-50/80 hover:text-indigo-600"
                                }`}
                            >
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <item.icon className="h-5 w-5 shrink-0" />
                                </motion.div>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.span 
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="font-bold text-sm whitespace-nowrap"
                                        >
                                            {item.title}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        )}

                        {/* Animated Sub-items */}
                        <AnimatePresence>
                            {item.subItems && openMenus[item.title] && isExpanded && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-11 pr-2 flex flex-col gap-1 border-l-2 border-slate-100 ml-5 mt-2 mb-1">
                                        {item.subItems.map((sub) => (
                                            <motion.div key={sub.name} whileHover={{ x: 4 }}>
                                                <Link 
                                                    href={sub.url}
                                                    className="text-xs font-bold text-slate-400 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors block"
                                                >
                                                    {sub.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-50 bg-white p-4 space-y-4">
        {/* Profile Card */}
        <div className="relative">
            <motion.div 
                layout
                className={`flex items-center gap-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all duration-300 cursor-pointer group/profile border border-transparent hover:border-slate-100 shadow-sm hover:shadow-md ${
                    isExpanded ? "px-2" : "px-0 justify-center"
                }`}
            >
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-indigo-500/20"
                >
                    {initials}
                </motion.div>
                
                <AnimatePresence mode="wait">
                    {isExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex-1 min-w-0"
                        >
                            <p className="text-xs font-black text-slate-900 truncate tracking-tight">{profile?.full_name || "Guest User"}</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{profile?.role || "Member"}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isExpanded && (
                    <motion.button 
                        whileHover={{ scale: 1.1, color: "#ef4444" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => signOut()}
                        className="p-2 rounded-lg text-slate-300 hover:bg-red-50 transition-all"
                    >
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    </motion.button>
                )}
            </motion.div>
        </div>

        {/* Collapse Toggle */}
        <motion.button 
            whileHover={{ backgroundColor: "#f8fafc" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(!isExpanded)} 
            className="flex w-full items-center justify-center text-slate-300 transition-all rounded-xl py-3 border border-slate-50 hover:text-indigo-600 group/toggle"
        >
            <motion.div
                animate={{ rotate: isExpanded ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <ChevronLeftIcon className="h-5 w-5 shrink-0" />
            </motion.div>
        </motion.button>
      </SidebarFooter>
    </Sidebar>
  );
}
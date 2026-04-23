"use client";

import React, { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  avatar?: string;
}

interface StatCard {
  label: string;
  value: string;
  sub: string;
  change: number;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}

interface NavItem {
  label: string;
  icon: React.FC<{ size?: number }>;
  id: string;
  sub?: string[];
  badge?: number;
}

// ─── ICONS ────────────────────────────────────────────────────────────────────

const Svg: React.FC<{ d: string | string[]; size?: number; className?: string }> = ({
  d,
  size = 18,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const IcoDashboard: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]} />
);
const IcoUsers: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75", "M9 7m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0"]} />
);
const IcoMap: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4", "M8 2v16", "M16 6v16"]} />
);
const IcoBook: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]} />
);
const IcoClipboard: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", "M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2z"]} />
);
const IcoBriefcase: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"]} />
);
const IcoDB: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4z", "M2 6c0 2.21 4.48 4 10 4s10-1.79 10-4", "M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"]} />
);
const IcoServer: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M2 3h20v7H2z", "M2 14h20v7H2z", "M6 7v.01", "M6 18v.01"]} />
);
const IcoSettings: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]} />
);
const IcoBell: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"]} />
);
const IcoSearch: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z", "M16 16l4.5 4.5"]} />
);
const IcoArrowUpRight: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M7 17L17 7", "M7 7h10v10"]} />
);
const IcoArrowDownRight: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M17 7L7 17", "M17 17H7V7"]} />
);
const IcoChevRight: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d="M9 18l6-6-6-6" />
);
const IcoChevDown: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d="M6 9l6 6 6-6" />
);
const IcoMail: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />
);
const IcoHelp: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"]} />
);
const IcoLogout: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />
);
const IcoBadge: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"]} />
);
const IcoTicket: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M15 5v2", "M15 11v2", "M15 17v2", "M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"]} />
);
const IcoBilling: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"]} />
);
const IcoIntegrations: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"]} />
);
const IcoReports: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M18 20V10", "M12 20V4", "M6 20v-6"]} />
);
const IcoAnalytics: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M21 21H4.6A1.6 1.6 0 0 1 3 19.4V3", "M7 16l4-4 4 4 4-6"]} />
);
const IcoPlus: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d={["M12 5v14", "M5 12h14"]} />
);
const IcoRefresh: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d={["M23 4v6h-6", "M1 20v-6h6", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"]} />
);
const IcoDownload: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]} />
);
const IcoFilter: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d="M22 3H2l8 9.46V19l4 2V12.46L22 3z" />
);
const IcoEdit: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />
);
const IcoTrash: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M3 6h18", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M10 11v6", "M14 11v6", "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"]} />
);
const IcoGithub: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
);
const IcoLinkedin: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", "M2 9h4v12H2z", "M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]} />
);
const IcoSlack: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z", "M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z", "M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z", "M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z", "M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z", "M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z", "M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z", "M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"]} />
);
const IcoX: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M18 6L6 18", "M6 6l12 12"]} />
);

// ─── DATA ────────────────────────────────────────────────────────────────────

const weeklyData = [
  { name: "May 8", users: 2100, activeUsers: 1890, newUsers: 320 },
  { name: "May 9", users: 2900, activeUsers: 2500, newUsers: 410 },
  { name: "May 10", users: 3200, activeUsers: 2800, newUsers: 380 },
  { name: "May 11", users: 3800, activeUsers: 3300, newUsers: 520 },
  { name: "May 12", users: 4200, activeUsers: 3600, newUsers: 490 },
  { name: "May 13", users: 3700, activeUsers: 3200, newUsers: 440 },
  { name: "May 14", users: 3200, activeUsers: 2700, newUsers: 350 },
];

const pieData = [
  { name: "Students", value: 3214, pct: 56.5, color: "#6366f1" },
  { name: "Employees", value: 1987, pct: 34.9, color: "#3b82f6" },
  { name: "Admins", value: 89, pct: 1.6, color: "#10b981" },
  { name: "Others", value: 400, pct: 7.0, color: "#64748b" },
];

const roadmapData = [
  { name: "Full Stack Developer", users: 1234, completions: 842, rate: 68.3 },
  { name: "Data Scientist", users: 842, completions: 512, rate: 60.8 },
  { name: "Backend Developer", users: 623, completions: 378, rate: 60.7 },
  { name: "DevOps Engineer", users: 512, completions: 298, rate: 58.2 },
  { name: "Mobile App Developer", users: 412, completions: 245, rate: 59.5 },
];

const integrationData = [
  { name: "GitHub", users: 2345, change: 18, icon: IcoGithub, color: "#fff" },
  { name: "LinkedIn", users: 1987, change: 15, icon: IcoLinkedin, color: "#0077b5" },
  { name: "Google", users: 1542, change: 10, icon: IcoSearch, color: "#ea4335" },
  { name: "Slack", users: 842, change: 8, icon: IcoSlack, color: "#4a154b" },
];

const recentActivities = [
  { icon: IcoUsers, msg: "New user registered", time: "2 min ago", color: "#6366f1" },
  { icon: IcoBook, msg: 'Course "React Basics" created', time: "15 min ago", color: "#3b82f6" },
  { icon: IcoClipboard, msg: "Assessment published", time: "32 min ago", color: "#f59e0b" },
  { icon: IcoMap, msg: "New roadmap added", time: "1 hour ago", color: "#10b981" },
  { icon: IcoServer, msg: "System backup completed", time: "3 hours ago", color: "#6366f1" },
];

const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmapHours = ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"];

const mockUsers: User[] = [
  { id: "1", full_name: "Arjun Sharma", email: "arjun@example.com", role: "student", status: "active", created_at: "2024-01-15" },
  { id: "2", full_name: "Priya Reddy", email: "priya@example.com", role: "admin", status: "active", created_at: "2024-02-20" },
  { id: "3", full_name: "Rahul Verma", email: "rahul@example.com", role: "student", status: "pending", created_at: "2024-03-10" },
  { id: "4", full_name: "Sneha Patel", email: "sneha@example.com", role: "employee", status: "active", created_at: "2024-03-25" },
  { id: "5", full_name: "Kiran Das", email: "kiran@example.com", role: "student", status: "suspended", created_at: "2024-04-01" },
];

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

const StatusDot: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    healthy: "#10b981", warning: "#f59e0b", danger: "#ef4444",
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{ background: colors[status] ?? colors.healthy }}
    />
  );
};

const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    admin:    { bg: "rgba(99,102,241,0.12)",  text: "#a5b4fc", border: "rgba(99,102,241,0.3)" },
    student:  { bg: "rgba(59,130,246,0.12)",  text: "#93c5fd", border: "rgba(59,130,246,0.3)" },
    employee: { bg: "rgba(16,185,129,0.12)",  text: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
  };
  const s = styles[role.toLowerCase()] ?? styles.student;
  return (
    <span
      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {role}
    </span>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg: Record<string, { dot: string; text: string }> = {
    active:    { dot: "#10b981", text: "#6ee7b7" },
    pending:   { dot: "#f59e0b", text: "#fcd34d" },
    suspended: { dot: "#ef4444", text: "#fca5a5" },
  };
  const c = cfg[status.toLowerCase()] ?? cfg.active;
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      <span className="text-xs font-medium capitalize" style={{ color: c.text }}>{status}</span>
    </div>
  );
};

const ProgressBar: React.FC<{ value: number; color?: string }> = ({ value, color = "#6366f1" }) => (
  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{ width: `${value}%`, background: color }}
    />
  </div>
);

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 p-3 text-xs" style={{ background: "#0f172a" }}>
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: <span className="text-white">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [expandedNav, setExpandedNav] = useState<string | null>("users");
  const [users] = useState<User[]>(mockUsers);
  const [chartRange, setChartRange] = useState<"week" | "month">("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [heatmap, setHeatmap] = useState<{ day: string; cells: { h: string; v: number }[] }[]>([]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    // Generate heatmap data on client only
    const data = heatmapDays.map((day) => ({
      day,
      cells: heatmapHours.map((h) => ({ h, v: Math.floor(Math.random() * 100) })),
    }));
    setHeatmap(data);

    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: IcoDashboard },
    {
      id: "users", label: "Users", icon: IcoUsers, badge: 12,
      sub: ["Students", "Employees", "Admins"],
    },
    { id: "roadmaps", label: "Roadmaps", icon: IcoMap },
    { id: "courses", label: "Courses", icon: IcoBook },
    { id: "assessments", label: "Assessments", icon: IcoClipboard },
    { id: "projects", label: "Projects", icon: IcoBriefcase },
    { id: "reports", label: "Reports", icon: IcoReports, sub: ["Overview", "Exports"] },
    { id: "analytics", label: "Analytics", icon: IcoAnalytics, sub: ["Engagement", "Funnel"] },
    { id: "badges", label: "Badges", icon: IcoBadge },
    { id: "system", label: "System Settings", icon: IcoSettings },
    { id: "integrations", label: "Integrations", icon: IcoIntegrations },
    { id: "billing", label: "Billing", icon: IcoBilling },
    { id: "tickets", label: "Support Tickets", icon: IcoTicket, badge: 5 },
  ];

  const statCards = [
    {
      label: "Total Users",
      value: "5,690",
      sub: "vs last month",
      change: 12.5,
      icon: IcoUsers,
      color: "#6366f1",
      bg: "rgba(99,102,241,0.1)",
    },
    {
      label: "Students",
      value: "3,214",
      sub: "vs last month",
      change: 15.3,
      icon: IcoBook,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
    },
    {
      label: "Employees",
      value: "1,987",
      sub: "vs last month",
      change: 10.2,
      icon: IcoBriefcase,
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
    },
    {
      label: "Admins",
      value: "89",
      sub: "vs last month",
      change: 3.4,
      icon: IcoSettings,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
    },
  ];

  const contentStats = [
    { label: "Roadmaps", value: "142", sub: "Total Roadmaps", icon: IcoMap, color: "#6366f1", link: "View all roadmaps" },
    { label: "Courses", value: "328", sub: "Total Courses", icon: IcoBook, color: "#3b82f6", link: "View all courses" },
    { label: "Projects", value: "1,256", sub: "Total Projects", icon: IcoBriefcase, color: "#10b981", link: "View all projects" },
    { label: "Assessments", value: "764", sub: "Total Assessments", icon: IcoClipboard, color: "#f59e0b", link: "View all assessments" },
  ];

  const systemStatuses = [
    { label: "Server", status: "healthy" },
    { label: "Database", status: "healthy" },
    { label: "Storage", status: "warning" },
    { label: "API", status: "healthy" },
    { label: "Integrations", status: "healthy" },
  ];

  const quickActions = [
    { label: "Add New User", icon: IcoUsers },
    { label: "Create Roadmap", icon: IcoMap },
    { label: "Add Course", icon: IcoBook },
    { label: "Create Announcement", icon: IcoBell },
    { label: "View Reports", icon: IcoReports },
  ];

  // Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Avatar initials
  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const avatarColors = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

  return (
    <div
      className="flex h-screen overflow-hidden font-sans relative"
      style={{ background: "#050b18", color: "#e2e8f0" }}
    >
      {/* ── MOBILE OVERLAY ── */}
      {(sidebarOpen || rightSidebarOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { setSidebarOpen(false); setRightSidebarOpen(false); }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:relative lg:translate-x-0 transition-transform duration-300 ease-out flex flex-col border-r overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#070d1c", borderColor: "rgba(255,255,255,0.05)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }}
          >
            SB
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-none">SkillBridge</p>
            <p className="text-[10px] mt-0.5" style={{ color: "#6366f1" }}>Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            const isExpanded = expandedNav === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.sub) setExpandedNav(isExpanded ? null : item.id);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                    color: isActive ? "#a5b4fc" : "#64748b",
                    borderLeft: isActive ? "2px solid #6366f1" : "2px solid transparent",
                  }}
                >
                  <item.icon size={15} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                      style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.sub && (
                    <span style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <IcoChevDown size={12} />
                    </span>
                  )}
                </button>
                {item.sub && isExpanded && (
                  <div className="ml-6 mt-0.5 space-y-0.5 border-l pl-3" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
                    {item.sub.map((s) => (
                      <button
                        key={s}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors duration-150"
                        style={{ color: "#475569" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <button
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={{ color: "#ef4444" }}
          >
            <IcoLogout size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-4 border-b backdrop-blur-md"
          style={{ background: "rgba(5,11,24,0.9)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Svg size={20} d="M4 6h16M4 12h16M4 18h16" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight">Admin Dashboard</h1>
              <p className="text-[10px] lg:text-xs mt-0.5" style={{ color: "#475569" }}>
                Overview of platform analytics, users, and system insights.
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-black text-white tracking-tight">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search (Icon only on small mobile) */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#475569" }}
            >
              <IcoSearch size={14} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none w-20 md:w-40 text-xs placeholder:text-slate-600"
                style={{ color: "#cbd5e1" }}
              />
            </div>

            {/* Notifs (Hidden on very small) */}
            <button
              className="relative p-2.5 rounded-xl border transition-all hidden xs:flex"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <IcoBell size={16} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
                style={{ background: "#6366f1", borderColor: "#070d1c" }}
              />
            </button>

            {/* More toggle for mobile right sidebar */}
            <button
              onClick={() => setRightSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl border transition-all"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <Svg size={16} d="M12 5v.01M12 12v.01M12 19v.01" />
            </button>

            {/* Mail */}
            <button
              className="p-2.5 rounded-xl border transition-all"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <IcoMail size={16} />
            </button>

            {/* Help */}
            <button
              className="p-2.5 rounded-xl border transition-all"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <IcoHelp size={16} />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="text-right">
                <p className="text-xs font-bold text-white">Admin User</p>
                <p className="text-[10px]" style={{ color: "#6366f1" }}>Super Administrator</p>
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg"
                style={{ background: "linear-gradient(135deg,#6366f1,#3b82f6)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
              >
                AU
              </div>
            </div>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 lg:p-8 space-y-6 lg:space-y-8"
        >
          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {statCards.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl p-5 border transition-all duration-300 hover:border-indigo-500/40 cursor-pointer group hover:bg-white/[0.04] backdrop-blur-sm shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: s.bg, color: s.color }}
                  >
                    <s.icon size={18} />
                  </div>
                  <div
                    className="flex items-center gap-1 text-[11px] font-bold"
                    style={{ color: "#10b981" }}
                  >
                    <IcoArrowUpRight size={12} />
                    {s.change}%
                  </div>
                </div>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-[11px] mt-1" style={{ color: "#475569" }}>
                  <span className="text-[#10b981]">↑ {s.change}%</span> {s.sub}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-widest mt-2" style={{ color: "#64748b" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── CHARTS ROW ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Platform Overview */}
            <div
              className="lg:col-span-8 rounded-2xl p-4 lg:p-6 border overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-white">Platform Overview</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {[
                      { label: "Users", color: "#6366f1" },
                      { label: "Active", color: "#3b82f6" },
                      { label: "New", color: "#10b981" },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-1.5 text-[10px] lg:text-[11px]" style={{ color: "#64748b" }}>
                        <span className="w-4 lg:w-6 h-0.5 rounded" style={{ background: l.color }} />
                        {l.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "#64748b" }}
                  >
                    This Week <IcoChevDown size={12} />
                  </div>
                  <button
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-white"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <IcoDownload size={12} /> <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>

              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#334155" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#334155" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#070d1c" }} name="Users" />
                    <Line type="monotone" dataKey="activeUsers" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#070d1c" }} name="Active Users" />
                    <Line type="monotone" dataKey="newUsers" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#070d1c" }} name="New Users" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Distribution */}
            <div
              className="lg:col-span-4 rounded-2xl p-6 border flex flex-col"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h3 className="font-bold text-white mb-4">User Distribution</h3>
              <div className="flex-1 flex items-center justify-center relative">
                <PieChart width={180} height={180}>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={58} outerRadius={78} paddingAngle={4} dataKey="value" startAngle={90} endAngle={-270}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-xl font-black text-white">5,690</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#475569" }}>Users</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>Total</p>
                </div>
              </div>
              <div className="space-y-2.5 mt-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span style={{ color: "#94a3b8" }}>{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONTENT STATS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {contentStats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border hover:border-opacity-40 transition-all duration-300 group cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}15`, color: s.color }}
                  >
                    <s.icon size={22} />
                  </div>
                </div>
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "#475569" }}>{s.sub}</p>
                <button
                  className="flex items-center gap-1 text-[11px] mt-3 font-medium transition-colors duration-150"
                  style={{ color: s.color }}
                >
                  {s.link} <IcoChevRight size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* ── BOTTOM 3-COLUMN ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Top Roadmaps */}
            <div
              className="lg:col-span-5 rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white">Top Roadmaps</h3>
                <button className="text-[11px] font-medium" style={{ color: "#6366f1" }}>View all →</button>
              </div>
              <div>
                <div className="grid grid-cols-4 gap-2 pb-3 mb-3 border-b text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: "rgba(255,255,255,0.06)", color: "#475569" }}>
                  <span className="col-span-2">Roadmap</span>
                  <span className="text-right">Users</span>
                  <span className="text-right">Completions</span>
                </div>
                <div className="space-y-4">
                  {roadmapData.map((r, i) => (
                    <div key={i}>
                      <div className="grid grid-cols-4 gap-2 mb-1.5 items-center text-xs">
                        <span className="col-span-2 font-medium text-white truncate">{r.name}</span>
                        <span className="text-right" style={{ color: "#64748b" }}>{r.users.toLocaleString()}</span>
                        <span className="text-right" style={{ color: "#64748b" }}>{r.completions.toLocaleString()}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 items-center">
                        <div className="col-span-3">
                          <ProgressBar value={r.rate} color="#6366f1" />
                        </div>
                        <span className="text-right text-[11px] font-bold" style={{ color: "#6366f1" }}>{r.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div
              className="lg:col-span-4 rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h3 className="font-bold text-white mb-5">User Activity Heatmap</h3>
              <div className="space-y-1.5">
                {mounted && heatmap.map((row) => (
                  <div key={row.day} className="flex items-center gap-1.5">
                    <span className="w-7 text-[10px] flex-shrink-0" style={{ color: "#475569" }}>{row.day}</span>
                    <div className="flex gap-1 flex-1">
                      {row.cells.map((cell, ci) => (
                        <div
                          key={ci}
                          className="flex-1 h-5 rounded-sm transition-opacity hover:opacity-100"
                          style={{
                            background: `rgba(99,102,241,${cell.v / 100})`,
                            opacity: cell.v > 10 ? 1 : 0.3,
                          }}
                          title={`${cell.h}: ${cell.v} users`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-7" />
                  <div className="flex gap-1 flex-1">
                    {["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"].map((h) => (
                      <span key={h} className="flex-1 text-[9px] text-center" style={{ color: "#334155" }}>{h}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px]" style={{ color: "#475569" }}>
                  <span>Less activity</span>
                  <div className="flex gap-1">
                    {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                      <div key={o} className="w-4 h-3 rounded-sm" style={{ background: `rgba(99,102,241,${o})` }} />
                    ))}
                  </div>
                  <span>More activity</span>
                </div>
              </div>
            </div>

            {/* Top Integrations */}
            <div
              className="lg:col-span-3 rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white">Top Integrations</h3>
                <button className="text-[11px]" style={{ color: "#6366f1" }}>View all →</button>
              </div>
              <div className="space-y-3">
                {integrationData.map((int, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}
                      >
                        <int.icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{int.name}</p>
                        <p className="text-[10px]" style={{ color: "#475569" }}>Connected accounts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">{int.users.toLocaleString()}</p>
                      <p className="text-[10px] font-bold" style={{ color: "#10b981" }}>↑ {int.change}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── USER MANAGEMENT TABLE ── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-5 gap-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h3 className="font-bold text-white">User Management</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-medium"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#64748b" }}
                >
                  <IcoFilter size={12} /> Filter
                </button>
                <button
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-white"
                  style={{ background: "rgba(99,102,241,0.9)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
                >
                  <IcoPlus size={12} /> Add <span className="hidden sm:inline">New User</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                    {["User", "Role", "Status", "Joined", "Actions"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest ${i === 4 ? "text-right" : "text-left"}`}
                        style={{ color: "#475569" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  {filteredUsers.map((user, i) => (
                    <tr
                      key={user.id}
                      className="group transition-all duration-150"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                            style={{ background: avatarColors[i % avatarColors.length] }}
                          >
                            {initials(user.full_name)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{user.full_name}</p>
                            <p className="text-[11px]" style={{ color: "#475569" }}>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 text-xs font-medium" style={{ color: "#475569" }}>
                        {new Date(user.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 rounded-lg transition-all"
                            style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}
                          >
                            <IcoEdit size={13} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-all"
                            style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                          >
                            <IcoTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="flex items-center justify-between px-6 py-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#334155" }}>
                Showing {filteredUsers.length} of 5,690 users
              </p>
              <div className="flex gap-1.5">
                {["Prev", "1", "2", "3", "Next"].map((p) => (
                  <button
                    key={p}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all"
                    style={{
                      background: p === "1" ? "rgba(99,102,241,0.2)" : "transparent",
                      borderColor: p === "1" ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.06)",
                      color: p === "1" ? "#a5b4fc" : "#475569",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 lg:relative lg:translate-x-0 transition-transform duration-300 ease-out flex flex-col border-l overflow-y-auto
          ${rightSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "#070d1c", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <button
          onClick={() => setRightSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-white"
        >
          <IcoX size={20} />
        </button>
        <div className="p-5 space-y-6">
          {/* System Status */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>System Status</h4>
            <div
              className="rounded-xl p-4 border space-y-3"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              {systemStatuses.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#94a3b8" }}>
                    <IcoServer size={13} />
                    {s.label}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusDot status={s.status} />
                    <span
                      className="text-[11px] font-bold capitalize"
                      style={{ color: s.status === "healthy" ? "#10b981" : s.status === "warning" ? "#f59e0b" : "#ef4444" }}
                    >
                      {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>Quick Actions</h4>
            <div
              className="rounded-xl border divide-y overflow-hidden"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
            >
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium transition-all duration-150"
                  style={{ color: "#94a3b8", borderColor: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                    e.currentTarget.style.color = "#a5b4fc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <a.icon size={14} />
                    {a.label}
                  </div>
                  <IcoChevRight size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>Recent Activities</h4>
            <div className="space-y-3">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${act.color}15`, color: act.color }}
                  >
                    <act.icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium leading-snug">{act.msg}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#334155" }}>{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Growth Card */}
          <div
            className="rounded-xl p-5 border"
            style={{
              background: "rgba(99,102,241,0.08)",
              borderColor: "rgba(99,102,241,0.2)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold" style={{ color: "#a5b4fc" }}>Platform Growth</p>
              <span className="text-lg">🎉</span>
            </div>
            <p className="text-xs font-medium text-white mb-1">Your platform is growing!</p>
            <p className="text-[11px] mb-4" style={{ color: "#64748b" }}>
              Total users increased by 12.5% this month.
            </p>
            {/* Mini sparkline */}
            <div className="h-10 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} fill="url(#spark)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <button
              className="w-full py-2 rounded-lg text-xs font-bold text-white transition-all"
              style={{ background: "#6366f1", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
            >
              View Full Report
            </button>
          </div>

          {/* Live clock */}
          <div className="text-center min-h-[1.5rem]">
            {mounted && currentTime && (
              <p className="text-xs font-mono" style={{ color: "#334155" }}>
                {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
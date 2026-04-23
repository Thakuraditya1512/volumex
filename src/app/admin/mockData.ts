import { User } from "@/types";
import { 
  IcoUsers, IcoBook, IcoClipboard, IcoMap, IcoServer, IcoGithub, IcoLinkedin, IcoSearch, IcoSlack, IcoSettings, IcoBell, IcoReports
} from "./components/AdminIcons";

export const weeklyData = [
  { name: "May 8", users: 2100, activeUsers: 1890, newUsers: 320 },
  { name: "May 9", users: 2900, activeUsers: 2500, newUsers: 410 },
  { name: "May 10", users: 3200, activeUsers: 2800, newUsers: 380 },
  { name: "May 11", users: 3800, activeUsers: 3300, newUsers: 520 },
  { name: "May 12", users: 4200, activeUsers: 3600, newUsers: 490 },
  { name: "faaaa 13", users: 3700, activeUsers: 3200, newUsers: 440 },
  { name: "May 14", users: 3200, activeUsers: 2700, newUsers: 350 },
];

export const pieData = [
  { name: "Students", value: 3214, pct: 56.5, color: "#6366f1" },
  { name: "Employees", value: 1987, pct: 34.9, color: "#3b82f6" },
  { name: "Admins", value: 89, pct: 1.6, color: "#10b981" },
  { name: "Others", value: 400, pct: 7.0, color: "#64748b" },
];

export const roadmapData = [
  { name: "Full Stack Developer", users: 1234, completions: 842, rate: 68.3 },
  { name: "Data Scientist", users: 842, completions: 512, rate: 60.8 },
  { name: "Backend Developer", users: 623, completions: 378, rate: 60.7 },
  { name: "DevOps Engineer", users: 512, completions: 298, rate: 58.2 },
  { name: "Mobile App Developer", users: 412, completions: 245, rate: 59.5 },
];

export const integrationData = [
  { name: "GitHub", users: 2345, change: 18, icon: IcoGithub, color: "#fff" },
  { name: "LinkedIn", users: 1987, change: 15, icon: IcoLinkedin, color: "#0077b5" },
  { name: "Google", users: 1542, change: 10, icon: IcoSearch, color: "#ea4335" },
  { name: "Slack", users: 842, change: 8, icon: IcoSlack, color: "#4a154b" },
];

export const recentActivities = [
  { icon: IcoUsers, msg: "New user registered", time: "2 min ago", color: "#6366f1" },
  { icon: IcoBook, msg: 'Course "React Basics" created', time: "15 min ago", color: "#3b82f6" },
  { icon: IcoClipboard, msg: "Assessment published", time: "32 min ago", color: "#f59e0b" },
  { icon: IcoMap, msg: "New roadmap added", time: "1 hour ago", color: "#10b981" },
  { icon: IcoServer, msg: "System backup completed", time: "3 hours ago", color: "#6366f1" },
];

export const systemStatuses = [
  { label: "Server", status: "healthy" },
  { label: "Database", status: "healthy" },
  { label: "Storage", status: "warning" },
  { label: "API", status: "healthy" },
  { label: "Integrations", status: "healthy" },
];

export const quickActions = [
  { label: "Add New User", icon: IcoUsers },
  { label: "Create Roadmap", icon: IcoMap },
  { label: "Add Course", icon: IcoBook },
  { label: "Create Announcement", icon: IcoBell },
  { label: "View Reports", icon: IcoReports },
];

export const mockUsers: User[] = [
  { id: "1", full_name: "Arjun Sharma", email: "arjun@example.com", role: "student", status: "active", created_at: "2024-01-15" },
  { id: "2", full_name: "Priya Reddy", email: "priya@example.com", role: "admin", status: "active", created_at: "2024-02-20" },
  { id: "3", full_name: "Rahul Verma", email: "rahul@example.com", role: "student", status: "pending", created_at: "2024-03-10" },
  { id: "4", full_name: "Sneha Patel", email: "sneha@example.com", role: "employee", status: "active", created_at: "2024-03-25" },
  { id: "5", full_name: "Kiran Das", email: "kiran@example.com", role: "student", status: "suspended", created_at: "2024-04-01" },
];

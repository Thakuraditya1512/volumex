import { BookOpen, Star, Users, GitCommit } from "lucide-react";

export default function StatsCards({ stats }: any) {
  const items = [
    { label: "Repositories", value: stats.repos, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Commits", value: stats.commits, icon: GitCommit, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Stars", value: stats.stars, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Followers", value: stats.followers, icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className={`w-10 h-10 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{item.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

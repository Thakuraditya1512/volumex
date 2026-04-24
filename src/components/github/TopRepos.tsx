import { Star, GitFork, ArrowUpRight } from "lucide-react";

export default function TopRepos({ repos }: any) {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">Top Repositories</h3>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All on GitHub</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo: any) => (
          <div
            key={repo.name}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
                <p className="font-bold text-slate-900 truncate max-w-[180px] group-hover:text-indigo-600 transition-colors">{repo.name}</p>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-all" />
            </div>
            
            <div className="flex gap-4 items-center mt-auto">
              <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-slate-600">{repo.stars}</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-black text-slate-600">{repo.forks}</span>
              </div>
              {repo.language && (
                  <div className="flex items-center gap-2 ml-auto">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{repo.language}</span>
                  </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {repos.length === 0 && (
          <p className="text-center text-xs font-bold text-slate-400 py-10 uppercase tracking-widest">No public repositories found</p>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { GitBranch, Loader2 } from "lucide-react";

type GitHubData = {
  username: string;
  repos: number;
  commits: number;
};

export default function GitHubConnect() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    checkGitHubConnection();
  }, []);

  const checkGitHubConnection = async () => {
    try {
      const res = await fetch("/api/github/user");
      if (!res.ok) throw new Error("Not connected");

      const json = await res.json();
      setData(json);
      setConnected(true);
    } catch (err) {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    window.location.href = "/api/github/login";
  };

  return (
    <div className="w-full max-w-[300px] rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
            <GitBranch className="w-5 h-5" />
        </div>
        <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">GitHub</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Integration</p>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      ) : !connected ? (
        /* Not Connected */
        <div className="space-y-5">
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Connect your GitHub account to track your activity and showcase your projects.
          </p>

          <button
            onClick={handleConnect}
            className="w-full bg-slate-900 text-white rounded-xl py-3 text-xs font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            Connect GitHub
          </button>
        </div>
      ) : (
        /* Connected State */
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                {data?.username?.slice(0, 2).toUpperCase()}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Connected as</p>
                <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">@{data?.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Repos</p>
              <p className="text-xl font-black text-slate-900">{data?.repos}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Commits</p>
              <p className="text-xl font-black text-slate-900">{data?.commits}</p>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors py-2"
          >
            Refresh Data
          </button>
        </div>
      )}
    </div>
  );
}

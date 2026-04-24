"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, GitBranch } from "lucide-react";
import StatsCards from "./StatsCards";
import ContributionGraph from "./ContributionGraph";
import LanguageChart from "./LanguageChart";
import TopRepos from "./TopRepos";

export default function GitHubAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/github/analytics");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center space-y-4 rounded-[32px] border border-slate-100 bg-white shadow-sm">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Aggregating GitHub Intelligence...</p>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="w-full p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Connect GitHub</h2>
            <p className="text-xs font-bold text-slate-500">Track your repositories, commits, and languages in real-time.</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.href = "/api/github/login"}
          className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
        >
          Authorize CareerOS
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                <GitBranch className="w-5 h-5" />
            </div>
            <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">GitHub Analytics</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Performance Metrics</p>
            </div>
        </div>
        <button 
          onClick={fetchData}
          disabled={refreshing}
          className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <StatsCards stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContributionGraph contributions={data.contributions} />
        <LanguageChart languages={data.languages} />
      </div>

      <TopRepos repos={data.topRepos} />
    </div>
  );
}

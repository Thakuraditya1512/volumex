"use client";

import { useState, useEffect } from "react";
import { Loader2, Trophy, Code2, Target, Award, RefreshCw, ChevronRight } from "lucide-react";

export default function LeetCodeStats() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const json = await res.json();
      if (res.ok) {
        setData(json);
        localStorage.setItem("leetcode_username", username);
      } else {
        setError(json.error || "Failed to fetch data");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("leetcode_username");
    if (saved) {
      setUsername(saved);
      // Auto fetch if we have a saved username
      const autoFetch = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/leetcode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: saved }),
            });
            const json = await res.json();
            if (res.ok) setData(json);
        } catch (e) {} finally { setLoading(false); }
      };
      autoFetch();
    }
  }, []);

  if (loading && !data) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center space-y-4 rounded-[32px] border border-slate-100 bg-white shadow-sm">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fetching LeetCode Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden relative group">
      {/* Decorative Background Icon */}
      <Code2 className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-50 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700" />

      {!data ? (
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                <Trophy className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Connect LeetCode</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Track your coding proficiency</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter LeetCode username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData()}
                className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
              />
              <button 
                onClick={fetchData}
                disabled={!username || loading}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            {error && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1">{error}</p>}
          </div>
        </div>
      ) : (
        <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{username}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank: #{data.ranking.toLocaleString()}</p>
              </div>
            </div>
            <button 
              onClick={fetchData}
              disabled={loading}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-amber-600 hover:bg-white hover:shadow-md transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accuracy</span>
                </div>
                <p className="text-2xl font-black text-slate-900">{data.acceptance}%</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reputation</span>
                </div>
                <p className="text-2xl font-black text-slate-900">{data.reputation}</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Solved Challenges</span>
                <span className="text-xs font-black text-slate-900">{data.totalSolved} / {data.totalQuestions}</span>
            </div>

            <div className="space-y-5">
              {[
                { label: "Easy", solved: data.easy, color: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50", width: (data.easy / data.totalSolved) * 100 },
                { label: "Medium", solved: data.medium, color: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50", width: (data.medium / data.totalSolved) * 100 },
                { label: "Hard", solved: data.hard, color: "bg-rose-500", text: "text-rose-600", bg: "bg-rose-50", width: (data.hard / data.totalSolved) * 100 },
              ].map((level) => (
                <div key={level.label} className="group/item">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest mb-2">
                    <span className="text-slate-600 group-hover/item:text-slate-900 transition-colors">{level.label}</span>
                    <span className={level.text}>{level.solved}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${level.color} rounded-full transition-all duration-1000 shadow-sm shadow-black/5`}
                      style={{ width: `${Math.max(10, level.width)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => { setData(null); setUsername(""); localStorage.removeItem("leetcode_username"); }}
            className="w-full text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors py-2"
          >
            Disconnect Account
          </button>
        </div>
      )}
    </div>
  );
}

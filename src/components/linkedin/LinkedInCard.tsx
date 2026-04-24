"use client";

import { useState, useEffect } from "react";
import { Linkedin, ExternalLink, ShieldCheck, Loader2, Link2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LinkedInCard() {
  const [url, setUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("linkedin_url")
          .eq("id", user.id)
          .single();
        if (data?.linkedin_url) {
          setSavedUrl(data.linkedin_url);
          setUrl(data.linkedin_url);
        }
      }
      setFetching(false);
    };
    getProfile();
  }, []);

  const handleSave = async () => {
    if (!url.includes("linkedin.com")) {
      alert("Please enter a valid LinkedIn URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/linkedin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        setSavedUrl(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
      setLoading(true);
      try {
          const res = await fetch("/api/linkedin/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: "" }),
          });
          if (res.ok) {
              setSavedUrl(null);
              setUrl("");
          }
      } catch (err) {} finally { setLoading(false); }
  };

  if (fetching) {
      return (
          <div className="w-full h-40 rounded-[32px] border border-slate-100 bg-white shadow-sm flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
      );
  }

  return (
    <div className="w-full rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden group">
      {/* Decorative Brand Icon */}
      <Linkedin className="absolute -right-6 -bottom-6 w-32 h-32 text-blue-50 opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Linkedin className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Professional Proof</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn Identity Verification</p>
                </div>
            </div>
            {savedUrl && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
                </div>
            )}
        </div>

        {!savedUrl ? (
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
                Connect your professional profile to showcase your career trajectory and network strength to potential employers.
            </p>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                        type="text"
                        placeholder="linkedin.com/in/username"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading || !url}
                    className="px-6 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-slate-200"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Link Profile"}
                </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group/link">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Profile Link</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-900 truncate max-w-[200px]">{savedUrl.replace("https://", "").replace("www.", "")}</p>
                    <a 
                        href={savedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:shadow-md transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
                <button 
                    onClick={handleDisconnect}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all group/del"
                >
                    <Trash2 className="w-4 h-4 group-hover/del:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Disconnect</span>
                </button>
                <div className="flex-1 text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Identity Secure</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

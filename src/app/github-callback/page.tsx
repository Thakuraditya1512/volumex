"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, GitBranch, CheckCircle2, AlertCircle } from "lucide-react";
import { Suspense } from "react";

function GitHubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMsg("No authorization code received.");
      return;
    }

    // Call our internal API to finalize the connection
    const finalizeConnection = async () => {
      try {
        const res = await fetch(`/api/github/callback?code=${code}`);
        if (res.ok) {
          setStatus("success");
          // Wait a bit before redirecting so they see the success message
          setTimeout(() => {
            router.push("/student");
          }, 2000);
        } else {
          const data = await res.json();
          setStatus("error");
          setErrorMsg(data.error || "Failed to link account.");
        }
      } catch (err) {
        setStatus("error");
        setErrorMsg("Internal server error.");
      }
    };

    finalizeConnection();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-white dot-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-[40px] p-10 shadow-2xl shadow-slate-200 text-center animate-in fade-in zoom-in duration-500">
        
        {status === "loading" && (
          <div className="space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-indigo-50 rounded-full animate-ping opacity-20" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl">
                <GitBranch className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Syncing Intelligence</h1>
              <p className="text-sm font-medium text-slate-500">Connecting your GitHub profile to CareerOS...</p>
            </div>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-200 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Connection Secured</h1>
              <p className="text-sm font-medium text-slate-500">Your GitHub account is now linked. Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-200">
              <AlertCircle className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sync Failed</h1>
              <p className="text-sm font-medium text-slate-500">{errorMsg}</p>
            </div>
            <button 
              onClick={() => router.push("/student")}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    }>
      <GitHubCallbackContent />
    </Suspense>
  );
}

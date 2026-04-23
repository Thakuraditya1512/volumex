"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-600 mb-8">
            We've sent a verification link to <span className="font-semibold text-gray-900">{email}</span>.
            Please click the link to activate your account.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page min-h-screen flex bg-white font-sans text-gray-900">
      {/* LEFT SIDE (FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2.5 mb-10">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4">
                <path d="M9 2L15.5 5.5V12.5L9 16L2.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="9" cy="9" r="2.5" fill="white" />
              </svg>
            </span>
            <span className="font-bold text-xl tracking-tight text-gray-900">CareerOS</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Join thousands of students accelerating their careers.
          </p>

          <form className="space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-semibold">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm placeholder-gray-400 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-muted-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 px-1">
                Must be at least 6 characters long.
              </p>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 leading-relaxed px-1">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-indigo-600 font-semibold hover:underline">Terms of Service</Link> and{" "}
              <Link href="#" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</Link>.
            </p>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-3 rounded-xl font-semibold shadow-sm transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" /></svg> Creating account...</>
              ) : "Sign up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center mt-8 text-gray-600 font-medium tracking-wide">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (SHOWCASE) */}
      <div className="hidden lg:flex w-1/2 bg-[#fafafa] border-l border-gray-100 items-center justify-center relative p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

        <div className="max-w-md relative z-10 animate-in fade-in slide-in-from-right-8 duration-1000 delay-150 fill-mode-both text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-600 shadow-sm mb-6">
            ✨ Your journey starts here
          </div>
          <h2 className="text-4xl font-serif tracking-tight text-gray-900 mb-4 leading-tight">
            Design your future, one milestone at a time.
          </h2>
          <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
            Get access to personalized roadmaps, industry-standard mock tests, and a community of high-achievers.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-indigo-100/50 border border-gray-100 transform -rotate-1">
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg">🎓</div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">New Achievement</p>
                <p className="text-sm font-bold text-indigo-900">Early Bird Access Unlocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

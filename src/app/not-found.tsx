import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center font-sans">
      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
        <span className="text-4xl">🔍</span>
      </div>
      <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-10 font-medium">
        Oops! It seems the career path you're looking for doesn't exist yet or has been moved.
      </p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-105 transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

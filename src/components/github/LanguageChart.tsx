export default function LanguageChart({ languages }: any) {
  // Sort languages by percentage
  const sortedLangs = Object.entries(languages)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5);

  const colors = ["bg-indigo-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500", "bg-sky-500"];

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm h-full">
      <h3 className="text-sm font-black text-slate-900 tracking-tight mb-6">Language Distribution</h3>

      <div className="space-y-5">
        {sortedLangs.map(([lang, val]: any, i) => (
          <div key={lang} className="group">
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest mb-2">
              <span className="text-slate-600 group-hover:text-indigo-600 transition-colors">{lang}</span>
              <span className="text-slate-400">{val}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors[i % colors.length]} rounded-full transition-all duration-1000 shadow-sm shadow-black/5`}
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {sortedLangs.length === 0 && (
          <div className="h-40 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest">No data detected</p>
          </div>
      )}
    </div>
  );
}

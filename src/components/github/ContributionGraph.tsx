export default function ContributionGraph({ contributions }: any) {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-slate-900 tracking-tight">Contribution Heatmap</h3>
        <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Less</span>
            <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">More</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center">
        {contributions.map((day: any, i: number) => {
          // Determine color intensity
          let bgColor = "bg-slate-100";
          if (day.count > 0 && day.count < 3) bgColor = "bg-emerald-100";
          else if (day.count >= 3 && day.count < 6) bgColor = "bg-emerald-300";
          else if (day.count >= 6 && day.count < 9) bgColor = "bg-emerald-500";
          else if (day.count >= 9) bgColor = "bg-emerald-700";

          return (
            <div
              key={i}
              title={`${day.count} contributions`}
              className={`w-3.5 h-3.5 rounded-[3px] transition-all hover:scale-125 cursor-pointer ${bgColor} hover:ring-2 hover:ring-indigo-200`}
            />
          );
        })}
      </div>
      <p className="text-[10px] font-bold text-slate-400 mt-6 text-center italic">Activity over the last 20 weeks</p>
    </div>
  );
}

import React from "react";

export const StatusDot: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    healthy: "#10b981", warning: "#f59e0b", danger: "#ef4444",
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{ background: colors[status] ?? colors.healthy }}
    />
  );
};

export const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    admin:    { bg: "rgba(99,102,241,0.12)",  text: "#a5b4fc", border: "rgba(99,102,241,0.3)" },
    student:  { bg: "rgba(59,130,246,0.12)",  text: "#93c5fd", border: "rgba(59,130,246,0.3)" },
    employee: { bg: "rgba(16,185,129,0.12)",  text: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
  };
  const s = styles[role.toLowerCase()] ?? styles.student;
  return (
    <span
      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {role}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg: Record<string, { dot: string; text: string }> = {
    active:    { dot: "#10b981", text: "#6ee7b7" },
    pending:   { dot: "#f59e0b", text: "#fcd34d" },
    suspended: { dot: "#ef4444", text: "#fca5a5" },
  };
  const c = cfg[status.toLowerCase()] ?? cfg.active;
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      <span className="text-xs font-medium capitalize" style={{ color: c.text }}>{status}</span>
    </div>
  );
};

export const ProgressBar: React.FC<{ value: number; color?: string }> = ({ value, color = "#6366f1" }) => (
  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{ width: `${value}%`, background: color }}
    />
  </div>
);

export const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 p-3 text-xs" style={{ background: "#0f172a" }}>
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: <span className="text-white">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

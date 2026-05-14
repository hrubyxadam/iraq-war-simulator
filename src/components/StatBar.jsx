import { AlertTriangle } from "lucide-react";

export default function StatBar({ label, value, negative = false }) {
  const safeValue = Math.min(100, Math.max(0, value));
  const status = getStatus(safeValue, negative);

  return (
    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/55 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {negative && <AlertTriangle className="h-4 w-4 shrink-0 text-red-300" aria-hidden="true" />}
          <span className="truncate text-sm font-medium text-zinc-200">{label}</span>
        </div>
        <span className={`font-mono text-sm ${status.textClass}`}>{safeValue}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${status.barClass}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

function getStatus(value, negative) {
  if (negative) {
    if (value >= 80) return { barClass: "bg-red-500", textClass: "text-red-300" };
    if (value >= 55) return { barClass: "bg-amber-400", textClass: "text-amber-200" };
    return { barClass: "bg-teal-400", textClass: "text-teal-200" };
  }

  if (value <= 25) return { barClass: "bg-red-500", textClass: "text-red-300" };
  if (value <= 50) return { barClass: "bg-amber-400", textClass: "text-amber-200" };
  return { barClass: "bg-teal-400", textClass: "text-teal-200" };
}

import { ScrollText } from "lucide-react";

export default function HistoryLog({ entries }) {
  return (
    <aside className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
      <div className="mb-4 flex items-center gap-2">
        <ScrollText className="h-4 w-4 text-amber-200" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-zinc-100">Historický log</h2>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm leading-6 text-zinc-500">Rozhodnutí se objeví zde po výběru první možnosti.</p>
      ) : (
        <ol className="space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.scenarioId}
              className={`rounded border p-3 ${
                entry.locked
                  ? "border-zinc-800 bg-zinc-900/60"
                  : "border-amber-300/30 bg-amber-300/10"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-amber-200">{entry.year}</span>
                <span className="text-xs text-zinc-500">{entry.locked ? entry.impact : "návrh rozhodnutí"}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-zinc-200">{entry.title}</p>
              <p className="mt-1 text-sm leading-5 text-zinc-400">{entry.choiceLabel}</p>
              {!entry.locked && (
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-200">
                  čeká na potvrzení
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}

import { RotateCcw } from "lucide-react";
import { calculateResult } from "../utils/calculateResult";
import StatBar from "./StatBar";

export default function ResultScreen({ stats, criticalFailure, onRestart }) {
  const result = calculateResult(stats, criticalFailure);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="situation-grid fixed inset-0 opacity-40" />
      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-lg border border-zinc-700 bg-zinc-950/85 p-6 shadow-command backdrop-blur md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200">závěrečné hodnocení</p>
          <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{result.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{result.description}</p>

          {result.trigger && (
            <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
              Kritická hranice: {result.trigger}
            </p>
          )}

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <InfoBox title="Nejsilnější oblast" value={`${result.strongest.label}: ${result.strongest.value}`} />
            <InfoBox title="Nejslabší oblast" value={`${result.weakest.label}: ${result.weakest.value}`} />
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-100">Konečné ukazatele</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <StatBar label="Domácí podpora" value={stats.domesticSupport} />
              <StatBar label="Mezinárodní legitimita" value={stats.internationalLegitimacy} />
              <StatBar label="Bezpečnostní riziko" value={stats.securityRisk} negative />
              <StatBar label="Státní rozpočet" value={stats.budget} />
              <StatBar label="Stabilita Iráku" value={stats.iraqStability} />
              <StatBar label="Vojenská kapacita" value={stats.militaryCapacity} />
            </div>
          </section>

          <section className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5">
            <h2 className="text-lg font-semibold text-zinc-100">Analytický rámec</h2>
            <p className="mt-3 leading-7 text-zinc-300">{result.framework}</p>
          </section>

          <button
            type="button"
            onClick={onRestart}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Hrát znovu
          </button>
        </div>
      </div>
    </main>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

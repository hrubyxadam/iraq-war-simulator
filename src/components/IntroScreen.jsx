import { Landmark, Shield } from "lucide-react";

export default function IntroScreen({ onStart, onOpenAbout }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="situation-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-3 text-sm text-amber-200">
              <Landmark className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono uppercase tracking-[0.22em]">rozhodovací simulátor</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold text-white md:text-6xl">
              Iraq 2003: Doctrine Simulator
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Jste prezidentem Spojených států po útocích z 11. září 2001. Vaším úkolem je chránit
              bezpečnost USA, zachovat domácí podporu, udržet mezinárodní legitimitu a rozhodnout,
              zda a jak zasáhnout proti Iráku. Každé rozhodnutí má politické, vojenské a strategické
              důsledky.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStart}
                className="rounded-md bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white"
              >
                Zahájit rozhodování
              </button>
              <button
                type="button"
                onClick={onOpenAbout}
                className="rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                O projektu a zdroje
              </button>
            </div>
          </div>

          <aside className="rounded-lg border border-zinc-800 bg-zinc-950/75 p-5 shadow-command backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">Situation room</p>
                <h2 className="mt-1 text-xl font-semibold text-zinc-100">Analytický rámec</h2>
              </div>
              <Shield className="h-6 w-6 text-teal-300" aria-hidden="true" />
            </div>
            <div className="space-y-3 text-sm leading-6 text-zinc-300">
              <p>Bezpečnostní opodstatnění</p>
              <p>Mezinárodní legitimita</p>
              <p>Vojenský úspěch</p>
              <p>Strategicko-politický výsledek</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

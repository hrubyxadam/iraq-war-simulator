import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MessageSquareText, RotateCcw, UserRound } from "lucide-react";

export default function DecisionCard({
  scenario,
  selectedChoice,
  onChoose,
  onResetChoice,
  onContinue,
  feedback,
  showNotes,
  isLastCard,
  previewStats,
}) {
  const advisors = scenario.briefing?.advisors || [];
  const [advisorIndex, setAdvisorIndex] = useState(0);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const [motion, setMotion] = useState("idle");
  const advisor = advisors[advisorIndex] || null;
  const story = selectedChoice ? buildOutcomeStory(scenario, selectedChoice, previewStats) : null;

  useEffect(() => {
    setAdvisorIndex(0);
    setAdviceOpen(false);
    setMotion("enter");
    const timer = window.setTimeout(() => setMotion("idle"), 420);
    return () => window.clearTimeout(timer);
  }, [scenario.id]);

  function choose(choice) {
    setMotion("chosen");
    window.setTimeout(() => setMotion("idle"), 520);
    onChoose(choice);
  }

  function nextAdvisor(direction) {
    if (!advisors.length) return;
    setAdviceOpen(false);
    setAdvisorIndex((index) => (index + direction + advisors.length) % advisors.length);
  }

  return (
    <article className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/85 p-4 shadow-command backdrop-blur md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-amber-200">
          {scenario.year}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">{scenario.title}</span>
      </div>

      <section className="rounded-lg border border-zinc-800 bg-zinc-900/65 p-5 text-center md:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-200">Rozhodnutí</p>
        <h2 className="mx-auto mt-3 max-w-5xl text-3xl font-semibold leading-tight text-zinc-50 md:text-5xl">
          {scenario.question}
        </h2>
        <p className="mx-auto mt-4 max-w-4xl text-sm leading-6 text-zinc-400">{scenario.context}</p>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <AdvisorCard
          advisor={advisor}
          adviceOpen={adviceOpen}
          motion={motion}
          onToggleAdvice={() => setAdviceOpen((value) => !value)}
          onPrev={() => nextAdvisor(-1)}
          onNext={() => nextAdvisor(1)}
          canSwitch={advisors.length > 1}
        />

        <div className="grid gap-3">
          {scenario.choices.map((choice, index) => {
            const active = selectedChoice === choice;

            return (
              <button
                key={choice.label}
                type="button"
                onClick={() => choose(choice)}
                className={`choice-card rounded-lg border p-4 text-left transition ${
                  active
                    ? "choice-card-active border-teal-300/70 bg-teal-400/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-amber-300/50 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border font-mono text-xs ${
                      active
                        ? "border-teal-300/70 bg-teal-300/10 text-teal-100"
                        : "border-zinc-700 bg-zinc-950 text-zinc-400"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="leading-6 text-zinc-100">{choice.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedChoice && (
        <section className="mt-5 rounded-lg border border-teal-400/20 bg-teal-400/10 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-200">Dopad rozhodnutí</p>
              <p className="mt-2 text-sm font-medium leading-6 text-teal-100">{feedback}</p>
            </div>
            <button
              type="button"
              onClick={onResetChoice}
              className="inline-flex items-center gap-2 rounded-md border border-teal-300/30 px-3 py-2 text-sm font-semibold text-teal-100 transition hover:border-teal-200 hover:bg-teal-300/10"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Změnit volbu
            </button>
          </div>

          {story && (
            <div className="dispatch-card mt-4 rounded-lg border border-zinc-800 bg-zinc-950/55 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-200">Depeše</p>
              <p className="mt-2 text-lg font-semibold leading-6 text-zinc-50">{story.title}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{story.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {story.signals.map((signal) => (
                  <span key={signal} className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          )}

          {showNotes && (
            <p className="mt-3 border-t border-teal-300/20 pt-3 text-sm leading-6 text-zinc-300">
              {selectedChoice.historicalNote}
            </p>
          )}

          <button
            type="button"
            onClick={onContinue}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          >
            {isLastCard ? "Zobrazit výsledek" : "Pokračovat"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      )}
    </article>
  );
}

function AdvisorCard({ advisor, adviceOpen, motion, onToggleAdvice, onPrev, onNext, canSwitch }) {
  if (!advisor) return null;
  const portrait = getAdvisorPortrait(advisor);

  return (
    <section className={`advisor-card rounded-lg border border-zinc-800 bg-zinc-900/70 p-4 ${motion === "enter" ? "advisor-enter" : ""} ${motion === "chosen" ? "advisor-choice" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canSwitch}
          className="rounded-md border border-zinc-700 p-2 text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-100 disabled:opacity-30"
          aria-label="Předchozí poradce"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-200">Poradce</p>
          <p className="mt-1 text-lg font-semibold text-zinc-50">{advisor.name}</p>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">{advisor.role}</p>
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={!canSwitch}
          className="rounded-md border border-zinc-700 p-2 text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-100 disabled:opacity-30"
          aria-label="Další poradce"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        className={`advisor-portrait advisor-portrait-${portrait.variant} mx-auto mt-4 flex h-48 max-w-64 items-end justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950`}
      >
        <div className={`advisor-silhouette advisor-${portrait.variant}`}>
          <div className="advisor-head" />
          <div className="advisor-body" />
          <span className="advisor-mark">{portrait.mark}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleAdvice}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200 hover:bg-amber-300/15"
      >
        <MessageSquareText className="h-4 w-4" aria-hidden="true" />
        {adviceOpen ? "Skrýt radu" : "Obrátit se na poradce"}
      </button>

      {adviceOpen && (
        <div className="advisor-speech mt-4 rounded-lg border border-amber-300/25 bg-zinc-950/70 p-4">
          <div className="flex items-center gap-2 text-amber-200">
            <UserRound className="h-4 w-4" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-[0.14em]">uzavřená porada</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-200">{advisor.message}</p>
        </div>
      )}
    </section>
  );
}

function getAdvisorPortrait(advisor) {
  const profile = `${advisor.id} ${advisor.name} ${advisor.role}`.toLowerCase();

  if (profile.includes("rumsfeld") || profile.includes("pentagon") || profile.includes("defense") || profile.includes("obrany")) {
    return { variant: "defense", mark: "DEF" };
  }
  if (
    profile.includes("centcom") ||
    profile.includes("army") ||
    profile.includes("marine") ||
    profile.includes("general") ||
    profile.includes("velitel") ||
    profile.includes("vojensk")
  ) {
    return { variant: "military", mark: "MIL" };
  }
  if (profile.includes("cia") || profile.includes("intel") || profile.includes("zpravodaj") || profile.includes("tenet") || profile.includes("ct")) {
    return { variant: "intel", mark: "INT" };
  }
  if (profile.includes("powell") || profile.includes("state") || profile.includes("diplomat") || profile.includes("un") || profile.includes("osn")) {
    return { variant: "state", mark: "DIP" };
  }
  if (profile.includes("cheney") || profile.includes("rice") || profile.includes("rove") || profile.includes("politic") || profile.includes("bílého domu")) {
    return { variant: "political", mark: "WH" };
  }
  if (profile.includes("iráck") || profile.includes("iraqi") || profile.includes("sunnit") || profile.includes("kmen") || profile.includes("tribal")) {
    return { variant: "iraqi", mark: "IRQ" };
  }
  if (profile.includes("omb") || profile.includes("budget") || profile.includes("rozpoč")) {
    return { variant: "budget", mark: "$" };
  }
  if (profile.includes("legal") || profile.includes("práv")) {
    return { variant: "legal", mark: "LAW" };
  }
  return { variant: "civil", mark: "ADV" };
}

function buildOutcomeStory(scenario, choice, previewStats) {
  const warPhase = scenario.year >= 2003;
  const instability = previewStats.iraqStability < 45 || previewStats.securityRisk > 78;
  const legitimacyHit = (choice.effects.internationalLegitimacy || 0) < -3;
  const securityGain = (choice.effects.securityRisk || 0) < 0;

  if (warPhase && instability) {
    return {
      title: "Mapa se rozsvítí",
      summary: "Režim slábne, ale vakuum moci okamžitě zvyšuje cenu každého dalšího kroku.",
      signals: ["Bagdád: napětí", "Region: nervozita", "Washington: tlak"],
    };
  }

  if (warPhase) {
    return {
      title: securityGain ? "Koalice získává iniciativu" : "Objevují se nová ohniska",
      summary: securityGain
        ? "Vojenský tah přináší krátké okno kontroly. Politická stabilizace ale teprve začíná."
        : "Taktická výhoda se rychle mění v otázku správy, loajality a veřejného pořádku.",
      signals: securityGain
        ? ["CENTCOM: iniciativa", "Bagdád: čeká správa", "Veřejnost: sleduje"]
        : ["Povstání: prostor", "Koalice: zátěž", "Irák: křehkost"],
    };
  }

  return {
    title: legitimacyHit ? "Spojenci couvají o krok" : "Washington posouvá doktrínu",
    summary: legitimacyHit
      ? "Rozhodnutí působí silně doma, ale část spojenců začíná pochybovat o hranicích americké strategie."
      : "Bílý dům získává iniciativu a svět čeká, zda půjde o jednorázovou reakci, nebo nový strategický rámec.",
    signals: legitimacyHit
      ? ["OSN: chladne", "Spojenci: váhají", "Bílý dům: tlak"]
      : ["Bílý dům: iniciativa", "Spojenci: sledují", "Bagdád: pod tlakem"],
  };
}

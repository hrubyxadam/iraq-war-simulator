import { useMemo, useState } from "react";
import { Activity, BookOpen, Eye, EyeOff, RotateCcw } from "lucide-react";
import DecisionCard from "./components/DecisionCard";
import HistoryLog from "./components/HistoryLog";
import IntroScreen from "./components/IntroScreen";
import ResultScreen from "./components/ResultScreen";
import { initialStats, scenarios, statLabels } from "./data/scenarios";
import { applyEffects, getCriticalFailure, getMainImpact, summarizeEffects } from "./utils/calculateResult";

const sources = [
  "The National Security Strategy of the United States of America, 2002",
  "United Nations Security Council Resolution 1441, 2002",
  "Congressional Research Service reports on Iraq",
  "Senate Select Committee on Intelligence, Report on the U.S. Intelligence Community’s Prewar Intelligence Assessments on Iraq, 2004",
  "Ali A. Allawi: The Occupation of Iraq, 2007",
  "George W. Bush: Decision Points, 2010",
  "Douglas Feith: War and Decision, 2008",
  "John J. Mearsheimer and Stephen M. Walt: The Israel Lobby and U.S. Foreign Policy, 2007",
  "Robert Kagan: Of Paradise and Power, 2003",
];

const compactStatOrder = [
  "domesticSupport",
  "internationalLegitimacy",
  "securityRisk",
  "budget",
  "iraqStability",
  "militaryCapacity",
];

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [stats, setStats] = useState(initialStats);
  const [cardStartStats, setCardStartStats] = useState(initialStats);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);
  const [showNotes, setShowNotes] = useState(true);
  const [criticalFailure, setCriticalFailure] = useState(null);
  const [aboutReturnScreen, setAboutReturnScreen] = useState("intro");

  const currentScenario = scenarios[currentIndex];
  const progress = useMemo(() => ((currentIndex + 1) / scenarios.length) * 100, [currentIndex]);
  const pressure = useMemo(() => calculatePressure(stats), [stats]);

  function startGame() {
    setScreen("game");
    setStats(initialStats);
    setCardStartStats(initialStats);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setFeedback("");
    setHistory([]);
    setCriticalFailure(null);
  }

  function openAbout(returnScreen) {
    setAboutReturnScreen(returnScreen);
    setScreen("about");
  }

  function handleChoice(choice) {
    const nextStats = applyEffects(cardStartStats, choice.effects);
    const failure = getCriticalFailure(nextStats);

    setSelectedChoice(choice);
    setStats(nextStats);
    setFeedback(summarizeEffects(choice.effects));
    setHistory((entries) => {
      const draftEntry = {
        scenarioId: currentScenario.id,
        year: currentScenario.year,
        title: currentScenario.title,
        choiceLabel: choice.label,
        impact: getMainImpact(choice.effects),
        locked: false,
      };

      const existingIndex = entries.findIndex((entry) => entry.scenarioId === currentScenario.id);
      if (existingIndex === -1) return [...entries, draftEntry];

      return entries.map((entry, index) => (index === existingIndex ? draftEntry : entry));
    });

    setCriticalFailure(failure);
  }

  function resetCurrentChoice() {
    setStats(cardStartStats);
    setSelectedChoice(null);
    setFeedback("");
    setCriticalFailure(null);
    setHistory((entries) => entries.filter((entry) => entry.scenarioId !== currentScenario.id));
  }

  function continueGame() {
    setHistory((entries) =>
      entries.map((entry) =>
        entry.scenarioId === currentScenario.id ? { ...entry, locked: true } : entry,
      ),
    );

    if (criticalFailure || currentIndex === scenarios.length - 1) {
      setScreen("result");
      return;
    }

    setCurrentIndex((index) => index + 1);
    setCardStartStats(stats);
    setSelectedChoice(null);
    setFeedback("");
  }

  if (screen === "intro") {
    return <IntroScreen onStart={startGame} onOpenAbout={() => openAbout("intro")} />;
  }

  if (screen === "about") {
    return (
      <AboutScreen
        onBack={() => setScreen(aboutReturnScreen)}
        backLabel={aboutReturnScreen === "game" ? "Zpět do simulace" : "Zpět na úvod"}
      />
    );
  }

  if (screen === "result") {
    return <ResultScreen stats={stats} criticalFailure={criticalFailure} onRestart={startGame} />;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="situation-grid fixed inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-4 md:py-5">
        <header className="mb-3 rounded-lg border border-zinc-800 bg-zinc-950/75 p-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200">Iraq 2003</p>
              <h1 className="mt-1 text-xl font-semibold text-white">Doctrine Simulator</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNotes((value) => !value)}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                {showNotes ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
                Zobrazit historické poznámky
              </button>
              <button
                type="button"
                onClick={() => openAbout("game")}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                O projektu
              </button>
              <button
                type="button"
                onClick={startGame}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Restart
              </button>
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>Rok {currentScenario.year}</span>
              <span>
                {currentIndex + 1}/{scenarios.length}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full rounded-full bg-amber-300 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <MiniStatLine stats={stats} pressure={pressure} selectedChoice={selectedChoice} />
        </header>

        <div className="grid gap-4">
          <DecisionCard
            scenario={currentScenario}
            selectedChoice={selectedChoice}
            onChoose={handleChoice}
            onResetChoice={resetCurrentChoice}
            onContinue={continueGame}
            feedback={feedback}
            showNotes={showNotes}
            isLastCard={currentIndex === scenarios.length - 1 || Boolean(criticalFailure)}
            previewStats={stats}
          />
        </div>

        <div className="mt-4">
          <HistoryLog entries={history} />
        </div>

        <footer className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/70 p-4 text-sm leading-6 text-zinc-400">
          <span className="font-semibold text-zinc-200">Historická poznámka:</span> Simulace převádí hlavní
          analytické dilema invaze do rozhodovacího modelu. Nehledá jednoduchou správnou odpověď, ale ukazuje
          napětí mezi bezpečností, legitimitou, kapacitou a politickým výsledkem.
        </footer>
      </div>
    </main>
  );
}

function MiniStatLine({ stats, pressure, selectedChoice }) {
  const level = pressure >= 75 ? "Kritický" : pressure >= 52 ? "Napjatý" : "Kontrolovaný";

  return (
    <section className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-zinc-800 pt-2">
      <span className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-xs text-zinc-300">
        <Activity className="h-3.5 w-3.5 text-amber-200" aria-hidden="true" />
        <span>Tlak</span>
        <span className="font-mono text-zinc-100">{pressure}</span>
        <span className="text-zinc-600">{level}</span>
        <span className="text-zinc-600">{selectedChoice ? "návrh" : "čeká"}</span>
      </span>
      <div className="flex flex-wrap gap-1.5">
        {compactStatOrder.map((key) => (
          <MiniStat key={key} statKey={key} value={stats[key]} />
        ))}
      </div>
    </section>
  );
}

function MiniStat({ statKey, value }) {
  const isRisk = statKey === "securityRisk";
  const label = {
    domesticSupport: "Domácí",
    internationalLegitimacy: "Legitimita",
    securityRisk: "Riziko",
    budget: "Rozpočet",
    iraqStability: "Irák",
    militaryCapacity: "Armáda",
  }[statKey] || statLabels[statKey];
  const tone = getCompactTone(value, isRisk);

  return (
    <span
      className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-xs text-zinc-300"
      title={statLabels[statKey]}
    >
      {label}
      <span className={`font-mono ${tone.text}`}>{value}</span>
    </span>
  );
}

function getCompactTone(value, negative) {
  if (negative) {
    if (value >= 80) return { text: "text-red-300", bar: "bg-red-500" };
    if (value >= 55) return { text: "text-amber-200", bar: "bg-amber-400" };
    return { text: "text-teal-200", bar: "bg-teal-400" };
  }

  if (value <= 25) return { text: "text-red-300", bar: "bg-red-500" };
  if (value <= 50) return { text: "text-amber-200", bar: "bg-amber-400" };
  return { text: "text-teal-200", bar: "bg-teal-400" };
}

function calculatePressure(stats) {
  const positiveStress =
    (100 - stats.domesticSupport) * 0.16 +
    (100 - stats.internationalLegitimacy) * 0.18 +
    (100 - stats.budget) * 0.14 +
    (100 - stats.iraqStability) * 0.22 +
    (100 - stats.militaryCapacity) * 0.14;
  const riskStress = stats.securityRisk * 0.16;
  return Math.round(Math.min(100, Math.max(0, positiveStress + riskStress)));
}

function AboutScreen({ onBack, backLabel }) {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="situation-grid fixed inset-0 opacity-40" />
      <section className="relative mx-auto max-w-4xl rounded-lg border border-zinc-800 bg-zinc-950/85 p-6 shadow-command backdrop-blur md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200">O projektu a zdroje</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Iraq 2003: Doctrine Simulator</h1>
        <p className="mt-5 leading-7 text-zinc-300">
          Tento interaktivní výukový materiál vznikl jako sekundární výstup ke středoškolské odborné práci
          Invaze do Iráku 2003: Bushova doktrína a test amerického intervencionalismu. Simulace nezachycuje
          všechny historické proměnné, ale převádí hlavní analytické dilema práce do rozhodovacího modelu.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-100">Zdroje</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
          {sources.map((source) => (
            <li key={source} className="border-l border-zinc-700 pl-3">
              {source}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onBack}
          className="mt-8 rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white"
        >
          {backLabel}
        </button>
      </section>
    </main>
  );
}

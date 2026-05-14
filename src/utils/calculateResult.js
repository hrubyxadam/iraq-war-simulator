import { criticalLimits, statLabels } from "../data/scenarios";

const positiveStats = [
  "domesticSupport",
  "internationalLegitimacy",
  "budget",
  "iraqStability",
  "militaryCapacity",
];

export function clampStat(value) {
  return Math.min(100, Math.max(0, value));
}

export function applyEffects(stats, effects) {
  return Object.fromEntries(
    Object.entries(stats).map(([key, value]) => [key, clampStat(value + (effects[key] || 0))]),
  );
}

export function getCriticalFailure(stats) {
  for (const [key, limit] of Object.entries(criticalLimits)) {
    if (limit.type === "min" && stats[key] <= limit.value) {
      return { stat: key, label: statLabels[key], reason: limit.reason };
    }
    if (limit.type === "max" && stats[key] >= limit.value) {
      return { stat: key, label: statLabels[key], reason: limit.reason };
    }
  }
  return null;
}

export function summarizeEffects(effects) {
  const improved = [];
  const worsened = [];

  Object.entries(effects).forEach(([key, delta]) => {
    if (!delta) return;
    const isRisk = key === "securityRisk";
    const goodChange = isRisk ? delta < 0 : delta > 0;
    const bucket = goodChange ? improved : worsened;
    bucket.push(statLabels[key]);
  });

  if (!improved.length && !worsened.length) {
    return "Vaše rozhodnutí udrželo ukazatele beze změny, ale politický význam volby zůstává otevřený.";
  }

  const positive = improved.length ? `zlepšilo ${formatList(improved)}` : "";
  const negative = worsened.length ? `zhoršilo ${formatList(worsened)}` : "";

  if (positive && negative) return `Vaše rozhodnutí ${positive}, ale zároveň ${negative}.`;
  if (positive) return `Vaše rozhodnutí ${positive}.`;
  return `Vaše rozhodnutí ${negative}.`;
}

export function getMainImpact(effects) {
  const sorted = Object.entries(effects)
    .filter(([, value]) => value !== 0)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));

  if (!sorted.length) return "bez přímé změny ukazatelů";

  const [key, delta] = sorted[0];
  const direction =
    key === "securityRisk"
      ? delta < 0
        ? "nižší"
        : "vyšší"
      : delta > 0
        ? "vyšší"
        : "nižší";

  return `${direction} ${statLabels[key].toLowerCase()}`;
}

export function calculateResult(stats, criticalFailure = null) {
  const strongest = findStrongest(stats);
  const weakest = findWeakest(stats);

  if (criticalFailure) {
    return {
      title: "Politický kolaps",
      description:
        "Rozhodovací proces narazil na kritickou mez, při níž už nelze udržet koherentní strategii. Krize v jedné oblasti přetavila vojenské i diplomatické možnosti v politickou zátěž.",
      strongest,
      weakest,
      framework:
        "Analytický rámec ukazuje, že bezpečnostní opodstatnění, legitimita, vojenský úspěch a strategicko-politický výsledek se mohou rozpadnout v odlišných tempech.",
      trigger: `${criticalFailure.label}: ${criticalFailure.reason}`,
    };
  }

  if (stats.iraqStability >= 68 && stats.securityRisk <= 55 && stats.internationalLegitimacy >= 45) {
    return {
      title: "Stabilizační úspěch",
      description:
        "Vojenská převaha byla doplněna relativně udržitelnou politickou rekonstrukcí. Náklady zůstaly značné, ale intervence nepřerostla v nekontrolovatelný kolaps státu.",
      strongest,
      weakest,
      framework:
        "Bezpečnostní opodstatnění zůstalo svázané s politickou stabilizací. Vojenský úspěch se proměnil ve strategický výsledek teprve tehdy, když legitimita a správa státu nezaostaly.",
    };
  }

  if (stats.internationalLegitimacy >= 70 && stats.budget >= 50 && stats.militaryCapacity >= 55) {
    return {
      title: "Multilaterální zdrženlivost",
      description:
        "Strategie upřednostnila legitimitu, spojence a omezení nákladů před rychlým donucovacím výsledkem. Bezpečnostní hrozby tím nemusely zmizet, ale Spojené státy si uchovaly širší politický prostor.",
      strongest,
      weakest,
      framework:
        "Výsledek zdůrazňuje, že legitimita může být strategickou kapacitou. Bezpečnostní opodstatnění je silnější, pokud není oddělené od mezinárodního mandátu.",
    };
  }

  if (stats.securityRisk <= 48 && stats.iraqStability < 45) {
    return {
      title: "Vojenské vítězství, strategické selhání",
      description:
        "Režim byl poražen a bezprostřední hrozba potlačena, ale politická rekonstrukce nedokázala udržet krok s vojenskou operací. Právě zde se nejostřeji ukazuje limit amerického intervencionalismu.",
      strongest,
      weakest,
      framework:
        "Bezpečnostní opodstatnění a vojenský úspěch nestačily k příznivému strategicko-politickému výsledku. Legitimita a stabilizace se ukázaly jako samostatné, nikoli automatické proměnné.",
    };
  }

  if (stats.iraqStability <= 35 || stats.securityRisk >= 82) {
    return {
      title: "Chaotická intervence",
      description:
        "Rozhodnutí vytvořila sérii krátkodobých řešení, která nedokázala zabránit bezpečnostnímu vakuu a politické fragmentaci. Válka zůstala proveditelná, ale mír se stal mnohem náročnější.",
      strongest,
      weakest,
      framework:
        "Analytický rámec zde odděluje schopnost zasáhnout od schopnosti stabilizovat. Slabá legitimita nebo rostoucí riziko podkopávají i původně přesvědčivé bezpečnostní argumenty.",
    };
  }

  return {
    title: "Omezený úspěch",
    description:
      "Strategie dosáhla některých bezpečnostních a politických cílů, ale za cenu značných kompromisů. Výsledek není jednoznačným vítězstvím ani úplným selháním.",
    strongest,
    weakest,
    framework:
      "Výsledek ukazuje napětí mezi bezpečnostním opodstatněním, legitimitou, vojenským úspěchem a strategicko-politickým výsledkem. Každá oblast může posilovat jinou, ale žádná ji automaticky nenahrazuje.",
  };
}

function findStrongest(stats) {
  const entries = [
    ...positiveStats.map((key) => [key, stats[key]]),
    ["securityRisk", 100 - stats.securityRisk],
  ];
  const [key, score] = entries.sort(([, a], [, b]) => b - a)[0];
  return { label: statLabels[key], value: key === "securityRisk" ? stats[key] : score };
}

function findWeakest(stats) {
  const entries = [
    ...positiveStats.map((key) => [key, stats[key]]),
    ["securityRisk", 100 - stats.securityRisk],
  ];
  const [key, score] = entries.sort(([, a], [, b]) => a - b)[0];
  return { label: statLabels[key], value: key === "securityRisk" ? stats[key] : score };
}

function formatList(items) {
  if (items.length === 1) return items[0].toLowerCase();
  if (items.length === 2) return `${items[0].toLowerCase()} a ${items[1].toLowerCase()}`;
  return `${items
    .slice(0, -1)
    .map((item) => item.toLowerCase())
    .join(", ")} a ${items[items.length - 1].toLowerCase()}`;
}

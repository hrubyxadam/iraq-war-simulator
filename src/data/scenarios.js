export const initialStats = {
  domesticSupport: 75,
  internationalLegitimacy: 65,
  securityRisk: 80,
  budget: 75,
  iraqStability: 50,
  militaryCapacity: 85,
};

export const statLabels = {
  domesticSupport: "Domácí podpora",
  internationalLegitimacy: "Mezinárodní legitimita",
  securityRisk: "Bezpečnostní riziko",
  budget: "Státní rozpočet",
  iraqStability: "Stabilita Iráku",
  militaryCapacity: "Vojenská kapacita",
};

export const criticalLimits = {
  domesticSupport: { type: "min", value: 10, reason: "politická krize doma" },
  internationalLegitimacy: { type: "min", value: 10, reason: "diplomatická izolace" },
  securityRisk: { type: "max", value: 95, reason: "bezpečnostní eskalace" },
  budget: { type: "min", value: 10, reason: "fiskální vyčerpání" },
  iraqStability: { type: "min", value: 10, reason: "kolaps okupace" },
  militaryCapacity: { type: "min", value: 10, reason: "operační přetížení" },
};

const baseScenarios = [
  {
    id: "post-9-11-response",
    year: 2001,
    title: "Bezprostřední reakce na 11. září",
    context:
      "Spojené státy jsou po útocích pod tlakem veřejnosti i spojenců. Administrativa musí určit, zda válka proti teroru zůstane zaměřena na pachatele útoků, nebo se stane širší strategií vůči režimům spojovaným s terorismem.",
    question:
      "Má se válka proti teroru soustředit pouze na al-Káidu, nebo i na státy, které mohou podporovat terorismus?",
    choices: [
      {
        label: "Soustředit se primárně na al-Káidu a Afghánistán.",
        effects: {
          domesticSupport: -2,
          internationalLegitimacy: 8,
          securityRisk: -6,
          budget: -3,
          iraqStability: 1,
          militaryCapacity: -4,
        },
        explanation:
          "Úzké zaměření drží koalici pohromadě a umožňuje přesněji soustředit síly, ale část domácí debaty ho může vnímat jako příliš opatrné.",
        historicalNote:
          "Historicky se první fáze soustředila na Afghánistán a al-Káidu, ale už v roce 2001 vznikala debata o širších cílech války proti teroru. Rozhodnutí určuje, zda bude Bushova doktrína chápána jako reakce na konkrétní útok, nebo jako obecnější projekt preventivní bezpečnosti.",
      },
      {
        label: "Rozšířit strategii i na nepřátelské režimy.",
        effects: {
          domesticSupport: 6,
          internationalLegitimacy: -8,
          securityRisk: -4,
          budget: -5,
          iraqStability: -2,
          militaryCapacity: -6,
        },
        explanation:
          "Rozšíření strategie působí rozhodně, ale rozmazává hranici mezi protiteroristickou operací a změnou režimů.",
        historicalNote:
          "Po 11. září začala administrativa silněji propojovat terorismus, zbraně hromadného ničení a nepřátelské státy. To se později stalo jádrem argumentu pro tlak na Irák.",
      },
      {
        label: "Zahájit širší revizi celé americké bezpečnostní doktríny.",
        effects: {
          domesticSupport: 1,
          internationalLegitimacy: 2,
          securityRisk: -3,
          budget: -2,
          iraqStability: 0,
          militaryCapacity: -2,
        },
        explanation:
          "Strategická revize dává času a institucím větší váhu, ale neuspokojuje okamžitou poptávku po jasné odpovědi.",
        historicalNote:
          "Revize bezpečnostního myšlení vyvrcholila v NSS 2002. Její význam spočíval v tom, že preventivní akce dostala doktrinální rámec, nikoli pouze ad hoc politické zdůvodnění.",
      },
    ],
  },
  {
    id: "nss-2002",
    year: 2002,
    title: "Nová bezpečnostní doktrína",
    context:
      "Po 11. září administrativa připravuje novou Národní bezpečnostní strategii. Tradiční odstrašování se zdá nedostatečné proti terorismu a státům usilujícím o ZHN.",
    question: "Má NSS 2002 obsahovat právo na preventivní akci?",
    choices: [
      {
        label: "Ano, jasně formulovat možnost preventivního úderu.",
        effects: {
          domesticSupport: 5,
          internationalLegitimacy: -10,
          securityRisk: -8,
          budget: 0,
          iraqStability: 0,
          militaryCapacity: -3,
        },
        explanation:
          "Silná doktrína posílila obraz rozhodnosti, ale vyvolala obavy z amerického unilateralismu.",
        historicalNote:
          "NSS 2002 skutečně zdůraznila možnost preventivní akce proti hrozbám, které nelze spolehlivě odstrašit. Tím dala politický jazyk pozdější argumentaci proti Iráku.",
      },
      {
        label: "Formulovat ji opatrně jako anticipační sebeobranu.",
        effects: {
          domesticSupport: 1,
          internationalLegitimacy: -2,
          securityRisk: -4,
          budget: 0,
          iraqStability: 0,
          militaryCapacity: -1,
        },
        explanation:
          "Opatrnější jazyk nechává prostor pro akci, ale snižuje diplomatické náklady a právní kontroverzi.",
        historicalNote:
          "Rozdíl mezi prevencí a anticipační sebeobranou je právně i politicky významný. V případě Iráku byla sporná právě bezprostřednost hrozby.",
      },
      {
        label: "Zachovat tradiční rámec odstrašování a zadržování.",
        effects: {
          domesticSupport: -5,
          internationalLegitimacy: 7,
          securityRisk: 3,
          budget: 2,
          iraqStability: 0,
          militaryCapacity: 2,
        },
        explanation:
          "Kontinuita uklidňuje spojence, ale může působit jako nedostatečná odpověď na nové typy hrozeb.",
        historicalNote:
          "Zadržování Iráku fungovalo v 90. letech prostřednictvím sankcí, bezletových zón a inspekcí. Po 11. září však část amerických elit považovala tento rámec za nedostatečný.",
      },
    ],
  },
  {
    id: "axis-of-evil",
    year: 2002,
    title: "Osa zla",
    context:
      "Prezidentův projev o stavu Unie může vymezit širší nepřátele americké bezpečnosti. Rétorika ale ovlivní i chování spojenců a režimů, které se ocitnou na seznamu.",
    question: "Má prezident veřejně označit Irák, Írán a Severní Koreu za osu zla?",
    choices: [
      {
        label: "Ano, silná rétorika obnoví rozhodnost.",
        effects: {
          domesticSupport: 7,
          internationalLegitimacy: -8,
          securityRisk: -2,
          budget: 0,
          iraqStability: -1,
          militaryCapacity: -1,
        },
        explanation:
          "Tvrdá rétorika mobilizuje domácí publikum, ale komplikuje budoucí diplomacii a vyjednávání.",
        historicalNote:
          "Výraz osa zla se stal symbolem morálně vyhroceného rámování zahraniční politiky. Vztahuje se k Bushově doktríně tím, že propojil terorismus, ZHN a nepřátelské režimy.",
      },
      {
        label: "Použít mírnější formulaci.",
        effects: {
          domesticSupport: 2,
          internationalLegitimacy: -2,
          securityRisk: -1,
          budget: 0,
          iraqStability: 0,
          militaryCapacity: 0,
        },
        explanation:
          "Mírnější slovník zachovává tlak, ale snižuje náklady pro spojeneckou diplomacii.",
        historicalNote:
          "Rétorické rámování není jen styl. Vytváří očekávání, z nichž se později obtížně ustupuje bez ztráty důvěryhodnosti.",
      },
      {
        label: "Vyhnout se veřejnému seznamu nepřátel.",
        effects: {
          domesticSupport: -3,
          internationalLegitimacy: 5,
          securityRisk: 1,
          budget: 0,
          iraqStability: 0,
          militaryCapacity: 1,
        },
        explanation:
          "Diplomaticky pružnější přístup omezuje eskalaci slov, ale může být doma interpretován jako váhavost.",
        historicalNote:
          "Neveřejné nebo méně konfrontační vymezování hrozeb by ponechalo více prostoru pro OSN a inspekce, ale neposílilo by tak výrazně prezidentskou rozhodnost.",
      },
    ],
  },
  {
    id: "un-inspections",
    year: 2002,
    title: "Inspekce OSN",
    context:
      "Otázka iráckých ZHN se vrací do Rady bezpečnosti OSN. Inspekce mohou posílit legitimitu, ale také oddálit rozhodnutí a vytvořit nejistý politický prostor.",
    question: "Má administrativa tlačit na návrat zbrojních inspektorů OSN?",
    choices: [
      {
        label: "Ano, posílit mezinárodní legitimitu.",
        effects: {
          domesticSupport: -2,
          internationalLegitimacy: 10,
          securityRisk: 2,
          budget: 1,
          iraqStability: 2,
          militaryCapacity: 2,
        },
        explanation:
          "Inspekce zvyšují důvěryhodnost postupu, ale prodlužují období, ve kterém administrativa nese politické náklady nejistoty.",
        historicalNote:
          "Rezoluce RB OSN 1441 obnovila inspekční tlak na Irák. Právě zde se střetává bezpečnostní argument s otázkou mezinárodní legitimity.",
      },
      {
        label: "Ano, ale jen jako poslední diplomatický krok před válkou.",
        effects: {
          domesticSupport: 3,
          internationalLegitimacy: 3,
          securityRisk: -2,
          budget: -1,
          iraqStability: 0,
          militaryCapacity: -2,
        },
        explanation:
          "Tento přístup kombinuje diplomatickou formu s hrozbou síly, ale spojenci mohou pochybovat, zda jsou inspekce míněny vážně.",
        historicalNote:
          "Administrativa inspekce podporovala, zároveň však signalizovala, že čas není neomezený. To posílilo tlak na Bagdád i napětí uvnitř OSN.",
      },
      {
        label: "Ne, inspekce pouze zpomalí nezbytnou akci.",
        effects: {
          domesticSupport: 4,
          internationalLegitimacy: -12,
          securityRisk: -4,
          budget: -3,
          iraqStability: -2,
          militaryCapacity: -3,
        },
        explanation:
          "Vynechání inspekcí urychluje rozhodování, ale výrazně oslabuje mezinárodní oporu budoucí intervence.",
        historicalNote:
          "Bez inspekčního rámce by bylo obtížnější tvrdit, že válka je poslední možností. Právě to bylo klíčové pro spor mezi Washingtonem, Londýnem, Paříží a dalšími aktéry.",
      },
    ],
  },
  {
    id: "congress-authorization",
    year: 2002,
    title: "Kongresové zmocnění",
    context:
      "Administrativa potřebuje domácí politický mandát pro možný zásah proti Iráku. Šíře mandátu ovlivní prezidentovu volnost i odpovědnost za další kroky.",
    question: "Jak získat domácí podporu pro možný zásah?",
    choices: [
      {
        label: "Žádat široké válečné zmocnění.",
        effects: {
          domesticSupport: 6,
          internationalLegitimacy: -3,
          securityRisk: -3,
          budget: -2,
          iraqStability: 0,
          militaryCapacity: -2,
        },
        explanation:
          "Široký mandát posiluje prezidentovu volnost, ale může urychlit skluz od tlaku k válce.",
        historicalNote:
          "Kongres v říjnu 2002 schválil Authorization for Use of Military Force Against Iraq. Domácí mandát však nenahrazoval spor o mezinárodní oprávnění.",
      },
      {
        label: "Žádat omezené zmocnění podmíněné OSN.",
        effects: {
          domesticSupport: 1,
          internationalLegitimacy: 5,
          securityRisk: 1,
          budget: 0,
          iraqStability: 1,
          militaryCapacity: 1,
        },
        explanation:
          "Podmíněný mandát zvyšuje důvěryhodnost multilaterálního postupu, ale omezuje prezidentovu rychlost a vyjednávací sílu.",
        historicalNote:
          "Podmínění mandátu OSN by více svázalo domácí a mezinárodní legitimitu. Právě jejich oddělení bylo jedním z napětí celého iráckého případu.",
      },
      {
        label: "Odložit hlasování a pokračovat ve vyjednávání.",
        effects: {
          domesticSupport: -4,
          internationalLegitimacy: 4,
          securityRisk: 3,
          budget: 1,
          iraqStability: 0,
          militaryCapacity: 2,
        },
        explanation:
          "Odklad snižuje riziko předčasné eskalace, ale doma může oslabit obraz vůdcovství.",
        historicalNote:
          "Časování hlasování v Kongresu mělo politickou váhu. Z pohledu doktríny šlo o to, zda bude preventivní strategie podepřena širokým domácím konsensem.",
      },
    ],
  },
  {
    id: "powell-un-speech",
    year: 2003,
    title: "Powellův projev v OSN",
    context:
      "Spojené státy chtějí přesvědčit svět, že Irák porušuje závazky ohledně ZHN. Důvěryhodnost zpravodajských informací se stává strategickým aktivem i rizikem.",
    question: "Má Colin Powell přednést v OSN silnou prezentaci o iráckých ZHN?",
    choices: [
      {
        label: "Ano, využít dostupné zpravodajské informace.",
        effects: {
          domesticSupport: 6,
          internationalLegitimacy: -2,
          securityRisk: -5,
          budget: -1,
          iraqStability: -1,
          militaryCapacity: -1,
        },
        explanation:
          "Silná prezentace může sjednotit domácí publikum, ale pokud se důkazy ukážou slabé, poškodí dlouhodobou důvěryhodnost.",
        historicalNote:
          "Powellův projev z února 2003 byl v daném okamžiku významný, později se však stal symbolem problematické práce se zpravodajskými informacemi o ZHN.",
      },
      {
        label: "Ano, ale zdůraznit nejistoty.",
        effects: {
          domesticSupport: 1,
          internationalLegitimacy: 3,
          securityRisk: -2,
          budget: 0,
          iraqStability: 0,
          militaryCapacity: 0,
        },
        explanation:
          "Přiznání nejistoty chrání důvěryhodnost, ale snižuje mobilizační sílu argumentu pro zásah.",
        historicalNote:
          "Didakticky jde o rozdíl mezi politickou přesvědčivostí a analytickou opatrností. Bushova doktrína potřebovala přesvědčit, že nejistota sama může být důvodem k akci.",
      },
      {
        label: "Ne, bez pevnějších důkazů by to poškodilo důvěryhodnost.",
        effects: {
          domesticSupport: -5,
          internationalLegitimacy: 7,
          securityRisk: 2,
          budget: 1,
          iraqStability: 1,
          militaryCapacity: 1,
        },
        explanation:
          "Zdržení chrání reputaci USA, ale prodlužuje nejistotu a oslabuje tlak na Saddámův režim.",
        historicalNote:
          "Pozdější vyšetřování zpravodajských odhadů ukázala závažné slabiny předválečné argumentace. Tato volba zvýrazňuje problém důkazního standardu.",
      },
    ],
  },
  {
    id: "second-un-resolution",
    year: 2003,
    title: "Druhá rezoluce OSN",
    context:
      "První rezoluce vytvořila tlak, ale výslovný mandát k invazi zůstává sporný. Administrativa musí rozhodnout, kolik legitimity je pro válku nezbytné.",
    question: "Má USA čekat na výslovný mandát Rady bezpečnosti?",
    choices: [
      {
        label: "Ano, bez druhé rezoluce neútočit.",
        effects: {
          domesticSupport: -6,
          internationalLegitimacy: 12,
          securityRisk: 4,
          budget: 2,
          iraqStability: 2,
          militaryCapacity: 3,
        },
        explanation:
          "Čekání výrazně posiluje legitimitu, ale může nechat hrozbu i politickou iniciativu v nejasném stavu.",
        historicalNote:
          "USA a Británie druhou rezoluci nezískaly. Právě absence výslovného mandátu patří k hlavním argumentům o oslabené legitimitě invaze.",
      },
      {
        label: "Pokusit se ji získat, ale nečekat donekonečna.",
        effects: {
          domesticSupport: 2,
          internationalLegitimacy: 1,
          securityRisk: -2,
          budget: -2,
          iraqStability: 0,
          militaryCapacity: -2,
        },
        explanation:
          "Kompromis ponechává diplomatický proces otevřený, ale v případě války bez mandátu stejně zůstane právní a politický spor.",
        historicalNote:
          "Tento postup se nejvíce blíží historické trajektorii. Vystihuje napětí mezi snahou jednat s OSN a rozhodnutím ponechat si možnost jednostranné akce.",
      },
      {
        label: "Jednat i bez ní.",
        effects: {
          domesticSupport: 5,
          internationalLegitimacy: -14,
          securityRisk: -5,
          budget: -4,
          iraqStability: -2,
          militaryCapacity: -4,
        },
        explanation:
          "Jednostrannější postup zvyšuje rychlost a rozhodnost, ale oslabuje legitimitu okupace ještě před jejím začátkem.",
        historicalNote:
          "Invaze bez druhé rezoluce se stala trvalým zdrojem sporů o legalitu a legitimitu. V analytickém rámci odděluje vojenskou proveditelnost od politické přijatelnosti.",
      },
    ],
  },
  {
    id: "invasion-strategy",
    year: 2003,
    title: "Zahájení invaze",
    context:
      "Diplomatické okno se uzavírá. Pentagon a Bílý dům řeší, zda spoléhat na rychlou, technologicky převládající operaci, nebo zaplatit vyšší cenu za robustnější přípravu poválečné fáze.",
    question: "Pokud diplomacie selže, jakou strategii zvolit?",
    choices: [
      {
        label: "Rychlá invaze s menšími silami.",
        effects: {
          domesticSupport: 7,
          internationalLegitimacy: -5,
          securityRisk: -8,
          budget: -8,
          iraqStability: -6,
          militaryCapacity: -9,
        },
        explanation:
          "Rychlá operace potvrzuje americkou vojenskou převahu, ale nechává slabší rezervu pro chaos po pádu režimu.",
        historicalNote:
          "Vojenské svržení režimu proběhlo velmi rychle. Pozdější problém však nebyl porážka irácké armády, nýbrž stabilizace státu po kolapsu režimu.",
      },
      {
        label: "Masivnější invaze s větším počtem jednotek.",
        effects: {
          domesticSupport: 2,
          internationalLegitimacy: -4,
          securityRisk: -9,
          budget: -12,
          iraqStability: 5,
          militaryCapacity: -12,
        },
        explanation:
          "Větší síla snižuje riziko bezpečnostního vakua, ale je dražší a politicky těžší obhajit.",
        historicalNote:
          "Debata o počtu jednotek se později stala klíčovou. Kritici tvrdili, že plánování podcenilo poválečné bezpečnostní úkoly.",
      },
      {
        label: "Odložit invazi a prodloužit inspekce.",
        effects: {
          domesticSupport: -7,
          internationalLegitimacy: 8,
          securityRisk: 4,
          budget: 1,
          iraqStability: 2,
          militaryCapacity: 3,
        },
        explanation:
          "Odklad posiluje právní a diplomatickou pozici, ale může být doma čten jako ztráta iniciativy a prodlužuje nejistotu.",
        historicalNote:
          "Další inspekce mohly změnit důkazní situaci, ale zároveň by zpochybnily politickou dynamiku vytvořenou rozmístěním sil v regionu.",
      },
    ],
  },
  {
    id: "occupation-force-size",
    year: 2003,
    title: "Velikost okupačních sil",
    context:
      "Bagdád padl, ale režimní instituce se rozpadají. Rozhodnutí o počtu okupačních sil určí schopnost chránit infrastrukturu a udržet veřejný pořádek.",
    question: "Kolik vojáků ponechat pro poválečnou stabilizaci?",
    choices: [
      {
        label: "Minimum, rychle předat moc Iráčanům.",
        effects: {
          domesticSupport: 4,
          internationalLegitimacy: 1,
          securityRisk: 8,
          budget: -3,
          iraqStability: -9,
          militaryCapacity: -2,
        },
        explanation:
          "Lehčí stopa je politicky přitažlivá, ale může vytvořit vakuum, které zaplní milice, zločin a povstalecké sítě.",
        historicalNote:
          "Americké plánování počítalo s relativně rychlou transformací, ale slabá bezpečnost po pádu režimu podkopala autoritu okupace.",
      },
      {
        label: "Střední kontingent s důrazem na ochranu infrastruktury.",
        effects: {
          domesticSupport: 0,
          internationalLegitimacy: 2,
          securityRisk: 1,
          budget: -7,
          iraqStability: 4,
          militaryCapacity: -6,
        },
        explanation:
          "Vyvážený přístup chrání klíčové body, ale nemusí stačit pro každodenní pořádek v celé zemi.",
        historicalNote:
          "Infrastruktura, ministerstva a sklady zbraní byly pro poválečný vývoj zásadní. Jejich ochrana ovlivnila schopnost obnovit stát.",
      },
      {
        label: "Masivní kontingent pro kontrolu území a veřejného pořádku.",
        effects: {
          domesticSupport: -4,
          internationalLegitimacy: -1,
          securityRisk: -5,
          budget: -13,
          iraqStability: 9,
          militaryCapacity: -12,
        },
        explanation:
          "Robustní přítomnost zvyšuje šanci na stabilizaci, ale rychle spotřebovává rozpočet a vojenskou kapacitu.",
        historicalNote:
          "Silnější okupační přítomnost mohla snížit raný chaos, ale zároveň by zvýšila náklady a viditelnost cizí okupace.",
      },
    ],
  },
  {
    id: "looting-baghdad",
    year: 2003,
    title: "Rabování po pádu Bagdádu",
    context:
      "Po pádu režimu se v Bagdádu i dalších městech šíří rabování. První dny okupace vytvářejí obraz buď kontroly, nebo bezmoci.",
    question: "Jak reagovat na rabování a kolaps veřejného pořádku?",
    choices: [
      {
        label: "Okamžitě vyhlásit tvrdý bezpečnostní režim.",
        effects: {
          domesticSupport: 1,
          internationalLegitimacy: -3,
          securityRisk: -4,
          budget: -3,
          iraqStability: 5,
          militaryCapacity: -5,
        },
        explanation:
          "Tvrdší postup obnovuje kontrolu, ale může posílit obraz okupace jako donucovacího režimu.",
        historicalNote:
          "Rabování ministerstev a institucí symbolizovalo kolaps státu. Z hlediska strategického výsledku šlo o zlom mezi vítězstvím nad armádou a správou společnosti.",
      },
      {
        label: "Soustředit se pouze na strategické objekty.",
        effects: {
          domesticSupport: 2,
          internationalLegitimacy: -1,
          securityRisk: 3,
          budget: -1,
          iraqStability: -5,
          militaryCapacity: -2,
        },
        explanation:
          "Ochrana strategických bodů šetří síly, ale nechává běžné instituce a veřejný pořádek bez ochrany.",
        historicalNote:
          "Selektivní ochrana objektů vyvolala kritiku, že okupace nepochopila význam každodenní bezpečnosti pro legitimitu nové správy.",
      },
      {
        label: "Nechat situaci částečně odeznít a vyhnout se eskalaci.",
        effects: {
          domesticSupport: -2,
          internationalLegitimacy: 1,
          securityRisk: 7,
          budget: 0,
          iraqStability: -8,
          militaryCapacity: 1,
        },
        explanation:
          "Zdrženlivost omezuje okamžité střety, ale může ztrátu pořádku proměnit v dlouhodobý problém legitimity.",
        historicalNote:
          "Raný chaos snížil důvěru Iráčanů v schopnost koalice zajistit základní pořádek. To mělo přímý dopad na okupaci i povstání.",
      },
    ],
  },
  {
    id: "debaathification",
    year: 2003,
    title: "Debaasifikace",
    context:
      "Nová správa musí rozhodnout, zda staré režimní struktury odstranit, nebo využít jejich administrativní schopnosti. Morální očista a funkčnost státu se dostávají do konfliktu.",
    question: "Jak naložit s členy strany Baas?",
    choices: [
      {
        label: "Rozsáhlá debaasifikace.",
        effects: {
          domesticSupport: 4,
          internationalLegitimacy: -3,
          securityRisk: 4,
          budget: -4,
          iraqStability: -10,
          militaryCapacity: -2,
        },
        explanation:
          "Rozsáhlá očista symbolicky ruší starý režim, ale odstraňuje lidi potřebné pro chod institucí.",
        historicalNote:
          "Rozsáhlá debaasifikace patří mezi nejdiskutovanější rozhodnutí CPA. Ukazuje, jak změna režimu může oslabit kapacity státu, který má být rekonstruován.",
      },
      {
        label: "Selektivní prověrky pouze vysokých funkcionářů.",
        effects: {
          domesticSupport: 0,
          internationalLegitimacy: 4,
          securityRisk: -1,
          budget: -1,
          iraqStability: 5,
          militaryCapacity: 0,
        },
        explanation:
          "Selektivní přístup kombinuje odpovědnost elit s potřebou zachovat správu státu.",
        historicalNote:
          "Tato možnost představuje institucionálně opatrnější transformaci. Didakticky zdůrazňuje rozdíl mezi odstraněním režimu a udržením státu.",
      },
      {
        label: "Zachovat většinu úředníků kvůli funkčnosti státu.",
        effects: {
          domesticSupport: -3,
          internationalLegitimacy: 1,
          securityRisk: 3,
          budget: 1,
          iraqStability: 7,
          militaryCapacity: 1,
        },
        explanation:
          "Zachování aparátu zlepšuje praktickou správu, ale nese riziko návratu starých sítí a zklamání obětí režimu.",
        historicalNote:
          "Zachování úředníků by mohlo pomoci fungování ministerstev, ale politicky by bylo obtížné vysvětlit, proč lidé spojení s Baasem zůstávají u moci.",
      },
    ],
  },
  {
    id: "iraqi-army",
    year: 2003,
    title: "Irácká armáda",
    context:
      "Stará irácká armáda se rozpadla, ale její důstojníci a vojáci zůstávají ozbrojenou a organizovanou sociální silou. Rozhodnutí ovlivní bezpečnost i budoucí povstání.",
    question: "Má být irácká armáda rozpuštěna?",
    choices: [
      {
        label: "Ano, je součástí starého režimu.",
        effects: {
          domesticSupport: 3,
          internationalLegitimacy: -3,
          securityRisk: 7,
          budget: -5,
          iraqStability: -11,
          militaryCapacity: -3,
        },
        explanation:
          "Rozpuštění symbolicky uzavírá éru Saddámova režimu, ale vytváří masu frustrovaných ozbrojených mužů bez role v novém pořádku.",
        historicalNote:
          "Rozpuštění armády CPA Order No. 2 je často spojováno s růstem povstání. V analytickém rámci ukazuje, že vojenské vítězství samo nevytváří bezpečnostní instituci.",
      },
      {
        label: "Zachovat nižší a střední důstojníky po prověrkách.",
        effects: {
          domesticSupport: -1,
          internationalLegitimacy: 3,
          securityRisk: -2,
          budget: -2,
          iraqStability: 6,
          militaryCapacity: 1,
        },
        explanation:
          "Prověřená kontinuita snižuje riziko povstání a šetří čas při budování nové bezpečnostní struktury.",
        historicalNote:
          "Tato volba vystihuje kompromis mezi debaasifikací a praktickou stabilizací. Souvisí s limity intervencionalismu: po změně režimu je třeba spravovat instituce.",
      },
      {
        label: "Zachovat armádu jako základ nové bezpečnostní struktury.",
        effects: {
          domesticSupport: -4,
          internationalLegitimacy: 0,
          securityRisk: 2,
          budget: 0,
          iraqStability: 8,
          militaryCapacity: 2,
        },
        explanation:
          "Institucionální kontinuita pomáhá pořádku, ale může podrýt důvěru skupin, které armádu spojovaly s represí.",
        historicalNote:
          "Zachování armády by urychlilo bezpečnostní rekonstrukci, ale naráželo by na otázku, komu nová armáda slouží a zda není jen starým režimem v novém jazyce.",
      },
    ],
  },
  {
    id: "political-transition",
    year: 2004,
    title: "Politický přechod",
    context:
      "Okupace ztrácí trpělivost veřejnosti doma i v Iráku. Předání moci může posílit legitimitu, ale příliš rychlý přechod může předat odpovědnost institucím, které ještě nejsou stabilní.",
    question: "Jak rychle předat moc iráckým politickým strukturám?",
    choices: [
      {
        label: "Rychlé předání moci kvůli legitimitě.",
        effects: {
          domesticSupport: 4,
          internationalLegitimacy: 5,
          securityRisk: 3,
          budget: 1,
          iraqStability: -4,
          militaryCapacity: 2,
        },
        explanation:
          "Rychlé předání snižuje viditelnost okupace, ale může přenést zátěž na slabé instituce.",
        historicalNote:
          "V roce 2004 byla suverenita předána irácké prozatímní vládě. Otázkou zůstalo, zda formální suverenita odpovídá reálné schopnosti vládnout.",
      },
      {
        label: "Postupné předání s dohledem CPA.",
        effects: {
          domesticSupport: -1,
          internationalLegitimacy: 1,
          securityRisk: -1,
          budget: -4,
          iraqStability: 4,
          militaryCapacity: -3,
        },
        explanation:
          "Postupný přechod umožňuje budovat instituce, ale prodlužuje politické náklady okupace.",
        historicalNote:
          "Postupnost odpovídá představě řízené rekonstrukce, ale čelí limitu legitimity: cizí správa obtížně vytváří domácí politickou autoritu.",
      },
      {
        label: "Odložit předání do stabilizace bezpečnosti.",
        effects: {
          domesticSupport: -5,
          internationalLegitimacy: -5,
          securityRisk: -3,
          budget: -7,
          iraqStability: 3,
          militaryCapacity: -5,
        },
        explanation:
          "Odklad může zlepšit bezpečnostní kontrolu, ale posiluje obraz dlouhodobé okupace.",
        historicalNote:
          "Bezpečnostní logika odkladu je srozumitelná, ale politicky nebezpečná. V Iráku se legitimita okupace rychle vyčerpávala.",
      },
    ],
  },
  {
    id: "sunni-insurgency",
    year: 2004,
    title: "Povstání v sunnitských oblastech",
    context:
      "Ve Fallúdži a dalších sunnitských oblastech sílí odpor proti okupaci a nové politické mapě. Administrativa řeší, zda odpovědět především silou, vyjednáváním, nebo rekonstrukcí.",
    question: "Jak reagovat na rostoucí povstání?",
    choices: [
      {
        label: "Tvrdá vojenská pacifikace.",
        effects: {
          domesticSupport: 3,
          internationalLegitimacy: -6,
          securityRisk: -4,
          budget: -6,
          iraqStability: -4,
          militaryCapacity: -8,
        },
        explanation:
          "Vojenský tlak může krátkodobě rozbít povstalecké buňky, ale hrozí civilní škody a další radikalizace.",
        historicalNote:
          "Operace ve Fallúdži ukázaly obtížnost boje ve městech. Vojenský úspěch v prostoru nemusel znamenat politické uklidnění.",
      },
      {
        label: "Kombinace vojenského tlaku a politického vyjednávání.",
        effects: {
          domesticSupport: -1,
          internationalLegitimacy: 3,
          securityRisk: -3,
          budget: -5,
          iraqStability: 5,
          militaryCapacity: -5,
        },
        explanation:
          "Kombinovaná strategie je pomalejší a drahá, ale řeší bezpečnostní i politické příčiny povstání.",
        historicalNote:
          "Pozdější protipovstalecké přístupy zdůrazňovaly, že bezpečnostní operace musí být spojeny s politickou inkluzí a lokálními dohodami.",
      },
      {
        label: "Soustředit se hlavně na ekonomickou obnovu.",
        effects: {
          domesticSupport: -2,
          internationalLegitimacy: 4,
          securityRisk: 4,
          budget: -7,
          iraqStability: 2,
          militaryCapacity: 1,
        },
        explanation:
          "Rekonstrukce může zmírnit nespokojenost, ale bez bezpečnosti se projekty obtížně chrání a realizují.",
        historicalNote:
          "Ekonomická obnova byla nezbytná, ale v oblastech s aktivním povstáním narážela na bezpečnostní realitu. Opět se ukazuje propojení vojenských a politických cílů.",
      },
    ],
  },
  {
    id: "zarqawi-sectarian",
    year: 2005,
    title: "Zarkáví a sektářské násilí",
    context:
      "Síť Abú Musaba az-Zarkávího útočí na koalici i irácké civilisty a snaží se vyvolat sektářskou válku. Volby a ústava dávají naději, ale také prohlubují napětí mezi komunitami.",
    question: "Jak zabránit sektářské eskalaci?",
    choices: [
      {
        label: "Prioritizovat protiteroristické operace.",
        effects: {
          domesticSupport: 3,
          internationalLegitimacy: -2,
          securityRisk: -5,
          budget: -4,
          iraqStability: -2,
          militaryCapacity: -6,
        },
        explanation:
          "Přímý tlak na teroristické sítě snižuje operační hrozbu, ale nemusí řešit politické zdroje sektářské mobilizace.",
        historicalNote:
          "Zarkávího strategie mířila k sektářské polarizaci. Čistě protiteroristická logika mohla zasahovat buňky, ale nestačila sama obnovit politickou důvěru.",
      },
      {
        label: "Podpořit inkluzivní politickou dohodu sunnitů a šíitů.",
        effects: {
          domesticSupport: -2,
          internationalLegitimacy: 5,
          securityRisk: 0,
          budget: -3,
          iraqStability: 7,
          militaryCapacity: -2,
        },
        explanation:
          "Politická inkluze je pomalá a nejistá, ale může omezit prostor pro sektářskou mobilizaci.",
        historicalNote:
          "Volby a ústavní proces byly klíčové, ale otázka sunnitské inkluze zůstala citlivá. Zde se strategický úspěch měří spíše politickou dohodou než počtem zásahů.",
      },
      {
        label: "Posílit irácké bezpečnostní složky bez ohledu na sektářskou rovnováhu.",
        effects: {
          domesticSupport: 2,
          internationalLegitimacy: -3,
          securityRisk: -2,
          budget: -2,
          iraqStability: -6,
          militaryCapacity: 3,
        },
        explanation:
          "Rychlé budování místních sil snižuje zátěž USA, ale může institucionalizovat sektářskou nerovnováhu.",
        historicalNote:
          "Budování iráckých bezpečnostních složek bylo nutné, ale jejich loajalita a složení byly zásadní. Bez rovnováhy se stát může stát nástrojem jedné komunity.",
      },
    ],
  },
  {
    id: "2006-strategy",
    year: 2006,
    title: "Strategie do roku 2006",
    context:
      "Násilí se zhoršuje a americká veřejnost je vyčerpaná. Administrativa musí rozhodnout, zda přiznat nutnost změny strategie, snižovat závazek, nebo urychlit předání odpovědnosti.",
    question: "Jak reagovat na zhoršující se stabilitu?",
    choices: [
      {
        label: "Navýšit síly a změnit strategii protipovstaleckého boje.",
        effects: {
          domesticSupport: -5,
          internationalLegitimacy: -1,
          securityRisk: -6,
          budget: -10,
          iraqStability: 7,
          militaryCapacity: -10,
        },
        explanation:
          "Navýšení sil může stabilizovat klíčové oblasti, ale přiznává, že původní strategie nestačila a dále zatěžuje armádu i rozpočet.",
        historicalNote:
          "Debata, která vyústila ve změnu strategie a surge v roce 2007, odhalila rozdíl mezi vítězstvím v invazi a dlouhodobou stabilizací.",
      },
      {
        label: "Zahájit postupné stažení.",
        effects: {
          domesticSupport: 6,
          internationalLegitimacy: 2,
          securityRisk: 5,
          budget: 5,
          iraqStability: -7,
          militaryCapacity: 6,
        },
        explanation:
          "Stažení snižuje americké náklady, ale může urychlit bezpečnostní vakuum, pokud irácké instituce nejsou připravené.",
        historicalNote:
          "Tlak na stažení rostl s náklady války. Strategická otázka zněla, zda snížení amerického závazku nepromění předchozí náklady v politickou ztrátu.",
      },
      {
        label: "Předat odpovědnost irácké vládě co nejrychleji.",
        effects: {
          domesticSupport: 3,
          internationalLegitimacy: 1,
          securityRisk: 7,
          budget: 3,
          iraqStability: -8,
          militaryCapacity: 4,
        },
        explanation:
          "Rychlé předání odpovědnosti snižuje viditelnost americké okupace, ale může být spíše přesunem problému než jeho řešením.",
        historicalNote:
          "Irácká vláda potřebovala legitimitu i kapacitu. Předání odpovědnosti bez skutečné schopnosti vládnout ukazuje limit vnější státní rekonstrukce.",
      },
    ],
  },
];

const scenarioBriefings = {
  "post-9-11-response": {
    news: [
      "New York a Washington stále pracují v režimu mimořádné bezpečnosti; veřejnost očekává rychlou odpověď.",
      "Spojenci v NATO poprvé aktivují článek 5, ale zatím podporují hlavně zásah proti al-Káidě.",
    ],
    advisors: [
      {
        id: "state",
        name: "Colin Powell",
        role: "ministr zahraničí",
        message:
          "Mezinárodní soucit je teď mimořádně silný. Pokud ho roztáhneme na příliš mnoho cílů, můžeme z podpory spojenců udělat otázku nedůvěry.",
      },
      {
        id: "defense",
        name: "Donald Rumsfeld",
        role: "ministr obrany",
        message:
          "Afghánistán je první krok, ne nutně celý problém. Pokud státy poznají, že podpora teroru bude mít cenu, změní to jejich kalkulaci.",
      },
      {
        id: "cia",
        name: "CIA briefing",
        role: "zpravodajská komunita",
        message:
          "Vazby mezi režimy a teroristickými sítěmi nejsou všude stejně pevné. Rozšíření války zvýší tlak, ale i riziko chybných závěrů.",
      },
    ],
  },
  "nss-2002": {
    news: [
      "Think-tanky ve Washingtonu mluví o konci éry klasického odstrašování.",
      "Evropské vlády podporují boj proti terorismu, ale varují před doktrínou preventivní války.",
    ],
    advisors: [
      {
        id: "security",
        name: "Condoleezza Rice",
        role: "poradkyně pro národní bezpečnost",
        message:
          "Doktrína musí vysvětlit, proč po 11. září nestačí čekat. Slova ale nastaví precedent, který budou spojenci i protivníci číst velmi pozorně.",
      },
      {
        id: "legal",
        name: "Právní tým Bílého domu",
        role: "právní poradci",
        message:
          "Čím širší formulace, tím větší volnost pro prezidenta. Zároveň tím slabší bude obrana, že jde o výjimečný, nikoli obecný nárok.",
      },
      {
        id: "state",
        name: "Colin Powell",
        role: "ministr zahraničí",
        message:
          "Lze si ponechat prostor pro akci a zároveň nevypadat, že Spojené státy přepisují pravidla pro všechny ostatní.",
      },
    ],
  },
  "axis-of-evil": {
    news: [
      "Příprava projevu o stavu Unie vrcholí; domácí publikum očekává jasné vymezení nepřítele.",
      "Diplomaté upozorňují, že Írán a Severní Korea mohou po veřejném označení ztvrdnout vyjednávací pozice.",
    ],
    advisors: [
      {
        id: "speech",
        name: "Prezidentský speechwriter",
        role: "politická komunikace",
        message:
          "Silná věta vytvoří historický okamžik. Ale jakmile ji prezident řekne, bude těžké tvářit se, že šlo jen o rétoriku.",
      },
      {
        id: "state",
        name: "Ministerstvo zahraničí",
        role: "diplomatický kabel",
        message:
          "Seznam nepřátel zjednoduší sdělení doma, ale spojí tři velmi odlišné případy do jedné morální kategorie.",
      },
      {
        id: "political",
        name: "Karl Rove",
        role: "politický poradce",
        message:
          "Po útocích chce veřejnost jistotu, že prezident chápe rozsah hrozby. Mírný jazyk může znít jako návrat k 90. létům.",
      },
    ],
  },
  "un-inspections": {
    news: [
      "Rada bezpečnosti OSN jedná o návratu inspektorů do Iráku.",
      "Bagdád popírá aktivní program ZHN, ale minulá nedůvěra zůstává hluboká.",
    ],
    advisors: [
      {
        id: "un",
        name: "Tým při OSN",
        role: "diplomatická mise",
        message:
          "Inspekce nejsou slabost. Mohou vytvořit důkazní záznam, bez kterého bude případ proti Iráku stát hlavně na americké autoritě.",
      },
      {
        id: "defense",
        name: "Pentagon",
        role: "operační plánování",
        message:
          "Inspekce mohou také dát Saddámovi čas přesouvat materiál, připravovat klamné manévry a testovat naši trpělivost.",
      },
      {
        id: "intel",
        name: "Zpravodajský analytik",
        role: "ZHN odhad",
        message:
          "Nejistota není prázdnota. Ale pokud z nejistoty uděláme jistotu, pozdější chyba poškodí důvěru ve celý zásah.",
      },
    ],
  },
  "congress-authorization": {
    news: [
      "Kongres dostává neveřejné briefings o iráckých programech ZHN.",
      "Blíží se midterm volby; opozice nechce působit slabě v otázkách bezpečnosti.",
    ],
    advisors: [
      {
        id: "congress",
        name: "Lídr sněmovní většiny",
        role: "Kongres",
        message:
          "Široké zmocnění projde snáz, dokud je veřejnost sjednocená. Úzký mandát ale lépe přežije pozdější kontrolu.",
      },
      {
        id: "state",
        name: "Colin Powell",
        role: "ministr zahraničí",
        message:
          "Domácí mandát je důležitý, ale spojenci budou sledovat, zda Kongres otevírá cestu diplomacii, nebo už počítá s válkou.",
      },
      {
        id: "budget",
        name: "OMB",
        role: "rozpočtový úřad",
        message:
          "Válečné zmocnění je politické rozhodnutí. Účet za dlouhou stabilizaci v něm ale zatím nikdo poctivě nevidí.",
      },
    ],
  },
  "powell-un-speech": {
    news: [
      "Kamery z celého světa míří do Rady bezpečnosti OSN.",
      "Francie, Německo a Rusko signalizují skepsi k rychlé válce.",
    ],
    advisors: [
      {
        id: "powell",
        name: "Colin Powell",
        role: "ministr zahraničí",
        message:
          "Pokud půjdu před Radu bezpečnosti, musí být materiál neprůstřelný. Moje důvěryhodnost může pomoci, ale také se může stát zástavou.",
      },
      {
        id: "cia",
        name: "George Tenet",
        role: "ředitel CIA",
        message:
          "Máme zdroje, fotografie a odposlechy, ale část řetězce stojí na interpretaci. Prezident musí vědět, kde končí důkaz a začíná úsudek.",
      },
      {
        id: "press",
        name: "Tiskový tým",
        role: "veřejná komunikace",
        message:
          "Silná prezentace může změnit atmosféru doma. Pokud ale po válce nenajdeme ZHN, tento okamžik se bude vracet v každém titulku.",
      },
    ],
  },
  "second-un-resolution": {
    news: [
      "Britská vláda tlačí na další rezoluci, doma čelí masovým protestům.",
      "V Radě bezpečnosti roste odpor k automatickému mandátu k použití síly.",
    ],
    advisors: [
      {
        id: "uk",
        name: "Tony Blair",
        role: "spojenec",
        message:
          "Bez další rezoluce bude pro Londýn velmi těžké udržet domácí podporu. Potřebujeme alespoň viditelný pokus o mandát.",
      },
      {
        id: "vice",
        name: "Dick Cheney",
        role: "viceprezident",
        message:
          "Francouzské veto nemůže určovat bezpečnost Spojených států. Pokud je hrozba reálná, odpovědnost zůstává na nás.",
      },
      {
        id: "state",
        name: "Diplomatický tým",
        role: "Rada bezpečnosti",
        message:
          "I neúspěšné hlasování může ukázat, že jsme vyčerpali diplomacii. Ale pokud půjdeme bez něj, spor o legitimitu začne první den války.",
      },
    ],
  },
  "invasion-strategy": {
    news: [
      "Jednotky v Kuvajtu čekají na rozkaz; logistické okno nebude otevřené věčně.",
      "Bagdád pokračuje v odmítání amerického ultimáta.",
    ],
    advisors: [
      {
        id: "centcom",
        name: "CENTCOM",
        role: "operační velení",
        message:
          "Rychlý průlom je realistický. Otázka není, zda porazíme režimní jednotky, ale kdo bude stát na křižovatkách den poté.",
      },
      {
        id: "defense",
        name: "Donald Rumsfeld",
        role: "ministr obrany",
        message:
          "Menší, rychlejší síla ukáže novou americkou vojenskou doktrínu. Příliš těžká invaze může připomínat okupaci ještě před pádem režimu.",
      },
      {
        id: "army",
        name: "Armádní plánovači",
        role: "poválečná fáze",
        message:
          "Bezpečnostní vakuum se nebude ptát na naši teorii transformace. Větší síly jsou drahé, ale chaos bývá dražší.",
      },
    ],
  },
  "occupation-force-size": {
    news: [
      "Bagdád padl rychleji, než část plánovačů čekala.",
      "Z ulic přicházejí první zprávy o rabování, ozbrojených skupinách a opuštěných skladech.",
    ],
    advisors: [
      {
        id: "bremer",
        name: "Okupační správa",
        role: "civilní autorita",
        message:
          "Legitimitu nezískáme jen tím, že odejdeme z obrazu. Iráčané budou měřit nový řád podle elektřiny, bezpečí a fungujících úřadů.",
      },
      {
        id: "joint",
        name: "Sbor náčelníků",
        role: "vojenská kapacita",
        message:
          "Každý další prapor stabilizuje prostor, ale zároveň natahuje rotace a zvyšuje tlak na armádu.",
      },
      {
        id: "iraqi",
        name: "Irácký místní kontakt",
        role: "Bagdád",
        message:
          "Lidé nečekají dokonalou demokracii do týdne. Čekají, že někdo zastaví muže se zbraněmi před nemocnicí a školou.",
      },
    ],
  },
  "looting-baghdad": {
    news: [
      "Televize ukazují rabování ministerstev, muzeí a veřejných budov.",
      "Koaliční velení hlásí, že priority ochrany se liší město od města.",
    ],
    advisors: [
      {
        id: "mp",
        name: "Vojenská policie",
        role: "veřejný pořádek",
        message:
          "Když první dny nastaví dojem beztrestnosti, budeme ho opravovat měsíce. Pořádek je politická zpráva.",
      },
      {
        id: "civilian",
        name: "Civilní správce",
        role: "rekonstrukce",
        message:
          "Ochrana ropných a vojenských objektů nestačí. Bez ministerstev, archivů a policie nebude co rekonstruovat.",
      },
      {
        id: "field",
        name: "Velitel v terénu",
        role: "taktická situace",
        message:
          "Tvrdý režim vyžaduje pravidla nasazení a lidi. Pokud dáme rozkaz bez kapacity, jen veřejně ukážeme slabost.",
      },
    ],
  },
  "debaathification": {
    news: [
      "Nová okupační správa připravuje první zásadní dekrety.",
      "Šíitské a kurdské skupiny žádají odstranění lidí spojených se Saddámovým režimem.",
    ],
    advisors: [
      {
        id: "justice",
        name: "Irácký opoziční politik",
        role: "exilová opozice",
        message:
          "Oběti režimu nepochopí, pokud stejní funkcionáři zůstanou u stolů. Nový Irák potřebuje jasný morální zlom.",
      },
      {
        id: "admin",
        name: "Správní expert",
        role: "instituce",
        message:
          "Stát není jen režim. Pokud vyhodíme příliš mnoho úředníků najednou, odstraníme i paměť systému.",
      },
      {
        id: "security",
        name: "Bezpečnostní analytik",
        role: "riziko povstání",
        message:
          "Ponížení a nezaměstnaní lidé s kontakty ve starém aparátu se mohou stát organizačním jádrem odporu.",
      },
    ],
  },
  "iraqi-army": {
    news: [
      "Bývalí iráčtí vojáci čekají na platy a nejasné pokyny nové správy.",
      "Zbraně ze skladů mizí rychleji, než je koalice stíhá zabezpečit.",
    ],
    advisors: [
      {
        id: "defense",
        name: "Pentagon",
        role: "bezpečnostní reforma",
        message:
          "Starou armádu nelze jednoduše považovat za neutrální instituci. Byla nástrojem režimu, ale také jedinou existující bezpečnostní strukturou.",
      },
      {
        id: "tribal",
        name: "Sunnitský prostředník",
        role: "lokální kontakt",
        message:
          "Pokud mužům vezmete uniformu, plat a čest najednou, někdo jiný jim nabídne účel. Možná ne takový, jaký chcete.",
      },
      {
        id: "training",
        name: "Výcvikový tým",
        role: "nové síly",
        message:
          "Budovat armádu od nuly zní čistě, ale trvá roky. Během těch let bude někdo muset hlídat hranice a města.",
      },
    ],
  },
  "political-transition": {
    news: [
      "Irácká prozatímní vláda získává prostor, ale bezpečnostní autorita zůstává nejasná.",
      "Americká veřejnost začíná vnímat okupaci jako delší závazek, než se očekávalo.",
    ],
    advisors: [
      {
        id: "legitimacy",
        name: "Politický poradce CPA",
        role: "přechod moci",
        message:
          "Každý měsíc přímé okupace snižuje legitimitu. Ale předání moci bez kapacity může vytvořit jen novou fasádu.",
      },
      {
        id: "iraqi",
        name: "Irácký člen rady",
        role: "prozatímní politika",
        message:
          "Lidé potřebují vidět iráckou tvář rozhodování. Pokud ale budeme vypadat jako prodloužená ruka Washingtonu, nezískáme důvěru.",
      },
      {
        id: "military",
        name: "Koaliční velení",
        role: "bezpečnost",
        message:
          "Politický kalendář a bezpečnostní realita nejdou stejným tempem. Volby ani předání moci samy nezastaví útoky.",
      },
    ],
  },
  "sunni-insurgency": {
    news: [
      "Fallúdža se stává symbolem ozbrojeného odporu proti okupaci.",
      "Počet útoků na koaliční síly a irácké spolupracovníky roste.",
    ],
    advisors: [
      {
        id: "marine",
        name: "Velitel námořní pěchoty",
        role: "Fallúdža",
        message:
          "Pokud ztratíme kontrolu nad městem, signál půjde do celé země. Ale pouliční boj může vytvořit nové mučedníky.",
      },
      {
        id: "tribal",
        name: "Kmenový vyjednavač",
        role: "sunnitské oblasti",
        message:
          "Ne každý ozbrojený muž je ideologický džihádista. Někteří chtějí garance, práci a podíl na novém pořádku.",
      },
      {
        id: "aid",
        name: "Rekonstrukční tým",
        role: "ekonomická obnova",
        message:
          "Peníze na projekty bez bezpečnosti mizí nebo stojí. Bez projektů ale zůstává povstání jediným zaměstnavatelem.",
      },
    ],
  },
  "zarqawi-sectarian": {
    news: [
      "Sebevražedné útoky míří na šíitské civilisty i irácké bezpečnostní složky.",
      "Ústavní proces postupuje, ale sunnitská účast zůstává křehká.",
    ],
    advisors: [
      {
        id: "ct",
        name: "Protiteroristické centrum",
        role: "Zarkávího síť",
        message:
          "Zarkáví chce vyvolat sektářskou reakci. Každá operace musí zasáhnout síť a zároveň nekrmit jeho příběh o válce komunit.",
      },
      {
        id: "politics",
        name: "Irácký ústavní poradce",
        role: "politická dohoda",
        message:
          "Ústava bez pocitu účasti může být dokumentem vítězů. A dokument vítězů neumí sám uklidnit poražené.",
      },
      {
        id: "police",
        name: "Policejní mentor",
        role: "bezpečnostní složky",
        message:
          "Rychlý nábor zlepší čísla. Pokud ale síly vypadají sektářsky, lidé se jich budou bát stejně jako milic.",
      },
    ],
  },
  "2006-strategy": {
    news: [
      "Bagdád hlásí rostoucí sektářské vraždy a přesuny obyvatel.",
      "Ve Washingtonu sílí otázka, zda původní strategie ještě existuje, nebo jen setrvačnost.",
    ],
    advisors: [
      {
        id: "general",
        name: "Vojenský velitel",
        role: "protipovstalecká změna",
        message:
          "Navýšení samo nestačí. Musí změnit pravidla: chránit obyvatelstvo, držet čtvrti a propojit vojenskou sílu s místní politikou.",
      },
      {
        id: "political",
        name: "Domácí politický tým",
        role: "veřejná podpora",
        message:
          "Veřejnost už nechce další slib, že zlom je blízko. Každé navýšení musí mít jasný smysl a měřitelné hranice.",
      },
      {
        id: "iraqi",
        name: "Irácká vláda",
        role: "převzetí odpovědnosti",
        message:
          "Příliš rychlé stažení nás může nechat před soupeři, kteří čekají právě na tento okamžik. Ale nekonečná americká přítomnost podkopává naši suverenitu.",
      },
    ],
  },
};

export const scenarios = baseScenarios.map((scenario) => ({
  ...scenario,
  briefing: scenarioBriefings[scenario.id],
}));

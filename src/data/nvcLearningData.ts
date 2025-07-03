import { Ionicons } from '@expo/vector-icons';

export interface BilingualText {
  en: string;
  lt: string;
}

export interface Exercise {
  id: string;
  title: BilingualText;
  description: BilingualText;
  type: 'observation' | 'feeling' | 'need' | 'request';
  prompt: BilingualText;
  examples?: { en: string[]; lt: string[] };
  tips?: { en: string[]; lt: string[] };
}

export interface LearningSection {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: keyof typeof Ionicons.glyphMap;
  content: BilingualText;
  videoUrl?: string;
  exercises?: Exercise[];
}

// Common content templates
const commonTips = {
  observation: {
    en: [
      "Focus on what you can see, hear, or touch",
      "Use specific times, dates, and amounts", 
      "Avoid words like \"always\", \"never\", \"too much\", \"seldom\"",
      "Ask yourself: \"Could a video camera capture this?\""
    ],
    lt: [
      "Sutelkite dėmesį į tai, ką galite matyti, girdėti ar paliesti",
      "Naudokite konkrečius laikus, datas ir kiekius",
      "Venkite žodžių kaip „visada“, „niekada“, „per daug“, „retai“",
      "Paklauskite savęs: „Ar vaizdo kamera galėtų tai užfiksuoti?“"
    ]
  },
  feeling: {
    en: [
      "Feelings are one-word emotions: sad, happy, frustrated, excited",
      "Avoid \"I feel that...\" or \"I feel like...\" - these are thoughts",
      "If you can replace \"feel\" with \"think\", it's probably a thought",
      "True feelings don't blame others for how you feel"
    ],
    lt: [
      "Jausmai – tai vieno žodžio emocijos: liūdnas, laimingas, nusivylęs, susijaudinęs",
      "Venkite sakinių „Jaučiuosi, kad...“ arba „Jaučiuosi, lyg...“ – tai mintys",
      "Jei „jaučiuosi“ galite pakeisti į „manau“, tikėtina, kad tai mintis",
      "Tikri jausmai nekaltina kitų dėl to, kaip jaučiatės"
    ]
  },
  need: {
    en: [
      "Every judgment points to a value/need that matters to you",
      "Ask \"What do I care about that's not happening here?\"",
      "Look for universal human needs, not strategies",
      "Practice self-compassion - judgments are natural human reactions"
    ],
    lt: [
      "Kiekvienas vertinimas atskleidžia vertybę ar poreikį, kuris jums svarbus",
      "Paklauskite: „Kas man rūpi, ko čia trūksta?“",
      "Ieškokite universalių žmogaus poreikių, o ne strategijų",
      "Praktikuokite savipagalbą – vertinimai yra natūralios žmogaus reakcijos"
    ]
  },
  request: {
    en: [
      "Start with \"Would you be willing to...\" to soften the request",
      "Be specific about time, place, and actions",
      "Focus on observable behaviors rather than attitudes", 
      "Check if your request brings mutual benefit"
    ],
    lt: [
      "Pradėkite fraze „Ar būtum pasirengęs...“, kad sušvelnintumėte prašymą",
      "Būkite konkretūs dėl laiko, vietos ir veiksmų",
      "Sutelkkite dėmesį į stebimus elgesio veiksmus, o ne požiūrį",
      "Įsitikinkite, kad jūsų prašymas teikia abipusę naudą"
    ]
    
  }
};

// Helper function to create bilingual examples
const createExamples = (examples: Array<{jackal?: string, giraffe?: string, observation?: string, evaluation?: string, feeling?: string, thought?: string, judgment?: string, need?: string, demand?: string, request?: string}>) => {
  const en: string[] = [];
  const lt: string[] = [];
  
  examples.forEach(ex => {
    if (ex.jackal && ex.giraffe) {
      en.push(`Jackal: "${ex.jackal}" → Giraffe: "${ex.giraffe}"`);
      lt.push(`Šakalas: "${ex.jackal}" → Žirafa: "${ex.giraffe}"`);
    } else if (ex.observation && ex.evaluation) {
      en.push(`Observation: "${ex.observation}" vs Evaluation: "${ex.evaluation}"`);
      lt.push(`Stebėjimas: "${ex.observation}" vs Vertinimas: "${ex.evaluation}"`);
    } else if (ex.feeling && ex.thought) {
      en.push(`Feeling: "${ex.feeling}" vs Thought: "${ex.thought}"`);
      lt.push(`Jausmas: "${ex.feeling}" vs Mintis: "${ex.thought}"`);
    } else if (ex.judgment && ex.need) {
      en.push(`Judgment: "${ex.judgment}" → Need: "${ex.need}"`);
      lt.push(`Sprendimas: "${ex.judgment}" → Poreikis: "${ex.need}"`);
    } else if (ex.demand && ex.request) {
      en.push(`Demand: "${ex.demand}" → Request: "${ex.request}"`);
      lt.push(`Reikalavimas: "${ex.demand}" → Prašymas: "${ex.request}"`);
    }
  });
  
  return { en, lt };
};

export const nvcLearningSections: LearningSection[] = [
  {
    id: 'introduction',
    title: { 
      en: 'Introduction to NVC', 
      lt: 'NVC įvadas' 
    },
    description: { 
      en: 'Learn the fundamentals of Nonviolent Communication', 
      lt: 'Išmokite NVC pagrindus' 
    },
    icon: 'school',
    content: {
      en: `Nonviolent Communication aims to help people connect in a way that makes "natural giving" possible. It contrasts with the "who's right" game that creates winners and losers. The goal is never to teach or change others, but to create connections where everyone's needs can be met willingly.

Key Problems with Traditional "Jackal" Communication:
• Uses moralistic judgments (right/wrong, good/bad)
• Relies on punishment and reward
• Denies personal choice/responsibility
• Uses guilt and shame
• Makes violence enjoyable/acceptable
• Attributes feelings to others' actions ("you make me feel...")

Key Principles:
• Everyone always has choice in their actions
• Behind every feeling is an unmet need
• Anger, depression, guilt, and shame indicate disconnection from needs
• People naturally enjoy giving when there are no demands or criticism
• We never truly know what we want until after we get it`,
lt: `Nesmurtinis bendravimas siekia padėti žmonėms susisiekti taip, kad būtų įmanomas „natūralus dalinimasis. Tai skiriasi nuo „kas teisus“ žaidimo, kuris sukuria laimėtojus ir pralaimėtojus. Tikslas nėra mokyti ar keisti kitus, o kurti ryšius, kuriuose kiekvieno poreikiai galėtų būti patenkinti savanoriškai.

Pagrindinės tradicinio „šakalo“ bendravimo problemos:
• Naudoja moralinius vertinimus (teisinga/neteisinga, gera/bloga)
• Remiasi bausmėmis ir atlygiais
• Neigia asmeninį pasirinkimą ir atsakomybę
• Naudoja kaltę ir gėdą
• Padaro smurtą maloniu ar priimtinu
• Priskiria savo jausmus kitų veiksmams („tu verči mane jaustis...“)

Pagrindiniai principai:
• Kiekvienas visada turi laisvę rinktis savo veiksmus
• Už kiekvieno jausmo slypi nepatenkintas poreikis
• Pyktis, depresija, kaltė ir gėda rodo atsiribojimą nuo savo poreikių
• Žmonės natūraliai džiaugiasi dalindamiesi, kai nėra reikalavimų ar kritikos
• Mes niekada iki galo nežinome, ko norime, kol to negauname`
    },
    videoUrl: 'https://youtu.be/-dpk5Z7GIFs?si=GlImYzwOsQ7mAXj0',
  },
  {
    id: 'giraffe-vs-jackal',
    title: { 
      en: 'Giraffe vs Jackal Language', 
      lt: 'Žirafos vs Šakalo kalba' 
    },
    description: { 
      en: 'Understand the fundamental difference between life-serving and disconnecting communication', 
      lt: 'Supraskite esminį skirtumą tarp gyvenimą tarnaujančio ir atskiriantį kuriančio bendravimo' 
    },
    icon: 'heart-circle',
    content: {
      en: `🦒 Giraffe Language: Focuses on feelings, needs, and empathy - life-serving communication
🐺 Jackal Language: Uses judgment, criticism, analysis, labels - disconnects from needs and feelings

Every criticism/judgment is an expression of an unmet need

🎯 The Four Components:
• Observations: State facts without judgment or evaluation
• Feelings: Express genuine emotions, not thoughts or interpretations  
• Needs: Identify universal human needs at root of feelings
• Requests: Make clear, specific, positive action requests

🧠 Key Mindset Shifts:
• Move from blame to needs
• Shift from judgment to observation
• Focus on present feelings vs analyzing past
• See others' behavior as attempts to meet needs
• Release responsibility for others' feelings`,
      lt: `🦒 Žirafos kalba: Sutelkia dėmesį į jausmus, poreikius ir empatiją - gyvenimą tarnaujantis bendravimas
🐺 Šakalo kalba: Naudoja sprendimus, kritiką, analizę, etiketes - atskiria nuo poreikių ir jausmų

Kiekviena kritika/vertinimas yra nepatenkinto poreikio išraiška

🎯 Keturi komponentai:
• Stebėjimai: Išdėstykite faktus be teisimo ar vertinimų
• Jausmai: Išreikškite tikras emocijas, o ne mintis ar interpretacijas
• Poreikiai: Atpažinkite universalius žmogaus poreikius, slypinčius už jausmų  
• Prašymai: Išsakykite aiškius, konkrečius ir teigiamus veiksmų prašymus

🧠 Pagrindiniai mąstymo pokyčiai:  
• Perėjimas nuo kaltinimo prie poreikių supratimo  
• Poslinkis nuo vertinimo prie stebėjimo  
• Dėmesys dabartiniams jausmams, o ne praeities analizei  
• Kitų elgesio matymas kaip bandymų patenkinti savo poreikius  
• Atsakomybės už kitų jausmus paleidimas`
    },
    exercises: [
      {
        id: 'language-awareness-1',
        title: { 
          en: 'Identify Jackal vs Giraffe Language', 
          lt: 'Identifikuoti Šakalo vs Žirafos kalbą' 
        },
        description: { 
          en: 'Practice recognizing life-serving vs disconnecting language patterns', 
          lt: "Praktikuokite atpažinti gyvenimui tarnaujančius vietoj atskirimą kuriančius kalbos modelius"        },
        type: 'observation',
        prompt: {
          en: 'Think of something someone said to you recently that felt judgmental or critical (Jackal language). Now translate it into Giraffe language by identifying the possible feelings and needs behind their words.',
          lt: "Prisiminite ką nors, ką neseniai jums pasakė ir kas nuskambėjo vertinančiai ar kritiškai (Šakalo kalba). Dabar išverskite tai į Žirafos kalbą – atpažinkite galimus jausmus ir poreikius, slypinčius už tų žodžių."        },
        examples: createExamples([
          {jackal: "You're so selfish!", giraffe: "I feel hurt because I need consideration and mutual care in our relationship"},
          {jackal: "That's a stupid idea!", giraffe: "I feel concerned because I need effectiveness and clarity in our planning"},
          {jackal: "You always make excuses!", giraffe: "I feel frustrated because I need honesty and accountability in our communication"}
        ]),
        tips: {
          en: [
            "Look for the human need behind every judgment",
            "Replace \"you are...\" with \"I feel... because I need...\"",
            "Focus on what the person values, not what they're against",
            "Remember: criticism is a tragic expression of unmet needs"
          ],
          lt: [
            "Ieškokite žmogiškojo poreikio už kiekvieno vertinimo",
            "Pakeiskite \"tu esi...\" į \"jaučiuosi... nes man svarbu...\"",
            "Sutelkite dėmesį į tai, kas žmogui svarbu, o ne į tai, kam jis priešinasi",
            "Prisiminkite: kritika – tai tragiška neišpildytų poreikių išraiška"
          ]
        }
      }
    ],
  },
  {
    id: 'four-components',
    title: { 
      en: 'Four Components of NVC', 
      lt: 'Keturi NVC komponentai' 
    },
    description: { 
      en: 'Master the four key elements of NVC communication', 
      lt: 'Išmokite keturis pagrindinius NVC bendravimo elementus' 
    },
    icon: 'list',
    content: {
      en: `The Four Components of Nonviolent Communication:

1. OBSERVATIONS
• Separate observations from evaluations/judgments
• Focus on specific behaviors rather than generalizations
• Use concrete examples and direct quotes

2. FEELINGS
• Express genuine feelings rather than thoughts or interpretations
• Avoid words that imply others are responsible (rejected, ignored, manipulated)
• Stay connected to feelings rather than going "up to the head"

3. NEEDS
• Connect feelings to universal human needs
• Distinguish between needs (universal) and strategies/preferences (specific)
• Keep needs separate from specific people/actions
• All humans share the same basic needs

4. REQUESTS
• Make clear, specific requests rather than vague demands
• Live in the present moment
• Be clear about what you want, not expecting others to guess`,
lt: `Keturi nesmurtinio bendravimo komponentai:

1. STEBĖJIMAI
• Skirkite stebėjimus nuo vertinimų ar teisimo
• Susitelkite į konkrečius elgesio veiksmus, o ne bendrinimus
• Naudokite aiškius pavyzdžius ir tikslias citatas

2. JAUSMAI
• Išreikškite tikrus jausmus, o ne mintis ar interpretacijas
• Venkite žodžių, kurie rodo, kad kiti yra atsakingi (atstumtas, ignoruojamas, manipuliuojamas)
• Išlikite ryšyje su savo jausmais, o ne pasinerkite į analizavimą.

3. POREIKIAI
• Susiekite jausmus su universaliais žmogaus poreikiais
• Skirkite poreikius (universalius) nuo strategijų ar pageidavimų (konkrečių)
• Poreikius atskirkite nuo konkrečių žmonių ar veiksmų
• Visi žmonės turi tuos pačius pagrindinius poreikius

4. PRAŠYMAI
• Išsakykite aiškius ir konkrečius prašymus, o ne neaiškius reikalavimus
• Būkite dabarties akimirkoje
• Aiškiai pasakykite, ko norite, nesitikėkite, kad kiti atspės`
    },
    exercises: [
      {
        id: 'observation-1',
        title: { 
          en: 'Practice Observation', 
          lt: 'Stebėjimo Praktika' 
        },
        description: { 
          en: 'Separate observations from evaluations', 
          lt: 'Atskirti stebėjimus nuo vertinimų' 
        },
        type: 'observation',
        prompt: {
          en: 'Write one thing that a person does (observation), that you don\'t like. Without evaluation or judging. Can you see behavior separate from judgement?',
          lt: 'Parašykite vieną dalyką, kurį daro žmogus (stebėjimas), kuris jums nepatinka. Be vertinimo ar teisimo. Ar galite matyti elgesį atsietą nuo vertinimo?'
        },
        examples: createExamples([
          {observation: "John spoke for 10 minutes without pausing", evaluation: "John is inconsiderate"},
          {observation: "Sarah arrived 15 minutes after the meeting started", evaluation: "Sarah is always late"},
          {observation: "The dishes have been in the sink for 3 days", evaluation: "You are messy"}
        ]),
        tips: commonTips.observation
      },
      {
        id: 'feeling-1',
        title: { 
          en: 'Identify Feelings', 
          lt: 'Identifikuoti jausmus' 
        },
        description: { 
          en: 'Express genuine feelings vs thoughts', 
          lt: 'Išreikšti tikrus jausmus vietoje minčių' 
        },
        type: 'feeling',
        prompt: {
          en: 'Think of a difficult situation you\'ve experienced recently. Write down what you were feeling (not what you were thinking about the other person).',
          lt: 'Pagalvokite apie sunkią situaciją, kurią neseniai patyrėte. Užrašykite, ką jautėte (o ne ką manėte apie kitą asmenį).'
        },
        examples: createExamples([
          {feeling: "I feel frustrated", thought: "I feel like you don't care"},
          {feeling: "I feel sad", thought: "I feel ignored"},
          {feeling: "I feel anxious", thought: "I feel manipulated"}
        ]),
        tips: commonTips.feeling
      }
    ],
  },
  {
    id: 'making-requests',
    title: { 
      en: 'Making Effective Requests', 
      lt: 'Efektyvūs prašymai' 
    },
    description: { 
      en: 'Learn to make clear, positive requests that inspire willing cooperation', 
      lt: 'Išmokite pateikti aiškius, teigiamus prašymus, kurie skatina noriai bendradarbiauti' 
    },
    icon: 'chatbubble-ellipses',
    content: {
      en: `✨ Making Positive Action Requests:
• Say what you want, not what you don't want
• Frame requests in concrete, doable actions rather than vague terms
• Distinguish between genuine requests versus demands
• Focus on observable behaviors and specific actions

💬 Making Effective Requests:
• Use clear action language instead of abstract concepts ("listen," "be friendly")
• Ensure requests are specific and doable
• Make requests that bring joy to both parties
• Check that your request isn't perceived as a demand

🧠 Understanding Responses:
• People may respond with submission, rebellion, or false agreement when hearing demands
• Watch for signs that someone is agreeing out of guilt or fear
• Notice if someone is being a "yes-saying Jackal" (agreeing to everything without true consent)
• Pay attention to how people react when they don't do what you want`,
lt: `✨ Teigiamų veiksmų prašymai:
• Sakykite, ko norite, o ne ko vengiate
• Formuluokite prašymus kaip konkrečius, įgyvendinamus veiksmus, o ne miglotas sąvokas
• Atskirskite nuoširdžius prašymus nuo reikalavimų
• Susitelkite į stebimą elgesį ir konkrečius veiksmus

💬 Efektyvūs prašymai:
• Naudokite aiškią veiksmų kalbą vietoj abstrakčių sąvokų („klausyk“, „būk draugiškas“)
• Užtikrinkite, kad prašymai būtų konkretūs ir įgyvendinami
• Teikite prašymus, kurie džiugina abi puses
• Įsitikinkite, kad jūsų prašymas nėra suvokiamas kaip reikalavimas

🧠 Atsakų supratimas:
• Žmonės gali reaguoti paklusnumu, maištu ar apsimestiniu pritarimu, kai jaučia reikalavimą
• Stebėkite, ar kas nors sutinka vedinas kaltės ar baimės
• Atkreipkite dėmesį, ar kas nors elgiasi kaip „taip sakantis šakalas“ (sutinka su viskuo be nuoširdaus pritarimo)
• Stebėkite, kaip žmonės reaguoja, kai nedaro to, ko tikitės`
    },
    exercises: [
      {
        id: 'request-1',
        title: { 
          en: 'Transform Demands into Requests', 
          lt: 'Pakeisti reikalavimus į prašymus' 
        },
        description: { 
          en: 'Practice turning negative demands into positive requests', 
          lt: 'Praktikuoti neigiamų reikalavimų keitimą į teigiamus prašymus' 
        },
        type: 'request',
        prompt: {
          en: 'Think of something you recently demanded from someone (using "don\'t" or negative language). Rewrite it as a positive, specific request focusing on what you DO want.',
          lt: 'Pagalvokite apie kažką, ko neseniai reikalavote iš kažko (naudodami "ne" ar neigiamą kalbą). Perrašykite tai kaip teigiamą, konkretų prašymą, sutelkiant dėmesį į tai, ko NORITE.'
        },
        examples: createExamples([
          {demand: "Don't interrupt me!", request: "Would you be willing to wait until I finish speaking before sharing your thoughts?"},
          {demand: "Stop being so messy!", request: "Would you be willing to put your dishes in the dishwasher after eating?"},
          {demand: "Don't be late again!", request: "Would you be willing to arrive by 7 PM or call me if you'll be delayed?"}
        ]),
        tips: commonTips.request
      }
    ],
  },
  {
    id: 'anger-transformation',
    title: { 
      en: 'Transforming Anger into Connection', 
      lt: 'Pykčio transformavimas į ryšį' 
    },
    description: { 
      en: 'Learn to use anger as a signal to identify unmet needs and create understanding', 
      lt: 'Išmokite naudoti pyktį kaip signalą nepatenkintų poreikių identifikavimui ir supratimo kūrimui' 
    },
    icon: 'warning',
    content: {
      en: `🚨 Anger is a Signal, Not the Enemy
Anger serves as an alarm telling us we're thinking in ways that won't get our needs met. It's not something to eliminate, but to understand and transform.

⚡ The Stimulus ≠ The Cause
• What others do (stimulus) doesn't directly cause our anger
• Our thoughts and judgments about their actions cause the anger
• Example: When Rosenberg was hit in the nose twice, his different thoughts about each student led to different emotional responses

🔗 The Judgment-Need Connection
• When angry, we're usually making judgments about others' "wrongness"
• These judgments are actually disconnected expressions of our own unmet needs
• By identifying the need behind the judgment, anger transforms into other feelings

🛠️ Practical Steps for Managing Anger:
1. Stop and identify what actually happened (stimulus)
2. Notice your judgmental thoughts about it
3. Look for the unmet need behind those judgments
4. Express: observation + current feeling + need + specific request
5. If needed, take a timeout to process internally first

🎯 The Fundamental Shift
Moving from thinking about what's wrong with others to understanding what needs (ours and theirs) aren't being met. This creates more possibilities for constructive solutions.`,
      lt: `🚨 Pyktis yra signalas, o ne priešas
Pyktis tarnauja kaip aliarmas, pranešantis, kad mąstome taip, kad nepatenkinsime savo poreikių. Tai ne kažkas, ką reikia elimuoti, bet suprasti ir transformuoti.

⚡ Stimulas ≠ Priežastis
• Tai, ką daro kiti (stimulas), tiesiogiai nesukelia mūsų pykčio
• Mūsų mintys ir sprendimai apie jų veiksmus sukelia pyktį
• Pavyzdys: Kai Rosenbergas buvo trenktas per nosį du kartus, jo skirtingos mintys apie kiekvieną studentą lėmė skirtingas emocines reakcijas

🔗 Sprendimo-poreikio ryšys
• Pyktindamiesi paprastai sprendžiame apie kitų "klaidingumą"
• Šie sprendimai iš tikrųjų yra atskirti mūsų nepatenkintų poreikių išraiška
• Identifikuodami poreikį už sprendimo, pyktis transformuojasi į kitus jausmus

🛠️ Praktiniai pykčio valdymo žingsniai:
1. Sustokite ir identifikuokite, kas iš tikrųjų įvyko (stimulas)
2. Pastebėkite savo sprendžiančias mintis apie tai
3. Ieškokite nepatenkinto poreikio už tų sprendimų
4. Išreikškite: stebėjimas + dabartinis jausmas + poreikis + konkretus prašymas
5. Jei reikia, pasiimkite pertraukėlę vidiniam apdorojimui

🎯 Pagrindinis poslinkis
Perėjimas nuo mąstymo apie tai, kas negerai su kitais, prie supratimo, kokie poreikiai (mūsų ir jų) nėra patenkinti. Tai sukuria daugiau galimybių konstruktyviems sprendimams.`
    },
    exercises: [
      {
        id: 'anger-transformation-1',
        title: { 
          en: 'Transform Anger to Needs', 
          lt: 'Transformuoti pyktį į poreikius' 
        },
        description: { 
          en: 'Practice identifying the unmet needs behind your angry judgments', 
          lt: 'Praktikuoti nepatenkintų poreikių identifikavimą už pykčio sprendimų' 
        },
        type: 'feeling',
        prompt: {
          en: 'Think of a recent situation that made you angry. Follow these steps: 1) What exactly happened (stimulus)? 2) What judgments did you make? 3) What need wasn\'t being met? 4) How does identifying this need change your feelings?',
          lt: 'Pagalvokite apie neseniai buvusią situaciją, kuri jus supykdė. Vadovaukitės šiais žingsniais: 1) Kas tiksliai įvyko (stimulas)? 2) Kokius sprendimus darėte? 3) Koks poreikis nebuvo patenkintas? 4) Kaip šio poreikio identifikavimas keičia jūsų jausmus?'
        },
        examples: {
          en: [
            `Stimulus: "My colleague interrupted me" → Judgment: "He's so rude" → Need: "I need to be heard and valued" → Transformed feeling: "I feel disappointed because my need for respect wasn't met"`,
            `Stimulus: "Partner left dishes in sink" → Judgment: "They're so lazy" → Need: "I need partnership and shared responsibility" → Transformed feeling: "I feel tired because my need for cooperation isn't being met"`
          ],
          lt: [
            `Stimulas: "Kolega mane pertraukė" → Sprendimas: "Jis toks nemandagus" → Poreikis: "Man reikia būti išgirstam ir vertinamam" → Transformuotas jausmas: "Jaučiuosi nusivylęs, nes mano pagarbos poreikis nebuvo patenkintas"`,
            `Stimulas: "Partneris paliko indus kriauklėje" → Sprendimas: "Jie tokie tingūs" → Poreikis: "Man reikia partnerystės ir bendros atsakomybės" → Transformuotas jausmas: "Jaučiuosi pavargęs, nes bendradarbiavimo poreikis nėra tenkinamas"`
          ]
        },
        tips: {
          en: [
            "Notice the difference between stimulus (what happened) and your story about it",
            "Look for the universal human need behind your judgment", 
            "Feel how identifying the need changes your emotional state",
            "Remember: others' actions are the stimulus, not the cause of your anger"
          ],
          lt: [
            "Pastebėkite skirtumą tarp stimulo (kas įvyko) ir jūsų istorijos apie tai",
            "Ieškokite universalaus žmogaus poreikio už jūsų sprendimo",
            "Pajuskite, kaip poreikio identifikavimas keičia jūsų emocinę būseną", 
            "Prisiminkite: kitų veiksmai yra stimulas, o ne jūsų pykčio priežastis"
          ]
        }
      }
    ],
  },
];
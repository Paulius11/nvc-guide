import { Need, Emotion, NeedCategory, EmotionCategory } from '../types';

// =============================================================================
// CONFIGURATION DATA
// =============================================================================

// Enhanced English definitions for CNVC needs
const NEED_DEFINITIONS_EN: Record<string, string> = {
  // Connection needs
  'Acceptance': 'Being welcomed and embraced for who you are, without judgment or the need to change',
  'Affection': 'Warm, tender feelings and caring expressions between people',
  'Appreciation': 'Being valued, recognized, and acknowledged for your contributions and qualities',
  'Belonging': 'Feeling part of a community or group where you are welcomed and included',
  'Communication': 'Clear, honest exchange of thoughts, feelings, and needs with understanding',
  'Love': 'Profound care, affection, and emotional bond with others',
  'Support': 'Encouragement, assistance, and backing in times of need',
  'Trust': 'Confidence in the reliability, integrity, and good intentions of others',
  
  // Physical Well-Being needs
  'Air': 'Clean, fresh air necessary for breathing and vitality',
  'Food': 'Nourishing sustenance for physical health and energy',
  'Rest/Sleep': 'Restorative periods that renew energy and mental clarity',
  'Safety': 'Physical and emotional security from harm or threat',
  'Water': 'Clean, refreshing water for hydration and cleansing',
  
  // Autonomy needs
  'Choice': 'Freedom to make decisions and select from options',
  'Freedom': 'Liberty to act, think, and express yourself without constraint',
  'Independence': 'Self-reliance and ability to manage your own life',
  
  // Meaning needs
  'Creativity': 'Expression of imagination and innovation in original ways',
  'Growth': 'Continuous development and expansion of your potential',
  'Purpose': 'Clear sense of meaning and direction in life',
  
  // Peace needs
  'Beauty': 'Appreciation of aesthetic harmony and pleasing experiences',
  'Harmony': 'Peaceful coexistence and balance in relationships and environment',
  'Order': 'Organization and structure that creates calm and efficiency',
  
  // Play needs
  'Joy': 'Deep happiness and delight in life experiences',
  'Humor': 'Lightness, laughter, and playful perspective on life',
  
  // Honesty needs
  'Authenticity': 'Being genuine and true to your real self without pretense',
  'Integrity': 'Alignment between your values, words, and actions',
};

// Enhanced Lithuanian definitions
const NEED_DEFINITIONS_LT: Record<string, string> = {
  // Ryšys (Connection)
  'Priėmimas': 'Būti priimtam ir apkabintam tokiam, koks esi, be vertinimo ar poreikio keistis',
  'Įvertinimas': 'Jausmas, kad tavo pastangos, darbai ar idėjos yra vertinamos ir pripažįstamos',
  'Priklausymas': 'Jausmas, kad esi grupės dalimi, būti priimtam ir vertinamam kaip bendruomenės nariui',
  'Komunikacija': 'Keitimasis informacija, jausmais, mintimis su kitais žmonėmis, siekiant supratimo ir ryšio',
  'Meilė': 'Gilus rūpestis, šiluma ir ryšys su kitais. Gili meilės ir prisirišimo emocija',
  'Palaikymas': 'Padrąsinimas, pagalba ir palaikymas sunkumų metu. Jausmas, kad turite ant ko atsiremti',
  'Pasitikėjimas': 'Pasitikėjimas kitų patikimumu, sąžiningumu ir gerais ketinimais',
  
  // Fizinė gerovė (Physical Well-Being)
  'Oras': 'Švarus, gaivinantis oras, būtinas kvėpavimui ir gyvybingumui',
  'Maistas': 'Maitinantis maistas fiziniam sveikatai ir energijai',
  'Poilsis': 'Atkuriamieji periodai, kurie atnaujina energiją ir protinį aiškumą',
  'Saugumas': 'Fizinis ir emocinis saugumas nuo žalos ar grėsmės',
  'Vanduo': 'Švarus, atgaivinantis vanduo hidracijai ir valymui',
  
  // Autonomija (Autonomy)
  'Pasirinkimas': 'Laisvė priimti sprendimus ir rinktis iš variantų',
  'Nepriklausomybė': 'Savarankiškumas ir gebėjimas valdyti savo gyvenimą',
  'Erdvė': 'Fizinė ir emocinė erdvė būti savimi be įsikišimo',
  
  // Prasmė (Meaning)
  'Kūrybiškumas': 'Vaizduotės ir naujovių raiška originaliais būdais',
  'Augimas': 'Nuolatinis vystymasis ir potencialo atskleidimas',
  'Tikslas': 'Aiškus prasmės ir krypties jausmas gyvenime',
  
  // Taika (Peace)
  'Grožis': 'Estetinės harmonijos ir malonių patirčių vertinimas',
  'Darna': 'Taikiai sambūvis ir pusiausvyra santykiuose bei aplinkoje',
  'Tvarka': 'Organizacija ir struktūra, kuri kuria ramybę ir efektyvumą',
  
  // Žaidimas (Play)
  'Džiaugsmas': 'Gilus laimės ir malonumo jausmas gyvenimo patirtyse',
  'Humoras': 'Lengvumas, juokas ir žaismingumas gyvenime',
  
  // Autentiškumas (Authenticity)
  'Sąžiningumas': 'Vertybių, žodžių ir veiksmų derinimas. Tikrumas sau ir kitiems',
  'Principingumas': 'Laikymasis savo vertybių ir moralinių principų',
};

// Emotion descriptions
const EMOTION_DESCRIPTIONS_EN: Record<string, string> = {
  // Met emotions
  'Compassionate': 'Feeling deep empathy and desire to help others who are struggling',
  'Loving': 'Experiencing warm affection and care toward others',
  'Grateful': 'Feeling thankful and appreciative for what you have received',
  'Joyful': 'Experiencing deep happiness and delight',
  'Peaceful': 'Being calm and untroubled in mind and emotions',
  'Confident': 'Feeling sure of yourself and your abilities',
  
  // Unmet emotions
  'Frustrated': 'Feeling annoyed due to inability to achieve something',
  'Afraid': 'Being scared or fearful of potential danger',
  'Sad': 'Experiencing sorrow or unhappiness',
  'Angry': 'Feeling strong displeasure or hostility',
  'Confused': 'Being uncertain or unable to understand clearly',
  'Lonely': 'Feeling isolated and lacking companionship',
};

const EMOTION_DESCRIPTIONS_LT: Record<string, string> = {
  // Met emotions
  'Ramus': 'Vidinio taikos ir pusiausvyros jausmas, kai poreikiai yra tenkinami',
  'Dėkingas': 'Dėkingumo ir pripažinimo jausmas už tai, kas turime',
  'Džiaugsmingas': 'Gilaus džiaugsmo ir laimės jausmas',
  'Mylintis': 'Šiltas, rūpestingas jausmas kitų atžvilgiu',
  'Pasitikintis': 'Saugumo ir pasitikėjimo savimi jausmas',
  
  // Unmet emotions
  'Nusivylęs': 'Liūdesio jausmas, kai lūkesčiai neišsipildo',
  'Išsigandęs': 'Baimės ir nerimo jausmas dėl galimo pavojaus',
  'Liūdnas': 'Gilio skausmo jausmas, kai svarbūs poreikiai netenkinami',
  'Piktas': 'Stipraus nepasitenkinimo jausmas',
  'Sumišęs': 'Neaiškumo ir suglumimo jausmas',
  'Vienišas': 'Izoliuotumo ir ryšio trūkumo jausmas',
};

// =============================================================================
// DATA STRUCTURES
// =============================================================================

// CNVC Data Structure
const CNVC_NEEDS = [
  { 
    category: 'Connection' as NeedCategory, 
    items: ['Acceptance', 'Affection', 'Appreciation', 'Belonging', 'Communication', 'Love', 'Support', 'Trust'] 
  },
  { 
    category: 'Physical Well-Being' as NeedCategory, 
    items: ['Air', 'Food', 'Rest/Sleep', 'Safety', 'Water'] 
  },
  { 
    category: 'Autonomy' as NeedCategory, 
    items: ['Choice', 'Freedom', 'Independence'] 
  },
  { 
    category: 'Meaning' as NeedCategory, 
    items: ['Creativity', 'Growth', 'Purpose'] 
  },
  { 
    category: 'Peace' as NeedCategory, 
    items: ['Beauty', 'Harmony', 'Order'] 
  },
  { 
    category: 'Play' as NeedCategory, 
    items: ['Joy', 'Humor'] 
  },
  { 
    category: 'Honesty' as NeedCategory, 
    items: ['Authenticity', 'Integrity'] 
  },
];

const CNVC_EMOTIONS = {
  met: [
    { category: 'Affectionate' as EmotionCategory, items: ['Compassionate', 'Loving', 'Warm'] },
    { category: 'Grateful' as EmotionCategory, items: ['Grateful', 'Appreciative', 'Thankful'] },
    { category: 'Joyful' as EmotionCategory, items: ['Joyful', 'Delighted', 'Happy'] },
    { category: 'Peaceful' as EmotionCategory, items: ['Peaceful', 'Calm', 'Relaxed'] },
    { category: 'Confident' as EmotionCategory, items: ['Confident', 'Secure', 'Empowered'] },
  ],
  unmet: [
    { category: 'Annoyed' as EmotionCategory, items: ['Frustrated', 'Irritated', 'Bothered'] },
    { category: 'Afraid' as EmotionCategory, items: ['Afraid', 'Scared', 'Worried'] },
    { category: 'Sad' as EmotionCategory, items: ['Sad', 'Heartbroken', 'Depressed'] },
    { category: 'Angry' as EmotionCategory, items: ['Angry', 'Furious', 'Enraged'] },
    { category: 'Confused' as EmotionCategory, items: ['Confused', 'Bewildered', 'Puzzled'] },
    { category: 'Disconnected' as EmotionCategory, items: ['Lonely', 'Isolated', 'Alienated'] },
  ],
};

// Lithuanian Data Structure
const LITHUANIAN_NEEDS = [
  { 
    category: 'Ryšys' as NeedCategory, 
    items: ['Priėmimas', 'Įvertinimas', 'Priklausymas', 'Komunikacija', 'Meilė', 'Palaikymas', 'Pasitikėjimas'] 
  },
  { 
    category: 'Fizinė gerovė' as NeedCategory, 
    items: ['Oras', 'Maistas', 'Poilsis', 'Saugumas', 'Vanduo'] 
  },
  { 
    category: 'Autonomija' as NeedCategory, 
    items: ['Pasirinkimas', 'Nepriklausomybė', 'Erdvė'] 
  },
  { 
    category: 'Prasmė' as NeedCategory, 
    items: ['Kūrybiškumas', 'Augimas', 'Tikslas'] 
  },
  { 
    category: 'Taika' as NeedCategory, 
    items: ['Grožis', 'Darna', 'Tvarka'] 
  },
  { 
    category: 'Žaidimas' as NeedCategory, 
    items: ['Džiaugsmas', 'Humoras'] 
  },
  { 
    category: 'Autentiškumas' as NeedCategory, 
    items: ['Sąžiningumas', 'Principingumas'] 
  },
];

const LITHUANIAN_EMOTIONS = {
  met: [
    { category: 'Ramybė' as EmotionCategory, items: ['Ramus', 'Taikus', 'Atsipalaidavęs'] },
    { category: 'Dėkingumas' as EmotionCategory, items: ['Dėkingas', 'Įvertinantis', 'Palaimęs'] },
    { category: 'Džiaugsmas' as EmotionCategory, items: ['Džiaugsmingas', 'Linksmas', 'Laimingas'] },
    { category: 'Mylintis' as EmotionCategory, items: ['Mylintis', 'Šiltas', 'Rūpestingas'] },
    { category: 'Pasitikėjimas' as EmotionCategory, items: ['Pasitikintis', 'Saugus', 'Užtikrintas'] },
  ],
  unmet: [
    { category: 'Susierzinimas' as EmotionCategory, items: ['Nusivylęs', 'Susierzinęs', 'Nustebęs'] },
    { category: 'Baimė' as EmotionCategory, items: ['Išsigandęs', 'Neramus', 'Susirūpinęs'] },
    { category: 'Liūdesys' as EmotionCategory, items: ['Liūdnas', 'Skaudus', 'Sielojęsis'] },
    { category: 'Pyktis' as EmotionCategory, items: ['Piktas', 'Įsiutęs', 'Kerštingas'] },
    { category: 'Sumišimas' as EmotionCategory, items: ['Sumišęs', 'Sutrikęs', 'Nežinąs'] },
    { category: 'Atsiskyręs' as EmotionCategory, items: ['Vienišas', 'Izoliuotas', 'Atsiskyręs'] },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateNeedExamples(name: string, language: 'en' | 'lt'): string[] {
  if (language === 'lt') {
    return [
      `Patenkinti ${name.toLowerCase()} poreikį kasdieniniame gyvenime`,
      `Jaustis patenkintu, kai ${name.toLowerCase()} poreikis yra tenkinamas`,
      `Siekti ${name.toLowerCase()} savo santykiuose ir veikloje`
    ];
  }
  return [
    `Experiencing ${name.toLowerCase()} in daily interactions`,
    `Creating conditions for ${name.toLowerCase()} to flourish`,
    `Recognizing when ${name.toLowerCase()} is present or absent`
  ];
}

function createNeed(
  id: string, 
  name: string, 
  category: NeedCategory, 
  language: 'en' | 'lt', 
  source: 'CNVC' | 'IEVA' | 'ROLAND'
): Need {
  const definitions = language === 'en' ? NEED_DEFINITIONS_EN : NEED_DEFINITIONS_LT;
  
  return {
    id,
    name,
    definition: definitions[name] || `Essential human need for ${name.toLowerCase()}`,
    examples: generateNeedExamples(name, language),
    category,
    language,
    source,
  };
}

function createEmotion(
  id: string,
  name: string,
  category: EmotionCategory,
  needState: 'met' | 'unmet',
  language: 'en' | 'lt',
  source: 'CNVC' | 'IEVA' | 'ROLAND'
): Emotion {
  const descriptions = language === 'en' ? EMOTION_DESCRIPTIONS_EN : EMOTION_DESCRIPTIONS_LT;
  
  return {
    id,
    name,
    description: descriptions[name] || `A feeling of ${name.toLowerCase()}`,
    relatedFeelings: [], // Can be populated later if needed
    category,
    needState,
    language,
    source,
    intensity: Math.floor(Math.random() * 10) + 1, // Random 1-10
  };
}

// =============================================================================
// DATA GENERATION
// =============================================================================

function generateNeeds(): Need[] {
  const needs: Need[] = [];
  
  // English CNVC needs
  CNVC_NEEDS.forEach((categoryGroup, categoryIndex) => {
    categoryGroup.items.forEach((item, itemIndex) => {
      needs.push(createNeed(
        `cnvc-need-${categoryIndex}-${itemIndex}`,
        item,
        categoryGroup.category,
        'en',
        'CNVC'
      ));
    });
  });
  
  // Lithuanian needs
  LITHUANIAN_NEEDS.forEach((categoryGroup, categoryIndex) => {
    categoryGroup.items.forEach((item, itemIndex) => {
      needs.push(createNeed(
        `lt-need-${categoryIndex}-${itemIndex}`,
        item,
        categoryGroup.category,
        'lt',
        'IEVA'
      ));
    });
  });
  
  return needs;
}

function generateEmotions(): Emotion[] {
  const emotions: Emotion[] = [];
  
  // English CNVC emotions
  ['met', 'unmet'].forEach((needState) => {
    const emotionGroup = CNVC_EMOTIONS[needState as 'met' | 'unmet'];
    emotionGroup.forEach((categoryGroup, categoryIndex) => {
      categoryGroup.items.forEach((item, itemIndex) => {
        emotions.push(createEmotion(
          `cnvc-${needState}-${categoryIndex}-${itemIndex}`,
          item,
          categoryGroup.category,
          needState as 'met' | 'unmet',
          'en',
          'CNVC'
        ));
      });
    });
  });
  
  // Lithuanian emotions
  ['met', 'unmet'].forEach((needState) => {
    const emotionGroup = LITHUANIAN_EMOTIONS[needState as 'met' | 'unmet'];
    emotionGroup.forEach((categoryGroup, categoryIndex) => {
      categoryGroup.items.forEach((item, itemIndex) => {
        emotions.push(createEmotion(
          `lt-${needState}-${categoryIndex}-${itemIndex}`,
          item,
          categoryGroup.category,
          needState as 'met' | 'unmet',
          'lt',
          'IEVA'
        ));
      });
    });
  });
  
  return emotions;
}

// =============================================================================
// EXPORTS
// =============================================================================

export const nvcNeeds: Need[] = generateNeeds();
export const nvcEmotions: Emotion[] = generateEmotions();

// Utility functions
export function getNeedsByCategory(category: NeedCategory, language: 'en' | 'lt' = 'en'): Need[] {
  return nvcNeeds.filter(need => need.category === category && need.language === language);
}

export function getEmotionsByNeedState(needState: 'met' | 'unmet', language: 'en' | 'lt' = 'en'): Emotion[] {
  return nvcEmotions.filter(emotion => emotion.needState === needState && emotion.language === language);
}

export function findNeedByName(name: string, language: 'en' | 'lt' = 'en'): Need | undefined {
  return nvcNeeds.find(need => 
    need.name.toLowerCase() === name.toLowerCase() && need.language === language
  );
}

export function findEmotionByName(name: string, language: 'en' | 'lt' = 'en'): Emotion | undefined {
  return nvcEmotions.find(emotion => 
    emotion.name.toLowerCase() === name.toLowerCase() && emotion.language === language
  );
}

export function searchNeeds(query: string, language: 'en' | 'lt' = 'en'): Need[] {
  const lowercaseQuery = query.toLowerCase();
  return nvcNeeds.filter(need => 
    need.language === language && (
      need.name.toLowerCase().includes(lowercaseQuery) ||
      need.definition.toLowerCase().includes(lowercaseQuery) ||
      need.examples.some(example => example.toLowerCase().includes(lowercaseQuery))
    )
  );
}

export function searchEmotions(query: string, language: 'en' | 'lt' = 'en'): Emotion[] {
  const lowercaseQuery = query.toLowerCase();
  return nvcEmotions.filter(emotion => 
    emotion.language === language && (
      emotion.name.toLowerCase().includes(lowercaseQuery) ||
      emotion.description.toLowerCase().includes(lowercaseQuery)
    )
  );
}

// Default export for backward compatibility
export default {
  needs: nvcNeeds,
  emotions: nvcEmotions,
  utils: {
    getNeedsByCategory,
    getEmotionsByNeedState,
    findNeedByName,
    findEmotionByName,
    searchNeeds,
    searchEmotions,
  }
};
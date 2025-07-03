export interface Need {
  id: string;
  name: string;
  definition: string;
  examples: string[];
  category: NeedCategory;
  synonyms?: string[];
  language?: 'en' | 'lt';
  source?: 'CNVC' | 'IEVA' | 'ROLAND' | 'CUSTOM';
}

export interface Emotion {
  id: string;
  name: string;
  description: string;
  relatedFeelings: string[];
  category: EmotionCategory;
  intensity?: number;
  context?: string;
  needState: 'met' | 'unmet';
  language?: 'en' | 'lt';
  source?: 'CNVC' | 'IEVA' | 'ROLAND' | 'CUSTOM';
}

export enum NeedCategory {
  CONNECTION = 'Connection',
  PHYSICAL_WELLBEING = 'Physical Well-Being', 
  AUTONOMY = 'Autonomy',
  MEANING = 'Meaning',
  PEACE = 'Peace',
  PLAY = 'Play',
  HONESTY = 'Honesty',
  // Lithuanian categories
  RYŠYS = 'Ryšys',
  FIZINĖ_GEROVĖ = 'Fizinė gerovė',
  PRISILIETIMAS = 'Prisilietimas',
  HARMONIJA = 'Harmonija',
  PRASMĖ = 'Prasmė',
  ATVIRUMAS = 'Atvirumas',
  ŽAIDIMAS = 'Žaidimas',
  AUTENTIŠKUMAS = 'Autentiškumas',
  TAIKA = 'Taika'
}

export enum EmotionCategory {
  // Met emotions - English
  AFFECTIONATE = 'Affectionate',
  ENGAGED = 'Engaged', 
  HOPEFUL = 'Hopeful',
  CONFIDENT = 'Confident',
  EXCITED = 'Excited',
  GRATEFUL = 'Grateful',
  INSPIRED = 'Inspired',
  JOYFUL = 'Joyful',
  EXHILARATED = 'Exhilarated',
  PEACEFUL = 'Peaceful',
  REFRESHED = 'Refreshed',
  
  // Unmet emotions - English
  AFRAID = 'Afraid',
  ANNOYED = 'Annoyed',
  ANGRY = 'Angry',
  AVERSION = 'Aversion',
  CONFUSED = 'Confused',
  DISCONNECTED = 'Disconnected',
  DISQUIET = 'Disquiet',
  EMBARRASSED = 'Embarrassed',
  FATIGUE = 'Fatigue',
  PAIN = 'Pain',
  SAD = 'Sad',
  TENSE = 'Tense',
  VULNERABLE = 'Vulnerable',
  YEARNING = 'Yearning',
  
  // Lithuanian emotions - Met
  RAMYBĖ = 'Ramybė',
  LAIMĖ = 'Laimė', 
  SMALSUMAS = 'Smalsumas',
  PASITIKĖJIMAS = 'Pasitikėjimas',
  ATJAUTA = 'Atjauta',
  ATGAIVA = 'Atgaiva',
  GYVYBINGUMAS = 'Gyvybingumas',
  DĖKINGUMAS = 'Dėkingumas',
  MYLINTIS = 'Mylintis',
  PALAIMA = 'Palaima',
  DŽIAUGSMAS = 'Džiaugsmas',
  ĮSITRAUKĘS = 'Įsitraukęs',
  ATSIGAVĘS = 'Atsigavęs',
  TAIKUS = 'Taikus',
  ĮKVĖPTAS = 'Įkvėptas',
  VILTINGAS = 'Viltingas',
  SUJAUDINTAS = 'Sujaudintas',
  
  // Lithuanian emotions - Unmet
  NUOVARGIS = 'Nuovargis',
  SUMIŠIMAS = 'Sumišimas',
  PAŽEIDŽIAMUMAS = 'Pažeidžiamumas',
  LIŪDESYS = 'Liūdesys',
  BAIMĖ = 'Baimė',
  SKAUSMAS = 'Skausmas',
  NERIMAS = 'Nerimas',
  SUSIERZINIMAS = 'Susierzinimas',
  AGITACIJA = 'Agitacija',
  PAVYDAS = 'Pavydas',
  GĖDA = 'Gėda',
  PYKTIS = 'Pyktis',
  NEAPYKANTA = 'Neapykanta',
  NUOBODULYS = 'Nuobodulys',
  SUMIŠĘS = 'Sumišęs',
  ĮTAMPA = 'Įtampa',
  NERAMUS = 'Neramus',
  IŠSIGANDĘS = 'Išsigandęs',
  SUSIGĖDĘS = 'Susigėdęs',
  ATSISKYRĘS = 'Atsiskyręs',
  SUSIERZINĘS = 'Susierzinęs',
  ANTIPATIJA = 'Antipatija',
  PIKTAS = 'Piktas',
  ILGESYS = 'Ilgesys'
}

export interface FavoriteItem {
  id: string;
  type: 'need' | 'emotion';
  dateAdded: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'lt';
}

export interface NVCStatement {
  id: string;
  title: string;
  observation: string;
  feeling: string;
  need: string;
  request: string;
  context?: string;
  dateCreated: string;
  dateModified: string;
  language: 'en' | 'lt';
  tags?: string[];
}

export interface NVCSuggestion {
  id: string;
  text: string;
  category: string;
  isCommon: boolean;
}

export interface NVCStep {
  key: 'observation' | 'feeling' | 'need' | 'request';
  title: string;
  description: string;
  placeholder: string;
  examples: string[];
  tips: string[];
}

export interface GratitudeEntry {
  id: string;
  type: 'personal' | 'other';
  title: string;
  action: string; // Ką padarėte/kas padarė
  feeling: string; // Kaip dėl to jaučiatės
  need: string; // Koks poreikis buvo patenkintas
  context?: string; // Papildomas kontekstas
  personName?: string; // Kito asmens vardas (jei type === 'other')
  dateCreated: string;
  dateModified: string;
  language: 'en' | 'lt';
  tags?: string[];
}

export interface GratitudeTemplate {
  type: 'personal' | 'other';
  questions: {
    action: string;
    feeling: string;
    need: string;
  };
  examples: {
    action: string[];
    feeling: string[];
    need: string[];
  };
}


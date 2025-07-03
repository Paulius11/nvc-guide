import { NeedCategory, EmotionCategory } from '../types';

// Need category visual mappings
export const needCategoryVisuals: Record<string, { icon: string; color: string; gradient: string[] }> = {
  'Connection': { icon: '🤝', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Physical Well-Being': { icon: '💪', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Autonomy': { icon: '🗽', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
  'Meaning': { icon: '🌟', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Peace': { icon: '☮️', color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
  'Play': { icon: '🎮', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Honesty': { icon: '💎', color: '#3B82F6', gradient: ['#3B82F6', '#1D4ED8'] },
  
  // Lithuanian categories
  'Ryšys': { icon: '🤝', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Fizinė gerovė': { icon: '💪', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Prisilietimas': { icon: '🤗', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Harmonija': { icon: '⚖️', color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
  'Prasmė': { icon: '🌟', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Atvirumas': { icon: '💎', color: '#3B82F6', gradient: ['#3B82F6', '#1D4ED8'] },
  'Žaidimas': { icon: '🎮', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Autentiškumas': { icon: '✨', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
  'Taika': { icon: '☮️', color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
};

// Emotion category visual mappings
export const emotionCategoryVisuals: Record<string, { icon: string; color: string; gradient: string[] }> = {
  // Met emotions - English
  'Affectionate': { icon: '💕', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Engaged': { icon: '🎯', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Hopeful': { icon: '🌅', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Confident': { icon: '💪', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
  'Excited': { icon: '🚀', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Grateful': { icon: '🙏', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Inspired': { icon: '💡', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Joyful': { icon: '😊', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Exhilarated': { icon: '🎉', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Peaceful': { icon: '🕊️', color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
  'Refreshed': { icon: '🌿', color: '#10B981', gradient: ['#10B981', '#047857'] },
  
  // Unmet emotions - English
  'Afraid': { icon: '😨', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Annoyed': { icon: '😤', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Angry': { icon: '😡', color: '#DC2626', gradient: ['#DC2626', '#B91C1C'] },
  'Aversion': { icon: '🤢', color: '#84CC16', gradient: ['#84CC16', '#65A30D'] },
  'Confused': { icon: '😕', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Disconnected': { icon: '💔', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Disquiet': { icon: '😰', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Embarrassed': { icon: '😳', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Fatigue': { icon: '😴', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Pain': { icon: '😣', color: '#DC2626', gradient: ['#DC2626', '#B91C1C'] },
  'Sad': { icon: '😢', color: '#3B82F6', gradient: ['#3B82F6', '#1D4ED8'] },
  'Tense': { icon: '😬', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Vulnerable': { icon: '🥺', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Yearning': { icon: '😔', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
  
  // Lithuanian emotions - Met
  'Ramybė': { icon: '🕊️', color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
  'Laimė': { icon: '😊', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Smalsumas': { icon: '🔍', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
  'Pasitikėjimas': { icon: '💪', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
  'Atjauta': { icon: '💕', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Atgaiva': { icon: '🌿', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Gyvybingumas': { icon: '⚡', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Dėkingumas': { icon: '🙏', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Mylintis': { icon: '💕', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Palaima': { icon: '✨', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Džiaugsmas': { icon: '🎉', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Įsitraukęs': { icon: '🎯', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Atsigavęs': { icon: '🌿', color: '#10B981', gradient: ['#10B981', '#047857'] },
  'Taikus': { icon: '☮️', color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
  'Įkvėptas': { icon: '💡', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Viltingas': { icon: '🌅', color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] },
  'Sujaudintas': { icon: '🚀', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  
  // Lithuanian emotions - Unmet
  'Nuovargis': { icon: '😴', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Sumišimas': { icon: '😕', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Pažeidžiamumas': { icon: '🥺', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Liūdesys': { icon: '😢', color: '#3B82F6', gradient: ['#3B82F6', '#1D4ED8'] },
  'Baimė': { icon: '😨', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Skausmas': { icon: '😣', color: '#DC2626', gradient: ['#DC2626', '#B91C1C'] },
  'Nerimas': { icon: '😰', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Susierzinimas': { icon: '😤', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Agitacija': { icon: '😬', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Pavydas': { icon: '😒', color: '#84CC16', gradient: ['#84CC16', '#65A30D'] },
  'Gėda': { icon: '😳', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Pyktis': { icon: '😡', color: '#DC2626', gradient: ['#DC2626', '#B91C1C'] },
  'Neapykanta': { icon: '🤬', color: '#DC2626', gradient: ['#DC2626', '#B91C1C'] },
  'Nuobodulys': { icon: '😑', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Sumišęs': { icon: '😕', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Įtampa': { icon: '😬', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Neramus': { icon: '😰', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Išsigandęs': { icon: '😨', color: '#F97316', gradient: ['#F97316', '#EA580C'] },
  'Susigėdęs': { icon: '😳', color: '#EC4899', gradient: ['#EC4899', '#BE185D'] },
  'Atsiskyręs': { icon: '💔', color: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  'Susierzinęs': { icon: '😤', color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
  'Antipatija': { icon: '🤢', color: '#84CC16', gradient: ['#84CC16', '#65A30D'] },
  'Piktas': { icon: '😡', color: '#DC2626', gradient: ['#DC2626', '#B91C1C'] },
  'Ilgesys': { icon: '😔', color: '#8B5CF6', gradient: ['#8B5CF6', '#6D28D9'] },
};

export const getCategoryVisual = (category: string, type: 'need' | 'emotion') => {
  const visuals = type === 'need' ? needCategoryVisuals : emotionCategoryVisuals;
  return visuals[category] || { 
    icon: type === 'need' ? '🛡️' : '💭', 
    color: '#6B7280', 
    gradient: ['#6B7280', '#4B5563'] 
  };
};

export const getIntensityColor = (intensity?: number, isDark = false) => {
  if (!intensity) return isDark ? '#9CA3AF' : '#6B7280';
  if (intensity <= 3) return isDark ? '#86EFAC' : '#16A34A'; // Low - Green
  if (intensity <= 6) return isDark ? '#FDE047' : '#EAB308'; // Medium - Yellow
  return isDark ? '#F87171' : '#DC2626'; // High - Red
};

export const getNeedStateColor = (needState: 'met' | 'unmet', isDark = false) => {
  if (needState === 'met') {
    return isDark ? '#34D399' : '#10B981'; // Green
  } else {
    return isDark ? '#F87171' : '#EF4444'; // Red
  }
};
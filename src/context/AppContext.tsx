import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { AppSettings, FavoriteItem, NVCStatement, GratitudeEntry } from '../types';

// Temporary EmpathyMap interface until it's added to types
interface EmpathyMap {
  id: string;
  title: string;
  situation: string;
  thinks: string;
  feels: string;
  sees: string;
  says: string;
  does: string;
  pains: string;
  gains: string;
  dateCreated: string;
  dateModified: string;
}

interface AppContextType {
  favorites: FavoriteItem[];
  settings: AppSettings;
  nvcStatements: NVCStatement[];
  empathyMaps: EmpathyMap[];
  gratitudeEntries: GratitudeEntry[];
  addFavorite: (id: string, type: 'need' | 'emotion') => void;
  removeFavorite: (id: string, type: 'need' | 'emotion') => void;
  isFavorite: (id: string, type: 'need' | 'emotion') => boolean;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  saveNVCStatement: (statement: NVCStatement) => void;
  updateNVCStatement: (statement: NVCStatement) => void;
  deleteNVCStatement: (id: string) => void;
  getNVCStatement: (id: string) => NVCStatement | undefined;
  saveEmpathyMap: (empathyMap: EmpathyMap) => void;
  updateEmpathyMap: (empathyMap: EmpathyMap) => void;
  deleteEmpathyMap: (id: string) => void;
  getEmpathyMap: (id: string) => EmpathyMap | undefined;
  saveGratitudeEntry: (entry: GratitudeEntry) => void;
  updateGratitudeEntry: (entry: GratitudeEntry) => void;
  deleteGratitudeEntry: (id: string) => void;
  getGratitudeEntry: (id: string) => GratitudeEntry | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FAVORITES_KEY = '@empathy_app_favorites';
const SETTINGS_KEY = '@empathy_app_settings';
const NVC_STATEMENTS_KEY = '@empathy_app_nvc_statements';
const EMPATHY_MAPS_KEY = '@empathy_app_empathy_maps';
const GRATITUDE_ENTRIES_KEY = '@empathy_app_gratitude_entries';

const getDeviceLanguage = (): 'en' | 'lt' => {
  const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
  
  // Check if device language is Lithuanian
  return deviceLocale.toLowerCase() === 'lt' ? 'lt' : 'en';
};

const defaultSettings: AppSettings = {
  theme: 'light',
  language: getDeviceLanguage(),
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [nvcStatements, setNvcStatements] = useState<NVCStatement[]>([]);
  const [empathyMaps, setEmpathyMaps] = useState<EmpathyMap[]>([]);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);

  useEffect(() => {
    loadFavorites();
    loadSettings();
    loadNVCStatements();
    loadEmpathyMaps();
    loadGratitudeEntries();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const settingsData = await AsyncStorage.getItem(SETTINGS_KEY);
      if (settingsData) {
        setSettings({ ...defaultSettings, ...JSON.parse(settingsData) });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteItem[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const addFavorite = (id: string, type: 'need' | 'emotion') => {
    const newFavorite: FavoriteItem = {
      id,
      type,
      dateAdded: new Date().toISOString(),
    };
    const newFavorites = [...favorites, newFavorite];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (id: string, type: 'need' | 'emotion') => {
    const newFavorites = favorites.filter(
      (fav) => !(fav.id === id && fav.type === type)
    );
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (id: string, type: 'need' | 'emotion') => {
    return favorites.some((fav) => fav.id === id && fav.type === type);
  };

  const loadNVCStatements = async () => {
    try {
      const statementsData = await AsyncStorage.getItem(NVC_STATEMENTS_KEY);
      if (statementsData) {
        setNvcStatements(JSON.parse(statementsData));
      }
    } catch (error) {
      console.error('Error loading NVC statements:', error);
    }
  };

  const loadEmpathyMaps = async () => {
    try {
      const empathyMapsData = await AsyncStorage.getItem(EMPATHY_MAPS_KEY);
      if (empathyMapsData) {
        setEmpathyMaps(JSON.parse(empathyMapsData));
      }
    } catch (error) {
      console.error('Error loading empathy maps:', error);
    }
  };

  const saveNVCStatements = async (statements: NVCStatement[]) => {
    try {
      await AsyncStorage.setItem(NVC_STATEMENTS_KEY, JSON.stringify(statements));
    } catch (error) {
      console.error('Error saving NVC statements:', error);
    }
  };

  const saveEmpathyMapsToStorage = async (maps: EmpathyMap[]) => {
    try {
      await AsyncStorage.setItem(EMPATHY_MAPS_KEY, JSON.stringify(maps));
    } catch (error) {
      console.error('Error saving empathy maps:', error);
    }
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  // NVC Statement methods
  const saveNVCStatement = (statement: NVCStatement) => {
    const existingIndex = nvcStatements.findIndex(s => s.id === statement.id);
    let newStatements: NVCStatement[];
    
    if (existingIndex >= 0) {
      newStatements = [...nvcStatements];
      newStatements[existingIndex] = statement;
    } else {
      newStatements = [...nvcStatements, statement];
    }
    
    setNvcStatements(newStatements);
    saveNVCStatements(newStatements);
  };

  const updateNVCStatement = (statement: NVCStatement) => {
    saveNVCStatement(statement);
  };

  const deleteNVCStatement = (id: string) => {
    const newStatements = nvcStatements.filter(s => s.id !== id);
    setNvcStatements(newStatements);
    saveNVCStatements(newStatements);
  };

  const getNVCStatement = (id: string) => {
    return nvcStatements.find(s => s.id === id);
  };

  // Empathy Map methods
  const saveEmpathyMap = (empathyMap: EmpathyMap) => {
    const existingIndex = empathyMaps.findIndex(m => m.id === empathyMap.id);
    let newMaps: EmpathyMap[];
    
    if (existingIndex >= 0) {
      newMaps = [...empathyMaps];
      newMaps[existingIndex] = empathyMap;
    } else {
      newMaps = [...empathyMaps, empathyMap];
    }
    
    setEmpathyMaps(newMaps);
    saveEmpathyMapsToStorage(newMaps);
  };

  const updateEmpathyMap = (empathyMap: EmpathyMap) => {
    saveEmpathyMap(empathyMap);
  };

  const deleteEmpathyMap = (id: string) => {
    const newMaps = empathyMaps.filter(m => m.id !== id);
    setEmpathyMaps(newMaps);
    saveEmpathyMapsToStorage(newMaps);
  };

  const getEmpathyMap = (id: string) => {
    return empathyMaps.find(m => m.id === id);
  };

  const loadGratitudeEntries = async () => {
    try {
      const entriesData = await AsyncStorage.getItem(GRATITUDE_ENTRIES_KEY);
      if (entriesData) {
        setGratitudeEntries(JSON.parse(entriesData));
      }
    } catch (error) {
      console.error('Error loading gratitude entries:', error);
    }
  };

  const saveGratitudeEntriesToStorage = async (entries: GratitudeEntry[]) => {
    try {
      await AsyncStorage.setItem(GRATITUDE_ENTRIES_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving gratitude entries:', error);
    }
  };

  // Gratitude Entry methods
  const saveGratitudeEntry = (entry: GratitudeEntry) => {
    const existingIndex = gratitudeEntries.findIndex(e => e.id === entry.id);
    let newEntries: GratitudeEntry[];
    
    if (existingIndex >= 0) {
      newEntries = [...gratitudeEntries];
      newEntries[existingIndex] = entry;
    } else {
      newEntries = [...gratitudeEntries, entry];
    }
    
    setGratitudeEntries(newEntries);
    saveGratitudeEntriesToStorage(newEntries);
  };

  const updateGratitudeEntry = (entry: GratitudeEntry) => {
    saveGratitudeEntry(entry);
  };

  const deleteGratitudeEntry = (id: string) => {
    const newEntries = gratitudeEntries.filter(e => e.id !== id);
    setGratitudeEntries(newEntries);
    saveGratitudeEntriesToStorage(newEntries);
  };

  const getGratitudeEntry = (id: string) => {
    return gratitudeEntries.find(e => e.id === id);
  };


  return (
    <AppContext.Provider
      value={{
        favorites,
        settings,
        nvcStatements,
        empathyMaps,
        gratitudeEntries,
        addFavorite,
        removeFavorite,
        isFavorite,
        updateSettings,
        saveNVCStatement,
        updateNVCStatement,
        deleteNVCStatement,
        getNVCStatement,
        saveEmpathyMap,
        updateEmpathyMap,
        deleteEmpathyMap,
        getEmpathyMap,
        saveGratitudeEntry,
        updateGratitudeEntry,
        deleteGratitudeEntry,
        getGratitudeEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
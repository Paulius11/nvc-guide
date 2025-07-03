import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/context/AppContext';
import { NeedsScreen } from './src/screens/NeedsScreen';
import { EmotionsScreen } from './src/screens/EmotionsScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { NVCStatementsScreen } from './src/screens/NVCStatementsScreen';
import { GratitudeJournalScreen } from './src/screens/GratitudeJournalScreen';
import { NVCLearningScreen } from './src/screens/NVCLearningScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  const isLithuanian = settings.language === 'lt';

  const tabBarOptions = {
    tabBarStyle: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      borderTopColor: isDark ? '#4B5563' : '#E5E7EB',
      height: Platform.OS === 'android' ? 70 + insets.bottom : 60 + insets.bottom,
      paddingBottom: Platform.OS === 'android' ? Math.max(insets.bottom, 8) : 8,
      paddingTop: 8,
      position: 'absolute' as const,
      borderTopWidth: 1,
    },
    tabBarActiveTintColor: isDark ? '#60A5FA' : '#3B82F6',
    tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500' as const,
      marginBottom: Platform.OS === 'android' ? 4 : 0,
    },
    tabBarIconStyle: {
      marginTop: Platform.OS === 'android' ? 4 : 0,
    },
    headerStyle: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      borderBottomColor: isDark ? '#4B5563' : '#E5E7EB',
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: isDark ? '#F9FAFB' : '#111827',
    },
  };

  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Needs"
        component={NeedsScreen}
        options={{
          title: isLithuanian ? 'Poreikiai' : 'Human Needs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Emotions"
        component={EmotionsScreen}
        options={{
          title: isLithuanian ? 'Emocijos' : 'Emotions Library',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NVCLearning"
        component={NVCLearningScreen}
        options={{
          headerShown: false,
          title: isLithuanian ? 'NVC mokymasis' : 'NVC Learning',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NVCStatements"
        component={NVCStatementsScreen}
        options={{
          headerShown: false,
          title: isLithuanian ? 'NVC Teiginiai' : 'NVC Statements',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GratitudeJournal"
        component={GratitudeJournalScreen}
        options={{
          headerShown: false,
          title: isLithuanian ? 'Dėkingumas' : 'Gratitude',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: false,
          title: isLithuanian ? 'Mėgstami' : 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          title: isLithuanian ? 'Nustatymai' : 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppWithTheme() {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';
  
  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <TabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppWithTheme />
      </AppProvider>
    </SafeAreaProvider>
  );
}

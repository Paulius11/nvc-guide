import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SimpleHeader } from '../components/SimpleHeader';
import { useApp } from '../context/AppContext';
import { AppSettings } from '../types';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  const isLithuanian = settings.language === 'lt';

  const handleThemeToggle = () => {
    updateSettings({ theme: isDark ? 'light' : 'dark' });
  };


  const renderSettingItem = (
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={[styles.settingItem, isDark && styles.settingItemDark]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, isDark && styles.settingTitleDark]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, isDark && styles.settingSubtitleDark]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  const handleLanguageChange = (language: AppSettings['language']) => {
    updateSettings({ language });
  };


  const renderLanguageOptions = () => (
    <View style={[styles.section, isDark && styles.sectionDark]}>
      <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
        Language / Kalba
      </Text>
      {[
        { key: 'en', label: 'English' },
        { key: 'lt', label: 'Lietuvių' },
      ].map((lang) => (
        <TouchableOpacity
          key={lang.key}
          style={[styles.optionItem, isDark && styles.optionItemDark]}
          onPress={() => handleLanguageChange(lang.key as AppSettings['language'])}
        >
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>
            {lang.label}
          </Text>
          {settings.language === lang.key && (
            <Ionicons
              name="checkmark"
              size={20}
              color={isDark ? '#60A5FA' : '#3B82F6'}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SimpleHeader
        title={isLithuanian ? 'Nustatymai' : 'Settings'}
        isDark={isDark}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }}
      >
      <View style={[styles.section, isDark && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          {isLithuanian ? 'Išvaizda' : 'Appearance'}
        </Text>
        {renderSettingItem(
          isLithuanian ? 'Tamsus režimas' : 'Dark Mode',
          isLithuanian ? 'Perjungti tarp šviesios ir tamsios temų' : 'Switch between light and dark themes',
          <Switch
            value={isDark}
            onValueChange={handleThemeToggle}
            trackColor={{ false: '#D1D5DB', true: '#60A5FA' }}
            thumbColor={isDark ? '#3B82F6' : '#F3F4F6'}
          />
        )}
      </View>

      {renderLanguageOptions()}

      <View style={[styles.section, isDark && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          {isLithuanian ? 'Apie' : 'About'}
        </Text>
        {renderSettingItem(
          isLithuanian ? 'Versija' : 'Version',
          '1.0.0'
        )}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, isDark && styles.footerTextDark]}>
          {isLithuanian ? 'Sukurta rūpinantis emociniu gerumu' : 'Made with care for emotional well-being'}
        </Text>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionDark: {
    backgroundColor: '#374151',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitleDark: {
    color: '#F9FAFB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  settingItemDark: {
    borderBottomColor: '#4B5563',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  settingTitleDark: {
    color: '#F9FAFB',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingSubtitleDark: {
    color: '#9CA3AF',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  optionItemDark: {
    borderBottomColor: '#4B5563',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionTextDark: {
    color: '#F9FAFB',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footerTextDark: {
    color: '#9CA3AF',
  },
});
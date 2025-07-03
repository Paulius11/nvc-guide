import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GratitudeEntry, GratitudeTemplate } from '../types';
import { useApp } from '../context/AppContext';
import { QuickSelector } from './QuickSelector';

interface GratitudeFormProps {
  isDark?: boolean;
  onSave: (entry: GratitudeEntry) => void;
  onCancel: () => void;
  editingEntry?: GratitudeEntry;
}

export const GratitudeForm: React.FC<GratitudeFormProps> = ({
  isDark = false,
  onSave,
  onCancel,
  editingEntry,
}) => {
  const { settings } = useApp();
  const insets = useSafeAreaInsets();
  const [entryType, setEntryType] = useState<'personal' | 'other'>(
    editingEntry?.type || 'personal'
  );
  const [entry, setEntry] = useState<Partial<GratitudeEntry>>({
    title: '',
    action: '',
    feeling: '',
    need: '',
    context: '',
    personName: '',
    ...editingEntry,
  });
  const [emotionSelectorVisible, setEmotionSelectorVisible] = useState(false);
  const [needSelectorVisible, setNeedSelectorVisible] = useState(false);

  const getTemplate = (): GratitudeTemplate => {
    if (settings.language === 'lt') {
      if (entryType === 'personal') {
        return {
          type: 'personal',
          questions: {
            action: 'Ką padarėte, kas praturtino jūsų gyvenimą?',
            feeling: 'Kaip dėl to jaučiatės?',
            need: 'Koks poreikis buvo patenkintas?',
          },
          examples: {
            action: [
              'Perskaitiau knygą apie meditaciją',
              'Padėjau draugui persikelti',
              'Išmokau naują receptą',
              'Paskambinau tėvams',
              'Pasivaikščiojau gamtoje',
            ],
            feeling: [
              'dėkingas',
              'patenkintas',
              'laimingas',
              'ramus',
              'įkvėptas',
              'energingas',
              'mylintis',
            ],
            need: [
              'augimo',
              'ryšio',
              'kūrybiškumo',
              'ramybės',
              'prasmės',
              'gyvybingumo',
              'atjautos',
            ],
          },
        };
      } else {
        return {
          type: 'other',
          questions: {
            action: 'Ką kitas žmogus padarė, kas praturtino jūsų gyvenimą?',
            feeling: 'Kaip dėl to jaučiatės?',
            need: 'Koks poreikis buvo patenkintas?',
          },
          examples: {
            action: [
              'Paklausė, kaip jaučiuosi',
              'Padėjo su darbu namie',
              'Pasidalino šiltu šypsniu',
              'Išklausė mano rūpesčius',
              'Pakvietė prie šeimos stalo',
            ],
            feeling: [
              'dėkingas',
              'mylimas',
              'suprastas',
              'palaikomas',
              'vertinamas',
              'priimtas',
              'saugus',
            ],
            need: [
              'ryšio',
              'palaikymo',
              'supratimo',
              'priėmimo',
              'pagarbos',
              'meilės',
              'saugumo',
            ],
          },
        };
      }
    } else {
      // English version
      if (entryType === 'personal') {
        return {
          type: 'personal',
          questions: {
            action: 'What did you do that enriched your life?',
            feeling: 'How do you feel about it?',
            need: 'What need was fulfilled?',
          },
          examples: {
            action: [
              'Read a book about meditation',
              'Helped a friend move',
              'Learned a new recipe',
              'Called my parents',
              'Took a walk in nature',
            ],
            feeling: [
              'grateful',
              'satisfied',
              'happy',
              'peaceful',
              'inspired',
              'energized',
              'loving',
            ],
            need: [
              'growth',
              'connection',
              'creativity',
              'peace',
              'meaning',
              'vitality',
              'compassion',
            ],
          },
        };
      } else {
        return {
          type: 'other',
          questions: {
            action: 'What did another person do that enriched your life?',
            feeling: 'How do you feel about it?',
            need: 'What need was fulfilled?',
          },
          examples: {
            action: [
              'Asked how I was feeling',
              'Helped with household work',
              'Shared a warm smile',
              'Listened to my concerns',
              'Invited me to their family table',
            ],
            feeling: [
              'grateful',
              'loved',
              'understood',
              'supported',
              'valued',
              'accepted',
              'safe',
            ],
            need: [
              'connection',
              'support',
              'understanding',
              'acceptance',
              'respect',
              'love',
              'safety',
            ],
          },
        };
      }
    }
  };

  const template = getTemplate();

  const getRandomHint = (suggestions: string[]) => {
    if (suggestions.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  };

  const handleSave = () => {
    if (!entry.action || !entry.feeling || !entry.need) {
      Alert.alert(
        settings.language === 'en' ? 'Incomplete Entry' : 'Nebaigtas įrašas',
        settings.language === 'en' 
          ? 'Please fill in all required fields.'
          : 'Prašome užpildyti visus privalomas sritis.'
      );
      return;
    }

    if (entryType === 'other' && !entry.personName?.trim()) {
      Alert.alert(
        settings.language === 'en' ? 'Missing Name' : 'Trūksta vardo',
        settings.language === 'en' 
          ? 'Please enter the person\'s name.'
          : 'Prašome įvesti asmens vardą.'
      );
      return;
    }

    const now = new Date().toISOString();
    const newEntry: GratitudeEntry = {
      id: editingEntry?.id || Date.now().toString(),
      type: entryType,
      title: entry.title || (entryType === 'personal' 
        ? (settings.language === 'en' ? 'Personal Gratitude' : 'Asmeninis dėkingumas')
        : (settings.language === 'en' ? `Gratitude for ${entry.personName}` : `Dėkingumas ${entry.personName}`)),
      action: entry.action!,
      feeling: entry.feeling!,
      need: entry.need!,
      context: entry.context,
      personName: entryType === 'other' ? entry.personName : undefined,
      dateCreated: editingEntry?.dateCreated || now,
      dateModified: now,
      language: settings.language,
    };

    onSave(newEntry);
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={24} color={isDark ? '#F9FAFB' : '#111827'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          {settings.language === 'en' ? 'Gratitude Entry' : 'Dėkingumo įrašas'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            {settings.language === 'en' ? 'Save' : 'Išsaugoti'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ 
          paddingBottom: Platform.OS === 'android' ? 60 + insets.bottom : 60 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Type Selection */}
        <View style={styles.typeSelector}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            {settings.language === 'en' ? 'Entry Type' : 'Įrašo tipas'}
          </Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                entryType === 'personal' && styles.typeButtonActive,
                isDark && styles.typeButtonDark,
                entryType === 'personal' && isDark && styles.typeButtonActiveDark,
              ]}
              onPress={() => setEntryType('personal')}
            >
              <Ionicons 
                name="person" 
                size={20} 
                color={
                  entryType === 'personal' 
                    ? '#FFFFFF' 
                    : (isDark ? '#9CA3AF' : '#6B7280')
                } 
              />
              <Text style={[
                styles.typeButtonText,
                entryType === 'personal' && styles.typeButtonTextActive,
                isDark && styles.typeButtonTextDark,
              ]}>
                {settings.language === 'en' ? 'Personal' : 'Asmeninis'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                entryType === 'other' && styles.typeButtonActive,
                isDark && styles.typeButtonDark,
                entryType === 'other' && isDark && styles.typeButtonActiveDark,
              ]}
              onPress={() => setEntryType('other')}
            >
              <Ionicons 
                name="people" 
                size={20} 
                color={
                  entryType === 'other' 
                    ? '#FFFFFF' 
                    : (isDark ? '#9CA3AF' : '#6B7280')
                } 
              />
              <Text style={[
                styles.typeButtonText,
                entryType === 'other' && styles.typeButtonTextActive,
                isDark && styles.typeButtonTextDark,
              ]}>
                {settings.language === 'en' ? 'About Others' : 'Apie kitus'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Person Name (for 'other' type) */}
        {entryType === 'other' && (
          <View style={styles.inputSection}>
            <Text style={[styles.fieldLabel, isDark && styles.textDark]}>
              {settings.language === 'en' ? 'Person\'s Name *' : 'Asmens vardas *'}
            </Text>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              placeholder={settings.language === 'en' ? 'Enter person\'s name...' : 'Įveskite asmens vardą...'}
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={entry.personName || ''}
              onChangeText={(text) => setEntry(prev => ({ ...prev, personName: text }))}
            />
          </View>
        )}

        {/* Action */}
        <View style={styles.inputSection}>
          <Text style={[styles.fieldLabel, isDark && styles.textDark]}>
            {template.questions.action} *
          </Text>
          <TextInput
            style={[styles.textInput, styles.textInputMultiline, isDark && styles.textInputDark]}
            placeholder={getRandomHint(template.examples.action) || (settings.language === 'en' ? 'Describe what happened...' : 'Aprašykite, kas įvyko...')}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={entry.action || ''}
            onChangeText={(text) => setEntry(prev => ({ ...prev, action: text }))}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Feeling */}
        <View style={styles.inputSection}>
          <View style={styles.fieldHeader}>
            <Text style={[styles.fieldLabel, isDark && styles.textDark]}>
              {template.questions.feeling} *
            </Text>
            <TouchableOpacity
              style={[styles.quickAccessButton, isDark && styles.quickAccessButtonDark]}
              onPress={() => setEmotionSelectorVisible(true)}
            >
              <Ionicons
                name="list"
                size={16}
                color={isDark ? '#9CA3AF' : '#6B7280'}
              />
              <Text style={[styles.quickAccessText, isDark && styles.quickAccessTextDark]}>
                {settings.language === 'en' ? 'Select' : 'Pasirinkti'}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.textInput, isDark && styles.textInputDark]}
            placeholder={`${settings.language === 'en' ? 'e.g.' : 'pvz.'} ${getRandomHint(template.examples.feeling)}`}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={entry.feeling || ''}
            onChangeText={(text) => setEntry(prev => ({ ...prev, feeling: text }))}
          />
        </View>

        {/* Need */}
        <View style={styles.inputSection}>
          <View style={styles.fieldHeader}>
            <Text style={[styles.fieldLabel, isDark && styles.textDark]}>
              {template.questions.need} *
            </Text>
            <TouchableOpacity
              style={[styles.quickAccessButton, isDark && styles.quickAccessButtonDark]}
              onPress={() => setNeedSelectorVisible(true)}
            >
              <Ionicons
                name="list"
                size={16}
                color={isDark ? '#9CA3AF' : '#6B7280'}
              />
              <Text style={[styles.quickAccessText, isDark && styles.quickAccessTextDark]}>
                {settings.language === 'en' ? 'Select' : 'Pasirinkti'}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.textInput, isDark && styles.textInputDark]}
            placeholder={`${settings.language === 'en' ? 'e.g.' : 'pvz.'} ${getRandomHint(template.examples.need)}`}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={entry.need || ''}
            onChangeText={(text) => setEntry(prev => ({ ...prev, need: text }))}
          />
        </View>

        {/* Context (Optional) */}
        <View style={styles.inputSection}>
          <Text style={[styles.fieldLabel, isDark && styles.textDark]}>
            {settings.language === 'en' ? 'Additional Context' : 'Papildomas kontekstas'}
          </Text>
          <TextInput
            style={[styles.textInput, styles.textInputMultiline, isDark && styles.textInputDark]}
            placeholder={settings.language === 'en' ? 'Any additional details...' : 'Bet kokie papildomi duomenys...'}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={entry.context || ''}
            onChangeText={(text) => setEntry(prev => ({ ...prev, context: text }))}
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>

        {/* Title (Optional) */}
        <View style={styles.inputSection}>
          <Text style={[styles.fieldLabel, isDark && styles.textDark]}>
            {settings.language === 'en' ? 'Custom Title' : 'Individualus pavadinimas'}
          </Text>
          <TextInput
            style={[styles.textInput, isDark && styles.textInputDark]}
            placeholder={settings.language === 'en' ? 'Leave empty for auto-generated title' : 'Palikite tuščią automatiniam pavadinimui'}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={entry.title || ''}
            onChangeText={(text) => setEntry(prev => ({ ...prev, title: text }))}
          />
        </View>
      </ScrollView>

      {/* Emotion Selector Modal */}
      <QuickSelector
        type="emotion"
        visible={emotionSelectorVisible}
        onClose={() => setEmotionSelectorVisible(false)}
        onSelect={(value) => {
          setEntry(prev => ({
            ...prev,
            feeling: prev.feeling 
              ? (prev.feeling.trim() + ', ' + value)
              : value
          }));
        }}
        currentValue={entry.feeling}
        isDark={settings.theme === 'dark'}
        language={settings.language}
      />

      {/* Need Selector Modal */}
      <QuickSelector
        type="need"
        visible={needSelectorVisible}
        onClose={() => setNeedSelectorVisible(false)}
        onSelect={(value) => {
          setEntry(prev => ({
            ...prev,
            need: prev.need 
              ? (prev.need.trim() + ', ' + value)
              : value
          }));
        }}
        currentValue={entry.need}
        isDark={settings.theme === 'dark'}
        language={settings.language}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cancelButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  typeSelector: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  textDark: {
    color: '#F9FAFB',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  typeButtonDark: {
    backgroundColor: '#4B5563',
  },
  typeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  typeButtonActiveDark: {
    backgroundColor: '#60A5FA',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  typeButtonTextDark: {
    color: '#F9FAFB',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  inputSection: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  quickAccessButtonDark: {
    backgroundColor: '#4B5563',
  },
  quickAccessText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  quickAccessTextDark: {
    color: '#9CA3AF',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  textInputDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: '#F9FAFB',
  },
  textInputMultiline: {
    minHeight: 80,
  },
});
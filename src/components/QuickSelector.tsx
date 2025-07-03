import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { nvcNeeds, nvcEmotions } from '../data/nvcData';
import { Need, Emotion } from '../types';

interface QuickSelectorProps {
  type: 'emotion' | 'need';
  isDark?: boolean;
  language: 'en' | 'lt';
  onSelect: (value: string) => void;
  onClose: () => void;
  visible: boolean;
  currentValue?: string;
}

export const QuickSelector: React.FC<QuickSelectorProps> = ({
  type,
  isDark = false,
  language,
  onSelect,
  onClose,
  visible,
  currentValue,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const data = useMemo(() => {
    const items = type === 'emotion' ? nvcEmotions : nvcNeeds;
    return items.filter(item => item.language === language);
  }, [type, language]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    return data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const groupedData = useMemo(() => {
    if (type === 'emotion') {
      // Group emotions by needState first, then by category
      const metEmotions: (Need | Emotion)[] = [];
      const unmetEmotions: (Need | Emotion)[] = [];
      
      filteredData.forEach(item => {
        const emotion = item as Emotion;
        if (emotion.needState === 'met') {
          metEmotions.push(emotion);
        } else {
          unmetEmotions.push(emotion);
        }
      });

      // Sort emotions within each group by name
      metEmotions.sort((a, b) => a.name.localeCompare(b.name));
      unmetEmotions.sort((a, b) => a.name.localeCompare(b.name));

      const groups: { [key: string]: (Need | Emotion)[] } = {};
      
      if (metEmotions.length > 0) {
        groups[language === 'lt' ? 'Patenkinti poreikiai' : 'Met Needs'] = metEmotions;
      }
      if (unmetEmotions.length > 0) {
        groups[language === 'lt' ? 'Nepatenkinti poreikiai' : 'Unmet Needs'] = unmetEmotions;
      }

      return groups;
    } else {
      // For needs, group by category as before
      const groups: { [key: string]: (Need | Emotion)[] } = {};
      
      filteredData.forEach(item => {
        const category = typeof item.category === 'string' ? item.category : item.category.toString();
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(item);
      });

      // Sort categories alphabetically
      const sortedCategories = Object.keys(groups).sort();
      const sortedGroups: { [key: string]: (Need | Emotion)[] } = {};
      sortedCategories.forEach(category => {
        sortedGroups[category] = groups[category].sort((a, b) => a.name.localeCompare(b.name));
      });

      return sortedGroups;
    }
  }, [filteredData, type, language]);

  const handleSelect = (item: Need | Emotion) => {
    onSelect(item.name);
    onClose();
  };

  const getTitle = () => {
    if (type === 'emotion') {
      return language === 'lt' ? 'Pasirinkite jausmą' : 'Select Emotion';
    }
    return language === 'lt' ? 'Pasirinkite poreikį' : 'Select Need';
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, isDark && styles.containerDark]}>
        {/* Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <Text style={[styles.title, isDark && styles.titleDark]}>
            {getTitle()}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons
              name="close"
              size={24}
              color={isDark ? '#F9FAFB' : '#111827'}
            />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, isDark && styles.searchBoxDark]}>
            <Ionicons
              name="search"
              size={20}
              color={isDark ? '#9CA3AF' : '#6B7280'}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, isDark && styles.searchInputDark]}
              placeholder={language === 'lt' ? 'Ieškoti...' : 'Search...'}
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={isDark ? '#9CA3AF' : '#6B7280'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'android' ? insets.bottom + 20 : 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {Object.keys(groupedData).length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
                {language === 'lt' ? 'Nerasta rezultatų' : 'No results found'}
              </Text>
            </View>
          ) : (
            Object.entries(groupedData).map(([category, items]) => {
              const isMetNeeds = type === 'emotion' && (category === 'Patenkinti poreikiai' || category === 'Met Needs');
              const isUnmetNeeds = type === 'emotion' && (category === 'Nepatenkinti poreikiai' || category === 'Unmet Needs');
              
              return (
                <View key={category} style={styles.categorySection}>
                  <Text style={[
                    styles.categoryTitle, 
                    isDark && styles.categoryTitleDark,
                    isMetNeeds && styles.categoryTitleMet,
                    isMetNeeds && isDark && styles.categoryTitleMetDark,
                    isUnmetNeeds && styles.categoryTitleUnmet,
                    isUnmetNeeds && isDark && styles.categoryTitleUnmetDark,
                  ]}>
                    {isMetNeeds && '😊 '}
                    {isUnmetNeeds && '😔 '}
                    {category}
                  </Text>
                  <View style={styles.itemsGrid}>
                    {items.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.itemButton,
                          isDark && styles.itemButtonDark,
                          currentValue === item.name && styles.itemButtonSelected,
                          currentValue === item.name && isDark && styles.itemButtonSelectedDark,
                          isMetNeeds && styles.itemButtonMet,
                          isMetNeeds && isDark && styles.itemButtonMetDark,
                          isUnmetNeeds && styles.itemButtonUnmet,
                          isUnmetNeeds && isDark && styles.itemButtonUnmetDark,
                        ]}
                        onPress={() => handleSelect(item)}
                      >
                        <Text
                          style={[
                            styles.itemText,
                            isDark && styles.itemTextDark,
                            currentValue === item.name && styles.itemTextSelected,
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </Modal>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerDark: {
    backgroundColor: '#374151',
    borderBottomColor: '#4B5563',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  titleDark: {
    color: '#F9FAFB',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchBoxDark: {
    backgroundColor: '#4B5563',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
  searchInputDark: {
    color: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyTextDark: {
    color: '#9CA3AF',
  },
  categorySection: {
    marginVertical: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
  },
  categoryTitleDark: {
    color: '#D1D5DB',
    backgroundColor: '#374151',
  },
  categoryTitleMet: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  categoryTitleMetDark: {
    backgroundColor: '#451A03',
    color: '#FCD34D',
  },
  categoryTitleUnmet: {
    backgroundColor: '#FDF2F8',
    color: '#BE185D',
  },
  categoryTitleUnmetDark: {
    backgroundColor: '#831843',
    color: '#F9A8D4',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  itemButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemButtonDark: {
    backgroundColor: '#4B5563',
    borderColor: '#6B7280',
  },
  itemButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  itemButtonSelectedDark: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
  },
  itemButtonMet: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
  },
  itemButtonMetDark: {
    backgroundColor: '#451A03',
    borderColor: '#FBBF24',
  },
  itemButtonUnmet: {
    backgroundColor: '#FDF2F8',
    borderColor: '#EC4899',
  },
  itemButtonUnmetDark: {
    backgroundColor: '#831843',
    borderColor: '#F472B6',
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  itemTextDark: {
    color: '#F9FAFB',
  },
  itemTextSelected: {
    color: '#FFFFFF',
  },
});
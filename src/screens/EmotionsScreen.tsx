import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { CategorySection } from '../components/CategorySection';
import { DetailModal } from '../components/DetailModal';
import { nvcEmotions } from '../data/nvcData';
import { Need, Emotion } from '../types';
import { useApp } from '../context/AppContext';

const translations = {
  en: {
    all: 'All',
    needsMet: 'Needs Met ✓',
    needsUnmet: 'Needs Unmet ✗',
    searchPlaceholder: 'Search emotions...',
    stats: (count: number, categories: number) => `${count} emotions across ${categories} categories`,
    emptyState: 'No emotions found matching your search.',
  },
  lt: {
    all: 'Visi',
    needsMet: 'Patenkinti poreikiai ✓',
    needsUnmet: 'Neatliepti poreikiai ✗',
    searchPlaceholder: 'Ieškoti emocijų...',
    stats: (count: number, categories: number) => `${count} emocijos per ${categories} kategorijas`,
    emptyState: 'Nerasta jokių emocijų, atitinkančių jūsų paiešką.',
  },
};

export const EmotionsScreen: React.FC = () => {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'met' | 'unmet'>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const lang = settings.language as keyof typeof translations;
  const t = translations[lang];

  const { groupedEmotions, totalCount, metCount, unmetCount } = useMemo(() => {
    let filtered = nvcEmotions;

    // Filter by language preference
    filtered = filtered.filter((emotion) => emotion.language === settings.language);

    // Filter by need state
    if (filterBy !== 'all') {
      filtered = filtered.filter((emotion) => emotion.needState === filterBy);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((emotion) =>
        emotion.name.toLowerCase().includes(query) ||
        emotion.description.toLowerCase().includes(query) ||
        emotion.relatedFeelings.some((feeling) => feeling.toLowerCase().includes(query)) ||
        emotion.context?.toLowerCase().includes(query)
      );
    }

    // Group by category
    const grouped = filtered.reduce((acc, emotion) => {
      const category = emotion.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(emotion);
      return acc;
    }, {} as Record<string, Emotion[]>);

    // Sort items within each category
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    // Count totals
    const met = nvcEmotions.filter(e => e.needState === 'met' && e.language === settings.language);
    const unmet = nvcEmotions.filter(e => e.needState === 'unmet' && e.language === settings.language);

    return {
      groupedEmotions: grouped,
      totalCount: filtered.length,
      metCount: met.length,
      unmetCount: unmet.length
    };
  }, [searchQuery, filterBy, settings.language]);

  const handleEmotionPress = (item: Need | Emotion) => {
    const emotion = item as Emotion;
    setSelectedEmotion(emotion);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEmotion(null);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
        {t.emptyState}
      </Text>
    </View>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      {[
        { key: 'all', label: t.all, count: totalCount },
        { key: 'met', label: t.needsMet, count: metCount },
        { key: 'unmet', label: t.needsUnmet, count: unmetCount },
      ].map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            filterBy === filter.key && styles.filterButtonActive,
            isDark && styles.filterButtonDark,
            filterBy === filter.key && isDark && styles.filterButtonActiveDark,
          ]}
          onPress={() => setFilterBy(filter.key as typeof filterBy)}
        >
          <Text style={[
            styles.filterButtonText,
            filterBy === filter.key && styles.filterButtonTextActive,
            isDark && styles.filterButtonTextDark,
            filterBy === filter.key && isDark && styles.filterButtonTextActiveDark,
          ]}>
            {filter.label}
          </Text>
          <Text style={[
            styles.filterButtonCount,
            filterBy === filter.key && styles.filterButtonCountActive,
            isDark && styles.filterButtonCountDark,
          ]}>
            {filter.count}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t.searchPlaceholder}
        isDark={isDark}
      />
      
      {renderFilterButtons()}

      <View style={styles.statsContainer}>
        <Text style={[styles.statsText, isDark && styles.statsTextDark]}>
          {t.stats(totalCount, Object.keys(groupedEmotions).length)}
        </Text>
      </View>

      {totalCount === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }
          ]}
        >
          {Object.entries(groupedEmotions)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, emotions]) => (
              <CategorySection
                key={category}
                title={category}
                items={emotions}
                type="emotion"
                onItemPress={handleEmotionPress}
                isDark={isDark}
              />
            ))}
        </ScrollView>
      )}
      
      <DetailModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        item={selectedEmotion}
        type="emotion"
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonDark: {
    backgroundColor: '#4B5563',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filterButtonActiveDark: {
    backgroundColor: '#60A5FA',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  filterButtonTextDark: {
    color: '#F9FAFB',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  filterButtonTextActiveDark: {
    color: '#111827',
  },
  filterButtonCount: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  filterButtonCountDark: {
    color: '#9CA3AF',
  },
  filterButtonCountActive: {
    color: '#E5E7EB',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  statsTextDark: {
    color: '#9CA3AF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  emptyTextDark: {
    color: '#9CA3AF',
  },
});
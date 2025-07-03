import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { CategorySection } from '../components/CategorySection';
import { DetailModal } from '../components/DetailModal';
import { nvcNeeds } from '../data/nvcData';
import { Need, Emotion, NeedCategory } from '../types';
import { useApp } from '../context/AppContext';

export const NeedsScreen: React.FC = () => {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { groupedNeeds, totalCount } = useMemo(() => {
    let filtered = nvcNeeds;

    // Filter by language preference
    filtered = filtered.filter((need) => need.language === settings.language);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((need) =>
        need.name.toLowerCase().includes(query) ||
        need.definition.toLowerCase().includes(query) ||
        need.examples.some((example) => example.toLowerCase().includes(query)) ||
        need.synonyms?.some((synonym) => synonym.toLowerCase().includes(query))
      );
    }

    // Group by category
    const grouped = filtered.reduce((acc, need) => {
      const category = need.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(need);
      return acc;
    }, {} as Record<string, Need[]>);

    // Sort items within each category
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return {
      groupedNeeds: grouped,
      totalCount: filtered.length
    };
  }, [searchQuery, settings.language]);

  const handleNeedPress = (item: Need | Emotion) => {
    const need = item as Need;
    setSelectedNeed(need);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedNeed(null);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
        No needs found matching your search.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search needs..."
        isDark={isDark}
      />
      
      <View style={styles.statsContainer}>
        <Text style={[styles.statsText, isDark && styles.statsTextDark]}>
          {totalCount} needs across {Object.keys(groupedNeeds).length} categories
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
          {Object.entries(groupedNeeds)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, needs]) => (
              <CategorySection
                key={category}
                title={category}
                items={needs}
                type="need"
                onItemPress={handleNeedPress}
                isDark={isDark}
              />
            ))}
        </ScrollView>
      )}
      
      <DetailModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        item={selectedNeed}
        type="need"
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
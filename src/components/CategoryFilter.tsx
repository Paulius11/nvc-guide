import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isDark?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isDark = false,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.chip,
          selectedCategory === null && styles.chipSelected,
          isDark && styles.chipDark,
          selectedCategory === null && isDark && styles.chipSelectedDark,
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text
          style={[
            styles.chipText,
            selectedCategory === null && styles.chipTextSelected,
            isDark && styles.chipTextDark,
            selectedCategory === null && isDark && styles.chipTextSelectedDark,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.chip,
            selectedCategory === category && styles.chipSelected,
            isDark && styles.chipDark,
            selectedCategory === category && isDark && styles.chipSelectedDark,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.chipText,
              selectedCategory === category && styles.chipTextSelected,
              isDark && styles.chipTextDark,
              selectedCategory === category && isDark && styles.chipTextSelectedDark,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipDark: {
    backgroundColor: '#4B5563',
  },
  chipSelected: {
    backgroundColor: '#60A5FA',
  },
  chipSelectedDark: {
    backgroundColor: '#3B82F6',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  chipTextDark: {
    color: '#F9FAFB',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  chipTextSelectedDark: {
    color: '#FFFFFF',
  },
});
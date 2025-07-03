import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Need } from '../types';
import { useApp } from '../context/AppContext';
import { getCategoryVisual } from '../utils/categoryVisuals';

interface NeedCardProps {
  need: Need;
  onPress: () => void;
  isDark?: boolean;
}

export const NeedCard: React.FC<NeedCardProps> = ({ need, onPress, isDark = false }) => {
  const { isFavorite, addFavorite, removeFavorite } = useApp();
  const isItemFavorite = isFavorite(need.id, 'need');
  const categoryVisual = getCategoryVisual(need.category, 'need');

  const toggleFavorite = () => {
    if (isItemFavorite) {
      removeFavorite(need.id, 'need');
    } else {
      addFavorite(need.id, 'need');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, isDark && styles.cardDark]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryVisual.color }]}>
            <Text style={styles.categoryIcon}>{categoryVisual.icon}</Text>
          </View>
          <Text style={[styles.title, isDark && styles.titleDark]}>{need.name}</Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isItemFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isItemFavorite ? '#EF4444' : (isDark ? '#9CA3AF' : '#6B7280')}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.category, isDark && styles.categoryDark]}>{need.category}</Text>
      <Text style={[styles.definition, isDark && styles.definitionDark]} numberOfLines={2}>
        {need.definition}
      </Text>
      
      <View style={styles.examplesContainer}>
        <Text style={[styles.examplesLabel, isDark && styles.examplesLabelDark]}>Examples:</Text>
        <Text style={[styles.examples, isDark && styles.examplesDark]} numberOfLines={1}>
          {need.examples.slice(0, 2).join(', ')}
          {need.examples.length > 2 ? '...' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: '#374151',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  titleDark: {
    color: '#F9FAFB',
  },
  favoriteButton: {
    padding: 4,
    marginLeft: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6366F1',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryDark: {
    color: '#A5B4FC',
  },
  definition: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  definitionDark: {
    color: '#D1D5DB',
  },
  examplesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  examplesLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 6,
  },
  examplesLabelDark: {
    color: '#9CA3AF',
  },
  examples: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
    fontStyle: 'italic',
  },
  examplesDark: {
    color: '#9CA3AF',
  },
});
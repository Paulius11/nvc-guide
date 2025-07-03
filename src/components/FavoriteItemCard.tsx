import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Need, Emotion } from '../types';
import { useApp } from '../context/AppContext';
import { getCategoryVisual } from '../utils/categoryVisuals';

type FavoriteItemData = (Need | Emotion) & { itemType: 'need' | 'emotion' };

interface FavoriteItemCardProps {
  item: FavoriteItemData;
  onPress: () => void;
  isDark?: boolean;
}

export const FavoriteItemCard: React.FC<FavoriteItemCardProps> = ({ 
  item, 
  onPress, 
  isDark = false 
}) => {
  const { isFavorite, removeFavorite, settings } = useApp();
  const isItemFavorite = isFavorite(item.id, item.itemType);
  const categoryVisual = getCategoryVisual(item.category, item.itemType);

  const toggleFavorite = () => {
    if (isItemFavorite) {
      removeFavorite(item.id, item.itemType);
    }
  };

  const getItemDescription = () => {
    if (item.itemType === 'need') {
      const need = item as Need;
      // Clean up the redundant text
      let cleanDefinition = need.definition
        .replace(/The need for .+ - a fundamental human need according to Nonviolent Communication\./i, '')
        .replace(/Poreikis .+ - svarbus žmogaus poreikis pagal NVC\./i, '')
        .replace(/^[,\s-]+/, '') // Remove leading punctuation
        .trim();
      
      return cleanDefinition || need.name;
    } else {
      const emotion = item as Emotion;
      return emotion.description;
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
          <View style={styles.textContent}>
            <Text style={[styles.title, isDark && styles.titleDark]}>{item.name}</Text>
            <Text style={[styles.category, isDark && styles.categoryDark]}>
              {item.category}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name="heart"
            size={20}
            color="#EF4444"
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.description, isDark && styles.descriptionDark]} numberOfLines={2}>
        {getItemDescription()}
      </Text>

      {item.itemType === 'emotion' && 'needState' in item && (
        <View style={styles.metaInfo}>
          <View style={[
            styles.needStateBadge,
            item.needState === 'met' ? styles.metBadge : styles.unmetBadge
          ]}>
            <Text style={styles.needStateText}>
              {item.needState === 'met' 
                ? (settings.language === 'lt' ? '✓ Patenkintas' : '✓ Met')
                : (settings.language === 'lt' ? '✗ Nepatenkintas' : '✗ Unmet')
              }
            </Text>
          </View>
        </View>
      )}
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
    shadowOpacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    fontSize: 20,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  titleDark: {
    color: '#F9FAFB',
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryDark: {
    color: '#9CA3AF',
  },
  favoriteButton: {
    padding: 4,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  descriptionDark: {
    color: '#D1D5DB',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  needStateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metBadge: {
    backgroundColor: '#D1FAE5',
  },
  unmetBadge: {
    backgroundColor: '#FEE2E2',
  },
  needStateText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
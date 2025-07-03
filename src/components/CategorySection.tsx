import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Need, Emotion } from '../types';
import { useApp } from '../context/AppContext';
import { getCategoryVisual } from '../utils/categoryVisuals';

interface CategorySectionProps {
  title: string;
  items: (Need | Emotion)[];
  type: 'need' | 'emotion';
  onItemPress: (item: Need | Emotion) => void;
  isDark?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
  type,
  onItemPress,
  isDark = false,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useApp();
  const { width } = Dimensions.get('window');
  
  // Responsive column count based on screen width
  const getColumnCount = () => {
    if (width > 768) return 5; // Tablet/desktop: 5 columns
    if (width > 480) return 3; // Large phone: 3 columns  
    return 2; // Small phone: 2 columns
  };
  
  const columnCount = getColumnCount();
  const itemWidthPercent = (100 / columnCount) - 2;
  const categoryVisual = getCategoryVisual(title, type);

  const toggleFavorite = (item: Need | Emotion) => {
    if (isFavorite(item.id, type)) {
      removeFavorite(item.id, type);
    } else {
      addFavorite(item.id, type);
    }
  };

  if (items.length === 0) return null;

  return (
    <View style={[styles.section, isDark && styles.sectionDark]}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: categoryVisual.color }]}>
          <Text style={styles.categoryEmoji}>{categoryVisual.icon}</Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryTitle, isDark && styles.categoryTitleDark]}>
            {title}
          </Text>
          <Text style={[styles.itemCount, isDark && styles.itemCountDark]}>
            {items.length} {type === 'need' ? 'needs' : 'emotions'}
          </Text>
        </View>
      </View>
      
      <View style={styles.gridContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.itemCard, 
              isDark && styles.itemCardDark,
              { width: `${itemWidthPercent}%` }
            ]}
            onPress={() => onItemPress(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.itemName, isDark && styles.itemNameDark]} numberOfLines={2}>
              {item.name}
            </Text>
            
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => toggleFavorite(item)}
            >
              <Text style={styles.favoriteText}>
                {isFavorite(item.id, type) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>

            {type === 'emotion' && 'needState' in item && (
              <View style={[
                styles.stateBadge,
                item.needState === 'met' ? styles.metBadge : styles.unmetBadge
              ]}>
                <Text style={styles.stateBadgeText}>
                  {item.needState === 'met' ? '✓' : '✗'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
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
  sectionDark: {
    backgroundColor: '#374151',
    shadowOpacity: 0.3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  categoryTitleDark: {
    color: '#F9FAFB',
  },
  itemCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  itemCountDark: {
    color: '#9CA3AF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemCard: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 6,
    position: 'relative',
    minHeight: 50,
    justifyContent: 'center',
    marginVertical: 2,
  },
  itemCardDark: {
    backgroundColor: '#4B5563',
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    paddingRight: 16,
    lineHeight: 16,
  },
  itemNameDark: {
    color: '#F9FAFB',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 10,
  },
  stateBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metBadge: {
    backgroundColor: '#10B981',
  },
  unmetBadge: {
    backgroundColor: '#F59E0B',
  },
  stateBadgeText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
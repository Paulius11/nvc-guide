import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Emotion } from '../types';
import { useApp } from '../context/AppContext';
import { getCategoryVisual, getIntensityColor, getNeedStateColor } from '../utils/categoryVisuals';

interface EmotionCardProps {
  emotion: Emotion;
  onPress: () => void;
  isDark?: boolean;
}

export const EmotionCard: React.FC<EmotionCardProps> = ({ emotion, onPress, isDark = false }) => {
  const { isFavorite, addFavorite, removeFavorite } = useApp();
  const isItemFavorite = isFavorite(emotion.id, 'emotion');
  const categoryVisual = getCategoryVisual(emotion.category, 'emotion');

  const toggleFavorite = () => {
    if (isItemFavorite) {
      removeFavorite(emotion.id, 'emotion');
    } else {
      addFavorite(emotion.id, 'emotion');
    }
  };


  const renderIntensityDots = () => {
    if (!emotion.intensity) return null;
    
    return (
      <View style={styles.intensityContainer}>
        {[...Array(10)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.intensityDot,
              {
                backgroundColor: index < emotion.intensity! 
                  ? getIntensityColor(emotion.intensity, isDark) 
                  : (isDark ? '#4B5563' : '#E5E7EB')
              }
            ]}
          />
        ))}
      </View>
    );
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
          <Text style={[styles.title, isDark && styles.titleDark]}>{emotion.name}</Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isItemFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isItemFavorite ? '#EF4444' : (isDark ? '#9CA3AF' : '#6B7280')}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.metaContainer}>
        <Text style={[styles.category, isDark && styles.categoryDark]}>{emotion.category}</Text>
        {renderIntensityDots()}
      </View>
      
      <Text style={[styles.description, isDark && styles.descriptionDark]} numberOfLines={2}>
        {emotion.description}
      </Text>
      
      <View style={styles.feelingsContainer}>
        <Text style={[styles.feelingsLabel, isDark && styles.feelingsLabelDark]}>Related feelings:</Text>
        <Text style={[styles.feelings, isDark && styles.feelingsDark]} numberOfLines={1}>
          {emotion.relatedFeelings.slice(0, 3).join(', ')}
          {emotion.relatedFeelings.length > 3 ? '...' : ''}
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
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EC4899',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryDark: {
    color: '#F9A8D4',
  },
  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 2,
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
  feelingsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  feelingsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 6,
  },
  feelingsLabelDark: {
    color: '#9CA3AF',
  },
  feelings: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
    fontStyle: 'italic',
  },
  feelingsDark: {
    color: '#9CA3AF',
  },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Need, Emotion } from '../types';
import { useApp } from '../context/AppContext';

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  item: Need | Emotion | null;
  type: 'need' | 'emotion';
}

const translations = {
  en: {
    close: 'Close',
    definition: 'Definition',
    examples: 'Examples',
    synonyms: 'Synonyms',
    description: 'Description',
    relatedFeelings: 'Related Feelings',
    context: 'Context',
    category: 'Category',
    intensity: 'Intensity',
    needState: 'Need State',
    needsMet: 'Needs Met',
    needsUnmet: 'Needs Unmet',
    noData: 'No data available',
  },
  lt: {
    close: 'Užverti',
    definition: 'Apibrėžimas',
    examples: 'Pavyzdžiai',
    synonyms: 'Sinonimai',
    description: 'Aprašymas',
    relatedFeelings: 'Susiję jausmai',
    context: 'Kontekstas',
    category: 'Kategorija',
    intensity: 'Intensyvumas',
    needState: 'Poreikio būsena',
    needsMet: 'Poreikiai patenkinti',
    needsUnmet: 'Poreikiai nepatenkenti',
    noData: 'Duomenų nėra',
  },
};

export const DetailModal: React.FC<DetailModalProps> = ({
  visible,
  onClose,
  item,
  type,
}) => {
  const { settings, addFavorite, removeFavorite, isFavorite } = useApp();
  const isDark = settings.theme === 'dark';
  const lang = settings.language as keyof typeof translations;
  const t = translations[lang];

  if (!item) return null;

  const isNeed = type === 'need';
  const need = isNeed ? (item as Need) : null;
  const emotion = !isNeed ? (item as Emotion) : null;
  const isItemFavorite = isFavorite(item.id, type);

  const handleToggleFavorite = () => {
    if (isItemFavorite) {
      removeFavorite(item.id, type);
    } else {
      addFavorite(item.id, type);
    }
  };

  const renderIntensityStars = (intensity?: number) => {
    if (!intensity || intensity < 1 || intensity > 10 || !Number.isInteger(intensity)) return null;
    
    // Clamp intensity to 1-5 range for star display
    const clampedIntensity = Math.min(Math.max(Math.floor(intensity / 2), 1), 5);
    const stars = '★'.repeat(clampedIntensity) + '☆'.repeat(5 - clampedIntensity);
    
    return (
      <Text style={[styles.intensityText, isDark && styles.intensityTextDark]}>
        {stars}
      </Text>
    );
  };

  const renderSection = (title: string, content: string | string[] | undefined, isArray = false) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          {title}
        </Text>
        {isArray ? (
          <View style={styles.listContainer}>
            {(content as string[]).map((item, index) => (
              <Text key={index} style={[styles.listItem, isDark && styles.listItemDark]}>
                • {item}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={[styles.content, isDark && styles.contentDark]}>
            {content as string}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        
        {/* Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={[styles.closeButton, isDark && styles.closeButtonDark]}
              onPress={onClose}
            >
              <Text style={[styles.closeButtonText, isDark && styles.closeButtonTextDark]}>
                {t.close}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.favoriteButton, isDark && styles.favoriteButtonDark]}
              onPress={handleToggleFavorite}
            >
              <Text style={styles.favoriteIcon}>
                {isItemFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Category Badge */}
          <View style={[styles.categoryBadge, isDark && styles.categoryBadgeDark]}>
            <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>
              {item.category}
            </Text>
          </View>

          {/* Need-specific content */}
          {need && (
            <>
              {renderSection(t.definition, need.definition)}
              {renderSection(t.examples, need.examples, true)}
              {renderSection(t.synonyms, need.synonyms, true)}
            </>
          )}

          {/* Emotion-specific content */}
          {emotion && (
            <>
              {renderSection(t.description, emotion.description)}
              {renderSection(t.relatedFeelings, emotion.relatedFeelings, true)}
              {renderSection(t.context, emotion.context)}
              
              {/* Need State */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
                  {t.needState}
                </Text>
                <View style={[
                  styles.needStateBadge,
                  emotion.needState === 'met' ? styles.needStateMetBadge : styles.needStateUnmetBadge,
                  isDark && styles.needStateBadgeDark
                ]}>
                  <Text style={[
                    styles.needStateText,
                    emotion.needState === 'met' ? styles.needStateMetText : styles.needStateUnmetText
                  ]}>
                    {emotion.needState === 'met' ? t.needsMet : t.needsUnmet}
                  </Text>
                </View>
              </View>

              {/* Intensity */}
              {emotion.intensity && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
                    {t.intensity}
                  </Text>
                  <View style={styles.intensityContainer}>
                    {renderIntensityStars(emotion.intensity)}
                    <Text style={[styles.intensityValue, isDark && styles.intensityValueDark]}>
                      {emotion.intensity}/5
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}

        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerDark: {
    borderBottomColor: '#374151',
    backgroundColor: '#111827',
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  closeButtonDark: {
    backgroundColor: '#4B5563',
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  closeButtonTextDark: {
    color: '#F9FAFB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  titleDark: {
    color: '#F9FAFB',
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteButtonDark: {
    backgroundColor: 'transparent',
  },
  favoriteIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  categoryBadgeDark: {
    backgroundColor: '#1E3A8A',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1D4ED8',
  },
  categoryTextDark: {
    color: '#93C5FD',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sectionTitleDark: {
    color: '#F9FAFB',
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  contentDark: {
    color: '#D1D5DB',
  },
  listContainer: {
    marginLeft: 8,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 4,
  },
  listItemDark: {
    color: '#D1D5DB',
  },
  needStateBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  needStateBadgeDark: {
    opacity: 0.9,
  },
  needStateMetBadge: {
    backgroundColor: '#DCFCE7',
  },
  needStateUnmetBadge: {
    backgroundColor: '#FEE2E2',
  },
  needStateText: {
    fontSize: 13,
    fontWeight: '500',
  },
  needStateMetText: {
    color: '#166534',
  },
  needStateUnmetText: {
    color: '#991B1B',
  },
  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityText: {
    fontSize: 18,
    color: '#F59E0B',
    marginRight: 8,
  },
  intensityTextDark: {
    color: '#FBBF24',
  },
  intensityValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  intensityValueDark: {
    color: '#9CA3AF',
  },
});
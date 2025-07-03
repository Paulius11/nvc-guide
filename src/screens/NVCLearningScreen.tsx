import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { NVCExerciseCard } from '../components/NVCExerciseCard';
import { nvcLearningSections, type LearningSection, type Exercise } from '../data/nvcLearningData';


export const NVCLearningScreen: React.FC = () => {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  const isLithuanian = settings.language === 'lt';
  
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleExerciseComplete = (exerciseId: string, _response: string) => {
    setCompletedExercises(prev => [...prev, exerciseId]);
  };

  const openVideo = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        isLithuanian ? 'Klaida' : 'Error',
        isLithuanian ? 'Nepavyko atidaryti video' : 'Cannot open video'
      );
    }
  };

  const renderLearningSection = (section: LearningSection) => {
    const isExpanded = expandedSections.includes(section.id);
    
    return (
      <View key={section.id} style={[styles.sectionCard, isDark && styles.sectionCardDark]}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}
        >
          <View style={styles.sectionTitleRow}>
            <Ionicons 
              name={section.icon} 
              size={24} 
              color={isDark ? '#60A5FA' : '#3B82F6'} 
            />
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              {isLithuanian ? section.title.lt : section.title.en}
            </Text>
          </View>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={isDark ? '#9CA3AF' : '#6B7280'} 
          />
        </TouchableOpacity>

        <Text style={[styles.sectionDescription, isDark && styles.sectionDescriptionDark]}>
          {isLithuanian ? section.description.lt : section.description.en}
        </Text>

        {section.videoUrl && (
          <TouchableOpacity
            style={styles.videoButton}
            onPress={() => openVideo(section.videoUrl!)}
          >
            <Ionicons name="play-circle" size={20} color="#FFFFFF" />
            <Text style={styles.videoButtonText}>
              {isLithuanian ? 'Žiūrėti video' : 'Watch Video'}
            </Text>
          </TouchableOpacity>
        )}

        {isExpanded && (
          <View style={styles.sectionContent}>
            <Text style={[styles.contentText, isDark && styles.contentTextDark]}>
              {isLithuanian ? section.content.lt : section.content.en}
            </Text>

            {section.exercises && section.exercises.length > 0 && (
              <View style={styles.exercisesContainer}>
                <Text style={[styles.exercisesTitle, isDark && styles.exercisesTitleDark]}>
                  {isLithuanian ? 'Pratimai' : 'Exercises'}
                </Text>
                {section.exercises.map(exercise => (
                  <NVCExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    isLithuanian={isLithuanian}
                    isDark={isDark}
                    completed={completedExercises.includes(exercise.id)}
                    onComplete={handleExerciseComplete}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          {isLithuanian ? 'NVC mokymasis' : 'NVC Learning'}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Platform.OS === 'android' ? 120 + insets.bottom : 100 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.introText, isDark && styles.introTextDark]}>
          {isLithuanian 
            ? 'Išmokite smurtą neigiančio bendravimo (NVC) principus ir praktikuokite juos per interaktyvius pratimus.'
            : 'Learn the principles of Nonviolent Communication (NVC) and practice them through interactive exercises.'
          }
        </Text>

        {nvcLearningSections.map(renderLearningSection)}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  introText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  introTextDark: {
    color: '#9CA3AF',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionCardDark: {
    backgroundColor: '#374151',
    shadowOpacity: 0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  sectionTitleDark: {
    color: '#F9FAFB',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  sectionDescriptionDark: {
    color: '#9CA3AF',
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  videoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  contentTextDark: {
    color: '#D1D5DB',
  },
  exercisesContainer: {
    marginTop: 16,
    paddingBottom: 12,
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  exercisesTitleDark: {
    color: '#F9FAFB',
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: string;
  title: { en: string; lt: string };
  description: { en: string; lt: string };
  type: 'observation' | 'feeling' | 'need' | 'request';
  prompt: { en: string; lt: string };
  examples?: { en: string[]; lt: string[] };
  tips?: { en: string[]; lt: string[] };
}

interface NVCExerciseCardProps {
  exercise: Exercise;
  isLithuanian: boolean;
  isDark: boolean;
  completed: boolean;
  onComplete: (exerciseId: string, response: string) => void;
}

export const NVCExerciseCard: React.FC<NVCExerciseCardProps> = ({
  exercise,
  isLithuanian,
  isDark,
  completed,
  onComplete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleComplete = () => {
    if (!response.trim()) {
      Alert.alert(
        isLithuanian ? 'Užpildykite atsakymą' : 'Please fill in your response',
        isLithuanian ? 'Parašykite savo atsakymą prieš pažymint kaip užbaigtą' : 'Write your response before marking as complete'
      );
      return;
    }
    onComplete(exercise.id, response);
    setShowModal(false);
    setResponse('');
  };

  const getTypeIcon = () => {
    switch (exercise.type) {
      case 'observation': return 'eye';
      case 'feeling': return 'heart';
      case 'need': return 'shield-checkmark';
      case 'request': return 'chatbubble';
      default: return 'help-circle';
    }
  };

  const getTypeColor = () => {
    switch (exercise.type) {
      case 'observation': return '#3B82F6';
      case 'feeling': return '#EC4899';
      case 'need': return '#10B981';
      case 'request': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <>
      <View style={[styles.exerciseCard, isDark && styles.exerciseCardDark]}>
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseTitleRow}>
            <View style={[styles.typeIndicator, { backgroundColor: getTypeColor() }]}>
              <Ionicons name={getTypeIcon()} size={16} color="#FFFFFF" />
            </View>
            <Text style={[styles.exerciseTitle, isDark && styles.exerciseTitleDark]}>
              {isLithuanian ? exercise.title.lt : exercise.title.en}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={[
              styles.exerciseButton,
              completed && styles.exerciseButtonCompleted
            ]}
          >
            {completed ? (
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            ) : (
              <Text style={styles.exerciseButtonText}>
                {isLithuanian ? 'Pradėti' : 'Start'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={[styles.exerciseDescription, isDark && styles.exerciseDescriptionDark]}>
          {isLithuanian ? exercise.description.lt : exercise.description.en}
        </Text>
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, isDark && styles.modalTitleDark]}>
              {isLithuanian ? exercise.title.lt : exercise.title.en}
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={isDark ? '#9CA3AF' : '#6B7280'} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={[styles.promptCard, isDark && styles.promptCardDark]}>
              <Text style={[styles.promptText, isDark && styles.promptTextDark]}>
                {isLithuanian ? exercise.prompt.lt : exercise.prompt.en}
              </Text>
            </View>

            {exercise.examples && (
              <View style={styles.helpSection}>
                <TouchableOpacity
                  style={styles.helpButton}
                  onPress={() => setShowExamples(!showExamples)}
                >
                  <Ionicons name="bulb" size={20} color="#F59E0B" />
                  <Text style={[styles.helpButtonText, isDark && styles.helpButtonTextDark]}>
                    {isLithuanian ? 'Pavyzdžiai' : 'Examples'}
                  </Text>
                  <Ionicons 
                    name={showExamples ? 'chevron-up' : 'chevron-down'} 
                    size={16} 
                    color={isDark ? '#9CA3AF' : '#6B7280'} 
                  />
                </TouchableOpacity>
                
                {showExamples && (
                  <View style={[styles.helpContent, isDark && styles.helpContentDark]}>
                    {(isLithuanian ? exercise.examples.lt : exercise.examples.en).map((example, index) => (
                      <Text key={index} style={[styles.helpItem, isDark && styles.helpItemDark]}>
                        • {example}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            {exercise.tips && (
              <View style={styles.helpSection}>
                <TouchableOpacity
                  style={styles.helpButton}
                  onPress={() => setShowTips(!showTips)}
                >
                  <Ionicons name="help-circle" size={20} color="#10B981" />
                  <Text style={[styles.helpButtonText, isDark && styles.helpButtonTextDark]}>
                    {isLithuanian ? 'Patarimai' : 'Tips'}
                  </Text>
                  <Ionicons 
                    name={showTips ? 'chevron-up' : 'chevron-down'} 
                    size={16} 
                    color={isDark ? '#9CA3AF' : '#6B7280'} 
                  />
                </TouchableOpacity>
                
                {showTips && (
                  <View style={[styles.helpContent, isDark && styles.helpContentDark]}>
                    {(isLithuanian ? exercise.tips.lt : exercise.tips.en).map((tip, index) => (
                      <Text key={index} style={[styles.helpItem, isDark && styles.helpItemDark]}>
                        • {tip}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            <View style={styles.inputSection}>
              <Text style={[styles.inputLabel, isDark && styles.inputLabelDark]}>
                {isLithuanian ? 'Jūsų atsakymas:' : 'Your response:'}
              </Text>
              <TextInput
                style={[styles.textInput, isDark && styles.textInputDark]}
                value={response}
                onChangeText={setResponse}
                multiline
                numberOfLines={4}
                placeholder={isLithuanian ? 'Parašykite savo atsakymą čia...' : 'Write your response here...'}
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, isDark && styles.modalFooterDark]}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>
                {isLithuanian ? 'Atšaukti' : 'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.completeButton]}
              onPress={handleComplete}
            >
              <Text style={styles.completeButtonText}>
                {isLithuanian ? 'Užbaigti' : 'Complete'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exerciseCardDark: {
    backgroundColor: '#4B5563',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exerciseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  exerciseTitleDark: {
    color: '#F9FAFB',
  },
  exerciseDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  exerciseDescriptionDark: {
    color: '#D1D5DB',
  },
  exerciseButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  exerciseButtonCompleted: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  exerciseButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalContainerDark: {
    backgroundColor: '#111827',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  modalTitleDark: {
    color: '#F9FAFB',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  promptCardDark: {
    backgroundColor: '#374151',
    borderLeftColor: '#60A5FA',
  },
  promptText: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  promptTextDark: {
    color: '#F9FAFB',
  },
  helpSection: {
    marginBottom: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
    flex: 1,
  },
  helpButtonTextDark: {
    color: '#F9FAFB',
  },
  helpContent: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    padding: 12,
    marginTop: 8,
  },
  helpContentDark: {
    backgroundColor: '#4B5563',
  },
  helpItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  helpItemDark: {
    color: '#D1D5DB',
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  inputLabelDark: {
    color: '#F9FAFB',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    minHeight: 100,
  },
  textInputDark: {
    backgroundColor: '#374151',
    color: '#F9FAFB',
    borderColor: '#4B5563',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  modalFooterDark: {
    borderTopColor: '#4B5563',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  completeButton: {
    backgroundColor: '#10B981',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
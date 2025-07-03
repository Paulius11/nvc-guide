import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NVCStatement, NVCStep, NVCSuggestion } from '../types';
import { useApp } from '../context/AppContext';
import { QuickSelector } from './QuickSelector';

interface NVCWizardProps {
  isDark?: boolean;
  onSave: (statement: NVCStatement) => void;
  onCancel: () => void;
  editingStatement?: NVCStatement;
}

export const NVCWizard: React.FC<NVCWizardProps> = ({
  isDark = false,
  onSave,
  onCancel,
  editingStatement,
}) => {
  const { settings } = useApp();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [statement, setStatement] = useState<Partial<NVCStatement>>({
    title: '',
    observation: '',
    feeling: '',
    need: '',
    request: '',
    context: '',
    ...editingStatement,
  });
  const [emotionSelectorVisible, setEmotionSelectorVisible] = useState(false);
  const [needSelectorVisible, setNeedSelectorVisible] = useState(false);

  const steps: NVCStep[] = [
    {
      key: 'observation',
      title: settings.language === 'en' ? 'Observation' : 'Stebėjimas',
      description: settings.language === 'en' 
        ? 'What specifically did you observe? Focus on facts, not interpretations.'
        : 'Ką konkrečiai stebėjote? Sutelkite dėmesį į faktus, o ne interpretacijas.',
      placeholder: settings.language === 'en' 
        ? 'When I saw/heard...'
        : 'Kai pamačiau/išgirdau...',
      examples: settings.language === 'en'
        ? [
            'When I saw the dishes left in the sink for three days...',
            'When I heard you raise your voice during our conversation...',
            'When I noticed you arrived 20 minutes late...'
          ]
        : [
            'Kai pamačiau indus, paliktus kriauklėje tris dienas...',
            'Kai išgirdau, kad pakėlei balsą mūsų pokalbio metu...',
            'Kai pastebėjau, kad atvykai 20 minučių vėliau...'
          ],
      tips: settings.language === 'en'
        ? [
            'Use specific, observable facts',
            'Avoid judgments or evaluations',
            'Include time, place, and context'
          ]
        : [
            'Naudokite konkrečius, stebimus faktus',
            'Venkite vertinimų ar įžvalgų',
            'Įtraukite laiką, vietą ir kontekstą'
          ]
    },
    {
      key: 'feeling',
      title: settings.language === 'en' ? 'Feeling' : 'Jausmas',
      description: settings.language === 'en'
        ? 'How did you feel? Express your emotions, not thoughts or judgments.'
        : 'Kaip jautėtės? Išreikškite savo emocijas, o ne mintis ar vertinimus.',
      placeholder: settings.language === 'en' 
        ? 'I feel...'
        : 'Aš jaučiuosi...',
      examples: settings.language === 'en'
        ? [
            'I feel frustrated...',
            'I feel disappointed...',
            'I feel worried...'
          ]
        : [
            'Aš jaučiuosi nusivylęs...',
            'Aš jaučiuosi susirūpinęs...',
            'Aš jaučiuosi piktas...'
          ],
      tips: settings.language === 'en'
        ? [
            'Use emotion words, not "I feel like" or "I feel that"',
            'Be specific about your emotions',
            'Avoid disguised judgments'
          ]
        : [
            'Naudokite emocijų žodžius, o ne "aš jaučiuosi, kad"',
            'Būkite konkrečiai dėl savo emocijų',
            'Venkite užmaskuotų vertinimų'
          ]
    },
    {
      key: 'need',
      title: settings.language === 'en' ? 'Need' : 'Poreikis',
      description: settings.language === 'en'
        ? 'What need of yours was or wasn\'t met? Focus on universal human needs.'
        : 'Koks jūsų poreikis buvo ar nebuvo patenkintes? Sutelkite dėmesį į universalius žmogiškuosius poreikius.',
      placeholder: settings.language === 'en' 
        ? 'Because I need/value...'
        : 'Nes man reikia/vertinu...',
      examples: settings.language === 'en'
        ? [
            'Because I need respect and consideration...',
            'Because I value honesty and trust...',
            'Because I need safety and predictability...'
          ]
        : [
            'Nes man reikia pagarbos ir dėmesio...',
            'Nes vertinu sąžiningumą ir pasitikėjimą...',
            'Nes man reikia saugumo ir nuspėjamumo...'
          ],
      tips: settings.language === 'en'
        ? [
            'Focus on universal human needs',
            'Avoid strategies or specific solutions',
            'Connect your feeling to the underlying need'
          ]
        : [
            'Sutelkite dėmesį į universalius žmogiškuosius poreikius',
            'Venkite strategijų ar konkrečių sprendimų',
            'Suskite savo jausmą su pagrindiniu poreikiu'
          ]
    },
    {
      key: 'request',
      title: settings.language === 'en' ? 'Request' : 'Prašymas',
      description: settings.language === 'en'
        ? 'What specific action would you like? Make a clear, doable request.'
        : 'Kokio konkretaus veiksmo norėtumėte? Padarykite aiškų, įgyvendinamą prašymą.',
      placeholder: settings.language === 'en' 
        ? 'Would you be willing to...'
        : 'Ar būtumėte pasiruošę...',
      examples: settings.language === 'en'
        ? [
            'Would you be willing to wash dishes within 24 hours of using them?',
            'Would you be willing to let me know when you\'ll be late?',
            'Could we agree on a time to discuss this further?'
          ]
        : [
            'Ar būtumėte pasiruošę plauti indus per 24 valandas nuo jų naudojimo?',
            'Ar būtumėte pasiruošę man pranešti, kai vėluosite?',
            'Ar galėtume susitarti dėl laiko tai toliau aptarti?'
          ],
      tips: settings.language === 'en'
        ? [
            'Be specific and concrete',
            'Make it doable and realistic',
            'Avoid demands - make requests'
          ]
        : [
            'Būkite konkretūs ir aiškūs',
            'Padarykite tai įgyvendinamu ir realistišku',
            'Venkite reikalavimų - darykite prašymus'
          ]
    }
  ];

  const getSuggestions = (stepKey: string, inputText: string): NVCSuggestion[] => {
    // Basic suggestions based on step and current input
    const suggestions: Record<string, NVCSuggestion[]> = {
      observation: [
        { id: '1', text: 'When I saw...', category: 'visual', isCommon: true },
        { id: '2', text: 'When I heard...', category: 'auditory', isCommon: true },
        { id: '3', text: 'When I noticed...', category: 'general', isCommon: true },
        { id: '4', text: 'Yesterday when...', category: 'time', isCommon: false },
        { id: '5', text: 'During our conversation...', category: 'context', isCommon: false },
      ],
      feeling: [
        { id: '6', text: 'frustrated', category: 'unmet', isCommon: true },
        { id: '7', text: 'disappointed', category: 'unmet', isCommon: true },
        { id: '8', text: 'worried', category: 'unmet', isCommon: true },
        { id: '9', text: 'sad', category: 'unmet', isCommon: true },
        { id: '10', text: 'grateful', category: 'met', isCommon: true },
        { id: '11', text: 'excited', category: 'met', isCommon: false },
        { id: '12', text: 'peaceful', category: 'met', isCommon: false },
      ],
      need: [
        { id: '13', text: 'respect', category: 'connection', isCommon: true },
        { id: '14', text: 'understanding', category: 'connection', isCommon: true },
        { id: '15', text: 'honesty', category: 'honesty', isCommon: true },
        { id: '16', text: 'safety', category: 'physical', isCommon: true },
        { id: '17', text: 'autonomy', category: 'autonomy', isCommon: false },
        { id: '18', text: 'harmony', category: 'peace', isCommon: false },
      ],
      request: [
        { id: '19', text: 'Would you be willing to...', category: 'polite', isCommon: true },
        { id: '20', text: 'Could you please...', category: 'polite', isCommon: true },
        { id: '21', text: 'I would appreciate if...', category: 'appreciation', isCommon: false },
        { id: '22', text: 'Would it work for you to...', category: 'collaborative', isCommon: false },
      ]
    };

    if (settings.language === 'lt') {
      // Lithuanian suggestions
      const ltSuggestions: Record<string, NVCSuggestion[]> = {
        observation: [
          { id: '1', text: 'Kai pamačiau...', category: 'visual', isCommon: true },
          { id: '2', text: 'Kai išgirdau...', category: 'auditory', isCommon: true },
          { id: '3', text: 'Kai pastebėjau...', category: 'general', isCommon: true },
        ],
        feeling: [
          { id: '6', text: 'nusivylęs', category: 'unmet', isCommon: true },
          { id: '7', text: 'susirūpinęs', category: 'unmet', isCommon: true },
          { id: '8', text: 'piktas', category: 'unmet', isCommon: true },
          { id: '10', text: 'dėkingas', category: 'met', isCommon: true },
        ],
        need: [
          { id: '13', text: 'pagarbos', category: 'connection', isCommon: true },
          { id: '14', text: 'supratimo', category: 'connection', isCommon: true },
          { id: '15', text: 'sąžiningumo', category: 'honesty', isCommon: true },
        ],
        request: [
          { id: '19', text: 'Ar būtumėte pasiruošę...', category: 'polite', isCommon: true },
          { id: '20', text: 'Ar galėtumėte...', category: 'polite', isCommon: true },
        ]
      };
      return ltSuggestions[stepKey] || [];
    }

    return suggestions[stepKey] || [];
  };

  const getRandomHint = (stepKey: string) => {
    const suggestions = getSuggestions(stepKey, statement[stepKey as keyof NVCStatement] as string || '');
    if (suggestions.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex].text;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (!statement.observation || !statement.feeling || !statement.need || !statement.request) {
      Alert.alert(
        settings.language === 'en' ? 'Incomplete Statement' : 'Nebaigtas teiginys',
        settings.language === 'en' 
          ? 'Please fill in all four steps of the NVC statement.'
          : 'Prašome užpildyti visus keturis NVC teiginio žingsnius.'
      );
      return;
    }

    const now = new Date().toISOString();
    const newStatement: NVCStatement = {
      id: editingStatement?.id || Date.now().toString(),
      title: statement.title || `${settings.language === 'en' ? 'NVC Statement' : 'NVC teiginys'} ${new Date().toLocaleDateString()}`,
      observation: statement.observation!,
      feeling: statement.feeling!,
      need: statement.need!,
      request: statement.request!,
      context: statement.context,
      dateCreated: editingStatement?.dateCreated || now,
      dateModified: now,
      language: settings.language,
    };

    onSave(newStatement);
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={24} color={isDark ? '#F9FAFB' : '#111827'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          {settings.language === 'en' ? 'NVC Statement' : 'NVC teiginys'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={[styles.progressText, isDark && styles.progressTextDark]}>
          {currentStep + 1} / {steps.length}
        </Text>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ 
          paddingBottom: Platform.OS === 'android' ? 60 + insets.bottom : 60 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Info */}
        <View style={styles.stepContainer}>
          <Text style={[styles.stepTitle, isDark && styles.stepTitleDark]}>
            {currentStepData.title}
          </Text>
          <Text style={[styles.stepDescription, isDark && styles.stepDescriptionDark]}>
            {currentStepData.description}
          </Text>

          {/* Examples */}
          <View style={styles.examplesContainer}>
            <Text style={[styles.examplesTitle, isDark && styles.examplesTextDark]}>
              {settings.language === 'en' ? 'Examples:' : 'Pavyzdžiai:'}
            </Text>
            {currentStepData.examples.map((example, index) => (
              <Text key={index} style={[styles.exampleText, isDark && styles.examplesTextDark]}>
                • {example}
              </Text>
            ))}
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            {(currentStepData.key === 'feeling' || currentStepData.key === 'need') && (
              <View style={styles.inputHeader}>
                <Text style={[styles.inputLabel, isDark && styles.inputLabelDark]}>
                  {currentStepData.title}
                </Text>
                <TouchableOpacity
                  style={[styles.quickAccessButton, isDark && styles.quickAccessButtonDark]}
                  onPress={() => {
                    if (currentStepData.key === 'feeling') {
                      setEmotionSelectorVisible(true);
                    } else if (currentStepData.key === 'need') {
                      setNeedSelectorVisible(true);
                    }
                  }}
                >
                  <Ionicons
                    name="list"
                    size={16}
                    color={isDark ? '#9CA3AF' : '#6B7280'}
                  />
                  <Text style={[styles.quickAccessText, isDark && styles.quickAccessTextDark]}>
                    {settings.language === 'en' ? 'Select' : 'Pasirinkti'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TextInput
              style={[
                styles.textInput,
                isDark && styles.textInputDark
              ]}
              placeholder={getRandomHint(currentStepData.key) || currentStepData.placeholder}
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={statement[currentStepData.key as keyof NVCStatement] as string || ''}
              onChangeText={(text) => setStatement(prev => ({
                ...prev,
                [currentStepData.key]: text
              }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={[styles.tipsTitle, isDark && styles.tipsTextDark]}>
              {settings.language === 'en' ? 'Tips:' : 'Patarimai:'}
            </Text>
            {currentStepData.tips.map((tip, index) => (
              <Text key={index} style={[styles.tipText, isDark && styles.tipsTextDark]}>
                • {tip}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            currentStep === 0 && styles.navButtonDisabled,
            isDark && styles.navButtonDark
          ]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Text style={[
            styles.navButtonText,
            currentStep === 0 && styles.navButtonTextDisabled,
            isDark && styles.navButtonTextDark
          ]}>
            {settings.language === 'en' ? 'Previous' : 'Atgal'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 
              ? (settings.language === 'en' ? 'Save' : 'Išsaugoti')
              : (settings.language === 'en' ? 'Next' : 'Toliau')
            }
          </Text>
        </TouchableOpacity>
      </View>

      {/* Emotion Selector Modal */}
      <QuickSelector
        type="emotion"
        visible={emotionSelectorVisible}
        onClose={() => setEmotionSelectorVisible(false)}
        onSelect={(value) => {
          setStatement(prev => ({
            ...prev,
            feeling: prev.feeling 
              ? (prev.feeling.trim() + ', ' + value)
              : value
          }));
        }}
        currentValue={statement.feeling}
        isDark={settings.theme === 'dark'}
        language={settings.language}
      />

      {/* Need Selector Modal */}
      <QuickSelector
        type="need"
        visible={needSelectorVisible}
        onClose={() => setNeedSelectorVisible(false)}
        onSelect={(value) => {
          setStatement(prev => ({
            ...prev,
            need: prev.need 
              ? (prev.need.trim() + ', ' + value)
              : value
          }));
        }}
        currentValue={statement.need}
        isDark={settings.theme === 'dark'}
        language={settings.language}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cancelButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressTextDark: {
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  stepTitleDark: {
    color: '#F9FAFB',
  },
  stepDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  stepDescriptionDark: {
    color: '#D1D5DB',
  },
  examplesContainer: {
    marginBottom: 16,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  examplesTextDark: {
    color: '#9CA3AF',
  },
  exampleText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  inputLabelDark: {
    color: '#F9FAFB',
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  quickAccessButtonDark: {
    backgroundColor: '#4B5563',
  },
  quickAccessText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  quickAccessTextDark: {
    color: '#9CA3AF',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
  },
  textInputDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: '#F9FAFB',
  },
  tipsContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  tipsTextDark: {
    color: '#9CA3AF',
  },
  tipText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 4,
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonDark: {
    backgroundColor: '#374151',
  },
  previousButton: {
    backgroundColor: '#F3F4F6',
  },
  nextButton: {
    backgroundColor: '#10B981',
  },
  navButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  navButtonTextDark: {
    color: '#F9FAFB',
  },
  navButtonTextDisabled: {
    color: '#9CA3AF',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
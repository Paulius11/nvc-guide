import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NVCStatement } from '../types';
import { useApp } from '../context/AppContext';
import { NVCWizard } from '../components/NVCWizard';
import { SearchBar } from '../components/SearchBar';

export const NVCStatementsScreen: React.FC = () => {
  const { settings, nvcStatements, saveNVCStatement, deleteNVCStatement } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [editingStatement, setEditingStatement] = useState<NVCStatement | undefined>();

  const filteredStatements = nvcStatements.filter(statement => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      statement.title.toLowerCase().includes(query) ||
      statement.observation.toLowerCase().includes(query) ||
      statement.feeling.toLowerCase().includes(query) ||
      statement.need.toLowerCase().includes(query) ||
      statement.request.toLowerCase().includes(query) ||
      statement.context?.toLowerCase().includes(query)
    );
  });

  const handleCreateNew = () => {
    setEditingStatement(undefined);
    setShowWizard(true);
  };

  const handleEdit = (statement: NVCStatement) => {
    setEditingStatement(statement);
    setShowWizard(true);
  };

  const handleSave = (statement: NVCStatement) => {
    saveNVCStatement(statement);
    setShowWizard(false);
    setEditingStatement(undefined);
  };

  const handleDelete = (statement: NVCStatement) => {
    Alert.alert(
      settings.language === 'en' ? 'Delete Statement' : 'Ištrinti teiginį',
      settings.language === 'en' 
        ? 'Are you sure you want to delete this NVC statement?'
        : 'Ar tikrai norite ištrinti šį NVC teiginį?',
      [
        {
          text: settings.language === 'en' ? 'Cancel' : 'Atšaukti',
          style: 'cancel',
        },
        {
          text: settings.language === 'en' ? 'Delete' : 'Ištrinti',
          style: 'destructive',
          onPress: () => deleteNVCStatement(statement.id),
        },
      ]
    );
  };

  const renderStatementCard = (statement: NVCStatement) => (
    <View key={statement.id} style={[styles.statementCard, isDark && styles.statementCardDark]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]} numberOfLines={1}>
          {statement.title}
        </Text>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(statement)}
          >
            <Ionicons name="pencil" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(statement)}
          >
            <Ionicons name="trash" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date */}
      <Text style={[styles.cardDate, isDark && styles.cardDateDark]}>
        {settings.language === 'en' ? 'Created' : 'Sukurta'}: {new Date(statement.dateCreated).toLocaleDateString()}
        {statement.dateModified !== statement.dateCreated && (
          <Text> • {settings.language === 'en' ? 'Modified' : 'Keista'}: {new Date(statement.dateModified).toLocaleDateString()}</Text>
        )}
      </Text>

      {/* NVC Components */}
      <View style={styles.nvcContent}>
        <View style={styles.nvcSection}>
          <Text style={[styles.nvcLabel, isDark && styles.nvcLabelDark]}>
            {settings.language === 'en' ? 'Observation:' : 'Stebėjimas:'}
          </Text>
          <Text style={[styles.nvcText, isDark && styles.nvcTextDark]} numberOfLines={2}>
            {statement.observation}
          </Text>
        </View>

        <View style={styles.nvcSection}>
          <Text style={[styles.nvcLabel, isDark && styles.nvcLabelDark]}>
            {settings.language === 'en' ? 'Feeling:' : 'Jausmas:'}
          </Text>
          <Text style={[styles.nvcText, isDark && styles.nvcTextDark]} numberOfLines={1}>
            {statement.feeling}
          </Text>
        </View>

        <View style={styles.nvcSection}>
          <Text style={[styles.nvcLabel, isDark && styles.nvcLabelDark]}>
            {settings.language === 'en' ? 'Need:' : 'Poreikis:'}
          </Text>
          <Text style={[styles.nvcText, isDark && styles.nvcTextDark]} numberOfLines={1}>
            {statement.need}
          </Text>
        </View>

        <View style={styles.nvcSection}>
          <Text style={[styles.nvcLabel, isDark && styles.nvcLabelDark]}>
            {settings.language === 'en' ? 'Request:' : 'Prašymas:'}
          </Text>
          <Text style={[styles.nvcText, isDark && styles.nvcTextDark]} numberOfLines={2}>
            {statement.request}
          </Text>
        </View>

        {statement.context && (
          <View style={styles.nvcSection}>
            <Text style={[styles.nvcLabel, isDark && styles.nvcLabelDark]}>
              {settings.language === 'en' ? 'Context:' : 'Kontekstas:'}
            </Text>
            <Text style={[styles.nvcText, isDark && styles.nvcTextDark]} numberOfLines={2}>
              {statement.context}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyState, { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }]}>
      <Ionicons 
        name="chatbubbles-outline" 
        size={64} 
        color={isDark ? '#4B5563' : '#D1D5DB'} 
      />
      <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
        {settings.language === 'en' ? 'No NVC Statements Yet' : 'Kol kas nėra NVC teiginių'}
      </Text>
      <Text style={[styles.emptyDescription, isDark && styles.emptyDescriptionDark]}>
        {settings.language === 'en' 
          ? 'Create your first NVC statement using the guided wizard.'
          : 'Sukurkite savo pirmą NVC teiginį naudodami vedlį.'
        }
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleCreateNew}>
        <Text style={styles.emptyButtonText}>
          {settings.language === 'en' ? 'Create Statement' : 'Sukurti teiginį'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          {settings.language === 'en' ? 'NVC Statements' : 'NVC teiginiai'}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateNew}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={settings.language === 'en' ? 'Search statements...' : 'Ieškoti teiginių...'}
        isDark={isDark}
      />

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={[styles.statsText, isDark && styles.statsTextDark]}>
          {filteredStatements.length} {settings.language === 'en' ? 'statements' : 'teiginiai'}
          {searchQuery.trim() && ` ${settings.language === 'en' ? 'found' : 'rasta'}`}
        </Text>
      </View>

      {/* Content */}
      {filteredStatements.length === 0 ? (
        searchQuery.trim() ? (
          <View style={[styles.emptyState, { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }]}>
            <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
              {settings.language === 'en' ? 'No statements found' : 'Teiginių nerasta'}
            </Text>
            <Text style={[styles.emptyDescription, isDark && styles.emptyDescriptionDark]}>
              {settings.language === 'en' 
                ? 'Try adjusting your search terms.'
                : 'Pabandykite pakeisti paieškos žodžius.'
              }
            </Text>
          </View>
        ) : (
          renderEmptyState()
        )
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredStatements
            .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())
            .map(renderStatementCard)}
        </ScrollView>
      )}

      {/* Wizard Modal */}
      <Modal
        visible={showWizard}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <NVCWizard
          isDark={isDark}
          onSave={handleSave}
          onCancel={() => {
            setShowWizard(false);
            setEditingStatement(undefined);
          }}
          editingStatement={editingStatement}
        />
      </Modal>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  addButton: {
    backgroundColor: '#10B981',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statementCardDark: {
    backgroundColor: '#374151',
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  cardTitleDark: {
    color: '#F9FAFB',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  cardDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardDateDark: {
    color: '#9CA3AF',
  },
  nvcContent: {
    gap: 12,
  },
  nvcSection: {
    gap: 4,
  },
  nvcLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nvcLabelDark: {
    color: '#9CA3AF',
  },
  nvcText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  nvcTextDark: {
    color: '#D1D5DB',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyTitleDark: {
    color: '#F9FAFB',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyDescriptionDark: {
    color: '#9CA3AF',
  },
  emptyButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
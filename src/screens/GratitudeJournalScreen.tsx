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
import { GratitudeEntry } from '../types';
import { useApp } from '../context/AppContext';
import { GratitudeForm } from '../components/GratitudeForm';
import { SearchBar } from '../components/SearchBar';

export const GratitudeJournalScreen: React.FC = () => {
  const { settings, gratitudeEntries, saveGratitudeEntry, deleteGratitudeEntry } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<GratitudeEntry | undefined>();
  const [filterType, setFilterType] = useState<'all' | 'personal' | 'other'>('all');

  const filteredEntries = gratitudeEntries.filter(entry => {
    // Filter by type
    if (filterType !== 'all' && entry.type !== filterType) return false;
    
    // Filter by search query
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.action.toLowerCase().includes(query) ||
      entry.feeling.toLowerCase().includes(query) ||
      entry.need.toLowerCase().includes(query) ||
      entry.context?.toLowerCase().includes(query) ||
      entry.personName?.toLowerCase().includes(query)
    );
  });

  const handleCreateNew = () => {
    setEditingEntry(undefined);
    setShowForm(true);
  };

  const handleEdit = (entry: GratitudeEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleSave = (entry: GratitudeEntry) => {
    saveGratitudeEntry(entry);
    setShowForm(false);
    setEditingEntry(undefined);
  };

  const handleDelete = (entry: GratitudeEntry) => {
    Alert.alert(
      settings.language === 'en' ? 'Delete Entry' : 'Ištrinti įrašą',
      settings.language === 'en' 
        ? 'Are you sure you want to delete this gratitude entry?'
        : 'Ar tikrai norite ištrinti šį dėkingumo įrašą?',
      [
        {
          text: settings.language === 'en' ? 'Cancel' : 'Atšaukti',
          style: 'cancel',
        },
        {
          text: settings.language === 'en' ? 'Delete' : 'Ištrinti',
          style: 'destructive',
          onPress: () => deleteGratitudeEntry(entry.id),
        },
      ]
    );
  };

  const renderEntryCard = (entry: GratitudeEntry) => (
    <View key={entry.id} style={[styles.entryCard, isDark && styles.entryCardDark]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={[
            styles.typeIndicator,
            entry.type === 'personal' ? styles.typePersonal : styles.typeOther
          ]}>
            <Ionicons 
              name={entry.type === 'personal' ? 'person' : 'people'} 
              size={12} 
              color="#FFFFFF" 
            />
          </View>
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]} numberOfLines={1}>
            {entry.title}
          </Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(entry)}
          >
            <Ionicons name="pencil" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(entry)}
          >
            <Ionicons name="trash" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date */}
      <Text style={[styles.cardDate, isDark && styles.cardDateDark]}>
        {new Date(entry.dateCreated).toLocaleDateString(settings.language === 'lt' ? 'lt-LT' : 'en-US')}
        {entry.dateModified !== entry.dateCreated && (
          <Text> • {settings.language === 'en' ? 'Modified' : 'Keista'}: {new Date(entry.dateModified).toLocaleDateString(settings.language === 'lt' ? 'lt-LT' : 'en-US')}</Text>
        )}
      </Text>

      {/* Person Name (for 'other' type) */}
      {entry.personName && (
        <View style={styles.personNameContainer}>
          <Ionicons name="person" size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
          <Text style={[styles.personName, isDark && styles.personNameDark]}>
            {entry.personName}
          </Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.entryContent}>
        <View style={styles.contentSection}>
          <Text style={[styles.contentLabel, isDark && styles.contentLabelDark]}>
            {entry.type === 'personal' 
              ? (settings.language === 'en' ? 'What I did:' : 'Ką padariau:')
              : (settings.language === 'en' ? 'What they did:' : 'Ką jie padarė:')
            }
          </Text>
          <Text style={[styles.contentText, isDark && styles.contentTextDark]} numberOfLines={2}>
            {entry.action}
          </Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={[styles.contentLabel, isDark && styles.contentLabelDark]}>
            {settings.language === 'en' ? 'How I feel:' : 'Kaip jaučiuosi:'}
          </Text>
          <Text style={[styles.contentText, isDark && styles.contentTextDark]} numberOfLines={1}>
            {entry.feeling}
          </Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={[styles.contentLabel, isDark && styles.contentLabelDark]}>
            {settings.language === 'en' ? 'Need fulfilled:' : 'Patenkintas poreikis:'}
          </Text>
          <Text style={[styles.contentText, isDark && styles.contentTextDark]} numberOfLines={1}>
            {entry.need}
          </Text>
        </View>

        {entry.context && (
          <View style={styles.contentSection}>
            <Text style={[styles.contentLabel, isDark && styles.contentLabelDark]}>
              {settings.language === 'en' ? 'Context:' : 'Kontekstas:'}
            </Text>
            <Text style={[styles.contentText, isDark && styles.contentTextDark]} numberOfLines={2}>
              {entry.context}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      {[
        { key: 'all', label: settings.language === 'en' ? 'All' : 'Visi', icon: 'list' },
        { key: 'personal', label: settings.language === 'en' ? 'Personal' : 'Asmeniniai', icon: 'person' },
        { key: 'other', label: settings.language === 'en' ? 'Others' : 'Kiti', icon: 'people' },
      ].map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            filterType === filter.key && styles.filterButtonActive,
            isDark && styles.filterButtonDark,
            filterType === filter.key && isDark && styles.filterButtonActiveDark,
          ]}
          onPress={() => setFilterType(filter.key as typeof filterType)}
        >
          <Ionicons 
            name={filter.icon as any} 
            size={16} 
            color={
              filterType === filter.key 
                ? '#FFFFFF' 
                : (isDark ? '#9CA3AF' : '#6B7280')
            } 
          />
          <Text style={[
            styles.filterButtonText,
            filterType === filter.key && styles.filterButtonTextActive,
            isDark && styles.filterButtonTextDark,
          ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyState, { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }]}>
      <Ionicons 
        name="heart-outline" 
        size={64} 
        color={isDark ? '#4B5563' : '#D1D5DB'} 
      />
      <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
        {settings.language === 'en' ? 'No Gratitude Entries Yet' : 'Kol kas nėra dėkingumo įrašų'}
      </Text>
      <Text style={[styles.emptyDescription, isDark && styles.emptyDescriptionDark]}>
        {settings.language === 'en' 
          ? 'Start your gratitude journey by recording what enriches your life.'
          : 'Pradėkite savo dėkingumo kelionę įrašydami tai, kas praturtina jūsų gyvenimą.'
        }
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleCreateNew}>
        <Text style={styles.emptyButtonText}>
          {settings.language === 'en' ? 'Create Entry' : 'Sukurti įrašą'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const personalCount = gratitudeEntries.filter(e => e.type === 'personal').length;
  const otherCount = gratitudeEntries.filter(e => e.type === 'other').length;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          {settings.language === 'en' ? 'Gratitude Journal' : 'Dėkingumo dienoraštis'}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateNew}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={settings.language === 'en' ? 'Search gratitude entries...' : 'Ieškoti dėkingumo įrašų...'}
        isDark={isDark}
      />

      {/* Filter Buttons */}
      {renderFilterButtons()}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={[styles.statsText, isDark && styles.statsTextDark]}>
          {filteredEntries.length} {settings.language === 'en' ? 'entries' : 'įrašai'}
          {searchQuery.trim() && ` ${settings.language === 'en' ? 'found' : 'rasta'}`}
          {!searchQuery.trim() && (
            <Text>
              {' • '}
              {personalCount} {settings.language === 'en' ? 'personal' : 'asmeniniai'}, {otherCount} {settings.language === 'en' ? 'about others' : 'apie kitus'}
            </Text>
          )}
        </Text>
      </View>

      {/* Content */}
      {filteredEntries.length === 0 ? (
        searchQuery.trim() ? (
          <View style={[styles.emptyState, { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }]}>
            <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
              {settings.language === 'en' ? 'No entries found' : 'Įrašų nerasta'}
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
          {filteredEntries
            .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())
            .map(renderEntryCard)}
        </ScrollView>
      )}

      {/* Form Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <GratitudeForm
          isDark={isDark}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingEntry(undefined);
          }}
          editingEntry={editingEntry}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  filterButtonDark: {
    backgroundColor: '#4B5563',
  },
  filterButtonActive: {
    backgroundColor: '#10B981',
  },
  filterButtonActiveDark: {
    backgroundColor: '#059669',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  filterButtonTextDark: {
    color: '#F9FAFB',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
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
  entryCard: {
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
  entryCardDark: {
    backgroundColor: '#374151',
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  typeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typePersonal: {
    backgroundColor: '#8B5CF6',
  },
  typeOther: {
    backgroundColor: '#10B981',
  },
  cardTitle: {
    fontSize: 16,
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
    marginBottom: 8,
  },
  cardDateDark: {
    color: '#9CA3AF',
  },
  personNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  personName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  personNameDark: {
    color: '#34D399',
  },
  entryContent: {
    gap: 12,
  },
  contentSection: {
    gap: 4,
  },
  contentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentLabelDark: {
    color: '#9CA3AF',
  },
  contentText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  contentTextDark: {
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
import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SimpleHeader } from '../components/SimpleHeader';
import { FavoriteItemCard } from '../components/FavoriteItemCard';
import { DetailModal } from '../components/DetailModal';
import { nvcNeeds, nvcEmotions } from '../data/nvcData';
import { Need, Emotion } from '../types';
import { useApp } from '../context/AppContext';

type FavoriteItemData = (Need | Emotion) & { itemType: 'need' | 'emotion' };

export const FavoritesScreen: React.FC = () => {
  const { favorites, settings } = useApp();
  const isDark = settings.theme === 'dark';
  const insets = useSafeAreaInsets();
  
  const [selectedItem, setSelectedItem] = useState<FavoriteItemData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const favoriteItems = useMemo(() => {
    const items: FavoriteItemData[] = [];

    favorites.forEach((favorite) => {
      if (favorite.type === 'need') {
        const need = nvcNeeds.find((n) => n.id === favorite.id && n.language === settings.language);
        if (need) {
          items.push({ ...need, itemType: 'need' });
        }
      } else {
        const emotion = nvcEmotions.find((e) => e.id === favorite.id && e.language === settings.language);
        if (emotion) {
          items.push({ ...emotion, itemType: 'emotion' });
        }
      }
    });

    // Sort by date added (most recent first)
    return items.sort((a, b) => {
      const aFav = favorites.find((f) => f.id === a.id && f.type === a.itemType);
      const bFav = favorites.find((f) => f.id === b.id && f.type === b.itemType);
      return new Date(bFav!.dateAdded).getTime() - new Date(aFav!.dateAdded).getTime();
    });
  }, [favorites, settings.language]);

  const handleItemPress = (item: FavoriteItemData) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const renderItem = ({ item }: { item: FavoriteItemData }) => {
    return (
      <FavoriteItemCard
        item={item}
        onPress={() => handleItemPress(item)}
        isDark={isDark}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>💙</Text>
      </View>
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
        {settings.language === 'lt' ? 'Mėgstamų dar nėra' : 'No favorites yet'}
      </Text>
      <Text style={[styles.emptySubtext, isDark && styles.emptySubtextDark]}>
        {settings.language === 'lt' 
          ? 'Palieskite širdies piktogramą prie bet kurio poreikio ar emocijos, kad pridėtumėte į mėgstamus.'
          : 'Tap the heart icon on any need or emotion to add it to your favorites.'
        }
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SimpleHeader
        title={settings.language === 'lt' ? 'Mėgstami' : 'Favorites'}
        isDark={isDark}
      />
      
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.itemType}-${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          favoriteItems.length === 0 && styles.emptyListContent,
          { paddingBottom: Platform.OS === 'android' ? 90 + insets.bottom : 80 }
        ]}
        ListEmptyComponent={renderEmptyState}
      />

      <DetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        item={selectedItem}
        type={selectedItem?.itemType || 'need'}
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
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  emptyListContent: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyTextDark: {
    color: '#9CA3AF',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptySubtextDark: {
    color: '#9CA3AF',
  },
});
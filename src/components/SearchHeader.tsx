import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchHeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
  isDark?: boolean;
  rightComponent?: React.ReactNode;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  title,
  searchQuery,
  onSearchChange,
  placeholder = 'Search...',
  isDark = false,
  rightComponent,
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const searchWidthAnim = useRef(new Animated.Value(0)).current;
  const titleOpacityAnim = useRef(new Animated.Value(1)).current;

  const activateSearch = useCallback(() => {
    setIsSearchActive(true);
    
    Animated.parallel([
      Animated.timing(searchWidthAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false, // Cannot use native driver for width animations
      }),
      Animated.timing(titleOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false, // Keep consistent with width animation
      }),
    ]).start(() => {
      inputRef.current?.focus();
    });
  }, [searchWidthAnim, titleOpacityAnim]);

  const deactivateSearch = useCallback(() => {
    onSearchChange(''); // Clear search query
    inputRef.current?.blur();
    
    Animated.parallel([
      Animated.timing(searchWidthAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(titleOpacityAnim, {
        toValue: 1,
        duration: 200,
        delay: 50,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsSearchActive(false);
    });
  }, [onSearchChange, searchWidthAnim, titleOpacityAnim]);

  const handleSearchBlur = useCallback(() => {
    if (searchQuery === '') {
      // Auto-collapse if search is empty
      setTimeout(() => {
        if (searchQuery === '') {
          deactivateSearch();
        }
      }, 100);
    }
  }, [searchQuery, deactivateSearch]);

  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      {/* Title - hidden when search is active */}
      <Animated.View 
        style={[
          styles.titleContainer,
          { opacity: titleOpacityAnim }
        ]}
        pointerEvents={isSearchActive ? 'none' : 'auto'}
      >
        <Text style={[styles.title, isDark && styles.titleDark]}>
          {title}
        </Text>
      </Animated.View>

      {/* Search field - expands when active */}
      <Animated.View
        style={[
          styles.searchContainer,
          {
            width: searchWidthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '70%'],
            }),
          }
        ]}
      >
        <View style={[styles.searchInputContainer, isDark && styles.searchInputContainerDark]}>
          <Ionicons
            name="search"
            size={20}
            color={isDark ? '#9CA3AF' : '#6B7280'}
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, isDark && styles.searchInputDark]}
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder={placeholder}
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            onBlur={handleSearchBlur}
          />
        </View>
      </Animated.View>

      {/* Right section with search/cancel button */}
      <View style={styles.rightSection}>
        {isSearchActive ? (
          <TouchableOpacity onPress={deactivateSearch} style={styles.cancelButton}>
            <Text style={[styles.cancelText, isDark && styles.cancelTextDark]}>
              Cancel
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={activateSearch} style={styles.searchButton}>
              <Ionicons
                name="search"
                size={24}
                color={isDark ? '#9CA3AF' : '#6B7280'}
              />
            </TouchableOpacity>
            {rightComponent}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 56,
  },
  headerDark: {
    backgroundColor: '#374151',
    borderBottomColor: '#4B5563',
  },
  titleContainer: {
    position: 'absolute',
    left: 16,
    right: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  titleDark: {
    color: '#F9FAFB',
  },
  searchContainer: {
    position: 'absolute',
    left: 16,
    height: 40,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    flex: 1,
  },
  searchInputContainerDark: {
    backgroundColor: '#4B5563',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
  searchInputDark: {
    color: '#F9FAFB',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  searchButton: {
    padding: 8,
  },
  cancelButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cancelText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  cancelTextDark: {
    color: '#60A5FA',
  },
});
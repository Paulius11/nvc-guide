import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SimpleHeaderProps {
  title: string;
  isDark?: boolean;
  rightComponent?: React.ReactNode;
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  title,
  isDark = false,
  rightComponent,
}) => {
  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        {title}
      </Text>
      
      {rightComponent && (
        <View style={styles.rightSection}>
          {rightComponent}
        </View>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  titleDark: {
    color: '#F9FAFB',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
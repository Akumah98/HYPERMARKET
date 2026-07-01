import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/catalogStyles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export const SearchBar = ({ value, onChangeText, onFilterPress }: SearchBarProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={theme.textMuted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search products..."
          placeholderTextColor={theme.textMuted}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 ? (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Ionicons name="close-circle-outline" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity onPress={onFilterPress} activeOpacity={0.8} style={styles.filterButton}>
        <Ionicons name="options-outline" size={22} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

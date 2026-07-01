import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/catalogStyles';
import { Category } from '../services/catalogService';

interface CategoryBarProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export const CategoryBar = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryBarProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScroll}
      contentContainerStyle={styles.categoryContent}
    >
      <TouchableOpacity
        onPress={() => onSelectCategory(null)}
        activeOpacity={0.8}
        style={[
          styles.categoryItem,
          selectedCategoryId === null && { backgroundColor: theme.primary, borderColor: theme.primary },
        ]}
      >
        <Text
          style={[
            styles.categoryText,
            { color: selectedCategoryId === null ? '#003909' : theme.text },
          ]}
        >
          All Items
        </Text>
      </TouchableOpacity>

      {categories.map((item) => {
        const isSelected = selectedCategoryId === item._id;
        return (
          <TouchableOpacity
            key={item._id}
            onPress={() => onSelectCategory(item._id)}
            activeOpacity={0.8}
            style={[
              styles.categoryItem,
              isSelected && { backgroundColor: theme.primary, borderColor: theme.primary },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color: isSelected ? '#003909' : theme.text },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

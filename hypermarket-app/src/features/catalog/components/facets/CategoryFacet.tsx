import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Category } from '../../services/catalogService';

interface CategoryFacetProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
  styles: any;
}

export const CategoryFacet = ({
  categories,
  selectedCategories,
  onToggleCategory,
  styles,
}: CategoryFacetProps) => (
  <View style={styles.section}>
    <Text style={styles.label}>Categories</Text>
    <View style={styles.chipRow}>
      {categories.map((cat) => {
        const isSelected = selectedCategories.includes(cat._id);
        return (
          <TouchableOpacity
            key={cat._id}
            onPress={() => onToggleCategory(cat._id)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RatingFacetProps {
  selectedRating?: number;
  onSelectRating: (val?: number) => void;
  styles: any;
}

export const RatingFacet = ({
  selectedRating,
  onSelectRating,
  styles,
}: RatingFacetProps) => {
  const options = [
    { label: 'All Ratings', value: undefined },
    { label: '4+ Stars ⭐', value: 4 },
    { label: '3+ Stars ⭐', value: 3 },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Minimum Rating</Text>
      <View style={styles.radioRow}>
        {options.map((opt, i) => {
          const isSelected = selectedRating === opt.value;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => onSelectRating(opt.value)}
              style={[styles.radioButton, isSelected && styles.radioButtonActive]}
            >
              <Text style={[styles.radioText, isSelected && styles.radioTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

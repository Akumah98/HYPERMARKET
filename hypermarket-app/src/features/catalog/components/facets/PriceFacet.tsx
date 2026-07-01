import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ThemeType } from '../../../../context/ThemeContext';

interface PriceFacetProps {
  theme: ThemeType;
  styles: any;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (val: string) => void;
  setMaxPrice: (val: string) => void;
}

export const PriceFacet = ({
  theme,
  styles,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: PriceFacetProps) => (
  <View style={styles.section}>
    <Text style={styles.label}>Price Range (XAF)</Text>
    <View style={styles.inputRow}>
      <TextInput
        value={minPrice}
        onChangeText={setMinPrice}
        placeholder="Min Price"
        placeholderTextColor={theme.textMuted}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.dividerText}>to</Text>
      <TextInput
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="Max Price"
        placeholderTextColor={theme.textMuted}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  </View>
);

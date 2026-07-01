import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface StockFacetProps {
  inStockOnly: boolean;
  onToggleStock: (val: boolean) => void;
  styles: any;
}

export const StockFacet = ({
  inStockOnly,
  onToggleStock,
  styles,
}: StockFacetProps) => (
  <View style={styles.section}>
    <TouchableOpacity
      onPress={() => onToggleStock(!inStockOnly)}
      style={styles.toggleRow}
    >
      <Text style={styles.label}>In Stock Only</Text>
      <View style={[styles.checkbox, inStockOnly && styles.checkboxChecked]}>
        {inStockOnly && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  </View>
);

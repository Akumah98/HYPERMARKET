import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/cartStyles';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantitySelectorProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.selectorContainer}>
      <TouchableOpacity
        onPress={onDecrease}
        disabled={disabled || quantity <= 1}
        activeOpacity={0.8}
        style={styles.selectorBtn}
      >
        <Ionicons name="remove" size={14} color={theme.text} />
      </TouchableOpacity>

      <Text style={styles.selectorText}>{quantity}</Text>

      <TouchableOpacity
        onPress={onIncrease}
        disabled={disabled}
        activeOpacity={0.8}
        style={styles.selectorBtn}
      >
        <Ionicons name="add" size={14} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

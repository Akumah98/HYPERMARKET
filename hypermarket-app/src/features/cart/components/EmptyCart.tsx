import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton } from '../../../components/AppButton';
import { scale, verticalScale } from '../../../utils/responsive';

interface EmptyCartProps {
  onShopPress: () => void;
}

export const EmptyCart = ({ onShopPress }: EmptyCartProps) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Ionicons name="cart-outline" size={80} color={theme.textMuted} />
      <Text style={[styles.title, { color: theme.text }]}>Your Cart is Empty</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>
        Add products to your cart and they will show up here.
      </Text>
      <AppButton
        title="Start Shopping"
        onPress={onShopPress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(24),
    gap: verticalScale(10),
  },
  title: {
    fontSize: scale(18),
    fontWeight: '700',
    marginTop: verticalScale(16),
  },
  subtitle: {
    fontSize: scale(14),
    textAlign: 'center',
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  button: {
    width: '70%',
  },
});

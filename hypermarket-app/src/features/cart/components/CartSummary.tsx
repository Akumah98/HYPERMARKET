import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/cartStyles';
import { AppButton } from '../../../components/AppButton';
import { formatXAF } from '../../../utils/formatCurrency';

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCheckout: () => void;
  disabled?: boolean;
}

export const CartSummary = ({
  subtotal,
  deliveryFee,
  total,
  onCheckout,
  disabled = false,
}: CartSummaryProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.summaryCard}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{formatXAF(subtotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>{formatXAF(deliveryFee)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatXAF(total)}</Text>
      </View>

      <AppButton
        title="Proceed to Checkout"
        onPress={onCheckout}
        disabled={disabled || total === 0}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

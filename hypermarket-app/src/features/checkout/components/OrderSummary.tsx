import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/checkoutStyles';
import { formatXAF } from '../../../utils/formatCurrency';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
}

export const OrderSummary = ({ subtotal, deliveryFee, totalAmount }: OrderSummaryProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Items Subtotal</Text>
        <Text style={styles.priceVal}>{formatXAF(subtotal)}</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Delivery Fee</Text>
        <Text style={styles.priceVal}>{formatXAF(deliveryFee)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalVal}>{formatXAF(totalAmount)}</Text>
      </View>
    </View>
  );
};

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/statusStyles';
import { AppButton } from '../../../components/AppButton';

interface OrderConfirmationProps {
  orderId: string;
  onHomePress: () => void;
}

export const OrderConfirmation = ({ orderId, onHomePress }: OrderConfirmationProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Generate a mock order code formatted like the backend schema, e.g., #AFR-123456
  const orderCode = `#AFR-${orderId.substring(orderId.length - 6).toUpperCase()}`;

  return (
    <View style={styles.confirmContainer}>
      <Ionicons name="checkmark-circle-outline" size={80} color={theme.primary} />
      <Text style={styles.confirmTitle}>Order Placed!</Text>
      <Text style={styles.confirmSubtitle}>
        Thank you for your purchase. Your order has been registered and is being processed by our vendor network.
      </Text>

      <View style={styles.orderCodeCard}>
        <Text style={styles.orderCode}>Order ID: {orderCode}</Text>
      </View>

      <AppButton
        title="Return to Home"
        onPress={onHomePress}
        style={styles.button}
      />
    </View>
  );
};

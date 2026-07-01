import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/timelineStyles';

interface OrderStatusBadgeProps {
  status: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const getColors = () => {
    switch (status) {
      case 'placed':
        return { bg: '#E3F2FD', border: '#90CAF9', text: '#1E88E5' };
      case 'processing':
        return { bg: '#EDE7F6', border: '#B39DDB', text: '#5E35B1' };
      case 'ready':
        return { bg: '#FFF8E1', border: '#FFE082', text: '#FFB300' };
      case 'delivered':
        return { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' };
      case 'cancelled':
      default:
        return { bg: '#FFEBEE', border: '#EF9A9A', text: '#C62828' };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.badgeText, { color: colors.text }]}>{status}</Text>
    </View>
  );
};

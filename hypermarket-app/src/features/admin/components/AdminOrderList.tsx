import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { formatXAF } from '../../../utils/formatCurrency';
import { AdminOrder } from '../services/adminService';
import { adminStyles as styles } from '../styles/adminStyles';
import { moderateScale, scale, verticalScale } from '../../../utils/responsive';

interface AdminOrderRowProps {
  order: AdminOrder;
}

export function AdminOrderRow({ order }: AdminOrderRowProps) {
  const theme = useTheme();

  const getPaymentBadgeColors = () => {
    switch (order.paymentStatus) {
      case 'paid':
        return { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' };
      case 'pending':
        return { bg: '#FFF8E1', border: '#FFE082', text: '#FFB300' };
      case 'failed':
      default:
        return { bg: '#FFEBEE', border: '#EF9A9A', text: '#C62828' };
    }
  };

  const paymentColors = getPaymentBadgeColors();
  const customerName = typeof order.user === 'object' ? order.user.name : 'Customer';

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <View
      style={[
        styles.orderCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.orderHeader}>
        <Text style={[styles.orderId, { color: theme.text }]}>#{order.orderId}</Text>
        <Text style={[styles.orderTotal, { color: theme.primary }]}>
          {formatXAF(order.total)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: moderateScale(12), color: theme.textMuted }}>
          By {customerName} | {formattedDate}
        </Text>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          <View
            style={[
              localStyles.badge,
              { backgroundColor: paymentColors.bg, borderColor: paymentColors.border },
            ]}
          >
            <Text style={{ fontSize: moderateScale(9), fontWeight: '700', color: paymentColors.text }}>
              {order.paymentStatus.toUpperCase()}
            </Text>
          </View>

          <View style={[localStyles.badge, { backgroundColor: theme.border, borderColor: theme.border }]}>
            <Text style={{ fontSize: moderateScale(9), fontWeight: '700', color: theme.text }}>
              {order.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  badge: {
    borderWidth: 0.5,
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(3),
    borderRadius: scale(6),
  },
});

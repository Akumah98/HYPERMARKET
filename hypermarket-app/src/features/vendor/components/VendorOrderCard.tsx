import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { formatXAF } from '../../../utils/formatCurrency';
import { VendorOrder } from '../services/vendorService';
import { StatusDropdown } from './StatusDropdown';
import { vendorStyles as styles } from '../styles/vendorStyles';

interface VendorOrderCardProps {
  order: VendorOrder;
  onUpdateStatus: (orderId: string, status: any) => Promise<void>;
}

export function VendorOrderCard({ order, onUpdateStatus }: VendorOrderCardProps) {
  const theme = useTheme();

  const handleStatusChange = async (status: any) => {
    try {
      await onUpdateStatus(order._id, status);
    } catch (err) {
      // Handled by the hook / caller
    }
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View
      style={[
        styles.orderCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.orderHeader}>
        <Text style={[styles.orderId, { color: theme.text }]}>Order #{order.orderId}</Text>
        <Text style={[styles.orderDate, { color: theme.textMuted }]}>{formattedDate}</Text>
      </View>

      <Text style={[styles.orderInfo, { color: theme.text }]}>
        Customer: <Text style={{ fontWeight: '600' }}>{order.shipping.fullName}</Text>
      </Text>
      <Text style={[styles.orderInfo, { color: theme.textMuted }]}>
        Phone: {order.shipping.phone} | City: {order.shipping.city}
      </Text>

      <View style={{ marginVertical: 8 }}>
        {order.items.map((item, idx) => (
          <Text key={idx} style={[styles.orderInfo, { color: theme.text }]}>
            • {item.name} x {item.quantity} ({formatXAF(item.price)})
          </Text>
        ))}
      </View>

      <View style={[styles.orderFooter, { borderTopColor: theme.border }]}>
        <View>
          <Text style={{ fontSize: 11, color: theme.textMuted }}>Total Amount</Text>
          <Text style={[styles.orderTotal, { color: theme.primary }]}>
            {formatXAF(order.total)}
          </Text>
        </View>
        <StatusDropdown currentStatus={order.status} onSelect={handleStatusChange} />
      </View>
    </View>
  );
}

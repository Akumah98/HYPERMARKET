import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/orderStyles';
import { Order } from '../services/orderService';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatXAF } from '../../../utils/formatCurrency';

interface OrderCardProps {
  order: Order;
  onPress: (id: string) => void;
}

export const OrderCard = ({ order, onPress }: OrderCardProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const orderCode = `#AFR-${order._id.substring(order._id.length - 6).toUpperCase()}`;
  const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderCode}>{orderCode}</Text>
          <Text style={styles.orderDate}>{formattedDate}</Text>
        </View>
        <OrderStatusBadge status={order.status} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.itemsCount}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Text>
        <Text style={styles.priceVal}>{formatXAF(order.total)}</Text>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={() => onPress(order._id)}>
          <Text style={styles.detailsLink}>Track Order →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

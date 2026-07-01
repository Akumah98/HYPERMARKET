import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../../../features/orders/styles/orderStyles';
import { useOrderDetail } from '../../../features/orders/hooks/useOrderDetail';
import { OrderTimeline } from '../../../features/orders/components/OrderTimeline';
import { formatXAF } from '../../../utils/formatCurrency';
import { AppButton } from '../../../components/AppButton';

export default function OrderDetailScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const orderId = Array.isArray(id) ? id[0] : id;

  const { order, loading, cancelOrder, cancelling } = useOrderDetail(orderId);

  const orderCode = order ? `#AFR-${order._id.substring(order._id.length - 6).toUpperCase()}` : '';
  const canCancel = order?.status === 'placed';

  if (loading && !order) {
    return (
      <View style={[styles.scrollContent, { justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: theme.border, gap: 16 }}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={theme.text} /></TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text }}>Track Order</Text>
      </View>

      {order ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Information</Text>
            <Text style={{ color: theme.text }}>Order ID: {orderCode}</Text>
            <Text style={{ color: theme.text }}>Total Price: {formatXAF(order.total)}</Text>
            <Text style={{ color: theme.text }}>
              Fulfillment: {order.deliveryMethod === 'home_delivery' ? 'DELIVERY' : 'STORE PICKUP'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status Timeline</Text>
            <OrderTimeline status={order.status} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items ordered</Text>
            {order.items.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                <Text style={{ color: theme.text, flex: 1 }} numberOfLines={1}>{item.name} x{item.quantity}</Text>
                <Text style={{ color: theme.primary, fontWeight: '600' }}>{formatXAF(item.price * item.quantity)}</Text>
              </View>
            ))}
          </View>

          {order.deliveryMethod === 'home_delivery' && order.shipping && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>
              <Text style={{ color: theme.text }}>Recipient: {order.shipping.fullName}</Text>
              <Text style={{ color: theme.text }}>Phone: {order.shipping.phone}</Text>
              <Text style={{ color: theme.text }}>Street: {order.shipping.street}</Text>
              <Text style={{ color: theme.text }}>City: {order.shipping.city}</Text>
            </View>
          )}

          {order.deliveryMethod === 'store_pickup' && order.shipping && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pickup Details</Text>
              <Text style={{ color: theme.text }}>Customer: {order.shipping.fullName}</Text>
              <Text style={{ color: theme.text }}>Phone: {order.shipping.phone}</Text>
            </View>
          )}

          {canCancel ? (
            <AppButton title="Cancel Order" onPress={cancelOrder} loading={cancelling} style={{ backgroundColor: theme.error }} textStyle={{ color: '#FFFFFF' }} />
          ) : null}
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

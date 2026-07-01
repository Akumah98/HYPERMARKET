import React from 'react';
import { View, Text, FlatList, RefreshControl, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useVendorOrders } from '../../features/vendor/hooks/useVendorOrders';
import { VendorOrderCard } from '../../features/vendor/components/VendorOrderCard';
import { vendorStyles as styles } from '../../features/vendor/styles/vendorStyles';

const FILTERS = ['all', 'placed', 'processing', 'ready', 'delivered', 'cancelled'];

export default function VendorOrders() {
  const theme = useTheme();
  const { orders, loading, refreshing, error, statusFilter, setStatusFilter, refresh, updateStatus } = useVendorOrders();

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text, marginBottom: 16 }}>
        Customer Orders
      </Text>

      <View style={{ height: 42, marginBottom: 12 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setStatusFilter(filter)}
              style={[
                styles.filterBtn,
                {
                  borderColor: theme.border,
                  backgroundColor: statusFilter === filter ? theme.primary : theme.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: statusFilter === filter ? '#FFFFFF' : theme.textMuted },
                ]}
              >
                {filter.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {error && <Text style={{ color: theme.error, marginBottom: 12 }}>{error}</Text>}

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primary]} />}
        renderItem={({ item }) => (
          <VendorOrderCard order={item} onUpdateStatus={updateStatus} />
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: theme.textMuted, fontSize: 16 }}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
}

import React from 'react';
import { View, Text, FlatList, RefreshControl, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background, flex: 1 }]} edges={['top', 'left', 'right']}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text, marginBottom: 16 }}>
        Customer Orders
      </Text>

      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setStatusFilter(filter)}
              activeOpacity={0.8}
              style={[
                styles.filterBtn,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.surface,
                },
                statusFilter === filter && { backgroundColor: theme.primary, borderColor: theme.primary },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: statusFilter === filter ? '#003909' : theme.text },
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
        showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
}

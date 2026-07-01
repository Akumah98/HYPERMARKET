import React from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from '../../features/orders/styles/orderStyles';
import { useOrders } from '../../features/orders/hooks/useOrders';
import { OrderCard } from '../../features/orders/components/OrderCard';
import { EmptyOrders } from '../../features/orders/components/EmptyOrders';

const FILTER_OPTIONS = [
  { label: 'All', value: null },
  { label: 'Placed', value: 'placed' },
  { label: 'Processing', value: 'processing' },
  { label: 'Ready', value: 'ready' },
  { label: 'Delivered', value: 'delivered' },
];

export default function OrdersScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const { orders, loading, statusFilter, setStatusFilter } = useOrders();

  const handleOrderPress = (id: string) => {
    router.push(`/(customer)/order/${id}`);
  };

  const handleGoShopping = () => {
    router.replace('/(customer)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexGrow: 0 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTER_OPTIONS.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <TouchableOpacity
                key={opt.label}
                onPress={() => setStatusFilter(opt.value)}
                activeOpacity={0.8}
                style={[
                  styles.filterBtn,
                  isActive && { backgroundColor: theme.primary, borderColor: theme.primary },
                ]}
              >
                <Text style={[styles.filterText, { color: isActive ? '#003909' : theme.text }]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {loading && orders.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={handleOrderPress} />
          )}
          ListEmptyComponent={<EmptyOrders onShopPress={handleGoShopping} />}
        />
      )}
    </SafeAreaView>
  );
}

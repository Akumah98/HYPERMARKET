import React from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';
import { useVendorDashboard } from '../../features/vendor/hooks/useVendorDashboard';
import { VendorStats } from '../../features/vendor/components/VendorStats';
import { VendorProductCard } from '../../features/vendor/components/VendorProductCard';
import { vendorStyles as styles } from '../../features/vendor/styles/vendorStyles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VendorDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { stats, products, loading, refreshing, error, refresh, deleteProduct } = useVendorDashboard();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const confirmDelete = (id: string, name: string) => {
    Alert.alert('Delete Product', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteProduct(id) },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background, flex: 1 }]} edges={['top', 'left', 'right']}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text }}>Vendor Center</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={theme.error} />
        </TouchableOpacity>
      </View>

      {error && <Text style={{ color: theme.error, marginBottom: 12 }}>{error}</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primary]} />}
        ListHeaderComponent={
          <>
            {stats && <VendorStats stats={stats} productsCount={products.length} />}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 }}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>My Products</Text>
              <TouchableOpacity
                onPress={() => router.push('/(vendor)/add-product')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <Ionicons name="add-circle" size={20} color={theme.primary} />
                <Text style={{ color: theme.primary, fontWeight: '600' }}>Add New</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <VendorProductCard
            item={item}
            onEdit={(id) => router.push({ pathname: '/(vendor)/edit-product/[id]', params: { id } })}
            onDelete={confirmDelete}
          />
        )}
      />
    </SafeAreaView>
  );
}

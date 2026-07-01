import React from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';
import { useAdminDashboard } from '../../features/admin/hooks/useAdminDashboard';
import { PlatformStats } from '../../features/admin/components/PlatformStats';
import { AdminOrderRow } from '../../features/admin/components/AdminOrderList';
import { adminStyles as styles } from '../../features/admin/styles/adminStyles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { stats, orders, loading, refreshing, error, refresh } = useAdminDashboard();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text }}>Admin Panel</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={theme.error} />
        </TouchableOpacity>
      </View>

      {error && <Text style={{ color: theme.error, marginBottom: 12 }}>{error}</Text>}

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primary]} />}
        ListHeaderComponent={
          <>
            {stats && <PlatformStats stats={stats} />}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Transactions</Text>
          </>
        }
        renderItem={({ item }) => <AdminOrderRow order={item} />}
        ListEmptyComponent={
          <View style={{ marginVertical: 30, alignItems: 'center' }}>
            <Text style={{ color: theme.textMuted }}>No recent transactions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

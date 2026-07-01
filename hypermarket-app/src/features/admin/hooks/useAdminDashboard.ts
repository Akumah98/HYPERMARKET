import { useState, useCallback, useEffect } from 'react';
import { adminService, AdminStats, AdminOrder } from '../services/adminService';

export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [statsData, ordersData] = await Promise.all([
        adminService.fetchAdminStats(),
        adminService.fetchAdminOrders(1),
      ]);
      setStats(statsData);
      setOrders(ordersData.orders.slice(0, 5)); // recent 5 orders
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    stats,
    orders,
    loading,
    refreshing,
    error,
    refresh: () => loadDashboardData(true),
  };
}

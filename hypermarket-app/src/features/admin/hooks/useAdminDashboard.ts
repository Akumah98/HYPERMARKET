import { useState, useCallback, useEffect } from 'react';
import { adminService, AdminStats, AdminOrder } from '../services/adminService';
import { eventBus } from '../../../utils/eventBus';

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

  useEffect(() => {
    const unsubPlaced = eventBus.on('order.placed', (newOrder) => {
      setOrders((prev) => {
        if (prev.some((o) => o._id === newOrder._id)) return prev;
        return [newOrder, ...prev].slice(0, 5);
      });
      setStats((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          totalOrders: prev.totalOrders + 1,
          totalRevenue: prev.totalRevenue + newOrder.total,
        };
      });
    });

    const unsubStatus = eventBus.on('order.statusChanged', ({ orderId, status }) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    });

    return () => {
      unsubPlaced();
      unsubStatus();
    };
  }, []);

  return {
    stats,
    orders,
    loading,
    refreshing,
    error,
    refresh: () => loadDashboardData(true),
  };
}

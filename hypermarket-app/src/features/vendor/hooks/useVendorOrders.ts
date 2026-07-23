import { useState, useCallback, useEffect } from 'react';
import { vendorService, VendorOrder } from '../services/vendorService';
import { eventBus } from '../../../utils/eventBus';

export function useVendorOrders() {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchOrders = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const activeFilter = statusFilter === 'all' ? undefined : statusFilter;
      const data = await vendorService.fetchVendorOrders(1, activeFilter);
      setOrders(data.orders);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load vendor orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const oldOrder = orders.find((o) => o._id === orderId);
      const oldStatus = oldOrder ? oldOrder.status : undefined;
      const updatedOrder = await vendorService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: updatedOrder.status } : o))
      );
      eventBus.emit('order.statusChanged', { orderId, status: updatedOrder.status, oldStatus });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    return eventBus.on('order.placed', (newOrder) => {
      setOrders((prev) => {
        if (prev.some((o) => o._id === newOrder._id)) return prev;
        return [newOrder, ...prev];
      });
    });
  }, []);

  return {
    orders,
    loading,
    refreshing,
    error,
    statusFilter,
    setStatusFilter,
    refresh: () => fetchOrders(true),
    updateStatus,
  };
}

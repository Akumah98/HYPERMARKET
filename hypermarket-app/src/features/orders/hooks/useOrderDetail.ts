import { useState, useEffect, useCallback } from 'react';
import { orderService, Order } from '../services/orderService';

export const useOrderDetail = (id?: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrderDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const cancelOrder = useCallback(async () => {
    if (!id) return;
    setCancelling(true);
    setError(null);
    try {
      const updatedOrder = await orderService.cancelOrder(id);
      setOrder(updatedOrder);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  return {
    order,
    loading,
    error,
    cancelling,
    refetch: fetchOrderDetail,
    cancelOrder,
  };
};

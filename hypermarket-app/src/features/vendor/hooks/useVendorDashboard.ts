import { useState, useCallback, useEffect } from 'react';
import { vendorService, VendorStats } from '../services/vendorService';
import { Product } from '../../catalog/services/catalogService';

export function useVendorDashboard() {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
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
      const [statsData, productsData] = await Promise.all([
        vendorService.fetchVendorStats(),
        vendorService.fetchVendorProducts(1),
      ]);
      setStats(statsData);
      setProducts(productsData.products);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      await vendorService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (stats) {
        setStats({
          ...stats,
          topProducts: stats.topProducts.filter((p) => p.product !== id),
        });
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    stats,
    products,
    loading,
    refreshing,
    error,
    refresh: () => loadDashboardData(true),
    deleteProduct: handleDeleteProduct,
  };
}

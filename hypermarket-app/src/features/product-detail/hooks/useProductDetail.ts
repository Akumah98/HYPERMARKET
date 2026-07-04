import { useState, useEffect, useCallback } from 'react';
import { productDetailService } from '../services/productDetailService';
import { Product } from '../../catalog/services/catalogService';
import { eventBus } from '../../../utils/eventBus';

export const useProductDetail = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await productDetailService.getProductDetails(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    if (!id) return;
    const interval = setInterval(() => {
      productDetailService.getProductDetails(id)
        .then((data) => setProduct(data))
        .catch((err) => console.log('Product detail poll error:', err.message));
    }, 5000);
    return () => clearInterval(interval);
  }, [id, fetchProduct]);

  useEffect(() => {
    return eventBus.on('order.placed', (newOrder) => {
      if (!id) return;
      const purchasedItem = newOrder.items?.find((item: any) => {
        const prodId = typeof item.product === 'object' ? item.product._id : item.product;
        return prodId === id;
      });
      if (purchasedItem) {
        setProduct((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            stock: Math.max(0, prev.stock - purchasedItem.quantity),
          };
        });
      }
    });
  }, [id]);

  return { product, loading, error, refetch: fetchProduct };
};

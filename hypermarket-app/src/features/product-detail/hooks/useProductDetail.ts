import { useState, useEffect, useCallback } from 'react';
import { productDetailService } from '../services/productDetailService';
import { Product } from '../../catalog/services/catalogService';

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
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};

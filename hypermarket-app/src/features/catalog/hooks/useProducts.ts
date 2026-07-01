import { useState, useEffect, useCallback, useRef } from 'react';
import { catalogService, Product, FetchProductsParams } from '../services/catalogService';

export const useProducts = (filters: Omit<FetchProductsParams, 'page' | 'limit'>) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const fetchProducts = useCallback(async (pageToFetch: number, append = false) => {
    if (pageToFetch === 1) setLoading(true);
    else setLoadingMore(true);
    setError(null);

    try {
      const data = await catalogService.getProducts({
        ...filtersRef.current,
        page: pageToFetch,
        limit: 40,
      });

      setProducts((prev) => (append ? [...prev, ...data.products] : data.products));
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const catsStr = JSON.stringify(filters.categories);
  const badgesStr = JSON.stringify(filters.badges);

  useEffect(() => {
    fetchProducts(1, false);
  }, [
    filters.categoryId,
    catsStr,
    filters.search,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock,
    filters.rating,
    badgesStr,
    fetchProducts,
  ]);

  const loadMore = useCallback(() => {
    if (page < totalPages && !loadingMore && !loading) {
      fetchProducts(page + 1, true);
    }
  }, [page, totalPages, loadingMore, loading, fetchProducts]);

  return {
    products,
    loading,
    loadingMore,
    error,
    page,
    totalPages,
    refetch: () => fetchProducts(1, false),
    loadMore,
  };
};

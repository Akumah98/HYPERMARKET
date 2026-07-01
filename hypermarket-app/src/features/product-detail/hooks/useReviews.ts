import { useState, useEffect, useCallback } from 'react';
import { productDetailService, Review } from '../services/productDetailService';

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await productDetailService.getProductReviews(productId);
      setReviews(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const submitReview = useCallback(
    async (rating: number, comment: string) => {
      if (!productId) return;
      try {
        await productDetailService.createReview(productId, rating, comment);
        await fetchReviews();
      } catch (err: any) {
        throw new Error(err.response?.data?.message || 'Failed to submit review');
      }
    },
    [productId, fetchReviews]
  );

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, submitReview, refetch: fetchReviews };
};

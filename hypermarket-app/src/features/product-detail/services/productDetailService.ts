import { api } from '../../../services/api';
import { Product } from '../../catalog/services/catalogService';

export interface Review {
  _id: string;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export const productDetailService = {
  getProductDetails: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },

  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data.data;
  },

  createReview: async (
    productId: string,
    rating: number,
    comment: string
  ): Promise<Review> => {
    const response = await api.post('/reviews', {
      product: productId,
      rating,
      comment,
    });
    return response.data.data;
  },
};

import { api } from '../../../services/api';
import { Product } from '../../catalog/services/catalogService';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  priceSnapshot?: number;
}

export interface CartResponse {
  _id: string;
  user: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const cartService = {
  getCart: async (): Promise<CartResponse> => {
    const response = await api.get('/cart');
    return response.data.data;
  },

  addItem: async (productId: string, quantity = 1): Promise<CartResponse> => {
    const response = await api.post('/cart/items', { product: productId, quantity });
    return response.data.data;
  },

  updateQuantity: async (itemId: string, quantity: number): Promise<CartResponse> => {
    const response = await api.put(`/cart/items/${itemId}`, { quantity });
    return response.data.data;
  },

  removeItem: async (itemId: string): Promise<CartResponse> => {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data.data;
  },

  clearCart: async (): Promise<CartResponse> => {
    const response = await api.delete('/cart');
    return response.data.data;
  },
};

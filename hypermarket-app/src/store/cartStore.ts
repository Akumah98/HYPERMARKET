import { create } from 'zustand';
import { cartService, CartItem, CartResponse } from '../features/cart/services/cartService';
import { eventBus } from '../utils/eventBus';

interface CartState {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => {
  eventBus.on('order.placed', () => {
    set({ items: [], subtotal: 0, deliveryFee: 0, total: 0 });
  });

  const handleResponse = (data: CartResponse) => {
    set({
      items: data.items || [],
      subtotal: data.subtotal || 0,
      deliveryFee: data.deliveryFee || 0,
      total: data.total || 0,
      loading: false,
    });
  };

  return {
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    loading: false,
    error: null,

    fetchCart: async () => {
      set({ loading: true, error: null });
      try {
        const data = await cartService.getCart();
        handleResponse(data);
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Failed to load cart', loading: false });
      }
    },

    addToCart: async (productId: string, quantity = 1) => {
      set({ loading: true, error: null });
      try {
        const data = await cartService.addItem(productId, quantity);
        handleResponse(data);
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Failed to add item', loading: false });
      }
    },

    updateQuantity: async (itemId: string, quantity: number) => {
      set({ loading: true, error: null });
      try {
        const data = await cartService.updateQuantity(itemId, quantity);
        handleResponse(data);
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Failed to update quantity', loading: false });
      }
    },

    removeFromCart: async (itemId: string) => {
      set({ loading: true, error: null });
      try {
        const data = await cartService.removeItem(itemId);
        handleResponse(data);
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Failed to remove item', loading: false });
      }
    },

    clearCart: async () => {
      set({ loading: true, error: null });
      try {
        const data = await cartService.clearCart();
        handleResponse(data);
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Failed to clear cart', loading: false });
      }
    },
  };
});

import { useEffect, useCallback } from 'react';
import { useCartStore } from '../../../store/cartStore';

export const useCart = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    loading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    items,
    subtotal,
    deliveryFee,
    total,
    loading,
    error,
    refreshCart: fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};

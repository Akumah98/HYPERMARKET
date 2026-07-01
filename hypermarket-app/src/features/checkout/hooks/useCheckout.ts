import { useState, useCallback } from 'react';
import { checkoutService, OrderResponse } from '../services/checkoutService';
import { useCartStore } from '../../../store/cartStore';
import { useAuthStore } from '../../../store/authStore';

export type FulfillmentType = 'delivery' | 'pickup';
export type PaymentMethod = 'mtn_momo' | 'orange_money';

const mapDeliveryMethod = (type: FulfillmentType) =>
  type === 'delivery' ? 'home_delivery' : 'store_pickup';

export const useCheckout = () => {
  const { user } = useAuthStore();
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    (user?.billing?.paymentMethod as PaymentMethod) || 'mtn_momo'
  );

  // Shipping fields
  const [fullName, setFullName] = useState(user?.name || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [region, setRegion] = useState(user?.address?.region || '');
  const [shippingPhone, setShippingPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<OrderResponse | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  const placeOrder = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!fullName.trim()) {
        throw new Error('Please enter your full name.');
      }
      if (!shippingPhone.trim()) {
        throw new Error('Please enter your phone number.');
      }
      const isPickup = fulfillmentType === 'pickup';
      if (!isPickup && !city.trim()) {
        throw new Error('Please enter your city.');
      }
      if (!isPickup && !street.trim()) {
        throw new Error('Please enter a street address for delivery.');
      }

      const order = await checkoutService.createOrder({
        deliveryMethod: mapDeliveryMethod(fulfillmentType),
        shipping: {
          fullName: fullName.trim(),
          street: isPickup ? 'Store Pickup' : street.trim(),
          city: isPickup ? 'Douala' : city.trim(),
          region: isPickup ? 'Centre' : (region.trim() || 'Centre'),
          phone: shippingPhone.trim(),
        },
        paymentMethod,
      });

      setPlacedOrder(order);
      await clearCart();
      return order;
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to place order';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fulfillmentType, fullName, street, city, region, shippingPhone, paymentMethod, notes, clearCart]);

  return {
    fulfillmentType,
    setFulfillmentType,
    paymentMethod,
    setPaymentMethod,
    fullName,
    setFullName,
    street,
    setStreet,
    city,
    setCity,
    region,
    setRegion,
    shippingPhone,
    setShippingPhone,
    notes,
    setNotes,
    loading,
    error,
    placedOrder,
    placeOrder,
  };
};

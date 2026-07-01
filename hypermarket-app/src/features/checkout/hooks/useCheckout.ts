import { useState, useCallback } from 'react';
import { checkoutService, OrderResponse } from '../services/checkoutService';
import { useCartStore } from '../../../store/cartStore';

export type FulfillmentType = 'delivery' | 'pickup';
export type PaymentMethod = 'mtn_momo' | 'orange_money';

const mapDeliveryMethod = (type: FulfillmentType) =>
  type === 'delivery' ? 'home_delivery' : 'store_pickup';

export const useCheckout = () => {
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mtn_momo');

  // Shipping fields
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
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
      if (!city.trim()) {
        throw new Error('Please enter your city.');
      }
      if (fulfillmentType === 'delivery' && !street.trim()) {
        throw new Error('Please enter a street address for delivery.');
      }

      const order = await checkoutService.createOrder({
        deliveryMethod: mapDeliveryMethod(fulfillmentType),
        shipping: {
          fullName: fullName.trim(),
          street: street.trim(),
          city: city.trim(),
          region: region.trim() || 'Centre',
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

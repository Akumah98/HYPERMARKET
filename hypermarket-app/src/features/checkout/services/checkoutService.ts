import { api } from '../../../services/api';

export interface ShippingInfo {
  fullName: string;
  street: string;
  city: string;
  region?: string;
  phone: string;
}

export interface OrderPayload {
  deliveryMethod: 'home_delivery' | 'store_pickup';
  shipping: ShippingInfo;
  paymentMethod: 'mtn_momo' | 'orange_money';
}

export interface OrderResponse {
  _id: string;
  customer: string;
  totalAmount: number;
  status: 'placed' | 'processing' | 'ready' | 'delivered';
  deliveryMethod: 'home_delivery' | 'store_pickup';
  shipping: ShippingInfo;
  createdAt: string;
}

export const checkoutService = {
  createOrder: async (payload: OrderPayload): Promise<OrderResponse> => {
    const response = await api.post('/orders', payload);
    return response.data.data;
  },

  initiatePayment: async (orderId: string, phone: string): Promise<string> => {
    const response = await api.post('/payment/initiate', { orderId, phone });
    return response.data.data.transId;
  },

  getPaymentStatus: async (transId: string): Promise<'SUCCESSFUL' | 'FAILED' | 'PENDING' | 'EXPIRED'> => {
    const response = await api.get(`/payment/status/${transId}`);
    return response.data.data.status;
  },
};

import { api } from '../../../services/api';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  vendorId: string;
}

export interface Order {
  _id: string;
  customer: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  fulfillmentType?: 'delivery' | 'pickup';
  deliveryMethod: 'home_delivery' | 'store_pickup';
  deliveryAddress?: {
    street: string;
    city: string;
  };
  shipping?: {
    fullName: string;
    street: string;
    quarter?: string;
    city: string;
    region?: string;
    phone: string;
  };
  payment?: {
    provider: string;
    transId?: string;
    status: 'pending' | 'successful' | 'failed';
    phone?: string;
    paidAt?: string;
  };
  createdAt: string;
}

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data.data.orders || response.data.data || [];
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data;
  },

  cancelOrder: async (id: string): Promise<Order> => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data.data;
  },
};

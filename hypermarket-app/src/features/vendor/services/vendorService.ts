import { api } from '../../../services/api';
import { Product } from '../../catalog/services/catalogService';

export interface VendorStats {
  totalRevenue: number;
  deliveredOrdersCount: number;
  totalSales: number;
  topProducts: {
    product: string;
    name: string;
    quantitySold: number;
    revenue: number;
  }[];
}

export interface VendorOrder {
  _id: string;
  orderId: string;
  user: { _id: string; name: string; email: string };
  items: {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: 'home_delivery' | 'store_pickup';
  shipping: {
    fullName: string;
    phone: string;
    city: string;
    street?: string;
  };
  paymentMethod: 'mtn_momo' | 'orange_money';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface VendorOrdersResponse {
  orders: VendorOrder[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface VendorProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export const vendorService = {
  fetchVendorStats: async (): Promise<VendorStats> => {
    const response = await api.get('/vendor/stats');
    return response.data.data;
  },

  fetchVendorOrders: async (page = 1, status?: string): Promise<VendorOrdersResponse> => {
    const params = { page, limit: 10, ...(status ? { status } : {}) };
    const response = await api.get('/vendor/orders', { params });
    return response.data.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<VendorOrder> => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data.data;
  },

  fetchVendorProducts: async (page = 1): Promise<VendorProductsResponse> => {
    const response = await api.get('/vendor/products', { params: { page, limit: 10 } });
    return response.data.data;
  },

  createProduct: async (productData: any): Promise<Product> => {
    const response = await api.post('/products', productData);
    return response.data.data;
  },

  updateProduct: async (id: string, productData: any): Promise<Product> => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  uploadProductImages: async (id: string, imageUris: string[]): Promise<Product> => {
    const formData = new FormData();
    imageUris.forEach((uri, index) => {
      const filename = uri.split('/').pop() || `image_${index}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;
      formData.append('images', {
        uri,
        name: filename,
        type,
      } as any);
    });
    const response = await api.post(`/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
};

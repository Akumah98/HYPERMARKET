import { api } from '../../../services/api';

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  phone: string;
  address?: {
    street?: string;
    quarter?: string;
    city: string;
    region: string;
  };
  createdAt: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface AdminOrder {
  _id: string;
  orderId: string;
  user: string | { _id: string; name: string };
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export const adminService = {
  fetchAdminStats: async (): Promise<AdminStats> => {
    const response = await api.get('/admin/stats');
    return response.data.data;
  },

  fetchAdminUsers: async (page = 1, role?: string): Promise<AdminUsersResponse> => {
    const params = { page, limit: 15, ...(role ? { role } : {}) };
    const response = await api.get('/admin/users', { params });
    return response.data.data;
  },

  fetchAdminOrders: async (page = 1, status?: string): Promise<AdminOrdersResponse> => {
    const params = { page, limit: 10, ...(status ? { status } : {}) };
    const response = await api.get('/admin/orders', { params });
    return response.data.data;
  },
};

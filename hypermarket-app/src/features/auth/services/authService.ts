import { api } from '../../../services/api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (payload: any) => {
    const response = await api.post('/auth/register', payload);
    return response.data;
  },
};

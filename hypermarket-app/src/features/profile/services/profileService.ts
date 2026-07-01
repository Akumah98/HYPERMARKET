import { api } from '../../../services/api';
import { User } from '../../../store/authStore';

export const profileService = {
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile', data);
    return response.data.data;
  },
};

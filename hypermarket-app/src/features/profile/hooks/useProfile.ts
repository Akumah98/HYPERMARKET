import { useState, useCallback } from 'react';
import { useAuthStore, User } from '../../../store/authStore';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveProfile = useCallback(
    async (updatedData: Partial<User>) => {
      try {
        const updatedUser = await profileService.updateProfile(updatedData);
        await updateUser(updatedUser);
        return true;
      } catch (err) {
        console.error('Failed to update profile:', err);
        return false;
      }
    },
    [updateUser]
  );

  return {
    user,
    modalVisible,
    setModalVisible,
    handleSaveProfile,
  };
};

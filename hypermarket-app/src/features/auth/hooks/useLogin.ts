import { useState } from 'react';
import { router } from 'expo-router';
import { authService } from '../services/authService';
import { useAuthStore } from '../../../store/authStore';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginStore = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email.trim(), password);
      
      const { user, token } = response.data;
      await loginStore(user, token);

      // Role-based routing redirection
      if (user.role === 'admin') {
        router.replace('/(admin)/dashboard');
      } else if (user.role === 'vendor') {
        router.replace('/(vendor)/dashboard');
      } else {
        router.replace('/(customer)');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};

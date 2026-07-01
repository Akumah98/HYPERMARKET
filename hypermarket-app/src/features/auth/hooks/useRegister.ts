import { useState } from 'react';
import { router } from 'expo-router';
import { authService } from '../services/authService';
import { useAuthStore } from '../../../store/authStore';

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginStore = useAuthStore((state) => state.login);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !phone.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim(),
        role,
      });

      const { user, token } = response.data;
      await loginStore(user, token);

      if (user.role === 'vendor') {
        router.replace('/(vendor)/dashboard');
      } else {
        router.replace('/(customer)');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
    role,
    setRole,
    loading,
    error,
    handleRegister,
  };
};

import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const user = useAuthStore((state) => state.user);

  // Wait until we have completed loading the auth state from AsyncStorage
  if (!isInitialized) {
    return null;
  }

  // If not logged in, redirect to sign-in screen
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Redirect to role-based dashboard landing pages
  if (user?.role === 'admin') {
    return <Redirect href="/(admin)/dashboard" />;
  }

  if (user?.role === 'vendor') {
    return <Redirect href="/(vendor)/dashboard" />;
  }

  // Default customer view
  return <Redirect href="/(customer)" />;
}

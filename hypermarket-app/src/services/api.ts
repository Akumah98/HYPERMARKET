import axios from 'axios';
import { Platform } from 'react-native';
import { useAuthStore } from '../store/authStore';

import Constants from 'expo-constants';

const getBaseURL = () => {
  return 'https://hypermarket-iy8o.onrender.com/api';
};

const baseURL = getBaseURL();

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

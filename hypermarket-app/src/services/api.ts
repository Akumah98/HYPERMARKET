import axios from 'axios';
import { Platform } from 'react-native';
import { useAuthStore } from '../store/authStore';

import Constants from 'expo-constants';

const getBaseURL = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  const ip = hostUri ? hostUri.split(':').shift() : null;
  if (ip) return `http://${ip}:5000/api`;
  return Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';
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

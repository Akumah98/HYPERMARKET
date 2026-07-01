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

// Helper to recursively convert product image string arrays to { url: string, publicId: string }[]
const normalizeProductImages = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(normalizeProductImages);
  }

  // If this object represents a product
  if (obj._id && (obj.name !== undefined || obj.price !== undefined) && Array.isArray(obj.images)) {
    return {
      ...obj,
      images: obj.images.map((img: any) => {
        if (typeof img === 'string') {
          return { url: img, publicId: img };
        }
        return img;
      }),
    };
  }

  // Recurse down keys
  const newObj: any = {};
  for (const key of Object.keys(obj)) {
    newObj[key] = normalizeProductImages(obj[key]);
  }
  return newObj;
};

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = normalizeProductImages(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

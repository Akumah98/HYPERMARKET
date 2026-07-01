import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { vendorService } from '../services/vendorService';
import { Product } from '../../catalog/services/catalogService';

export function useProductForm(initialProduct?: Product) {
  const [name, setName] = useState(initialProduct?.name || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [price, setPrice] = useState(initialProduct?.price?.toString() || '');
  const [compareAtPrice, setCompareAtPrice] = useState(initialProduct?.comparePrice?.toString() || '');
  const [stock, setStock] = useState(initialProduct?.stock?.toString() || '');
  const [category, setCategory] = useState(
    typeof initialProduct?.category === 'object'
      ? initialProduct?.category?._id
      : initialProduct?.category || ''
  );
  const [unit, setUnit] = useState(initialProduct?.unit || 'piece');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access library was denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, ...result.assets.map((a) => a.uri)].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (): Promise<Product> => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name,
        description,
        price: parseFloat(price) || 0,
        compareAtPrice: parseFloat(compareAtPrice) || 0,
        stock: parseInt(stock, 10) || 0,
        category,
        unit,
      };
      let savedProduct: Product;
      if (initialProduct) {
        savedProduct = await vendorService.updateProduct(initialProduct._id, payload);
      } else {
        savedProduct = await vendorService.createProduct(payload);
      }
      if (images.length > 0) {
        savedProduct = await vendorService.uploadProductImages(savedProduct._id, images);
      }
      return savedProduct;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to save product';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    name, setName,
    description, setDescription,
    price, setPrice,
    compareAtPrice, setCompareAtPrice,
    stock, setStock,
    category, setCategory,
    unit, setUnit,
    images, pickImage, removeImage,
    loading, error, submit,
  };
}

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import { useCategories } from '../../../features/catalog/hooks/useCategories';
import { catalogService, Product } from '../../../features/catalog/services/catalogService';
import { EditProductForm } from '../../../features/vendor/components/EditProductForm';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

export default function EditProduct() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { categories, loading: catsLoading } = useCategories();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await catalogService.getProductById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading || catsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Edit Product</Text>
        <View style={{ width: 24 }} />
      </View>

      {error && <Text style={{ color: theme.error, margin: 16 }}>{error}</Text>}

      {product && <EditProductForm product={product} categories={categories} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  backBtn: {
    padding: scale(4),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
});

import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { ProductList } from '../../../features/catalog/components/ProductList';
import { useProducts } from '../../../features/catalog/hooks/useProducts';
import { scale, verticalScale } from '../../../utils/responsive';
import { Product } from '../../../features/catalog/services/catalogService';

export default function CategoryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id;

  const { products, loading, loadingMore, loadMore } = useProducts({
    categoryId,
  });

  const handleProductPress = (prodId: string) => {
    router.push(`/product/${prodId}`);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart from category screen:', product.name);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Category Products</Text>
      </View>

      <ProductList
        products={products}
        loading={loading}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
        onProductPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(56),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: scale(16),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: '700',
  },
});

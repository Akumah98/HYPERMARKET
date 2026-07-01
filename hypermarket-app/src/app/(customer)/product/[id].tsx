import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useProductDetail } from '../../../features/product-detail/hooks/useProductDetail';
import { useReviews } from '../../../features/product-detail/hooks/useReviews';
import { ImageCarousel } from '../../../features/product-detail/components/ImageCarousel';
import { ProductInfo } from '../../../features/product-detail/components/ProductInfo';
import { ReviewList } from '../../../features/product-detail/components/ReviewList';
import { AddToCartButton } from '../../../features/product-detail/components/AddToCartButton';
import { useCartStore } from '../../../store/cartStore';
import { scale, verticalScale } from '../../../utils/responsive';
import { formatXAF } from '../../../utils/formatCurrency';

export default function ProductDetailScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const { product, loading: detailsLoading } = useProductDetail(productId);
  const { reviews, loading: reviewsLoading, submitReview } = useReviews(productId);
  const addToCart = useCartStore((state) => state.addToCart);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!productId) return;
    setAdding(true);
    await addToCart(productId, 1);
    setAdding(false);
  };

  if (detailsLoading && !product) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Product Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {product ? (
          <React.Fragment>
            <ImageCarousel images={product.images} />
            <ProductInfo product={product} />
            <ReviewList reviews={reviews} loading={reviewsLoading} onSubmitReview={submitReview} />
          </React.Fragment>
        ) : null}
      </ScrollView>

      {product ? (
        <View style={[styles.bottomBar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
          <View>
            <Text style={{ color: theme.textMuted, fontSize: scale(11) }}>Price</Text>
            <Text style={[styles.price, { color: theme.primary }]}>{formatXAF(product.price)}</Text>
          </View>
          <View style={{ width: '60%' }}>
            <AddToCartButton onPress={handleAddToCart} loading={adding} disabled={product.stock <= 0} />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: verticalScale(100) },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', height: verticalScale(56), paddingHorizontal: scale(16), borderBottomWidth: 1, gap: scale(16) },
  headerTitle: { fontSize: scale(18), fontWeight: '700' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: verticalScale(76), borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(16) },
  price: { fontSize: scale(18), fontWeight: '800' },
});

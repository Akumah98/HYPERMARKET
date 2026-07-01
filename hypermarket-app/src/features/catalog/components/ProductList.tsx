import React from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ProductCard } from './ProductCard';
import { Product } from '../services/catalogService';
import { scale, verticalScale } from '../../../utils/responsive';
import { getStyles } from '../styles/catalogStyles';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  onProductPress: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({
  products,
  loading,
  loadingMore,
  onLoadMore,
  onProductPress,
  onAddToCart,
}: ProductListProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  if (loading && products.length === 0) {
    return (
      <View style={localStyles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={onProductPress}
          onAddToCart={onAddToCart}
        />
      )}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <View style={localStyles.footerLoading}>
            <ActivityIndicator size="small" color={theme.primary} />
          </View>
        ) : null
      }
      ListEmptyComponent={
        !loading ? (
          <View style={localStyles.center}>
            <Text style={[localStyles.emptyText, { color: theme.textMuted }]}>
              No products found.
            </Text>
          </View>
        ) : null
      }
    />
  );
};

const localStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyText: {
    fontSize: scale(15),
    fontWeight: '500',
  },
  footerLoading: {
    paddingVertical: verticalScale(16),
    alignItems: 'center',
  },
});

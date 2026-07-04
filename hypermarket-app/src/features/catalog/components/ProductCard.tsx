import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/productCardStyles';
import { Product } from '../services/catalogService';
import { formatXAF } from '../../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = React.memo(({ product, onPress, onAddToCart }: ProductCardProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Fallback placeholder image url
  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/150';

  return (
    <TouchableOpacity
      onPress={() => onPress(product._id)}
      activeOpacity={0.9}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.productImage}
          contentFit="cover"
          transition={200}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{formatXAF(product.price)}</Text>
          {product.comparePrice && product.comparePrice > product.price ? (
            <Text style={styles.comparePrice}>{formatXAF(product.comparePrice)}</Text>
          ) : null}
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color="#FFBA38" />
            <Text style={styles.ratingText}>
              {product.averageRating > 0 ? product.averageRating.toFixed(1) : 'N/A'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            activeOpacity={0.8}
            style={styles.buyButton}
          >
            <Ionicons name="cart-outline" size={16} color="#003909" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  return prevProps.product._id === nextProps.product._id &&
         prevProps.product.price === nextProps.product.price &&
         prevProps.product.stock === nextProps.product.stock &&
         prevProps.product.averageRating === nextProps.product.averageRating &&
         prevProps.product.reviewCount === nextProps.product.reviewCount &&
         prevProps.onPress === nextProps.onPress &&
         prevProps.onAddToCart === nextProps.onAddToCart;
});

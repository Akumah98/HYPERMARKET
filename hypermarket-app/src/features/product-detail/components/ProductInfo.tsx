import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/productDetailStyles';
import { Product } from '../../catalog/services/catalogService';
import { formatXAF } from '../../../utils/formatCurrency';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const inStock = product.stock > 0;

  return (
    <View style={styles.infoBlock}>
      <View style={styles.titleRow}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text
          style={[
            styles.stockText,
            {
              backgroundColor: inStock ? '#E8F5E9' : '#FFEBEE',
              color: inStock ? '#2E7D32' : '#C62828',
            },
          ]}
        >
          {inStock ? `${product.stock} ${product.unit || 'units'} In Stock` : 'Out of Stock'}
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatXAF(product.price)}</Text>
        {product.comparePrice && product.comparePrice > product.price ? (
          <Text style={styles.comparePrice}>{formatXAF(product.comparePrice)}</Text>
        ) : null}
      </View>

      <View style={[styles.ratingRow, { marginTop: 4 }]}>
        <Ionicons name="star" size={16} color="#FFBA38" />
        <Text style={[styles.ratingText, { fontSize: 13 }]}>
          {product.averageRating > 0
            ? `${product.averageRating.toFixed(1)} (${product.reviewCount} reviews)`
            : 'No reviews yet'}
        </Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

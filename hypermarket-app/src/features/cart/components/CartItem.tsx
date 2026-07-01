import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/cartStyles';
import { CartItem as CartItemType } from '../services/cartService';
import { QuantitySelector } from './QuantitySelector';
import { formatXAF } from '../../../utils/formatCurrency';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  disabled = false,
}: CartItemProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const imageUrl = item.product?.images?.[0]?.url || 'https://via.placeholder.com/150';

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {item.product?.name}
        </Text>
        <Text style={styles.price}>
          {formatXAF(item.priceSnapshot ?? item.product?.price ?? item.price ?? 0)}
        </Text>

        <View style={styles.actionRow}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item._id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item._id, item.quantity - 1)}
            disabled={disabled}
          />

          <TouchableOpacity
            onPress={() => onRemove(item._id)}
            disabled={disabled}
            style={styles.removeBtn}
          >
            <Ionicons name="trash-outline" size={20} color={theme.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

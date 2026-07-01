import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Product } from '../../catalog/services/catalogService';
import { formatXAF } from '../../../utils/formatCurrency';
import { vendorStyles as styles } from '../styles/vendorStyles';
import { Ionicons } from '@expo/vector-icons';

interface VendorProductCardProps {
  item: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

export function VendorProductCard({ item, onEdit, onDelete }: VendorProductCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.productCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      {item.images?.[0]?.url ? (
        <Image source={{ uri: item.images[0].url }} style={{ width: 50, height: 50, borderRadius: 8 }} />
      ) : (
        <View style={{ width: 50, height: 50, borderRadius: 8, backgroundColor: theme.border, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="image-outline" size={20} color={theme.textMuted} />
        </View>
      )}
      <View style={styles.productDetails}>
        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.productMeta, { color: theme.textMuted }]}>
          {formatXAF(item.price)} • {item.stock} {item.unit}s
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onEdit(item._id)}
          style={[styles.actionBtn, { backgroundColor: theme.primary + '15' }]}
        >
          <Ionicons name="create-outline" size={18} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item._id, item.name)}
          style={[styles.actionBtn, { backgroundColor: theme.error + '15' }]}
        >
          <Ionicons name="trash-outline" size={18} color={theme.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

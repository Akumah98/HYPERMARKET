import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { formatXAF } from '../../../utils/formatCurrency';
import { VendorStats as StatsType } from '../services/vendorService';
import { vendorStyles as styles } from '../styles/vendorStyles';

interface VendorStatsProps {
  stats: StatsType;
  productsCount: number;
}

export function VendorStats({ stats, productsCount }: VendorStatsProps) {
  const theme = useTheme();

  const cards = [
    {
      label: 'Revenue',
      value: formatXAF(stats.totalRevenue),
      color: theme.primary,
    },
    {
      label: 'Orders',
      value: stats.totalSales.toString(),
      color: '#1E88E5',
    },
    {
      label: 'Delivered',
      value: stats.deliveredOrdersCount.toString(),
      color: theme.primaryDark,
    },
    {
      label: 'Products',
      value: productsCount.toString(),
      color: theme.tertiary,
    },
  ];

  return (
    <View style={styles.statsGrid}>
      {cards.map((card, index) => (
        <View
          key={index}
          style={[
            styles.statCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.statLabel, { color: theme.textMuted }]}>{card.label}</Text>
          <Text style={[styles.statValue, { color: card.color }]}>{card.value}</Text>
        </View>
      ))}
    </View>
  );
}

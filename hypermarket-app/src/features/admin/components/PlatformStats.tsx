import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { formatXAF } from '../../../utils/formatCurrency';
import { AdminStats } from '../services/adminService';
import { adminStyles as styles } from '../styles/adminStyles';

interface PlatformStatsProps {
  stats: AdminStats;
}

export function PlatformStats({ stats }: PlatformStatsProps) {
  const theme = useTheme();

  const cards = [
    {
      label: 'Total Revenue',
      value: formatXAF(stats.totalRevenue),
      color: theme.primary,
    },
    {
      label: 'Registered Users',
      value: stats.totalUsers.toString(),
      color: '#1E88E5',
    },
    {
      label: 'Products Catalog',
      value: stats.totalProducts.toString(),
      color: theme.tertiary,
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toString(),
      color: theme.primaryDark,
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

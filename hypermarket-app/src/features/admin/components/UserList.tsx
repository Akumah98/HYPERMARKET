import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { AdminUser } from '../services/adminService';
import { adminStyles as styles } from '../styles/adminStyles';

interface UserCardProps {
  user: AdminUser;
}

export function UserCard({ user }: UserCardProps) {
  const theme = useTheme();

  const getRoleBadgeColors = () => {
    switch (user.role) {
      case 'admin':
        return { bg: '#FFEBEE', border: '#EF9A9A', text: '#C62828' };
      case 'vendor':
        return { bg: '#EDE7F6', border: '#B39DDB', text: '#5E35B1' };
      case 'customer':
      default:
        return { bg: '#E3F2FD', border: '#90CAF9', text: '#1E88E5' };
    }
  };

  const colors = getRoleBadgeColors();

  return (
    <View
      style={[
        styles.userCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.userDetails}>
        <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
        <Text style={[styles.userMeta, { color: theme.textMuted }]} numberOfLines={1}>
          {user.email}
        </Text>
        {user.phone && (
          <Text style={[styles.userMeta, { color: theme.textMuted }]}>
            Phone: {user.phone}
          </Text>
        )}
      </View>

      <View
        style={[
          styles.roleBadge,
          { backgroundColor: colors.bg, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.roleText, { color: colors.text }]}>
          {user.role.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

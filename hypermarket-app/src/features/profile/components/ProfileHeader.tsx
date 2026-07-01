import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/profileStyles';

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export const ProfileHeader = ({ name, email }: ProfileHeaderProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const initials = name ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <View style={styles.headerCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileEmail}>{email}</Text>
    </View>
  );
};

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';
import { AppButton } from '../../components/AppButton';
import { scale, verticalScale } from '../../utils/responsive';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Profile Settings</Text>
      {user ? (
        <View style={styles.card}>
          <Text style={[styles.info, { color: theme.text }]}>Name: {user.name}</Text>
          <Text style={[styles.info, { color: theme.text }]}>Email: {user.email}</Text>
          <Text style={[styles.info, { color: theme.text }]}>Role: {user.role.toUpperCase()}</Text>
        </View>
      ) : null}

      <AppButton
        title="Logout"
        onPress={handleLogout}
        style={[styles.button, { backgroundColor: theme.error }]}
        textStyle={{ color: '#FFFFFF' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(22),
    fontWeight: '700',
    marginBottom: verticalScale(20),
  },
  card: {
    width: '100%',
    padding: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: verticalScale(30),
    gap: verticalScale(10),
  },
  info: {
    fontSize: scale(15),
    fontWeight: '500',
  },
  button: {
    width: '80%',
  },
});

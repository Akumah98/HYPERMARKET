import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useLogin } from '../../features/auth/hooks/useLogin';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { getStyles } from '../../features/auth/styles/authStyles';

export default function LoginScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCard}>
            <Ionicons name="leaf-outline" size={36} color={theme.primary} />
            <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 13, marginTop: 2 }}>
              AfriMarket
            </Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>Welcome to AfriMarket</Text>
        <Text style={styles.headerSubtitle}>
          Sign in to continue your fresh shopping experience.
        </Text>

        <LoginForm
          email={email}
          onChangeEmail={setEmail}
          password={password}
          onChangePassword={setPassword}
          onSubmit={handleLogin}
          onNavigateRegister={() => router.push('/register')}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

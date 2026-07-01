import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useRegister } from '../../features/auth/hooks/useRegister';
import { RegisterForm } from '../../features/auth/components/RegisterForm';
import { getStyles } from '../../features/auth/styles/authStyles';

export default function RegisterScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
    role,
    setRole,
    loading,
    error,
    handleRegister,
  } = useRegister();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingVertical: 40 }]}
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

        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerSubtitle}>
          Join AfriMarket to start trading fresh items today.
        </Text>

        <RegisterForm
          name={name}
          onChangeName={setName}
          email={email}
          onChangeEmail={setEmail}
          password={password}
          onChangePassword={setPassword}
          phone={phone}
          onChangePhone={setPhone}
          role={role}
          onChangeRole={setRole}
          onSubmit={handleRegister}
          onNavigateLogin={() => router.push('/login')}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

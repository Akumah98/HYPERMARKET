import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton } from '../../../components/AppButton';
import { getStyles } from '../styles/authStyles';

interface RegisterFormProps {
  name: string;
  onChangeName: (val: string) => void;
  email: string;
  onChangeEmail: (val: string) => void;
  password: string;
  onChangePassword: (val: string) => void;
  phone: string;
  onChangePhone: (val: string) => void;
  role: 'customer' | 'vendor';
  onChangeRole: (val: 'customer' | 'vendor') => void;
  onSubmit: () => void;
  onNavigateLogin: () => void;
  loading: boolean;
  error: string | null;
}

export const RegisterForm = ({
  name,
  onChangeName,
  email,
  onChangeEmail,
  password,
  onChangePassword,
  phone,
  onChangePhone,
  role,
  onChangeRole,
  onSubmit,
  onNavigateLogin,
  loading,
  error,
}: RegisterFormProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label}>Full Name</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Jean-Marc Ebongue"
          placeholderTextColor={theme.textMuted}
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          placeholder="hello@example.com"
          placeholderTextColor={theme.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="call-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
        <TextInput
          value={phone}
          onChangeText={onChangePhone}
          placeholder="677123456"
          placeholderTextColor={theme.textMuted}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
        <TextInput
          value={password}
          onChangeText={onChangePassword}
          placeholder="........"
          placeholderTextColor={theme.textMuted}
          secureTextEntry={secureText}
          autoCapitalize="none"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={theme.textMuted}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Register As</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          onPress={() => onChangeRole('customer')}
          style={[styles.roleButton, role === 'customer' && { borderColor: theme.primary, backgroundColor: theme.surface }]}
        >
          <Text style={[styles.roleText, role === 'customer' && { color: theme.primary }]}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeRole('vendor')}
          style={[styles.roleButton, role === 'vendor' && { borderColor: theme.primary, backgroundColor: theme.surface }]}
        >
          <Text style={[styles.roleText, role === 'vendor' && { color: theme.primary }]}>Vendor</Text>
        </TouchableOpacity>
      </View>

      <AppButton
        title="Register →"
        onPress={onSubmit}
        loading={loading}
        style={styles.submitButton}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={onNavigateLogin}>
          <Text style={styles.footerLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

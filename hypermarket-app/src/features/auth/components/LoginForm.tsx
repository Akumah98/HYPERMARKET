import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton } from '../../../components/AppButton';
import { getStyles } from '../styles/authStyles';

interface LoginFormProps {
  email: string;
  onChangeEmail: (val: string) => void;
  password: string;
  onChangePassword: (val: string) => void;
  onSubmit: () => void;
  onNavigateRegister: () => void;
  loading: boolean;
  error: string | null;
}

export const LoginForm = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  onSubmit,
  onNavigateRegister,
  loading,
  error,
}: LoginFormProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.errorText}>{error}</Text>}

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

      <View style={styles.passwordHeader}>
        <Text style={styles.label}>Password</Text>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot?</Text>
        </TouchableOpacity>
      </View>
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

      <AppButton
        title="Login →"
        onPress={onSubmit}
        loading={loading}
        style={styles.submitButton}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onNavigateRegister}>
          <Text style={styles.footerLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

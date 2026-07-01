import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/checkoutStyles';
import { PaymentMethod } from '../hooks/useCheckout';

interface MomoPaymentFormProps {
  phone: string;
  onChangePhone: (val: string) => void;
  paymentMethod: PaymentMethod;
  onChangePaymentMethod: (val: PaymentMethod) => void;
}

export const MomoPaymentForm = ({
  phone,
  onChangePhone,
  paymentMethod,
  onChangePaymentMethod,
}: MomoPaymentFormProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => onChangePaymentMethod('mtn_momo')}
          activeOpacity={0.8}
          style={[
            styles.toggleBtn,
            paymentMethod === 'mtn_momo' && { backgroundColor: '#FFCB05' },
          ]}
        >
          <Text style={[
            styles.toggleText,
            { color: paymentMethod === 'mtn_momo' ? '#003909' : theme.textMuted },
          ]}>
            MTN MoMo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangePaymentMethod('orange_money')}
          activeOpacity={0.8}
          style={[
            styles.toggleBtn,
            paymentMethod === 'orange_money' && { backgroundColor: '#FF6600' },
          ]}
        >
          <Text style={[
            styles.toggleText,
            { color: paymentMethod === 'orange_money' ? '#FFFFFF' : theme.textMuted },
          ]}>
            Orange Money
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payer Phone Number *</Text>
        <TextInput
          value={phone}
          onChangeText={onChangePhone}
          placeholder={paymentMethod === 'mtn_momo' ? 'e.g. 677XXXXXX' : 'e.g. 699XXXXXX'}
          placeholderTextColor={theme.textMuted}
          keyboardType="numeric"
          maxLength={9}
          style={styles.input}
        />
      </View>

      <Text style={[styles.label, { color: theme.textMuted }]}>
        Payments are processed securely via {paymentMethod === 'mtn_momo' ? 'MTN Mobile Money' : 'Orange Money'}.
      </Text>
    </View>
  );
};

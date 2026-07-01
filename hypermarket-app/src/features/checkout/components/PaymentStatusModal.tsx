import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/statusStyles';
import { AppButton } from '../../../components/AppButton';

interface PaymentStatusModalProps {
  visible: boolean;
  status: 'SUCCESSFUL' | 'FAILED' | 'PENDING' | 'EXPIRED';
  onClose: () => void;
}

export const PaymentStatusModal = ({ visible, status, onClose }: PaymentStatusModalProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isPending = status === 'PENDING';
  const isSuccess = status === 'SUCCESSFUL';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Fapshi Mobile Payment</Text>

          {isPending ? (
            <React.Fragment>
              <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 16 }} />
              <Text style={styles.subtitle}>
                We sent a USSD push prompt to your phone. Please enter your Mobile Money PIN to authorize the payment.
              </Text>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Ionicons
                name={isSuccess ? 'checkmark-circle' : 'alert-circle'}
                size={64}
                color={isSuccess ? theme.primary : theme.error}
                style={styles.statusIcon}
              />
              <Text style={styles.subtitle}>
                {isSuccess ? 'Payment completed successfully!' : `Payment was not successful. Status: ${status}`}
              </Text>
              {!isPending ? (
                <AppButton title="Close" onPress={onClose} style={styles.button} />
              ) : null}
            </React.Fragment>
          )}
        </View>
      </View>
    </Modal>
  );
};

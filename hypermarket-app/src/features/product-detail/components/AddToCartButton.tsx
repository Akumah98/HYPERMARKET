import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

interface AddToCartButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const AddToCartButton = ({ onPress, loading = false, disabled = false }: AddToCartButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: theme.primary },
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#003909" size="small" />
      ) : (
        <React.Fragment>
          <Ionicons name="cart-outline" size={20} color="#003909" style={{ marginRight: 8 }} />
          <Text style={styles.text}>Add to Cart</Text>
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: verticalScale(48),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#003909',
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
});

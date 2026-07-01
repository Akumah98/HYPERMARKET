import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/checkoutStyles';

interface DeliveryToggleProps {
  value: 'delivery' | 'pickup';
  onChange: (val: 'delivery' | 'pickup') => void;
}

export const DeliveryToggle = ({ value, onChange }: DeliveryToggleProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isDelivery = value === 'delivery';
  const isPickup = value === 'pickup';

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        onPress={() => onChange('delivery')}
        activeOpacity={0.8}
        style={[
          styles.toggleBtn,
          isDelivery && { backgroundColor: theme.primary },
        ]}
      >
        <Text
          style={[
            styles.toggleText,
            { color: isDelivery ? '#003909' : theme.textMuted },
          ]}
        >
          Home Delivery
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChange('pickup')}
        activeOpacity={0.8}
        style={[
          styles.toggleBtn,
          isPickup && { backgroundColor: theme.primary },
        ]}
      >
        <Text
          style={[
            styles.toggleText,
            { color: isPickup ? '#003909' : theme.textMuted },
          ]}
        >
          Store Pickup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

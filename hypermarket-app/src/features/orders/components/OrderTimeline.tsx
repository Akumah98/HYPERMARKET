import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/timelineStyles';

interface OrderTimelineProps {
  status: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
}

export const OrderTimeline = ({ status }: OrderTimelineProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const steps = ['placed', 'processing', 'ready', 'delivered'];
  const currentStepIndex = steps.indexOf(status);

  if (status === 'cancelled') {
    return (
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Ionicons name="close-circle" size={32} color={theme.error} />
        <Text style={{ color: theme.error, fontWeight: '700', marginTop: 4 }}>This order has been cancelled.</Text>
      </View>
    );
  }

  return (
    <View style={styles.timelineContainer}>
      {steps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isActive = index === currentStepIndex;
        const color = isCompleted ? theme.primary : theme.border;
        const textColor = isCompleted ? theme.text : theme.textMuted;

        return (
          <View key={step} style={styles.stepWrapper}>
            <View style={[styles.circle, { borderColor: color, backgroundColor: isActive ? theme.primary : theme.background }]}>
              {isCompleted && !isActive ? (
                <Ionicons name="checkmark" size={14} color="#003909" />
              ) : (
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: isActive ? '#003909' : theme.textMuted }} />
              )}
            </View>

            {index < steps.length - 1 ? (
              <View style={[styles.line, { backgroundColor: index < currentStepIndex ? theme.primary : theme.border }]} />
            ) : null}

            <Text style={[styles.stepLabel, { color: textColor, fontWeight: isActive ? '700' : '500' }]}>
              {step.toUpperCase()}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

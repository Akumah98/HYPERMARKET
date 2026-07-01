import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/profileStyles';

interface InfoRow {
  label: string;
  value: string;
}

interface InfoSectionProps {
  title: string;
  rows: InfoRow[];
  onEditPress?: () => void;
}

export const InfoSection = ({ title, rows, onEditPress }: InfoSectionProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onEditPress && (
          <TouchableOpacity onPress={onEditPress} activeOpacity={0.7}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {rows.map((row, idx) => (
        <View key={idx} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{row.label}</Text>
          <Text style={styles.infoVal} numberOfLines={1}>
            {row.value || 'Not set'}
          </Text>
        </View>
      ))}
    </View>
  );
};

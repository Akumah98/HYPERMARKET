import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';

interface StatusDropdownProps {
  currentStatus: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  onSelect: (status: 'placed' | 'processing' | 'ready' | 'delivered' | 'cancelled') => void;
}

export function StatusDropdown({ currentStatus, onSelect }: StatusDropdownProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const statuses: ('placed' | 'processing' | 'ready' | 'delivered' | 'cancelled')[] = [
    'placed',
    'processing',
    'ready',
    'delivered',
    'cancelled',
  ];

  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.trigger, { backgroundColor: theme.surface, borderColor: theme.border }]}
      >
        <Text style={[styles.triggerText, { color: theme.text }]}>
          {currentStatus.toUpperCase()}
        </Text>
        <Ionicons name="chevron-down" size={16} color={theme.textMuted} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.content, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <FlatList
              data={statuses}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  style={[
                    styles.option,
                    { borderBottomColor: theme.border },
                    item === currentStatus && { backgroundColor: theme.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                      item === currentStatus && { fontWeight: '700' },
                    ]}
                  >
                    {item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(8),
    minWidth: scale(130),
  },
  triggerText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginRight: scale(6),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    borderRadius: scale(12),
    borderWidth: 1,
    padding: scale(8),
    maxHeight: '60%',
  },
  option: {
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    borderBottomWidth: 0.5,
  },
  optionText: {
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
});

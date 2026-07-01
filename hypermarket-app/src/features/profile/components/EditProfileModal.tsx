import React, { useState } from 'react';
import { View, Text, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/profileStyles';
import { AppButton } from '../../../components/AppButton';
import { User } from '../../../store/authStore';

interface EditProfileModalProps {
  visible: boolean; onClose: () => void; user: User;
  onSave: (data: Partial<User>) => Promise<boolean>;
}

export const EditProfileModal = ({ visible, onClose, user, onSave }: EditProfileModalProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [street, setStreet] = useState(user.address?.street || '');
  const [city, setCity] = useState(user.address?.city || '');
  const [region, setRegion] = useState(user.address?.region || '');
  const [payMethod, setPayMethod] = useState(user.billing?.paymentMethod || '');
  const [payPhone, setPayPhone] = useState(user.billing?.phone || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setError(null);
    if (!name.trim()) return setError('Name is required');
    setLoading(true);
    const success = await onSave({
      name, phone,
      address: { street, quarter: user.address?.quarter || '', city, region },
      billing: { paymentMethod: payMethod as any, phone: payPhone },
    });
    setLoading(false);
    if (success) onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Profile Settings</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={24} color={theme.text} /></TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput value={name} onChangeText={setName} placeholder="e.g. John Doe" placeholderTextColor={theme.textMuted} style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput value={phone} onChangeText={setPhone} placeholder="e.g. 677XXXXXX" placeholderTextColor={theme.textMuted} style={styles.input} keyboardType="phone-pad" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Street / Address</Text>
              <TextInput value={street} onChangeText={setStreet} placeholder="e.g. Bastos" placeholderTextColor={theme.textMuted} style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput value={city} onChangeText={setCity} placeholder="e.g. Douala" placeholderTextColor={theme.textMuted} style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Region</Text>
              <TextInput value={region} onChangeText={setRegion} placeholder="e.g. Littoral" placeholderTextColor={theme.textMuted} style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Payment Method</Text>
              <View style={styles.radioRow}>
                <TouchableOpacity onPress={() => setPayMethod('mtn_momo')} style={[styles.radioBtn, payMethod === 'mtn_momo' && styles.radioActive]}>
                  <Text style={[styles.radioText, { color: payMethod === 'mtn_momo' ? theme.primary : theme.text }]}>MTN MoMo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPayMethod('orange_money')} style={[styles.radioBtn, payMethod === 'orange_money' && styles.radioActive]}>
                  <Text style={[styles.radioText, { color: payMethod === 'orange_money' ? theme.primary : theme.text }]}>Orange Money</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Billing Phone Number</Text>
              <TextInput value={payPhone} onChangeText={setPayPhone} placeholder="e.g. 677XXXXXX" placeholderTextColor={theme.textMuted} style={styles.input} keyboardType="phone-pad" />
            </View>
            <AppButton title="Save Changes" onPress={handleSave} loading={loading} style={{ marginTop: 10 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

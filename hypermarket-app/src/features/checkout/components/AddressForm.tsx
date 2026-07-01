import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/checkoutStyles';

interface AddressFormProps {
  fullName: string; onChangeFullName: (val: string) => void;
  phone: string; onChangePhone: (val: string) => void;
  street: string; onChangeStreet: (val: string) => void;
  city: string; onChangeCity: (val: string) => void;
  region: string; onChangeRegion: (val: string) => void;
  notes: string; onChangeNotes: (val: string) => void;
  isPickup?: boolean;
}

export const AddressForm = ({
  fullName, onChangeFullName, phone, onChangePhone, street, onChangeStreet, city, onChangeCity, region, onChangeRegion, notes, onChangeNotes, isPickup = false,
}: AddressFormProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{isPickup ? 'Pickup Contact Details' : 'Delivery Details'}</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput value={fullName} onChangeText={onChangeFullName} placeholder="e.g. John Doe" placeholderTextColor={theme.textMuted} style={styles.input} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput value={phone} onChangeText={onChangePhone} placeholder="e.g. 677XXXXXX" placeholderTextColor={theme.textMuted} keyboardType="phone-pad" maxLength={9} style={styles.input} />
      </View>
      {!isPickup && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street / Quarter *</Text>
            <TextInput value={street} onChangeText={onChangeStreet} placeholder="e.g. Bastos, Avenue Germaine" placeholderTextColor={theme.textMuted} style={styles.input} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City *</Text>
            <TextInput value={city} onChangeText={onChangeCity} placeholder="e.g. Yaounde" placeholderTextColor={theme.textMuted} style={styles.input} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Region (Optional)</Text>
            <TextInput value={region} onChangeText={onChangeRegion} placeholder="e.g. Centre" placeholderTextColor={theme.textMuted} style={styles.input} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Delivery Instructions (Optional)</Text>
            <TextInput value={notes} onChangeText={onChangeNotes} placeholder="e.g. Ring bell at the black gate" placeholderTextColor={theme.textMuted} style={styles.input} />
          </View>
        </>
      )}
    </View>
  );
};

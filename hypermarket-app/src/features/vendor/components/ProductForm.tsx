import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Category } from '../../catalog/services/catalogService';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

interface ProductFormProps {
  name: string; setName: (v: string) => void;
  description: string; setDescription: (v: string) => void;
  price: string; setPrice: (v: string) => void;
  stock: string; setStock: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  unit: string; setUnit: (v: string) => void;
  categories: Category[];
}

export function ProductForm({
  name, setName, description, setDescription,
  price, setPrice, stock, setStock,
  category, setCategory, unit, setUnit, categories,
}: ProductFormProps) {
  const theme = useTheme();

  return (
    <View style={styles.form}>
      <Text style={[styles.label, { color: theme.text }]}>Product Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Fresh Tomatoes"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.surface }]}
      />

      <Text style={[styles.label, { color: theme.text }]}>Price (XAF)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 1500"
        keyboardType="numeric"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.surface }]}
      />

      <Text style={[styles.label, { color: theme.text }]}>Stock Quantity</Text>
      <TextInput
        value={stock}
        onChangeText={setStock}
        placeholder="e.g. 50"
        keyboardType="numeric"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.surface }]}
      />

      <Text style={[styles.label, { color: theme.text }]}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="e.g. High quality organic red tomatoes..."
        multiline
        numberOfLines={3}
        placeholderTextColor={theme.textMuted}
        style={[styles.textArea, { borderColor: theme.border, color: theme.text, backgroundColor: theme.surface }]}
      />

      <Text style={[styles.label, { color: theme.text }]}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorScroll}>
        {categories.map((cat) => (
          <TextInput
            key={cat._id}
            value={cat.name}
            editable={false}
            onTouchStart={() => setCategory(cat._id)}
            style={[
              styles.tag,
              { borderColor: theme.border, color: theme.textMuted },
              category === cat._id && { borderColor: theme.primary, color: theme.primary, fontWeight: '700' },
            ]}
          />
        ))}
      </ScrollView>

      <Text style={[styles.label, { color: theme.text }]}>Unit</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorScroll}>
        {['piece', 'kg', 'g', 'L', 'mL', 'bundle', 'pack', 'bag'].map((u) => (
          <TextInput
            key={u}
            value={u}
            editable={false}
            onTouchStart={() => setUnit(u)}
            style={[
              styles.tag,
              { borderColor: theme.border, color: theme.textMuted },
              unit === u && { borderColor: theme.primary, color: theme.primary, fontWeight: '700' },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(6),
  },
  input: {
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(14),
  },
  textArea: {
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(14),
    height: verticalScale(70),
    textAlignVertical: 'top',
  },
  selectorScroll: {
    flexDirection: 'row',
    marginVertical: verticalScale(4),
  },
  tag: {
    borderWidth: 1,
    borderRadius: scale(20),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    marginRight: scale(8),
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
});

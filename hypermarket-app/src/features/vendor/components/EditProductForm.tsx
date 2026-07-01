import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import { Product, Category } from '../../catalog/services/catalogService';
import { useProductForm } from '../hooks/useProductForm';
import { ProductForm } from './ProductForm';
import { ImageUploader } from './ImageUploader';
import { AppButton } from '../../../components/AppButton';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

interface EditProductFormProps {
  product: Product;
  categories: Category[];
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
  const theme = useTheme();
  const router = useRouter();
  const form = useProductForm(product);

  const handleSave = async () => {
    try {
      await form.submit();
      router.back();
    } catch (err) {
      // Error displayed in form
    }
  };

  return (
    <View style={styles.container}>
      {form.error && <Text style={[styles.error, { color: theme.error }]}>{form.error}</Text>}

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <ImageUploader
          images={form.images}
          onPickImage={form.pickImage}
          onRemoveImage={form.removeImage}
        />
        <ProductForm {...form} categories={categories} />
      </ScrollView>

      <AppButton
        title="Update Product"
        onPress={handleSave}
        loading={form.loading}
        style={{ backgroundColor: theme.primary }}
        textStyle={{ color: '#FFFFFF' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
});

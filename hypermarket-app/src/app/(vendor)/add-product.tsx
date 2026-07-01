import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useCategories } from '../../features/catalog/hooks/useCategories';
import { useProductForm } from '../../features/vendor/hooks/useProductForm';
import { ProductForm } from '../../features/vendor/components/ProductForm';
import { ImageUploader } from '../../features/vendor/components/ImageUploader';
import { AppButton } from '../../components/AppButton';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

export default function AddProduct() {
  const theme = useTheme();
  const router = useRouter();
  const { categories, loading: catsLoading } = useCategories();
  const form = useProductForm();

  const handleSave = async () => {
    try {
      await form.submit();
      router.back();
    } catch (err) {
      // Error displayed in form
    }
  };

  if (catsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Add Product</Text>
        <View style={{ width: 24 }} />
      </View>

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
        title="Create Product"
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
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  backBtn: {
    padding: scale(4),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  error: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
});

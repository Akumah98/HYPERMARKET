import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

interface ImageUploaderProps {
  images: string[];
  onPickImage: () => void;
  onRemoveImage: (index: number) => void;
}

export function ImageUploader({ images, onPickImage, onRemoveImage }: ImageUploaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Product Images (Max 5)</Text>
      <View style={styles.grid}>
        {images.map((uri, index) => (
          <View key={index} style={[styles.imageWrapper, { borderColor: theme.border }]}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              onPress={() => onRemoveImage(index)}
              style={[styles.removeBtn, { backgroundColor: theme.error }]}
            >
              <Ionicons name="close" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}

        {images.length < 5 && (
          <TouchableOpacity
            onPress={onPickImage}
            style={[styles.pickBtn, { borderColor: theme.border, backgroundColor: theme.surface }]}
          >
            <Ionicons name="camera-outline" size={24} color={theme.textMuted} />
            <Text style={[styles.pickText, { color: theme.textMuted }]}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  imageWrapper: {
    position: 'relative',
    width: scale(75),
    height: scale(75),
    borderRadius: scale(8),
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: scale(2),
    right: scale(2),
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickBtn: {
    width: scale(75),
    height: scale(75),
    borderRadius: scale(8),
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickText: {
    fontSize: moderateScale(10),
    marginTop: verticalScale(2),
  },
});

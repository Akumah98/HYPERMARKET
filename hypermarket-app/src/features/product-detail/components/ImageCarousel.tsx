import React, { useState } from 'react';
import { View, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/productDetailStyles';
import { scale } from '../../../utils/responsive';

interface ImageCarouselProps {
  images: { url: string; publicId: string }[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width || scale(375);
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };

  const imagesList = images.length > 0 ? images : [{ url: 'https://via.placeholder.com/375x250', publicId: 'default' }];

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {imagesList.map((img, i) => (
          <Image
            key={img.publicId || i}
            source={{ uri: img.url }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {imagesList.length > 1 ? (
        <View style={styles.paginationDots}>
          {imagesList.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

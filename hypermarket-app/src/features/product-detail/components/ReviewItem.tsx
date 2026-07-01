import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/productDetailStyles';
import { Review } from '../services/productDetailService';

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const formattedDate = new Date(review.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{review.user?.name || 'Anonymous'}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
      </View>

      <View style={[styles.ratingRow, { marginVertical: 2 }]}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name="star"
            size={12}
            color={star <= review.rating ? '#FFBA38' : theme.border}
          />
        ))}
      </View>

      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );
};

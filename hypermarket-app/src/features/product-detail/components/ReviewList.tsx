import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/productDetailStyles';
import { ReviewItem } from './ReviewItem';
import { Review } from '../services/productDetailService';
import { ReviewFormModal } from './ReviewFormModal';

interface ReviewListProps {
  reviews: Review[];
  loading: boolean;
  onSubmitReview: (rating: number, comment: string) => Promise<void>;
}

export const ReviewList = ({ reviews, loading, onSubmitReview }: ReviewListProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [formVisible, setFormVisible] = useState(false);

  return (
    <View style={styles.reviewsBlock}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.sectionTitle}>Customer Reviews ({reviews.length})</Text>
        <TouchableOpacity onPress={() => setFormVisible(true)}>
          <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 13 }}>Write Review</Text>
        </TouchableOpacity>
      </View>

      {loading && reviews.length === 0 ? (
        <ActivityIndicator size="small" color={theme.primary} />
      ) : (
        <View style={{ gap: 10 }}>
          {reviews.map((item) => (
            <ReviewItem key={item._id} review={item} />
          ))}
          {reviews.length === 0 ? (
            <Text style={{ color: theme.textMuted, fontSize: 13 }}>No reviews yet. Be the first to review!</Text>
          ) : null}
        </View>
      )}

      <ReviewFormModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={onSubmitReview}
      />
    </View>
  );
};

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/reviewFormStyles';

interface ReviewFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export const ReviewFormModal = ({ visible, onClose, onSubmit }: ReviewFormModalProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError('Please enter a review comment.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSubmit(rating, comment);
      setComment('');
      setRating(5);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.formOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Submit Review</Text>

              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons name="star" size={30} color={star <= rating ? '#FFBA38' : theme.border} />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Write your review comments here..."
                placeholderTextColor={theme.textMuted}
                multiline
                style={styles.textInput}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.actionsRow}>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton} disabled={loading}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#003909" />
                  ) : (
                    <Text style={styles.submitText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

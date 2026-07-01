import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      paddingBottom: verticalScale(80),
    },
    // ImageCarousel
    carouselContainer: {
      position: 'relative',
      backgroundColor: theme.inputBg,
    },
    carouselImage: {
      width: scale(375),
      height: verticalScale(250),
    },
    paginationDots: {
      position: 'absolute',
      bottom: verticalScale(12),
      flexDirection: 'row',
      alignSelf: 'center',
      gap: scale(6),
    },
    dot: {
      width: scale(8),
      height: scale(8),
      borderRadius: scale(4),
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    activeDot: {
      backgroundColor: theme.primary,
      width: scale(16),
    },
    // ProductInfo
    infoBlock: {
      padding: scale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      gap: verticalScale(10),
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    productName: {
      fontSize: moderateScale(22),
      fontWeight: '700',
      color: theme.text,
      flex: 1,
    },
    stockText: {
      fontSize: moderateScale(12),
      fontWeight: '600',
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(4),
      borderRadius: moderateScale(6),
      overflow: 'hidden',
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8),
    },
    price: {
      fontSize: moderateScale(20),
      fontWeight: '700',
      color: theme.primary,
    },
    comparePrice: {
      fontSize: moderateScale(14),
      textDecorationLine: 'line-through',
      color: theme.textMuted,
    },
    description: {
      fontSize: moderateScale(14),
      color: theme.textMuted,
      lineHeight: verticalScale(20),
      marginTop: verticalScale(8),
    },
    // ReviewList & ReviewItem
    reviewsBlock: {
      padding: scale(16),
      gap: verticalScale(16),
    },
    sectionTitle: {
      fontSize: moderateScale(16),
      fontWeight: '700',
      color: theme.text,
    },
    reviewCard: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(12),
      padding: scale(12),
      gap: verticalScale(6),
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reviewUser: {
      fontSize: moderateScale(13),
      fontWeight: '600',
      color: theme.text,
    },
    reviewDate: {
      fontSize: moderateScale(11),
      color: theme.textMuted,
    },
    reviewComment: {
      fontSize: moderateScale(13),
      color: theme.text,
      lineHeight: verticalScale(18),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(4),
    },
    ratingText: {
      fontSize: moderateScale(13),
      fontWeight: '600',
      color: theme.text,
    },
  });

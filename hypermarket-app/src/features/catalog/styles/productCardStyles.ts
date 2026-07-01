import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    card: {
      flex: 1,
      margin: scale(6),
      borderRadius: moderateScale(16),
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      padding: scale(10),
    },
    imageContainer: {
      width: '100%',
      height: verticalScale(110),
      borderRadius: moderateScale(12),
      overflow: 'hidden',
      backgroundColor: theme.inputBg,
      marginBottom: verticalScale(8),
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      gap: verticalScale(4),
    },
    productName: {
      fontSize: moderateScale(14),
      fontWeight: '600',
      color: theme.text,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(4),
    },
    productPrice: {
      fontSize: moderateScale(14),
      fontWeight: '700',
      color: theme.primary,
    },
    comparePrice: {
      fontSize: moderateScale(11),
      textDecorationLine: 'line-through',
      color: theme.textMuted,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: verticalScale(6),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(2),
    },
    ratingText: {
      fontSize: moderateScale(11),
      fontWeight: '600',
      color: theme.text,
    },
    buyButton: {
      backgroundColor: theme.primary,
      width: scale(32),
      height: scale(32),
      borderRadius: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

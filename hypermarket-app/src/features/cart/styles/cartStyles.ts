import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    listContent: {
      padding: scale(16),
      paddingBottom: verticalScale(120),
      gap: verticalScale(14),
    },
    // CartItem
    card: {
      flexDirection: 'row',
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(16),
      padding: scale(12),
      alignItems: 'center',
      gap: scale(12),
    },
    image: {
      width: scale(70),
      height: scale(70),
      borderRadius: moderateScale(10),
      backgroundColor: theme.inputBg,
    },
    details: {
      flex: 1,
      gap: verticalScale(4),
    },
    name: {
      fontSize: moderateScale(14),
      fontWeight: '600',
      color: theme.text,
    },
    price: {
      fontSize: moderateScale(14),
      fontWeight: '700',
      color: theme.primary,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: verticalScale(4),
    },
    removeBtn: {
      padding: scale(6),
    },
    // QuantitySelector
    selectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(10),
      backgroundColor: theme.inputBg,
      overflow: 'hidden',
    },
    selectorBtn: {
      width: scale(30),
      height: verticalScale(30),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.surface,
    },
    selectorText: {
      paddingHorizontal: scale(10),
      fontSize: moderateScale(13),
      fontWeight: '700',
      color: theme.text,
    },
    // CartSummary
    summaryCard: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      padding: scale(16),
      borderTopLeftRadius: moderateScale(20),
      borderTopRightRadius: moderateScale(20),
      gap: verticalScale(10),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      fontSize: moderateScale(14),
      color: theme.textMuted,
    },
    value: {
      fontSize: moderateScale(14),
      color: theme.text,
      fontWeight: '600',
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: verticalScale(4),
    },
    totalLabel: {
      fontSize: moderateScale(16),
      fontWeight: '700',
      color: theme.text,
    },
    totalValue: {
      fontSize: moderateScale(18),
      fontWeight: '800',
      color: theme.primary,
    },
  });

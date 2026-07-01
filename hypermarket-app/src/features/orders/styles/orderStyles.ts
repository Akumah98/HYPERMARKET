import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    filterScroll: {
      height: 48,
      marginVertical: verticalScale(8),
    },
    filterContent: {
      paddingHorizontal: scale(16),
      gap: scale(8),
      alignItems: 'center',
    },
    filterBtn: {
      paddingHorizontal: scale(14),
      height: 38,
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterText: {
      fontSize: moderateScale(13),
      fontWeight: '600',
    },
    listContent: {
      padding: scale(16),
      gap: verticalScale(12),
    },
    // OrderCard
    card: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(16),
      padding: scale(14),
      gap: verticalScale(10),
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderCode: {
      fontSize: moderateScale(14),
      fontWeight: '700',
      color: theme.text,
    },
    orderDate: {
      fontSize: moderateScale(12),
      color: theme.textMuted,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemsCount: {
      fontSize: moderateScale(13),
      color: theme.text,
    },
    priceVal: {
      fontSize: moderateScale(15),
      fontWeight: '700',
      color: theme.primary,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: verticalScale(8),
    },
    detailsLink: {
      fontSize: moderateScale(13),
      fontWeight: '700',
      color: theme.primary,
    },
    // OrderDetails
    scrollContent: {
      padding: scale(16),
      paddingBottom: verticalScale(50),
      gap: verticalScale(16),
    },
    section: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(16),
      padding: scale(16),
      gap: verticalScale(10),
    },
    sectionTitle: {
      fontSize: moderateScale(15),
      fontWeight: '700',
      color: theme.text,
    },
  });

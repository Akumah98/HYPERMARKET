import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // PaymentStatusModal
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: scale(24),
    },
    card: {
      width: '100%',
      backgroundColor: theme.background,
      borderRadius: moderateScale(24),
      borderWidth: 1,
      borderColor: theme.border,
      padding: scale(24),
      alignItems: 'center',
      gap: verticalScale(16),
    },
    title: {
      fontSize: moderateScale(18),
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: moderateScale(14),
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: verticalScale(20),
    },
    statusIcon: {
      marginVertical: verticalScale(10),
    },
    // OrderConfirmation
    confirmContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: scale(24),
      gap: verticalScale(16),
    },
    confirmTitle: {
      fontSize: moderateScale(24),
      fontWeight: '800',
      color: theme.text,
      textAlign: 'center',
    },
    confirmSubtitle: {
      fontSize: moderateScale(15),
      color: theme.textMuted,
      textAlign: 'center',
      marginBottom: verticalScale(20),
      paddingHorizontal: scale(20),
    },
    orderCodeCard: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(12),
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(20),
      marginBottom: verticalScale(30),
    },
    orderCode: {
      fontSize: moderateScale(15),
      fontWeight: '700',
      color: theme.primary,
    },
    button: {
      width: '80%',
    },
  });

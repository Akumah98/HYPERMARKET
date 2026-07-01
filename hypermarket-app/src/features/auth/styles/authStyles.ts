import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: scale(24),
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: verticalScale(24),
    },
    logoCard: {
      width: scale(110),
      height: scale(110),
      borderRadius: moderateScale(24),
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    headerTitle: {
      fontSize: moderateScale(24),
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
      marginBottom: verticalScale(8),
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: moderateScale(14),
      color: theme.textMuted,
      textAlign: 'center',
      marginBottom: verticalScale(24),
    },
    formContainer: {
      width: '100%',
    },
    label: {
      fontSize: moderateScale(14),
      color: theme.text,
      fontWeight: '600',
      marginBottom: verticalScale(8),
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(16),
      backgroundColor: theme.inputBg,
      height: verticalScale(50),
      paddingHorizontal: scale(16),
      marginBottom: verticalScale(16),
    },
    input: {
      flex: 1,
      height: '100%',
      color: theme.text,
      fontSize: moderateScale(15),
      marginLeft: scale(10),
    },
    inputIcon: {
      marginRight: scale(4),
    },
    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    forgotText: {
      color: theme.primary,
      fontSize: moderateScale(14),
      fontWeight: '600',
    },
    submitButton: {
      marginTop: verticalScale(12),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: verticalScale(24),
      alignItems: 'center',
    },
    footerText: {
      color: theme.textMuted,
      fontSize: moderateScale(14),
    },
    footerLink: {
      color: theme.primary,
      fontSize: moderateScale(14),
      fontWeight: '600',
    },
    errorText: {
      color: theme.error,
      fontSize: moderateScale(14),
      marginBottom: verticalScale(16),
      textAlign: 'center',
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: verticalScale(16),
    },
    roleButton: {
      flex: 1,
      height: verticalScale(46),
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: scale(4),
    },
    roleText: {
      color: theme.textMuted,
      fontSize: moderateScale(14),
      fontWeight: '600',
    },
  });

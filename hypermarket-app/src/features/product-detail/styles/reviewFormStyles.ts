import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    formOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    formContainer: {
      backgroundColor: theme.background,
      borderTopLeftRadius: moderateScale(24),
      borderTopRightRadius: moderateScale(24),
      padding: scale(20),
      gap: verticalScale(16),
    },
    formTitle: {
      fontSize: moderateScale(18),
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
    },
    starsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: scale(10),
      marginVertical: verticalScale(10),
    },
    textInput: {
      height: verticalScale(100),
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(12),
      padding: scale(12),
      color: theme.text,
      backgroundColor: theme.inputBg,
      fontSize: moderateScale(14),
      textAlignVertical: 'top',
    },
    errorText: {
      color: theme.error,
      fontSize: moderateScale(12),
      textAlign: 'center',
    },
    actionsRow: {
      flexDirection: 'row',
      gap: scale(10),
    },
    cancelButton: {
      flex: 1,
      height: verticalScale(44),
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.surface,
    },
    cancelText: {
      color: theme.textMuted,
      fontWeight: '600',
      fontSize: moderateScale(14),
    },
    submitButton: {
      flex: 2,
      height: verticalScale(44),
      borderRadius: moderateScale(12),
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitText: {
      color: '#003909',
      fontWeight: '700',
      fontSize: moderateScale(14),
    },
  });

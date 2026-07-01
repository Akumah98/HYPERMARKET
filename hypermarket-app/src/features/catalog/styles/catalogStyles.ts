import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(16),
      marginVertical: verticalScale(12),
      gap: scale(10),
    },
    searchBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputBg,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(14),
      height: verticalScale(46),
      paddingHorizontal: scale(12),
    },
    searchInput: {
      flex: 1,
      marginLeft: scale(8),
      fontSize: moderateScale(14),
      color: theme.text,
    },
    filterButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(14),
      width: scale(46),
      height: verticalScale(46),
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryScroll: {
      height: 48,
      marginBottom: verticalScale(12),
    },
    categoryContent: {
      paddingHorizontal: scale(16),
      gap: scale(8),
      alignItems: 'center',
    },
    categoryItem: {
      paddingHorizontal: scale(14),
      height: 38,
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryText: {
      fontSize: moderateScale(13),
      fontWeight: '600',
    },
    listContent: {
      paddingHorizontal: scale(12),
      paddingBottom: verticalScale(20),
    },
  });

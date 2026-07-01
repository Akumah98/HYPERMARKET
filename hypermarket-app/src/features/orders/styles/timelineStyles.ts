import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Status Badge
    badge: {
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(4),
      borderRadius: moderateScale(6),
      borderWidth: 1,
    },
    badgeText: {
      fontSize: moderateScale(11),
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    // Timeline
    timelineContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: verticalScale(14),
      paddingHorizontal: scale(10),
    },
    stepWrapper: {
      alignItems: 'center',
      flex: 1,
      position: 'relative',
    },
    circle: {
      width: scale(26),
      height: scale(26),
      borderRadius: scale(13),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      zIndex: 2,
    },
    line: {
      position: 'absolute',
      top: verticalScale(12),
      left: '50%',
      right: '-50%',
      height: verticalScale(3),
      zIndex: 1,
    },
    stepLabel: {
      fontSize: moderateScale(10),
      fontWeight: '600',
      marginTop: verticalScale(6),
      textAlign: 'center',
    },
  });

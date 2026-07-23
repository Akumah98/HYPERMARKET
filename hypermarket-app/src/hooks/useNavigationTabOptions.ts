import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { moderateScale, verticalScale, isAndroid } from '../utils/responsive';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export function useNavigationTabOptions(): BottomTabNavigationOptions {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const safeBottom = insets.bottom > 0 ? insets.bottom : (isAndroid ? verticalScale(2) : verticalScale(4));
  const totalHeight = verticalScale(48) + safeBottom;

  return {
    headerShown: false,
    tabBarActiveTintColor: theme.primary,
    tabBarInactiveTintColor: theme.textMuted,
    tabBarStyle: {
      backgroundColor: theme.surface,
      borderTopColor: theme.border,
      borderTopWidth: 1,
      height: totalHeight,
      paddingBottom: safeBottom,
      paddingTop: verticalScale(4),
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
    tabBarLabelStyle: {
      fontSize: moderateScale(11),
      fontWeight: '600',
    },
  };
}

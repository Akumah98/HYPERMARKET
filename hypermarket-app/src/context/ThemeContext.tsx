import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const darkTheme = {
  background: '#131313',
  surface: '#1E1E1E',
  surfaceBorder: '#2C2C2C',
  primary: '#88d982',
  primaryDark: '#2e7d32',
  tertiary: '#ffba38',
  text: '#FFFFFF',
  textMuted: '#94A3B8',
  border: '#2C2C2C',
  error: '#ffb4ab',
  inputBg: '#121212',
};

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F3F4F6',
  surfaceBorder: '#E5E7EB',
  primary: '#2e7d32',
  primaryDark: '#003909',
  tertiary: '#ffba38',
  text: '#111827',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  error: '#BA1A1A',
  inputBg: '#F9FAFB',
};

export type ThemeType = typeof darkTheme;

interface ThemeContextState {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextState>({
  theme: darkTheme,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  useEffect(() => {
    setIsDark(systemScheme === 'dark');
  }, [systemScheme]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext).theme;
export const useThemeContext = () => useContext(ThemeContext);

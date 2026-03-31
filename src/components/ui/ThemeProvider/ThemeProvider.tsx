'use client';

import { createContext, useContext } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { Theme } from '@/hooks/useTheme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

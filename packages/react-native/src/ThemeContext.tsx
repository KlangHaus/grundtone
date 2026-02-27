import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import type { Theme } from '@grundtone/core';

export type ThemeMode = 'light' | 'dark';

export interface GrundtoneThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

export const GrundtoneThemeContext = createContext<
  GrundtoneThemeContextValue | undefined
>(undefined);

function getSystemTheme(): ThemeMode {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

export interface GrundtoneThemeProviderProps {
  /** Light theme – use createTheme() from @grundtone/core */
  light: Theme;
  /** Dark theme – use createTheme() from @grundtone/core */
  dark: Theme;
  /** Initial mode. Default: follows system. Pass 'light' or 'dark' to override. */
  defaultMode?: ThemeMode;
  /** Force a specific mode (controlled), overriding defaultMode after mount */
  mode?: ThemeMode;
  children: React.ReactNode;
}

/**
 * Provides Grundtone theme to React Native components.
 * Use useGrundtoneTheme() to consume.
 *
 * @example
 * import { GrundtoneThemeProvider, useGrundtoneTheme } from '@grundtone/react-native';
 * import { createTheme } from '@grundtone/core';
 *
 * const { light, dark } = createTheme({
 *   light: { colors: { primary: '#your-brand' } },
 *   dark: { colors: { primary: '#your-brand-dark' } }
 * });
 *
 * <GrundtoneThemeProvider light={light} dark={dark}>
 *   <App />
 * </GrundtoneThemeProvider>
 */
export function GrundtoneThemeProvider({
  light,
  dark,
  defaultMode = 'light',
  mode: controlledMode,
  children,
}: GrundtoneThemeProviderProps): React.ReactElement {
  const [internalMode, setInternalMode] = useState<ThemeMode>(() => {
    if (defaultMode === 'dark' || defaultMode === 'light') return defaultMode;
    return getSystemTheme();
  });

  useEffect(() => {
    if (defaultMode !== undefined) return;
    const sub = Appearance.addChangeListener(() => {
      setInternalMode(getSystemTheme());
    });
    return () => sub.remove();
  }, [defaultMode]);

  const mode = controlledMode ?? internalMode;
  const setMode = useCallback(
    (newMode: ThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(newMode);
      }
    },
    [controlledMode],
  );

  const theme = mode === 'dark' ? dark : light;

  const value = useMemo<GrundtoneThemeContextValue>(
    () => ({
      theme,
      mode,
      isDark: mode === 'dark',
      setMode,
    }),
    [theme, mode, setMode],
  );

  return (
    <GrundtoneThemeContext.Provider value={value}>
      {children}
    </GrundtoneThemeContext.Provider>
  );
}

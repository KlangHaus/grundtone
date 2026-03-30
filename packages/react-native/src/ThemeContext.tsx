import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import type { Theme, ThemeMode } from '@grundtone/core';
import { resolveThemeMode } from '@grundtone/utils';

export type { ThemeMode } from '@grundtone/core';

export interface GrundtoneThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

export const GrundtoneThemeContext = createContext<
  GrundtoneThemeContextValue | undefined
>(undefined);

function getSystemIsDark(): boolean {
  return Appearance.getColorScheme() === 'dark';
}

export interface GrundtoneThemeProviderProps {
  /** Light theme – use createTheme() from @grundtone/core */
  light: Theme;
  /** Dark theme – use createTheme() from @grundtone/core */
  dark: Theme;
  /**
   * Initial mode. Default: 'auto' (follows system).
   * Pass 'light' or 'dark' to override, or 'auto' for system preference.
   */
  defaultMode?: ThemeMode;
  /** Force a specific mode (controlled), overriding defaultMode after mount */
  mode?: ThemeMode;
  children: React.ReactNode;
}

/**
 * Provides Grundtone theme to React Native components.
 * Use useGrundtoneTheme() to consume.
 *
 * Supports 'light', 'dark', and 'auto' (system preference) modes.
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
  defaultMode = 'auto',
  mode: controlledMode,
  children,
}: GrundtoneThemeProviderProps): React.ReactElement {
  const [internalMode, setInternalMode] = useState<ThemeMode>(defaultMode);
  const [systemIsDark, setSystemIsDark] = useState(getSystemIsDark);

  // Listen for system appearance changes
  useEffect(() => {
    const sub = Appearance.addChangeListener(() => {
      setSystemIsDark(getSystemIsDark());
    });
    return () => sub.remove();
  }, []);

  const activeMode = controlledMode ?? internalMode;
  const resolved = resolveThemeMode(activeMode, systemIsDark);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      if (controlledMode === undefined) {
        setInternalMode(newMode);
      }
    },
    [controlledMode],
  );

  const theme = resolved === 'dark' ? dark : light;
  const isDark = resolved === 'dark';

  const value = useMemo<GrundtoneThemeContextValue>(
    () => ({
      theme,
      mode: activeMode,
      isDark,
      setMode,
    }),
    [theme, activeMode, isDark, setMode],
  );

  return (
    <GrundtoneThemeContext.Provider value={value}>
      {children}
    </GrundtoneThemeContext.Provider>
  );
}

import { useContext } from 'react';
import { GrundtoneThemeContext } from './ThemeContext';

/**
 * Returns the current Grundtone theme for use in StyleSheet and components.
 *
 * @example
 * const { theme } = useGrundtoneTheme();
 *
 * StyleSheet.create({
 *   button: {
 *     backgroundColor: theme.colors.primary,
 *     padding: theme.spacing.md,
 *   },
 *   label: {
 *     color: theme.colors.onPrimary,
 *     fontSize: theme.typography.fontSize.base,
 *   }
 * });
 *
 * @throws Error if used outside GrundtoneThemeProvider
 */
export function useGrundtoneTheme() {
  const context = useContext(GrundtoneThemeContext);

  if (context === undefined) {
    throw new Error(
      'useGrundtoneTheme must be used within a GrundtoneThemeProvider. ' +
        'Wrap your app with <GrundtoneThemeProvider light={...} dark={...}>.',
    );
  }

  return context;
}

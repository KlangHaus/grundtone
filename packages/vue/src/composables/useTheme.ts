import { inject } from 'vue';
import { THEME_INJECTION_KEY } from '@grundtone/core';
import type { ThemeProviderContext } from '@grundtone/core';

/**
 * Access the Grundtone theme context.
 * Must be used within a component that has a ThemeProvider ancestor.
 *
 * @example
 * const { theme, isDark, toggleMode } = useTheme();
 */
export function useTheme(): ThemeProviderContext {
  const context = inject(THEME_INJECTION_KEY);

  if (!context) {
    throw new Error(
      'useTheme() requires a Grundtone ThemeProvider ancestor. ' +
        'Wrap your app with <GrundtoneThemeProvider>.',
    );
  }

  return context;
}

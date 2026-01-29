import { inject, computed, ref } from 'vue';
import type { ThemeProviderContext, Theme } from '@ipeeon/core';
import { THEME_INJECTION_KEY } from '@ipeeon/core';

// Simple logger for composables (to avoid circular dependencies)
const logger = {
  warn: (message: string, metadata?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[Haspen UI] ${message}`, metadata);
    }
  },
};

// Default fallback theme for when ThemeProvider is not available
const createFallbackTheme = (): Theme => ({
  mode: 'light',
  colors: {
    primary: '#0059b3',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
    background: '#ffffff',
    surface: '#f8f9fa',
    'text-primary': '#212529',
    'text-secondary': '#6c757d',
    border: '#dee2e6',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      base: '"IBM Plex Sans", system-ui, sans-serif',
      mono: '"IBM Plex Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  radius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
});

// Create fallback context
const createFallbackContext = (): ThemeProviderContext => {
  const fallbackTheme = createFallbackTheme();
  const mode = ref<'light' | 'dark' | 'auto'>('light');

  return {
    theme: computed(() => fallbackTheme),
    mode: computed(() => mode.value),
    isDark: computed(() => false),
    isLight: computed(() => true),
    setMode: (newMode: 'light' | 'dark' | 'auto') => {
      mode.value = newMode;
      logger.warn('ThemeProvider not found, using fallback theme', {
        component: 'useTheme',
        action: 'setMode',
        severity: 'low',
        metadata: { mode: newMode },
      });
    },
    toggleMode: () => {
      mode.value = mode.value === 'dark' ? 'light' : 'dark';
      logger.warn('ThemeProvider not found, using fallback theme', {
        component: 'useTheme',
        action: 'toggleMode',
        severity: 'low',
        metadata: { newMode: mode.value },
      });
    },
    applyTheme: () => {
      logger.warn('ThemeProvider not found, cannot apply theme to DOM', {
        component: 'useTheme',
        action: 'applyTheme',
        severity: 'low',
      });
    },
  };
};

export function useTheme(): ThemeProviderContext {
  const themeContext = inject(THEME_INJECTION_KEY);

  if (!themeContext) {
    // Instead of throwing, provide fallback with warning
    logger.warn(
      'ThemeProvider not found. Using fallback theme. For full functionality, wrap your app with <ThemeProvider>.',
      {
        component: 'useTheme',
        action: 'inject',
        severity: 'medium',
      },
    );

    return createFallbackContext();
  }

  return themeContext;
}

export { THEME_INJECTION_KEY } from '@ipeeon/core';
export type {
  ThemeMode,
  Theme,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeShadows,
  ThemeRadius,
  ThemeTransitions,
  ThemeProviderContext,
  ThemeProviderProps,
} from '@ipeeon/core';

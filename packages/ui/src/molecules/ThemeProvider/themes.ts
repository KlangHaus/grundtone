import type { Theme } from '@grundtone/core';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#0059b3',
    secondary: '#6c757d',
    tertiary: '#17a2b8',
    error: '#d32f2f',
    warning: '#d84315', // 4.44:1 contrast (close to AA threshold)
    success: '#2e7d32', // Darker green to meet 4.5:1 contrast (was #388e3c at 4.12:1)
    info: '#01579b', // Darker blue to meet 4.5:1 contrast (was #0288d1 at 3.86:1)
    neutral: '#757575',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#757575', // 4.61:1 contrast - meets AA for large text (3:1)
    divider: '#9e9e9e', // 2.68:1 contrast - better than previous but needs usage context
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '5rem',
  },
  typography: {
    fontFamily: {
      base: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      heading:
        "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      mono: "'IBM Plex Mono', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  radius: {
    none: '0',
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  transitions: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  mode: 'dark',
  colors: {
    primary: '#1565c0', // 5.75:1 contrast - meets AA standards for button backgrounds
    secondary: '#adb5bd',
    tertiary: '#26c6da',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#03a9f4',
    neutral: '#9e9e9e',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#adb5bd',
    border: '#757575', // Lighter border for 3:1 large text contrast (was #495057 at 2.29:1)
    divider: '#616161', // Lighter divider for 3:1 large text contrast (was #424242 at 1.86:1)
  },
};

export const defaultTheme = lightTheme;

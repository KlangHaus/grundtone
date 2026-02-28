import type { ThemeConfig } from '../types';

export {
  BREAKPOINTS,
  MEDIA_QUERIES,
  MEDIA_QUERIES_MAX,
  type BreakpointKey,
} from './breakpoints';

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: '#0066CC',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
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
      sans: 'system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, monospace',
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};

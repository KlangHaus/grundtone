/**
 * Grundtone Theme Preset
 *
 * Standard reference colors. When installing Grundtone, you MUST configure your
 * theme colors - either customize this preset or provide your own.
 * The design system will not apply colors until you explicitly pass a theme.
 *
 * @example
 * // Nuxt: Configure in nuxt.config.ts
 * grundtone: {
 *   theme: {
 *     light: { colors: { primary: '#your-brand', ... } },
 *     dark: { colors: { primary: '#your-brand-dark', ... } }
 *   }
 * }
 *
 * @example
 * // Vue: Pass to ThemeProvider
 * import { defaultTheme, createTheme } from '@grundtone/core';
 * <ThemeProvider :theme="defaultTheme" />
 */

import type { Theme } from './theme';

export type ColorPreset = Theme['colors'];

/**
 * Semantic color keys – all colors your app should configure.
 */
export const SEMANTIC_COLOR_KEYS = [
  'primary',
  'primaryHover',
  'primaryActive',
  'onPrimary',
  'secondary',
  'secondaryHover',
  'secondaryActive',
  'success',
  'successBg',
  'warning',
  'warningBg',
  'error',
  'errorBg',
  'info',
  'infoBg',
  'background',
  'surface',
  'surfaceHover',
  'text',
  'textSecondary',
  'textTertiary',
  'border',
  'borderHover',
  'focus',
  'focusRing',
  'neutral',
] as const;

/**
 * Standard reference colors (Bootstrap-inspired).
 * Copy and customize – do not use passively without reviewing.
 */
export const defaultColorPreset: ColorPreset = {
  primary: '#0059b3',
  primaryHover: '#004a96',
  primaryActive: '#003a7a',
  onPrimary: '#ffffff',
  secondary: '#6c757d',
  secondaryHover: '#5a6268',
  secondaryActive: '#494f54',
  success: '#198754',
  successBg: '#d1e7dd',
  warning: '#ffc107',
  warningBg: '#fff3cd',
  error: '#dc3545',
  errorBg: '#f8d7da',
  info: '#0dcaf0',
  infoBg: '#cff4fc',
  background: '#ffffff',
  surface: '#f8f9fa',
  surfaceHover: '#e9ecef',
  text: '#212529',
  textSecondary: '#6c757d',
  textTertiary: '#adb5bd',
  border: '#dee2e6',
  borderHover: '#adb5bd',
  focus: '#0059b3',
  focusRing: 'rgba(0, 89, 179, 0.25)',
  neutral: '#6c757d',
};

/**
 * Dark mode preset (standard reference).
 */
export const defaultColorPresetDark: ColorPreset = {
  ...defaultColorPreset,
  primary: '#4dabf7',
  primaryHover: '#74c0fc',
  primaryActive: '#339af0',
  onPrimary: '#121212',
  secondary: '#adb5bd',
  secondaryHover: '#ced4da',
  secondaryActive: '#868e96',
  success: '#51cf66',
  successBg: '#1a3d20',
  warning: '#ffd43b',
  warningBg: '#3d3a1a',
  error: '#ff6b6b',
  errorBg: '#3d1a1c',
  info: '#4dabf7',
  infoBg: '#1a2e3d',
  background: '#121212',
  surface: '#1e1e1e',
  surfaceHover: '#2a2a2a',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',
  border: '#404040',
  borderHover: '#606060',
  focus: '#4dabf7',
  focusRing: 'rgba(77, 171, 247, 0.25)',
  neutral: '#9e9e9e',
};

const defaultSpacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
} as const;

const defaultTypography = {
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
} as const;

const defaultShadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

const defaultRadius = {
  none: '0',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

const defaultTransitions = {
  duration: { fast: '150ms', base: '300ms', slow: '500ms' },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
  },
} as const;

function buildLightTheme(colors: Partial<ColorPreset>): Theme {
  const c = { ...defaultColorPreset, ...colors };
  return {
    mode: 'light',
    colors: c as Theme['colors'],
    spacing: { ...defaultSpacing },
    typography: { ...defaultTypography },
    shadows: { ...defaultShadows },
    radius: { ...defaultRadius },
    transitions: { ...defaultTransitions },
  };
}

function buildDarkTheme(colors: Partial<ColorPreset>): Theme {
  const base = buildLightTheme(defaultColorPresetDark);
  const c = { ...defaultColorPresetDark, ...colors };
  return { ...base, mode: 'dark', colors: c as Theme['colors'] };
}

/**
 * Create a theme with your brand colors.
 * Override only what you need – rest uses standard defaults.
 */
export function createTheme(overrides: {
  light?: Partial<ColorPreset>;
  dark?: Partial<ColorPreset>;
}): { light: Theme; dark: Theme } {
  return {
    light: buildLightTheme(overrides.light ?? {}),
    dark: buildDarkTheme(overrides.dark ?? {}),
  };
}

/**
 * Default theme (standard colors).
 * Use createTheme() to customize – do not ship without reviewing colors.
 */
export const defaultTheme = buildLightTheme({});

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

import type { ShadowLayer, Theme, ThemeShadows } from './theme';

export type ColorPreset = Theme['colors'];

/**
 * Semantic color keys – all colors your app should configure.
 */
export const SEMANTIC_COLOR_KEYS = [
  // Brand
  'primary',
  'primaryLight',
  'primaryDark',
  'onPrimary',
  'secondary',
  'secondaryLight',
  'secondaryDark',
  // Status
  'success',
  'successLight',
  'successDark',
  'warning',
  'warningLight',
  'warningDark',
  'error',
  'errorLight',
  'errorDark',
  'info',
  'infoLight',
  'infoDark',
  // Surface
  'background',
  'backgroundAlt',
  'surface',
  'surfaceAlt',
  'surfaceRaised',
  'surfaceOverlay',
  'modalBackdrop',
  // Text
  'text',
  'textSecondary',
  'textTertiary',
  'textInverse',
  'textPlaceholder',
  'textDisabled',
  // Border
  'borderLight',
  'borderMedium',
  'borderStrong',
  'borderInverse',
  // Focus
  'focus',
  'focusRing',
  // Neutral
  'neutral',
] as const;

/**
 * Standard reference colors (Bootstrap-inspired).
 * Copy and customize – do not use passively without reviewing.
 */
export const defaultColorPreset: ColorPreset = {
  // Brand
  primary: '#0059b3',
  primaryLight: '#3381cc',
  primaryDark: '#003a7a',
  onPrimary: '#ffffff',
  secondary: '#e9ecef',
  secondaryLight: '#f8f9fa',
  secondaryDark: '#dee2e6',
  // Status
  success: '#198754',
  successLight: '#d1e7dd',
  successDark: '#146c43',
  warning: '#ffc107',
  warningLight: '#fff3cd',
  warningDark: '#cc9a06',
  error: '#dc3545',
  errorLight: '#f8d7da',
  errorDark: '#b02a37',
  info: '#0dcaf0',
  infoLight: '#cff4fc',
  infoDark: '#0aa2c0',
  // Surface
  background: '#ffffff',
  backgroundAlt: '#fafafa',
  surface: '#f8f9fa',
  surfaceAlt: '#f0f1f2',
  surfaceRaised: '#ffffff',
  surfaceOverlay: 'rgba(255,255,255,0.95)',
  modalBackdrop: 'rgba(0,0,0,0.5)',
  // Text
  text: '#212529',
  textSecondary: '#6c757d',
  textTertiary: '#adb5bd',
  textInverse: '#ffffff',
  textPlaceholder: '#a3a3a3',
  textDisabled: '#d4d4d4',
  // Border
  borderLight: '#dee2e6',
  borderMedium: '#ced4da',
  borderStrong: '#adb5bd',
  borderInverse: 'rgba(255,255,255,0.2)',
  // Focus
  focus: '#0059b3',
  focusRing: 'rgba(0,89,179,0.25)',
  // Neutral
  neutral: '#6c757d',
};

/**
 * Dark mode preset (standard reference).
 */
export const defaultColorPresetDark: ColorPreset = {
  // Brand
  primary: '#4dabf7',
  primaryLight: '#74c0fc',
  primaryDark: '#339af0',
  onPrimary: '#121212',
  secondary: '#343a40',
  secondaryLight: '#495057',
  secondaryDark: '#2b3035',
  // Status
  success: '#51cf66',
  successLight: '#1a3d20',
  successDark: '#40c057',
  warning: '#ffd43b',
  warningLight: '#3d3a1a',
  warningDark: '#fab005',
  error: '#ff6b6b',
  errorLight: '#3d1a1c',
  errorDark: '#fa5252',
  info: '#4dabf7',
  infoLight: '#1a2e3d',
  infoDark: '#339af0',
  // Surface
  background: '#121212',
  backgroundAlt: '#1a1a1a',
  surface: '#1e1e1e',
  surfaceAlt: '#252525',
  surfaceRaised: '#2a2a2a',
  surfaceOverlay: 'rgba(30,30,30,0.95)',
  modalBackdrop: 'rgba(0,0,0,0.7)',
  // Text
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',
  textInverse: '#121212',
  textPlaceholder: '#666666',
  textDisabled: '#4a4a4a',
  // Border
  borderLight: '#404040',
  borderMedium: '#505050',
  borderStrong: '#606060',
  borderInverse: 'rgba(0,0,0,0.3)',
  // Focus
  focus: '#4dabf7',
  focusRing: 'rgba(77,171,247,0.25)',
  // Neutral
  neutral: '#9e9e9e',
};

/**
 * 8px base unit spacing system.
 * All values are multiples of the 8px grid (4px = 0.5×, 8px = 1×, 16px = 2×, etc.).
 * Web: used as rem via CSS custom properties (--space-*).
 * React Native: convert to numbers (4, 8, 16, 24, 32, 48, 64, 80).
 */
export const defaultSpacing = {
  xs: '0.25rem', // 4px  — 0.5× base
  sm: '0.5rem', //  8px  — 1× base
  md: '1rem', //    16px — 2× base
  lg: '1.5rem', //  24px — 3× base
  xl: '2rem', //    32px — 4× base
  '2xl': '3rem', // 48px — 6× base
  '3xl': '4rem', // 64px — 8× base
  '4xl': '6rem', // 96px — 12× base
} as const;

export const defaultTypography = {
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

/**
 * Structured shadow definitions — single source of truth.
 * Web: converted to CSS box-shadow strings via shadowLayersToCSS().
 * React Native: converted to iOS/Android shadow styles via shadowToRN().
 */
export const defaultShadowDefinitions: Record<string, ShadowLayer[]> = {
  xs: [{ x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 0.05 }],
  sm: [
    { x: 0, y: 1, blur: 3, spread: 0, color: '#000000', opacity: 0.1 },
    { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 0.06 },
  ],
  md: [
    { x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 0.1 },
    { x: 0, y: 2, blur: 4, spread: -1, color: '#000000', opacity: 0.06 },
  ],
  lg: [
    { x: 0, y: 10, blur: 15, spread: -3, color: '#000000', opacity: 0.1 },
    { x: 0, y: 4, blur: 6, spread: -2, color: '#000000', opacity: 0.05 },
  ],
  xl: [
    { x: 0, y: 20, blur: 25, spread: -5, color: '#000000', opacity: 0.1 },
    { x: 0, y: 10, blur: 10, spread: -5, color: '#000000', opacity: 0.04 },
  ],
  '2xl': [
    { x: 0, y: 25, blur: 50, spread: -12, color: '#000000', opacity: 0.25 },
  ],
  inner: [
    {
      x: 0,
      y: 2,
      blur: 4,
      spread: 0,
      color: '#000000',
      opacity: 0.06,
      inset: true,
    },
  ],
};

/** Parse a hex color string (#RGB or #RRGGBB) to { r, g, b }. */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** Convert structured shadow layers to a CSS box-shadow string. */
export function shadowLayersToCSS(layers: ShadowLayer[]): string {
  return layers
    .map(l => {
      const inset = l.inset ? 'inset ' : '';
      const px = (n: number) => (n === 0 ? '0' : `${n}px`);
      const { r, g, b } = hexToRgb(l.color);
      return `${inset}${px(l.x)} ${px(l.y)} ${px(l.blur)} ${px(l.spread)} rgba(${r}, ${g}, ${b}, ${l.opacity})`;
    })
    .join(', ');
}

/** CSS shadow strings derived from structured definitions. */
export const defaultShadows: ThemeShadows = {
  ...(Object.fromEntries(
    Object.entries(defaultShadowDefinitions).map(([k, layers]) => [
      k,
      shadowLayersToCSS(layers),
    ]),
  ) as Omit<ThemeShadows, 'none'>),
  none: 'none',
};

export const defaultRadius = {
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

export const defaultTransitions = {
  duration: { fast: '150ms', base: '300ms', slow: '500ms' },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
  },
} as const;

export const defaultZIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

function buildLightTheme(colors: Partial<ColorPreset>): Theme {
  const c = { ...defaultColorPreset, ...colors };
  return {
    mode: 'light',
    colors: c as Theme['colors'],
    spacing: { ...defaultSpacing },
    typography: { ...defaultTypography },
    shadows: { ...defaultShadows },
    shadowDefinitions: { ...defaultShadowDefinitions },
    radius: { ...defaultRadius },
    transitions: { ...defaultTransitions },
    zIndex: { ...defaultZIndex },
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

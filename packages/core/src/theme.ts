import type { InjectionKey, Ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Semantic color tokens – configure these to match your brand.
 * All keys map to CSS var: --color-{kebab-case-key}
 *
 * Shade-based naming: `primaryLight`/`primaryDark` instead of state-based
 * (`primaryHover`/`primaryActive`). Components decide which shade to use
 * for hover, active, tint, etc.
 */
export interface ThemeColors {
  // Brand
  primary: string;
  primaryLight: string;
  primaryDark: string;
  onPrimary: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  // Status
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
  infoLight: string;
  infoDark: string;
  // Surface
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceAlt: string;
  surfaceRaised: string;
  surfaceOverlay: string;
  modalBackdrop: string;
  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textPlaceholder: string;
  textDisabled: string;
  // Border
  borderLight: string;
  borderMedium: string;
  borderStrong: string;
  borderInverse: string;
  // Focus
  focus: string;
  focusRing: string;
  // Neutral
  neutral: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface ThemeTypography {
  fontFamily: {
    base: string;
    heading: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
}

export interface ThemeShadows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface ThemeRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface ThemeTransitions {
  duration: {
    fast: string;
    base: string;
    slow: string;
  };
  timing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    linear: string;
  };
}

export interface ThemeZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  radius: ThemeRadius;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
}

export interface ThemeProviderContext {
  theme: Readonly<Ref<Theme>>;
  mode: Readonly<Ref<ThemeMode>>;
  isDark: Readonly<Ref<boolean>>;
  isLight: Readonly<Ref<boolean>>;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  applyTheme: () => void;
}

export const THEME_INJECTION_KEY: InjectionKey<ThemeProviderContext> =
  Symbol('grundtone-theme');

/**
 * Theme configuration: either a single partial theme (applies to both modes)
 * or separate light/dark overrides for proper dark mode support.
 */
export type ThemeConfig =
  | Partial<Theme>
  | { light?: Partial<Theme>; dark?: Partial<Theme> };

export interface ThemeProviderProps {
  mode?: ThemeMode;
  theme?: ThemeConfig;
  enableTransitions?: boolean;
  persistMode?: boolean;
  storageKey?: string;
}

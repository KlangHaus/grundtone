import type { InjectionKey, Ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  neutral: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  divider: string;
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

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  radius: ThemeRadius;
  transitions: ThemeTransitions;
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

export interface ThemeProviderProps {
  mode?: ThemeMode;
  theme?: Partial<Theme>;
  enableTransitions?: boolean;
  persistMode?: boolean;
  storageKey?: string;
}

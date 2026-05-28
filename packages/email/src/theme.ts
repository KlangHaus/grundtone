import { defaultTheme, type Theme } from '@grundtone/core';
import { remToPx } from './internal';

/**
 * A web font to register in the email `<mj-head>`. MJML emits a `<link>` +
 * `@import` so capable clients (Apple Mail, iOS) load the font; everyone else
 * falls back to the token's font stack. Always pair with a real fallback stack.
 */
export interface EmailWebFont {
  name: string;
  href: string;
}

/**
 * Curated, email-ready projection of a grundtone `Theme`.
 *
 * Only the slots an email actually needs are carried over, and lengths are
 * converted to px (see {@link remToPx}). This is the single shape that blocks
 * and the head renderer read from — the *only* coupling between grundtone and
 * the email artifact is these token values.
 */
export interface EmailTheme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    primaryDark: string;
    onPrimary: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceRaised: string;
    border: string;
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
  };
  fonts: {
    base: string;
    heading: string;
    mono: string;
  };
  fontSize: {
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  layout: {
    /** Outer body background (the area around the card). */
    bodyBackground: string;
    /** The email card / content background. */
    contentBackground: string;
    /** Max content width — the classic email-safe ~600px container. */
    containerWidth: string;
  };
  webFonts: EmailWebFont[];
}

export interface ResolveEmailThemeOptions {
  /** Max content width. Defaults to 600px — the email-safe baseline. */
  containerWidth?: string;
  /**
   * Web fonts to register. Defaults to IBM Plex Sans (grundtone's base font)
   * from Google Fonts. Pass `[]` to disable web fonts and rely on the stack.
   */
  webFonts?: EmailWebFont[];
}

/** grundtone's default web font, matching the `IBM Plex Sans` token stack. */
export const IBM_PLEX_SANS: EmailWebFont = {
  name: 'IBM Plex Sans',
  href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
};

/**
 * Project a grundtone `Theme` into an {@link EmailTheme}.
 *
 * @param theme A resolved core theme. Defaults to grundtone's light preset.
 *   For a branded email, pass `createTheme({ light: {...} }).light`; for dark,
 *   pass the `.dark` half.
 */
export function resolveEmailTheme(
  theme: Theme = defaultTheme,
  options: ResolveEmailThemeOptions = {},
): EmailTheme {
  const c = theme.colors;
  const t = theme.typography;
  const px = remToPx;

  return {
    mode: theme.mode === 'dark' ? 'dark' : 'light',
    colors: {
      primary: c.primary,
      primaryDark: c.primaryDark,
      onPrimary: c.onPrimary,
      text: c.text,
      textSecondary: c.textSecondary,
      textTertiary: c.textTertiary,
      textInverse: c.textInverse,
      background: c.background,
      backgroundAlt: c.backgroundAlt,
      surface: c.surface,
      surfaceRaised: c.surfaceRaised,
      border: c.borderMedium,
      success: c.success,
      successLight: c.successLight,
      successDark: c.successDark,
      warning: c.warning,
      warningLight: c.warningLight,
      warningDark: c.warningDark,
      error: c.error,
      errorLight: c.errorLight,
      errorDark: c.errorDark,
      info: c.info,
      infoLight: c.infoLight,
      infoDark: c.infoDark,
    },
    fonts: {
      base: t.fontFamily.base,
      heading: t.fontFamily.heading,
      mono: t.fontFamily.mono,
    },
    fontSize: {
      sm: px(t.fontSize.sm),
      base: px(t.fontSize.base),
      lg: px(t.fontSize.lg),
      xl: px(t.fontSize.xl),
      '2xl': px(t.fontSize['2xl']),
      '3xl': px(t.fontSize['3xl']),
    },
    fontWeight: {
      normal: t.fontWeight.normal,
      medium: t.fontWeight.medium,
      semibold: t.fontWeight.semibold,
      bold: t.fontWeight.bold,
    },
    lineHeight: {
      tight: String(t.lineHeight.tight),
      normal: String(t.lineHeight.normal),
      relaxed: String(t.lineHeight.relaxed),
    },
    spacing: {
      xs: px(theme.spacing.xs),
      sm: px(theme.spacing.sm),
      md: px(theme.spacing.md),
      lg: px(theme.spacing.lg),
      xl: px(theme.spacing.xl),
      '2xl': px(theme.spacing['2xl']),
    },
    radius: {
      sm: px(theme.radius.sm),
      md: px(theme.radius.md),
      lg: px(theme.radius.lg),
    },
    layout: {
      bodyBackground: c.backgroundAlt,
      contentBackground: c.surfaceRaised,
      containerWidth: options.containerWidth ?? '600px',
    },
    webFonts: options.webFonts ?? [IBM_PLEX_SANS],
  };
}

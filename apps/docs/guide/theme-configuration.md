# Theme Configuration

How the theme system works and how to configure it in each package. See
[Installation](/guide/installation) for setup steps.

---

## Theme Interface

Every theme object contains the following token groups:

```ts
interface Theme {
  mode: 'light' | 'dark' | 'auto';
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;           // CSS box-shadow strings (web)
  shadowDefinitions: Record<string, ShadowLayer[]>; // structured (cross-platform)
  radius: ThemeRadius;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
}
```

| Token group          | Web (CSS custom properties)      | React Native                                         | Docs                                                                                       |
| -------------------- | -------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `colors`             | `--color-*`                      | `theme.colors.*`                                     | [Web](/web/colors) · [RN](/react-native/colors)                                            |
| `spacing`            | `--space-*`                      | `theme.spacing.*` (rem → px)                         | [Web](/web/spacing) · [RN](/react-native/spacing)                                          |
| `typography`         | `--font-family-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*` | `theme.typography.*`           | [RN](/react-native/typography)                                                              |
| `shadows`            | `--shadow-*`                     | Use `shadowDefinitions` instead                      | [Web](/web/shadow)                                                                          |
| `shadowDefinitions`  | —                                | `shadowToRN(theme.shadowDefinitions.md)`             | [RN](/react-native/shadows)                                                                 |
| `radius`             | `--radius-*`                     | `theme.radius.*` (rem → px)                          | [Web](/web/border) · [RN](/react-native/radius)                                            |
| `transitions`        | `--duration-*`, `--ease-*`       | `theme.transitions.*` (parse for Animated)           | [Web](/web/transitions) · [RN](/react-native/transitions)                                  |
| `zIndex`             | `--z-*`                          | `theme.zIndex.*`                                     | [Web](/web/z-index) · [RN](/react-native/z-index)                                          |

---

## Colors

Colors are the primary customisation point. Grundtone uses **semantic color tokens** — names like
`primary`, `background`, `text` — instead of raw hex values. Your app uses these names; the actual
colors come from the theme you configure.

### Semantic Color Keys

| Token                                                                                                                                                   | Purpose                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `primary`, `primaryLight`, `primaryDark`, `onPrimary`                                                                                                   | Primary actions, links, buttons |
| `secondary`, `secondaryLight`, `secondaryDark`                                                                                                          | Secondary actions               |
| `success`, `successLight`, `successDark`, `warning`, `warningLight`, `warningDark`, `error`, `errorLight`, `errorDark`, `info`, `infoLight`, `infoDark` | Status and feedback             |
| `background`, `backgroundAlt`, `surface`, `surfaceAlt`, `surfaceRaised`, `surfaceOverlay`                                                               | Backgrounds                     |
| `text`, `textSecondary`, `textTertiary`, `textInverse`, `textPlaceholder`, `textDisabled`                                                               | Text colors                     |
| `borderLight`, `borderMedium`, `borderStrong`, `borderInverse`                                                                                          | Borders                         |
| `focus`, `focusRing`                                                                                                                                    | Focus states                    |
| `neutral`                                                                                                                                               | Neutral UI elements             |

See [Colors](/web/colors) for the full token reference with swatches.

---

## `createTheme()`

All packages use `createTheme()` from `@grundtone/core` to build themes. Override only what you
need — colors, typography, radius, transitions, spacing — everything else uses sensible defaults.

### Colors only (simple)

Pass flat color overrides directly — backwards-compatible with earlier versions:

```ts
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    primary: '#0059b3',
    primaryLight: '#3381cc',
    primaryDark: '#003a7a',
    onPrimary: '#ffffff',
  },
  dark: {
    primary: '#4dabf7',
    primaryLight: '#74c0fc',
    primaryDark: '#339af0',
    onPrimary: '#121212',
  },
});
```

### Full customisation

Use the expanded format to override any token group. Nest colors under `colors`:

```ts
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    colors: {
      primary: '#996600',
      primaryDark: '#7a5200',
      text: '#1a1a1a',
      textSecondary: '#666666',
    },
    typography: {
      fontFamily: {
        base: "'Poppins', sans-serif",
        heading: "'DM Sans', sans-serif",
        mono: "'Libre Baskerville', serif",
      },
    },
    radius: {
      none: '0', xs: '0', sm: '0', md: '0',
      lg: '0', xl: '0', '2xl': '0', '3xl': '0',
      full: '9999px',
    },
    transitions: {
      timing: {
        ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
    },
  },
  dark: {
    colors: {
      primary: '#cc9966',
    },
  },
});
```

### What you can override

| Key | What it controls | Default |
| --- | --- | --- |
| `colors` | All semantic color tokens | Bootstrap-inspired palette |
| `typography.fontFamily` | `base`, `heading`, `mono` | IBM Plex Sans / Mono |
| `typography.fontSize` | `xs`–`5xl` scale | 0.75rem – 3rem |
| `typography.fontWeight` | `thin`–`extrabold` | 100 – 800 |
| `typography.lineHeight` | `none`–`loose` | 1 – 2 |
| `radius` | `none`–`full` scale | 0 – 9999px |
| `transitions.duration` | `fast`, `base`, `slow` | 150ms, 300ms, 500ms |
| `transitions.timing` | `ease`, `easeIn`, `easeOut`, `easeInOut`, `linear` | Material-style curves |
| `spacing` | `xs`–`4xl` scale | 4px – 96px (8px grid) |

The returned `light` and `dark` objects are complete `Theme` instances with all token groups
populated. Unset fields use defaults.

---

## Shadows: Structured Definitions

Shadows use a **structured, cross-platform** representation. Each shadow level (xs–2xl, inner) is
defined as an array of `ShadowLayer` objects:

```ts
interface ShadowLayer {
  x: number;       // offset-x (px)
  y: number;       // offset-y (px)
  blur: number;    // blur-radius (px)
  spread: number;  // spread-radius (px)
  color: string;   // hex, e.g. '#000000'
  opacity: number; // 0–1
  inset?: boolean;
}
```

The `theme.shadows` object contains pre-built CSS `box-shadow` strings derived from these
definitions — web consumers use it as before. The `theme.shadowDefinitions` object contains the
structured data for cross-platform use:

| Field                | Type                            | Platform |
| -------------------- | ------------------------------- | -------- |
| `theme.shadows.md`   | `string` (CSS box-shadow)       | Web      |
| `theme.shadowDefinitions.md` | `ShadowLayer[]`         | Any      |

React Native converts structured layers to native shadow styles via
[`shadowToRN()`](/react-native/shadows).

---

## Non-Color Tokens

Typography, radius, transitions, and spacing can all be customised via `createTheme()` — see the
[full customisation example](#full-customisation) above.

For reference, the default values are exported from `@grundtone/core`:

| Export                        | Controls                              |
| ----------------------------- | ------------------------------------- |
| `defaultSpacing`              | 8px-grid spacing scale (xs–4xl)       |
| `defaultTypography`           | Font families, sizes, weights, line heights |
| `defaultShadowDefinitions`    | Structured shadow layers (xs–2xl, inner)    |
| `defaultRadius`               | Border radius scale (none–full)       |
| `defaultTransitions`          | Duration and timing functions         |
| `defaultZIndex`               | Z-index layer stack                   |

---

## Changing the Default Colors (Self-Hosting)

If you fork or self-host Grundtone, you can change the **system-wide defaults** so every app that
imports `@grundtone/core` gets your brand colors out of the box — without needing `createTheme()`
overrides at the app level.

Edit the two preset objects in `packages/core/src/theme-preset.ts`:

```ts
// packages/core/src/theme-preset.ts

export const defaultColorPreset: ColorPreset = {
  primary: '#your-brand', // ← change these
  primaryLight: '#your-brand-light',
  primaryDark: '#your-brand-dark',
  onPrimary: '#ffffff',
  // ... rest of light-mode tokens
};

export const defaultColorPresetDark: ColorPreset = {
  primary: '#your-brand-dark-mode',
  // ... rest of dark-mode tokens
};
```

After editing, rebuild the packages (`pnpm build`). Every downstream package — design-system, Vue,
Nuxt, React Native — derives its defaults from these objects, so the change propagates
automatically.

> **Tip:** If you only need to override colors in a single app (not system-wide), use
> `createTheme()` at the app level instead. See [Web](/web/colors#theming) or
> [React Native](/react-native/colors#overriding-colors) for per-app setup.

---

## Web vs. React Native

| Platform                       | How tokens work                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Web** (Vue, Nuxt, Plain Web) | Theme is applied as CSS custom properties on `:root`. Use `var(--color-*)`, `var(--shadow-*)`, etc. or rely on utility classes. |
| **React Native**               | No CSS. Tokens come from the theme object via `useGrundtoneTheme()`. Use `theme.colors.primary`, `shadowToRN(theme.shadowDefinitions.md)`, etc. in `style` props. |

---

## Summary

| Package          | Where to configure                    | Docs                                                       |
| ---------------- | ------------------------------------- | ---------------------------------------------------------- |
| **Vue**          | `ThemeProvider` in App.vue            | [Web Colors & Theming](/web/colors#theming)                |
| **Nuxt**         | `nuxt.config.ts` → `grundtone.theme`  | [Web Colors & Theming](/web/colors#nuxt-3)                 |
| **React Native** | `GrundtoneThemeProvider` in App       | [React Native Colors](/react-native/colors)                |
| **Plain Web**    | Your own CSS / SCSS                   | [Web Colors & Theming](/web/colors#plain-web-no-framework) |

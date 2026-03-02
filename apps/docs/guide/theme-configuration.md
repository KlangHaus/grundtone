# Color System & Theme Configuration

How the color system works and how to change the theme in each package. See
[Installation](/guide/installation) for setup steps.

---

## How the Color System Works

Grundtone uses **semantic color tokens** – names like `primary`, `background`, `text` – instead of
raw hex values. Your app uses these names; the actual colors come from the theme you configure.

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

See [Colors](/web/colors) for the full token reference with swatches and migration guide.

### createTheme()

All packages use `createTheme()` from `@grundtone/core` to build themes. Override only what you
need; the rest uses defaults.

```ts
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    primary: '#0059b3',
    primaryLight: '#3381cc',
    primaryDark: '#003a7a',
    onPrimary: '#ffffff',
    // Override any semantic color
  },
  dark: {
    primary: '#4dabf7',
    primaryLight: '#74c0fc',
    primaryDark: '#339af0',
    onPrimary: '#121212',
  },
});
```

### Changing the Default Colors (Self-Hosting)

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

After editing, rebuild the packages (`pnpm build`). Every downstream package — design-tokens, Vue,
Nuxt, React Native — derives its defaults from these two objects, so the change propagates
automatically.

> **Tip:** If you only need to override colors in a single app (not system-wide), use
> `createTheme()` at the app level instead. See [Web](/web/colors#theming) or
> [React Native](/react-native/colors#overriding-colors) for per-app setup.

### Web vs. React Native

| Platform                       | How colors work                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Web** (Vue, Nuxt, Plain Web) | Theme is applied as CSS custom properties on `:root`. Use `var(--color-*)` or rely on components that read them.  |
| **React Native**               | No CSS. Colors come from the theme object via `useGrundtoneTheme()`. Use `theme.colors.primary` in `style` props. |

---

## Summary

| Package          | Where to configure                   | Docs                                                       |
| ---------------- | ------------------------------------ | ---------------------------------------------------------- |
| **Vue**          | `ThemeProvider` in App.vue           | [Web Colors & Theming](/web/colors#theming)                |
| **Nuxt**         | `nuxt.config.ts` → `grundtone.theme` | [Web Colors & Theming](/web/colors#nuxt-3)                 |
| **React Native** | `GrundtoneThemeProvider` in App      | [React Native Colors](/react-native/colors)                |
| **Plain Web**    | Your own CSS / SCSS                  | [Web Colors & Theming](/web/colors#plain-web-no-framework) |

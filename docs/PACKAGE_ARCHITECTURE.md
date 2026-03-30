# Package Architecture

Overview of Grundtone packages and when to use each.

## Platform-agnostic

### @grundtone/core

**Source of truth** for theme data: colors, spacing, typography, shadows, radius.

- `createTheme({ light: {...}, dark: {...} })` – build theme objects
- `defaultTheme`, `defaultColorPreset`, `defaultColorPresetDark`
- TypeScript types: `Theme`, `ThemeColors`, `SEMANTIC_COLOR_KEYS`

Use in: Vue, Nuxt, React Native, or any platform that needs design tokens.

## Web-only

### @grundtone/design-system

**Web styling layer**: SCSS utilities, CSS output, grid system, mixins.

- SCSS: `color()`, `space()`, typography mixins, breakpoints
- Compiled CSS: `dist/index.css` with `:root` variables
- Accessibility helpers (contrast, luminance)
- Used by `@grundtone/vue` via Vite `additionalData`

**You need this for:**

- Vue/Vite projects using SCSS with design tokens
- Projects that import `@use '@grundtone/design-system'` in styles
- Standalone CSS (e.g. non-Vue web apps)

**You do NOT need this for:**

- React Native – use `@grundtone/core` + `@grundtone/react-native` instead
- Projects that only use Vue components (Vue package already depends on it)

### @grundtone/utils

Shared utilities, formatters, and validation helpers.

- Depends on: core
- CPR validation, phone formatting, currency formatting, date formatting

### @grundtone/vue

Vue 3 components and composables.

- Depends on: core, design-system, utils
- Applies theme to DOM via CSS custom properties

### @grundtone/nuxt

Nuxt 3 module: auto-imports Vue components and composables.

- Depends on: vue

## React Native

### @grundtone/react-native

Theme provider and `useGrundtoneTheme()` hook.

- Depends on: core, utils
- No design-system (RN does not use CSS/SCSS)
- Use `theme.colors.primary`, `theme.spacing.md` etc. in `StyleSheet`

## Summary

| Package                  | Platform | Purpose                           |
| ------------------------ | -------- | --------------------------------- |
| @grundtone/core          | All      | Theme data, types, createTheme    |
| @grundtone/utils         | All      | Utilities, formatters, validation |
| @grundtone/design-system | Web      | SCSS functions, mixins, CSS, grid |
| @grundtone/vue           | Web      | Vue 3 components and composables  |
| @grundtone/nuxt          | Web      | Nuxt 3 module with auto-imports   |
| @grundtone/react-native  | RN       | ThemeProvider, useGrundtoneTheme  |

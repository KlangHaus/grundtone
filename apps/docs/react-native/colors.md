# Colors (React Native)

React Native uses the same **38 semantic color tokens** as Web, but accessed via the theme object
instead of CSS custom properties. All values come from `@grundtone/core` — the single source of
truth for both platforms.

## Naming Convention

Tokens use **shade-based** naming (`primaryLight`, `primaryDark`) instead of state-based
(`primaryHover`, `primaryActive`). Components decide which shade to use for hover, active, tint,
etc.

---

## Setup

Wrap your app with `GrundtoneThemeProvider` and pass light/dark themes from `createTheme()`:

```tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
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

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}
```

The provider automatically follows the system appearance (light/dark) via React Native's
`Appearance` API. Override with the `defaultMode` or `mode` prop.

---

## Using Colors

Access colors via the `useGrundtoneTheme()` hook:

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

function Card({ title, children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.borderLight,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: theme.colors.text }}>{title}</Text>
      <Text style={{ color: theme.colors.textSecondary }}>{children}</Text>
    </View>
  );
}
```

---

## Brand

<ColorTokens category="brand" mode="light" />

---

## Status

<ColorTokens category="status" mode="light" />

---

## Surface

<ColorTokens category="surface" mode="light" />

```tsx
// Modal backdrop example
function ModalBackdrop({ visible, children }) {
  const { theme } = useGrundtoneTheme();
  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.modalBackdrop }]}>
      {children}
    </View>
  );
}
```

---

## Text

<ColorTokens category="text" mode="light" />

---

## Border

<ColorTokens category="border" mode="light" />

---

## Focus & Neutral

<ColorTokens category="focus" mode="light" />

---

## Light vs Dark Comparison

Side-by-side comparison of all tokens across modes.

### Brand

<ColorTokens category="brand" mode="compare" />

### Status

<ColorTokens category="status" mode="compare" />

### Surface

<ColorTokens category="surface" mode="compare" />

### Text

<ColorTokens category="text" mode="compare" />

### Border

<ColorTokens category="border" mode="compare" />

---

## Dark Mode Control

The hook provides `isDark` and `setMode` for manual control:

```tsx
const { theme, isDark, setMode } = useGrundtoneTheme();

// Toggle
setMode(isDark ? 'light' : 'dark');

// Use in styles
<View style={{ backgroundColor: theme.colors.background }}>
  <Text style={{ color: theme.colors.text }}>
    {isDark ? 'Dark mode' : 'Light mode'}
  </Text>
</View>;
```

---

## Overriding Colors

Override only what you need in `createTheme()` — the rest uses defaults:

```tsx
const { light, dark } = createTheme({
  light: {
    primary: '#e91e63',
    primaryLight: '#f06292',
    primaryDark: '#c2185b',
    onPrimary: '#ffffff',
  },
  dark: {
    primary: '#f48fb1',
    primaryLight: '#f8bbd0',
    primaryDark: '#ec407a',
    onPrimary: '#121212',
  },
});
```

You can override any of the 38 tokens. Unspecified tokens keep their defaults.

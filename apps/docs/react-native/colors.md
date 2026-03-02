# Colors (React Native)

React Native uses the same **37 semantic color tokens** as Web, but accessed via the theme object
instead of CSS custom properties.

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

## Available Tokens

All 37 tokens from `theme.colors`:

| Category    | Tokens                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Brand**   | `primary`, `primaryLight`, `primaryDark`, `onPrimary`, `secondary`, `secondaryLight`, `secondaryDark`                                                   |
| **Status**  | `success`, `successLight`, `successDark`, `warning`, `warningLight`, `warningDark`, `error`, `errorLight`, `errorDark`, `info`, `infoLight`, `infoDark` |
| **Surface** | `background`, `backgroundAlt`, `surface`, `surfaceAlt`, `surfaceRaised`, `surfaceOverlay`                                                               |
| **Text**    | `text`, `textSecondary`, `textTertiary`, `textInverse`, `textPlaceholder`, `textDisabled`                                                               |
| **Border**  | `borderLight`, `borderMedium`, `borderStrong`, `borderInverse`                                                                                          |
| **Focus**   | `focus`, `focusRing`                                                                                                                                    |
| **Neutral** | `neutral`                                                                                                                                               |

See [Colors (Web)](/web/colors) for the full reference with hex values and swatches.

---

## Dark Mode

The hook provides `isDark` and `setMode` for manual control:

```tsx
const { theme, isDark, setMode } = useGrundtoneTheme();

// Toggle
setMode(isDark ? 'light' : 'dark');

// Use in styles
<View
  style={{
    backgroundColor: theme.colors.background,
  }}
>
  <Text style={{ color: theme.colors.text }}>{isDark ? 'Dark mode' : 'Light mode'}</Text>
</View>;
```

---

## Overriding Colors

Override only what you need in `createTheme()` — the rest uses defaults:

```tsx
const { light, dark } = createTheme({
  light: { primary: '#e91e63' },
  dark: { primary: '#f48fb1' },
});
```

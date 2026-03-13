# useGrundtoneTheme

Access the current theme from any component within a `GrundtoneThemeProvider`.

## Usage

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

function MyScreen() {
  const { theme, isDark, toggleMode } = useGrundtoneTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
}
```

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `Theme` | Current resolved theme object |
| `mode` | `ThemeMode` | Current mode: `'light'`, `'dark'`, or `'auto'` |
| `isDark` | `boolean` | Whether dark mode is active |
| `isLight` | `boolean` | Whether light mode is active |
| `setMode` | `(mode: ThemeMode) => void` | Set the theme mode |
| `toggleMode` | `() => void` | Toggle between light and dark |

## Requirements

Must be used inside a component tree wrapped with `GrundtoneThemeProvider`. Throws an error if no provider is found.

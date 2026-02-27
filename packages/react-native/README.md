# @grundtone/react-native

React Native theme provider and hooks for Grundtone design system. Use the same semantic tokens as
web (colors, spacing, typography) in your RN app.

## Installation

```bash
pnpm add @grundtone/react-native @grundtone/core
# or
npm install @grundtone/react-native @grundtone/core
```

## Usage

### 1. Wrap your app with GrundtoneThemeProvider

```tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    colors: {
      primary: '#007aff',
      background: '#ffffff',
      text: '#1c1c1e',
      // ... override only what you need
    },
  },
  dark: {
    colors: {
      primary: '#0a84ff',
      background: '#000000',
      text: '#ffffff',
    },
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

### 2. Use the theme in your components

```tsx
import { StyleSheet, View, Text } from 'react-native';
import { useGrundtoneTheme } from '@grundtone/react-native';

function MyScreen() {
  const { theme } = useGrundtoneTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Hello</Text>
      <View style={[styles.button, { backgroundColor: theme.colors.primary }]}>
        <Text style={{ color: theme.colors.onPrimary }}>Submit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // or use theme.spacing.md when building styles dynamically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    borderRadius: 8,
  },
});
```

### Theme mode

By default, the provider follows the system color scheme. To fix a mode:

```tsx
<GrundtoneThemeProvider light={light} dark={dark} defaultMode="dark">
  <App />
</GrundtoneThemeProvider>
```

To toggle programmatically:

```tsx
const { mode, setMode, isDark } = useGrundtoneTheme();

// Switch to dark
setMode('dark');
```

## Design tokens vs web

| Platform     | Token source      | Delivery                     |
| ------------ | ----------------- | ---------------------------- |
| Web (Vue)    | `@grundtone/core` | CSS vars, design-tokens SCSS |
| React Native | `@grundtone/core` | Theme object via hook        |

You do **not** need `@grundtone/design-tokens` for React Native. Design-tokens is web-only (SCSS,
CSS utilities). Use `createTheme()` from `@grundtone/core` and pass the theme objects to
`GrundtoneThemeProvider`.

## Metro config (optional)

If you see errors about `@grundtone/core` importing `.css`, add to `metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.blockList = [/\.css$/];
module.exports = config;
```

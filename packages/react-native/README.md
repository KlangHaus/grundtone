# @grundtone/react-native

React Native theme provider and hooks for the [Grundtone](https://grundtone.com) design system. Uses
the same semantic tokens as the web packages.

## Installation

```bash
npm install @grundtone/react-native @grundtone/core
```

You do **not** need `@grundtone/design-system` - that package is web-only (SCSS/CSS). For React
Native, tokens are delivered via the theme object.

## Usage

### 1. Wrap your app

```tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    colors: { primary: '#007aff', background: '#ffffff', text: '#1c1c1e' },
  },
  dark: {
    colors: { primary: '#0a84ff', background: '#000000', text: '#ffffff' },
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

### 2. Use the theme

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

function MyScreen() {
  const { theme, mode, setMode, isDark } = useGrundtoneTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
}
```

### Toggle theme

```tsx
const { setMode } = useGrundtoneTheme();
setMode('dark');
```

By default, the provider follows the system color scheme.

## Utilities

- `shadowToRN(shadow)` - Convert web shadow values to React Native shadow styles
- `createBranding()` - Create branding configuration
- `getLogoSource()` - Get logo asset for current theme

## Documentation

See [grundtone.com](https://grundtone.com) for full API reference.

## License

MIT

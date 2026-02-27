# @grundtone/react-native

[![npm version](https://img.shields.io/npm/v/@grundtone/react-native.svg?style=flat)](https://www.npmjs.com/package/@grundtone/react-native)

React Native theme provider and hooks. Use the same semantic tokens as web (colors, spacing,
typography) in your RN app.

## Installation

```bash
pnpm add @grundtone/react-native @grundtone/core
# or
npm install @grundtone/react-native @grundtone/core
```

## Usage

```tsx
import { GrundtoneThemeProvider, useGrundtoneTheme } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}

function MyScreen() {
  const { theme } = useGrundtoneTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
}
```

## Design-tokens package

You do **not** need `@grundtone/design-tokens` for React Native. Design-tokens is web-only (SCSS,
CSS utilities). Use `createTheme()` from `@grundtone/core` and pass the theme objects to
`GrundtoneThemeProvider`.

See [Package Architecture](/guide/package-architecture) for an overview of all packages and when to
use each.

# Typography (React Native)

Typography tokens are available via `theme.typography` from the `useGrundtoneTheme()` hook.

---

## Font Families

| Token     | Default                       |
| --------- | ----------------------------- |
| `base`    | IBM Plex Sans (+ system fallbacks) |
| `heading` | IBM Plex Sans (+ system fallbacks) |
| `mono`    | IBM Plex Mono (+ system fallbacks) |

React Native does not support CSS font stacks. Use the platform font name directly:

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';
import { Platform } from 'react-native';

// Map theme font families to RN font names
const fontFamily = Platform.select({
  ios: 'IBMPlexSans',
  android: 'IBMPlexSans-Regular',
  default: 'System',
});
```

---

## Font Sizes

| Token  | Value      | Pixels |
| ------ | ---------- | ------ |
| `xs`   | `0.75rem`  | 12px   |
| `sm`   | `0.875rem` | 14px   |
| `base` | `1rem`     | 16px   |
| `lg`   | `1.125rem` | 18px   |
| `xl`   | `1.25rem`  | 20px   |
| `2xl`  | `1.5rem`   | 24px   |
| `3xl`  | `1.875rem` | 30px   |
| `4xl`  | `2.25rem`  | 36px   |
| `5xl`  | `3rem`     | 48px   |

Font sizes are rem strings. Convert to numbers for React Native:

```tsx
const REM_BASE = 16;
const rem = (value: string) => parseFloat(value) * REM_BASE;

function Heading({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <Text
      style={{
        fontSize: rem(theme.typography.fontSize['2xl']), // 24
        fontWeight: String(theme.typography.fontWeight.bold), // '700'
        color: theme.colors.text,
      }}
    >
      {children}
    </Text>
  );
}
```

---

## Font Weights

| Token      | Value |
| ---------- | ----- |
| `thin`     | 100   |
| `light`    | 300   |
| `normal`   | 400   |
| `medium`   | 500   |
| `semibold` | 600   |
| `bold`     | 700   |
| `extrabold`| 800   |

Font weights are already numbers — cast to string for RN's `fontWeight` style property:

```tsx
const { theme } = useGrundtoneTheme();

const style = {
  fontWeight: String(theme.typography.fontWeight.semibold) as '600',
};
```

---

## Line Heights

| Token     | Value |
| --------- | ----- |
| `none`    | 1     |
| `tight`   | 1.25  |
| `snug`    | 1.375 |
| `normal`  | 1.5   |
| `relaxed` | 1.625 |
| `loose`   | 2     |

Line height values are unitless multipliers. In React Native, `lineHeight` expects an absolute pixel value — multiply by your font size:

```tsx
const fontSize = rem(theme.typography.fontSize.base); // 16
const lineHeight = fontSize * theme.typography.lineHeight.normal; // 24

<Text style={{ fontSize, lineHeight }}>Body text</Text>
```

---

## Common Patterns

### Text style presets

```tsx
function useTextStyles() {
  const { theme } = useGrundtoneTheme();
  const rem = (v: string) => parseFloat(v) * 16;

  const size = (key: keyof typeof theme.typography.fontSize) =>
    rem(theme.typography.fontSize[key]);

  return {
    h1: {
      fontSize: size('4xl'),
      fontWeight: String(theme.typography.fontWeight.bold) as '700',
      lineHeight: size('4xl') * theme.typography.lineHeight.tight,
      color: theme.colors.text,
    },
    h2: {
      fontSize: size('3xl'),
      fontWeight: String(theme.typography.fontWeight.semibold) as '600',
      lineHeight: size('3xl') * theme.typography.lineHeight.tight,
      color: theme.colors.text,
    },
    body: {
      fontSize: size('base'),
      fontWeight: String(theme.typography.fontWeight.normal) as '400',
      lineHeight: size('base') * theme.typography.lineHeight.normal,
      color: theme.colors.text,
    },
    caption: {
      fontSize: size('sm'),
      fontWeight: String(theme.typography.fontWeight.normal) as '400',
      lineHeight: size('sm') * theme.typography.lineHeight.normal,
      color: theme.colors.textSecondary,
    },
  };
}
```

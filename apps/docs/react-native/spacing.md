# Spacing (React Native)

Spacing tokens are available via `theme.spacing` from the `useGrundtoneTheme()` hook.

---

## Spacing Scale

| Token | Value     | Pixels |
| ----- | --------- | ------ |
| `xs`  | `0.25rem` | 4px    |
| `sm`  | `0.5rem`  | 8px    |
| `md`  | `1rem`    | 16px   |
| `lg`  | `1.5rem`  | 24px   |
| `xl`  | `2rem`    | 32px   |
| `2xl` | `3rem`    | 48px   |
| `3xl` | `4rem`    | 64px   |
| `4xl` | `6rem`    | 96px   |

---

## Usage

Spacing values are strings (`"1rem"`). Convert to numbers for React Native styles using
`parseFloat()` and a base size:

```tsx
import { useGrundtoneTheme } from '@grundtone/react-native';

const REM_BASE = 16;
const rem = (value: string) => parseFloat(value) * REM_BASE;

function Section({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        padding: rem(theme.spacing.md), // 16px
        marginBottom: rem(theme.spacing.lg), // 24px
        gap: rem(theme.spacing.sm), // 8px
      }}
    >
      {children}
    </View>
  );
}
```

---

## Common Patterns

### Consistent card spacing

```tsx
function Card({ children }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        padding: rem(theme.spacing.md),
        borderRadius: 8,
        backgroundColor: theme.colors.surface,
        gap: rem(theme.spacing.sm),
      }}
    >
      {children}
    </View>
  );
}
```

### List item spacing

```tsx
function ListItem({ title, subtitle }) {
  const { theme } = useGrundtoneTheme();

  return (
    <View
      style={{
        paddingVertical: rem(theme.spacing.sm),
        paddingHorizontal: rem(theme.spacing.md),
      }}
    >
      <Text style={{ color: theme.colors.text }}>{title}</Text>
      <Text
        style={{
          color: theme.colors.textSecondary,
          marginTop: rem(theme.spacing.xs),
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}
```

---

## Overriding Spacing

Override spacing values via `createTheme()`:

```tsx
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {},
  dark: {},
  spacing: {
    md: '0.875rem', // 14px instead of 16px
    lg: '1.25rem', // 20px instead of 24px
  },
});
```

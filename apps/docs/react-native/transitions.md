# Transitions & Animation (React Native)

Transition timing tokens are available via `theme.transitions` from the `useGrundtoneTheme()` hook.

---

## Duration Scale

| Token  | Value   | Milliseconds |
| ------ | ------- | ------------ |
| `fast` | `150ms` | 150          |
| `base` | `300ms` | 300          |
| `slow` | `500ms` | 500          |

---

## Timing Functions

| Token       | CSS cubic-bezier              | Easing type      |
| ----------- | ----------------------------- | ---------------- |
| `ease`      | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard         |
| `easeIn`    | `cubic-bezier(0.4, 0, 1, 1)`   | Accelerate       |
| `easeOut`   | `cubic-bezier(0, 0, 0.2, 1)`   | Decelerate       |
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Accelerate + decelerate |
| `linear`    | `linear`                       | Constant         |

---

## Usage with Animated API

Duration values are strings (`'300ms'`). Parse to numbers for React Native's `Animated`:

```tsx
import { useRef } from 'react';
import { Animated } from 'react-native';
import { useGrundtoneTheme } from '@grundtone/react-native';

const ms = (value: string) => parseInt(value, 10);

function FadeIn({ children }) {
  const { theme } = useGrundtoneTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: ms(theme.transitions.duration.base), // 300
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      {children}
    </Animated.View>
  );
}
```

---

## Usage with Reanimated

With `react-native-reanimated`, use the timing tokens with `withTiming`:

```tsx
import { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useGrundtoneTheme } from '@grundtone/react-native';

const ms = (value: string) => parseInt(value, 10);

function ScaleButton({ children, pressed }) {
  const { theme } = useGrundtoneTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(pressed ? 0.95 : 1, {
          duration: ms(theme.transitions.duration.fast), // 150
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
```

---

## Parsing Cubic Bezier

The timing values are CSS cubic-bezier strings. To use them with Reanimated's `Easing.bezier()`, parse the four control points:

```tsx
function parseBezier(css: string): [number, number, number, number] {
  const match = css.match(
    /cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/,
  );
  if (!match) return [0, 0, 1, 1]; // linear fallback
  return [
    parseFloat(match[1]),
    parseFloat(match[2]),
    parseFloat(match[3]),
    parseFloat(match[4]),
  ];
}

// Usage
const [x1, y1, x2, y2] = parseBezier(theme.transitions.timing.easeOut);
const easing = Easing.bezier(x1, y1, x2, y2);
```

---

## Notes

- React Native's `Animated` API does not support CSS `transition` — use `Animated.timing()` or Reanimated's `withTiming()`.
- Prefer `useNativeDriver: true` for opacity and transform animations.
- The theme tokens ensure consistent motion timing across web and native.

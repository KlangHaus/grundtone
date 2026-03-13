# Icons (React Native)

The icon registry from `@grundtone/core` provides typed SVG icon data that works in React Native via `react-native-svg`.

---

## Icon Registry

Import the registry directly from `@grundtone/core`:

```tsx
import { iconRegistry } from '@grundtone/core';
import type { IconName } from '@grundtone/core';
```

Each entry contains:

| Property | Type | Description |
| --- | --- | --- |
| `body` | `string` | SVG inner content (paths, circles, etc.) |
| `viewBox` | `string` | SVG viewBox attribute |

---

## Available Icons

| Name | Description |
| --- | --- |
| `arrow-left` | Left arrow |
| `arrow-right` | Right arrow |
| `check` | Checkmark |
| `close` | Close / X |
| `menu` | Hamburger menu |
| `search` | Magnifying glass |

---

## Size Tokens

Use `theme.iconSizes` (when available) or reference the design system scale:

| Size | Value | Pixels |
| --- | --- | --- |
| `xs` | `0.75rem` | 12px |
| `sm` | `1rem` | 16px |
| `md` | `1.25rem` | 20px |
| `lg` | `1.5rem` | 24px |
| `xl` | `2rem` | 32px |
| `2xl` | `2.5rem` | 40px |

---

## Usage with react-native-svg

```tsx
import { SvgXml } from 'react-native-svg';
import { iconRegistry } from '@grundtone/core';
import type { IconName } from '@grundtone/core';

const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

type IconSize = keyof typeof ICON_SIZES;

function Icon({
  name,
  size = 'lg',
  color = 'currentColor',
}: {
  name: IconName;
  size?: IconSize;
  color?: string;
}) {
  const icon = iconRegistry[name];
  const px = ICON_SIZES[size];

  const xml = `<svg viewBox="${icon.viewBox}" width="${px}" height="${px}"
    fill="none" stroke="${color}" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg">${icon.body}</svg>`;

  return <SvgXml xml={xml} width={px} height={px} />;
}
```

```tsx
<Icon name="check" size="lg" color="#10b981" />
<Icon name="close" size="sm" color="#ef4444" />
```

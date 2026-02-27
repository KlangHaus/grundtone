# Icon System

A flexible, configurable icon system that supports multiple icon libraries while maintaining optimal
performance and accessibility.

## 🚀 Quick Start

```vue
<template>
  <IconProvider :icons="haspenIcons">
    <Icon name="sun" :size="24" />
    <Icon name="moon" :size="24" />
  </IconProvider>
</template>

<script setup>
  import { Icon, IconProvider, haspenIcons } from '@haspen/ui';
</script>
```

## ✨ Features

- **Multiple Libraries**: Support for Heroicons, Lucide, and custom icons
- **Provider Pattern**: Configure icons at app or component level
- **Accessibility**: ARIA attributes and screen reader support
- **Tree Shaking**: Only bundle icons you actually use
- **TypeScript**: Full type safety and IntelliSense
- **Performance**: Lightweight with minimal runtime overhead

## 📦 Installation

The icon system is included with `@haspen/ui`. For external icon libraries:

```bash
# Optional: External icon libraries
pnpm add @heroicons/vue lucide-vue-next
```

## 🔧 Basic Usage

### Built-in Custom Icons

```vue
<template>
  <IconProvider :icons="haspenIcons">
    <Icon name="sun" :size="24" />
    <Icon name="moon" :size="24" />
  </IconProvider>
</template>

<script setup>
  import { Icon, IconProvider, haspenIcons } from '@haspen/ui';
</script>
```

### Custom Icons

```vue
<template>
  <IconProvider :icons="customIcons">
    <Icon name="logo" :size="32" />
    <Icon name="star" :size="20" />
  </IconProvider>
</template>

<script setup>
  import { Icon, IconProvider } from '@haspen/ui';
  import LogoIcon from './LogoIcon.vue';
  import StarIcon from './StarIcon.vue';

  const customIcons = {
    logo: LogoIcon,
    star: StarIcon,
  };
</script>
```

## 🎛️ Configuration Options

### Custom Icons Configuration

```typescript
import { createCustomIconsConfig, haspenIcons } from '@haspen/ui';

const config = createCustomIconsConfig(
  {
    ...haspenIcons,
    'custom-logo': MyLogoComponent,
  },
  {
    prefix: 'my-app',
    includeBuiltIn: true,
  },
);
```

### Heroicons Configuration

```typescript
import { createHeroiconsConfig } from '@haspen/ui';

const config = createHeroiconsConfig({
  variant: 'outline', // 'outline' | 'solid' | 'mini'
  prefix: 'hero',
});
```

### Lucide Configuration

```typescript
import { createLucideConfig } from '@haspen/ui';

const config = createLucideConfig({
  strokeWidth: 2,
  prefix: 'lucide',
});
```

### Hybrid Configuration

```typescript
import { createHybridIconsConfig, haspenIcons } from '@haspen/ui';

const config = createHybridIconsConfig({
  primary: 'heroicons',
  fallbackIcons: {
    ...haspenIcons,
    'custom-logo': CustomLogoComponent,
  },
});
```

## 🎯 Library Configurations

### 1. Custom Icons (Default)

Best for: Full control, minimal bundle size, custom designs

```vue
<template>
  <IconProvider :icons="haspenIcons" library="custom">
    <Icon name="sun" :size="24" />
    <Icon name="moon" :size="24" />
  </IconProvider>
</template>
```

**Pros:**

- ✅ No external dependencies
- ✅ Minimal bundle size
- ✅ Complete design control
- ✅ Perfect tree shaking

**Cons:**

- ❌ Limited icon selection
- ❌ Need to create custom icons

### 2. Heroicons

Best for: Professional designs, comprehensive icon set

```vue
<template>
  <IconProvider library="heroicons">
    <Icon name="academic-cap" :size="24" />
    <Icon name="adjustments-horizontal" :size="24" />
  </IconProvider>
</template>
```

**Installation:**

```bash
pnpm add @heroicons/vue
```

**Pros:**

- ✅ 300+ professional icons
- ✅ Multiple variants (outline, solid, mini)
- ✅ Designed by Tailwind team
- ✅ Tree shakeable

**Cons:**

- ❌ Additional dependency
- ❌ Larger bundle if using many icons

### 3. Lucide

Best for: Consistent stroke-based design, large icon set

```vue
<template>
  <IconProvider library="lucide">
    <Icon name="Activity" :size="24" />
    <Icon name="AlertCircle" :size="24" />
  </IconProvider>
</template>
```

**Installation:**

```bash
pnpm add lucide-vue-next
```

**Pros:**

- ✅ 1000+ consistent icons
- ✅ Stroke-based design
- ✅ Active community
- ✅ PascalCase naming

**Cons:**

- ❌ Additional dependency
- ❌ Different naming convention

### 4. Hybrid Approach

Best for: Gradual migration, mixed requirements

```vue
<template>
  <IconProvider :config="hybridConfig">
    <!-- Uses Heroicons -->
    <Icon name="chevron-up" :size="24" />

    <!-- Falls back to custom -->
    <Icon name="sun" :size="24" />
    <Icon name="company-logo" :size="24" />
  </IconProvider>
</template>
```

**Pros:**

- ✅ Best of both worlds
- ✅ Gradual migration path
- ✅ Custom overrides

**Cons:**

- ❌ More complex setup
- ❌ Potential naming conflicts

## 🔤 Icon Naming Conventions

### Heroicons

- **Format**: `kebab-case`
- **Examples**: `chevron-up`, `x-mark`, `magnifying-glass`

### Lucide

- **Format**: `PascalCase`
- **Examples**: `ChevronUp`, `X`, `Search`

### Custom

- **Format**: `kebab-case` (recommended)
- **Examples**: `sun`, `moon`, `company-logo`

## 🗺️ Name Mapping

Convert between library naming conventions:

```typescript
import { mapIconName } from '@haspen/ui';

// Heroicons → Lucide
const lucideName = mapIconName('chevron-up', 'heroicons', 'lucide');
console.log(lucideName); // 'ChevronUp'

// Lucide → Heroicons
const heroName = mapIconName('ChevronUp', 'lucide', 'heroicons');
console.log(heroName); // 'chevron-up'
```

## ♿ Accessibility

### Decorative Icons

Icons that are purely decorative should be hidden from screen readers:

```vue
<template>
  <div>
    <Icon name="sun" :size="20" :aria-hidden="true" />
    <span>Light Mode</span>
  </div>
</template>
```

### Semantic Icons

Icons with semantic meaning should have proper labels:

```vue
<template>
  <button>
    <Icon name="sun" :size="20" :aria-hidden="false" aria-label="Switch to light mode" />
    <span class="sr-only">Light Mode</span>
  </button>
</template>
```

### Icon-Only Buttons

For buttons with only icons, always provide accessible text:

```vue
<template>
  <button aria-label="Close dialog">
    <Icon name="x-mark" :size="20" :aria-hidden="true" />
  </button>
</template>
```

## 🔧 Composables

### useIconConfig

Get the current icon configuration:

```vue
<script setup>
  import { useIconConfig } from '@haspen/ui';

  const config = useIconConfig();
  console.log(config.library); // 'custom'
  console.log(config.prefix); // 'my-app'
</script>
```

### useIconExists

Check if an icon exists in the current configuration:

```vue
<script setup>
  import { useIconExists } from '@haspen/ui';

  const sunExists = useIconExists('sun'); // true/false
</script>
```

### useAvailableIcons

Get all available icon names:

```vue
<script setup>
  import { useAvailableIcons } from '@haspen/ui';

  const icons = useAvailableIcons(); // ['sun', 'moon', ...]
</script>
```

## 🧪 Testing

Test different library configurations:

```bash
# Test different libraries
node test-libraries.mjs custom
node test-libraries.mjs heroicons
node test-libraries.mjs lucide
node test-libraries.mjs hybrid
node test-libraries.mjs mappings

# Verify exports work
node test-import.mjs
```

## 📊 Bundle Analysis

### Tree Shaking

Only icons you use are included in your bundle:

```typescript
// ✅ Good: Only SunIcon.vue is bundled
import { Icon } from '@haspen/ui';
// Usage: <Icon name="sun" />

// ❌ Bad: All icons bundled
import * as icons from '@haspen/ui/icons';
```

### Bundle Size Examples

| Configuration | Base Size | Per Icon | Total (5 icons) |
| ------------- | --------- | -------- | --------------- |
| Custom        | 2KB       | 1-2KB    | ~8KB            |
| Heroicons     | 5KB       | 0.5KB    | ~8KB            |
| Lucide        | 4KB       | 0.3KB    | ~6KB            |

## 🎨 Styling

### CSS Variables

Customize icon appearance with CSS:

```scss
.haspen-icon {
  --icon-color: currentColor;
  --icon-size: 1em;
  --icon-transition: all 0.2s ease;

  color: var(--icon-color);
  transition: var(--icon-transition);

  &:hover {
    --icon-color: #3b82f6;
  }
}
```

### Custom Classes

Use the prefix for custom styling:

```vue
<template>
  <IconProvider prefix="my-app" :icons="haspenIcons">
    <Icon name="sun" :size="24" />
    <!-- Generates: class="haspen-icon my-app-sun" -->
  </IconProvider>
</template>
```

```scss
.my-app-sun {
  color: #f59e0b;

  &:hover {
    color: #d97706;
  }
}
```

## 📝 Props Reference

### Icon Component

| Prop         | Type          | Default | Description                    |
| ------------ | ------------- | ------- | ------------------------------ |
| `name`       | `string`      | -       | Icon name to display           |
| `size`       | `number`      | `16`    | Icon size in pixels            |
| `ariaHidden` | `boolean`     | `true`  | Hide from screen readers       |
| `ariaLabel`  | `string`      | -       | Accessible label               |
| `library`    | `IconLibrary` | -       | Override library for this icon |

### IconProvider Component

| Prop      | Type                        | Default    | Description               |
| --------- | --------------------------- | ---------- | ------------------------- |
| `icons`   | `Record<string, Component>` | `{}`       | Custom icon components    |
| `library` | `IconLibrary`               | `'custom'` | Icon library to use       |
| `prefix`  | `string`                    | -          | CSS class prefix          |
| `config`  | `IconConfig`                | -          | Full configuration object |

## 🔄 Migration Guide

### From Individual Icons

```vue
<!-- ❌ Old way -->
<SunIcon :size="24" />
<MoonIcon :size="24" />

<!-- ✅ New way -->
<IconProvider :icons="haspenIcons">
  <Icon name="sun" :size="24" />
  <Icon name="moon" :size="24" />
</IconProvider>
```

### From External Libraries

```vue
<!-- ❌ Old way -->
<ChevronUpIcon class="h-6 w-6" />

<!-- ✅ New way -->
<IconProvider library="heroicons">
  <Icon name="chevron-up" :size="24" />
</IconProvider>
```

## 🤝 Contributing

When adding new icons:

1. Create the icon component in `/atoms/Icon/`
2. Add to `haspenIcons` in `libraries.ts`
3. Export from `index.ts`
4. Update tests and documentation

## 📄 License

Part of the Haspen UI design system. See main package license.

## 🔗 Related

- [Button Component](../Button/README.md) - Uses icons for loading states
- [ThemeToggle Component](../ThemeToggle/README.md) - Uses sun/moon icons

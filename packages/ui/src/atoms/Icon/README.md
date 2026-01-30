# Icon System

A flexible, configurable icon system that supports multiple icon libraries and custom icons.

## Features

- **Multiple Libraries**: Support for Heroicons, Lucide, and custom SVG icons
- **Tree Shaking**: Only load icons you actually use
- **TypeScript**: Full type safety with auto-completion
- **Accessibility**: Built-in accessibility support
- **Provider Pattern**: Configure once, use everywhere
- **Backward Compatible**: Existing SunIcon/MoonIcon components still work

## Quick Start

### Basic Usage with Custom Icons

```vue
<template>
  <IconProvider :icons="customIcons">
    <Icon name="sun" :size="24" />
    <Icon name="moon" :size="24" />
  </IconProvider>
</template>

<script setup>
  import { IconProvider, Icon, haspenIcons } from '@haspen/ui';

  const customIcons = {
    ...haspenIcons,
    // Add your custom icons here
  };
</script>
```

### Using Heroicons

```vue
<template>
  <IconProvider library="heroicons">
    <Icon name="sun" :size="24" />
    <Icon name="chevron-down" :size="16" />
  </IconProvider>
</template>

<script setup>
  import { IconProvider, Icon } from '@haspen/ui';
</script>
```

### Using Lucide Icons

```vue
<template>
  <IconProvider library="lucide">
    <Icon name="Sun" :size="24" />
    <Icon name="ChevronDown" :size="16" />
  </IconProvider>
</template>

<script setup>
  import { IconProvider, Icon } from '@haspen/ui';
</script>
```

## Configuration

### Provider Configuration

```vue
<template>
  <IconProvider library="heroicons" prefix="icon" :default-size="20" :config="iconConfig">
    <MyApp />
  </IconProvider>
</template>

<script setup>
  import { createHeroiconsConfig } from '@haspen/ui';

  const iconConfig = createHeroiconsConfig({
    variant: 'outline',
    prefix: 'hero',
  });
</script>
```

### Hybrid Configuration

Use external libraries with custom fallbacks:

```vue
<template>
  <IconProvider :config="hybridConfig">
    <Icon name="sun" />
    <!-- Uses Heroicon -->
    <Icon name="custom-logo" />
    <!-- Falls back to custom -->
  </IconProvider>
</template>

<script setup>
  import { createHybridIconsConfig } from '@haspen/ui';
  import CustomLogo from './icons/CustomLogo.vue';

  const hybridConfig = createHybridIconsConfig({
    primary: 'heroicons',
    fallbackIcons: {
      'custom-logo': CustomLogo,
    },
  });
</script>
```

## Library-Specific Usage

### Heroicons Setup

1. Install Heroicons:

   ```bash
   npm install @heroicons/vue
   ```

2. Configure provider:
   ```vue
   <IconProvider library="heroicons">
     <Icon name="academic-cap" />
     <Icon name="adjustments-horizontal" />
   </IconProvider>
   ```

### Lucide Setup

1. Install Lucide:

   ```bash
   npm install lucide-vue-next
   ```

2. Configure provider:
   ```vue
   <IconProvider library="lucide">
     <Icon name="Activity" />
     <Icon name="AlertCircle" />
   </IconProvider>
   ```

## Composables

### useIconConfig

Access the current icon configuration:

```vue
<script setup>
  import { useIconConfig } from '@haspen/ui';

  const config = useIconConfig();
  console.log('Current library:', config.library);
</script>
```

### useIconExists

Check if an icon exists:

```vue
<script setup>
  import { useIconExists } from '@haspen/ui';

  const iconExists = useIconExists('sun');
  console.log('Sun icon exists:', iconExists.value);
</script>
```

### createIconRegistry

Dynamically manage custom icons:

```vue
<script setup>
  import { createIconRegistry } from '@haspen/ui';

  const registry = createIconRegistry();

  // Register icons
  registry.register('custom-icon', CustomIconComponent);

  // Use in provider
  const config = createCustomIconsConfig(registry.getAll());
</script>
```

## Icon Name Mapping

Convert between library naming conventions:

```javascript
import { mapIconName } from '@haspen/ui';

// Convert Heroicons to Lucide
const lucideName = mapIconName('chevron-up', 'heroicons', 'lucide');
// Result: 'ChevronUp'

// Convert Lucide to Heroicons
const heroName = mapIconName('ChevronUp', 'lucide', 'heroicons');
// Result: 'chevron-up'
```

## TypeScript Support

Full type safety with interfaces:

```typescript
import type { IconConfig, IconLibrary } from '@haspen/ui';

const config: IconConfig = {
  library: 'heroicons',
  icons: {},
  prefix: 'icon',
};

const library: IconLibrary = 'lucide';
```

## Accessibility

All icons include proper accessibility support:

```vue
<template>
  <!-- Decorative icon (default) -->
  <Icon name="sun" aria-hidden="true" />

  <!-- Semantic icon with label -->
  <Icon name="search" :aria-hidden="false" aria-label="Search" />
</template>
```

## Performance

- **Tree Shaking**: Only bundles icons you use
- **Dynamic Imports**: External libraries loaded on-demand
- **Provider Pattern**: Configuration shared across components
- **Minimal Runtime**: Type-only imports where possible

## Migration from Individual Icons

Existing code continues to work:

```vue
<!-- Old approach (still works) -->
<SunIcon :size="24" />
<MoonIcon :size="24" />

<!-- New configurable approach -->
<Icon name="sun" :size="24" />
<Icon name="moon" :size="24" />
```

## Best Practices

1. **Use IconProvider at app root** for global configuration
2. **Prefer type-based configurations** for better tree shaking
3. **Use hybrid configs** for gradual migration
4. **Register custom icons** at the provider level
5. **Include accessibility labels** for semantic icons
6. **Use icon mappings** when switching libraries

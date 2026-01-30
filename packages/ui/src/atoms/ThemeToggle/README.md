# ThemeToggle

A beautiful, accessible theme toggle component that provides smooth switching between light and dark
themes.

## Features

- **Multiple Variants**: Choose from default, outline, and ghost styles
- **Three Sizes**: Small (sm), medium (md), and large (lg) options
- **Smooth Animations**: Beautiful transitions with icon morphing and thumb sliding
- **Accessibility First**: Comprehensive ARIA support and keyboard navigation
- **Theme Integration**: Seamless integration with ThemeProvider system
- **Loading States**: Visual feedback during theme transitions
- **Customizable**: Optional labels, custom ARIA descriptions, and variant styling
- **Responsive**: Adapts to different contexts and backgrounds

## Usage

### Basic Usage

```vue
<template>
  <ThemeProvider>
    <ThemeToggle />
    <!-- Your app content -->
  </ThemeProvider>
</template>

<script setup>
  import { ThemeProvider } from '@haspen/ui';
  import { ThemeToggle } from '@haspen/ui';
</script>
```

### With Labels

```vue
<template>
  <ThemeToggle show-label light-label="Light Theme" dark-label="Dark Theme" />
</template>
```

### Different Variants and Sizes

```vue
<template>
  <div>
    <!-- Default variant -->
    <ThemeToggle />

    <!-- Outline variant -->
    <ThemeToggle variant="outline" />

    <!-- Ghost variant -->
    <ThemeToggle variant="ghost" />

    <!-- Different sizes -->
    <ThemeToggle size="sm" />
    <ThemeToggle size="md" />
    <ThemeToggle size="lg" />
  </div>
</template>
```

### Event Handling

```vue
<template>
  <ThemeToggle @toggle="handleToggle" @change="handleThemeChange" />
</template>

<script setup>
  function handleToggle(isDark: boolean) {
    console.log('Theme toggled. Is dark:', isDark);
  }

  function handleThemeChange(mode: 'light' | 'dark') {
    console.log('Theme changed to:', mode);
  }
</script>
```

## Props

| Prop         | Type                                | Default        | Description                               |
| ------------ | ----------------------------------- | -------------- | ----------------------------------------- |
| `variant`    | `'default' \| 'outline' \| 'ghost'` | `'default'`    | Visual variant of the toggle              |
| `size`       | `'sm' \| 'md' \| 'lg'`              | `'md'`         | Size of the toggle component              |
| `showLabel`  | `boolean`                           | `false`        | Whether to show text label next to toggle |
| `disabled`   | `boolean`                           | `false`        | Whether the toggle is disabled            |
| `lightLabel` | `string`                            | `'Light mode'` | Label text for light mode                 |
| `darkLabel`  | `string`                            | `'Dark mode'`  | Label text for dark mode                  |
| `ariaLabel`  | `string`                            | `undefined`    | Custom ARIA label for accessibility       |

## Events

| Event    | Payload                     | Description                     |
| -------- | --------------------------- | ------------------------------- |
| `toggle` | `(isDark: boolean)`         | Emitted when toggle is clicked  |
| `change` | `(mode: 'light' \| 'dark')` | Emitted when theme mode changes |

## Styling

The component uses CSS custom properties and SCSS for styling. Key style features:

### Theme Adaptation

- Automatically adapts colors based on current theme
- Proper contrast ratios for accessibility
- Smooth transitions between theme states

### Variants

**Default**: Standard styling with colored backgrounds **Outline**: Transparent background with
colored borders  
**Ghost**: Subtle styling with minimal visual weight

### Size Scaling

- **Small**: 44×24px track, 20px thumb
- **Medium**: 52×28px track, 24px thumb
- **Large**: 60×32px track, 28px thumb

### Animation Details

- **Thumb Movement**: 300ms cubic-bezier easing
- **Icon Transitions**: 150ms fade with scaling
- **Loading Spinner**: Smooth rotation animation
- **Hover Effects**: Subtle background color changes

## Accessibility

### ARIA Support

- `aria-pressed` indicates current theme state
- Dynamic `aria-label` describes current action
- `role="switch"` behavior (implicit via button with aria-pressed)

### Keyboard Navigation

- **Tab**: Focus the toggle
- **Space/Enter**: Activate the toggle
- **Escape**: Remove focus (browser default)

### Screen Reader Support

- Announces current state and available action
- Provides feedback when theme changes
- Respects user's label preferences

### Reduced Motion

- Disables animations when `prefers-reduced-motion: reduce`
- Maintains functionality while respecting accessibility preferences

### High Contrast Mode

- Increases border thickness for better visibility
- Adds explicit borders to thumb element
- Maintains proper contrast ratios

## Integration with ThemeProvider

The ThemeToggle component integrates seamlessly with the ThemeProvider:

1. **State Synchronization**: Automatically reflects current theme state
2. **Mode Switching**: Calls `toggleMode()` from theme context
3. **Persistence**: Changes are automatically saved to localStorage
4. **System Integration**: Respects system theme preferences in auto mode

### Theme Context Usage

```typescript
// Internal implementation uses:
const { isDark, toggleMode } = useTheme();
```

## Customization

### Custom Styling

```scss
// Override component styles
.theme-toggle {
  // Custom track styling
  .theme-toggle__track {
    background: your-custom-color;
  }

  // Custom thumb styling
  .theme-toggle__thumb {
    box-shadow: your-custom-shadow;
  }
}
```

### Custom Icons

The component uses built-in SunIcon and MoonIcon components. To use custom icons:

```vue
<template>
  <ThemeToggle>
    <template #sun-icon>
      <YourCustomSunIcon />
    </template>
    <template #moon-icon>
      <YourCustomMoonIcon />
    </template>
  </ThemeToggle>
</template>
```

## Browser Support

- **Modern Browsers**: Full feature support
- **CSS Custom Properties**: Required for theming
- **CSS Transitions**: Enhanced experience, degrades gracefully
- **Local Storage**: Theme persistence, fails silently if unavailable

## Testing

The component includes comprehensive tests covering:

- **Rendering**: All props, variants, and states
- **Interaction**: Click handling, keyboard navigation
- **Theme Integration**: Mode switching, state synchronization
- **Accessibility**: ARIA attributes, screen reader compatibility
- **Events**: Proper emission of toggle and change events

Run tests with:

```bash
npm test ThemeToggle.test.ts
```

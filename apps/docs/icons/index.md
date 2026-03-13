# Icons

Grundtone ships icons as a separate opt-in package `@grundtone/icons`. The icon components in each framework are **generic** — they accept any icon library that follows the `IconDefinition` contract, not just `@grundtone/icons`.

## Install

::: code-group
```bash [npm]
npm install @grundtone/icons
```
```bash [pnpm]
pnpm add @grundtone/icons
```
:::

## Icon Gallery

Click an icon to copy its name.

<IconGallery />

## IconDefinition Contract

Any icon library compatible with Grundtone must provide objects matching this interface:

```ts
interface IconDefinition {
  /** SVG inner content (paths, circles, etc.) */
  body: string;
  /** SVG viewBox attribute */
  viewBox: string;
  /** Optional category for grouping */
  category?: string;
}
```

The `@grundtone/icons` package exports a typed registry of these definitions. You can also build your own registry or pass icon definitions directly.

## Size Presets

All icon components share these size presets:

| Size | Dimension |
| --- | --- |
| `xs` | 12px (0.75rem) |
| `sm` | 16px (1rem) |
| `md` | 20px (1.25rem) |
| `lg` | 24px (1.5rem) — default |
| `xl` | 32px (2rem) |
| `2xl` | 40px (2.5rem) |

## Color Inheritance

Icons use `currentColor`, so they inherit the parent's text color. Each icon component also accepts a `color` prop for explicit overrides.

## Next Steps

- [Custom Icons](/icons/custom-icons) — add your own SVGs
- [Vue Component](/icons/vue) — `<GTIcon>` usage in Vue / Nuxt
- [React Native Component](/icons/react-native) — `<GTIcon>` usage in React Native
- [CSS Utilities](/icons/css) — plain HTML/CSS icon classes

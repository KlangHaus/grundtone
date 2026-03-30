# Custom Icons

## Adding to @grundtone/icons

1. Add a 24×24 SVG file to a category folder in `packages/icons/src/icons/svg/{category}/`
2. Run `pnpm generate:icons` to regenerate the typed registry
3. Use it immediately: `<GTIcon name="your-icon" />`

Icons are organized by category using subdirectories:

```
packages/icons/src/icons/svg/
  action/
    check.svg
    close.svg
    search.svg
  navigation/
    arrow-left.svg
    arrow-right.svg
    menu.svg
  your-category/
    your-icon.svg
```

SVG files placed directly in `svg/` (without a subdirectory) get the `general` category.

### SVG Conventions

- ViewBox: `0 0 24 24`
- Stroke-based: `fill="none" stroke="currentColor" stroke-width="1.5"`
- Kebab-case filenames: `my-icon.svg` → `name="my-icon"`

### Using Heroicons

Browse the full set at [heroicons.com](https://heroicons.com), then drop the SVGs you need into the appropriate category folder:

1. Download the **outline** variant SVG from [heroicons.com](https://heroicons.com)
2. Save it to `packages/icons/src/icons/svg/{category}/` (e.g. `action/heart.svg`)
3. Run `pnpm generate:icons`
4. Use it: `<GTIcon name="heart" />`

Heroicons use the same 24×24 grid with `currentColor` strokes, so they work out of the box. Only the icons you add are included in your bundle.

## Using a Custom Icon Library

The icon components are generic — you don't have to use `@grundtone/icons` at all. Any object matching the `IconDefinition` interface works.

### Direct icon prop

Pass an `IconDefinition` object directly — no registry needed:

::: code-group
```vue [Vue]
<GTIcon :icon="{ body: '<path d=\"M5 13l4 4L19 7\"/>', viewBox: '0 0 24 24' }" />
```
```tsx [React Native]
<GTIcon icon={{ body: '<path d="M5 13l4 4L19 7"/>', viewBox: '0 0 24 24' }} />
```
:::

### Custom registry

Build your own registry and provide it to the icon components:

::: code-group
```ts [Vue]
import type { IconRegistry } from '@grundtone/core';
import { GT_ICON_REGISTRY_KEY } from '@grundtone/vue';

const myIcons: IconRegistry = {
  star: { body: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87..."/>', viewBox: '0 0 24 24' },
  heart: { body: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67..."/>', viewBox: '0 0 24 24' },
};

app.provide(GT_ICON_REGISTRY_KEY, myIcons);
```
```tsx [React Native]
import type { IconRegistry } from '@grundtone/core';
import { IconRegistryProvider } from '@grundtone/react-native';

const myIcons: IconRegistry = {
  star: { body: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87..."/>', viewBox: '0 0 24 24' },
  heart: { body: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67..."/>', viewBox: '0 0 24 24' },
};

<IconRegistryProvider registry={myIcons}>
  <App />
</IconRegistryProvider>
```
:::

Then use names as usual:

```vue
<GTIcon name="star" />
<GTIcon name="heart" size="xl" />
```

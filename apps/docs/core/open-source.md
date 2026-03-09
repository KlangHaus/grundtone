# Open Source & Self-Hosting

Grundtone is **MIT licensed** and fully open source. You can use it as-is, fork it, self-host it on
your own package registry, or customize the design to match your brand.

## What You Can Do

| Option                 | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Use from npm**       | Install packages from npm and use default or customized themes                  |
| **Fork the repo**      | Copy the codebase and adapt it to your needs                                    |
| **Self-host packages** | Publish to your own npm registry (e.g. Verdaccio, GitHub Packages, Artifactory) |
| **Customize design**   | Override colors, spacing, typography via themes and tokens                      |

## License (MIT)

```
MIT License – use, modify, distribute, and use commercially.
No warranty. Keep attribution if you redistribute.
```

The source code is on [GitHub](https://github.com/grundtone/grundtone).

## Self-Hosting Packages

### Option 1: Fork and publish to npm

1. Fork the [repository](https://github.com/grundtone/grundtone)
2. Update `package.json` names if desired (e.g. `@your-org/design-tokens`)
3. Configure your npm registry and publish:

```bash
pnpm build
pnpm changeset version
pnpm release
```

### Option 2: Use a private registry

Point your project to your own registry:

```bash
# .npmrc
registry=https://your-registry.example.com/
@your-org:registry=https://your-registry.example.com/
```

Then install as usual:

```bash
pnpm add @your-org/design-tokens @your-org/vue
```

### Option 3: Use workspace packages (monorepo)

If your app lives in the same monorepo as Grundtone, use workspace protocol:

```json
{
  "dependencies": {
    "@grundtone/vue": "workspace:*",
    "@grundtone/core": "workspace:*"
  }
}
```

## Customizing the Design

You do **not** need to fork to change the design. Use themes.

### Theme customization (no fork needed)

Configure your brand via `createTheme()`:

```ts
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    primary: '#your-brand-color',
    primaryLight: '#your-brand-light',
    // Override any semantic color
  },
  dark: {
    primary: '#your-dark-mode-color',
    // ...
  },
});
```

Use this theme in your app (Vue, Nuxt, or React Native) – see
[Theme Configuration](/guide/theme-configuration) for how to apply it per package.

### Deeper customization (fork)

To change spacing, typography, breakpoints, or component structure:

1. **Design tokens** – Edit `packages/design-tokens/src/index.scss` and
   `packages/design-tokens/src/core/`
2. **Default theme** – Edit `packages/core/src/theme-preset.ts`
3. **Components** – Edit Vue components in `packages/vue/src/`

Rebuild and publish your fork to your registry.

## Summary

- **MIT licensed** – use it freely
- **Theme API** – customize colors without forking
- **Fork and self-host** – full control over design and distribution
- **Private registries** – host on your own npm registry

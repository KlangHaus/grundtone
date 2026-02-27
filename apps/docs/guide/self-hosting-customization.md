# Self-Hosting & Customization

Grundtone is **open source** (MIT). You can use it as-is from npm, fork the repo, self-host on your
own registry, or adapt it fully to your brand and needs.

## Open Source

- **Source**: [github.com/allanasp/grundtone](https://github.com/allanasp/grundtone)
- **License**: MIT (see each package’s `package.json`)
- **Use**: Install from npm, fork, vend, or republish under your own scope.

## How to Host & Consume

### Option 1: Use from npm (default)

Install published packages from the public registry:

```bash
pnpm add @grundtone/core @grundtone/vue
# or @grundtone/nuxt, @grundtone/react-native
```

No hosting needed. Keep packages updated from the upstream npm feed.

### Option 2: Fork and publish to your private registry

1. **Fork** the repo on GitHub (or clone to your org).
2. **Optional rebrand**: Rename packages (e.g. `@your-org/core`, `@your-org/vue`) via package.json
   `name` and workspace references.
3. **Build**:

   ```bash
   pnpm install
   pnpm build
   ```

4. **Publish** to your npm registry (Verdaccio, Artifactory, GitHub Packages, etc.):

   ```bash
   # Configure registry in .npmrc or publishConfig
   pnpm changeset
   pnpm version-packages
   pnpm release
   ```

5. Point your apps to your registry and install `@your-org/core`, `@your-org/vue`, etc.

### Option 3: Git or path dependency (no separate registry)

Use Grundtone directly from a git repo or local path:

```json
{
  "dependencies": {
    "@grundtone/core": "github:allanasp/grundtone#develop",
    "@grundtone/vue": "file:../grundtone/packages/vue"
  }
}
```

Useful for internal monorepos or experiments. Run `pnpm build` in the Grundtone repo before
depending on it.

### Option 4: Monorepo workspace

Add Grundtone as a workspace package:

```json
// pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
  - "path/to/grundtone/packages/*"
```

Then `"@grundtone/core": "workspace:*"` in your app’s `package.json`. Build the design system first
(`pnpm build` in the Grundtone root) before building your apps.

## Customizing to Your Needs

### Theme (brand colors)

Configure colors with `createTheme()` – no fork required:

```typescript
const { light, dark } = createTheme({
  light: { primary: '#your-brand', text: '#1a1a1a' },
  dark: { primary: '#your-brand-light', text: '#f5f5f5' },
});
```

See [Theme Configuration](/guide/theme-configuration).

### Design tokens (spacing, typography, breakpoints)

For web, design tokens live in `@grundtone/design-tokens`. To change spacing, typography, or
breakpoints:

1. **Fork** the repo and edit `packages/design-tokens/src/`:
   - `_spacing.scss`, `_typography.scss`, `_breakpoints.scss`
2. **Rebuild**: `pnpm build --filter=@grundtone/design-tokens`
3. **Publish** or use as workspace dependency.

If you only need small overrides, you can layer your own CSS/SCSS after importing the base tokens.

### Components (Vue, React Native)

To change component behavior or styles:

1. **Fork** `packages/vue` or `packages/react-native`
2. Edit components under `src/`
3. Run tests and build
4. Publish to your registry or use as workspace package

### Full rebrand (scope, names, docs)

For a fully custom design system:

1. Fork the repo
2. Rename packages (`@grundtone/*` → `@your-org/*`) in all `package.json` files and imports
3. Update `apps/docs` and VitePress config for your branding
4. Build and publish: `pnpm build` then `pnpm release` (point to your registry)
5. Host the docs site or deploy `apps/docs` to your domain

## Build & Release Commands

| Command                 | Purpose                               |
| ----------------------- | ------------------------------------- |
| `pnpm install`          | Install dependencies                  |
| `pnpm build`            | Build all packages                    |
| `pnpm build --filter=…` | Build a single package                |
| `pnpm changeset`        | Create a changeset for version bumps  |
| `pnpm version-packages` | Bump versions and update changelogs   |
| `pnpm release`          | Build and publish to npm              |
| `pnpm release:snapshot` | Publish snapshot versions for testing |
| `pnpm docs:dev`         | Run docs dev server                   |
| `pnpm docs:build`       | Build static docs site                |

## Summary

| Scenario                     | Approach                                          |
| ---------------------------- | ------------------------------------------------- |
| Use design system as-is      | Install from npm, configure `createTheme()`       |
| Private / air-gapped hosting | Fork, build, publish to private registry          |
| Own monorepo                 | Add as workspace package or path dependency       |
| Custom tokens / components   | Fork and edit design-tokens, vue, or react-native |
| Full rebrand                 | Fork, rename scope, update docs, publish          |

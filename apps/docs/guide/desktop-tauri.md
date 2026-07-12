# Desktop (Tauri)

grundtone works in [Tauri](https://tauri.app) apps out of the box — a Tauri
UI is a webview, and grundtone's Vue surface is plain web. This page collects
the verified patterns for both sides of a Tauri app: the webview (TypeScript)
and the native shell (Rust).

## Webview: use grundtone as usual

No special setup. The proven pattern from production apps:

**Vite + Vue** (no Nuxt):

```ts
// main.ts
import '@grundtone/vue/css';
import { GT_ICON_REGISTRY_KEY } from '@grundtone/vue';
import { iconRegistry } from '@grundtone/icons';
```

```vue
<!-- App.vue -->
<script setup>
  import { GrundtoneThemeProvider } from '@grundtone/vue';
</script>

<template>
  <GrundtoneThemeProvider>
    <!-- your app -->
  </GrundtoneThemeProvider>
</template>
```

**Nuxt**: use `@grundtone/nuxt` normally, build with `ssr: false` +
`nuxi generate`, and point `tauri.conf.json`'s `frontendDist` at
`.output/public`. Dynamic `[id]` routes are covered by the generated SPA
fallback shells.

`@grundtone/core` has no DOM dependencies and the design system has no
remote font imports, so nothing breaks offline.

### Content-Security-Policy

If you harden your app's CSP (recommended — the Tauri default is `null`),
grundtone's static usage needs nothing beyond your own app's needs. Only the
**runtime CDN client** (`@grundtone/saas-client`, tokens published from
Studio) makes network requests — allow its origin:

```json
{
  "app": {
    "security": {
      "csp": "default-src 'self'; connect-src 'self' https://cdn.grundtone.com; style-src 'self' 'unsafe-inline'"
    }
  }
}
```

## Native shell: the `grundtone-tokens` crate

Tokens stop at the webview boundary — the native window, tray and menus know
nothing about your theme. The `grundtone-tokens` crate closes that gap: the
same token source that themes Vue/React Native/email, code-generated into
typed Rust constants.

```toml
# src-tauri/Cargo.toml
[dependencies]
grundtone-tokens = { git = "https://github.com/KlangHaus/grundtone", branch = "develop" }
```

### Kill the white flash

The classic Tauri papercut: the window paints white before the webview loads,
which flashes hard in dark mode. Set the window's background from the token:

```rust
use grundtone_tokens::{Mode, Rgb};

let bg = Rgb::parse(Mode::Dark.colors().background).unwrap();
// with tauri 2:
// WebviewWindowBuilder::new(&app, "main", WebviewUrl::default())
//     .background_color(tauri::webview::Color(bg.r, bg.g, bg.b, 255))
//     .build()?;
```

All 39 semantic color slots are available on `LIGHT` / `DARK` as `#rrggbb`
strings (`primary`, `surface_raised`, `text_inverse`, …), plus `SPACING_*` /
`RADIUS_*` constants in px.

### Runtime brands (Studio)

With the `serde` feature, the shell can theme its native chrome from a
Studio-published per-tenant brand instead of the compiled-in defaults:

```rust
use grundtone_tokens::{Mode, RuntimeColors};

let brand: RuntimeColors = serde_json::from_str(&tokens_json)?;
let bg = brand.with_defaults("background", Mode::Dark).unwrap();
```

The JSON shape is the same camelCase color object `createTheme` presets use.

### Keeping Rust in sync with tokens

`packages/tokens-rust/src/generated.rs` is generated from `@grundtone/core`
by `pnpm gen:rust-tokens`. CI fails if the file drifts from the TypeScript
source, so a token change is always a one-commit, all-surfaces change — the
same pipeline idea as the CDN distribution.

# Migrating to grundtone 3.0.0

`develop` became the published line. The 2.x line was cut from `main` and never flowed back, so the
two had drifted apart; 3.0.0 accepts `develop` as the source of truth and declares what that costs.

Every removal below is declared in [`.api-removals.json`](../.api-removals.json) with the reason
beside it — the list is what we knowingly took away, not an inventory compiled afterwards.

## 1. The dependency range does not carry you across

`^2.23.3` does **not** match `3.0.0`. `pnpm update` will do nothing and report success. Change the
range explicitly in every `package.json` that names a grundtone package:

```diff
-  "@grundtone/vue": "^2.23.3"
+  "@grundtone/vue": "^3.0.0"
```

## 2. Removed exports (20 from `@grundtone/vue`)

| `CreateThemeOverrides` | `FooterNavItem` | `FooterProps` | | `GTFooter` | `GTHeader` | `GTMasonry`
| | `HeaderNavItem` | `HeaderProps` | `MasonryProps` | | `Theme` | `ThemeColors` | `ThemeConfig` | |
`ThemeMode` | `ThemeRadius` | `ThemeShadows` | | `ThemeSpacing` | `ThemeTransitions` |
`ThemeTypography` | | `createTheme` | `iconRegistry` | |

Nineteen of the twenty never existed in `develop` — they were part of the `main` line that was never
reconciled. If you import one, it has no replacement in 3.0.0; the components behind `GTHeader`,
`GTFooter` and `GTMasonry` are gone rather than renamed.

`createTheme` and `iconRegistry` moved out of `@grundtone/vue`; import them from `@grundtone/core`
and `@grundtone/icons` respectively.

## 3. Removed entry points

| package                    | entry point       |
| -------------------------- | ----------------- |
| `@grundtone/vue`           | `./css/utilities` |
| `@grundtone/vue`           | `./package.json`  |
| `@grundtone/design-system` | `./css/utilities` |
| `@grundtone/design-system` | `./package.json`  |

`./css/utilities` pointed at a `utilities.css` the current build does not produce. If you imported
it, the utility classes are in the main stylesheet — `@grundtone/vue/css`.

## 4. 🔴 Files moved inside the package

**This one does not break a normal import, and `^` will not warn you about it.** The export map was
updated, so `import '@grundtone/vue'` and `require('@grundtone/vue')` both resolve correctly. What
breaks is any **hardcoded deep path** — most likely a CDN URL.

|            | 2.23.3                  | 3.0.0                |
| ---------- | ----------------------- | -------------------- |
| types      | `dist/types/index.d.ts` | `dist/index.d.ts`    |
| UMD bundle | `dist/index.umd.js`     | `dist/index.umd.cjs` |

A `<script src=".../@grundtone/vue/dist/index.umd.js">` returns 404 against 3.0.0. Use the package
root and let the export map resolve it, or update the path.

Found by [backstage] while unpacking the tarball to count exports — **not** by our API-loss gate,
which compares export-map keys and type names. A key that survives while its target moves is
invisible to it, and deep paths bypass the export map by definition.

## 5. What did not change

`./css`, `./scss`, `./scss/lib`, `./scss/breakpoints`, `./scss/colors` and `./scss/color-palette`
all resolve as before. `@grundtone/react-native` is untouched at 2.22.0 and is not part of this
release.

## Checking your own code

The three internal consumers needed no code changes — only the version string. To confirm the same
for yours, grep for the removed names above before upgrading; an absence is cheaper to verify than a
broken build is to diagnose.

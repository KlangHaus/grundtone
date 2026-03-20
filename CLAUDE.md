# Grundtone Design System — Monorepo

## Architecture

Turborepo + pnpm workspaces monorepo. The design system is **HTML + CSS first** — all framework
implementations are layers on top.

```
packages/
  core/           → Config, types, theme, branding, icon registry
  design-system/  → SCSS tokens, utilities, elements, components → CSS + vanilla JS behaviors
  vue/            → Vue 3 components (atomic design: atoms/molecules)
  nuxt/           → Nuxt 3 module (auto-imports components + composables)
  react-native/   → RN theme provider, shadows, branding
  utils/          → Validation, formatting, ID generation
  icons/          → SVG icon registry (auto-generated)
apps/
  docs/           → VitePress documentation (web/ = design system, vue/ = Vue API)
  playground/     → vue, nuxt, html-test, expo test apps
```

## Design Token Chain

`core (TS)` → `generate:tokens` → `design-system (SCSS)` → `CSS custom properties` → consumed by
Vue/Nuxt/HTML

## Configurable Prefix System

```ts
defineGrundtoneConfig({ prefix: 'GT' }); // default
getClassPrefix(); // → 'gt'
```

- JS: `getClassPrefix()` for dynamic class binding
- SCSS: `$prefix: 'gt' !default;` → `.#{$prefix}-btn`
- All components use this — never hardcode `gt-`

## Three-Layer Design

1. **Design system** — SCSS tokens, CSS custom properties, BEM classes (the foundation)
2. **Framework components** — Vue/RN wrap design-system classes with props/events/slots
3. **Per-instance overrides** — props, inline styles

## Key Conventions

- **BEM** naming: `.component`, `.component__element`, `.component--modifier`
- **Atomic design**: atoms (Input, Button, Badge) vs molecules (Card, Accordion, Alert)
- **SCSS tokens** via `tokens.*` namespace (injected via Vite `additionalData`)
- **CSS custom properties** for all colors, spacing, typography, shadows, radii
- **Accessibility first** — ARIA attributes, roles, labels, keyboard navigation
- **No backward compatibility** — delete old code, don't deprecate

## Build Tools

| Package       | Tool                             |
| ------------- | -------------------------------- |
| core          | tsup                             |
| design-system | tsup (JS behaviors) + sass (CSS) |
| vue           | Vite (library mode)              |
| nuxt          | unbuild                          |
| docs          | VitePress                        |

## Component Checklist

When creating a new component, ALL of these must be done:

1. **SCSS** (`packages/design-system/src/components/_name.scss`) — BEM, CSS custom properties,
   forward from `_index.scss`
2. **Vue component** (`packages/vue/src/atoms/Name/`) — types.ts, Name.vue, index.ts, Name.test.ts,
   demo.vue
3. **Exports** (`packages/vue/src/index.ts`) — component + types
4. **Web docs** (`apps/docs/web/c-name.md`) — classes, CodePreview, HTML examples, accessibility
5. **Vue docs** (`apps/docs/vue/name.md`) — demo, props table, events, accessibility, CSS classes
6. **CodePreview** (`apps/docs/.vitepress/theme/component-examples.ts`)
7. **Demo registration** (`apps/docs/.vitepress/theme/index.ts`)
8. **Sidebar** (`apps/docs/.vitepress/config.ts`) — both web and vue sections
9. **Playgrounds** — html-test, vue, nuxt (expo only for RN components)
10. **Changeset** — `pnpm changeset` for affected packages

See `apps/docs/` for full docs structure. See any existing atom (e.g.
`packages/vue/src/atoms/Input/`) for reference implementation.

## Test Commands

```bash
pnpm --filter @grundtone/vue test          # Vue component tests
pnpm --filter @grundtone/utils test        # Validator/utility tests
pnpm --filter @grundtone/design-system build  # Build CSS + behaviors
pnpm --filter @grundtone/vue build         # Build Vue library
```

# CSS bundle size

`@grundtone/vue` ships three CSS entry points so you can pick the tradeoff between convenience and bundle size. No extra tooling, no build configuration, no safelists — just change which file you import.

| Entry point | Contents | Size | When to use |
|-------------|----------|------|-------------|
| `@grundtone/vue/css` | Every component, element and utility | ~335 KB (46 KB gzip) | Prototyping, dashboards, internal tools |
| `@grundtone/vue/css/minimal` | ~20 most-used components | ~27 KB (4.5 KB gzip) | Production sites that use common components |
| `@grundtone/vue/css/components/<name>` | A single component | 0.2–5 KB each | Production sites with exact control |

All three are standard ES module imports with TypeScript declarations — no `declare module` needed in your app.

## 1. Default — everything included

The simplest setup. One import, all components work.

```ts
// main.ts
import '@grundtone/vue/css';
```

**Size**: 334.73 KB (46.36 KB gzip)

Use this when bundle size isn't critical (admin dashboards, internal tools) or while prototyping. You can always swap to a smaller entry point later.

## 2. Minimal — the 80% bundle

A curated bundle containing the ~20 components most apps need. One import, much smaller bundle.

```ts
// main.ts
import '@grundtone/vue/css/minimal';
```

**Size**: 27 KB (4.5 KB gzip) — **92% smaller than default**

### What's included

**Elements**: `box-sizing`, `body`, `headings`, `button`, `input` (reset), `list`, `hr`

**Form components**: `input`, `textarea`, `select`, `choice`, `fieldset`, `help-text`, `error-text`

**Layout**: `card`, `header`, `footer`, `breadcrumb`

**Feedback**: `alert`, `badge`, `tag`, `spinner`, `details`

### Adding extras

If you need a component not in the minimal bundle, import it alongside:

```ts
import '@grundtone/vue/css/minimal';
import '@grundtone/vue/css/components/accordion';
import '@grundtone/vue/css/components/carousel';
```

This is often the right balance for production sites — start with minimal, add exactly what you need.

## 3. Cherry-pick — one component at a time

Full control. Import each component's CSS explicitly, get the smallest possible bundle.

```ts
// main.ts
import '@grundtone/vue/css/components/button';
import '@grundtone/vue/css/components/input';
import '@grundtone/vue/css/components/card';
import '@grundtone/vue/css/components/alert';
// ... only what you actually use
```

**Size**: 0.2–5 KB per component. A typical marketing site with 10-15 components comes in around **20–30 KB (4–5 KB gzip)**.

### Available components

All components from [@grundtone/vue](/vue/) are available as individual CSS imports using their kebab-case name:

```
accordion, alert, anchor-links, autocomplete, back-link, back-to-top,
badge, body-text, breadcrumb, card, carousel, chart, checkbox,
cookie-message, date-input, date-picker, details, error-page, error-text,
file-upload, footer, header, help-text, input, modal, otp-input,
overflow-menu, password-input, search-field, select, skip-link, slider,
spinner, stepper, summary-list, table, tabs, tag, textarea, toast,
toggle, tooltip
```

### Elements

Base HTML element styles (button reset, headings, lists, etc.) are available under `elements/`:

```ts
import '@grundtone/vue/css/elements/button';
import '@grundtone/vue/css/elements/headings';
import '@grundtone/vue/css/elements/body';
```

The `button` element is required if you use `<GTButton>` — it provides the base reset and variant classes that the component builds on.

## Real-world example

Measured on [naturterapi.dk](https://naturterapi.dk), a marketing site using 15 Grundtone components (accordion, alert, back-to-top, badge, breadcrumb, button, card, carousel, footer, header, input, summary-list, textarea, help-text, error-text):

| Setup | CSS size | gzip | Δ vs default |
|-------|---------|------|---------------|
| Default | 341 KB | 47.50 KB | — |
| Minimal | 30.63 KB | 4.91 KB | **−91%** / **−90%** |
| Minimal + 4 extras | 40.84 KB | 6.38 KB | **−88%** / **−87%** |
| Cherry-pick (15 components) | 30.23 KB | 5.07 KB | **−91%** / **−89%** |

Cherry-pick and minimal produce nearly identical bundles because both ship only the styles you reference. Minimal is easier to maintain (one import), cherry-pick is easier to audit (explicit list).

## How this works

All three entry points are plain CSS files shipped in `@grundtone/vue/dist/`. They contain only class selectors (`.button`, `.card__header`, etc.) and `var(--*)` references to design tokens.

The design tokens themselves (`--color-primary`, `--space-md`, etc.) are applied at runtime by `applyThemeToDOM(theme)` in your app entry — they're not part of any of the CSS bundles. That's why even the tiniest cherry-picked bundle renders with correct colours and spacing.

```ts
// main.ts
import { applyThemeToDOM } from '@grundtone/vue';
import { theme } from './theme';
import '@grundtone/vue/css/components/button';
import '@grundtone/vue/css/components/card';

applyThemeToDOM(theme.light); // injects all CSS custom properties
```

No build step, no loader, no plugin required.

## Why not PurgeCSS or UnCSS?

These tools scan your templates for class name *literals* and strip unused selectors. That works for Tailwind, where every class appears verbatim in your HTML, but it's fundamentally incompatible with how Grundtone components are written.

Grundtone supports a **configurable class prefix** via `defineGrundtoneConfig` so you can rebrand the library (e.g., `button` → `gt-button` → `acme-button`) without forking components. To make the prefix work at runtime, every component composes its classes dynamically:

```vue
<script setup>
const p = computed(() => getClassPrefix());
const base = computed(() => `${p.value}-button`);
</script>

<template>
  <button :class="[base, `${base}--${variant}`]">
</template>
```

When Vite compiles this, the output becomes:

```js
h('button', { class: [base.value, `${base.value}--${props.variant}`] })
```

Notice that the strings `"button"` and `"button--primary"` never appear as literals in the compiled JavaScript — they're computed at render time from `base.value` + `props.variant`. PurgeCSS's scanner can't find what isn't there, so it strips every Grundtone class as "unused" and your components render unstyled.

You could in theory safelist every possible Grundtone class with regex, but:

- You'd have to maintain a list of every component × every modifier combination
- Any new component or variant added in a Grundtone update would silently break
- At that point you've recreated what the per-component CSS entry points already give you, with more risk

Per-component CSS imports solve the same problem deterministically: you explicitly list what you use, tree-shaking is guaranteed, and you can't accidentally strip a base class.

## Measuring your own bundle

Vite prints the final CSS size in its build output:

```bash
vite build
# dist/assets/index-XXXX.css  30.23 kB │ gzip: 5.07 kB
```

Target numbers for a typical marketing site:

- **< 50 KB** ungzipped — acceptable baseline
- **< 30 KB** ungzipped — good
- **< 10 KB** gzipped — excellent

## See also

- [Installation](/vue/installation) — basic setup
- [Design system overview](/core/) — full list of tokens, utilities, and components

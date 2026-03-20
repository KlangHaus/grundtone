# @grundtone/design-system

Pure HTML + CSS design system. No JavaScript required (behaviors are optional). This is the
foundation — all framework implementations (Vue, Nuxt, RN) are layers on top.

## Installation

```bash
npm install @grundtone/design-system
```

```html
<link rel="stylesheet" href="node_modules/@grundtone/design-system/dist/index.css" />
```

## SCSS Token API

Available via `@use '@grundtone/design-system/src/lib.scss' as tokens;`

```scss
// Colors
tokens.color('primary')          // → var(--color-primary)
tokens.color('text-secondary')   // → var(--color-text-secondary)
tokens.color('error')            // → var(--color-error)

// Typography
tokens.font-size('base')         // xs | sm | base | lg | xl | 2xl | 3xl | 4xl | 5xl
tokens.font-weight('medium')     // thin | light | normal | medium | semibold | bold | extrabold
tokens.font-family('base')       // base | heading | mono
tokens.line-height('normal')     // none | tight | snug | normal | relaxed | loose

// Spacing
tokens.space('md')               // xs | sm | md | lg | xl | 2xl | 3xl | 4xl

// Border radius
tokens.radius('md')              // none | xs | sm | md | lg | xl | 2xl | 3xl | full

// Shadows
tokens.shadow('md')              // none | xs | sm | md | lg | xl | 2xl | inner

// Z-index
tokens.z-index('modal')          // dropdown | sticky | fixed | modal-backdrop | modal | popover | tooltip | toast

// Animation
tokens.duration('fast')          // fast | base | slow
tokens.ease('ease-out')          // ease | ease-in | ease-out | ease-in-out | linear
```

## Component CSS Classes

All components use BEM naming. Classes are unprefixed in SCSS source but some use configurable
prefix in Vue.

| Component  | Base Class    | Modifiers                                                                  |
| ---------- | ------------- | -------------------------------------------------------------------------- |
| Accordion  | `.accordion`  | `--bordered`, `--card`                                                     |
| Alert      | `.alert`      | `--info`, `--success`, `--warning`, `--error`                              |
| Badge      | `.badge`      | `--info`, `--success`, `--warning`, `--error`, `--neutral`, `--sm`, `--md` |
| Card       | `.card`       | `--bordered`, `--flat`, `--nav`, `--horizontal`                            |
| Date Input | `.date-input` | `__field`, `__label`, `__input--day`, `__input--month`, `__input--year`    |
| Details    | `.details`    | `--default`, `--subtle`, `--card`                                          |
| Input      | `.input`      | `--sm`, `--md`, `--lg`, `--error`, `--disabled`, `--readonly`              |
| Select     | `.select`     | `--sm`, `--md`, `--lg`, `--error`                                          |
| Skip Link  | `.skip-link`  | (visible on `:focus` only)                                                 |
| Tabs       | `.tabs`       | `--underline`, `--segment`, `--pill`                                       |
| Toggle     | `.toggle`     | `--sm`, `--md`, `--lg`, `--checked`                                        |

### Form field pattern

```html
<div class="input-field">
  <label class="input-label" for="name">Name <span class="input-label__required">*</span></label>
  <p class="input-help">Help text between label and input</p>
  <input id="name" class="input input--md" type="text" required aria-required="true" />
</div>
```

Error state: add `input--error` to input, replace `.input-help` with `.input-error[role="alert"]`.

## Vanilla JS Behaviors

Optional — for HTML-only usage without Vue.

```html
<script src="node_modules/@grundtone/design-system/dist/behaviors.umd.global.js"></script>
<script>
  Grundtone.initAll();
</script>
```

| Behavior      | Selector                   | What it does                                          |
| ------------- | -------------------------- | ----------------------------------------------------- |
| Accordion     | `.accordion`               | Expand/collapse items, toggle-all, keyboard nav       |
| Tabs          | `.tabs`                    | Tab switching, arrow key navigation, panel visibility |
| Toggle        | `[role="switch"]`          | Checked state, change event                           |
| Alert         | `.alert[data-dismissible]` | Close button, `gt:dismiss` event                      |
| CookieMessage | `.cookie-message`          | Accept/reject/settings, custom events                 |
| AnchorLinks   | `.anchor-links`            | Smooth scroll, active link highlight                  |

## Utility Classes

Responsive variants via breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

Categories: spacing, display, flex, grid, text alignment, text color, background, border, radius,
shadow, opacity, sizing, position, z-index, transitions, aspect-ratio, interactivity, typography,
containers, container queries.

## Build

```bash
pnpm --filter @grundtone/design-system build
# Outputs: dist/index.css, dist/behaviors.js, dist/behaviors.umd.global.js
```

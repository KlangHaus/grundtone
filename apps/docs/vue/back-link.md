# Back Link

Navigation link to return to a previous page or step. Arrow is rendered automatically via CSS.

## Demo

<BackLinkDemo />

## Installation

```vue
<script setup>
import { GTBackLink } from '@grundtone/vue';
</script>
```

In Nuxt, `GTBackLink` is auto-imported.

## When to use

Use in multi-step flows and pages with a clear parent. Do not use with breadcrumbs.

## Usage

```vue
<GTBackLink href="/blog" label="Alle indlæg" />
<GTBackLink href="/settings" label="Back to settings" />
```

No default label — you set the language. The ← arrow is added by CSS.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | Destination URL (required) |
| `label` | `string` | — | Link text (required) |

## Accessibility

- Standard `<a>` element
- Focus ring via `:focus-visible`
- Arrow animates on hover

See [Back Link (Design System)](/web/c-back-link) for full CSS reference.

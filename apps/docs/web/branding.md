# Branding

> For core configuration and logo variants see
> [Branding Configuration](/guide/branding-configuration).

## `brandingHeadTags()`

`brandingHeadTags()` returns a string of `<link>` tags for favicons and the Apple touch icon, ready
to inject into the document `<head>`:

```ts
import { brandingHeadTags, createBranding } from '@grundtone/design-tokens';

const branding = createBranding();
const tags = brandingHeadTags(branding);
```

Output:

```html
<link rel="icon" type="image/png" sizes="16x16" href="@grundtone/core/assets/logo-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="@grundtone/core/assets/logo-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="@grundtone/core/assets/logo-180x180.png" />
```

If called without arguments it uses `defaultBranding` automatically.

## Overriding Logos

Pass a custom branding config to generate tags with your own assets:

```ts
import { brandingHeadTags, createBranding } from '@grundtone/design-tokens';

const branding = createBranding({
  logos: {
    favicon16: '/img/favicon-16x16.png',
    favicon32: '/img/favicon-32x32.png',
    appleTouchIcon: '/img/apple-touch-icon.png',
  },
});

document.head.insertAdjacentHTML('beforeend', brandingHeadTags(branding));
```

In a Nuxt or Vite SSR setup you can call `brandingHeadTags()` server-side and include the result in
your HTML template.

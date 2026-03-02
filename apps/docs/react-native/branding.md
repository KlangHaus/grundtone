# Branding

> For core configuration and logo variants see
> [Branding Configuration](/guide/branding-configuration).

## `getLogoSource()`

`getLogoSource()` returns an `ImageSourcePropType` ready for use with React Native's `<Image>`
component:

```tsx
import { getLogoSource } from '@grundtone/react-native';

const logo = getLogoSource();

<Image source={logo} style={{ width: 120, height: 120 }} />;
```

When the primary logo matches the built-in default a static object is returned, avoiding unnecessary
re-renders.

## Overriding Logos

Pass a custom branding config to point at your own assets:

```tsx
import { getLogoSource, createBranding } from '@grundtone/react-native';

const branding = createBranding({
  logos: {
    primary: require('./assets/my-logo.png'),
  },
});

const logo = getLogoSource(branding);

<Image source={logo} style={{ width: 120, height: 120 }} />;
```

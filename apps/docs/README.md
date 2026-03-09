# @grundtone/docs

Documentation site for the [Grundtone](https://grundtone.com) design system, built with VitePress.

## Development

```bash
# From the monorepo root
pnpm docs:dev       # Start dev server
pnpm docs:build     # Build for production
pnpm docs:preview   # Preview production build
```

## Structure

```
docs/
├── index.md                    # Homepage
├── guide/
│   ├── welcome.md              # Introduction
│   ├── installation.md         # Setup for Vue, Nuxt, RN, plain HTML
│   ├── theme-configuration.md  # Color system and customization
│   └── package-architecture.md # Package structure
├── web/                        # Web token docs (colors, layout, typography, ...)
├── react-native/               # React Native token docs
└── changelog.md                # Release history
```

## Deployment

The site is deployed to [grundtone.com](https://grundtone.com).

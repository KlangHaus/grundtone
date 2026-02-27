# Haspen UI Documentation

Welcome to the Haspen UI design system documentation. This directory contains all documentation for
contributors, maintainers, and users of the design system.

## Documentation Structure

```
apps/docs/
├── README.md           # This file - main documentation index
├── guide/              # User guides
├── tokens/             # Design token documentation
└── packages/           # Package-specific documentation
```

## Quick Links

### For Contributors

- **[Contributing Guide](../CONTRIBUTING.md)** - How to contribute to Haspen UI
- **[Development Guide](../CLAUDE.md)** - Essential commands and development standards

### For Users

- **[Documentation (Live)](https://haspen-ui.vercel.app)** - Design system documentation (when
  deployed)
- **[Installation Guide](../CONTRIBUTING.md#getting-started)** - How to install and use packages

### For Maintainers

- **[Release Process](../CONTRIBUTING.md#release-process)** - Version management with Changesets
- **[Deployment](../DEPLOYMENT.md)** - Deployment configuration

---

## Project Overview

### What is Haspen UI?

Haspen UI is a comprehensive Vue 3 design system built with:

- **Design Tokens** - Colors, typography, spacing, and more
- **Components** - Atomic design component library
- **Composables** - Reusable Vue 3 composables
- **Utilities** - Shared utilities and helpers
- **Nuxt Module** - First-class Nuxt 3 integration

### Packages

| Package                                             | Description              | Status       |
| --------------------------------------------------- | ------------------------ | ------------ |
| [@ipeeon/design-tokens](../packages/design-tokens/) | Design system tokens     | ✅ Published |
| [@ipeeon/core](../packages/core/)                   | Core types and utilities | ✅ Published |
| [@ipeeon/shared](../packages/shared/)               | Shared utilities         | ✅ Published |
| [@ipeeon/composables](../packages/composables/)     | Vue 3 composables        | ✅ Published |
| [@ipeeon/ui](../packages/ui/)                       | Component library        | ✅ Published |
| [@ipeeon/nuxt](../packages/nuxt/)                   | Nuxt 3 module            | ✅ Published |

### Architecture

```
Dependencies Flow:

core (base types, constants)
  ↓
shared (utilities using core)
  ↓
design-tokens (SCSS variables, TS API)
  ↓
composables (Vue hooks using core/shared)
  ↓
ui (Vue components using all above)
  ↓
nuxt (Nuxt module using ui/composables)
```

---

## Getting Started

### For Users

1. **Install packages**:

   ```bash
   npm install @ipeeon/design-tokens @ipeeon/ui @ipeeon/composables
   ```

2. **Import and use**:

   ```typescript
   // Design tokens
   import { COLORS, SPACING } from '@ipeeon/design-tokens';

   // Components
   import { Button, Input } from '@ipeeon/ui';

   // Composables
   import { useTheme } from '@ipeeon/composables';
   ```

3. **Explore documentation**:
   - Browse [Documentation](https://haspen-ui.vercel.app) (when deployed)
   - Read package READMEs

### For Contributors

1. **Clone repository**:

   ```bash
   git clone https://github.com/your-username/haspen-ui.git
   cd haspen-ui
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start development**:

   ```bash
   pnpm docs:dev       # Start documentation site (VitePress)
   pnpm test:watch     # Run tests in watch mode
   ```

4. **Read guides**:
   - [Contributing Guide](../CONTRIBUTING.md)
   - [Development Guide](../CLAUDE.md)

---

## Development Workflow

### Creating Components

1. Follow [atomic design principles](../CONTRIBUTING.md#atomic-design-principles)
2. Use [component structure template](../CONTRIBUTING.md#component-development)
3. Write tests (minimum 90% coverage)
4. Add component documentation (README)
5. Submit pull request

### Writing Documentation

1. Add or update content in the appropriate docs section (guide/, tokens/, packages/)
2. Build and preview with `pnpm docs:dev`

### Publishing Changes

1. Make changes
2. Create changeset: `pnpm changeset`
3. Commit changes
4. Create pull request
5. Merge to `main`
6. Automated release via GitHub Actions

See [Release Process](../CONTRIBUTING.md#release-process) for details.

---

## Project Status

### Recent Releases

- **v1.0.0** (2026-01-29) - Initial release of all 6 packages
  - @ipeeon/core
  - @ipeeon/shared
  - @ipeeon/design-tokens
  - @ipeeon/composables
  - @ipeeon/ui
  - @ipeeon/nuxt

---

## Testing Strategy

### Unit Tests

- **Tool**: Vitest with @vue/test-utils
- **Coverage**: Minimum 90%
- **Command**: `pnpm test`

### Visual Regression

- **Tool**: Playwright for E2E testing
- **Coverage**: Critical user flows
- **Automated**: On every PR

### Accessibility

- **Tool**: axe DevTools
- **Standard**: WCAG 2.1 AA (minimum)
- **Automated**: In component tests

### Browser Testing

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## Deployment

### Documentation

- **Platform**: Vercel
- **URL**: https://haspen-ui.vercel.app (when deployed)
- **Configuration**: [vercel.json](../vercel.json)
- **Automatic**: Deploy on push to `main`

### NPM Packages

- **Registry**: npmjs.com
- **Scope**: @ipeeon
- **Automation**: GitHub Actions + Changesets
- **Trigger**: Merge "Version Packages" PR

---

## Maintenance

### Documentation Updates

Documentation should be updated:

- **With each release** - Update version numbers and changelogs
- **When adding features** - Document new tokens, components, or utilities
- **When changing APIs** - Update examples and migration guides
- **Quarterly** - Review and improve based on feedback

### Documentation Maintenance

- **Monthly** - Review and update documentation for accuracy
- **Per release** - Document new features
- **Quarterly** - Analyze usage and improve unclear sections

---

## Resources

### Internal Documentation

- [Root README](../README.md) - Project overview
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute
- [Development Guide](../CLAUDE.md) - Essential commands

### External Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

---

## Support

### Getting Help

- **Questions**: Open a [Discussion](https://github.com/haspenui/haspen-ui/discussions)
- **Bug Reports**: Create an [Issue](https://github.com/haspenui/haspen-ui/issues)
- **Feature Requests**: Open a [Discussion](https://github.com/haspenui/haspen-ui/discussions)

### Contributing

We welcome contributions! See:

- [Contributing Guide](../CONTRIBUTING.md) - Detailed contribution guidelines
- [Code of Conduct](../CODE_OF_CONDUCT.md) - Community standards
- [Development Guide](../CLAUDE.md) - Development setup and commands

---

## License

MIT License - see [LICENSE](../LICENSE) file for details.

---

## Acknowledgments

This design system is built with:

- Vue 3 - Progressive JavaScript framework
- VitePress - Documentation site
- Turborepo - Monorepo build system
- pnpm - Fast, disk space efficient package manager
- Changesets - Version management and changelogs
- Vitest - Unit testing framework
- TypeScript - Type safety
- Sass - CSS preprocessing

---

Last Updated: 2026-01-29

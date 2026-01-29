# Haspen UI Documentation

Welcome to the Haspen UI design system documentation. This directory contains all documentation for
contributors, maintainers, and users of the design system.

## Documentation Structure

```
docs/
├── README.md           # This file - main documentation index
└── storybook/          # Storybook documentation structure and implementation
    ├── INDEX.md                      # Quick navigation and overview
    ├── README.md                     # Complete structure documentation
    ├── IMPLEMENTATION_PLAN.md        # Phased implementation plan
    ├── HELPER_COMPONENTS.md          # Helper component specifications
    └── STORY_TEMPLATES.md            # Story templates and examples
```

## Quick Links

### For Contributors

- **[Contributing Guide](../CONTRIBUTING.md)** - How to contribute to Haspen UI
- **[Development Guide](../CLAUDE.md)** - Essential commands and development standards
- **[Storybook Documentation](./storybook/INDEX.md)** - Storybook implementation guide

### For Users

- **[Storybook (Live)](https://haspen-ui.vercel.app)** - Interactive component documentation (when
  deployed)
- **[Installation Guide](./storybook/README.md#installation)** - How to install and use packages
- **[Design Tokens](./storybook/README.md#01-foundation)** - Design token documentation

### For Maintainers

- **[Implementation Plan](./storybook/IMPLEMENTATION_PLAN.md)** - Roadmap and phases
- **[Release Process](../CONTRIBUTING.md#release-process)** - Version management with Changesets
- **[Deployment](./storybook/README.md#deployment)** - Vercel deployment configuration

---

## Documentation Sections

### 📚 Storybook Documentation

**Location**: [docs/storybook/](./storybook/)

**Purpose**: Comprehensive guide for creating and maintaining Storybook documentation for the design
system.

**Contents**:

- Documentation structure and philosophy
- 4-week phased implementation plan
- Helper component specifications (7 components)
- Story templates for all story types
- Testing and deployment strategies

**Start Here**: [storybook/INDEX.md](./storybook/INDEX.md)

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
   - Browse [Storybook](https://haspen-ui.vercel.app) (when deployed)
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
   pnpm storybook      # Start Storybook
   pnpm test:watch     # Run tests in watch mode
   ```

4. **Read guides**:
   - [Contributing Guide](../CONTRIBUTING.md)
   - [Development Guide](../CLAUDE.md)
   - [Storybook Docs](./storybook/INDEX.md)

---

## Development Workflow

### Creating Components

1. Follow [atomic design principles](../CONTRIBUTING.md#atomic-design-principles)
2. Use [component structure template](../CONTRIBUTING.md#component-development)
3. Write tests (minimum 90% coverage)
4. Create Storybook stories
5. Submit pull request

### Writing Documentation

1. Review [Storybook documentation structure](./storybook/README.md)
2. Choose appropriate [story template](./storybook/STORY_TEMPLATES.md)
3. Use [helper components](./storybook/HELPER_COMPONENTS.md) when needed
4. Follow [writing guidelines](./storybook/README.md#writing-guidelines)
5. Test locally with `pnpm storybook`

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

### Current Phase: Documentation

**Focus**: Creating comprehensive Storybook documentation for @ipeeon/design-tokens

**Progress**:

- ✅ Documentation structure planned
- ✅ Implementation plan created
- ✅ Helper component specs written
- ✅ Story templates documented
- ⏳ Helper component implementation (Phase 1)
- ⏳ Foundation token stories (Phase 1)
- ⏳ Functions/mixins documentation (Phase 2)
- ⏳ Advanced features (Phase 3)
- ⏳ Testing and deployment (Phase 4)

**Timeline**: 4-5 weeks (see [Implementation Plan](./storybook/IMPLEMENTATION_PLAN.md))

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

- **Tool**: Chromatic
- **Coverage**: All Storybook stories
- **Automated**: On every PR

### Accessibility

- **Tool**: axe DevTools
- **Standard**: WCAG 2.1 AA (minimum)
- **Automated**: In Storybook

### Browser Testing

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## Deployment

### Storybook

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

### Storybook Maintenance

- **Monthly** - Review and update stories for accuracy
- **Per release** - Add stories for new features
- **Quarterly** - Analyze usage and improve unclear sections

---

## Resources

### Internal Documentation

- [Root README](../README.md) - Project overview
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute
- [Development Guide](../CLAUDE.md) - Essential commands
- [Storybook Docs](./storybook/INDEX.md) - Storybook implementation

### External Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Storybook Documentation](https://storybook.js.org/docs)
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
- Storybook - Component development environment
- Turborepo - Monorepo build system
- pnpm - Fast, disk space efficient package manager
- Changesets - Version management and changelogs
- Vitest - Unit testing framework
- TypeScript - Type safety
- Sass - CSS preprocessing

---

Last Updated: 2026-01-29

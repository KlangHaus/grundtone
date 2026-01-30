# Haspen UI - Design System

A comprehensive Vue 3 design system monorepo built with TypeScript, featuring the complete Danish
Design System (DKFDS) implementation, atomic design principles, and automated workflows.

## 🏗️ Architecture Overview

### Core Philosophy

Haspen UI follows **atomic design methodology** and **design token-driven development**, providing a
scalable foundation for building consistent user interfaces with Danish government design standards.

### Monorepo Structure

```
haspen-ui/
├── packages/
│   ├── core/              # Base styles and reset
│   ├── design-tokens/     # DKFDS tokens, functions, mixins
│   ├── shared/            # Utilities and helpers
│   ├── ui/                # Vue 3 components (atoms → organisms)
│   ├── composables/       # Vue 3 composables/hooks
│   ├── nuxt/              # Nuxt 3 module
│   └── playground/        # Demo application
├── apps/
│   ├── core-test/         # Testing app for core package
│   ├── shared-test/       # Testing app for shared utilities
│   └── components-test/   # Component integration testing
├── .storybook/            # Storybook configuration
└── docs/                  # Generated documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: 10.14.0+ (package manager)
- **Git**: For version control

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd haspen-ui

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Development Commands

```bash
# Development servers
pnpm dev                    # Start all development servers
pnpm dev:playground         # Start playground app only
pnpm storybook             # Start Storybook (port 6006)

# Building
pnpm build                 # Build all packages and apps
pnpm build:packages        # Build only packages (excludes apps)

# Testing & Quality
pnpm test                  # Run all tests
pnpm test:watch            # Run tests in watch mode
pnpm typecheck             # TypeScript checking
pnpm lint                  # Lint all packages
pnpm format                # Format all files

# Package-specific commands
pnpm test --filter=@haspen/ui  # Test specific package
turbo run dev --filter=@haspen/ui  # Build specific package in watch mode
```

## 🏛️ Design System Features

### DKFDS (Det Fælles Designsystem) Integration

Complete implementation of the Danish government design system:

- **100+ DKFDS colors** with semantic naming
- **IBM Plex Sans typography** with responsive scales
- **8px-based spacing** system
- **Complete utility classes** for rapid development
- **SCSS functions and mixins** for advanced styling
- **Comprehensive Storybook documentation**

### Component Architecture

Every component follows atomic design principles:

- **Atoms**: Button, Input, Icon, Label
- **Molecules**: FormField, Card, SearchBox
- **Organisms**: Header, Navigation, DataTable
- **Templates**: Page layouts and structures
- **Pages**: Complete page implementations

## 🛠️ Usage Examples

### Vue 3 Integration

```bash
npm install @haspen/ui @haspen/design-tokens
```

```javascript
// main.ts
import { createApp } from 'vue';
import HaspenUI from '@haspen/ui';
import '@haspen/ui/dist/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(HaspenUI);
app.mount('#app');
```

### Nuxt 3 Integration

```bash
npm install @haspen/nuxt
```

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@haspen/nuxt'],
});
```

### Design Tokens Usage

```scss
@use '@haspen/design-tokens' as tokens;

.my-component {
  color: tokens.color('primary');
  font-size: tokens.font-size('lg');
  padding: tokens.units(2);
  box-shadow: tokens.shadow('medium');
}
```

## 📚 Danish Localization Features

### CPR Number Validation

```typescript
import { isValidCPR } from '@haspen/shared';
isValidCPR('123456-7890'); // true
```

### Danish Currency & Date Formatting

```typescript
import { formatCurrency, formatDanishDate } from '@haspen/shared';
formatCurrency(1234.56); // '1.234,56 kr.'
formatDanishDate(new Date()); // 'DD/MM/YYYY'
```

## 🧪 Quality Assurance

### Testing Requirements

- **90% minimum test coverage** across all packages
- **Unit tests** with Vitest and Vue Test Utils
- **Component documentation** with Storybook
- **E2E testing** with Playwright
- **Accessibility compliance** with WCAG 2.1 AA

### Code Quality Tools

- **ESLint**: JavaScript/TypeScript/Vue linting
- **Stylelint**: SCSS/CSS code quality
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking
- **Husky**: Pre-commit hooks

## 🚀 Deployment & Publishing

### Automated Releases

- **Conventional commits** for semantic versioning
- **Auto-generated changelogs** with release notes
- **GitHub Actions** for CI/CD pipeline
- **NPM publishing** with proper package distribution

### Storybook Deployment

```bash
pnpm build-storybook  # Build for static hosting
```

## 🔧 Troubleshooting

### Common Issues

**Build Failures**: Ensure correct package.json exports **TypeScript Errors**: Build packages in
dependency order **Storybook Issues**: Check addon compatibility **Test Failures**: Verify vitest
configuration

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

## 📖 Documentation

- **[Architecture Guide](./ARCHITECTURE.md)**: System design and patterns
- **[Contributing Guide](./CONTRIBUTING.md)**: Development workflow and standards
- **[Troubleshooting](./TROUBLESHOOTING.md)**: Common issues and solutions
- **[Component API](./docs/api/)**: Generated API documentation
- **[Storybook](http://localhost:6006)**: Interactive component documentation

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for:

- Development setup and workflow
- Component creation standards
- Testing requirements
- Code review process
- DKFDS compliance guidelines

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/yourusername/haspen-ui.git

# 2. Create feature branch
git checkout -b feature/new-component

# 3. Develop with tests
pnpm test:watch

# 4. Submit pull request
git push origin feature/new-component
```

## 📊 Project Status

### Package Status

- ✅ **@haspen/core**: Stable - CSS reset and base styles
- ✅ **@haspen/design-tokens**: Stable - Complete DKFDS implementation
- ✅ **@haspen/shared**: Stable - Danish utilities and helpers
- ✅ **@haspen/ui**: Stable - Vue 3 component library
- ✅ **@haspen/composables**: Stable - Vue 3 composables
- ✅ **@haspen/nuxt**: Stable - Nuxt 3 integration module
- ✅ **@haspen/playground**: Development - Demo application

### Build Status

- ✅ All packages build successfully
- ✅ Tests passing (90%+ coverage)
- ✅ TypeScript compilation clean
- ✅ Linting and formatting consistent
- ✅ Storybook documentation complete

## 🌟 Features

### Design System

- ✅ Complete DKFDS color system (100+ colors)
- ✅ Responsive typography with IBM Plex Sans
- ✅ 8px-based spacing scale
- ✅ Comprehensive utility classes
- ✅ SCSS functions and mixins library
- ✅ CSS custom properties support

### Development Experience

- ✅ TypeScript strict mode
- ✅ Vue 3 Composition API
- ✅ Hot module replacement
- ✅ Automated testing with Vitest
- ✅ Interactive Storybook documentation
- ✅ Automated releases with conventional commits

### Accessibility & Compliance

- ✅ WCAG 2.1 AA compliance
- ✅ Screen reader compatibility
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ ARIA attributes and roles

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **[DKFDS Team](https://designsystem.dk/)**: For the comprehensive Danish Design System
- **[Vue.js Team](https://vuejs.org/)**: For the amazing Vue 3 framework
- **[TypeScript Team](https://www.typescriptlang.org/)**: For robust type safety
- **Contributors**: Everyone who has contributed to this project

---

**Built with ❤️ for the Danish development community**

_This design system provides modern Vue 3 components following Danish government design standards
(DKFDS) with comprehensive tooling for scalable application development._

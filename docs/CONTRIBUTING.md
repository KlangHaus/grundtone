# Contributing to Grundtone

Thank you for your interest in contributing to Grundtone! This document provides guidelines and
information to help you contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our
[Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.14.0
- Git

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/grundtone.git
   cd grundtone
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development environment**

   ```bash
   # Start playground app
   pnpm dev:playground

   # Start documentation site
   pnpm docs:dev

   # Run tests in watch mode
   pnpm test:watch
   ```

## Project Structure

This is a monorepo using Turborepo and pnpm workspaces:

```
grundtone/
├── packages/
│   ├── ui/              # Vue 3 components
│   ├── design-tokens/   # Design system tokens
│   ├── composables/     # Vue composables
│   ├── core/           # Core utilities
│   ├── shared/         # Shared utilities
│   └── nuxt/           # Nuxt module
├── apps/
│   └── playground/     # Demo application
├── TEMPLATES/          # Component templates (excluded from linting)
└── .github/            # GitHub workflows and templates
```

### Package Responsibilities

- **@grundtone/vue**: Vue 3 components following atomic design
- **@grundtone/design-tokens**: Colors, typography, spacing tokens
- **@grundtone/composables**: Reusable Vue composables
- **@grundtone/core**: Framework-agnostic utilities
- **@grundtone/shared**: Shared build tools and presets
- **@grundtone/nuxt**: Nuxt integration module

## Development Workflow

### Branch Strategy

- `develop` - Main development branch
- `main` - Production releases
- Feature branches: `feature/component-name` or `feature/issue-number`
- Bug fixes: `fix/issue-description` or `fix/issue-number`

### Atomic Design Principles

We follow atomic design methodology:

- **Atoms**: Basic building blocks (Button, Input, Icon)
- **Molecules**: Simple groups of atoms (FormField, SearchBox)
- **Organisms**: Complex components (Header, ProductCard)
- **Templates**: Page layouts
- **Pages**: Specific instances of templates

### Component Development

1. **Create component structure**

   ```
   packages/vue/src/atoms/NewComponent/
   ├── NewComponent.vue      # Main component
   ├── NewComponent.scss     # Styles
   ├── NewComponent.test.ts  # Unit tests
   ├── types.ts             # TypeScript types
   └── index.ts             # Exports
   ```

2. **Follow naming conventions**

   - Components: PascalCase (`Button`, `FormField`)
   - Files: Match component name (`Button.vue`, `Button.test.ts`)
   - CSS classes: kebab-case with prefix (`button`)

3. **Component requirements**
   - TypeScript support
   - Vue 3 Composition API
   - Proper props typing
   - SCSS for styling
   - Unit tests
   - Accessibility compliance

## Coding Standards

### Code Quality Tools

We use the following tools to maintain code quality:

- **ESLint**: JavaScript/TypeScript/Vue linting
- **Stylelint**: SCSS/CSS linting
- **Prettier**: Code formatting
- **Commitlint**: Conventional commit messages
- **Husky**: Pre-commit hooks

### Code Style

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use SCSS for styling with design tokens
- Write self-documenting code with comments where needed
- All comments must be in English

### Linting Commands

```bash
# Lint JavaScript/TypeScript/Vue files
pnpm lint:js

# Lint SCSS/CSS files
pnpm lint:styles

# Check code formatting
pnpm lint:format

# Fix formatting issues
pnpm format

# Run type checking
pnpm typecheck
```

### Git Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(button): add loading state
fix(input): resolve focus issue
docs(readme): update installation guide
style(button): improve hover animation
test(input): add validation tests
refactor(core): simplify utility functions
```

#### Valid Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (not affecting functionality)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements

#### Valid Scopes

- `ui`: UI components
- `tokens`: Design tokens
- `composables`: Vue composables
- `core`: Core utilities
- `shared`: Shared utilities
- `nuxt`: Nuxt module
- `playground`: Demo application
- `build`: Build system
- `ci`: Continuous integration
- `docs`: Documentation

## Testing

### Test Requirements

- All components must have unit tests
- Aim for >80% test coverage
- Test user interactions and accessibility
- Use meaningful test descriptions

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

```typescript
// NewComponent.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NewComponent from './NewComponent.vue';

describe('NewComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(NewComponent, {
      props: { title: 'Test' },
    });
    expect(wrapper.text()).toContain('Test');
  });

  it('handles click events', async () => {
    const wrapper = mount(NewComponent);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

## Documentation

### Component Documentation

All components must have documentation including a README with purpose, props, events, slots, and
usage examples.

### TypeScript Documentation

```typescript
/**
 * Button component properties
 */
export interface ButtonProps {
  /** Button text content */
  title?: string;
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}
```

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feature/new-component
   ```

2. **Make your changes**

   - Follow coding standards
   - Add tests
   - Update documentation
   - Run linting and tests

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat(ui): add new component"
   ```

4. **Push and create PR**

   ```bash
   git push origin feature/new-component
   ```

5. **Fill out PR template**
   - Provide clear description
   - Link related issues
   - Add screenshots if applicable
   - Check all requirement boxes

### Review Process

- All PRs require at least one review
- CI checks must pass
- Code coverage should not decrease
- Documentation must be updated
- Breaking changes require special consideration

## Release Process

Releases are automated using semantic versioning:

1. Changes are merged to `develop`
2. When ready for release, create PR from `develop` to `main`
3. Automated release workflow creates version tags
4. Packages are published to npm
5. GitHub release is created

### Version Bumping

- **Patch**: Bug fixes (1.0.1)
- **Minor**: New features, backward compatible (1.1.0)
- **Major**: Breaking changes (2.0.0)

## Getting Help

- 💬 [GitHub Discussions](https://github.com/grundtone/grundtone/discussions)
- 🐛 [Issue Tracker](https://github.com/grundtone/grundtone/issues)
- 📖 [Documentation](https://grundtone.dev)

## Recognition

Contributors are recognized in:

- [README.md](README.md) contributors section
- Release notes
- GitHub contributor graph

Thank you for contributing to Grundtone! 🎉

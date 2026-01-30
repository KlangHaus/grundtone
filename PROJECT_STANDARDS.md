# Project Standards

## Development Standards

This document outlines the mandatory standards for the Haspen UI Design System monorepo.

## Architecture Requirements

### Monorepo Structure

```
packages/
├── core/              # Foundation types, constants, base interfaces
├── shared/            # Utilities, formatters, validation (depends on core)
├── design-tokens/     # SCSS variables, colors, typography, spacing
├── ui/                # Vue 3 components using atomic design (depends on core, shared)
├── composables/       # Vue 3 composables/hooks (depends on core, shared)
└── nuxt/              # Nuxt 3 module (depends on ui, composables)

apps/
└── playground/        # Demo application (depends on all packages)
```

### Build Dependencies

The build pipeline follows strict dependency order:

1. **core** and **shared** (no dependencies)
2. **design-tokens**, **ui**, **composables** (depend on core/shared)
3. **nuxt** and **playground** (depend on ui/composables)

## Component Architecture

### Atomic Design Structure (MANDATORY)

All UI components must follow atomic design principles:

**Atoms** (`packages/ui/src/atoms/`)

- Single-purpose, indivisible UI elements
- Examples: Button, Input, Icon, Label
- No business logic, only presentation logic
- Maximum complexity: 100 lines

**Molecules** (`packages/ui/src/molecules/`)

- Combinations of atoms working together
- Examples: FormField (Label + Input + ErrorMessage)
- Simple, focused functionality
- Maximum complexity: 150 lines

**Organisms** (`packages/ui/src/organisms/`)

- Complex components combining molecules/atoms
- Examples: Header, DataTable, NavigationMenu
- Can contain business logic
- Maximum complexity: 300 lines

**Templates** (`packages/ui/src/templates/`)

- Page-level layouts defining structure
- No real data, only placeholder content
- Focus on layout and component placement

**Pages** (`packages/ui/src/pages/`)

- Real content instances of templates
- Actual data and final implementation

### Component File Structure (MANDATORY)

```
ComponentName/
├── ComponentName.vue        # Vue 3 Composition API with <script setup>
├── ComponentName.stories.ts # Storybook documentation (MANDATORY)
├── ComponentName.test.ts    # Vitest unit tests (MANDATORY)
├── ComponentName.scss       # SCSS with BEM naming (optional)
├── types.ts                # TypeScript interfaces (MANDATORY)
├── index.ts                # Named exports (MANDATORY)
└── README.md               # Component documentation (MANDATORY)
```

## Code Quality Standards

### TypeScript Requirements

- **Strict mode enabled** across all packages
- **No `any` types** - all props, events, and methods must be properly typed
- **Interface-based props** - use interfaces, never inline types
- **Path aliases**: `@haspen/*` maps to `packages/*/src`

### Testing Requirements (MANDATORY)

- **Minimum 90% test coverage** for all packages
- **Comprehensive unit tests** covering:
  - All prop variants and combinations
  - All slots and slot props
  - All emitted events and their payloads
  - Error states and edge cases
  - Accessibility features (ARIA attributes, keyboard navigation)

### Documentation Requirements (MANDATORY)

Every component must include:

1. **Storybook Stories** demonstrating:

   - Default state
   - All variants and sizes
   - Interactive states (hover, focus, disabled)
   - Error states
   - Accessibility examples

2. **Component README** with:

   - Purpose and use cases
   - Props table with types and defaults
   - Events table with payload types
   - Slots documentation
   - Usage examples
   - Accessibility notes

3. **JSDoc Comments** for all:
   - Public methods and properties
   - Complex logic or algorithms
   - Utility functions with examples

## Danish Localization Standards

### Required Danish Support

- **CPR Number Validation**: Follow official Danish format (XXXXXX-XXXX)
- **Phone Number Formatting**: Support Danish mobile and landline formats
- **Currency Formatting**: Output Danish kroner ("kr.") format
- **Date Formatting**: Support Danish date conventions (DD-MM-YYYY)
- **Accessibility**: Meet Danish WCAG compliance requirements

### Language Support

- All user-facing text must support Danish translation
- Error messages and validation text in Danish
- Placeholder text and labels in Danish
- Documentation examples using Danish context

## Performance Standards

### Bundle Size Requirements

- **Individual packages**: Maximum 50KB gzipped
- **Tree-shaking friendly**: Proper `sideEffects: false` configuration
- **Dual format builds**: ESM + CommonJS via tsup
- **External dependencies**: Must be peer dependencies when possible

### Runtime Performance

- **Component rendering**: Sub-16ms render time for standard components
- **Bundle loading**: Lazy loading for non-critical components
- **Memory usage**: No memory leaks in component lifecycle

## Security Standards

### Code Security

- **No secrets in code**: Never commit API keys, passwords, or tokens
- **Input sanitization**: All user inputs must be validated and sanitized
- **XSS prevention**: Proper escaping of dynamic content
- **Dependency security**: Regular audits with `pnpm audit`

### Build Security

- **Lockfile integrity**: Always commit lockfiles (`pnpm-lock.yaml`)
- **Trusted dependencies**: Only use well-maintained, popular packages
- **Automated scanning**: Security checks in CI/CD pipeline

## Accessibility Standards

### WCAG Compliance

- **WCAG 2.1 AA compliance** minimum requirement
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Screen reader support**: Proper ARIA labels and roles
- **Color contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text

### Testing Requirements

- **Automated a11y testing**: axe-core integration in component tests
- **Manual testing**: Keyboard navigation and screen reader testing
- **Documentation**: Accessibility notes in every component README

## Git and Release Standards

### Branch Management

- **Main branch**: `develop` (all PRs target this branch)
- **Feature branches**: `feat/component-name` or `feat/feature-description`
- **Bug fix branches**: `fix/issue-description`
- **Release branches**: `release/v1.2.3`

### Commit Standards

- **Conventional Commits**: Required format `type(scope): description`
- **Valid types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
  `chore`
- **Valid scopes**: Package names (`ui`, `core`, `shared`) or areas (`config`, `ci`, `docs`)

### Release Process

- **Semantic versioning**: Follow semver strictly
- **Automated releases**: via Changesets for version management
- **Changelog generation**: Automated based on changeset descriptions
- **NPM publishing**: Automated via CI/CD pipeline

## CI/CD Standards

### Build Pipeline

- **Dependency installation**: `pnpm install --frozen-lockfile`
- **Type checking**: `pnpm typecheck` across all packages
- **Linting**: `pnpm lint` with zero warnings policy
- **Testing**: `pnpm test` with 90% coverage requirement
- **Building**: `pnpm build` for all packages
- **Visual regression**: Chromatic integration for Storybook

### Quality Gates

- **All tests pass**: Zero test failures allowed
- **Coverage threshold**: Minimum 90% test coverage
- **No linting errors**: ESLint, Stylelint, and Prettier checks
- **Type safety**: Zero TypeScript errors
- **Security**: No high/critical vulnerability alerts

### Deployment

- **Preview deployments**: For all PRs via Vercel/Netlify
- **Production deployment**: Only from `develop` branch after all checks pass
- **Package publishing**: Automated to NPM registry with proper versioning

## Enforcement

These standards are enforced through:

- **Pre-commit hooks**: Formatting, linting, and basic tests
- **CI/CD pipeline**: Full test suite and quality checks
- **Code review process**: Manual verification of standards compliance
- **Automated tools**: ESLint, Stylelint, TypeScript, and Vitest configurations

Non-compliance will result in:

1. **Build failure**: Automatic CI/CD rejection
2. **Review rejection**: Manual code review will reject PRs
3. **Revert consideration**: Post-merge issues may require reverts

# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Essential Commands

### Development

```bash
pnpm dev                    # Start all development servers
pnpm dev:playground         # Start playground app only (@grundtone/playground)
pnpm docs:dev               # Start documentation site (VitePress)
```

### Building and Testing

```bash
pnpm build                 # Build all packages and apps
pnpm build:packages        # Build only packages (excludes apps)
pnpm test                  # Run all tests across monorepo
pnpm test --filter=@grundtone/vue  # Run tests for specific package
pnpm test:watch            # Run tests in watch mode
pnpm typecheck             # TypeScript checking across all packages
pnpm lint                  # Lint all packages
```

### Package-specific Development

```bash
# Build single package in watch mode
turbo run dev --filter=@grundtone/vue

# Run tests for single package
pnpm test --filter=@grundtone/composables
```

### Versioning and Publishing

This project uses **Changesets** for version management and publishing. Changesets provides
automated version bumping, changelog generation with git integration, and NPM publishing.

#### Creating a Changeset

When you make changes that should be published, create a changeset:

```bash
pnpm changeset        # Interactive CLI to create a changeset
pnpm changeset:add    # Same as above (alias)
```

This will prompt you to:

1. Select which packages have changed
2. Choose the bump type (major/minor/patch) for each package
3. Write a summary of the changes (this becomes the changelog entry)

Changesets are stored as markdown files in `.changeset/` and should be committed with your PR.

#### Changeset Bump Types

- **major** (1.0.0 → 2.0.0): Breaking changes that require user code updates
- **minor** (1.0.0 → 1.1.0): New features that are backwards compatible
- **patch** (1.0.0 → 1.0.1): Bug fixes and minor improvements

#### Release Workflow

**Automated via GitHub Actions:**

1. Push changes with changesets to `main` branch
2. GitHub Actions creates/updates a "Version Packages" PR
3. Review the PR to see version bumps and generated changelogs
4. Merge the PR to publish all packages to NPM

**Manual release (emergency use only):**

```bash
pnpm version-packages  # Bump versions and update changelogs
pnpm release          # Build and publish to NPM
```

#### Checking Release Status

```bash
pnpm changeset:status  # See which packages will be published and their versions
```

#### Snapshot Releases

For testing pre-release versions:

```bash
pnpm release:snapshot  # Publish packages with snapshot versions (e.g., 0.0.0-snapshot-20231231)
```

#### Changelog Generation

Changelogs are automatically generated with:

- Links to GitHub commits and PRs
- Credit to all contributors
- Grouped by package
- Full git history integration

Changelogs are created in each package's `CHANGELOG.md` file when running `pnpm version-packages`.

#### Important Notes

- **Always create a changeset** for user-facing changes
- **Skip changesets** for internal refactoring that doesn't affect the public API
- The `@grundtone/playground` package is excluded from releases (demo app only)
- Versioning follows [Semantic Versioning (semver)](https://semver.org/)
- All packages in this monorepo are versioned independently

## Monorepo Architecture

### Package Structure and Dependencies

- **@grundtone/core** - Foundation types, constants, base interfaces
- **@grundtone/shared** - Utilities, formatters, validation (depends on core)
- **@grundtone/design-tokens** - SCSS variables, colors, typography, spacing (web only)
- **@grundtone/vue** - Vue 3 components using atomic design (depends on core, shared)
- **@grundtone/composables** - Vue 3 composables/hooks (depends on core, shared)
- **@grundtone/nuxt** - Nuxt 3 module (depends on vue, composables)
- **@grundtone/react-native** - React Native theme provider (depends on core)
- **@grundtone/playground** - Demo application (depends on all packages)

### Build Pipeline (Turborepo)

The build system uses dependency-aware parallel execution:

1. **core** and **shared** build first (no dependencies)
2. **design-tokens**, **ui**, **composables** build in parallel (depend on core/shared)
3. **nuxt** and **playground** build last (depend on ui/composables)

Tests depend on build completion. Turborepo caches outputs based on file changes and dependencies.

## Component Development Patterns

### Atomic Design Structure

Components are organized in `/packages/vue/src/`:

- `atoms/` - Basic building blocks (Button, Input)
- `molecules/` - Component combinations (FormField, Card)
- `organisms/` - Complex components (Header, Navigation)
- `templates/` - Page layouts
- `pages/` - Complete pages

### Component File Structure

```
ComponentName/
├── ComponentName.vue        # Vue 3 Composition API with <script setup>
├── ComponentName.test.ts    # Vitest unit tests
├── ComponentName.scss       # SCSS with BEM naming (optional)
├── types.ts                # TypeScript interfaces
└── index.ts                # Named exports
```

### TypeScript Configuration

- Strict mode enabled across all packages
- Path aliases: `@grundtone/*` maps to `packages/*/src`
- `tsconfig.build.json` excludes test files from production builds
- Each package extends root config with package-specific overrides

## Danish Localization Features

This design system includes Danish-specific utilities:

- CPR (Danish social security) number validation in `@grundtone/shared`
- Danish phone number formatting and validation
- Danish currency formatting (`formatCurrency` outputs "kr.")
- Danish date formatting

## Testing Strategy

- **Vitest** for unit testing with jsdom environment
- **@vue/test-utils** for Vue component testing
- **Playwright** for browser/E2E testing
- Tests must pass before builds in CI pipeline

## Build Output and Publishing

- All packages build to dual format (ESM + CommonJS) via tsup
- Tree-shaking friendly with proper `sideEffects: false`
- Workspace dependencies use `workspace:*` protocol
- Automated releases via Changesets for version management

## Mandatory Development Standards

### Atomic Design Structure

Components MUST follow atomic design principles:

**Atoms** (`packages/vue/src/atoms/`)

- Single-purpose, indivisible UI elements (Button, Input, Icon, Label)
- No business logic, only presentation logic
- Highly reusable across the system

**Molecules** (`packages/vue/src/molecules/`)

- Combinations of atoms that work together (FormField = Label + Input + ErrorMessage)
- Simple, focused functionality
- Can contain local state management

**Organisms** (`packages/vue/src/organisms/`)

- Complex components combining molecules/atoms (Header, DataTable, Form)
- Can contain business logic and complex interactions
- May connect to external data sources

**Templates** (`packages/vue/src/templates/`)

- Page-level layouts defining content structure
- Placeholder content, no real data
- Focus on layout and component placement

**Pages** (`packages/vue/src/pages/`)

- Real content instances of templates
- Actual data and final implementation

### Clean Code Requirements

**Component Structure** Every component MUST include:

```
ComponentName/
├── ComponentName.vue        # Implementation
├── ComponentName.test.ts    # Unit tests (MANDATORY)
├── ComponentName.scss       # Styles (if needed)
├── types.ts                # TypeScript interfaces
├── index.ts                # Named exports
└── README.md               # Component documentation
```

**Code Quality Standards**

- MANDATORY: Every component must have comprehensive unit tests covering all props, slots, and
  interactions
- MANDATORY: All components must have comprehensive documentation
- MANDATORY: TypeScript interfaces for all props, events, and exposed methods
- Single responsibility principle - one component does one thing well
- Props must be typed with interfaces, never `any` types
- Use descriptive, intention-revealing names for variables and functions
- Functions should be pure when possible, avoid side effects
- Maximum component complexity: 150 lines of code (template + script + style)

### Testing Requirements

**Unit Testing (MANDATORY for all components)**

```typescript
// ComponentName.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ComponentName from './ComponentName.vue';

describe('ComponentName', () => {
  // Test all props
  it('renders with all prop variants', () => {});

  // Test all slots
  it('renders slot content correctly', () => {});

  // Test all emitted events
  it('emits events on user interaction', () => {});

  // Test edge cases and error states
  it('handles error states gracefully', () => {});

  // Test accessibility
  it('meets accessibility requirements', () => {});
});
```

**Test Coverage Requirements**

- Minimum 90% test coverage for all packages
- Every prop combination must be tested
- All user interactions must be tested
- Error states and edge cases must be tested
- Accessibility features must be tested

### Documentation Requirements

**Component Documentation (MANDATORY README.md for each component)**

```markdown
# ComponentName

Brief description of the component's purpose and use case.

## Usage

\`\`\`vue <ComponentName variant="primary" size="md" @click="handleClick"

> Content here </ComponentName> \`\`\`

## Props

| Prop    | Type                     | Default   | Description    |
| ------- | ------------------------ | --------- | -------------- |
| variant | 'primary' \| 'secondary' | 'primary' | Visual variant |

## Events

| Event | Payload    | Description          |
| ----- | ---------- | -------------------- |
| click | MouseEvent | Emitted when clicked |

## Slots

| Slot    | Description       |
| ------- | ----------------- |
| default | Main content area |

## Examples

[Link to component examples]

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
```

**Utility Documentation (MANDATORY for all functions)** Every utility function must have
comprehensive JSDoc:

````typescript
/**
 * Validates a Danish CPR number
 *
 * @param cpr - The CPR number to validate (format: XXXXXX-XXXX or XXXXXXXXXX)
 * @returns True if valid CPR number, false otherwise
 *
 * @example
 * ```typescript
 * isValidCPR('123456-7890') // true
 * isValidCPR('invalid') // false
 * ```
 *
 * @see https://da.wikipedia.org/wiki/CPR-nummer for CPR format rules
 */
export function isValidCPR(cpr: string): boolean {
  // Implementation
}
````

**Design Token Documentation** Every design token must include:

- Purpose and semantic meaning
- Usage examples in components
- Accessibility considerations (contrast ratios for colors)
- Responsive behavior (for spacing/typography)

### Code Enforcement and Quality Standards

**Linting and Formatting (MANDATORY)**

- **ESLint**: JavaScript/TypeScript/Vue code quality enforcement
  - Run: `pnpm lint:js` to lint and auto-fix JS/TS/Vue files
  - Configured for basic code quality rules (no complex TypeScript/Vue rules to avoid conflicts)
  - Covers: unused variables, console warnings, prefer const, modern JavaScript
- **Stylelint**: SCSS/CSS code quality enforcement
  - Run: `pnpm lint:styles` to lint and auto-fix SCSS/CSS/Vue style blocks
  - Rules: basic CSS validation, SCSS syntax, Vue component styles
  - Vue file support with postcss-html parser
  - Ignores formatting conflicts (handled by Prettier)
- **Prettier**: Consistent code formatting across all file types
  - Run: `pnpm format` to format all files
  - Formats: TypeScript, Vue, SCSS, JSON, Markdown, YAML
  - Vue-specific formatting with proper indentation
  - Markdown with prose wrapping at 100 characters
- **Commitlint**: Conventional commit message validation
  - Required format: `type(scope): description`
  - Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`,
    `revert`
  - Valid scopes: `ui`, `core`, `shared`, `composables`, `design-tokens`, `nuxt`, `playground`,
    `deps`, `config`, `ci`, `docs`, `release`
  - Example: `feat(ui): add new button variant`

**Pre-commit Hooks (AUTOMATIC)**

- **Husky**: Runs quality checks before each commit
  - Pre-commit: Formats staged files with Prettier
  - Commit-msg: Validates commit message format
  - Files processed: Only staged files in packages/, apps/ directories
  - TEMPLATES directory excluded from all processing

**File Organization Rules**

- **TEMPLATES/ directory**: Completely ignored by all linting, formatting, and git hooks
- **Linting scope**: Only `{packages,apps}/` directories are processed
- **Module system**: Project uses ES modules (`"type": "module"` in package.json)
- **Node.js compatibility**: Minimum version 20.0.0 required

**Development Workflow Standards**

1. **Before committing**:
   - Pre-commit hooks automatically format your staged files
   - Commit message must follow conventional commit format
   - Only files in packages/apps are processed
2. **Manual quality checks**:

   ```bash
   pnpm lint:js        # Check JavaScript/TypeScript/Vue files
   pnpm lint:styles    # Check SCSS/CSS/Vue style blocks
   pnpm format         # Format all files
   pnpm lint:format    # Check if files need formatting
   ```

3. **Quality enforcement**:
   - Pre-commit hooks ensure all tests pass
   - CI fails if test coverage drops below 90%
   - Linting rules enforce clean code standards
   - Documentation must be kept up to date
   - TypeScript strict mode catches type issues
   - Commit messages must follow conventional format

## Important Development Guidelines

**TEMPLATES Directory**

- **NEVER work on or develop anything inside the TEMPLATES/ directory**
- This directory contains third-party template files that should remain completely untouched
- All development work should focus only on the monorepo packages and apps directories
- The TEMPLATES directory is excluded from all linting, formatting, and git hooks

# 🚀 Welcome to HäspenUI Design System

Welcome! This guide will help you get started with the HäspenUI Design System in less than 5
minutes.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 22+ installed ([download](https://nodejs.org/))
- **pnpm** 10.14+ installed (`npm install -g pnpm@10.14.0`)
- **Git** installed
- A code editor (we recommend VS Code with Volar extension)

## 🏃‍♂️ Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd haspen-ui

# Install dependencies
pnpm install
```

### 2. Start Development

```bash
# Run documentation site
pnpm docs:dev

# Run playground app
pnpm dev:playground

# Run all development servers
pnpm dev
```

## 🗂 What's Inside?

### Packages

- **`@haspen/ui`** - Vue 3 components (buttons, forms, etc.)
- **`@haspen/core`** - Core types and constants
- **`@haspen/shared`** - Shared utilities and helpers
- **`@haspen/composables`** - Vue composables (hooks)
- **`@haspen/design-tokens`** - Design tokens (colors, spacing, typography)
- **`@haspen/nuxt`** - Nuxt 3 module

### Applications

- **`@haspen/playground`** - Interactive demo app
- **`apps/components-test`** - Component testing app

## 🎯 Common Tasks

### Creating a New Component

1. Navigate to `packages/ui/src/atoms/` (or molecules/organisms)
2. Create a new folder with your component name
3. Add these files:
   - `ComponentName.vue` - Component implementation
   - `ComponentName.test.ts` - Unit tests
   - `index.ts` - Export file
   - `types.ts` - TypeScript types

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific package tests
pnpm test --filter=@haspen/ui
```

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build --filter=@haspen/ui
```

## 📚 Next Steps

1. **[Read DEVELOPMENT.md](./DEVELOPMENT.md)** - Detailed development guide
2. **[View Docs](http://localhost:5173)** - Design system documentation (after running
   `pnpm docs:dev`)
3. **[Explore Playground](http://localhost:5173)** - Live demo (after running `pnpm dev:playground`)

## 🆘 Need Help?

- Check the [README.md](./README.md) for project overview
- Review [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guides
- Look at existing components for examples
- Open an issue on GitHub

## 🎉 Ready to Code!

You're all set! Start by:

1. Running `pnpm docs:dev` to see the design system documentation
2. Exploring the `packages/ui/src/atoms/Button` folder to understand the structure
3. Creating your first component or improving an existing one

Happy coding! 🚀

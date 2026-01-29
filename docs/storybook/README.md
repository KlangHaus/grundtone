# Storybook Documentation Structure

This document outlines the comprehensive Storybook documentation structure for the
`@ipeeon/design-tokens` package and provides guidelines for documenting all packages in the
haspen-ui monorepo.

## Overview

The Storybook documentation serves as the primary resource for developers using the haspen-ui design
system. It combines narrative documentation (MDX) with interactive examples (.stories.ts) to provide
both conceptual understanding and practical implementation guidance.

## Documentation Philosophy

1. **Show, Don't Tell** - Every token and function has a live, interactive demonstration
2. **Copy-Paste Ready** - All code examples are production-ready and can be used immediately
3. **Accessibility First** - WCAG compliance is built into documentation, not added later
4. **Type-Safe** - TypeScript API is documented alongside SCSS for type safety
5. **Progressive Disclosure** - Start simple, reveal complexity gradually

## Directory Structure

```
.storybook/
├── components/                    # Helper Vue components for documentation
│   ├── ColorSwatch.vue
│   ├── ColorPalette.vue
│   ├── TypeScale.vue
│   ├── SpacingVisualizer.vue
│   ├── ContrastChecker.vue
│   ├── CodeBlock.vue
│   └── TokenTable.vue
└── main.ts                       # Storybook configuration

packages/design-tokens/src/stories/
├── 00-introduction/              # Getting started and overview
│   ├── Welcome.mdx
│   ├── Installation.mdx
│   ├── Usage.mdx
│   └── Contributing.mdx
├── 01-foundation/                # Core design tokens
│   ├── Colors.stories.ts
│   ├── Typography.stories.ts
│   ├── Spacing.stories.ts
│   ├── Shadows.stories.ts
│   ├── BorderRadius.stories.ts
│   ├── Transitions.stories.ts
│   └── Breakpoints.stories.ts
├── 02-functions/                 # SCSS functions
│   ├── ColorFunctions.stories.ts
│   ├── TypographyFunctions.stories.ts
│   ├── SpacingFunctions.stories.ts
│   ├── MediaQueries.stories.ts
│   └── Utilities.stories.ts
├── 03-mixins/                    # SCSS mixins
│   ├── TypographyMixins.stories.ts
│   ├── LayoutMixins.stories.ts
│   ├── ResponsiveMixins.stories.ts
│   └── UtilityMixins.stories.ts
├── 04-accessibility/             # Accessibility features
│   ├── ContrastChecker.stories.ts
│   ├── ColorBlindness.stories.ts
│   └── FocusStates.stories.ts
├── 05-advanced/                  # Advanced features
│   ├── RegisteredProperties.stories.ts
│   ├── CustomProperties.stories.ts
│   └── ThemeCustomization.stories.ts
└── 06-examples/                  # Real-world examples
    ├── ComponentTheming.stories.ts
    ├── DarkMode.stories.ts
    └── ResponsiveDesign.stories.ts
```

## Documentation Sections

### 00-introduction

**Purpose**: Onboard new users and provide quick-start guides

**Files**:

- `Welcome.mdx` - Overview of the design system and its philosophy
- `Installation.mdx` - Installation instructions for SCSS, TypeScript, and Vue
- `Usage.mdx` - Basic usage patterns and best practices
- `Contributing.mdx` - Guidelines for contributing to the design system

**Format**: MDX (narrative documentation)

### 01-foundation

**Purpose**: Document all core design tokens with interactive visualizations

**Files**:

- `Colors.stories.ts` - Color palettes with swatches, hex values, and contrast ratios
- `Typography.stories.ts` - Font families, sizes, weights, and line heights
- `Spacing.stories.ts` - Spacing scale with visual representations
- `Shadows.stories.ts` - Shadow tokens with live examples
- `BorderRadius.stories.ts` - Border radius values with examples
- `Transitions.stories.ts` - Animation timing and easing functions
- `Breakpoints.stories.ts` - Responsive breakpoints with viewport previews

**Format**: .stories.ts (interactive examples)

**Key Features**:

- Live previews of all tokens
- Code snippets for SCSS and TypeScript usage
- Accessibility information (contrast ratios, readability)
- Token tables with values and descriptions

### 02-functions

**Purpose**: Document all SCSS functions with interactive examples

**Files**:

- `ColorFunctions.stories.ts` - getColor(), getColorValue(), getColorPalette()
- `TypographyFunctions.stories.ts` - font-size(), font-weight(), line-height()
- `SpacingFunctions.stories.ts` - spacing(), margin(), padding()
- `MediaQueries.stories.ts` - breakpoint(), media-query()
- `Utilities.stories.ts` - Helper functions and utilities

**Format**: .stories.ts (interactive examples)

**Key Features**:

- Function signatures and parameters
- Input/output demonstrations
- SCSS code examples
- Common use cases and patterns

### 03-mixins

**Purpose**: Document all SCSS mixins with implementation examples

**Files**:

- `TypographyMixins.stories.ts` - font-base(), heading(), body-text()
- `LayoutMixins.stories.ts` - container(), flex(), grid()
- `ResponsiveMixins.stories.ts` - respond-to(), media()
- `UtilityMixins.stories.ts` - Various utility mixins

**Format**: .stories.ts (interactive examples)

**Key Features**:

- Mixin syntax and parameters
- Before/after demonstrations
- Generated CSS output
- Common patterns and anti-patterns

### 04-accessibility

**Purpose**: Document accessibility features and compliance tools

**Files**:

- `ContrastChecker.stories.ts` - WCAG contrast ratio calculator
- `ColorBlindness.stories.ts` - Color blindness simulations
- `FocusStates.stories.ts` - Focus indicator examples

**Format**: .stories.ts (interactive tools)

**Key Features**:

- Interactive contrast checking
- Color blindness simulations (protanopia, deuteranopia, tritanopia)
- WCAG compliance validation
- Accessibility best practices

### 05-advanced

**Purpose**: Document advanced features for power users

**Files**:

- `RegisteredProperties.stories.ts` - CSS @property API and performance benefits
- `CustomProperties.stories.ts` - CSS variables and theming
- `ThemeCustomization.stories.ts` - Creating custom themes

**Format**: .stories.ts (interactive examples)

**Key Features**:

- Advanced API usage
- Performance optimization techniques
- Theming strategies
- Browser compatibility notes

### 06-examples

**Purpose**: Provide real-world implementation examples

**Files**:

- `ComponentTheming.stories.ts` - Theming component examples
- `DarkMode.stories.ts` - Dark mode implementation patterns
- `ResponsiveDesign.stories.ts` - Responsive design examples

**Format**: .stories.ts (complete examples)

**Key Features**:

- Full component implementations
- Production-ready code
- Best practices demonstrations
- Common patterns and recipes

## Helper Components

See [HELPER_COMPONENTS.md](./HELPER_COMPONENTS.md) for detailed documentation of all helper
components used in stories.

## Story Templates

See [STORY_TEMPLATES.md](./STORY_TEMPLATES.md) for templates and examples of different story types.

## Implementation Plan

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the phased implementation approach.

## Writing Guidelines

### MDX Files (Narrative Documentation)

- Start with a clear, concise overview
- Use headings to organize content hierarchically
- Include code examples with syntax highlighting
- Link to related stories for interactive examples
- Keep paragraphs short and scannable
- Use callouts for important information

Example:

```mdx
# Getting Started

Welcome to the haspen-ui design system! This guide will help you get started.

## Installation

### Using npm

\`\`\`bash npm install @ipeeon/design-tokens \`\`\`

### Using pnpm

\`\`\`bash pnpm add @ipeeon/design-tokens \`\`\`

> **Note**: This package requires Sass/SCSS for full functionality.

## Next Steps

- [Explore Colors](?path=/docs/foundation-colors--docs)
- [Learn Typography](?path=/docs/foundation-typography--docs)
- [View Examples](?path=/docs/examples-component-theming--docs)
```

### .stories.ts Files (Interactive Examples)

- Always include a default export with meta information
- Use descriptive story names
- Provide controls for interactive properties
- Include code snippets in the docs
- Add accessibility information where relevant

Example structure:

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import ComponentName from './ComponentName.vue';

const meta: Meta<typeof ComponentName> = {
  title: 'Section/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Component description with usage context',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## Best Practices

1. **Consistency** - Use the same structure and patterns across all stories
2. **Completeness** - Document all tokens, functions, and mixins
3. **Accuracy** - Keep documentation synchronized with code
4. **Accessibility** - Always include accessibility information
5. **Examples** - Show don't tell - provide working examples
6. **Progressive** - Start simple, add complexity gradually
7. **Searchable** - Use clear titles and descriptions for discoverability

## Testing Strategy

1. **Visual Regression Testing**

   - Use Chromatic for visual regression testing
   - Review changes before merging

2. **Accessibility Testing**

   - Run axe accessibility tests on all stories
   - Ensure WCAG AA compliance minimum

3. **Build Testing**

   - Ensure Storybook builds without errors
   - Validate all links and imports

4. **Browser Testing**
   - Test in Chrome, Firefox, Safari, and Edge
   - Verify registered properties work across browsers

## Deployment

The Storybook documentation is deployed to Vercel:

1. Push changes to the repository
2. Vercel automatically builds and deploys
3. Preview deployments for PRs
4. Production deployment from main branch

Configuration: See [vercel.json](../../vercel.json) in the repository root.

## Maintenance

- Review and update documentation with each release
- Add new stories for new tokens/features
- Keep examples current with best practices
- Monitor user feedback and improve unclear sections

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

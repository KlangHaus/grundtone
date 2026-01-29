# Storybook Story Templates

This document provides templates and examples for creating consistent, high-quality Storybook
stories.

## Overview

Stories in our design system follow specific patterns based on their type. This ensures consistency
and makes the documentation predictable and easy to navigate.

## Story Types

1. [Token Stories](#token-stories) - Document design tokens (colors, spacing, etc.)
2. [Function Stories](#function-stories) - Document SCSS functions
3. [Mixin Stories](#mixin-stories) - Document SCSS mixins
4. [Tool Stories](#tool-stories) - Interactive tools (contrast checker, etc.)
5. [Example Stories](#example-stories) - Real-world implementation examples
6. [MDX Documentation](#mdx-documentation) - Narrative documentation

---

## Token Stories

### Purpose

Document design tokens with visual representations and code examples.

### Template

```typescript
// Colors.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import ColorPalette from '../../.storybook/components/ColorPalette.vue';
import ColorSwatch from '../../.storybook/components/ColorSwatch.vue';
import CodeBlock from '../../.storybook/components/CodeBlock.vue';
import TokenTable from '../../.storybook/components/TokenTable.vue';
import { COLORS } from '@ipeeon/design-tokens';

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    docs: {
      description: {
        component: `
# Color Tokens

The design system provides a comprehensive color palette with semantic naming and accessibility features built-in.

## Features

- 10-shade color palettes for each hue
- Semantic color names (primary, success, error, etc.)
- WCAG-compliant contrast ratios
- TypeScript type safety
- CSS custom properties support
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Colors Story
export const PrimaryColors: Story = {
  render: () => ({
    components: { ColorPalette },
    setup() {
      const colors = [
        { shade: '50', hex: COLORS.blue[50] },
        { shade: '100', hex: COLORS.blue[100] },
        { shade: '200', hex: COLORS.blue[200] },
        { shade: '300', hex: COLORS.blue[300] },
        { shade: '400', hex: COLORS.blue[400] },
        { shade: '500', hex: COLORS.blue[500] },
        { shade: '600', hex: COLORS.blue[600] },
        { shade: '700', hex: COLORS.blue[700] },
        { shade: '800', hex: COLORS.blue[800] },
        { shade: '900', hex: COLORS.blue[900] },
      ];
      return { colors };
    },
    template:
      '<ColorPalette name="Blue (Primary)" :colors="colors" orientation="vertical" :showLabels="true" />',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Primary blue color palette used for interactive elements and brand identity.',
      },
      source: {
        code: `
// SCSS
@use '@ipeeon/design-tokens' as tokens;

.my-component {
  color: tokens.getColor('blue', 500);
}

// TypeScript
import { COLORS } from '@ipeeon/design-tokens';

const primaryColor = COLORS.blue[500];
        `,
      },
    },
  },
};

// Semantic Colors Story
export const SemanticColors: Story = {
  render: () => ({
    components: { ColorSwatch },
    setup() {
      const semanticColors = [
        { name: 'Primary', hex: COLORS.primary },
        { name: 'Secondary', hex: COLORS.secondary },
        { name: 'Success', hex: COLORS.success },
        { name: 'Warning', hex: COLORS.warning },
        { name: 'Error', hex: COLORS.error },
        { name: 'Info', hex: COLORS.info },
      ];
      return { semanticColors };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        <ColorSwatch
          v-for="color in semanticColors"
          :key="color.name"
          :name="color.name"
          :hex="color.hex"
          :showContrast="true"
          size="md"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Semantic colors provide meaning and should be used for specific purposes.',
      },
    },
  },
};

// Color Tokens Table Story
export const AllColorTokens: Story = {
  render: () => ({
    components: { TokenTable },
    setup() {
      const tokens = Object.entries(COLORS).map(([name, value]) => ({
        name,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
        description: getColorDescription(name),
        example: `<span style="color: ${value}">●</span>`,
      }));

      function getColorDescription(name: string): string {
        const descriptions: Record<string, string> = {
          primary: 'Primary brand color for interactive elements',
          secondary: 'Secondary color for supporting elements',
          success: 'Indicates successful operations',
          warning: 'Indicates warning states',
          error: 'Indicates error states',
          info: 'Informational messages',
        };
        return descriptions[name] || '';
      }

      return { tokens };
    },
    template:
      '<TokenTable title="All Color Tokens" :tokens="tokens" :filterable="true" :sortable="true" />',
  }),
};
```

### Key Elements

1. **Meta Configuration**

   - Clear title with category
   - Comprehensive component description
   - autodocs tag for automatic documentation

2. **Multiple Story Variants**

   - Visual representation (palette, swatches)
   - Code examples (SCSS and TypeScript)
   - Complete token table

3. **Documentation**
   - Usage examples in multiple languages
   - Best practices and guidelines
   - Accessibility information

---

## Function Stories

### Purpose

Document SCSS functions with interactive input/output demonstrations.

### Template

```typescript
// ColorFunctions.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CodeBlock from '../../.storybook/components/CodeBlock.vue';

const meta: Meta = {
  title: 'Functions/Color Functions',
  parameters: {
    docs: {
      description: {
        component: `
# Color Functions

SCSS functions for working with the color palette.

## Available Functions

- \`getColor($name, $shade)\` - Get a color from the palette
- \`getColorValue($name)\` - Get a semantic color value
- \`getColorPalette($name)\` - Get an entire color palette
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// getColor Function Story
export const GetColor: Story = {
  render: () => ({
    components: { CodeBlock },
    setup() {
      const functionSignature = `
@function getColor($name, $shade: 500) {
  @return map-deep-get($colors, $name, $shade);
}
      `.trim();

      const usageExample = `
@use '@ipeeon/design-tokens' as tokens;

.button {
  background-color: tokens.getColor('blue', 500);
  &:hover {
    background-color: tokens.getColor('blue', 600);
  }
}
      `.trim();

      const outputCSS = `
.button {
  background-color: #0059b3;
}
.button:hover {
  background-color: #004a94;
}
      `.trim();

      return { functionSignature, usageExample, outputCSS };
    },
    template: `
      <div>
        <h3>Function Signature</h3>
        <CodeBlock :code="functionSignature" language="scss" :showCopy="true" />

        <h3>Parameters</h3>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>$name</code></td>
              <td>String</td>
              <td>required</td>
              <td>Color name (e.g., 'blue', 'red')</td>
            </tr>
            <tr>
              <td><code>$shade</code></td>
              <td>Number</td>
              <td>500</td>
              <td>Color shade (50-900)</td>
            </tr>
          </tbody>
        </table>

        <h3>Usage Example</h3>
        <CodeBlock :code="usageExample" language="scss" :showCopy="true" />

        <h3>Output CSS</h3>
        <CodeBlock :code="outputCSS" language="css" :showCopy="true" />

        <h3>Live Example</h3>
        <div style="padding: 1rem; background-color: #0059b3; color: white;">
          Button with primary color
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Get a specific shade of a color from the palette.',
      },
    },
  },
};

// Interactive Example
export const InteractiveColorFunction: Story = {
  render: () => ({
    setup() {
      const colorName = ref('blue');
      const shade = ref(500);
      const availableColors = ['blue', 'red', 'green', 'gray'];
      const availableShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

      return {
        colorName,
        shade,
        availableColors,
        availableShades,
      };
    },
    template: `
      <div>
        <h3>Try it yourself</h3>
        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
          <label>
            Color:
            <select v-model="colorName">
              <option v-for="color in availableColors" :key="color" :value="color">
                {{ color }}
              </option>
            </select>
          </label>
          <label>
            Shade:
            <select v-model.number="shade">
              <option v-for="s in availableShades" :key="s" :value="s">
                {{ s }}
              </option>
            </select>
          </label>
        </div>

        <div style="padding: 2rem; border: 1px solid #ccc;">
          <div>
            <strong>SCSS:</strong>
            <code>getColor('{{ colorName }}', {{ shade }})</code>
          </div>
          <div style="margin-top: 1rem;">
            <strong>Result:</strong>
            <div :style="{
              width: '100px',
              height: '100px',
              backgroundColor: '#0059b3',
              border: '1px solid #000'
            }" />
          </div>
        </div>
      </div>
    `,
  }),
};
```

### Key Elements

1. **Function Signature** - Clear definition with types
2. **Parameter Documentation** - Table with all parameters
3. **Usage Examples** - Real SCSS code that works
4. **Output Examples** - Generated CSS
5. **Live Examples** - Visual demonstration
6. **Interactive Demo** - User can try different inputs

---

## Mixin Stories

### Purpose

Document SCSS mixins with before/after demonstrations.

### Template

```typescript
// TypographyMixins.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import CodeBlock from '../../.storybook/components/CodeBlock.vue';

const meta: Meta = {
  title: 'Mixins/Typography Mixins',
  parameters: {
    docs: {
      description: {
        component: `
# Typography Mixins

SCSS mixins for consistent typography across your application.

## Available Mixins

- \`font-base()\` - Apply base font styles
- \`heading($level)\` - Apply heading styles
- \`body-text($size)\` - Apply body text styles
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FontBaseMixin: Story = {
  render: () => ({
    components: { CodeBlock },
    setup() {
      const mixinCode = `
@mixin font-base() {
  font-family: var(--haspen-font-family-base);
  font-size: var(--haspen-font-size-base);
  font-weight: var(--haspen-font-weight-normal);
  line-height: var(--haspen-line-height-normal);
}
      `.trim();

      const usageCode = `
@use '@ipeeon/design-tokens' as tokens;

.my-text {
  @include tokens.font-base();
}
      `.trim();

      const outputCSS = `
.my-text {
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
      `.trim();

      return { mixinCode, usageCode, outputCSS };
    },
    template: `
      <div>
        <h3>Mixin Definition</h3>
        <CodeBlock :code="mixinCode" language="scss" :showCopy="true" />

        <h3>Usage</h3>
        <CodeBlock :code="usageCode" language="scss" :showCopy="true" />

        <h3>Generated CSS</h3>
        <CodeBlock :code="outputCSS" language="css" :showCopy="true" />

        <h3>Visual Example</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <strong>Without mixin</strong>
            <p>This text has default browser styling</p>
          </div>
          <div>
            <strong>With font-base() mixin</strong>
            <p style="font-family: 'IBM Plex Sans', system-ui, sans-serif; font-size: 1rem; font-weight: 400; line-height: 1.5;">
              This text uses the font-base mixin
            </p>
          </div>
        </div>
      </div>
    `,
  }),
};

export const HeadingMixin: Story = {
  render: () => ({
    components: { CodeBlock },
    setup() {
      const usageCode = `
@use '@ipeeon/design-tokens' as tokens;

h1 { @include tokens.heading(1); }
h2 { @include tokens.heading(2); }
h3 { @include tokens.heading(3); }
      `.trim();

      return { usageCode };
    },
    template: `
      <div>
        <h3>Usage</h3>
        <CodeBlock :code="usageCode" language="scss" :showCopy="true" />

        <h3>Visual Examples</h3>
        <div>
          <h1 style="font-size: 2.5rem; font-weight: 700; line-height: 1.25; margin: 0.5rem 0;">
            Heading Level 1
          </h1>
          <h2 style="font-size: 2rem; font-weight: 700; line-height: 1.25; margin: 0.5rem 0;">
            Heading Level 2
          </h2>
          <h3 style="font-size: 1.5rem; font-weight: 700; line-height: 1.25; margin: 0.5rem 0;">
            Heading Level 3
          </h3>
        </div>
      </div>
    `,
  }),
};
```

### Key Elements

1. **Mixin Definition** - Full mixin code
2. **Parameters** - Documentation of parameters
3. **Usage Examples** - How to include the mixin
4. **Generated CSS** - Output after compilation
5. **Visual Comparison** - Before/after demonstration

---

## Tool Stories

### Purpose

Interactive tools for developers (contrast checkers, calculators, etc.).

### Template

```typescript
// ContrastChecker.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import ContrastChecker from '../../.storybook/components/ContrastChecker.vue';

const meta: Meta = {
  title: 'Accessibility/Contrast Checker',
  parameters: {
    docs: {
      description: {
        component: `
# WCAG Contrast Checker

Interactive tool to check color contrast ratios and WCAG compliance.

## WCAG Requirements

- **AA Normal Text**: 4.5:1
- **AA Large Text**: 3:1
- **AAA Normal Text**: 7:1
- **AAA Large Text**: 4.5:1
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { ContrastChecker },
    template: '<ContrastChecker :showPickers="true" targetLevel="AA" />',
  }),
};

export const PrimaryOnWhite: Story = {
  render: () => ({
    components: { ContrastChecker },
    template: '<ContrastChecker foreground="#0059b3" background="#ffffff" />',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Primary color on white background - meets WCAG AA standards.',
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => ({
    components: { ContrastChecker },
    template: '<ContrastChecker foreground="#ffffff" background="#1a1a1a" />',
  }),
  parameters: {
    docs: {
      description: {
        story: 'White text on dark background - meets WCAG AAA standards.',
      },
    },
  },
};
```

### Key Elements

1. **Interactive Tool** - Fully functional component
2. **Documentation** - Guidelines and standards
3. **Preset Examples** - Common color combinations
4. **Real-Time Feedback** - Immediate validation

---

## Example Stories

### Purpose

Real-world implementation examples showing best practices.

### Template

```typescript
// ComponentTheming.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CodeBlock from '../../.storybook/components/CodeBlock.vue';

const meta: Meta = {
  title: 'Examples/Component Theming',
  parameters: {
    docs: {
      description: {
        component: `
# Component Theming Example

This example demonstrates how to theme a button component using design tokens.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemedButton: Story = {
  render: () => ({
    components: { CodeBlock },
    setup() {
      const scssCode = `
@use '@ipeeon/design-tokens' as tokens;

.themed-button {
  // Typography
  @include tokens.font-base();
  font-weight: tokens.font-weight('medium');

  // Colors
  color: tokens.getColorValue('text-primary');
  background-color: tokens.getColor('primary');

  // Spacing
  padding: tokens.spacing('sm') tokens.spacing('md');

  // Border
  border: none;
  border-radius: tokens.radius('md');

  // Transitions
  transition: all tokens.transition-duration('normal') tokens.transition-timing('ease');

  &:hover {
    background-color: tokens.getColor('primary', 600);
    box-shadow: tokens.shadow('md');
  }

  &:focus {
    outline: 2px solid tokens.getColor('primary', 300);
    outline-offset: 2px;
  }
}
      `.trim();

      return { scssCode };
    },
    template: `
      <div>
        <h3>SCSS Implementation</h3>
        <CodeBlock :code="scssCode" language="scss" :showCopy="true" />

        <h3>Live Example</h3>
        <button style="
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          background-color: #0059b3;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        ">
          Themed Button
        </button>
      </div>
    `,
  }),
};
```

### Key Elements

1. **Complete Code** - Full working implementation
2. **Best Practices** - Proper token usage
3. **Live Demo** - Interactive example
4. **Explanations** - Why choices were made

---

## MDX Documentation

### Purpose

Narrative documentation providing context and guidance.

### Template

```mdx
<!-- Welcome.mdx -->

import { Meta } from '@storybook/blocks';

<Meta title="Introduction/Welcome" />

# Welcome to Haspen UI Design Tokens

The Haspen UI design system provides a comprehensive set of design tokens for building consistent,
accessible web applications.

## What are Design Tokens?

Design tokens are the visual design atoms of the design system. They store visual design attributes
such as:

- **Colors**: Brand colors, semantic colors, and color palettes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale for layouts
- **Shadows**: Elevation and depth through shadows
- **Border Radius**: Consistent corner rounding
- **Transitions**: Animation timing and easing functions

## Why Use Design Tokens?

### Consistency

Design tokens ensure visual consistency across your entire application.

### Maintainability

Update once, apply everywhere. Change a token value and see it reflected throughout your app.

### Accessibility

Built-in WCAG compliance with proper contrast ratios and semantic colors.

### Type Safety

TypeScript definitions provide autocomplete and type checking.

## Getting Started

1. [Install the package](?path=/docs/introduction-installation--docs)
2. [Learn basic usage](?path=/docs/introduction-usage--docs)
3. [Explore color tokens](?path=/docs/foundation-colors--docs)
4. [View examples](?path=/docs/examples-component-theming--docs)

## Package Features

- 🎨 **10-shade color palettes** - Comprehensive color system
- 📝 **Typography scale** - Harmonious font sizing
- 📏 **Spacing system** - Consistent spacing tokens
- ♿ **Accessibility built-in** - WCAG-compliant by default
- 🔧 **SCSS functions & mixins** - Powerful styling utilities
- 🎯 **TypeScript API** - Full type safety
- 🚀 **CSS custom properties** - Modern CSS support
- ⚡ **Registered properties** - Enhanced performance

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

We welcome contributions! See the [Contributing Guide](?path=/docs/introduction-contributing--docs)
for details.

## License

MIT License - see LICENSE file for details.
```

### Key Elements

1. **Clear Title** - Descriptive and hierarchical
2. **Introduction** - What and why
3. **Feature List** - Key capabilities
4. **Navigation** - Links to other docs
5. **Visual Elements** - Images, diagrams, callouts

---

## Best Practices

### General Guidelines

1. **Consistency** - Follow the same patterns across all stories
2. **Completeness** - Document all features and edge cases
3. **Clarity** - Use clear, concise language
4. **Examples** - Always provide working code examples
5. **Accessibility** - Include accessibility information
6. **Interactive** - Make examples interactive where possible

### Code Examples

```typescript
// Good ✓
const goodExample = `
@use '@ipeeon/design-tokens' as tokens;

.button {
  color: tokens.getColor('primary');
}
`.trim();

// Bad ✗
const badExample = `
.button {
  color: #0059b3; // Hard-coded color
}
`.trim();
```

### Visual Examples

Always show:

- Before/after comparisons
- Live, rendered examples
- Multiple variants
- Edge cases

### Documentation

Include:

- Clear descriptions
- Parameter documentation
- Return value information
- Usage examples
- Browser compatibility notes
- Accessibility considerations

---

## Tools and Utilities

### Syntax Highlighting

Use CodeBlock component with proper language:

- `typescript` for TS/JS code
- `scss` for SCSS code
- `css` for CSS output
- `html` for HTML markup
- `vue` for Vue SFCs

### Interactive Controls

Use Storybook controls for:

- String inputs
- Number sliders
- Boolean toggles
- Select dropdowns
- Color pickers

### Live Previews

Always include live, rendered previews:

- Real HTML/CSS
- Actual token values
- Interactive elements
- Responsive behavior

---

## Next Steps

1. Review these templates
2. Start with token stories (Phase 1)
3. Move to function stories (Phase 2)
4. Create tool stories (Phase 3)
5. Build example stories (Phase 4)

## Questions?

Contact the design system team for clarification or guidance.

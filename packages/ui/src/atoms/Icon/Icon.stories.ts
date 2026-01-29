import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Icon from './Icon.vue';
import IconProvider from './IconProvider.vue';
import { haspenIcons } from './libraries';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
# Icon System

A flexible, configurable icon system that supports multiple icon libraries including Heroicons, Lucide, and custom SVG components.

## Features

- **Multiple Libraries**: Support for Heroicons, Lucide, and custom icons
- **Provider Pattern**: Configure icons at app or component level
- **Accessibility**: ARIA attributes and screen reader support
- **Tree Shaking**: Only bundle icons you actually use
- **TypeScript**: Full type safety and IntelliSense
- **Performance**: Lightweight with minimal runtime overhead

## Quick Start

\`\`\`vue
<template>
  <IconProvider :icons="haspenIcons">
    <Icon name="sun" :size="24" />
    <Icon name="moon" :size="24" />
  </IconProvider>
</template>

<script setup>
import { Icon, IconProvider, haspenIcons } from '@ipeeon/ui';
</script>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(haspenIcons),
      description: 'Name of the icon to display',
    },
    size: {
      control: { type: 'range', min: 8, max: 96, step: 4 },
      description: 'Size of the icon in pixels',
    },
    ariaHidden: {
      control: 'boolean',
      description: 'Hide from screen readers (decorative icons)',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
  decorators: [
    story => ({
      components: { story, IconProvider },
      setup() {
        return { haspenIcons };
      },
      template: `
        <IconProvider :icons="haspenIcons">
          <story />
        </IconProvider>
      `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    name: 'sun',
    size: 24,
  },
};

export const AllSizes: Story = {
  render: args => ({
    components: { Icon, IconProvider },
    setup() {
      return { args, haspenIcons };
    },
    template: `
      <IconProvider :icons="haspenIcons">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <Icon v-bind="args" :size="16" />
          <Icon v-bind="args" :size="20" />
          <Icon v-bind="args" :size="24" />
          <Icon v-bind="args" :size="32" />
          <Icon v-bind="args" :size="48" />
          <Icon v-bind="args" :size="64" />
        </div>
      </IconProvider>
    `,
  }),
  args: {
    name: 'sun',
  },
};

export const AllIcons: Story = {
  render: () => ({
    components: { Icon, IconProvider },
    setup() {
      const iconNames = Object.keys(haspenIcons);
      return { haspenIcons, iconNames };
    },
    template: `
      <IconProvider :icons="haspenIcons">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; padding: 1rem;">
          <div v-for="iconName in iconNames" :key="iconName" 
               style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <Icon :name="iconName" :size="32" />
            <code style="font-size: 0.75rem; text-align: center;">{{ iconName }}</code>
          </div>
        </div>
      </IconProvider>
    `,
  }),
};

// Accessibility Examples
export const AccessibilityDecorative: Story = {
  render: args => ({
    components: { Icon, IconProvider },
    setup() {
      return { args, haspenIcons };
    },
    template: `
      <IconProvider :icons="haspenIcons">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Icon v-bind="args" :aria-hidden="true" />
          <span>Decorative icon (hidden from screen readers)</span>
        </div>
      </IconProvider>
    `,
  }),
  args: {
    name: 'sun',
    size: 20,
    ariaHidden: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icons that are purely decorative should have `aria-hidden="true"`.',
      },
    },
  },
};

export const AccessibilitySemantic: Story = {
  render: args => ({
    components: { Icon, IconProvider },
    setup() {
      return { args, haspenIcons };
    },
    template: `
      <IconProvider :icons="haspenIcons">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer;">
            <Icon name="sun" :size="20" :aria-hidden="false" aria-label="Switch to light mode" />
            <span>Light Mode</span>
          </button>
          
          <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer;">
            <Icon name="moon" :size="20" :aria-hidden="false" aria-label="Switch to dark mode" />
            <span>Dark Mode</span>
          </button>
        </div>
      </IconProvider>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Icons with semantic meaning should have appropriate `aria-label` attributes.',
      },
    },
  },
};

// Advanced Usage
export const WithoutProvider: Story = {
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
      <div>
        <p>⚠️ This will show a warning in the console:</p>
        <Icon v-bind="args" />
      </div>
    `,
  }),
  args: {
    name: 'sun',
    size: 24,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icons used without an IconProvider will show console warnings and may not render properly.',
      },
    },
  },
};

export const CustomPrefix: Story = {
  render: args => ({
    components: { Icon, IconProvider },
    setup() {
      return { args, haspenIcons };
    },
    template: `
      <IconProvider :icons="haspenIcons" prefix="my-app">
        <div style="display: flex; gap: 1rem;">
          <Icon v-bind="args" />
          <p>Check the DOM - icon has <code>my-app-sun</code> class</p>
        </div>
      </IconProvider>
    `,
  }),
  args: {
    name: 'sun',
    size: 24,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the `prefix` prop on IconProvider to add custom CSS classes for styling.',
      },
    },
  },
};

export const LibraryConfiguration: Story = {
  render: () => ({
    components: { Icon, IconProvider },
    setup() {
      return { haspenIcons };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin: 0 0 1rem 0;">Custom Icons (Default)</h3>
          <IconProvider :icons="haspenIcons" library="custom">
            <div style="display: flex; gap: 1rem;">
              <Icon name="sun" :size="24" />
              <Icon name="moon" :size="24" />
            </div>
          </IconProvider>
        </div>
        
        <div>
          <h3 style="margin: 0 0 1rem 0;">External Libraries</h3>
          <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
            <p style="margin: 0; color: #6b7280;">
              External libraries like Heroicons and Lucide need to be installed separately:
            </p>
            <code style="display: block; margin-top: 0.5rem; padding: 0.5rem; background: white; border-radius: 4px;">
              pnpm add @heroicons/vue lucide-vue-next
            </code>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'The icon system can be configured to use different icon libraries. External libraries require separate installation.',
      },
    },
  },
};

// Performance Examples
export const TreeShaking: Story = {
  render: () => ({
    template: `
      <div style="padding: 1rem; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px;">
        <h3 style="margin: 0 0 1rem 0; color: #0369a1;">🌳 Tree Shaking</h3>
        <p style="margin: 0; color: #075985;">
          Only icons you actually use are included in your bundle. The icon system automatically tree-shakes unused icons.
        </p>
        
        <details style="margin-top: 1rem;">
          <summary style="cursor: pointer; font-weight: 500; color: #0369a1;">Bundle Analysis Example</summary>
          <pre style="margin: 0.5rem 0 0 0; padding: 1rem; background: white; border-radius: 4px; overflow-x: auto; font-size: 0.875rem;"><code># Icons used in your app:
import { Icon, IconProvider, haspenIcons } from '@ipeeon/ui';

# Only these icons will be in your bundle:
✅ SunIcon.vue (2.1KB)
✅ MoonIcon.vue (1.8KB)
❌ Other unused icons (0KB)</code></pre>
        </details>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'The icon system is designed for optimal bundle size with automatic tree shaking.',
      },
    },
  },
};

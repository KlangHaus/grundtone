import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Button from './Button.vue';
import Icon from '../Icon/Icon.vue';
import IconProvider from '../Icon/IconProvider.vue';
import { haspenIcons } from '../Icon/libraries';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
# Button Component

A versatile button component with multiple variants, sizes, and states for consistent user interactions.

## Features

- **Multiple Variants**: Primary, secondary, outline, and ghost styles
- **Loading States**: Built-in loading spinner with proper accessibility
- **Icon Support**: Icons before/after text or icon-only buttons
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support with focus management
- **Responsive**: Scales appropriately across different screen sizes

## Usage

\`\`\`vue
<template>
  <Button variant="primary" size="md" @click="handleClick">
    Click Me
  </Button>
</template>

<script setup>
import { Button } from '@ipeeon/ui';

const handleClick = () => {
  // Button click handler - add your application logic here
};
</script>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner and disable interactions',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button completely',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
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

// Basic Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Outline Button</Button>',
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Ghost Button</Button>',
  }),
};

// Size Variants
export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons are available in three sizes: small, medium (default), and large.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants with consistent styling.',
      },
    },
  },
};

// Loading States
export const LoadingStates: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary" :loading="true">Loading Primary</Button>
          <Button variant="secondary" :loading="true">Loading Secondary</Button>
          <Button variant="outline" :loading="true">Loading Outline</Button>
          <Button variant="ghost" :loading="true">Loading Ghost</Button>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button size="sm" :loading="true">Small Loading</Button>
          <Button size="md" :loading="true">Medium Loading</Button>
          <Button size="lg" :loading="true">Large Loading</Button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Loading states disable the button and show a loading spinner. The button maintains its size and is properly announced to screen readers.',
      },
    },
  },
};

export const LoadingInteractive: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const loading = ref(false);

      const handleClick = async () => {
        loading.value = true;
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 2000));
        loading.value = false;
      };

      return { loading, handleClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <Button variant="primary" :loading="loading" @click="handleClick">
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </Button>
        <p style="color: #6b7280; font-size: 0.875rem;">
          Click the button to see the loading state in action
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing how loading states work in practice. The button shows feedback during async operations.',
      },
    },
  },
};

// Icon Combinations
export const WithIcons: Story = {
  render: () => ({
    components: { Button, Icon },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary">
            <Icon name="sun" :size="16" style="margin-right: 0.5rem;" />
            With Icon Left
          </Button>
          
          <Button variant="secondary">
            Settings
            <Icon name="moon" :size="16" style="margin-left: 0.5rem;" />
          </Button>
          
          <Button variant="outline">
            <Icon name="sun" :size="16" style="margin-right: 0.5rem;" />
            Icon + Text
            <Icon name="moon" :size="16" style="margin-left: 0.5rem;" />
          </Button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons can include icons before, after, or on both sides of the text content.',
      },
    },
  },
};

export const IconOnlyButtons: Story = {
  render: () => ({
    components: { Button, Icon },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary" aria-label="Toggle light mode" style="padding: 0.5rem;">
            <Icon name="sun" :size="20" aria-hidden="true" />
          </Button>
          
          <Button variant="secondary" aria-label="Toggle dark mode" style="padding: 0.5rem;">
            <Icon name="moon" :size="20" aria-hidden="true" />
          </Button>
          
          <Button variant="outline" aria-label="Settings" style="padding: 0.5rem;">
            <Icon name="sun" :size="20" aria-hidden="true" />
          </Button>
          
          <Button variant="ghost" aria-label="Close" style="padding: 0.25rem;">
            <Icon name="moon" :size="16" aria-hidden="true" />
          </Button>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button size="sm" aria-label="Small icon button" style="padding: 0.25rem;">
            <Icon name="sun" :size="14" aria-hidden="true" />
          </Button>
          
          <Button size="md" aria-label="Medium icon button" style="padding: 0.5rem;">
            <Icon name="moon" :size="16" aria-hidden="true" />
          </Button>
          
          <Button size="lg" aria-label="Large icon button" style="padding: 0.75rem;">
            <Icon name="sun" :size="20" aria-hidden="true" />
          </Button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only buttons must include aria-label for accessibility. Icons should be marked as aria-hidden="true".',
      },
    },
  },
};

export const IconWithLoading: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const loadingStates = ref({
        save: false,
        delete: false,
        refresh: false,
      });

      const handleAction = async (action: keyof typeof loadingStates.value) => {
        loadingStates.value[action] = true;
        await new Promise(resolve => setTimeout(resolve, 2000));
        loadingStates.value[action] = false;
      };

      return { loadingStates, handleAction };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <Button 
          variant="primary" 
          :loading="loadingStates.save"
          @click="handleAction('save')"
        >
          <Icon v-if="!loadingStates.save" name="sun" :size="16" style="margin-right: 0.5rem;" />
          {{ loadingStates.save ? 'Saving...' : 'Save Changes' }}
        </Button>
        
        <Button 
          variant="outline" 
          :loading="loadingStates.delete"
          @click="handleAction('delete')"
        >
          <Icon v-if="!loadingStates.delete" name="moon" :size="16" style="margin-right: 0.5rem;" />
          {{ loadingStates.delete ? 'Deleting...' : 'Delete Item' }}
        </Button>
        
        <Button 
          variant="ghost" 
          :loading="loadingStates.refresh"
          @click="handleAction('refresh')"
          aria-label="Refresh data"
          style="padding: 0.5rem;"
        >
          <Icon v-if="!loadingStates.refresh" name="sun" :size="16" />
        </Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Icons can be combined with loading states. Icons are hidden during loading to show the spinner.',
      },
    },
  },
};

// State Combinations
export const Disabled: Story = {
  render: () => ({
    components: { Button, Icon },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary" :disabled="true">Disabled Primary</Button>
          <Button variant="secondary" :disabled="true">Disabled Secondary</Button>
          <Button variant="outline" :disabled="true">Disabled Outline</Button>
          <Button variant="ghost" :disabled="true">Disabled Ghost</Button>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary" :disabled="true">
            <Icon name="sun" :size="16" style="margin-right: 0.5rem;" />
            Disabled with Icon
          </Button>
          
          <Button variant="outline" :disabled="true" aria-label="Disabled icon button" style="padding: 0.5rem;">
            <Icon name="moon" :size="16" />
          </Button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled buttons are not interactive and are properly announced to assistive technologies.',
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { Button, Icon },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Semantic Button Usage</h3>
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <Button variant="primary" type="submit">Submit Form</Button>
            <Button variant="secondary" type="button">Cancel</Button>
            <Button variant="outline" type="reset">Reset Form</Button>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Icon-Only Buttons (Accessible)</h3>
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <Button variant="primary" aria-label="Toggle light theme" style="padding: 0.5rem;">
              <Icon name="sun" :size="16" aria-hidden="true" />
            </Button>
            
            <Button variant="secondary" aria-label="Toggle dark theme" style="padding: 0.5rem;">
              <Icon name="moon" :size="16" aria-hidden="true" />
            </Button>
            
            <Button variant="ghost" aria-label="Close dialog" style="padding: 0.25rem;">
              <Icon name="sun" :size="14" aria-hidden="true" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Loading States (Accessible)</h3>
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <Button variant="primary" :loading="true" aria-describedby="save-status">
              Save Changes
            </Button>
            <Button variant="secondary" :loading="true">
              <Icon name="sun" :size="16" style="margin-right: 0.5rem;" />
              Processing...
            </Button>
          </div>
          <p id="save-status" style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
            Loading buttons are announced as "busy" to screen readers
          </p>
        </div>
        
        <div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Focus Management</h3>
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <Button variant="primary">First Button</Button>
            <Button variant="secondary">Second Button</Button>
            <Button variant="outline">Third Button</Button>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
            Try using Tab to navigate between buttons. Focus is clearly visible.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive accessibility examples showing proper ARIA usage, focus management, and semantic button types.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const message = ref('');
      const showMessage = (text: string) => {
        message.value = text;
        setTimeout(() => (message.value = ''), 2000);
      };

      return { message, showMessage };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 400px;">
          <Button variant="primary" @click="showMessage('Button 1 clicked')">Button 1</Button>
          <Button variant="secondary" @click="showMessage('Button 2 clicked')">Button 2</Button>
          <Button variant="outline" @click="showMessage('Button 3 clicked')">Button 3</Button>
          <Button variant="ghost" @click="showMessage('Button 4 clicked')">Button 4</Button>
          <Button variant="primary" :disabled="true">Disabled</Button>
          <Button variant="secondary" :loading="true">Loading</Button>
        </div>
        
        <div v-if="message" style="padding: 0.75rem; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; color: #0369a1;">
          {{ message }}
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Keyboard Navigation:</h4>
          <ul style="margin: 0; padding-left: 1rem; font-size: 0.875rem; color: #6b7280;">
            <li><kbd>Tab</kbd> - Navigate between buttons</li>
            <li><kbd>Shift + Tab</kbd> - Navigate backwards</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Activate button</li>
            <li>Disabled/loading buttons are skipped</li>
          </ul>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive keyboard navigation demo. All buttons support standard keyboard interactions and focus management.',
      },
    },
  },
};

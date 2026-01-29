import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Design Tokens/Semantic Colors',
  parameters: {
    docs: {
      description: {
        component: `
# Semantic Color System

A comprehensive semantic color mapping system that connects business intent and component states to our color palette. This system ensures consistent color usage across all components while maintaining accessibility standards.

## Key Features

- **Business Intent Colors**: High-level semantic colors for brand, success, error, warning, info, and neutral contexts
- **Component State Mappings**: Predefined color schemes for buttons, inputs, surfaces, and alerts
- **Contextual Variations**: Light, medium, and dark context adaptations
- **Accessibility Integration**: Automatic accessible text color selection and contrast validation
- **Utility Mixins**: Easy-to-use mixins for applying semantic color schemes

## Business Intent Colors

Core semantic colors that represent business intent:
- **Brand**: Primary brand colors for main actions and emphasis
- **Success**: Positive states, completion, and success messages
- **Warning**: Cautionary content and important notices  
- **Error**: Error states and destructive actions
- **Info**: Informational content and help text
- **Neutral**: Secondary actions and neutral content

## Component State System

Comprehensive state mappings for interactive components:
- **Button States**: Primary, secondary, and destructive variants with hover/focus/active/disabled states
- **Input States**: Default, focus, error, and disabled states with proper borders and backgrounds
- **Surface States**: Default, elevated, and interactive surface variations
- **Alert States**: Success, warning, error, and info alert styling

## Usage Examples

### SASS Functions

\`\`\`scss
// Business intent colors
.success-banner {
  background-color: business-intent('success');
  color: accessible-text(business-intent('success'));
}

// Component state colors
.primary-button {
  background-color: component-state('button', 'primary', 'default');
  
  &:hover {
    background-color: component-state('button', 'primary', 'hover');
  }
}

// Complete component schemes with accessibility
.button-primary {
  $scheme: component-scheme('button', 'primary');
  background-color: map.get($scheme, 'background');
  color: map.get($scheme, 'text');
  border-color: map.get($scheme, 'border');
  
  // Contrast ratio: map.get($scheme, 'contrast-ratio')
  // Accessible: map.get($scheme, 'accessible')
}
\`\`\`

### Utility Mixins

\`\`\`scss
// Apply business intent styling
.success-message {
  @include business-intent-colors('success', true); // includes hover
}

// Apply complete component color scheme
.primary-button {
  @include component-colors('button', 'primary'); // includes all states
}

// Apply alert styling
.error-alert {
  @include alert-colors('error');
}

// Apply contextual colors for different backgrounds
.dark-section {
  @include contextual-colors('dark-context');
}
\`\`\`

## Accessibility Features

- Automatic text color selection based on background luminance
- WCAG AA compliance validation (4.5:1 contrast ratio)
- Contrast ratio calculation and reporting
- Accessibility warnings for non-compliant color combinations
- Integration with the accessibility function library

## Contextual Adaptations

The system provides three context variations:
- **Light Context**: For light backgrounds and standard layouts
- **Medium Context**: For medium-toned backgrounds and cards
- **Dark Context**: For dark backgrounds and overlays

Each context automatically adjusts text colors, action colors, borders, and dividers for optimal contrast and readability.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Business Intent Colors Display
const BusinessIntentColors = {
  template: `
    <div>
      <h2>Business Intent Colors</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div 
          v-for="intent in businessIntents" 
          :key="intent.name"
          :style="{
            backgroundColor: intent.color,
            color: intent.textColor,
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e5e5',
            textAlign: 'center'
          }"
        >
          <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">{{ intent.name }}</div>
          <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.5rem;">{{ intent.color }}</div>
          <div style="font-size: 0.75rem; opacity: 0.8;">{{ intent.usage }}</div>
        </div>
      </div>
      
      <h3>Intent Variations</h3>
      <div v-for="intent in intentVariations" :key="intent.name" style="margin-bottom: 1.5rem;">
        <h4>{{ intent.name }}</h4>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <div 
            v-for="variation in intent.variations" 
            :key="variation.name"
            :style="{
              backgroundColor: variation.color,
              color: variation.textColor,
              padding: '0.75rem 1rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }"
          >
            {{ variation.name }}
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const businessIntents = [
      {
        name: 'Brand',
        color: '#2563eb',
        textColor: '#ffffff',
        usage: 'Primary brand actions and emphasis',
      },
      {
        name: 'Success',
        color: '#16a34a',
        textColor: '#ffffff',
        usage: 'Positive states and completion',
      },
      {
        name: 'Warning',
        color: '#f59e0b',
        textColor: '#ffffff',
        usage: 'Cautionary content and notices',
      },
      {
        name: 'Error',
        color: '#dc2626',
        textColor: '#ffffff',
        usage: 'Error states and destructive actions',
      },
      {
        name: 'Info',
        color: '#3b82f6',
        textColor: '#ffffff',
        usage: 'Informational content and help',
      },
      {
        name: 'Neutral',
        color: '#525252',
        textColor: '#ffffff',
        usage: 'Secondary actions and neutral content',
      },
    ];

    const intentVariations = [
      {
        name: 'Brand Variations',
        variations: [
          { name: 'Light', color: '#3b82f6', textColor: '#ffffff' },
          { name: 'Default', color: '#2563eb', textColor: '#ffffff' },
          { name: 'Dark', color: '#1d4ed8', textColor: '#ffffff' },
        ],
      },
      {
        name: 'Success Variations',
        variations: [
          { name: 'Light', color: '#22c55e', textColor: '#ffffff' },
          { name: 'Default', color: '#16a34a', textColor: '#ffffff' },
          { name: 'Dark', color: '#15803d', textColor: '#ffffff' },
        ],
      },
      {
        name: 'Error Variations',
        variations: [
          { name: 'Light', color: '#ef4444', textColor: '#ffffff' },
          { name: 'Default', color: '#dc2626', textColor: '#ffffff' },
          { name: 'Dark', color: '#b91c1c', textColor: '#ffffff' },
        ],
      },
    ];

    return {
      businessIntents,
      intentVariations,
    };
  },
};

const ComponentStates = {
  template: `
    <div>
      <h2>Component State Colors</h2>
      
      <div style="margin-bottom: 2rem;">
        <h3>Button States</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div v-for="variant in buttonVariants" :key="variant.name" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <h4 style="margin: 0; font-size: 0.875rem; color: #666;">{{ variant.name }}</h4>
            <div style="display: flex; gap: 0.25rem;">
              <button 
                v-for="state in variant.states" 
                :key="state.name"
                :style="{
                  backgroundColor: state.bg,
                  color: state.text,
                  border: \`1px solid \${state.border || state.bg}\`,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  cursor: state.name === 'Disabled' ? 'not-allowed' : 'pointer',
                  opacity: state.name === 'Disabled' ? 0.6 : 1
                }"
                :disabled="state.name === 'Disabled'"
              >
                {{ state.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Input States</h3>
        <div style="display: grid; gap: 1rem; max-width: 300px;">
          <input 
            v-for="state in inputStates" 
            :key="state.name"
            :placeholder="state.name"
            :style="{
              backgroundColor: state.bg,
              color: state.text,
              border: \`2px solid \${state.border}\`,
              padding: '0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              outline: state.outline ? \`0 0 0 3px \${state.outline}\` : 'none'
            }"
            :disabled="state.name === 'Disabled'"
          />
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Alert States</h3>
        <div style="display: grid; gap: 1rem;">
          <div 
            v-for="alert in alertStates" 
            :key="alert.name"
            :style="{
              backgroundColor: alert.bg,
              color: alert.text,
              border: \`1px solid \${alert.border}\`,
              padding: '1rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }"
          >
            <div 
              :style="{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: alert.icon,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }"
            >
              {{ alert.iconText }}
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ alert.name }} Alert</div>
              <div style="font-size: 0.875rem;">This is a {{ alert.name.toLowerCase() }} message with appropriate semantic colors.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const buttonVariants = [
      {
        name: 'Primary',
        states: [
          { name: 'Default', bg: '#2563eb', text: '#ffffff' },
          { name: 'Hover', bg: '#1d4ed8', text: '#ffffff' },
          { name: 'Active', bg: '#1e40af', text: '#ffffff' },
          { name: 'Disabled', bg: '#d4d4d4', text: '#a3a3a3' },
        ],
      },
      {
        name: 'Secondary',
        states: [
          {
            name: 'Default',
            bg: '#f5f5f5',
            text: '#171717',
            border: '#e5e5e5',
          },
          { name: 'Hover', bg: '#e5e5e5', text: '#171717' },
          { name: 'Active', bg: '#d4d4d4', text: '#171717' },
          { name: 'Disabled', bg: '#fafafa', text: '#a3a3a3' },
        ],
      },
      {
        name: 'Destructive',
        states: [
          { name: 'Default', bg: '#dc2626', text: '#ffffff' },
          { name: 'Hover', bg: '#b91c1c', text: '#ffffff' },
          { name: 'Active', bg: '#991b1b', text: '#ffffff' },
          { name: 'Disabled', bg: '#d4d4d4', text: '#a3a3a3' },
        ],
      },
    ];

    const inputStates = [
      { name: 'Default', bg: '#ffffff', text: '#171717', border: '#d4d4d4' },
      {
        name: 'Focus',
        bg: '#ffffff',
        text: '#171717',
        border: '#2563eb',
        outline: 'rgba(37, 99, 235, 0.2)',
      },
      {
        name: 'Error',
        bg: '#ffffff',
        text: '#171717',
        border: '#dc2626',
        outline: 'rgba(220, 38, 38, 0.2)',
      },
      { name: 'Disabled', bg: '#fafafa', text: '#a3a3a3', border: '#e5e5e5' },
    ];

    const alertStates = [
      {
        name: 'Success',
        bg: '#dcfce7',
        text: '#166534',
        border: '#86efac',
        icon: '#16a34a',
        iconText: '✓',
      },
      {
        name: 'Warning',
        bg: '#fef3c7',
        text: '#92400e',
        border: '#fcd34d',
        icon: '#f59e0b',
        iconText: '!',
      },
      {
        name: 'Error',
        bg: '#fee2e2',
        text: '#991b1b',
        border: '#fca5a5',
        icon: '#dc2626',
        iconText: '✕',
      },
      {
        name: 'Info',
        bg: '#dbeafe',
        text: '#1e40af',
        border: '#93c5fd',
        icon: '#3b82f6',
        iconText: 'i',
      },
    ];

    return {
      buttonVariants,
      inputStates,
      alertStates,
    };
  },
};

const ContextualColors = {
  template: `
    <div>
      <h2>Contextual Color Variations</h2>
      <div style="display: grid; gap: 2rem;">
        <div v-for="context in contexts" :key="context.name">
          <h3>{{ context.name }}</h3>
          <div 
            :style="{
              backgroundColor: context.bg,
              color: context.colors.primaryText,
              padding: '2rem',
              borderRadius: '0.5rem',
              border: context.border ? \`1px solid \${context.border}\` : 'none'
            }"
          >
            <h4 style="margin: 0 0 1rem 0; font-size: 1.25rem;">Sample Content</h4>
            <p style="margin: 0 0 1rem 0;">
              This is primary text content in {{ context.name.toLowerCase() }}.
            </p>
            <p 
              :style="{ 
                margin: '0 0 1rem 0',
                color: context.colors.secondaryText 
              }"
            >
              This is secondary text content with reduced emphasis.
            </p>
            <p 
              :style="{ 
                margin: '0 0 1.5rem 0',
                color: context.colors.tertiaryText 
              }"
            >
              This is tertiary text content with minimal emphasis.
            </p>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
              <button 
                :style="{
                  backgroundColor: context.colors.primaryAction,
                  color: context.actionTextColor,
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }"
              >
                Primary Action
              </button>
              <button 
                :style="{
                  backgroundColor: 'transparent',
                  color: context.colors.secondaryAction,
                  border: \`1px solid \${context.colors.border}\`,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }"
              >
                Secondary Action
              </button>
            </div>
            
            <hr 
              :style="{
                border: 'none',
                borderTop: \`1px solid \${context.colors.divider}\`,
                margin: '1rem 0'
              }"
            />
            
            <div 
              :style="{
                border: \`1px solid \${context.colors.border}\`,
                padding: '1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }"
            >
              This is a bordered container using contextual border colors.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const contexts = [
      {
        name: 'Light Context',
        bg: '#ffffff',
        border: '#e5e5e5',
        actionTextColor: '#ffffff',
        colors: {
          primaryText: '#171717',
          secondaryText: '#404040',
          tertiaryText: '#737373',
          primaryAction: '#2563eb',
          secondaryAction: '#525252',
          border: '#e5e5e5',
          divider: '#e5e5e5',
        },
      },
      {
        name: 'Medium Context',
        bg: '#f5f5f5',
        border: '#d4d4d4',
        actionTextColor: '#ffffff',
        colors: {
          primaryText: '#171717',
          secondaryText: '#404040',
          tertiaryText: '#737373',
          primaryAction: '#3b82f6',
          secondaryAction: '#737373',
          border: '#d4d4d4',
          divider: '#d4d4d4',
        },
      },
      {
        name: 'Dark Context',
        bg: '#171717',
        actionTextColor: '#ffffff',
        colors: {
          primaryText: '#ffffff',
          secondaryText: 'rgba(255, 255, 255, 0.8)',
          tertiaryText: 'rgba(255, 255, 255, 0.6)',
          primaryAction: '#3b82f6',
          secondaryAction: '#d4d4d4',
          border: 'rgba(255, 255, 255, 0.2)',
          divider: 'rgba(255, 255, 255, 0.1)',
        },
      },
    ];

    return {
      contexts,
    };
  },
};

export const BusinessIntent: Story = {
  render: () => BusinessIntentColors,
  parameters: {
    docs: {
      source: {
        code: `
// Business Intent Color Usage
@use '@ipeeon/design-tokens' as tokens;

.success-message {
  @include tokens.business-intent-colors('success', true);
}

.brand-button {
  background-color: tokens.business-intent('brand');
  color: tokens.accessible-text(tokens.business-intent('brand'));
  
  &:hover {
    background-color: tokens.business-intent('brand-dark');
  }
}
        `,
      },
    },
  },
};

export const ComponentStatesDemo: Story = {
  render: () => ComponentStates,
  parameters: {
    docs: {
      source: {
        code: `
// Component State Color Usage
@use '@ipeeon/design-tokens' as tokens;

.primary-button {
  @include tokens.component-colors('button', 'primary');
}

.form-input {
  background-color: tokens.component-state('input', 'default', 'background');
  border-color: tokens.component-state('input', 'default', 'border');
  
  &:focus {
    border-color: tokens.component-state('input', 'focus', 'border');
    outline: 0 0 0 3px tokens.component-state('input', 'focus', 'outline');
  }
}

.error-alert {
  @include tokens.alert-colors('error');
}
        `,
      },
    },
  },
};

export const ContextualVariations: Story = {
  render: () => ContextualColors,
  parameters: {
    docs: {
      source: {
        code: `
// Contextual Color Usage  
@use '@ipeeon/design-tokens' as tokens;

.light-section {
  @include tokens.contextual-colors('light-context');
}

.dark-section {
  @include tokens.contextual-colors('dark-context');
  
  .custom-text {
    color: tokens.contextual('dark-context', 'secondary-text');
  }
}
        `,
      },
    },
  },
};

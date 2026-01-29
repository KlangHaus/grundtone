import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ThemeProvider from './ThemeProvider.vue';
import { useTheme } from '@ipeeon/composables';
import type { ThemeMode } from '@ipeeon/core';

// Demo component to show theme usage
const ThemeDemo = {
  template: `
    <div style="padding: 2rem; font-family: var(--haspen-font-family-base);">
      <div style="
        background: var(--haspen-color-surface);
        padding: var(--haspen-spacing-lg);
        border-radius: var(--haspen-radius-md);
        box-shadow: var(--haspen-shadow-md);
        margin-bottom: var(--haspen-spacing-lg);
        border: 1px solid var(--haspen-color-border);
      ">
        <h2 style="
          color: var(--haspen-color-text);
          font-size: var(--haspen-font-size-2xl);
          font-weight: var(--haspen-font-weight-bold);
          margin: 0 0 var(--haspen-spacing-md) 0;
        ">
          Theme Demo
        </h2>
        
        <p style="
          color: var(--haspen-color-textSecondary);
          font-size: var(--haspen-font-size-base);
          margin: 0 0 var(--haspen-spacing-lg) 0;
        ">
          Current theme: <strong>{{ theme.mode }}</strong> ({{ isDark ? 'Dark' : 'Light' }} mode)
        </p>

        <div style="display: flex; gap: var(--haspen-spacing-sm); margin-bottom: var(--haspen-spacing-lg);">
          <button
            @click="setMode('light')"
            :style="{
              padding: 'var(--haspen-spacing-sm) var(--haspen-spacing-md)',
              backgroundColor: mode === 'light' ? 'var(--haspen-color-primary)' : 'var(--haspen-color-surface)',
              color: mode === 'light' ? '#ffffff' : 'var(--haspen-color-text)',
              border: '1px solid var(--haspen-color-border)',
              borderRadius: 'var(--haspen-radius-sm)',
              cursor: 'pointer',
              transition: 'all var(--haspen-transition-duration-fast) var(--haspen-transition-timing-ease)'
            }"
          >
            Light
          </button>
          
          <button
            @click="setMode('dark')"
            :style="{
              padding: 'var(--haspen-spacing-sm) var(--haspen-spacing-md)',
              backgroundColor: mode === 'dark' ? 'var(--haspen-color-primary)' : 'var(--haspen-color-surface)',
              color: mode === 'dark' ? '#ffffff' : 'var(--haspen-color-text)',
              border: '1px solid var(--haspen-color-border)',
              borderRadius: 'var(--haspen-radius-sm)',
              cursor: 'pointer',
              transition: 'all var(--haspen-transition-duration-fast) var(--haspen-transition-timing-ease)'
            }"
          >
            Dark
          </button>
          
          <button
            @click="setMode('auto')"
            :style="{
              padding: 'var(--haspen-spacing-sm) var(--haspen-spacing-md)',
              backgroundColor: mode === 'auto' ? 'var(--haspen-color-primary)' : 'var(--haspen-color-surface)',
              color: mode === 'auto' ? '#ffffff' : 'var(--haspen-color-text)',
              border: '1px solid var(--haspen-color-border)',
              borderRadius: 'var(--haspen-radius-sm)',
              cursor: 'pointer',
              transition: 'all var(--haspen-transition-duration-fast) var(--haspen-transition-timing-ease)'
            }"
          >
            Auto
          </button>
          
          <button
            @click="toggleMode"
            :style="{
              padding: 'var(--haspen-spacing-sm) var(--haspen-spacing-md)',
              backgroundColor: 'var(--haspen-color-secondary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--haspen-radius-sm)',
              cursor: 'pointer',
              transition: 'all var(--haspen-transition-duration-fast) var(--haspen-transition-timing-ease)'
            }"
          >
            Toggle
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--haspen-spacing-md);">
          <div v-for="color in colors" :key="color.name" style="
            padding: var(--haspen-spacing-md);
            border-radius: var(--haspen-radius-sm);
            border: 1px solid var(--haspen-color-border);
          " :style="{ backgroundColor: color.value }">
            <div style="font-weight: var(--haspen-font-weight-medium); margin-bottom: var(--haspen-spacing-xs);">
              {{ color.name }}
            </div>
            <div style="font-size: var(--haspen-font-size-sm); opacity: 0.8;">
              {{ color.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const { theme, mode, isDark, setMode, toggleMode } = useTheme();

    const colors = [
      { name: 'Primary', value: 'var(--haspen-color-primary)' },
      { name: 'Secondary', value: 'var(--haspen-color-secondary)' },
      { name: 'Success', value: 'var(--haspen-color-success)' },
      { name: 'Warning', value: 'var(--haspen-color-warning)' },
      { name: 'Error', value: 'var(--haspen-color-error)' },
      { name: 'Background', value: 'var(--haspen-color-background)' },
      { name: 'Surface', value: 'var(--haspen-color-surface)' },
      { name: 'Text', value: 'var(--haspen-color-text)' },
    ];

    return {
      theme,
      mode,
      isDark,
      setMode,
      toggleMode,
      colors,
    };
  },
};

const meta: Meta<typeof ThemeProvider> = {
  title: 'Molecules/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component: `
ThemeProvider component that initializes and provides theme context throughout the application.

## Features
- Light/Dark/Auto theme modes
- CSS custom properties for consistent styling
- localStorage persistence
- System preference detection
- Smooth transitions between themes
- SSR-compatible with fallback styles
- Vue 3 provide/inject pattern

## Usage
Wrap your app with ThemeProvider and use the \`useTheme\` composable in child components to access theme state and controls.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Initial theme mode',
    },
    enableTransitions: {
      control: { type: 'boolean' },
      description: 'Enable smooth transitions between themes',
    },
    persistMode: {
      control: { type: 'boolean' },
      description: 'Persist theme mode in localStorage',
    },
    storageKey: {
      control: { type: 'text' },
      description: 'localStorage key for persisting theme mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { ThemeProvider, ThemeDemo },
    setup() {
      return { args };
    },
    template: `
      <ThemeProvider v-bind="args">
        <ThemeDemo />
      </ThemeProvider>
    `,
  }),
  args: {
    mode: 'light',
    enableTransitions: true,
    persistMode: false,
    storageKey: 'haspen-ui-theme-mode',
  },
};

export const DarkMode: Story = {
  render: args => ({
    components: { ThemeProvider, ThemeDemo },
    setup() {
      return { args };
    },
    template: `
      <ThemeProvider v-bind="args">
        <ThemeDemo />
      </ThemeProvider>
    `,
  }),
  args: {
    mode: 'dark',
    enableTransitions: true,
    persistMode: false,
  },
};

export const AutoMode: Story = {
  render: args => ({
    components: { ThemeProvider, ThemeDemo },
    setup() {
      return { args };
    },
    template: `
      <ThemeProvider v-bind="args">
        <ThemeDemo />
      </ThemeProvider>
    `,
  }),
  args: {
    mode: 'auto',
    enableTransitions: true,
    persistMode: false,
  },
};

export const WithoutTransitions: Story = {
  render: args => ({
    components: { ThemeProvider, ThemeDemo },
    setup() {
      return { args };
    },
    template: `
      <ThemeProvider v-bind="args">
        <ThemeDemo />
      </ThemeProvider>
    `,
  }),
  args: {
    mode: 'light',
    enableTransitions: false,
    persistMode: false,
  },
};

export const CustomTheme: Story = {
  render: args => ({
    components: { ThemeProvider, ThemeDemo },
    setup() {
      return { args };
    },
    template: `
      <ThemeProvider v-bind="args">
        <ThemeDemo />
      </ThemeProvider>
    `,
  }),
  args: {
    mode: 'light',
    enableTransitions: true,
    persistMode: false,
    theme: {
      colors: {
        primary: '#e91e63',
        secondary: '#9c27b0',
        tertiary: '#17a2b8',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#0288d1',
        neutral: '#757575',
        background: '#ffffff',
        surface: '#f5f5f5',
        text: '#212529',
        textSecondary: '#6c757d',
        border: '#dee2e6',
        divider: '#e0e0e0',
      },
      spacing: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '5rem',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: args => ({
    components: { ThemeProvider },
    setup() {
      const currentMode = ref<ThemeMode>('light');
      const enableTransitions = ref(true);
      const persistMode = ref(false);

      return {
        args,
        currentMode,
        enableTransitions,
        persistMode,
      };
    },
    template: `
      <div style="padding: 1rem; font-family: system-ui;">
        <div style="margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
          <h3 style="margin: 0 0 1rem 0;">ThemeProvider Controls</h3>
          
          <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
            <label>
              Mode:
              <select v-model="currentMode" style="margin-left: 0.5rem; padding: 0.25rem;">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </label>
            
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" v-model="enableTransitions" />
              Enable Transitions
            </label>
            
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" v-model="persistMode" />
              Persist Mode
            </label>
          </div>
        </div>

        <ThemeProvider 
          :mode="currentMode" 
          :enable-transitions="enableTransitions"
          :persist-mode="persistMode"
        >
          <ThemeDemo />
        </ThemeProvider>
      </div>
    `,
  }),
  args: {},
};

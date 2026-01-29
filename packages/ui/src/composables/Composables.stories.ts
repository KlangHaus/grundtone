import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, computed } from 'vue';
import Button from '../atoms/Button/Button.vue';
import Icon from '../atoms/Icon/Icon.vue';
import IconProvider from '../atoms/Icon/IconProvider.vue';
import ThemeProvider from '../molecules/ThemeProvider/ThemeProvider.vue';
import { haspenIcons } from '../atoms/Icon/libraries';
import { useTheme, useToggle, useClickOutside } from '@ipeeon/composables';
import { logger } from '../utils/error-handling';

// Create a demo component for composables
const ComposablesDemo = {
  name: 'ComposablesDemo',
  template: '<div><slot></slot></div>',
};

const meta: Meta<typeof ComposablesDemo> = {
  title: 'Composables/Overview',
  component: ComposablesDemo,
  parameters: {
    docs: {
      description: {
        component: `
# Composables

Vue 3 composables for common functionality and state management patterns.

## Available Composables

- **useTheme** - Access and control theme state from ThemeProvider
- **useToggle** - Simple boolean state management with helper methods
- **useClickOutside** - Detect clicks outside of elements (coming soon)
- **useIconConfig** - Access icon provider configuration

## Features

- **TypeScript Support**: Full type safety with proper interfaces
- **Reactive**: Built on Vue 3's reactivity system
- **Tree Shakeable**: Import only what you need
- **Composable**: Easy to combine and extend
- **Test Coverage**: Comprehensive unit tests

## Usage

\`\`\`vue
<script setup>
import { useTheme, useToggle } from '@ipeeon/composables';

const { mode, isDark, toggleMode } = useTheme();
const { isOpen, toggle, open, close } = useToggle();
</script>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    story => ({
      components: { story, ThemeProvider, IconProvider },
      setup() {
        return { haspenIcons };
      },
      template: `
        <ThemeProvider>
          <IconProvider :icons="haspenIcons">
            <story />
          </IconProvider>
        </ThemeProvider>
      `,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// useTheme Composable Stories
export const UseThemeBasic: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const { mode, isDark, isLight, toggleMode } = useTheme();

      return {
        mode,
        isDark,
        isLight,
        toggleMode,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">useTheme Composable</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Access theme state and controls from any component within ThemeProvider.
          </p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Current mode:</span>
            <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ mode }}
            </code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Is dark:</span>
            <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ isDark }}
            </code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Is light:</span>
            <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ isLight }}
            </code>
          </div>
        </div>
        
        <div>
          <Button variant="primary" @click="toggleMode">
            <Icon :name="isDark ? 'sun' : 'moon'" :size="16" style="margin-right: 0.5rem;" />
            {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
          </Button>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>const { mode, isDark, isLight, toggleMode } = useTheme();

// Reactive values
logger.info(mode.value); // 'light' | 'dark' | 'auto'
logger.info(isDark.value); // boolean
logger.info(isLight.value); // boolean

// Toggle between light/dark
toggleMode();</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of useTheme composable to access and control theme state.',
      },
    },
  },
};

export const UseThemeConditionalRendering: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const { isDark, isLight, toggleMode } = useTheme();

      return {
        isDark,
        isLight,
        toggleMode,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Conditional Rendering</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Use theme state for conditional rendering of components and content.
          </p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div v-if="isDark" style="padding: 1rem; background: #374151; color: white; border-radius: 8px;">
            <h4 style="margin: 0 0 0.5rem 0;">🌙 Dark Mode Content</h4>
            <p style="margin: 0;">This content is only shown in dark mode.</p>
          </div>
          
          <div v-if="isLight" style="padding: 1rem; background: #fef3c7; color: #92400e; border-radius: 8px;">
            <h4 style="margin: 0 0 0.5rem 0;">☀️ Light Mode Content</h4>
            <p style="margin: 0;">This content is only shown in light mode.</p>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <Button 
              :variant="isDark ? 'secondary' : 'primary'" 
              @click="toggleMode"
            >
              Toggle Theme
            </Button>
            
            <Button 
              :variant="isDark ? 'outline' : 'ghost'"
              style="opacity: 0.8;"
            >
              {{ isDark ? 'Dark Style' : 'Light Style' }}
            </Button>
          </div>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>&lt;div v-if="isDark"&gt;Dark mode content&lt;/div&gt;
&lt;div v-if="isLight"&gt;Light mode content&lt;/div&gt;

&lt;Button :variant="isDark ? 'secondary' : 'primary'"&gt;
  Conditional styling
&lt;/Button&gt;</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Use theme state for conditional rendering and dynamic styling based on current theme.',
      },
    },
  },
};

// useToggle Composable Stories
export const UseToggleBasic: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const modal = useToggle();
      const sidebar = useToggle({ initialValue: true });
      const notifications = useToggle();

      return {
        modal,
        sidebar,
        notifications,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">useToggle Composable</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Simple boolean state management with convenient helper methods.
          </p>
        </div>
        
        <div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          <!-- Modal Toggle -->
          <div style="padding: 1rem; border: 1px solid #d1d5db; border-radius: 8px;">
            <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600;">Modal</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-weight: 500;">State:</span>
                <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">
                  {{ modal.isOpen.value ? 'open' : 'closed' }}
                </code>
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <Button size="sm" variant="primary" @click="modal.toggle">Toggle</Button>
              <Button size="sm" variant="secondary" @click="modal.open">Open</Button>
              <Button size="sm" variant="outline" @click="modal.close">Close</Button>
            </div>
          </div>
          
          <!-- Sidebar Toggle -->
          <div style="padding: 1rem; border: 1px solid #d1d5db; border-radius: 8px;">
            <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600;">Sidebar</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-weight: 500;">State:</span>
                <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">
                  {{ sidebar.isOpen.value ? 'open' : 'closed' }}
                </code>
              </div>
              <small style="color: #6b7280;">Initial value: true</small>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <Button size="sm" variant="primary" @click="sidebar.toggle">Toggle</Button>
              <Button size="sm" variant="secondary" @click="sidebar.open">Open</Button>
              <Button size="sm" variant="outline" @click="sidebar.close">Close</Button>
            </div>
          </div>
          
          <!-- Notifications Toggle -->
          <div style="padding: 1rem; border: 1px solid #d1d5db; border-radius: 8px;">
            <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600;">Notifications</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-weight: 500;">State:</span>
                <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">
                  {{ notifications.isOpen.value ? 'enabled' : 'disabled' }}
                </code>
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <Button size="sm" variant="primary" @click="notifications.toggle">Toggle</Button>
              <Button size="sm" variant="secondary" @click="notifications.open">Enable</Button>
              <Button size="sm" variant="outline" @click="notifications.close">Disable</Button>
            </div>
          </div>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>const modal = useToggle();
const sidebar = useToggle({ initialValue: true });

// Reactive state
logger.info(modal.isOpen.value); // false
logger.info(sidebar.isOpen.value); // true

// Control methods
modal.toggle(); // Toggle state
modal.open();   // Set to true
modal.close();  // Set to false</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of useToggle composable for boolean state management with helper methods.',
      },
    },
  },
};

export const UseToggleConditionalContent: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const { isDark } = useTheme();
      const drawer = useToggle();
      const settings = useToggle();
      const details = useToggle({ initialValue: true });

      return {
        isDark,
        drawer,
        settings,
        details,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Conditional Content with useToggle</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Show/hide content dynamically based on toggle state.
          </p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <Button 
            variant="primary" 
            @click="drawer.toggle"
            :aria-pressed="drawer.isOpen.value"
          >
            <Icon name="moon" :size="16" style="margin-right: 0.5rem;" />
            {{ drawer.isOpen.value ? 'Close' : 'Open' }} Drawer
          </Button>
          
          <Button 
            variant="secondary" 
            @click="settings.toggle"
            :aria-pressed="settings.isOpen.value"
          >
            <Icon name="sun" :size="16" style="margin-right: 0.5rem;" />
            {{ settings.isOpen.value ? 'Hide' : 'Show' }} Settings
          </Button>
          
          <Button 
            variant="outline" 
            @click="details.toggle"
            :aria-pressed="details.isOpen.value"
          >
            {{ details.isOpen.value ? 'Collapse' : 'Expand' }} Details
          </Button>
        </div>
        
        <!-- Drawer Content -->
        <transition name="slide">
          <div v-if="drawer.isOpen.value" style="padding: 1rem; background: #1f2937; color: white; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: #f9fafb;">🗂️ Navigation Drawer</h4>
            <p style="margin: 0; color: #d1d5db;">This drawer content is conditionally rendered based on toggle state.</p>
            <Button 
              variant="ghost" 
              size="sm" 
              @click="drawer.close"
              style="margin-top: 0.5rem; color: #f9fafb; border-color: #4b5563;"
            >
              Close Drawer
            </Button>
          </div>
        </transition>
        
        <!-- Settings Content -->
        <div v-if="settings.isOpen.value" style="padding: 1rem; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; color: #0369a1;">⚙️ Settings Panel</h4>
          <p style="margin: 0 0 1rem 0; color: #075985;">Configure your preferences here.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <Button size="sm" variant="outline">Save Settings</Button>
            <Button size="sm" variant="ghost" @click="settings.close">Cancel</Button>
          </div>
        </div>
        
        <!-- Details Content -->
        <details :open="details.isOpen.value" @toggle="details.toggle">
          <summary style="cursor: pointer; font-weight: 600; padding: 0.5rem; background: #f9fafb; border-radius: 4px;">
            📋 Additional Details
          </summary>
          <div style="padding: 1rem; margin-top: 0.5rem; background: #fefefe; border: 1px solid #e5e7eb; border-radius: 4px;">
            <p style="margin: 0; color: #374151;">
              This expandable section demonstrates using useToggle with native HTML details/summary elements
              for accessible disclosure widgets.
            </p>
          </div>
        </details>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>&lt;div v-if="drawer.isOpen.value"&gt;
  Drawer content
&lt;/div&gt;

&lt;Button @click="drawer.toggle" :aria-pressed="drawer.isOpen.value"&gt;
  {{ drawer.isOpen.value ? 'Close' : 'Open' }} Drawer
&lt;/Button&gt;

&lt;details :open="details.isOpen.value" @toggle="details.toggle"&gt;
  &lt;summary&gt;Toggle Details&lt;/summary&gt;
  &lt;div&gt;Content here&lt;/div&gt;
&lt;/details&gt;</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Use useToggle for conditional content rendering with smooth transitions and accessibility features.',
      },
    },
  },
};

// Combined Composables Example
export const ComposablesCombined: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const { mode, isDark, toggleMode } = useTheme();
      const sidebar = useToggle({ initialValue: true });
      const notifications = useToggle();
      const darkModeSettings = useToggle();

      // Computed values combining multiple composables
      const sidebarLabel = computed(() =>
        sidebar.isOpen.value ? 'Close Sidebar' : 'Open Sidebar',
      );

      const themeIcon = computed(() => (isDark.value ? 'sun' : 'moon'));
      const themeLabel = computed(() =>
        isDark.value ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      );

      return {
        mode,
        isDark,
        toggleMode,
        sidebar,
        notifications,
        darkModeSettings,
        sidebarLabel,
        themeIcon,
        themeLabel,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Combined Composables</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Demonstrate how multiple composables work together to create complex interactions.
          </p>
        </div>
        
        <!-- Status Bar -->
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Theme:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">{{ mode }}</code>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Sidebar:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">{{ sidebar.isOpen.value ? 'open' : 'closed' }}</code>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Notifications:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">{{ notifications.isOpen.value ? 'on' : 'off' }}</code>
          </div>
        </div>
        
        <!-- Control Panel -->
        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <Button variant="primary" @click="toggleMode">
            <Icon :name="themeIcon" :size="16" style="margin-right: 0.5rem;" />
            {{ themeLabel }}
          </Button>
          
          <Button variant="secondary" @click="sidebar.toggle" :aria-pressed="sidebar.isOpen.value">
            <Icon name="moon" :size="16" style="margin-right: 0.5rem;" />
            {{ sidebarLabel }}
          </Button>
          
          <Button 
            :variant="notifications.isOpen.value ? 'outline' : 'ghost'" 
            @click="notifications.toggle"
            :aria-pressed="notifications.isOpen.value"
          >
            <Icon name="sun" :size="16" style="margin-right: 0.5rem;" />
            {{ notifications.isOpen.value ? 'Disable' : 'Enable' }} Notifications
          </Button>
        </div>
        
        <!-- Conditional Content Based on Multiple States -->
        <div v-if="sidebar.isOpen.value" 
             :style="{
               padding: '1rem',
               background: isDark ? '#374151' : '#f9fafb',
               color: isDark ? '#f9fafb' : '#374151',
               borderRadius: '8px',
               border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb'
             }">
          <h4 style="margin: 0 0 1rem 0;">
            {{ isDark ? '🌙' : '☀️' }} 
            {{ isDark ? 'Dark' : 'Light' }} Mode Sidebar
          </h4>
          <p style="margin: 0 0 1rem 0;">
            This sidebar adapts its appearance based on the current theme mode.
          </p>
          
          <!-- Theme-specific settings -->
          <div v-if="isDark">
            <Button 
              size="sm" 
              variant="secondary" 
              @click="darkModeSettings.toggle"
              style="background: #4b5563; border-color: #6b7280; color: #f9fafb;"
            >
              {{ darkModeSettings.isOpen.value ? 'Hide' : 'Show' }} Dark Mode Settings
            </Button>
            
            <div v-if="darkModeSettings.isOpen.value" style="margin-top: 1rem; padding: 1rem; background: #1f2937; border-radius: 4px;">
              <p style="margin: 0; font-size: 0.875rem; color: #d1d5db;">
                🔧 Dark mode specific settings would go here.
              </p>
            </div>
          </div>
          
          <div v-else>
            <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
              ☀️ Light mode settings and controls are available here.
            </p>
          </div>
        </div>
        
        <!-- Notifications Panel -->
        <div v-if="notifications.isOpen.value" style="padding: 1rem; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; color: #059669;">🔔 Notifications Active</h4>
          <p style="margin: 0; color: #047857;">
            You will receive notifications. Theme mode: {{ mode }}, Sidebar: {{ sidebar.isOpen.value ? 'visible' : 'hidden' }}.
          </p>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>const { mode, isDark, toggleMode } = useTheme();
const sidebar = useToggle({ initialValue: true });
const notifications = useToggle();

// Computed values combining composables
const themeIcon = computed(() => isDark.value ? 'sun' : 'moon');
const sidebarLabel = computed(() => 
  sidebar.isOpen.value ? 'Close Sidebar' : 'Open Sidebar'
);

// Conditional styling based on multiple states
const sidebarStyle = computed(() => ({
  background: isDark.value ? '#374151' : '#f9fafb',
  color: isDark.value ? '#f9fafb' : '#374151'
}));</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Complex example combining useTheme and useToggle composables to create interactive UI components with theme-aware styling and state management.',
      },
    },
  },
};

// Performance and Best Practices
export const ComposablesPerformance: Story = {
  render: () => ({
    components: { Button },
    setup() {
      // Multiple independent toggles
      const toggles = Array.from({ length: 5 }, (_, i) =>
        useToggle({ initialValue: i % 2 === 0 }),
      );

      const { isDark } = useTheme();
      const renderCount = ref(0);

      // Track re-renders
      const incrementRender = () => {
        renderCount.value++;
      };

      // Toggle all states
      const toggleAll = () => {
        toggles.forEach(toggle => toggle.toggle());
        incrementRender();
      };

      // Reset all states
      const resetAll = () => {
        toggles.forEach((toggle, i) => {
          if (i % 2 === 0) {
            toggle.open();
          } else {
            toggle.close();
          }
        });
        incrementRender();
      };

      return {
        toggles,
        isDark,
        renderCount,
        toggleAll,
        resetAll,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Performance & Best Practices</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Composables are lightweight and performant. Multiple instances work independently.
          </p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; padding: 1rem; background: #f8fafc; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Render count:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px;">{{ renderCount }}</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Theme:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px;">{{ isDark ? 'dark' : 'light' }}</code>
          </div>
        </div>
        
        <!-- Multiple Toggle States -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
          <div 
            v-for="(toggle, index) in toggles" 
            :key="index"
            style="padding: 1rem; border: 1px solid #d1d5db; border-radius: 8px; text-align: center;"
          >
            <div style="margin-bottom: 0.5rem; font-weight: 600;">Toggle {{ index + 1 }}</div>
            <div style="margin-bottom: 1rem;">
              <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">
                {{ toggle.isOpen.value ? 'ON' : 'OFF' }}
              </code>
            </div>
            <Button 
              size="sm" 
              :variant="toggle.isOpen.value ? 'primary' : 'outline'" 
              @click="toggle.toggle"
            >
              Toggle
            </Button>
          </div>
        </div>
        
        <!-- Bulk Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <Button variant="secondary" @click="toggleAll">
            Toggle All States
          </Button>
          <Button variant="outline" @click="resetAll">
            Reset to Default
          </Button>
        </div>
        
        <!-- Performance Info -->
        <div style="padding: 1rem; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; color: #0369a1;">💡 Performance Tips</h4>
          <ul style="margin: 0; padding-left: 1rem; color: #075985; font-size: 0.875rem;">
            <li>Each useToggle instance is independent and lightweight</li>
            <li>Reactive values only trigger re-renders when accessed in template</li>
            <li>Multiple composables can be combined without performance penalty</li>
            <li>Use readonly() for values that shouldn't be mutated externally</li>
          </ul>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>// Multiple independent instances
const toggles = Array.from({ length: 5 }, (_, i) => 
  useToggle({ initialValue: i % 2 === 0 })
);

// Each instance has its own reactive state
toggles[0].toggle(); // Only affects first instance
logger.info(toggles[1].isOpen.value); // Independent state

// Combine with other composables
const { isDark } = useTheme();
const showInDarkMode = computed(() => 
  isDark.value && toggles[0].isOpen.value
);</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Performance characteristics and best practices when using multiple composable instances.',
      },
    },
  },
};

// useClickOutside Composable Stories
export const UseClickOutsideBasic: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const dropdown = useToggle();
      const modal = useToggle();

      const dropdownClickOutside = useClickOutside({
        callback: () => dropdown.close(),
      });

      const modalClickOutside = useClickOutside({
        callback: () => modal.close(),
      });

      const { isDark } = useTheme();

      return {
        dropdown,
        modal,
        dropdownClickOutside,
        modalClickOutside,
        isDark,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">useClickOutside Composable</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            Detect clicks outside of elements to close dropdowns, modals, and other overlays.
          </p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
          <!-- Dropdown Example -->
          <div style="position: relative; display: inline-block;">
            <Button 
              variant="primary" 
              @click="dropdown.toggle"
              :aria-expanded="dropdown.isOpen.value"
              aria-haspopup="true"
            >
              Dropdown Menu
              <Icon name="moon" :size="16" style="margin-left: 0.5rem;" />
            </Button>
            
            <div 
              v-if="dropdown.isOpen.value"
              ref="dropdownClickOutside.targetRef"
              style="
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 200px;
                margin-top: 0.25rem;
                padding: 0.5rem;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 50;
              "
            >
              <div style="padding: 0.5rem; font-weight: 600; border-bottom: 1px solid #e5e7eb;">
                Dropdown Content
              </div>
              <button style="display: block; width: 100%; padding: 0.5rem; text-align: left; border: none; background: none; cursor: pointer; border-radius: 4px;" @mouseover="$event.target.style.backgroundColor = '#f3f4f6'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">
                Option 1
              </button>
              <button style="display: block; width: 100%; padding: 0.5rem; text-align: left; border: none; background: none; cursor: pointer; border-radius: 4px;" @mouseover="$event.target.style.backgroundColor = '#f3f4f6'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">
                Option 2
              </button>
              <button style="display: block; width: 100%; padding: 0.5rem; text-align: left; border: none; background: none; cursor: pointer; border-radius: 4px;" @mouseover="$event.target.style.backgroundColor = '#f3f4f6'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">
                Option 3
              </button>
            </div>
          </div>
          
          <!-- Modal Example -->
          <div>
            <Button 
              variant="secondary" 
              @click="modal.open"
            >
              Open Modal
            </Button>
          </div>
        </div>
        
        <!-- Modal Overlay -->
        <div 
          v-if="modal.isOpen.value"
          style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
          "
        >
          <div 
            ref="modalClickOutside.targetRef"
            style="
              background: white;
              border-radius: 12px;
              padding: 2rem;
              max-width: 400px;
              width: 90%;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
            "
            @click.stop
          >
            <h4 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">
              🎯 Click Outside Demo
            </h4>
            <p style="margin: 0 0 1.5rem 0; color: #6b7280;">
              This modal will close when you click outside of it. Try clicking on the backdrop.
            </p>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <Button size="sm" variant="outline" @click="modal.close">
                Close Modal
              </Button>
            </div>
          </div>
        </div>
        
        <!-- Status Display -->
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Dropdown:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ dropdown.isOpen.value ? 'open' : 'closed' }}
            </code>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Modal:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ modal.isOpen.value ? 'open' : 'closed' }}
            </code>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Last click outside:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ dropdownClickOutside.isClickedOutside.value || modalClickOutside.isClickedOutside.value ? 'detected' : 'none' }}
            </code>
          </div>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>const dropdown = useToggle();

const { targetRef, isClickedOutside } = useClickOutside({
  callback: () => dropdown.close(),
});

// Attach ref to element
&lt;div ref="targetRef"&gt;
  Content that closes when clicked outside
&lt;/div&gt;

// Check if clicked outside
logger.info(isClickedOutside.value); // boolean</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of useClickOutside composable for detecting clicks outside elements to close dropdowns and modals.',
      },
    },
  },
};

export const UseClickOutsideAdvanced: Story = {
  render: () => ({
    components: { Button, Icon },
    setup() {
      const { isDark } = useTheme();
      const tooltip = useToggle();
      const contextMenu = useToggle();
      const sidebar = useToggle();

      const tooltipClickOutside = useClickOutside({
        enabled: tooltip.isOpen.value,
        callback: () => {
          tooltip.close();
          logger.info('Tooltip closed by click outside', {
            component: 'ComposablesDemo',
            action: 'clickOutside',
          });
        },
      });

      const contextMenuClickOutside = useClickOutside({
        callback: () => contextMenu.close(),
      });

      const sidebarClickOutside = useClickOutside({
        callback: () => sidebar.close(),
      });

      const contextMenuPosition = ref({ x: 0, y: 0 });

      const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        contextMenuPosition.value = {
          x: event.clientX,
          y: event.clientY,
        };
        contextMenu.open();
      };

      return {
        isDark,
        tooltip,
        contextMenu,
        sidebar,
        tooltipClickOutside,
        contextMenuClickOutside,
        sidebarClickOutside,
        contextMenuPosition,
        handleContextMenu,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Advanced Click Outside Patterns</h3>
          <p style="margin: 0 0 1rem 0; color: #6b7280;">
            More complex examples including tooltips, context menus, and conditional enabling.
          </p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
          <!-- Tooltip Example -->
          <div style="position: relative; display: inline-block;">
            <Button 
              variant="primary" 
              @mouseenter="tooltip.open"
              @mouseleave="tooltip.close"
              @click="tooltip.toggle"
            >
              Hover/Click for Tooltip
              <Icon name="sun" :size="16" style="margin-left: 0.5rem;" />
            </Button>
            
            <div 
              v-if="tooltip.isOpen.value"
              ref="tooltipClickOutside.targetRef"
              style="
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: 0.5rem;
                padding: 0.75rem 1rem;
                background: #1f2937;
                color: white;
                border-radius: 8px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 50;
              "
            >
              💡 This tooltip closes on click outside
              <div style="
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid #1f2937;
              "></div>
            </div>
          </div>
          
          <!-- Context Menu Trigger -->
          <div 
            @contextmenu="handleContextMenu"
            style="
              padding: 2rem;
              border: 2px dashed #d1d5db;
              border-radius: 8px;
              cursor: context-menu;
              text-align: center;
              color: #6b7280;
            "
          >
            Right-click here for context menu
          </div>
          
          <!-- Sidebar Toggle -->
          <Button 
            variant="secondary" 
            @click="sidebar.toggle"
            :aria-pressed="sidebar.isOpen.value"
          >
            <Icon name="moon" :size="16" style="margin-right: 0.5rem;" />
            {{ sidebar.isOpen.value ? 'Close' : 'Open' }} Sidebar
          </Button>
        </div>
        
        <!-- Context Menu -->
        <div 
          v-if="contextMenu.isOpen.value"
          ref="contextMenuClickOutside.targetRef"
          :style="{
            position: 'fixed',
            left: contextMenuPosition.x + 'px',
            top: contextMenuPosition.y + 'px',
            minWidth: '200px',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
          }"
        >
          <div style="padding: 0.5rem; font-weight: 600; border-bottom: 1px solid #e5e7eb; font-size: 0.875rem;">
            Context Menu
          </div>
          <button 
            v-for="(item, index) in ['Copy', 'Cut', 'Paste', 'Delete']" 
            :key="index"
            style="display: block; width: 100%; padding: 0.5rem; text-align: left; border: none; background: none; cursor: pointer; border-radius: 4px; font-size: 0.875rem;" 
            @click="contextMenu.close"
            @mouseover="$event.target.style.backgroundColor = '#f3f4f6'" 
            @mouseleave="$event.target.style.backgroundColor = 'transparent'"
          >
            {{ item }}
          </button>
        </div>
        
        <!-- Sidebar Overlay -->
        <div 
          v-if="sidebar.isOpen.value"
          style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 40;
          "
        >
          <div 
            ref="sidebarClickOutside.targetRef"
            :style="{
              position: 'fixed',
              top: '0',
              right: '0',
              bottom: '0',
              width: '300px',
              background: isDark ? '#374151' : 'white',
              color: isDark ? 'white' : '#374151',
              padding: '1.5rem',
              boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
              transform: sidebar.isOpen.value ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease',
            }"
          >
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1.5rem;">
              <h4 style="margin: 0; font-size: 1.25rem; font-weight: 600;">
                Sidebar Panel
              </h4>
              <Button 
                size="sm" 
                variant="ghost" 
                @click="sidebar.close"
                style="margin-left: auto;"
              >
                <Icon name="sun" :size="16" />
              </Button>
            </div>
            
            <p style="margin: 0 0 1rem 0; font-size: 0.875rem; opacity: 0.8;">
              This sidebar will close when you click outside of it, or press the close button.
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <Button size="sm" variant="outline" style="justify-content: flex-start;">
                Sidebar Option 1
              </Button>
              <Button size="sm" variant="outline" style="justify-content: flex-start;">
                Sidebar Option 2
              </Button>
              <Button size="sm" variant="outline" style="justify-content: flex-start;">
                Sidebar Option 3
              </Button>
            </div>
          </div>
        </div>
        
        <!-- Status Display -->
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Tooltip:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ tooltip.isOpen.value ? 'visible' : 'hidden' }}
            </code>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Context Menu:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ contextMenu.isOpen.value ? 'open' : 'closed' }}
            </code>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">Sidebar:</span>
            <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
              {{ sidebar.isOpen.value ? 'open' : 'closed' }}
            </code>
          </div>
        </div>
        
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Code Example:</h4>
          <pre style="margin: 0; font-size: 0.75rem; overflow-x: auto;"><code>// Conditional enabling
const { targetRef } = useClickOutside({
  enabled: tooltip.isOpen.value,
  callback: () => tooltip.close(),
});

// Dynamic positioning (context menu)
const contextMenuPosition = ref({ x: 0, y: 0 });

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  contextMenuPosition.value = {
    x: event.clientX,
    y: event.clientY,
  };
  contextMenu.open();
};

// Multiple instances for different UI elements
const tooltipClickOutside = useClickOutside({ ... });
const contextMenuClickOutside = useClickOutside({ ... });
const sidebarClickOutside = useClickOutside({ ... });</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Advanced patterns including tooltips, context menus, sidebars, and conditional enabling of click outside detection.',
      },
    },
  },
};

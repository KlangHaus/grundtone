import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, computed, onMounted } from 'vue';
import { useTheme } from '@ipeeon/composables';
import ThemeProvider from '../molecules/ThemeProvider/ThemeProvider.vue';
import ThemeToggle from '../atoms/ThemeToggle/ThemeToggle.vue';
import Button from '../atoms/Button/Button.vue';
import './ThemeDocumentation.stories.scss';

// Theme Documentation Component
const ThemeDocumentationDemo = {
  template: `
    <div class="theme-docs">
      <h2>Haspen UI Theme System</h2>
      
      <!-- Theme Overview -->
      <section class="docs-section">
        <h3>Theme Overview</h3>
        <div class="theme-overview">
          <div class="current-theme-info">
            <h4>Current Theme</h4>
            <div class="theme-status">
              <span class="status-label">Mode:</span>
              <span class="status-value">{{ theme.mode.value }}</span>
              <span class="status-indicator" :class="theme.isDark.value ? 'dark' : 'light'">
                {{ theme.isDark.value ? '🌙' : '☀️' }}
              </span>
            </div>
            <div class="theme-controls">
              <ThemeToggle />
              <button @click="theme.setMode('light')" :class="{ active: theme.mode.value === 'light' }">Light</button>
              <button @click="theme.setMode('dark')" :class="{ active: theme.mode.value === 'dark' }">Dark</button>
              <button @click="theme.setMode('auto')" :class="{ active: theme.mode.value === 'auto' }">Auto</button>
            </div>
          </div>
          
          <div class="theme-features">
            <h4>Key Features</h4>
            <ul>
              <li>🎨 CSS light-dark() function support for automatic theme switching</li>
              <li>💾 Persistent theme preference with localStorage</li>
              <li>🔄 System theme detection and following</li>
              <li>⚡ Real-time theme switching with smooth transitions</li>
              <li>🎯 CSS custom properties for easy customization</li>
              <li>♿ WCAG accessibility compliance with proper contrast ratios</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Color System -->
      <section class="docs-section">
        <h3>Color System</h3>
        <div class="color-palette">
          <div class="color-category">
            <h4>Primary Colors</h4>
            <div class="color-grid">
              <div class="color-card primary">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Primary</span>
                  <span class="color-value">{{ getColorValue('primary') }}</span>
                  <span class="color-usage">Buttons, links, focus states</span>
                </div>
              </div>
              <div class="color-card secondary">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Secondary</span>
                  <span class="color-value">{{ getColorValue('secondary') }}</span>
                  <span class="color-usage">Secondary actions, borders</span>
                </div>
              </div>
              <div class="color-card tertiary">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Tertiary</span>
                  <span class="color-value">{{ getColorValue('tertiary') }}</span>
                  <span class="color-usage">Accent elements, highlights</span>
                </div>
              </div>
            </div>
          </div>

          <div class="color-category">
            <h4>Semantic Colors</h4>
            <div class="color-grid">
              <div class="color-card error">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Error</span>
                  <span class="color-value">{{ getColorValue('error') }}</span>
                  <span class="color-usage">Error messages, destructive actions</span>
                </div>
              </div>
              <div class="color-card warning">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Warning</span>
                  <span class="color-value">{{ getColorValue('warning') }}</span>
                  <span class="color-usage">Warnings, caution states</span>
                </div>
              </div>
              <div class="color-card success">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Success</span>
                  <span class="color-value">{{ getColorValue('success') }}</span>
                  <span class="color-usage">Success messages, confirmations</span>
                </div>
              </div>
              <div class="color-card info">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Info</span>
                  <span class="color-value">{{ getColorValue('info') }}</span>
                  <span class="color-usage">Information, help text</span>
                </div>
              </div>
            </div>
          </div>

          <div class="color-category">
            <h4>Surface Colors</h4>
            <div class="color-grid">
              <div class="color-card background">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Background</span>
                  <span class="color-value">{{ getColorValue('background') }}</span>
                  <span class="color-usage">Page background</span>
                </div>
              </div>
              <div class="color-card surface">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Surface</span>
                  <span class="color-value">{{ getColorValue('surface') }}</span>
                  <span class="color-usage">Cards, modals, panels</span>
                </div>
              </div>
              <div class="color-card text">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Text</span>
                  <span class="color-value">{{ getColorValue('text') }}</span>
                  <span class="color-usage">Primary text content</span>
                </div>
              </div>
              <div class="color-card textSecondary">
                <div class="color-swatch"></div>
                <div class="color-info">
                  <span class="color-name">Text Secondary</span>
                  <span class="color-value">{{ getColorValue('textSecondary') }}</span>
                  <span class="color-usage">Secondary text, captions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="accessibility-note">
          <h4>♿ Accessibility</h4>
          <p>All color combinations meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)</p>
        </div>
      </section>

      <!-- Typography System -->
      <section class="docs-section">
        <h3>Typography System</h3>
        
        <div class="typography-showcase">
          <div class="font-families">
            <h4>Font Families</h4>
            <div class="font-samples">
              <div class="font-sample base">
                <span class="font-label">Base (IBM Plex Sans)</span>
                <p class="sample-text">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div class="font-sample heading">
                <span class="font-label">Heading (IBM Plex Sans)</span>
                <h3 class="sample-text">Typography makes design speak</h3>
              </div>
              <div class="font-sample mono">
                <span class="font-label">Mono (IBM Plex Mono)</span>
                <code class="sample-text">function validateForm() { return true; }</code>
              </div>
            </div>
          </div>

          <div class="font-sizes">
            <h4>Font Size Scale</h4>
            <div class="size-samples">
              <div class="size-sample xs">
                <span class="size-label">xs (0.75rem)</span>
                <p class="sample-text">Small caption text</p>
              </div>
              <div class="size-sample sm">
                <span class="size-label">sm (0.875rem)</span>
                <p class="sample-text">Small body text</p>
              </div>
              <div class="size-sample base">
                <span class="size-label">base (1rem)</span>
                <p class="sample-text">Regular body text</p>
              </div>
              <div class="size-sample lg">
                <span class="size-label">lg (1.125rem)</span>
                <p class="sample-text">Large body text</p>
              </div>
              <div class="size-sample xl">
                <span class="size-label">xl (1.25rem)</span>
                <p class="sample-text">Heading text</p>
              </div>
              <div class="size-sample 2xl">
                <span class="size-label">2xl (1.5rem)</span>
                <p class="sample-text">Large heading</p>
              </div>
            </div>
          </div>

          <div class="font-weights">
            <h4>Font Weights</h4>
            <div class="weight-samples">
              <div class="weight-sample light">Light (300): Typography example</div>
              <div class="weight-sample normal">Normal (400): Typography example</div>
              <div class="weight-sample medium">Medium (500): Typography example</div>
              <div class="weight-sample semibold">Semibold (600): Typography example</div>
              <div class="weight-sample bold">Bold (700): Typography example</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacing System -->
      <section class="docs-section">
        <h3>Spacing System</h3>
        <div class="spacing-system">
          <div class="spacing-scale-demo">
            <h4>Spacing Scale</h4>
            <div class="spacing-items">
              <div class="spacing-item" v-for="(size, key) in spacingValues" :key="key">
                <div class="spacing-visual" :style="{ width: size, height: '16px' }"></div>
                <div class="spacing-info">
                  <span class="spacing-name">{{ key }}</span>
                  <span class="spacing-value">{{ size }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="spacing-usage">
            <h4>Spacing Usage Examples</h4>
            <div class="usage-examples">
              <div class="usage-example">
                <div class="example-box xs">xs spacing</div>
                <span>Form field gaps</span>
              </div>
              <div class="usage-example">
                <div class="example-box sm">sm spacing</div>
                <span>Button padding</span>
              </div>
              <div class="usage-example">
                <div class="example-box md">md spacing</div>
                <span>Card padding</span>
              </div>
              <div class="usage-example">
                <div class="example-box lg">lg spacing</div>
                <span>Section margins</span>
              </div>
              <div class="usage-example">
                <div class="example-box xl">xl spacing</div>
                <span>Page sections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Component Theming -->
      <section class="docs-section">
        <h3>Component Theming</h3>
        <div class="component-theming">
          <h4>Themed Components</h4>
          <div class="themed-components">
            <div class="component-demo">
              <h5>Buttons</h5>
              <div class="button-group">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
            </div>
            
            <div class="component-demo">
              <h5>Cards</h5>
              <div class="themed-card">
                <div class="card-header">Card Header</div>
                <div class="card-body">
                  <p>This card automatically adapts to the current theme using CSS custom properties.</p>
                </div>
                <div class="card-footer">Card Footer</div>
              </div>
            </div>

            <div class="component-demo">
              <h5>Form Elements</h5>
              <div class="form-demo">
                <input type="text" placeholder="Text input" class="themed-input" />
                <select class="themed-select">
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <textarea placeholder="Textarea" class="themed-textarea"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Theme Customization -->
      <section class="docs-section">
        <h3>Theme Customization</h3>
        <div class="customization-demo">
          <h4>Custom Theme Example</h4>
          <div class="custom-theme-controls">
            <div class="color-picker">
              <label>Primary Color:</label>
              <input 
                type="color" 
                v-model="customPrimary" 
                @input="updateCustomTheme"
                class="color-input"
              />
              <span>{{ customPrimary }}</span>
            </div>
            <div class="color-picker">
              <label>Secondary Color:</label>
              <input 
                type="color" 
                v-model="customSecondary" 
                @input="updateCustomTheme"
                class="color-input"
              />
              <span>{{ customSecondary }}</span>
            </div>
            <button @click="resetCustomTheme" class="reset-btn">Reset to Default</button>
          </div>
          
          <div class="custom-theme-preview" :style="customThemeStyles">
            <h5>Custom Theme Preview</h5>
            <div class="preview-content">
              <Button variant="primary">Custom Primary</Button>
              <Button variant="secondary">Custom Secondary</Button>
              <div class="preview-card">
                <p>This preview uses your custom colors</p>
              </div>
            </div>
          </div>
        </div>

        <div class="customization-code">
          <h4>Implementation Code</h4>
          <pre><code>// Custom theme configuration
const customTheme = {
  colors: {
    primary: '{{ customPrimary }}',
    secondary: '{{ customSecondary }}',
    // ... other colors
  }
};

// Usage with ThemeProvider
&lt;ThemeProvider :theme="customTheme"&gt;
  &lt;App /&gt;
&lt;/ThemeProvider&gt;</code></pre>
        </div>
      </section>

      <!-- CSS Custom Properties -->
      <section class="docs-section">
        <h3>CSS Custom Properties Reference</h3>
        <div class="css-variables">
          <div class="variables-category">
            <h4>Color Variables</h4>
            <div class="variables-list">
              <div class="variable-item" v-for="color in colorVariables" :key="color.name">
                <code class="variable-name">{{ color.name }}</code>
                <div class="variable-value" :style="{ backgroundColor: color.value }"></div>
                <span class="variable-description">{{ color.description }}</span>
              </div>
            </div>
          </div>

          <div class="variables-category">
            <h4>Spacing Variables</h4>
            <div class="variables-list">
              <div class="variable-item" v-for="spacing in spacingVariables" :key="spacing.name">
                <code class="variable-name">{{ spacing.name }}</code>
                <div class="variable-value">{{ spacing.value }}</div>
                <span class="variable-description">{{ spacing.description }}</span>
              </div>
            </div>
          </div>

          <div class="variables-category">
            <h4>Typography Variables</h4>
            <div class="variables-list">
              <div class="variable-item" v-for="typo in typographyVariables" :key="typo.name">
                <code class="variable-name">{{ typo.name }}</code>
                <div class="variable-value">{{ typo.value }}</div>
                <span class="variable-description">{{ typo.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Dark Mode Best Practices -->
      <section class="docs-section">
        <h3>Dark Mode Best Practices</h3>
        <div class="best-practices">
          <div class="practice-grid">
            <div class="practice-item">
              <h4>🎨 Color Selection</h4>
              <ul>
                <li>Use pure black sparingly - #121212 is more comfortable</li>
                <li>Increase color saturation for better visibility</li>
                <li>Test contrast ratios meet WCAG guidelines</li>
                <li>Consider color blindness accessibility</li>
              </ul>
            </div>
            <div class="practice-item">
              <h4>🔄 Transitions</h4>
              <ul>
                <li>Enable smooth theme transitions for better UX</li>
                <li>Use CSS transitions on theme-sensitive properties</li>
                <li>Avoid jarring instant color changes</li>
                <li>Respect user's reduced motion preferences</li>
              </ul>
            </div>
            <div class="practice-item">
              <h4>💾 Persistence</h4>
              <ul>
                <li>Remember user's theme preference</li>
                <li>Respect system theme changes</li>
                <li>Provide manual override controls</li>
                <li>Handle localStorage gracefully</li>
              </ul>
            </div>
            <div class="practice-item">
              <h4>🖼️ Content</h4>
              <ul>
                <li>Use theme-aware images and icons</li>
                <li>Adjust shadows and borders for dark backgrounds</li>
                <li>Consider readability in both themes</li>
                <li>Test with real content, not just placeholders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  setup() {
    const theme = useTheme();

    // Custom theme demo
    const customPrimary = ref('#0059b3');
    const customSecondary = ref('#6c757d');

    const customThemeStyles = computed(() => ({
      '--custom-primary': customPrimary.value,
      '--custom-secondary': customSecondary.value,
    }));

    // Spacing values for demo
    const spacingValues = ref({
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '5rem',
    });

    // CSS Variables reference data
    const colorVariables = ref([
      {
        name: '--haspen-color-primary',
        value: getComputedStyle(document.documentElement).getPropertyValue(
          '--haspen-color-primary',
        ),
        description: 'Primary brand color',
      },
      {
        name: '--haspen-color-secondary',
        value: getComputedStyle(document.documentElement).getPropertyValue(
          '--haspen-color-secondary',
        ),
        description: 'Secondary actions',
      },
      {
        name: '--haspen-color-background',
        value: getComputedStyle(document.documentElement).getPropertyValue(
          '--haspen-color-background',
        ),
        description: 'Page background',
      },
      {
        name: '--haspen-color-surface',
        value: getComputedStyle(document.documentElement).getPropertyValue(
          '--haspen-color-surface',
        ),
        description: 'Card surfaces',
      },
      {
        name: '--haspen-color-text',
        value: getComputedStyle(document.documentElement).getPropertyValue(
          '--haspen-color-text',
        ),
        description: 'Primary text',
      },
    ]);

    const spacingVariables = ref([
      {
        name: '--haspen-spacing-xs',
        value: '0.25rem',
        description: 'Extra small spacing',
      },
      {
        name: '--haspen-spacing-sm',
        value: '0.5rem',
        description: 'Small spacing',
      },
      {
        name: '--haspen-spacing-md',
        value: '1rem',
        description: 'Medium spacing',
      },
      {
        name: '--haspen-spacing-lg',
        value: '1.5rem',
        description: 'Large spacing',
      },
      {
        name: '--haspen-spacing-xl',
        value: '2rem',
        description: 'Extra large spacing',
      },
    ]);

    const typographyVariables = ref([
      {
        name: '--haspen-font-size-sm',
        value: '0.875rem',
        description: 'Small text size',
      },
      {
        name: '--haspen-font-size-base',
        value: '1rem',
        description: 'Base text size',
      },
      {
        name: '--haspen-font-size-lg',
        value: '1.125rem',
        description: 'Large text size',
      },
      {
        name: '--haspen-font-weight-normal',
        value: '400',
        description: 'Normal weight',
      },
      {
        name: '--haspen-font-weight-bold',
        value: '700',
        description: 'Bold weight',
      },
    ]);

    function getColorValue(colorName: string): string {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(`--haspen-color-${colorName}`)
        .trim();
    }

    function updateCustomTheme() {
      // Update CSS custom properties for live preview
      document.documentElement.style.setProperty(
        '--custom-primary',
        customPrimary.value,
      );
      document.documentElement.style.setProperty(
        '--custom-secondary',
        customSecondary.value,
      );
    }

    function resetCustomTheme() {
      customPrimary.value = '#0059b3';
      customSecondary.value = '#6c757d';
      updateCustomTheme();
    }

    onMounted(() => {
      updateCustomTheme();
    });

    return {
      theme,
      customPrimary,
      customSecondary,
      customThemeStyles,
      spacingValues,
      colorVariables,
      spacingVariables,
      typographyVariables,
      getColorValue,
      updateCustomTheme,
      resetCustomTheme,
    };
  },
  components: {
    ThemeToggle,
    Button,
  },
};

const meta: Meta = {
  title: 'Theme/Documentation',
  component: ThemeDocumentationDemo,
  decorators: [
    story => ({
      components: { story, ThemeProvider },
      template: '<ThemeProvider><story /></ThemeProvider>',
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Theme System Documentation

Comprehensive documentation for the Haspen UI theme system, covering colors, typography, spacing, dark mode, and customization.

## Features

### 🎨 Modern CSS Features
- **CSS light-dark() function** for automatic theme switching
- **CSS custom properties** for dynamic theming
- **color-scheme** property for native browser support
- **Seamless transitions** between themes

### 🌓 Theme Modes
- **Light Mode** - Clean, bright interface for daytime use
- **Dark Mode** - Eye-friendly interface for low-light conditions  
- **Auto Mode** - Automatically follows system preference

### ♿ Accessibility
- **WCAG 2.1 AA compliant** contrast ratios
- **Reduced motion** support for transitions
- **Color blindness** considerations in color selection
- **Screen reader** compatible theme indicators

### 🔧 Customization
- **Theme overrides** via props
- **CSS custom property** modifications
- **Runtime theme switching** with persistence
- **Component-level** theme customization

### 💾 Persistence
- **localStorage** integration for theme preference
- **System theme** detection and following
- **Graceful fallbacks** for unsupported environments
- **Cross-tab** theme synchronization

## Implementation

The theme system uses Vue 3's Composition API with provide/inject for state management, CSS custom properties for styling, and modern CSS features for optimal performance and user experience.

## Browser Support

- **Modern browsers** with CSS custom properties support
- **Fallback support** for older browsers via data attributes
- **Progressive enhancement** for CSS light-dark() function
- **Polyfills** available for missing features
        `,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InteractiveDocumentation: Story = {
  render: () => ThemeDocumentationDemo,
  parameters: {
    docs: {
      description: {
        story:
          'Complete interactive documentation of the theme system with live examples and customization tools.',
      },
    },
  },
};

export const ColorSystem: Story = {
  render: () => ({
    components: { ThemeProvider, ThemeToggle },
    template: `
      <ThemeProvider>
        <div class="color-system-demo">
          <div class="demo-header">
            <h3>Color System Overview</h3>
            <ThemeToggle />
          </div>
          
          <div class="color-categories">
            <!-- Primary Colors -->
            <div class="color-category">
              <h4>Primary Colors</h4>
              <div class="color-swatches">
                <div class="swatch primary">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Primary</strong>
                    <span>Main brand color</span>
                  </div>
                </div>
                <div class="swatch secondary">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Secondary</strong>
                    <span>Supporting actions</span>
                  </div>
                </div>
                <div class="swatch tertiary">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Tertiary</strong>
                    <span>Accent elements</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Semantic Colors -->
            <div class="color-category">
              <h4>Semantic Colors</h4>
              <div class="color-swatches">
                <div class="swatch error">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Error</strong>
                    <span>Error states</span>
                  </div>
                </div>
                <div class="swatch warning">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Warning</strong>
                    <span>Warning states</span>
                  </div>
                </div>
                <div class="swatch success">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Success</strong>
                    <span>Success states</span>
                  </div>
                </div>
                <div class="swatch info">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Info</strong>
                    <span>Information</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Surface Colors -->
            <div class="color-category">
              <h4>Surface Colors</h4>
              <div class="color-swatches">
                <div class="swatch background">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Background</strong>
                    <span>Page background</span>
                  </div>
                </div>
                <div class="swatch surface">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Surface</strong>
                    <span>Card surfaces</span>
                  </div>
                </div>
                <div class="swatch text">
                  <div class="swatch-color"></div>
                  <div class="swatch-info">
                    <strong>Text</strong>
                    <span>Primary text</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Overview of the complete color system with semantic usage and theme switching.',
      },
    },
  },
};

export const TypographySystem: Story = {
  render: () => ({
    components: { ThemeProvider, ThemeToggle },
    template: `
      <ThemeProvider>
        <div class="typography-demo">
          <div class="demo-header">
            <h3>Typography System</h3>
            <ThemeToggle />
          </div>
          
          <div class="typography-sections">
            <!-- Font Families -->
            <div class="typography-section">
              <h4>Font Families</h4>
              <div class="font-samples">
                <div class="font-sample">
                  <span class="font-label">Base (IBM Plex Sans)</span>
                  <p style="font-family: var(--haspen-font-family-base)">
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div class="font-sample">
                  <span class="font-label">Heading (IBM Plex Sans)</span>
                  <h3 style="font-family: var(--haspen-font-family-heading)">
                    Heading Typography Example
                  </h3>
                </div>
                <div class="font-sample">
                  <span class="font-label">Mono (IBM Plex Mono)</span>
                  <code style="font-family: var(--haspen-font-family-mono)">
                    const theme = useTheme();
                  </code>
                </div>
              </div>
            </div>

            <!-- Font Sizes -->
            <div class="typography-section">
              <h4>Font Size Scale</h4>
              <div class="size-samples">
                <div style="font-size: var(--haspen-font-size-xs)">xs (0.75rem) - Small captions</div>
                <div style="font-size: var(--haspen-font-size-sm)">sm (0.875rem) - Small body text</div>
                <div style="font-size: var(--haspen-font-size-base)">base (1rem) - Regular body text</div>
                <div style="font-size: var(--haspen-font-size-lg)">lg (1.125rem) - Large body text</div>
                <div style="font-size: var(--haspen-font-size-xl)">xl (1.25rem) - Small heading</div>
                <div style="font-size: var(--haspen-font-size-2xl)">2xl (1.5rem) - Medium heading</div>
                <div style="font-size: var(--haspen-font-size-3xl)">3xl (1.875rem) - Large heading</div>
              </div>
            </div>

            <!-- Font Weights -->
            <div class="typography-section">
              <h4>Font Weights</h4>
              <div class="weight-samples">
                <div style="font-weight: var(--haspen-font-weight-light)">Light (300)</div>
                <div style="font-weight: var(--haspen-font-weight-normal)">Normal (400)</div>
                <div style="font-weight: var(--haspen-font-weight-medium)">Medium (500)</div>
                <div style="font-weight: var(--haspen-font-weight-semibold)">Semibold (600)</div>
                <div style="font-weight: var(--haspen-font-weight-bold)">Bold (700)</div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Typography system showcasing font families, sizes, and weights with theme integration.',
      },
    },
  },
};

export const DarkModeShowcase: Story = {
  render: () => ({
    components: { ThemeProvider, ThemeToggle, Button },
    template: `
      <ThemeProvider>
        <div class="dark-mode-showcase">
          <div class="showcase-header">
            <h3>Dark Mode Showcase</h3>
            <ThemeToggle />
          </div>
          
          <div class="showcase-grid">
            <div class="showcase-card">
              <h4>🌓 Automatic Switching</h4>
              <p>Uses CSS light-dark() function for instant theme switching without JavaScript</p>
              <div class="feature-demo">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </div>
            
            <div class="showcase-card">
              <h4>♿ Accessibility</h4>
              <p>All color combinations meet WCAG 2.1 AA contrast requirements</p>
              <div class="contrast-demo">
                <div class="contrast-item">
                  <span class="contrast-bg primary">Primary</span>
                  <small>4.5:1 contrast</small>
                </div>
                <div class="contrast-item">
                  <span class="contrast-bg text">Text</span>
                  <small>7:1 contrast</small>
                </div>
              </div>
            </div>
            
            <div class="showcase-card">
              <h4>🔄 Smooth Transitions</h4>
              <p>Smooth theme switching with CSS transitions</p>
              <div class="transition-demo">
                <div class="transition-box">Transitions enabled</div>
              </div>
            </div>
            
            <div class="showcase-card">
              <h4>💾 Persistence</h4>
              <p>Theme preference is saved and restored across sessions</p>
              <div class="persistence-info">
                <code>localStorage: haspen-ui-theme-mode</code>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Dark mode features including automatic switching, accessibility, transitions, and persistence.',
      },
    },
  },
};

export const CustomizationDemo: Story = {
  render: () => ({
    components: { ThemeProvider, Button },
    setup() {
      const customTheme = ref({
        colors: {
          primary: '#e91e63',
          secondary: '#9c27b0',
        },
      });

      return { customTheme };
    },
    template: `
      <ThemeProvider :theme="customTheme">
        <div class="customization-demo">
          <h3>Theme Customization Example</h3>
          
          <div class="custom-theme-info">
            <p>This demo uses a custom theme with pink primary and purple secondary colors.</p>
            <pre><code>const customTheme = {
  colors: {
    primary: '#e91e63',
    secondary: '#9c27b0',
  }
};</code></pre>
          </div>
          
          <div class="custom-components">
            <Button variant="primary">Custom Primary</Button>
            <Button variant="secondary">Custom Secondary</Button>
            
            <div class="custom-card">
              <h4>Custom Themed Card</h4>
              <p>This card uses the custom theme colors and automatically adapts to dark mode.</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Example of theme customization using custom colors while maintaining all other theme features.',
      },
    },
  },
};

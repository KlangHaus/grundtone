import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Design Tokens/Color System',
  parameters: {
    docs: {
      description: {
        component: `
# Modern Haspen UI Color System

A modern, performance-focused color system using CSS light-dark() function for automatic theme switching with zero JavaScript overhead.

## Key Features

- **Automatic Theme Switching**: Uses CSS \`light-dark()\` function
- **Zero JavaScript**: Pure CSS implementation
- **High Performance**: No DOM manipulation for theme changes
- **Danish Compliance**: Colors follow danish accessibility standards

## Core Colors

### Brand Colors
- **Primary**: #0059b3 (Danish government blue)
- **Secondary**: #6c757d 
- **Success**: #28a745
- **Warning**: #ffc107
- **Error**: #dc3545
- **Info**: #17a2b8

### Semantic Colors (Auto-switching)
- **Background**: light-dark(#ffffff, #121212)
- **Surface**: light-dark(#f8f9fa, #1e1e1e)
- **Text Primary**: light-dark(#212529, #ffffff)
- **Text Secondary**: light-dark(#6c757d, #b0b0b0)
- **Border**: light-dark(#dee2e6, #404040)

## Usage Examples

### CSS Custom Properties
\`\`\`css
.component {
  background-color: var(--haspen-color-surface);
  color: var(--haspen-color-text-primary);
  border: 1px solid var(--haspen-color-border);
}

.button--primary {
  background-color: var(--haspen-color-primary);
  color: white;
}

.button--primary:hover {
  background-color: var(--haspen-color-primary-hover);
}
\`\`\`

### SASS Functions
\`\`\`scss
@use '@ipeeon/design-tokens/functions' as func;

.component {
  background-color: func.color('surface');
  color: func.color('text-primary');
  padding: func.space('md');
  border-radius: func.radius('md');
}
\`\`\`

## Performance Benefits

- **No JavaScript**: Theme switching handled by CSS engine
- **No Layout Shifts**: Instant color changes
- **Automatic Detection**: Respects system preference
- **Manual Override**: Can be controlled via \`color-scheme\` property
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ColorPalette: Story = {
  render: () => ({
    template: `
      <div class="color-system-demo">
        <h2>Modern Light-Dark Color System</h2>
        
        <section class="color-section">
          <h3>Brand Colors (Fixed)</h3>
          <div class="color-grid">
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-primary)"></div>
              <div class="color-info">
                <strong>Primary</strong><br>
                <code>--haspen-color-primary</code><br>
                <small>#0059b3</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-success)"></div>
              <div class="color-info">
                <strong>Success</strong><br>
                <code>--haspen-color-success</code><br>
                <small>#28a745</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-warning)"></div>
              <div class="color-info">
                <strong>Warning</strong><br>
                <code>--haspen-color-warning</code><br>
                <small>#ffc107</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-error)"></div>
              <div class="color-info">
                <strong>Error</strong><br>
                <code>--haspen-color-error</code><br>
                <small>#dc3545</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-info)"></div>
              <div class="color-info">
                <strong>Info</strong><br>
                <code>--haspen-color-info</code><br>
                <small>#17a2b8</small>
              </div>
            </div>
          </div>
        </section>

        <section class="color-section">
          <h3>Auto-switching Colors</h3>
          <p>These colors automatically adapt to light/dark mode:</p>
          
          <div class="color-grid">
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-background); border: 1px solid var(--haspen-color-border)"></div>
              <div class="color-info">
                <strong>Background</strong><br>
                <code>--haspen-color-background</code><br>
                <small>light-dark(#ffffff, #121212)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-surface); border: 1px solid var(--haspen-color-border)"></div>
              <div class="color-info">
                <strong>Surface</strong><br>
                <code>--haspen-color-surface</code><br>
                <small>light-dark(#f8f9fa, #1e1e1e)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-surface); color: var(--haspen-color-text-primary); padding: 1rem; text-align: center; border: 1px solid var(--haspen-color-border)">Text Primary</div>
              <div class="color-info">
                <strong>Text Primary</strong><br>
                <code>--haspen-color-text-primary</code><br>
                <small>light-dark(#212529, #ffffff)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-surface); color: var(--haspen-color-text-secondary); padding: 1rem; text-align: center; border: 1px solid var(--haspen-color-border)">Text Secondary</div>
              <div class="color-info">
                <strong>Text Secondary</strong><br>
                <code>--haspen-color-text-secondary</code><br>
                <small>light-dark(#6c757d, #b0b0b0)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-border); height: 40px"></div>
              <div class="color-info">
                <strong>Border</strong><br>
                <code>--haspen-color-border</code><br>
                <small>light-dark(#dee2e6, #404040)</small>
              </div>
            </div>
          </div>
        </section>

        <section class="color-section">
          <h3>Status Background Colors</h3>
          <div class="color-grid">
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-success-background); border: 1px solid var(--haspen-color-border)"></div>
              <div class="color-info">
                <strong>Success Background</strong><br>
                <code>--haspen-color-success-background</code><br>
                <small>light-dark(#d4edda, #1a3d20)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-warning-background); border: 1px solid var(--haspen-color-border)"></div>
              <div class="color-info">
                <strong>Warning Background</strong><br>
                <code>--haspen-color-warning-background</code><br>
                <small>light-dark(#fff3cd, #3d3a1a)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-error-background); border: 1px solid var(--haspen-color-border)"></div>
              <div class="color-info">
                <strong>Error Background</strong><br>
                <code>--haspen-color-error-background</code><br>
                <small>light-dark(#f8d7da, #3d1a1c)</small>
              </div>
            </div>
            
            <div class="color-item">
              <div class="color-swatch" style="background-color: var(--haspen-color-info-background); border: 1px solid var(--haspen-color-border)"></div>
              <div class="color-info">
                <strong>Info Background</strong><br>
                <code>--haspen-color-info-background</code><br>
                <small>light-dark(#d1ecf1, #1a2e3d)</small>
              </div>
            </div>
          </div>
        </section>

        <section class="color-section">
          <h3>Interactive Example</h3>
          <div class="theme-demo">
            <div class="demo-card">
              <h4>Card Component</h4>
              <p>This card automatically adapts to your system's light/dark mode preference.</p>
              <button class="demo-button">Primary Button</button>
              <button class="demo-button demo-button--secondary">Secondary Button</button>
            </div>
          </div>
          <p><small>Try changing your system theme to see the automatic color switching!</small></p>
        </section>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Complete color palette showing both fixed brand colors and auto-switching semantic colors.',
      },
    },
  },
};

export const ThemeSwitching: Story = {
  render: () => ({
    template: `
      <div class="color-system-demo">
        <h3>Automatic Theme Switching Demo</h3>
        
        <div class="theme-comparison">
          <div class="theme-preview light-theme">
            <h4>Light Mode</h4>
            <div class="preview-content">
              <div class="preview-card">
                <div class="card-header">Light Theme</div>
                <div class="card-body">
                  <p>Background: #ffffff</p>
                  <p>Surface: #f8f9fa</p>
                  <p>Text: #212529</p>
                  <p>Border: #dee2e6</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="theme-preview dark-theme">
            <h4>Dark Mode</h4>
            <div class="preview-content">
              <div class="preview-card">
                <div class="card-header">Dark Theme</div>
                <div class="card-body">
                  <p>Background: #121212</p>
                  <p>Surface: #1e1e1e</p>
                  <p>Text: #ffffff</p>
                  <p>Border: #404040</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="code-example">
          <h4>CSS Implementation</h4>
          <pre><code>/* Single declaration, automatic switching */
.component {
  background-color: var(--haspen-color-surface);
  color: var(--haspen-color-text-primary);
  border: 1px solid var(--haspen-color-border);
}

/* CSS defines both light and dark values */
:root {
  --haspen-color-surface: light-dark(#f8f9fa, #1e1e1e);
  --haspen-color-text-primary: light-dark(#212529, #ffffff);
  --haspen-color-border: light-dark(#dee2e6, #404040);
}</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of automatic theme switching using CSS light-dark() function.',
      },
    },
  },
};

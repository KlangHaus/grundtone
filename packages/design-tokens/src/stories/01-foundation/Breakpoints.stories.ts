import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Foundation/Breakpoints',
  parameters: {
    docs: {
      description: {
        component: `
# Breakpoint System

Haspen UI uses a mobile-first responsive design approach with carefully chosen breakpoints
that cover common device sizes and orientations.

## Breakpoint Scale

### xs (0px)
Extra small devices (default mobile)
- **Devices**: Small phones
- **Typical width**: 320px - 639px
- **Orientation**: Portrait phone

### sm (640px)
Small devices
- **Devices**: Large phones, small tablets
- **Typical width**: 640px - 767px
- **Orientation**: Landscape phone, portrait tablet

### md (768px)
Medium devices
- **Devices**: Tablets
- **Typical width**: 768px - 1023px
- **Orientation**: Portrait tablet, small laptop

### lg (1024px)
Large devices
- **Devices**: Desktop, landscape tablets
- **Typical width**: 1024px - 1279px
- **Orientation**: Small desktop, landscape tablet

### xl (1280px)
Extra large devices
- **Devices**: Desktop
- **Typical width**: 1280px - 1535px
- **Orientation**: Standard desktop

### 2xl (1536px)
2X extra large devices
- **Devices**: Large desktop, 4K monitors
- **Typical width**: 1536px+
- **Orientation**: Wide desktop, multiple columns

## Mobile-First Approach

Start with mobile styles and add complexity as screen size increases:

\`\`\`css
/* Mobile first (default, no media query needed) */
.container {
  padding: 1rem;
  width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 768px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1024px;
  }
}
\`\`\`

## Usage

\`\`\`typescript
import { tokens } from '@ipeeon/design-tokens';

const breakpoints = tokens.breakpoints;
// { xs: '0px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
\`\`\`

\`\`\`scss
@use '@ipeeon/design-tokens/core/breakpoints' as bp;

.container {
  width: 100%;

  @media (min-width: #{map.get(bp.$breakpoints, 'md')}) {
    max-width: 768px;
  }

  @media (min-width: #{map.get(bp.$breakpoints, 'lg')}) {
    max-width: 1024px;
  }
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBreakpoints: Story = {
  render: () => ({
    setup() {
      const breakpoints = [
        {
          name: 'xs',
          value: '0px',
          range: '0px - 639px',
          device: 'Small phones',
          icon: '📱',
        },
        {
          name: 'sm',
          value: '640px',
          range: '640px - 767px',
          device: 'Large phones',
          icon: '📱',
        },
        {
          name: 'md',
          value: '768px',
          range: '768px - 1023px',
          device: 'Tablets',
          icon: '📱',
        },
        {
          name: 'lg',
          value: '1024px',
          range: '1024px - 1279px',
          device: 'Desktop/Laptop',
          icon: '💻',
        },
        {
          name: 'xl',
          value: '1280px',
          range: '1280px - 1535px',
          device: 'Large desktop',
          icon: '🖥️',
        },
        {
          name: '2xl',
          value: '1536px',
          range: '1536px+',
          device: 'Wide screens',
          icon: '🖥️',
        },
      ];
      return { breakpoints };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Breakpoint Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          All available breakpoints for responsive design. Mobile-first approach: styles apply from the breakpoint and up.
        </p>

        <div style="display: grid; gap: 1rem;">
          <div
            v-for="bp in breakpoints"
            :key="bp.name"
            style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div style="font-size: 3rem;">{{ bp.icon }}</div>

            <div>
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
                <code style="font-family: monospace; font-size: 1rem; color: #2563eb; font-weight: 600;">
                  {{ bp.name }}
                </code>
                <span style="font-family: monospace; font-size: 0.875rem; color: #666;">
                  {{ bp.value }}
                </span>
              </div>

              <div style="margin-bottom: 0.5rem;">
                <strong style="font-size: 0.875rem;">{{ bp.device }}</strong>
              </div>

              <div style="color: #666; font-size: 0.875rem;">
                Screen width: <code style="font-family: monospace; color: #999;">{{ bp.range }}</code>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Breakpoint Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>Mobile-first</strong>: Write base styles for mobile, enhance for larger screens</li>
            <li><strong>Progressive enhancement</strong>: Add features as screen size increases</li>
            <li><strong>Content-driven</strong>: Let content determine breakpoints, not devices</li>
            <li><strong>Test on real devices</strong>: Browser resizing doesn't replicate device behavior</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const ResponsiveDemo: Story = {
  render: () => ({
    setup() {
      const currentWidth = window.innerWidth;
      const currentBreakpoint =
        currentWidth >= 1536
          ? '2xl'
          : currentWidth >= 1280
            ? 'xl'
            : currentWidth >= 1024
              ? 'lg'
              : currentWidth >= 768
                ? 'md'
                : currentWidth >= 640
                  ? 'sm'
                  : 'xs';

      return { currentWidth, currentBreakpoint };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Responsive Layout Demo</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Resize your browser window to see the layout adapt to different breakpoints.
        </p>

        <div style="padding: 1rem; background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; margin-bottom: 2rem; text-align: center;">
          <div style="font-size: 0.875rem; color: #1e40af; margin-bottom: 0.5rem;">Current Viewport</div>
          <div style="font-size: 2rem; font-weight: 700; color: #1e40af; margin-bottom: 0.25rem;">
            {{ currentBreakpoint }}
          </div>
          <div style="font-family: monospace; font-size: 1rem; color: #1e40af;">
            {{ currentWidth }}px
          </div>
        </div>

        <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          <div style="background: white; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">📱 xs (0px+)</div>
            <div style="color: #666; font-size: 0.875rem;">
              Always visible. Base mobile styles.
            </div>
          </div>

          <div :style="{ background: 'white', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', opacity: currentWidth >= 640 ? 1 : 0.3 }">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">📱 sm (640px+)</div>
            <div style="color: #666; font-size: 0.875rem;">
              Visible on large phones and up.
            </div>
          </div>

          <div :style="{ background: 'white', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', opacity: currentWidth >= 768 ? 1 : 0.3 }">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">📱 md (768px+)</div>
            <div style="color: #666; font-size: 0.875rem;">
              Visible on tablets and up.
            </div>
          </div>

          <div :style="{ background: 'white', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', opacity: currentWidth >= 1024 ? 1 : 0.3 }">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">💻 lg (1024px+)</div>
            <div style="color: #666; font-size: 0.875rem;">
              Visible on desktop and up.
            </div>
          </div>

          <div :style="{ background: 'white', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', opacity: currentWidth >= 1280 ? 1 : 0.3 }">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">🖥️ xl (1280px+)</div>
            <div style="color: #666; font-size: 0.875rem;">
              Visible on large desktop and up.
            </div>
          </div>

          <div :style="{ background: 'white', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', opacity: currentWidth >= 1536 ? 1 : 0.3 }">
            <div style="font-weight: 600; margin-bottom: 0.5rem;">🖥️ 2xl (1536px+)</div>
            <div style="color: #666; font-size: 0.875rem;">
              Visible on wide screens.
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>💡 Tip:</strong> Resize your browser window to see components fade in at their respective breakpoints.
        </div>
      </div>
    `,
  }),
};

export const GridExample: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Responsive Grid Layout</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Example of a responsive grid that adapts to different breakpoints.
        </p>

        <div style="background: #f9fafb; padding: 2rem; border-radius: 8px;">
          <div style="display: grid; gap: 1rem; grid-template-columns: 1fr;">
            <div style="background: #3b82f6; color: white; padding: 2rem; border-radius: 8px; text-align: center; font-weight: 600;">
              1 Column (xs)
            </div>
            <div style="background: #3b82f6; color: white; padding: 2rem; border-radius: 8px; text-align: center; font-weight: 600;">
              1 Column (xs)
            </div>
            <div style="background: #3b82f6; color: white; padding: 2rem; border-radius: 8px; text-align: center; font-weight: 600;">
              1 Column (xs)
            </div>
          </div>

          <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 6px; font-size: 0.875rem;">
            <strong>Layout Breakdown:</strong>
            <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
              <li><strong>xs-sm</strong>: 1 column (mobile)</li>
              <li><strong>md</strong>: 2 columns (tablet)</li>
              <li><strong>lg+</strong>: 3 columns (desktop)</li>
            </ul>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h3 style="margin-bottom: 1rem;">Code Example</h3>
          <div style="background: #1f2937; color: #f9fafb; padding: 1.5rem; border-radius: 8px; font-family: monospace; font-size: 0.875rem; overflow-x: auto;">
            <div>.grid {</div>
            <div>  display: grid;</div>
            <div>  gap: 1rem;</div>
            <div>  grid-template-columns: 1fr; /* Mobile: 1 column */</div>
            <div>}</div>
            <div style="margin-top: 1rem;">@media (min-width: 768px) {</div>
            <div>  .grid {</div>
            <div>    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */</div>
            <div>  }</div>
            <div>}</div>
            <div style="margin-top: 1rem;">@media (min-width: 1024px) {</div>
            <div>  .grid {</div>
            <div>    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */</div>
            <div>  }</div>
            <div>}</div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ContainerWidths: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Container Max Widths</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Recommended maximum container widths for each breakpoint to maintain optimal content width.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">sm (640px)</code>
              <span style="color: #666; font-size: 0.875rem;">max-width: 640px</span>
            </div>
            <div style="background: #f0f9ff; border: 2px dashed #3b82f6; border-radius: 6px; padding: 1rem; max-width: 640px;">
              Container content
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">md (768px)</code>
              <span style="color: #666; font-size: 0.875rem;">max-width: 768px</span>
            </div>
            <div style="background: #f0f9ff; border: 2px dashed #3b82f6; border-radius: 6px; padding: 1rem; max-width: 768px;">
              Container content
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">lg (1024px)</code>
              <span style="color: #666; font-size: 0.875rem;">max-width: 1024px</span>
            </div>
            <div style="background: #f0f9ff; border: 2px dashed #3b82f6; border-radius: 6px; padding: 1rem; max-width: 1024px;">
              Container content
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">xl (1280px)</code>
              <span style="color: #666; font-size: 0.875rem;">max-width: 1280px</span>
            </div>
            <div style="background: #f0f9ff; border: 2px dashed #3b82f6; border-radius: 6px; padding: 1rem; max-width: 1280px;">
              Container content
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Container Best Practices:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Center containers with <code style="font-family: monospace; background: white; padding: 0.125rem 0.25rem; border-radius: 2px;">margin: 0 auto</code></li>
            <li>Add horizontal padding for edge spacing</li>
            <li>Use percentage widths below breakpoints</li>
            <li>Consider content type when choosing max-width</li>
            <li>Optimal reading width: 45-75 characters per line</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

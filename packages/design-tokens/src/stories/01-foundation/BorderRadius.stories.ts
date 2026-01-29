import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Foundation/Border Radius',
  parameters: {
    docs: {
      description: {
        component: `
# Border Radius System

Haspen UI provides a comprehensive border radius system for consistent rounded corners across all components.
Border radius helps soften UI elements and create visual cohesion.

## Radius Scale

### none (0)
No rounding, sharp corners
- Use for: Technical interfaces, data tables, strict layouts

### xs (2px)
Minimal rounding
- Use for: Badges, small tags, checkboxes

### sm (4px)
Subtle rounding
- Use for: Inputs, small buttons, tooltips

### default (6px)
Base rounding (recommended default)
- Use for: Cards, buttons, most components

### md (8px)
Medium rounding
- Use for: Larger cards, panels, containers

### lg (12px)
Generous rounding
- Use for: Modals, dialogs, prominent cards

### xl (16px)
Large rounding
- Use for: Hero sections, large containers

### 2xl (20px)
Extra large rounding
- Use for: Feature boxes, promotional cards

### 3xl (24px)
Maximum standard rounding
- Use for: Dramatic effect, special elements

### round (50%)
Perfect circle/ellipse
- Use for: Avatars (square), progress indicators

### full (9999px)
Pill shape
- Use for: Pills, tags, badges, rounded buttons

## Usage

\`\`\`scss
@use '@ipeeon/design-tokens/core/radius' as radius;

.button {
  border-radius: map.get(radius.$radii, 'default'); // 6px
}

.avatar {
  border-radius: map.get(radius.$radii, 'round'); // 50%
}
\`\`\`

\`\`\`css
/* Using CSS variables */
.card {
  border-radius: var(--radius-default);
}

.pill {
  border-radius: var(--radius-full);
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

export const AllRadii: Story = {
  render: () => ({
    setup() {
      const radii = [
        { name: 'none', value: '0', description: 'No rounding' },
        { name: 'xs', value: '2px', description: 'Minimal rounding' },
        { name: 'sm', value: '4px', description: 'Subtle rounding' },
        { name: 'default', value: '6px', description: 'Base rounding' },
        { name: 'md', value: '8px', description: 'Medium rounding' },
        { name: 'lg', value: '12px', description: 'Generous rounding' },
        { name: 'xl', value: '16px', description: 'Large rounding' },
        { name: '2xl', value: '20px', description: 'Extra large' },
        { name: '3xl', value: '24px', description: 'Maximum standard' },
        { name: 'round', value: '50%', description: 'Perfect circle' },
        { name: 'full', value: '9999px', description: 'Pill shape' },
      ];
      return { radii };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Border Radius Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          All available border radius tokens for consistent rounded corners.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div
            v-for="radius in radii"
            :key="radius.name"
            style="display: flex; align-items: center; gap: 2rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div style="flex: 1;">
              <div style="margin-bottom: 0.5rem;">
                <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                  {{ radius.name }}
                </code>
              </div>
              <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.25rem;">
                {{ radius.description }}
              </div>
              <div style="font-family: monospace; font-size: 0.75rem; color: #999;">
                {{ radius.value }}
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: center;">
              <!-- Square example -->
              <div
                :style="{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: radius.value,
                }"
              />

              <!-- Rectangle example -->
              <div
                v-if="radius.name !== 'round'"
                :style="{
                  width: '120px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: radius.value,
                }"
              />
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>none-sm</strong>: Technical interfaces, minimal styling</li>
            <li><strong>default-md</strong>: Most UI components (recommended)</li>
            <li><strong>lg-3xl</strong>: Prominent elements, cards, containers</li>
            <li><strong>round</strong>: Circular avatars (on square elements)</li>
            <li><strong>full</strong>: Pills, tags, fully rounded buttons</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const ComponentExamples: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Component Examples</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Recommended border radius for common UI components.
        </p>

        <div style="display: grid; gap: 2rem;">
          <!-- Buttons -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Buttons</h3>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
              <button style="padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                Small (sm)
              </button>
              <button style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                Base (default)
              </button>
              <button style="padding: 1rem 2rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">
                Large (md)
              </button>
              <button style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 9999px; cursor: pointer; font-weight: 500;">
                Pill (full)
              </button>
            </div>
          </div>

          <!-- Inputs -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Input Fields</h3>
            <div style="padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
              <div style="display: grid; gap: 1rem; max-width: 400px;">
                <input
                  type="text"
                  placeholder="Small radius (sm - 4px)"
                  style="padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem;"
                />
                <input
                  type="text"
                  placeholder="Default radius (default - 6px)"
                  style="padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;"
                />
                <input
                  type="text"
                  placeholder="Medium radius (md - 8px)"
                  style="padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                />
              </div>
            </div>
          </div>

          <!-- Cards -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Cards</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
              <div style="background: white; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Default Card</div>
                <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">
                  Using default radius (6px)
                </div>
                <code style="font-size: 0.75rem; color: #999;">border-radius: 6px</code>
              </div>

              <div style="background: white; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Medium Card</div>
                <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">
                  Using medium radius (8px)
                </div>
                <code style="font-size: 0.75rem; color: #999;">border-radius: 8px</code>
              </div>

              <div style="background: white; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Large Card</div>
                <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">
                  Using large radius (12px)
                </div>
                <code style="font-size: 0.75rem; color: #999;">border-radius: 12px</code>
              </div>
            </div>
          </div>

          <!-- Badges and Pills -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Badges & Pills</h3>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
              <span style="padding: 0.25rem 0.5rem; background: #dbeafe; color: #1e40af; border-radius: 2px; font-size: 0.75rem; font-weight: 600;">
                XS Badge
              </span>
              <span style="padding: 0.25rem 0.75rem; background: #dcfce7; color: #166534; border-radius: 4px; font-size: 0.875rem; font-weight: 600;">
                SM Badge
              </span>
              <span style="padding: 0.5rem 1rem; background: #fef3c7; color: #92400e; border-radius: 6px; font-size: 0.875rem; font-weight: 600;">
                Default Badge
              </span>
              <span style="padding: 0.5rem 1rem; background: #fee2e2; color: #991b1b; border-radius: 9999px; font-size: 0.875rem; font-weight: 600;">
                Pill Badge
              </span>
            </div>
          </div>

          <!-- Avatars -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Avatars</h3>
            <div style="display: flex; gap: 1rem; align-items: center; padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                JD
              </div>
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.125rem;">
                SM
              </div>
              <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.5rem;">
                LG
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Component Radius Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>Buttons</strong>: sm-default for standard, full for pills</li>
            <li><strong>Inputs</strong>: sm-default for form fields</li>
            <li><strong>Cards</strong>: default-lg depending on size</li>
            <li><strong>Badges</strong>: xs-sm for compact, full for pills</li>
            <li><strong>Avatars</strong>: round (50%) for perfect circles</li>
            <li><strong>Modals</strong>: lg-xl for prominent dialogs</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const ResponsiveRadius: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Responsive Border Radius</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Guidelines for adjusting border radius across different screen sizes.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">📱</span>
              Mobile (< 640px)
            </h3>
            <div style="background: #f0f9ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 1rem;">
              <p style="margin-bottom: 0.75rem; font-size: 0.875rem;">Use smaller radius for compact layouts:</p>
              <ul style="padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
                <li>Cards: 6px (default)</li>
                <li>Buttons: 4px-6px (sm-default)</li>
                <li>Modals: 8px (md)</li>
              </ul>
            </div>
            <div style="background: white; padding: 1rem; border: 2px solid #3b82f6; border-radius: 6px;">
              <div style="font-weight: 600; margin-bottom: 0.5rem;">Mobile Card</div>
              <div style="color: #666; font-size: 0.875rem;">
                Smaller radius (6px) for compact mobile screens
              </div>
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">💻</span>
              Desktop (> 1024px)
            </h3>
            <div style="background: #f0f9ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 1rem;">
              <p style="margin-bottom: 0.75rem; font-size: 0.875rem;">Use larger radius for spacious layouts:</p>
              <ul style="padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
                <li>Cards: 8px-12px (md-lg)</li>
                <li>Buttons: 6px-8px (default-md)</li>
                <li>Modals: 12px-16px (lg-xl)</li>
              </ul>
            </div>
            <div style="background: white; padding: 2rem; border: 2px solid #3b82f6; border-radius: 12px;">
              <div style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1.125rem;">Desktop Card</div>
              <div style="color: #666;">
                Larger radius (12px) for spacious desktop layouts
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Responsive Radius Tips:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Increase radius proportionally with component size</li>
            <li>Maintain consistency across similar components</li>
            <li>Don't change radius on every breakpoint</li>
            <li>Consider touch targets on mobile devices</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { spacing } from '../../spacing';

const meta: Meta = {
  title: 'Foundation/Spacing',
  parameters: {
    docs: {
      description: {
        component: `
# Spacing System

Haspen UI uses a comprehensive spacing system for consistent margins, padding, and gaps throughout the design system.
The spacing scale is designed for flexibility while maintaining visual harmony.

## Spacing Scale

The spacing system provides a wide range of values from 0 to 96:

### Micro Spacing (0-4)
- **0**: No space
- **px**: 1px hairline borders
- **0.5-4**: Fine-grained control for tight layouts (2px - 16px)

### Base Spacing (5-12)
- **5-12**: Common UI spacing (20px - 48px)
- Most frequently used for component padding and gaps

### Large Spacing (14-32)
- **14-32**: Section spacing and layout (56px - 128px)
- Used for component spacing and page sections

### Extra Large Spacing (36-96)
- **36-96**: Major layout spacing (144px - 384px)
- For page margins, hero sections, and large breakpoints

## Usage Modes

### Padding
Internal spacing within components and containers

### Margin
External spacing between components and sections

### Gap
Spacing between flex/grid items

## Responsive Considerations

- Use smaller spacing (0.5-6) for mobile devices
- Use medium spacing (8-16) for tablets
- Use larger spacing (20-48) for desktop
- Extra large spacing (52+) reserved for wide screens

## Usage

\`\`\`typescript
import { spacing } from '@ipeeon/design-tokens';

const styles = {
  padding: spacing[4], // '1rem' (16px)
  margin: spacing[8], // '2rem' (32px)
  gap: spacing[2], // '0.5rem' (8px)
};
\`\`\`

\`\`\`scss
@use '@ipeeon/design-tokens/core/spacing' as space;

.container {
  padding: $spacing-4; // 1rem
  margin-bottom: $spacing-8; // 2rem
  gap: $spacing-2; // 0.5rem
}
\`\`\`

\`\`\`css
/* Using CSS variables */
.box {
  padding: var(--haspen-spacing-4);
  margin: var(--haspen-spacing-8);
  gap: var(--haspen-spacing-2);
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

export const SpacingScale: Story = {
  render: () => ({
    setup() {
      const spaces = Object.entries(spacing).map(([name, value]) => ({
        name,
        value,
        pixels:
          value === '0'
            ? '0px'
            : value === '1px'
              ? '1px'
              : `${parseFloat(value) * 16}px`,
      }));
      return { spaces };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Complete Spacing Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          All available spacing tokens from smallest to largest. Each token shows the value in rem and pixels.
        </p>

        <div style="display: grid; gap: 0.5rem;">
          <div
            v-for="space in spaces"
            :key="space.name"
            style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px;"
          >
            <div style="min-width: 60px;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                {{ space.name }}
              </code>
            </div>

            <div style="flex: 1; display: flex; align-items: center; gap: 1rem;">
              <div
                :style="{
                  width: space.value,
                  height: '32px',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: '4px',
                  minWidth: space.value === '0' ? '2px' : space.value,
                }"
              />

              <div style="display: flex; gap: 1rem; color: #666; font-size: 0.875rem; font-family: monospace;">
                <span>{{ space.value }}</span>
                <span style="color: #999;">{{ space.pixels }}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>0-4</strong>: Tight spacing, small components, borders</li>
            <li><strong>5-12</strong>: Component padding, common gaps</li>
            <li><strong>14-32</strong>: Section spacing, layout margins</li>
            <li><strong>36-96</strong>: Page-level spacing, hero sections</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const PaddingExamples: Story = {
  render: () => ({
    setup() {
      const commonPadding = [
        { name: '1', value: spacing['1'], use: 'Very tight (input padding)' },
        { name: '2', value: spacing['2'], use: 'Tight (button sm)' },
        { name: '3', value: spacing['3'], use: 'Compact (badge)' },
        { name: '4', value: spacing['4'], use: 'Base (button, input)' },
        { name: '6', value: spacing['6'], use: 'Comfortable (card)' },
        { name: '8', value: spacing['8'], use: 'Spacious (container)' },
        { name: '12', value: spacing['12'], use: 'Generous (section)' },
      ];
      return { commonPadding };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Padding Examples</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Common padding values used for component internal spacing.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div
            v-for="pad in commonPadding"
            :key="pad.name"
            style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;"
          >
            <div style="padding: 1rem; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                  {{ pad.name }}
                </code>
                <span style="color: #666; font-size: 0.875rem; font-family: monospace;">{{ pad.value }}</span>
                <span style="color: #999; font-size: 0.875rem;">{{ pad.use }}</span>
              </div>
            </div>

            <div style="padding: 1rem; background: #f0f9ff;">
              <div
                :style="{
                  padding: pad.value,
                  background: 'white',
                  border: '2px dashed #3b82f6',
                  borderRadius: '6px',
                }"
              >
                <div style="background: #dbeafe; padding: 0.5rem; border-radius: 4px; text-align: center; font-size: 0.875rem;">
                  Content with {{ pad.value }} padding
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Padding Best Practices:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Use consistent padding within similar components</li>
            <li>Larger components need more padding for visual balance</li>
            <li>Match padding with border-radius proportionally</li>
            <li>Consider touch targets (minimum 44px) for interactive elements</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const MarginExamples: Story = {
  render: () => ({
    setup() {
      const commonMargin = [
        { name: '2', value: spacing['2'], use: 'Tight stacking' },
        { name: '4', value: spacing['4'], use: 'Base spacing' },
        { name: '6', value: spacing['6'], use: 'Comfortable spacing' },
        { name: '8', value: spacing['8'], use: 'Section spacing' },
        { name: '12', value: spacing['12'], use: 'Large section' },
        { name: '16', value: spacing['16'], use: 'Major sections' },
      ];
      return { commonMargin };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Margin Examples</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Common margin values for spacing between components and sections.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div
            v-for="margin in commonMargin"
            :key="margin.name"
            style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;"
          >
            <div style="padding: 1rem; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                  {{ margin.name }}
                </code>
                <span style="color: #666; font-size: 0.875rem; font-family: monospace;">{{ margin.value }}</span>
                <span style="color: #999; font-size: 0.875rem;">{{ margin.use }}</span>
              </div>
            </div>

            <div style="padding: 1rem; background: #f0f9ff;">
              <div style="background: white; border: 2px dashed #3b82f6; border-radius: 6px; padding: 0.75rem; text-align: center; font-size: 0.875rem;">
                First Element
              </div>

              <div
                :style="{
                  height: margin.value,
                  background: 'repeating-linear-gradient(90deg, #bfdbfe 0px, #bfdbfe 4px, transparent 4px, transparent 8px)',
                  margin: '0',
                  borderLeft: '2px solid #3b82f6',
                  borderRight: '2px solid #3b82f6',
                }"
              />

              <div style="background: white; border: 2px dashed #3b82f6; border-radius: 6px; padding: 0.75rem; text-align: center; font-size: 0.875rem;">
                Second Element
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Margin Best Practices:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Use margin-bottom for vertical rhythm</li>
            <li>Avoid margin-top to prevent collapsing margins</li>
            <li>Use consistent margins within content sections</li>
            <li>Increase margins for distinct sections</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const GapExamples: Story = {
  render: () => ({
    setup() {
      const commonGap = [
        { name: '1', value: spacing['1'] },
        { name: '2', value: spacing['2'] },
        { name: '4', value: spacing['4'] },
        { name: '6', value: spacing['6'] },
        { name: '8', value: spacing['8'] },
      ];
      return { commonGap };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Gap Examples (Flexbox/Grid)</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Common gap values for spacing between flex and grid items.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div
            v-for="gap in commonGap"
            :key="gap.name"
            style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;"
          >
            <div style="padding: 1rem; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                  gap: {{ gap.name }}
                </code>
                <span style="color: #666; font-size: 0.875rem; font-family: monospace;">{{ gap.value }}</span>
              </div>
            </div>

            <div style="padding: 1rem; background: #f0f9ff;">
              <div :style="{ display: 'flex', gap: gap.value }">
                <div style="flex: 1; background: #dbeafe; padding: 1rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">
                  Item 1
                </div>
                <div style="flex: 1; background: #dbeafe; padding: 1rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">
                  Item 2
                </div>
                <div style="flex: 1; background: #dbeafe; padding: 1rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">
                  Item 3
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h3 style="margin-bottom: 1rem;">Grid Example</h3>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">1</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">2</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">3</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">4</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">5</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">6</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">7</div>
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 6px; border: 2px dashed #3b82f6; text-align: center; font-size: 0.875rem;">8</div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Gap Best Practices:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Use gap instead of margins in flex/grid containers</li>
            <li>Smaller gaps (1-4) for compact layouts</li>
            <li>Medium gaps (6-8) for standard layouts</li>
            <li>Larger gaps (12+) for spacious layouts</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const ResponsiveSpacing: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Responsive Spacing</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Guidelines for responsive spacing across different screen sizes.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">📱</span>
              Mobile (< 640px)
            </h3>
            <div style="background: #f0f9ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin-bottom: 0.75rem; font-size: 0.875rem;">Use smaller spacing for compact screens:</p>
              <ul style="padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
                <li>Container padding: 4-6 (1rem - 1.5rem)</li>
                <li>Section spacing: 8-12 (2rem - 3rem)</li>
                <li>Component gaps: 2-4 (0.5rem - 1rem)</li>
              </ul>
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">📱</span>
              Tablet (640px - 1024px)
            </h3>
            <div style="background: #f0f9ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin-bottom: 0.75rem; font-size: 0.875rem;">Increase spacing for better use of space:</p>
              <ul style="padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
                <li>Container padding: 6-8 (1.5rem - 2rem)</li>
                <li>Section spacing: 12-16 (3rem - 4rem)</li>
                <li>Component gaps: 4-6 (1rem - 1.5rem)</li>
              </ul>
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">💻</span>
              Desktop (> 1024px)
            </h3>
            <div style="background: #f0f9ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin-bottom: 0.75rem; font-size: 0.875rem;">Use generous spacing for comfort:</p>
              <ul style="padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
                <li>Container padding: 8-12 (2rem - 3rem)</li>
                <li>Section spacing: 16-24 (4rem - 6rem)</li>
                <li>Component gaps: 6-8 (1.5rem - 2rem)</li>
              </ul>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Responsive Spacing Tips:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Start with mobile spacing and progressively enhance</li>
            <li>Use CSS clamp() for fluid spacing: clamp(1rem, 2vw, 2rem)</li>
            <li>Test on actual devices, not just browser resize</li>
            <li>Consider content density for each breakpoint</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { typography } from '../../typography';

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    docs: {
      description: {
        component: `
# Typography System

Haspen UI provides a comprehensive typography system with carefully selected font families, sizes, weights, and line heights
optimized for readability and visual hierarchy.

## Font Families

### Sans-serif (Primary)
The default font family uses a system font stack for optimal performance and native feel:
- **Inter**: Modern, highly legible sans-serif (primary)
- **system-ui**: Native system font
- **-apple-system**: Apple system font
- **sans-serif**: Generic fallback

### Monospace (Code)
For code blocks, inline code, and technical content:
- **JetBrains Mono**: Modern, highly readable monospace font
- **monospace**: Generic fallback

## Font Sizes

The type scale uses a harmonious progression based on a 1.125 ratio (major second):

- **xs** (0.75rem / 12px): Small labels, captions
- **sm** (0.875rem / 14px): Secondary text, helper text
- **base** (1rem / 16px): Body text (default)
- **lg** (1.125rem / 18px): Emphasized text, lead paragraphs
- **xl** (1.25rem / 20px): Subheadings
- **2xl** (1.5rem / 24px): H4 headings
- **3xl** (1.875rem / 30px): H3 headings
- **4xl** (2.25rem / 36px): H2 headings
- **5xl** (3rem / 48px): H1 headings, hero text

## Font Weights

- **thin** (100): Rarely used, decorative only
- **light** (300): Large text, minimal emphasis
- **normal** (400): Body text (default)
- **medium** (500): Subtle emphasis
- **semibold** (600): Strong emphasis, buttons
- **bold** (700): Headings, high emphasis
- **extrabold** (800): Maximum emphasis, hero text

## Line Heights

- **none** (1): Tight spacing for headings
- **tight** (1.25): Headings and compact text
- **normal** (1.5): Body text (default)
- **relaxed** (1.75): Longer form content
- **loose** (2): Maximum readability

## Usage

\`\`\`typescript
import { typography } from '@ipeeon/design-tokens';

const styles = {
  fontFamily: typography.fontFamily.sans.join(', '),
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.normal,
  lineHeight: typography.lineHeight.normal,
};
\`\`\`

\`\`\`scss
@use '@ipeeon/design-tokens/core/typography' as type;

.heading {
  font-family: $font-family-base;
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
}
\`\`\`

\`\`\`css
/* Using CSS variables */
.body-text {
  font-family: var(--haspen-font-family-base);
  font-size: var(--haspen-font-size-base);
  font-weight: var(--haspen-font-weight-normal);
  line-height: var(--haspen-line-height-normal);
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

export const FontSizes: Story = {
  render: () => ({
    setup() {
      const sizes = Object.entries(typography.fontSize).map(
        ([name, value]) => ({
          name,
          value,
          pixels: `${parseFloat(value) * 16}px`,
        }),
      );
      return { sizes };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Font Size Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          A harmonious type scale that creates clear visual hierarchy.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div
            v-for="size in sizes"
            :key="size.name"
            style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                {{ size.name }}
              </code>
              <span style="color: #666; font-size: 0.875rem;">{{ size.value }}</span>
              <span style="color: #999; font-size: 0.875rem;">{{ size.pixels }}</span>
            </div>
            <div :style="{ fontSize: size.value, fontWeight: 400 }">
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>xs-sm</strong>: Captions, labels, helper text</li>
            <li><strong>base-lg</strong>: Body text, paragraphs</li>
            <li><strong>xl-2xl</strong>: Subheadings, emphasized content</li>
            <li><strong>3xl-5xl</strong>: Page headings, hero text</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const FontWeights: Story = {
  render: () => ({
    setup() {
      const weights = Object.entries(typography.fontWeight).map(
        ([name, value]) => ({
          name,
          value,
        }),
      );
      return { weights };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Font Weight Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Different weights for creating emphasis and hierarchy.
        </p>

        <div style="display: grid; gap: 1rem;">
          <div
            v-for="weight in weights"
            :key="weight.name"
            style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                {{ weight.name }}
              </code>
              <span style="color: #666; font-size: 0.875rem;">{{ weight.value }}</span>
            </div>
            <div :style="{ fontSize: '1.125rem', fontWeight: weight.value }">
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>thin-light</strong>: Decorative, large display text only</li>
            <li><strong>normal</strong>: Body text (default)</li>
            <li><strong>medium</strong>: Subtle emphasis, buttons</li>
            <li><strong>semibold-bold</strong>: Headings, strong emphasis</li>
            <li><strong>extrabold</strong>: Hero text, maximum impact</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const LineHeights: Story = {
  render: () => ({
    setup() {
      const heights = Object.entries(typography.lineHeight).map(
        ([name, value]) => ({
          name,
          value,
        }),
      );
      return { heights };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Line Height Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Line heights optimized for different content types and reading experiences.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div
            v-for="height in heights"
            :key="height.name"
            style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                {{ height.name }}
              </code>
              <span style="color: #666; font-size: 0.875rem;">{{ height.value }}</span>
            </div>
            <div :style="{ fontSize: '1rem', lineHeight: height.value }">
              Typography is the art and technique of arranging type to make written language legible, readable and appealing.
              The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing,
              and adjusting the space between pairs of letters. Good typography enhances the reading experience.
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>none-tight</strong>: Headings, short text, compact layouts</li>
            <li><strong>normal</strong>: Body text (default, optimal readability)</li>
            <li><strong>relaxed-loose</strong>: Long-form content, improved scanability</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const TypeScale: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Complete Type Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Visual demonstration of the entire typography system in action.
        </p>

        <div style="background: white; padding: 2rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="font-size: 3rem; font-weight: 700; line-height: 1; margin-bottom: 1rem;">
            Display Heading (5xl/bold)
          </h1>
          <p style="font-size: 1.125rem; color: #666; line-height: 1.75; margin-bottom: 2rem;">
            This is a lead paragraph that introduces the content (lg/normal/relaxed)
          </p>

          <h2 style="font-size: 2.25rem; font-weight: 700; line-height: 1.25; margin-bottom: 1rem; margin-top: 2rem;">
            Page Heading (4xl/bold)
          </h2>
          <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 1.5rem;">
            This is regular body text that makes up the bulk of content (base/normal/normal).
            It should be comfortable to read for extended periods and maintain good readability across different devices.
          </p>

          <h3 style="font-size: 1.875rem; font-weight: 700; line-height: 1.25; margin-bottom: 0.75rem; margin-top: 1.5rem;">
            Section Heading (3xl/bold)
          </h3>
          <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 1rem;">
            More body text demonstrating how headings and paragraphs work together in a harmonious type system.
          </p>

          <h4 style="font-size: 1.5rem; font-weight: 600; line-height: 1.25; margin-bottom: 0.75rem; margin-top: 1.5rem;">
            Subsection Heading (2xl/semibold)
          </h4>
          <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 0.5rem;">
            Body text with <strong style="font-weight: 600;">medium emphasis</strong> and <strong style="font-weight: 700;">strong emphasis</strong>.
          </p>
          <p style="font-size: 0.875rem; color: #666; line-height: 1.5; margin-bottom: 1rem;">
            This is secondary text in a smaller size (sm/normal) used for supplementary information.
          </p>

          <div style="margin-top: 1.5rem; padding: 1rem; background: #f9fafb; border-radius: 6px;">
            <code style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #2563eb;">
              const example = { fontSize: '0.875rem', fontFamily: 'monospace' };
            </code>
          </div>

          <p style="font-size: 0.75rem; color: #999; line-height: 1.5; margin-top: 1rem;">
            Caption text or metadata (xs/normal) for timestamps, labels, and small annotations.
          </p>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Type Hierarchy Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Use a single H1 per page for main heading</li>
            <li>Maintain logical heading hierarchy (H2 → H3 → H4)</li>
            <li>Use consistent line-height: tight for headings, normal/relaxed for body</li>
            <li>Limit line length to 60-80 characters for optimal readability</li>
            <li>Use font weight to create emphasis, not just size</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const FontFamilies: Story = {
  render: () => ({
    setup() {
      return {
        sans: typography.fontFamily.sans.join(', '),
        mono: typography.fontFamily.mono.join(', '),
      };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Font Families</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Carefully selected font stacks for optimal performance and readability.
        </p>

        <div style="display: grid; gap: 1.5rem;">
          <div style="padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600; display: block; margin-bottom: 0.5rem;">
                sans
              </code>
              <div style="color: #666; font-size: 0.875rem; font-family: monospace;">
                {{ sans }}
              </div>
            </div>
            <div :style="{ fontFamily: sans, fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }">
              The quick brown fox jumps over the lazy dog
            </div>
            <p :style="{ fontFamily: sans, fontSize: '1rem', lineHeight: 1.5 }">
              This is the primary font family used for all UI text, headings, and body content.
              It provides excellent readability and a modern, professional appearance across all platforms.
            </p>
          </div>

          <div style="padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="margin-bottom: 1rem;">
              <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600; display: block; margin-bottom: 0.5rem;">
                mono
              </code>
              <div style="color: #666; font-size: 0.875rem; font-family: monospace;">
                {{ mono }}
              </div>
            </div>
            <div :style="{ fontFamily: mono, fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem' }">
              The quick brown fox jumps over the lazy dog
            </div>
            <div :style="{ fontFamily: mono, fontSize: '0.875rem', padding: '1rem', background: '#f9fafb', borderRadius: '6px' }">
const greeting = 'Hello, World!';<br>
function add(a, b) {<br>
&nbsp;&nbsp;return a + b;<br>
}<br>
console.log(add(2, 3));
            </div>
            <p style="margin-top: 1rem; font-size: 0.875rem; color: #666;">
              Monospace font for code blocks, inline code, technical content, and data that requires fixed-width alignment.
            </p>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Why System Fonts?</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>Performance</strong>: No font downloads, instant rendering</li>
            <li><strong>Native Feel</strong>: Matches the user's operating system</li>
            <li><strong>Accessibility</strong>: Users' preferred system fonts are respected</li>
            <li><strong>Reliability</strong>: Always available, no FOUT or FOIT</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

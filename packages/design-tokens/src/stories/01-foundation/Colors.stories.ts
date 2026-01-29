import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { colors } from '../../colors';

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    docs: {
      description: {
        component: `
# Color System

Haspen UI provides a comprehensive color system with multiple color families, each containing 9 shades (50-900).
The color palette is designed to work harmoniously together and meets WCAG 2.1 accessibility standards.

## Color Families

### Base Palette Colors
- **Primary (Blue)**: Main brand color used for primary actions and emphasis
- **Gray**: Neutral colors for backgrounds, borders, and text
- **Green**: Success states and positive actions
- **Red**: Error states and destructive actions
- **Yellow**: Warning states and cautionary information
- **Indigo**: Alternative primary color for variety

### Semantic Colors
- **Primary**: Main brand color
- **Secondary**: Secondary emphasis
- **Success**: Positive outcomes
- **Warning**: Cautionary states
- **Error**: Negative outcomes
- **Info**: Informational content

### Usage Colors
- **Surface**: Background and container colors
- **Text**: Typography colors for different emphasis levels
- **Border**: Border and divider colors

## Shade Scale

Each color family follows a 50-900 scale:
- **50-200**: Very light shades for backgrounds and subtle accents
- **300-400**: Light shades for hover states and secondary content
- **500**: Base shade, the most recognizable version of the color
- **600-700**: Dark shades for primary usage and emphasis
- **800-900**: Very dark shades for high contrast and text

## Accessibility

All color combinations are tested for WCAG 2.1 compliance:
- **AAA**: Contrast ratio ≥ 7:1 (preferred)
- **AA**: Contrast ratio ≥ 4.5:1 (minimum)
- **Fail**: Contrast ratio < 4.5:1 (avoid for text)

## Usage

\`\`\`typescript
import { colors } from '@ipeeon/design-tokens';

// Access colors in TypeScript
const primaryColor = colors.primary[600]; // '#2563eb'
\`\`\`

\`\`\`scss
@use '@ipeeon/design-tokens/core/color-palette' as colors;

.button {
  // Using SCSS functions
  background-color: colors.color('blue', 600);

  // Using semantic colors
  background-color: colors.semantic('primary');
}
\`\`\`

\`\`\`css
/* Using CSS variables */
.button {
  background-color: var(--haspen-color-blue-600);
  color: var(--haspen-color-text-inverse);
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

// Helper to calculate luminance
function getLuminance(hex: string): number {
  const rgb = hex.replace('#', '');
  const r = parseInt(rgb.substring(0, 2), 16) / 255;
  const g = parseInt(rgb.substring(2, 4), 16) / 255;
  const b = parseInt(rgb.substring(4, 6), 16) / 255;

  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper to calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Helper to get WCAG level
function getWCAGLevel(ratio: number): string {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export const PrimaryBlue: Story = {
  render: () => ({
    setup() {
      const colorFamily = colors.primary;
      const shades = Object.entries(colorFamily).map(([shade, hex]) => {
        const contrastRatio = getContrastRatio(hex as string, '#ffffff');
        return {
          shade,
          hex,
          rgb: hexToRgb(hex as string),
          contrast: contrastRatio.toFixed(2),
          wcag: getWCAGLevel(contrastRatio),
        };
      });
      return { shades };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Primary (Blue) Color Family</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          The primary color is used for main brand identity, primary actions, links, and emphasis.
        </p>

        <div style="display: grid; gap: 1rem;">
          <div
            v-for="color in shades"
            :key="color.shade"
            style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div
              :style="{
                width: '80px',
                height: '80px',
                backgroundColor: color.hex,
                borderRadius: '8px',
                flexShrink: 0,
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.1)'
              }"
              :title="'Click to copy: ' + color.hex"
              @click="() => navigator.clipboard.writeText(color.hex)"
            />

            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <strong style="font-size: 1rem;">{{ color.shade }}</strong>
                <span
                  :style="{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: color.wcag === 'AAA' ? '#dcfce7' : color.wcag === 'AA' ? '#fef3c7' : '#fee2e2',
                    color: color.wcag === 'AAA' ? '#166534' : color.wcag === 'AA' ? '#92400e' : '#991b1b'
                  }"
                >
                  {{ color.wcag }}
                </span>
              </div>
              <div style="font-family: monospace; color: #666; font-size: 0.875rem;">
                <div>{{ color.hex }}</div>
                <div>RGB: {{ color.rgb }}</div>
                <div style="margin-top: 0.25rem;">Contrast vs white: {{ color.contrast }}:1</div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Examples:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>50-200: Backgrounds, subtle highlights</li>
            <li>400-500: Icons, secondary text</li>
            <li>600-700: Primary buttons, links (recommended)</li>
            <li>800-900: Dark mode, high contrast text</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const GrayNeutral: Story = {
  render: () => ({
    setup() {
      const colorFamily = colors.gray;
      const shades = Object.entries(colorFamily).map(([shade, hex]) => {
        const contrastRatio = getContrastRatio(hex as string, '#ffffff');
        return {
          shade,
          hex,
          rgb: hexToRgb(hex as string),
          contrast: contrastRatio.toFixed(2),
          wcag: getWCAGLevel(contrastRatio),
        };
      });
      return { shades };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Gray (Neutral) Color Family</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Gray colors are used for text, backgrounds, borders, and neutral UI elements.
        </p>

        <div style="display: grid; gap: 1rem;">
          <div
            v-for="color in shades"
            :key="color.shade"
            style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
          >
            <div
              :style="{
                width: '80px',
                height: '80px',
                backgroundColor: color.hex,
                borderRadius: '8px',
                flexShrink: 0,
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.1)'
              }"
              :title="'Click to copy: ' + color.hex"
              @click="() => navigator.clipboard.writeText(color.hex)"
            />

            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <strong style="font-size: 1rem;">{{ color.shade }}</strong>
                <span
                  :style="{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: color.wcag === 'AAA' ? '#dcfce7' : color.wcag === 'AA' ? '#fef3c7' : '#fee2e2',
                    color: color.wcag === 'AAA' ? '#166534' : color.wcag === 'AA' ? '#92400e' : '#991b1b'
                  }"
                >
                  {{ color.wcag }}
                </span>
              </div>
              <div style="font-family: monospace; color: #666; font-size: 0.875rem;">
                <div>{{ color.hex }}</div>
                <div>RGB: {{ color.rgb }}</div>
                <div style="margin-top: 0.25rem;">Contrast vs white: {{ color.contrast }}:1</div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Examples:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>50-100: Page backgrounds, subtle containers</li>
            <li>200-300: Borders, dividers</li>
            <li>400-500: Placeholder text, disabled state</li>
            <li>600-700: Secondary text, labels</li>
            <li>800-900: Primary text, headings</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const AllColorFamilies: Story = {
  render: () => ({
    setup() {
      const families = [
        {
          name: 'Primary (Blue)',
          colors: colors.primary,
          description: 'Main brand color',
        },
        { name: 'Gray', colors: colors.gray, description: 'Neutral colors' },
      ];

      return { families };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Complete Color Palette</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          All color families in the Haspen UI design system. Click any color to copy its hex value.
        </p>

        <div v-for="family in families" :key="family.name" style="margin-bottom: 3rem;">
          <h3 style="margin-bottom: 0.5rem;">{{ family.name }}</h3>
          <p style="color: #666; font-size: 0.875rem; margin-bottom: 1rem;">{{ family.description }}</p>

          <div style="display: flex; gap: 0.5rem; overflow-x: auto;">
            <div
              v-for="(hex, shade) in family.colors"
              :key="shade"
              style="min-width: 100px;"
            >
              <div
                :style="{
                  height: '100px',
                  backgroundColor: hex,
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.1)'
                }"
                :title="'Click to copy: ' + hex"
                @click="() => navigator.clipboard.writeText(hex)"
              />
              <div style="padding: 0.5rem; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.25rem;">{{ shade }}</div>
                <div style="font-family: monospace; font-size: 0.75rem; color: #666;">{{ hex }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ContrastChecker: Story = {
  render: () => ({
    setup() {
      const foreground = '#2563eb';
      const background = '#ffffff';
      const ratio = getContrastRatio(foreground, background);
      const level = getWCAGLevel(ratio);

      return {
        foreground,
        background,
        ratio: ratio.toFixed(2),
        level,
      };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">WCAG Contrast Checker</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Test color combinations for accessibility compliance.
        </p>

        <div style="display: grid; gap: 2rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Foreground Color</label>
              <input
                type="color"
                v-model="foreground"
                style="width: 100%; height: 60px; border-radius: 8px; border: 1px solid #e5e7eb; cursor: pointer;"
              />
              <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #666;">
                {{ foreground }}
              </div>
            </div>

            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Background Color</label>
              <input
                type="color"
                v-model="background"
                style="width: 100%; height: 60px; border-radius: 8px; border: 1px solid #e5e7eb; cursor: pointer;"
              />
              <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #666;">
                {{ background }}
              </div>
            </div>
          </div>

          <div style="padding: 2rem; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">{{ ratio }}:1</div>
            <div
              :style="{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1.25rem',
                fontWeight: 700,
                backgroundColor: level === 'AAA' ? '#dcfce7' : level === 'AA' ? '#fef3c7' : '#fee2e2',
                color: level === 'AAA' ? '#166534' : level === 'AA' ? '#92400e' : '#991b1b'
              }"
            >
              WCAG {{ level }}
            </div>
          </div>

          <div :style="{ padding: '2rem', backgroundColor: background, borderRadius: '8px', border: '1px solid #e5e7eb' }">
            <h3 :style="{ color: foreground, marginBottom: '1rem' }">Preview Heading</h3>
            <p :style="{ color: foreground, fontSize: '1.125rem', marginBottom: '1rem' }">
              This is how your text will look with these colors. The contrast ratio should be at least 4.5:1 for normal text (WCAG AA) or 7:1 for enhanced contrast (WCAG AAA).
            </p>
            <p :style="{ color: foreground, fontSize: '0.875rem' }">
              Small text (under 18px) requires higher contrast ratios for readability.
            </p>
          </div>

          <div style="padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
            <strong>WCAG 2.1 Guidelines:</strong>
            <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
              <li><strong>AAA</strong> (7:1): Enhanced contrast for maximum accessibility</li>
              <li><strong>AA</strong> (4.5:1): Minimum contrast for normal text</li>
              <li><strong>AA Large</strong> (3:1): Minimum for text ≥18px or ≥14px bold</li>
              <li><strong>Fail</strong> (&lt;4.5:1): Does not meet WCAG standards</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
};

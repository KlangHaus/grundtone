import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

const meta: Meta = {
  title: 'Design Tokens/TypeScript API',
  parameters: {
    docs: {
      description: {
        component: `
# TypeScript/JavaScript API

Access design tokens directly in TypeScript and JavaScript code for runtime styling, theming, and dynamic UI.

## Why Use the TypeScript API?

While SCSS is great for static styles, the TypeScript API allows you to:

- 🎨 **Generate dynamic styles** based on user preferences or data
- 🌙 **Build theme switchers** that manipulate colors at runtime
- 📊 **Create data visualizations** with consistent color palettes
- 🎯 **Compute responsive values** dynamically in JavaScript
- ⚡ **Type-safe access** to all design tokens with full autocomplete

## Installation

The TypeScript exports are included when you install the package:

\`\`\`bash
npm install @ipeeon/design-tokens
# or
pnpm add @ipeeon/design-tokens
\`\`\`

## Available Exports

- \`colors\` - Color palette with all shades
- \`spacing\` - Spacing scale from 0 to 96
- \`typography\` - Font families, sizes, weights, line heights
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ColorTokens: Story = {
  render: () => ({
    setup() {
      return { colors };
    },
    template: `
      <div class="typescript-demo">
        <h2>Color Tokens in TypeScript</h2>

        <h3>Import</h3>
        <div class="code-block">
          <pre><code>import { colors } from '@ipeeon/design-tokens';

// Access color values
const primaryBlue = colors.primary[500];  // '#3b82f6'
const lightGray = colors.gray[100];       // '#f3f4f6'
const darkGray = colors.gray[900];        // '#111827'</code></pre>
        </div>

        <h3>Available Color Palettes</h3>
        <div class="color-palettes">
          <div class="palette-section">
            <strong>Primary Blues</strong>
            <div class="color-grid">
              <div v-for="(color, shade) in colors.primary"
                   :key="shade"
                   class="color-swatch"
                   :style="{ backgroundColor: color }">
                <div class="swatch-label">
                  <code>colors.primary[{{ shade }}]</code>
                  <small>{{ color }}</small>
                </div>
              </div>
            </div>
          </div>

          <div class="palette-section">
            <strong>Gray Scale</strong>
            <div class="color-grid">
              <div v-for="(color, shade) in colors.gray"
                   :key="shade"
                   class="color-swatch"
                   :style="{
                     backgroundColor: color,
                     color: Number(shade) >= 500 ? '#fff' : '#000'
                   }">
                <div class="swatch-label">
                  <code>colors.gray[{{ shade }}]</code>
                  <small>{{ color }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>TypeScript Type Safety</h3>
        <div class="code-block">
          <pre><code>// Full type safety with autocomplete
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

function getColor(palette: 'primary' | 'gray', shade: ColorShade): string {
  return colors[palette][shade];
}

// TypeScript will error if you use invalid values
const color1 = getColor('primary', 500);  // ✅ Valid
const color2 = getColor('primary', 550);  // ❌ TypeScript error
const color3 = getColor('blue', 500);     // ❌ TypeScript error</code></pre>
        </div>

        <h3>Runtime Usage Examples</h3>
        <div class="code-block">
          <pre><code>import { colors } from '@ipeeon/design-tokens';

// Example 1: Dynamic button styling
function createButton(variant: 'primary' | 'secondary') {
  const button = document.createElement('button');

  if (variant === 'primary') {
    button.style.backgroundColor = colors.primary[600];
    button.style.color = '#ffffff';
  } else {
    button.style.backgroundColor = colors.gray[100];
    button.style.color = colors.gray[900];
  }

  return button;
}

// Example 2: Theme generator
function generateTheme(baseColor: string, isDark: boolean) {
  return {
    background: isDark ? colors.gray[900] : colors.gray[50],
    surface: isDark ? colors.gray[800] : '#ffffff',
    text: isDark ? colors.gray[100] : colors.gray[900],
    primary: baseColor,
  };
}

// Example 3: Data visualization
const chartColors = [
  colors.primary[500],
  colors.primary[600],
  colors.primary[700],
  colors.primary[800],
];

// Example 4: Conditional styling in Vue/React
const backgroundColor = isActive
  ? colors.primary[500]
  : colors.gray[100];</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Access color tokens in TypeScript/JavaScript with full type safety.',
      },
    },
  },
};

export const SpacingTokens: Story = {
  render: () => ({
    setup() {
      return { spacing };
    },
    template: `
      <div class="typescript-demo">
        <h2>Spacing Tokens in TypeScript</h2>

        <h3>Import</h3>
        <div class="code-block">
          <pre><code>import { spacing } from '@ipeeon/design-tokens';

// Access spacing values (in rem)
const small = spacing[2];    // '0.5rem'   (8px)
const medium = spacing[4];   // '1rem'     (16px)
const large = spacing[8];    // '2rem'     (32px)
const xl = spacing[12];      // '3rem'     (48px)</code></pre>
        </div>

        <h3>Spacing Scale</h3>
        <div class="spacing-visualization">
          <div class="spacing-row" v-for="(value, key) in spacing" :key="key">
            <code class="spacing-key">spacing[{{ key }}]</code>
            <div class="spacing-bar" :style="{ width: value }"></div>
            <span class="spacing-value">{{ value }}</span>
          </div>
        </div>

        <h3>Usage Examples</h3>
        <div class="code-block">
          <pre><code>import { spacing } from '@ipeeon/design-tokens';

// Example 1: Dynamic padding
function setElementSpacing(element: HTMLElement, size: 'sm' | 'md' | 'lg') {
  const spacingMap = {
    sm: spacing[2],   // 0.5rem
    md: spacing[4],   // 1rem
    lg: spacing[8],   // 2rem
  };

  element.style.padding = spacingMap[size];
}

// Example 2: Calculated spacing
const cardPadding = spacing[4];           // 1rem
const cardGap = spacing[3];               // 0.75rem
const totalSpace = \`calc(\${cardPadding} + \${cardGap})\`;

// Example 3: Grid layout
const gridStyles = {
  gap: spacing[4],
  padding: spacing[6],
  margin: spacing[8],
};

// Example 4: Responsive spacing in Vue/React
const getPadding = (isMobile: boolean) =>
  isMobile ? spacing[2] : spacing[6];

// Example 5: Component props
interface CardProps {
  padding?: keyof typeof spacing;
}

function Card({ padding = 4 }: CardProps) {
  return {
    style: {
      padding: spacing[padding]
    }
  };
}</code></pre>
        </div>

        <h3>Special Values</h3>
        <div class="code-block">
          <pre><code>// Zero spacing
spacing[0]     // '0'

// Pixel precision
spacing.px     // '1px'

// Half values
spacing[0.5]   // '0.125rem'
spacing[1.5]   // '0.375rem'
spacing[2.5]   // '0.625rem'</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Access spacing tokens for dynamic padding, margins, and gaps.',
      },
    },
  },
};

export const TypographyTokens: Story = {
  render: () => ({
    setup() {
      return { typography };
    },
    template: `
      <div class="typescript-demo">
        <h2>Typography Tokens in TypeScript</h2>

        <h3>Import</h3>
        <div class="code-block">
          <pre><code>import { typography } from '@ipeeon/design-tokens';

// Font families
const sansFont = typography.fontFamily.sans;  // ['Inter', 'system-ui', ...]
const monoFont = typography.fontFamily.mono;  // ['JetBrains Mono', 'monospace']

// Font sizes
const baseSize = typography.fontSize.base;    // '1rem'
const largeSize = typography.fontSize.xl;     // '1.25rem'

// Font weights
const normal = typography.fontWeight.normal;  // '400'
const bold = typography.fontWeight.bold;      // '700'

// Line heights
const tight = typography.lineHeight.tight;    // '1.25'
const normal = typography.lineHeight.normal;  // '1.5'</code></pre>
        </div>

        <h3>Font Families</h3>
        <div class="font-families">
          <div class="font-demo" :style="{ fontFamily: typography.fontFamily.sans.join(', ') }">
            <strong>Sans Serif</strong>
            <code>typography.fontFamily.sans</code>
            <p>The quick brown fox jumps over the lazy dog</p>
            <small>{{ typography.fontFamily.sans.join(', ') }}</small>
          </div>

          <div class="font-demo" :style="{ fontFamily: typography.fontFamily.mono.join(', ') }">
            <strong>Monospace</strong>
            <code>typography.fontFamily.mono</code>
            <p>The quick brown fox jumps over the lazy dog</p>
            <small>{{ typography.fontFamily.mono.join(', ') }}</small>
          </div>
        </div>

        <h3>Font Sizes</h3>
        <div class="font-sizes">
          <div v-for="(size, key) in typography.fontSize"
               :key="key"
               class="size-demo"
               :style="{ fontSize: size }">
            <code>typography.fontSize.{{ key }}</code>
            <span class="size-value">{{ size }}</span>
            <span>Sample Text</span>
          </div>
        </div>

        <h3>Font Weights</h3>
        <div class="font-weights">
          <div v-for="(weight, key) in typography.fontWeight"
               :key="key"
               class="weight-demo"
               :style="{ fontWeight: weight }">
            <code>typography.fontWeight.{{ key }}</code>
            <span class="weight-value">{{ weight }}</span>
            <span>Sample Text</span>
          </div>
        </div>

        <h3>Usage Examples</h3>
        <div class="code-block">
          <pre><code>import { typography } from '@ipeeon/design-tokens';

// Example 1: Dynamic heading styles
function createHeading(level: 1 | 2 | 3, text: string) {
  const heading = document.createElement(\`h\${level}\`);
  heading.textContent = text;

  const sizeMap = {
    1: typography.fontSize['4xl'],
    2: typography.fontSize['3xl'],
    3: typography.fontSize['2xl'],
  };

  heading.style.fontSize = sizeMap[level];
  heading.style.fontWeight = typography.fontWeight.bold;
  heading.style.lineHeight = typography.lineHeight.tight;

  return heading;
}

// Example 2: Text component props
interface TextProps {
  size?: keyof typeof typography.fontSize;
  weight?: keyof typeof typography.fontWeight;
  family?: keyof typeof typography.fontFamily;
}

function Text({
  size = 'base',
  weight = 'normal',
  family = 'sans'
}: TextProps) {
  return {
    style: {
      fontSize: typography.fontSize[size],
      fontWeight: typography.fontWeight[weight],
      fontFamily: typography.fontFamily[family][0]
    }
  };
}

// Example 3: Responsive typography
function getResponsiveFontSize(breakpoint: 'mobile' | 'tablet' | 'desktop') {
  const sizeMap = {
    mobile: typography.fontSize.sm,
    tablet: typography.fontSize.base,
    desktop: typography.fontSize.lg,
  };

  return sizeMap[breakpoint];
}

// Example 4: Code block styling
const codeStyles = {
  fontFamily: typography.fontFamily.mono[0],
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.relaxed,
};

// Example 5: Theme configuration
const theme = {
  typography: {
    body: {
      fontFamily: typography.fontFamily.sans[0],
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.normal,
    },
    heading: {
      fontFamily: typography.fontFamily.sans[0],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
    },
    code: {
      fontFamily: typography.fontFamily.mono[0],
      fontSize: typography.fontSize.sm,
    }
  }
};</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Access typography tokens for fonts, sizes, weights, and line heights.',
      },
    },
  },
};

export const VueIntegration: Story = {
  render: () => ({
    template: `
      <div class="typescript-demo">
        <h2>Vue 3 Integration</h2>
        <p>Use design tokens in Vue 3 components with Composition API.</p>

        <h3>Setup in Component</h3>
        <div class="code-block">
          <pre><code>&lt;script setup lang="ts"&gt;
import { colors, spacing, typography } from '@ipeeon/design-tokens';
import { ref, computed } from 'vue';

// Use tokens in reactive state
const theme = ref('light');
const backgroundColor = computed(() =>
  theme.value === 'light' ? colors.gray[50] : colors.gray[900]
);

const textColor = computed(() =>
  theme.value === 'light' ? colors.gray[900] : colors.gray[50]
);

// Dynamic spacing
const cardPadding = computed(() =>
  isCompact.value ? spacing[2] : spacing[6]
);
&lt;/script&gt;

&lt;template&gt;
  &lt;div :style="{
    backgroundColor,
    color: textColor,
    padding: cardPadding
  }"&gt;
    Content with dynamic tokens
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>

        <h3>Composable Pattern</h3>
        <div class="code-block">
          <pre><code>// composables/useTheme.ts
import { ref, computed } from 'vue';
import { colors } from '@ipeeon/design-tokens';

export function useTheme() {
  const isDark = ref(false);

  const theme = computed(() => ({
    background: isDark.value ? colors.gray[900] : colors.gray[50],
    surface: isDark.value ? colors.gray[800] : '#ffffff',
    text: {
      primary: isDark.value ? colors.gray[100] : colors.gray[900],
      secondary: isDark.value ? colors.gray[400] : colors.gray[600],
    },
    primary: colors.primary[500],
  }));

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  return {
    isDark,
    theme,
    toggleTheme,
  };
}

// In component:
// const { theme, toggleTheme } = useTheme();</code></pre>
        </div>

        <h3>Style Bindings</h3>
        <div class="code-block">
          <pre><code>&lt;script setup lang="ts"&gt;
import { colors, spacing } from '@ipeeon/design-tokens';

interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps&lt;Props&gt;(), {
  variant: 'primary',
  size: 'md',
});

const buttonStyles = computed(() =&gt; ({
  backgroundColor: props.variant === 'primary'
    ? colors.primary[600]
    : colors.gray[200],
  color: props.variant === 'primary'
    ? '#ffffff'
    : colors.gray[900],
  padding: {
    sm: \`\${spacing[1]} \${spacing[3]}\`,
    md: \`\${spacing[2]} \${spacing[4]}\`,
    lg: \`\${spacing[3]} \${spacing[6]}\`,
  }[props.size],
}));
&lt;/script&gt;

&lt;template&gt;
  &lt;button :style="buttonStyles"&gt;
    &lt;slot /&gt;
  &lt;/button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Integration patterns for Vue 3 Composition API.',
      },
    },
  },
};

export const BestPractices: Story = {
  render: () => ({
    template: `
      <div class="typescript-demo">
        <h2>Best Practices</h2>

        <h3>✅ Do's</h3>
        <ul class="practices-list good">
          <li>
            <strong>Use TypeScript for type safety</strong>
            <div class="code-block">
              <pre><code>// Good: Type-safe access
import type { colors } from '@ipeeon/design-tokens';
type ColorPalette = typeof colors;
type ColorShade = keyof ColorPalette['primary'];</code></pre>
            </div>
          </li>

          <li>
            <strong>Create theme abstractions</strong>
            <div class="code-block">
              <pre><code>// Good: Centralized theme
const theme = {
  colors: {
    primary: colors.primary[600],
    background: colors.gray[50],
  },
  spacing: {
    sm: spacing[2],
    md: spacing[4],
    lg: spacing[8],
  }
};</code></pre>
            </div>
          </li>

          <li>
            <strong>Use computed values for dynamic theming</strong>
            <div class="code-block">
              <pre><code>// Good: Reactive theme
const backgroundColor = computed(() =>
  isDark.value ? colors.gray[900] : colors.gray[50]
);</code></pre>
            </div>
          </li>

          <li>
            <strong>Memoize token-based styles</strong>
            <div class="code-block">
              <pre><code>// Good: Memoized styles
const styles = useMemo(() => ({
  padding: spacing[4],
  color: colors.gray[900],
}), []);</code></pre>
            </div>
          </li>
        </ul>

        <h3>❌ Don'ts</h3>
        <ul class="practices-list bad">
          <li>
            <strong>Don't hardcode values</strong>
            <div class="code-block">
              <pre><code>// Bad: Hardcoded values
const styles = {
  padding: '16px',  // Use spacing[4] instead
  color: '#3b82f6', // Use colors.primary[500] instead
};</code></pre>
            </div>
          </li>

          <li>
            <strong>Don't bypass the type system</strong>
            <div class="code-block">
              <pre><code>// Bad: Type assertions
const color = (colors as any).blue[500];  // Don't do this

// Good: Proper typing
const color = colors.primary[500];</code></pre>
            </div>
          </li>

          <li>
            <strong>Don't recreate styles on every render</strong>
            <div class="code-block">
              <pre><code>// Bad: Created on every render
function Component() {
  const styles = {  // Recreated every time!
    padding: spacing[4],
  };
}

// Good: Memoized or outside component
const styles = { padding: spacing[4] };
function Component() {
  // Use styles
}</code></pre>
            </div>
          </li>
        </ul>

        <h3>Performance Tips</h3>
        <ul class="tips-list">
          <li>Memoize token-based computed styles</li>
          <li>Create theme objects once, reuse everywhere</li>
          <li>Use CSS variables for frequently changing values</li>
          <li>Avoid inline style objects in render methods</li>
          <li>Consider CSS-in-JS libraries for better performance</li>
        </ul>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Best practices for using design tokens in TypeScript/JavaScript.',
      },
    },
  },
};

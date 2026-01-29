import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Design Tokens/Accessibility',
  parameters: {
    docs: {
      description: {
        component: `
# Accessibility Functions & Utilities

WCAG 2.1 compliant accessibility tools for creating inclusive interfaces.

## Features

- **Luminance Calculation**: Calculate relative brightness of colors
- **Contrast Ratio**: WCAG 2.1 compliant contrast calculations
- **Automatic Color Selection**: Choose optimal text colors for backgrounds
- **Contrast Validation**: Ensure colors meet WCAG AA/AAA standards
- **Color Adjustment**: Automatically adjust colors to meet accessibility requirements

## WCAG Standards

- **AA Normal Text**: 4.5:1 contrast ratio
- **AA Large Text**: 3:1 contrast ratio (18pt+ or 14pt+ bold)
- **AAA Normal Text**: 7:1 contrast ratio
- **AAA Large Text**: 4.5:1 contrast ratio

## Import

\`\`\`scss
@use '@ipeeon/design-tokens/core/accessibility' as a11y;

.my-component {
  $ratio: a11y.contrast-ratio(#333333, #ffffff);
  color: a11y.auto-text-color($background-color);
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

export const ContrastRatios: Story = {
  render: () => ({
    template: `
      <div class="accessibility-demo">
        <h2>Contrast Ratio Calculator</h2>
        <p>WCAG 2.1 compliant contrast ratio calculations between color pairs.</p>

        <h3>Understanding Contrast Ratios</h3>
        <div class="contrast-explainer">
          <div class="ratio-scale">
            <div class="ratio-item fail">
              <strong>1:1 - 2.99:1</strong>
              <span class="badge badge-error">FAIL</span>
              <small>Does not meet any WCAG standard</small>
            </div>
            <div class="ratio-item aa-large">
              <strong>3:1 - 4.49:1</strong>
              <span class="badge badge-warning">AA Large</span>
              <small>Meets WCAG AA for large text only</small>
            </div>
            <div class="ratio-item aa-normal">
              <strong>4.5:1 - 6.99:1</strong>
              <span class="badge badge-success">AA</span>
              <small>Meets WCAG AA for all text</small>
            </div>
            <div class="ratio-item aaa">
              <strong>7:1 - 21:1</strong>
              <span class="badge badge-success">AAA</span>
              <small>Meets WCAG AAA for all text</small>
            </div>
          </div>
        </div>

        <h3>Contrast Ratio Examples</h3>
        <div class="contrast-examples">
          <div class="contrast-card" style="background: #ffffff; color: #000000;">
            <div class="contrast-content">
              <strong>Black on White</strong>
              <code>contrast-ratio(#000000, #ffffff)</code>
              <div class="ratio-badge perfect">21:1 (Perfect)</div>
              <div class="wcag-badges">
                <span class="badge badge-success">AA ✓</span>
                <span class="badge badge-success">AAA ✓</span>
              </div>
            </div>
          </div>

          <div class="contrast-card" style="background: #ffffff; color: #767676;">
            <div class="contrast-content">
              <strong>Gray on White</strong>
              <code>contrast-ratio(#767676, #ffffff)</code>
              <div class="ratio-badge aa">4.54:1</div>
              <div class="wcag-badges">
                <span class="badge badge-success">AA ✓</span>
                <span class="badge badge-error">AAA ✗</span>
              </div>
            </div>
          </div>

          <div class="contrast-card" style="background: #ffffff; color: #949494;">
            <div class="contrast-content">
              <strong>Light Gray on White</strong>
              <code>contrast-ratio(#949494, #ffffff)</code>
              <div class="ratio-badge aa-large">3.05:1</div>
              <div class="wcag-badges">
                <span class="badge badge-warning">AA Large ✓</span>
                <span class="badge badge-error">AA Normal ✗</span>
              </div>
            </div>
          </div>

          <div class="contrast-card" style="background: #ffffff; color: #cccccc;">
            <div class="contrast-content">
              <strong>Very Light Gray on White</strong>
              <code>contrast-ratio(#cccccc, #ffffff)</code>
              <div class="ratio-badge fail">1.61:1</div>
              <div class="wcag-badges">
                <span class="badge badge-error">FAIL ✗</span>
              </div>
            </div>
          </div>
        </div>

        <h3>Dark Background Examples</h3>
        <div class="contrast-examples">
          <div class="contrast-card" style="background: #000000; color: #ffffff;">
            <div class="contrast-content">
              <strong>White on Black</strong>
              <code>contrast-ratio(#ffffff, #000000)</code>
              <div class="ratio-badge perfect">21:1 (Perfect)</div>
              <div class="wcag-badges">
                <span class="badge badge-success">AA ✓</span>
                <span class="badge badge-success">AAA ✓</span>
              </div>
            </div>
          </div>

          <div class="contrast-card" style="background: #1a1a1a; color: #ffffff;">
            <div class="contrast-content">
              <strong>White on Dark Gray</strong>
              <code>contrast-ratio(#ffffff, #1a1a1a)</code>
              <div class="ratio-badge aaa">16.94:1</div>
              <div class="wcag-badges">
                <span class="badge badge-success">AA ✓</span>
                <span class="badge badge-success">AAA ✓</span>
              </div>
            </div>
          </div>
        </div>

        <h3>SCSS Usage</h3>
        <div class="code-block">
          <pre><code>@use '@ipeeon/design-tokens/core/accessibility' as a11y;

// Calculate contrast ratio
$ratio: a11y.contrast-ratio(#333333, #ffffff);
// Returns: 12.63

// Check WCAG compliance
$is-aa: a11y.is-wcag-aa-compliant(#767676, #ffffff);
// Returns: true (4.54:1 meets 4.5:1 requirement)

$is-aaa: a11y.is-wcag-aaa-compliant(#767676, #ffffff);
// Returns: false (4.54:1 does not meet 7:1 requirement)

$is-aa-large: a11y.is-wcag-aa-large-compliant(#949494, #ffffff);
// Returns: true (3.05:1 meets 3:1 requirement for large text)</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Calculate and verify contrast ratios between colors to ensure WCAG compliance.',
      },
    },
  },
};

export const AutomaticTextColors: Story = {
  render: () => ({
    template: `
      <div class="accessibility-demo">
        <h2>Automatic Text Color Selection</h2>
        <p>Automatically choose the most accessible text color for any background.</p>

        <h3>auto-text-color() Function</h3>
        <p>Automatically selects white or black text based on which provides better contrast.</p>

        <div class="auto-text-examples">
          <div class="auto-text-card" style="background: #3b82f6; color: #ffffff;">
            <strong>Blue Background</strong>
            <code>auto-text-color(#3b82f6)</code>
            <div class="result">Returns: #ffffff (white)</div>
            <div class="ratio-info">Contrast: 8.59:1</div>
          </div>

          <div class="auto-text-card" style="background: #fbbf24; color: #000000;">
            <strong>Yellow Background</strong>
            <code>auto-text-color(#fbbf24)</code>
            <div class="result">Returns: #000000 (black)</div>
            <div class="ratio-info">Contrast: 12.63:1</div>
          </div>

          <div class="auto-text-card" style="background: #10b981; color: #000000;">
            <strong>Green Background</strong>
            <code>auto-text-color(#10b981)</code>
            <div class="result">Returns: #000000 (black)</div>
            <div class="ratio-info">Contrast: 6.49:1</div>
          </div>

          <div class="auto-text-card" style="background: #dc2626; color: #ffffff;">
            <strong>Red Background</strong>
            <code>auto-text-color(#dc2626)</code>
            <div class="result">Returns: #ffffff (white)</div>
            <div class="ratio-info">Contrast: 8.59:1</div>
          </div>

          <div class="auto-text-card" style="background: #f3f4f6; color: #000000;">
            <strong>Light Gray Background</strong>
            <code>auto-text-color(#f3f4f6)</code>
            <div class="result">Returns: #000000 (black)</div>
            <div class="ratio-info">Contrast: 18.76:1</div>
          </div>

          <div class="auto-text-card" style="background: #1f2937; color: #ffffff;">
            <strong>Dark Gray Background</strong>
            <code>auto-text-color(#1f2937)</code>
            <div class="result">Returns: #ffffff (white)</div>
            <div class="ratio-info">Contrast: 15.68:1</div>
          </div>
        </div>

        <h3>SCSS Usage</h3>
        <div class="code-block">
          <pre><code>@use '@ipeeon/design-tokens/core/accessibility' as a11y;

// Simple automatic text color
.badge {
  $bg-color: #3b82f6;
  background-color: $bg-color;
  color: a11y.auto-text-color($bg-color);
  // Automatically uses white text for blue background
}

// Dynamic usage
@each $name, $color in $theme-colors {
  .badge-#{$name} {
    background-color: $color;
    color: a11y.auto-text-color($color);
    // Each badge gets optimal text color
  }
}</code></pre>
        </div>

        <h3>Live Example</h3>
        <div class="live-example">
          <div class="color-grid">
            <div class="color-cell" style="background: #ef4444; color: #ffffff;">Red</div>
            <div class="color-cell" style="background: #f97316; color: #000000;">Orange</div>
            <div class="color-cell" style="background: #eab308; color: #000000;">Yellow</div>
            <div class="color-cell" style="background: #22c55e; color: #000000;">Green</div>
            <div class="color-cell" style="background: #3b82f6; color: #ffffff;">Blue</div>
            <div class="color-cell" style="background: #8b5cf6; color: #ffffff;">Purple</div>
            <div class="color-cell" style="background: #ec4899; color: #ffffff;">Pink</div>
            <div class="color-cell" style="background: #6b7280; color: #ffffff;">Gray</div>
          </div>
          <p><small>Each cell uses auto-text-color() for optimal contrast</small></p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Automatically select the most accessible text color (white or black) for any background.',
      },
    },
  },
};

export const EnsureContrast: Story = {
  render: () => ({
    template: `
      <div class="accessibility-demo">
        <h2>Automatic Contrast Adjustment</h2>
        <p>Automatically adjust colors to meet WCAG requirements.</p>

        <h3>ensure-contrast() Function</h3>
        <p>Takes any color and adjusts it to meet a minimum contrast ratio against a background.</p>

        <div class="ensure-contrast-examples">
          <div class="example-row">
            <div class="before">
              <strong>Before</strong>
              <div class="color-box" style="background: #ffffff; color: #a8a8a8;">
                #a8a8a8 on white
                <small>Contrast: 2.56:1 ✗</small>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="after">
              <strong>After (ensure-contrast)</strong>
              <div class="color-box" style="background: #ffffff; color: #767676;">
                #767676 on white
                <small>Contrast: 4.54:1 ✓</small>
              </div>
            </div>
          </div>

          <div class="example-row">
            <div class="before">
              <strong>Before</strong>
              <div class="color-box" style="background: #3b82f6; color: #60a5fa;">
                #60a5fa on blue
                <small>Contrast: 1.96:1 ✗</small>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="after">
              <strong>After (ensure-contrast)</strong>
              <div class="color-box" style="background: #3b82f6; color: #ffffff;">
                #ffffff on blue
                <small>Contrast: 8.59:1 ✓</small>
              </div>
            </div>
          </div>

          <div class="example-row">
            <div class="before">
              <strong>Before</strong>
              <div class="color-box" style="background: #1f2937; color: #4b5563;">
                #4b5563 on dark
                <small>Contrast: 2.31:1 ✗</small>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="after">
              <strong>After (ensure-contrast)</strong>
              <div class="color-box" style="background: #1f2937; color: #d1d5db;">
                #d1d5db on dark
                <small>Contrast: 10.83:1 ✓</small>
              </div>
            </div>
          </div>
        </div>

        <h3>SCSS Usage</h3>
        <div class="code-block">
          <pre><code>@use '@ipeeon/design-tokens/core/accessibility' as a11y;

// Adjust color to meet AA standard (4.5:1)
.text-on-white {
  $desired-color: #999999; // Too light for good contrast
  $background: #ffffff;

  background-color: $background;
  color: a11y.ensure-contrast(
    $desired-color,
    $background,
    4.5,  // Minimum ratio
    'darker'  // Make it darker
  );
  // Result: Color will be darkened until it reaches 4.5:1 contrast
}

// Auto-detect direction
.text-adaptive {
  $color: #888888;
  $bg: #f5f5f5;

  background-color: $bg;
  color: a11y.ensure-contrast($color, $bg, 4.5, 'auto');
  // Automatically determines if color should be lighter or darker
}

// Meet AAA standard (7:1)
.high-contrast-text {
  color: a11y.ensure-contrast(
    #666666,
    #ffffff,
    7,  // AAA requirement
    'darker'
  );
}</code></pre>
        </div>

        <h3>Parameters</h3>
        <table class="param-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>$color</code></td>
              <td>Color</td>
              <td>Required</td>
              <td>Color to adjust</td>
            </tr>
            <tr>
              <td><code>$background</code></td>
              <td>Color</td>
              <td>Required</td>
              <td>Background color to test against</td>
            </tr>
            <tr>
              <td><code>$min-ratio</code></td>
              <td>Number</td>
              <td>4.5</td>
              <td>Minimum contrast ratio (4.5 for AA, 7 for AAA)</td>
            </tr>
            <tr>
              <td><code>$direction</code></td>
              <td>String</td>
              <td>'auto'</td>
              <td>'lighter', 'darker', or 'auto'</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Automatically adjust colors to meet minimum WCAG contrast requirements.',
      },
    },
  },
};

export const AccessibleShades: Story = {
  render: () => ({
    template: `
      <div class="accessibility-demo">
        <h2>Accessible Color Shades</h2>
        <p>Find the most accessible shade from a color family.</p>

        <h3>accessible-shade() Function</h3>
        <p>Automatically selects the best shade from a color palette to meet contrast requirements.</p>

        <div class="shade-examples">
          <div class="shade-card">
            <strong>Blue on White Background</strong>
            <code>accessible-shade('blue', #ffffff, 4.5)</code>
            <div class="shade-scale">
              <div class="shade" style="background: #eff6ff; color: #000;">50 ✗</div>
              <div class="shade" style="background: #dbeafe; color: #000;">100 ✗</div>
              <div class="shade" style="background: #bfdbfe; color: #000;">200 ✗</div>
              <div class="shade" style="background: #93c5fd; color: #000;">300 ✗</div>
              <div class="shade" style="background: #60a5fa; color: #000;">400 ✗</div>
              <div class="shade" style="background: #3b82f6; color: #fff;">500 ✓</div>
              <div class="shade selected" style="background: #2563eb; color: #fff;">600 ✓ (Selected)</div>
              <div class="shade" style="background: #1d4ed8; color: #fff;">700 ✓</div>
              <div class="shade" style="background: #1e40af; color: #fff;">800 ✓</div>
              <div class="shade" style="background: #1e3a8a; color: #fff;">900 ✓</div>
            </div>
            <p class="result">Returns: blue-600 (#2563eb) with 8.59:1 contrast</p>
          </div>

          <div class="shade-card">
            <strong>Green on Dark Background</strong>
            <code>accessible-shade('green', #1f2937, 4.5)</code>
            <div class="shade-scale">
              <div class="shade" style="background: #f0fdf4; color: #000;">50 ✓ (Selected)</div>
              <div class="shade" style="background: #dcfce7; color: #000;">100 ✓</div>
              <div class="shade" style="background: #bbf7d0; color: #000;">200 ✓</div>
              <div class="shade" style="background: #86efac; color: #000;">300 ✓</div>
              <div class="shade" style="background: #4ade80; color: #000;">400 ✓</div>
              <div class="shade" style="background: #22c55e; color: #000;">500 ✗</div>
              <div class="shade" style="background: #16a34a; color: #fff;">600 ✗</div>
              <div class="shade" style="background: #15803d; color: #fff;">700 ✗</div>
              <div class="shade" style="background: #166534; color: #fff;">800 ✗</div>
              <div class="shade" style="background: #14532d; color: #fff;">900 ✗</div>
            </div>
            <p class="result">Returns: green-50 (#f0fdf4) with 17.54:1 contrast</p>
          </div>
        </div>

        <h3>SCSS Usage</h3>
        <div class="code-block">
          <pre><code>@use '@ipeeon/design-tokens/core/accessibility' as a11y;

// Find accessible blue for white background
.primary-text {
  $bg: #ffffff;
  background-color: $bg;
  color: a11y.accessible-shade('blue', $bg, 4.5);
  // Returns the most accessible blue shade (likely blue-600 or blue-700)
}

// Find accessible gray for colored background
.card-on-blue {
  $bg: #3b82f6;
  background-color: $bg;
  color: a11y.accessible-shade('gray', $bg, 4.5);
  // Returns lightest gray that meets 4.5:1 requirement
}

// Use in theme generation
@each $color-name, $shades in $color-palette {
  .text-#{$color-name} {
    color: a11y.accessible-shade($color-name, #ffffff, 4.5);
  }

  .text-#{$color-name}-on-dark {
    color: a11y.accessible-shade($color-name, #1a1a1a, 4.5);
  }
}</code></pre>
        </div>

        <h3>Real-World Example</h3>
        <div class="real-world-example">
          <div class="example-cards">
            <div class="demo-card" style="background: #ffffff; color: #2563eb;">
              <h4>Card on White</h4>
              <p>Using accessible-shade('blue', #ffffff) ensures text is readable.</p>
            </div>
            <div class="demo-card" style="background: #f3f4f6; color: #1d4ed8;">
              <h4>Card on Light Gray</h4>
              <p>Function automatically selects darker blue for light backgrounds.</p>
            </div>
            <div class="demo-card" style="background: #1f2937; color: #93c5fd;">
              <h4>Card on Dark</h4>
              <p>Function automatically selects lighter blue for dark backgrounds.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Automatically find the most accessible shade from a color family.',
      },
    },
  },
};

export const ValidationMixins: Story = {
  render: () => ({
    template: `
      <div class="accessibility-demo">
        <h2>Accessibility Validation</h2>
        <p>Validate and warn about accessibility issues during development.</p>

        <h3>validate-contrast() Mixin</h3>
        <p>Automatically validates color combinations and warns in console during compilation.</p>

        <div class="code-block">
          <pre><code>@use '@ipeeon/design-tokens/core/accessibility' as a11y;

// Validate text color contrast
.my-component {
  $fg: #999999;
  $bg: #ffffff;

  @include a11y.validate-contrast($fg, $bg, 'component text');
  // Console warning if contrast is insufficient

  color: $fg;
  background-color: $bg;
}

// Result in console:
// ⚠️  ACCESSIBILITY WARNING: component text contrast ratio is 2.85
//    (WCAG AA failed, large text only).
//    Foreground: #999999, Background: #ffffff</code></pre>
        </div>

        <h3>Validation Levels</h3>
        <table class="validation-table">
          <thead>
            <tr>
              <th>Contrast Ratio</th>
              <th>Level</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr class="error-row">
              <td>&lt; 3:1</td>
              <td><span class="badge badge-error">ERROR</span></td>
              <td>WCAG fails all standards</td>
            </tr>
            <tr class="warning-row">
              <td>3:1 - 4.49:1</td>
              <td><span class="badge badge-warning">WARNING</span></td>
              <td>WCAG AA failed, large text only</td>
            </tr>
            <tr class="info-row">
              <td>4.5:1 - 6.99:1</td>
              <td><span class="badge badge-info">INFO</span></td>
              <td>WCAG AA passed, AAA failed</td>
            </tr>
            <tr class="success-row">
              <td>≥ 7:1</td>
              <td><span class="badge badge-success">PASS</span></td>
              <td>WCAG AAA passed</td>
            </tr>
          </tbody>
        </table>

        <h3>accessible-colors() Mixin</h3>
        <p>Apply colors with automatic validation in one step.</p>

        <div class="code-block">
          <pre><code>// Apply colors with validation
.button {
  @include a11y.accessible-colors(
    #ffffff,     // Foreground
    #3b82f6,     // Background
    'button text' // Context for warnings
  );
  // Sets color, background-color, and validates contrast
}

// Equivalent to:
.button {
  @include a11y.validate-contrast(#ffffff, #3b82f6, 'button text');
  color: #ffffff;
  background-color: #3b82f6;
}</code></pre>
        </div>

        <h3>Development Workflow</h3>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <strong>Design Phase</strong>
              <p>Use validation mixins during development</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <strong>Build Time</strong>
              <p>SASS compiler shows warnings for problematic colors</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <strong>Fix Issues</strong>
              <p>Use ensure-contrast() or accessible-shade() to fix</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <strong>Production</strong>
              <p>Deploy with confidence in accessibility compliance</p>
            </div>
          </div>
        </div>

        <h3>Best Practices</h3>
        <ul class="best-practices">
          <li>✓ Use validation mixins in all component stylesheets</li>
          <li>✓ Set minimum contrast to 4.5:1 for normal text (WCAG AA)</li>
          <li>✓ Use 7:1 for critical text (WCAG AAA)</li>
          <li>✓ Test with real content, not Lorem Ipsum</li>
          <li>✓ Consider users with low vision and color blindness</li>
          <li>✓ Validate in different lighting conditions</li>
        </ul>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Validate color contrast during development with automatic warnings.',
      },
    },
  },
};

export const CompleteReference: Story = {
  render: () => ({
    template: `
      <div class="accessibility-demo">
        <h2>Complete Accessibility Function Reference</h2>

        <h3>Core Functions</h3>
        <table class="function-reference">
          <thead>
            <tr>
              <th>Function</th>
              <th>Parameters</th>
              <th>Returns</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>luminance($color)</code></td>
              <td>Color</td>
              <td>0-1</td>
              <td>Calculate relative luminance (brightness)</td>
            </tr>
            <tr>
              <td><code>contrast-ratio($c1, $c2)</code></td>
              <td>2 Colors</td>
              <td>1-21</td>
              <td>Calculate WCAG contrast ratio</td>
            </tr>
            <tr>
              <td><code>is-wcag-aa-compliant($fg, $bg)</code></td>
              <td>2 Colors</td>
              <td>Boolean</td>
              <td>Check if meets AA (4.5:1)</td>
            </tr>
            <tr>
              <td><code>is-wcag-aaa-compliant($fg, $bg)</code></td>
              <td>2 Colors</td>
              <td>Boolean</td>
              <td>Check if meets AAA (7:1)</td>
            </tr>
            <tr>
              <td><code>is-wcag-aa-large-compliant($fg, $bg)</code></td>
              <td>2 Colors</td>
              <td>Boolean</td>
              <td>Check if meets AA large text (3:1)</td>
            </tr>
          </tbody>
        </table>

        <h3>Automatic Selection Functions</h3>
        <table class="function-reference">
          <thead>
            <tr>
              <th>Function</th>
              <th>Parameters</th>
              <th>Returns</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>auto-text-color($bg)</code></td>
              <td>Background color</td>
              <td>Color</td>
              <td>Choose white or black for best contrast</td>
            </tr>
            <tr>
              <td><code>most-accessible-color($bg, $list)</code></td>
              <td>Background + color list</td>
              <td>Color</td>
              <td>Find best color from a list</td>
            </tr>
            <tr>
              <td><code>accessible-text($bg, $pref)</code></td>
              <td>Background + preference</td>
              <td>Color</td>
              <td>Get accessible text from design system</td>
            </tr>
            <tr>
              <td><code>accessible-shade($family, $bg, $ratio)</code></td>
              <td>Color family + bg + ratio</td>
              <td>Color</td>
              <td>Find best shade from palette</td>
            </tr>
          </tbody>
        </table>

        <h3>Adjustment Functions</h3>
        <table class="function-reference">
          <thead>
            <tr>
              <th>Function</th>
              <th>Parameters</th>
              <th>Returns</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ensure-contrast($color, $bg, $ratio, $dir)</code></td>
              <td>Color + bg + ratio + direction</td>
              <td>Color</td>
              <td>Adjust color to meet ratio</td>
            </tr>
          </tbody>
        </table>

        <h3>Validation Mixins</h3>
        <table class="function-reference">
          <thead>
            <tr>
              <th>Mixin</th>
              <th>Parameters</th>
              <th>Output</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@include validate-contrast($fg, $bg, $ctx)</code></td>
              <td>Foreground + background + context</td>
              <td>Console warnings</td>
              <td>Validate and warn about issues</td>
            </tr>
            <tr>
              <td><code>@include accessible-colors($fg, $bg, $ctx)</code></td>
              <td>Foreground + background + context</td>
              <td>CSS + warnings</td>
              <td>Apply colors with validation</td>
            </tr>
          </tbody>
        </table>

        <h3>Quick Start Examples</h3>
        <div class="code-block">
          <pre><code>@use '@ipeeon/design-tokens/core/accessibility' as a11y;

// Example 1: Simple contrast check
$ratio: a11y.contrast-ratio(#333333, #ffffff);
@if $ratio < 4.5 {
  @warn 'Text color too light!';
}

// Example 2: Auto text color
.badge {
  $bg: #3b82f6;
  background: $bg;
  color: a11y.auto-text-color($bg); // White
}

// Example 3: Ensure minimum contrast
.accessible-button {
  background: #ffffff;
  color: a11y.ensure-contrast(#999999, #ffffff, 4.5, 'darker');
  // Color darkened to meet 4.5:1
}

// Example 4: Find accessible shade
.text-primary {
  color: a11y.accessible-shade('blue', #ffffff, 4.5);
  // Returns blue-600 or darker
}

// Example 5: With validation
.validated-component {
  @include a11y.accessible-colors(
    #1e40af,    // Foreground
    #ffffff,    // Background
    'card text' // Context
  );
  // Applies colors and validates contrast
}</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete reference of all accessibility functions and mixins.',
      },
    },
  },
};

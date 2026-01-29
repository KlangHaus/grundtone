import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Design Tokens/Mixins',
  parameters: {
    docs: {
      description: {
        component: `
# DKFDS SCSS Mixins

Comprehensive library of SCSS mixins for consistent component development.

## Import

\`\`\`scss
@use '@ipeeon/design-tokens/mixins' as mixins;

.my-component {
  @include mixins.h1;
  @include mixins.container;
}
\`\`\`

## Categories

- **Typography Mixins**: h1-h6, body text, lead text, form labels
- **Button Mixins**: Base button, primary, secondary variants
- **Layout Mixins**: Container, grid row, grid columns
- **Focus Mixins**: Accessible focus styles
- **Utility Mixins**: Screen reader only, clearfix, text truncate
- **State Mixins**: Hover, focus, active states
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TypographyMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>Typography Mixins</h2>
        <p>Responsive heading mixins with consistent styling across breakpoints.</p>

        <div class="typography-examples">
          <div class="example-item">
            <div class="heading-demo h1-demo">
              Heading 1 with @include h1
            </div>
            <div class="code-block">
              <pre><code>@use '@ipeeon/design-tokens/mixins' as mixins;

.heading {
  @include mixins.h1;
  // font-size: 3.2rem → 4.8rem (responsive)
  // font-weight: 700
  // line-height: 1.2
}</code></pre>
            </div>
          </div>

          <div class="example-item">
            <div class="heading-demo h2-demo">
              Heading 2 with @include h2
            </div>
            <div class="code-block">
              <pre><code>.heading {
  @include mixins.h2;
  // font-size: 2.4rem → 3.2rem (responsive)
  // font-weight: 700
  // line-height: 1.2
}</code></pre>
            </div>
          </div>

          <div class="example-item">
            <div class="heading-demo h3-demo">
              Heading 3 with @include h3
            </div>
            <div class="code-block">
              <pre><code>.heading {
  @include mixins.h3;
  // font-size: 2rem → 2.4rem (responsive)
}</code></pre>
            </div>
          </div>
        </div>

        <h3>Body Text Mixins</h3>
        <div class="text-examples">
          <div class="text-demo body-copy">
            <strong>@include body-copy-text</strong><br>
            Regular body text with standard font size (1.6rem) and line-height (1.5).
          </div>

          <div class="text-demo lead-text">
            <strong>@include lead-text</strong><br>
            Larger introductory text for emphasis (2rem).
          </div>

          <div class="text-demo small-text">
            <strong>@include small-text</strong><br>
            Smaller text for captions and supplementary info (1.4rem).
          </div>
        </div>

        <h3>Form Typography Mixins</h3>
        <div class="form-text-examples">
          <label class="form-label-demo">
            Form Label (@include form-label-text)
          </label>
          <p class="form-hint-demo">
            Form hint text for additional guidance (@include form-hint-text)
          </p>
          <p class="form-error-demo">
            Form error message (@include form-error-text)
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Typography mixins provide responsive heading styles and consistent text formatting.',
      },
    },
  },
};

export const ButtonMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>Button Mixins</h2>
        <p>Pre-styled button mixins with hover, focus, and disabled states.</p>

        <div class="button-examples">
          <button class="button-base-demo">
            @include button-base
          </button>

          <button class="button-primary-demo">
            @include button-primary
          </button>

          <button class="button-secondary-demo">
            @include button-secondary
          </button>

          <button class="button-primary-demo" disabled>
            Disabled State
          </button>
        </div>

        <h3>Button Base Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin button-base {
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 16px 32px;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;

  &:focus {
    @include focus; // Accessibility focus outline
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}</code></pre>
        </div>

        <h3>Primary Button Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin button-primary {
  @include button-base;
  background-color: func.color('primary');
  border-color: func.color('primary');
  color: func.color('white');

  &:hover:not(:disabled) {
    background-color: func.color('primary-dark');
  }

  &:active:not(:disabled) {
    background-color: func.color('primary-darker');
  }
}</code></pre>
        </div>

        <h3>Usage Example</h3>
        <div class="code-block">
          <pre><code>// In your component
.my-button {
  @include mixins.button-primary;
}

// Or extend with custom styles
.custom-button {
  @include mixins.button-base;
  background-color: #custom-color;
  // Add your custom styles
}</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Button mixins provide consistent button styling with all interactive states handled.',
      },
    },
  },
};

export const LayoutMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>Layout Mixins</h2>
        <p>Grid system and container mixins for responsive layouts.</p>

        <h3>Container Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin container {
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  margin-right: auto;
  margin-left: auto;

  // Responsive max-widths
  @include media-breakpoint-up(sm) { max-width: 540px; }
  @include media-breakpoint-up(md) { max-width: 720px; }
  @include media-breakpoint-up(lg) { max-width: 960px; }
  @include media-breakpoint-up(xl) { max-width: 1140px; }
}

// Usage
.page-container {
  @include mixins.container;
}</code></pre>
        </div>

        <div class="container-demo">
          <div class="demo-container">
            Container with responsive max-widths
          </div>
        </div>

        <h3>Grid Row Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin grid-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
  margin-left: -16px;
}

// Usage
.row {
  @include mixins.grid-row;
}</code></pre>
        </div>

        <h3>Grid Column Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin grid-col($size: false, $columns: 12) {
  position: relative;
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;

  @if $size {
    flex: 0 0 percentage($size / $columns);
    max-width: percentage($size / $columns);
  }
}

// Usage examples
.col-6 {
  @include mixins.grid-col(6); // 50% width
}

.col-4 {
  @include mixins.grid-col(4); // 33.33% width
}

.col-3 {
  @include mixins.grid-col(3); // 25% width
}

// Responsive columns
.col {
  @include mixins.grid-col(); // Full width

  @include media-breakpoint-up(md) {
    @include mixins.grid-col(6); // 50% on tablets
  }

  @include media-breakpoint-up(lg) {
    @include mixins.grid-col(4); // 33.33% on desktops
  }
}</code></pre>
        </div>

        <h3>Grid System Example</h3>
        <div class="grid-demo">
          <div class="demo-row">
            <div class="demo-col demo-col-6">col-6</div>
            <div class="demo-col demo-col-6">col-6</div>
          </div>
          <div class="demo-row">
            <div class="demo-col demo-col-4">col-4</div>
            <div class="demo-col demo-col-4">col-4</div>
            <div class="demo-col demo-col-4">col-4</div>
          </div>
          <div class="demo-row">
            <div class="demo-col demo-col-3">col-3</div>
            <div class="demo-col demo-col-3">col-3</div>
            <div class="demo-col demo-col-3">col-3</div>
            <div class="demo-col demo-col-3">col-3</div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Layout mixins provide a flexible 12-column grid system with responsive containers.',
      },
    },
  },
};

export const FocusMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>Focus & Accessibility Mixins</h2>
        <p>Consistent, accessible focus styles for keyboard navigation.</p>

        <h3>Focus Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin focus {
  outline: 3px solid func.color('focus');
  outline-offset: 1px;
}

// Usage
.interactive-element {
  &:focus {
    @include mixins.focus;
  }
}

// Or apply to focus-visible for better UX
.button {
  &:focus-visible {
    @include mixins.focus;
  }
}</code></pre>
        </div>

        <div class="focus-examples">
          <button class="focus-demo-button">
            Tab here to see focus styles
          </button>
          <a href="#" class="focus-demo-link">
            Focusable link
          </a>
          <input type="text" class="focus-demo-input" placeholder="Focusable input" />
        </div>

        <h3>Focus Reset Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin focus-reset {
  outline: none;
  outline-offset: 0;
}

// Use when you want custom focus handling
.custom-focus-element {
  &:focus {
    @include mixins.focus-reset;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.2);
  }
}</code></pre>
        </div>

        <h3>Screen Reader Only Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

// Usage for screen reader only text
.skip-link {
  @include mixins.sr-only;
}

// Make visible on focus
.skip-link {
  @include mixins.sr-only;
  @include mixins.sr-only-focusable;
}</code></pre>
        </div>

        <p class="accessibility-note">
          <strong>Note:</strong> Screen reader only content is visually hidden but accessible to assistive technology.
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Focus mixins ensure consistent, accessible focus states for all interactive elements.',
      },
    },
  },
};

export const UtilityMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>Utility Mixins</h2>
        <p>Helper mixins for common styling patterns.</p>

        <h3>Text Truncate</h3>
        <div class="code-block">
          <pre><code>@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Usage
.long-text {
  @include mixins.text-truncate;
  max-width: 200px;
}</code></pre>
        </div>

        <div class="truncate-demo">
          <div class="truncated-text">
            This is a very long text that will be truncated with an ellipsis when it exceeds the container width
          </div>
        </div>

        <h3>Aspect Ratio</h3>
        <div class="code-block">
          <pre><code>@mixin aspect-ratio($width, $height) {
  position: relative;

  &::before {
    display: block;
    content: '';
    width: 100%;
    padding-top: percentage($height / $width);
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

// Usage
.video-container {
  @include mixins.aspect-ratio(16, 9);
}

.square-image {
  @include mixins.aspect-ratio(1, 1);
}</code></pre>
        </div>

        <div class="aspect-ratio-examples">
          <div class="aspect-demo aspect-16-9">
            16:9 Aspect Ratio
          </div>
          <div class="aspect-demo aspect-4-3">
            4:3 Aspect Ratio
          </div>
          <div class="aspect-demo aspect-1-1">
            1:1 Aspect Ratio
          </div>
        </div>

        <h3>Clearfix</h3>
        <div class="code-block">
          <pre><code>@mixin clearfix {
  &::after {
    display: block;
    clear: both;
    content: '';
  }
}

// Usage for float layouts
.float-container {
  @include mixins.clearfix;
}</code></pre>
        </div>

        <h3>Unstyled List</h3>
        <div class="code-block">
          <pre><code>@mixin unstyled-list {
  padding-left: 0;
  list-style: none;
}

// Usage
.nav-list {
  @include mixins.unstyled-list;
}</code></pre>
        </div>

        <div class="list-examples">
          <div>
            <strong>Default list:</strong>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
          <div>
            <strong>Unstyled list:</strong>
            <ul class="unstyled-list-demo">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Utility mixins provide common styling patterns for text, lists, and layouts.',
      },
    },
  },
};

export const StateMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>State Mixins</h2>
        <p>Convenient mixins for handling interactive states.</p>

        <h3>Hover Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin hover {
  &:hover {
    @content;
  }
}

// Usage
.link {
  color: blue;

  @include mixins.hover {
    color: darkblue;
    text-decoration: underline;
  }
}</code></pre>
        </div>

        <h3>Hover + Focus Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin hover-focus {
  &:hover,
  &:focus {
    @content;
  }
}

// Usage for consistent hover and focus styles
.button {
  background: gray;

  @include mixins.hover-focus {
    background: darkgray;
  }
}</code></pre>
        </div>

        <h3>Hover + Focus + Active Mixin</h3>
        <div class="code-block">
          <pre><code>@mixin hover-focus-active {
  &:hover,
  &:focus,
  &:active {
    @content;
  }
}

// Usage for all interactive states
.interactive-element {
  transform: scale(1);

  @include mixins.hover-focus-active {
    transform: scale(1.05);
  }
}</code></pre>
        </div>

        <div class="state-examples">
          <button class="state-demo-button">
            Hover, Focus, or Click Me
          </button>
          <a href="#" class="state-demo-link">
            Interactive Link
          </a>
        </div>

        <h3>Plain Hover Focus (No Initial Styles)</h3>
        <div class="code-block">
          <pre><code>@mixin plain-hover-focus {
  &,
  &:hover,
  &:focus {
    @content;
  }
}

// Usage when you want the same styles for all states
.reset-link {
  @include mixins.plain-hover-focus {
    text-decoration: none;
    color: inherit;
  }
}</code></pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'State mixins simplify handling of hover, focus, and active states.',
      },
    },
  },
};

export const MediaQueryMixins: Story = {
  render: () => ({
    template: `
      <div class="mixins-demo">
        <h2>Media Query Mixins</h2>
        <p>Convenience mixins for special media queries.</p>

        <h3>Print Only</h3>
        <div class="code-block">
          <pre><code>@mixin print-only {
  @media print {
    @content;
  }
}

// Usage
.no-print {
  @include mixins.print-only {
    display: none;
  }
}

.print-only-section {
  display: none;

  @include mixins.print-only {
    display: block;
  }
}</code></pre>
        </div>

        <h3>Screen Only</h3>
        <div class="code-block">
          <pre><code>@mixin screen-only {
  @media screen {
    @content;
  }
}

// Usage for screen-only styles
.interactive-element {
  @include mixins.screen-only {
    cursor: pointer;
    transition: all 0.3s;
  }
}</code></pre>
        </div>

        <h3>Complete Mixin List</h3>
        <table class="mixins-reference">
          <thead>
            <tr>
              <th>Category</th>
              <th>Mixin</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="6">Typography</td>
              <td><code>@include h1</code></td>
              <td>Heading 1 styles (responsive)</td>
            </tr>
            <tr>
              <td><code>@include h2</code></td>
              <td>Heading 2 styles (responsive)</td>
            </tr>
            <tr>
              <td><code>@include body-copy-text</code></td>
              <td>Standard body text</td>
            </tr>
            <tr>
              <td><code>@include lead-text</code></td>
              <td>Larger introductory text</td>
            </tr>
            <tr>
              <td><code>@include form-label-text</code></td>
              <td>Form label styling</td>
            </tr>
            <tr>
              <td><code>@include form-error-text</code></td>
              <td>Error message styling</td>
            </tr>
            <tr>
              <td rowspan="3">Buttons</td>
              <td><code>@include button-base</code></td>
              <td>Base button structure</td>
            </tr>
            <tr>
              <td><code>@include button-primary</code></td>
              <td>Primary button variant</td>
            </tr>
            <tr>
              <td><code>@include button-secondary</code></td>
              <td>Secondary button variant</td>
            </tr>
            <tr>
              <td rowspan="3">Layout</td>
              <td><code>@include container</code></td>
              <td>Responsive container</td>
            </tr>
            <tr>
              <td><code>@include grid-row</code></td>
              <td>Flexbox grid row</td>
            </tr>
            <tr>
              <td><code>@include grid-col($size)</code></td>
              <td>Grid column with width</td>
            </tr>
            <tr>
              <td rowspan="3">Accessibility</td>
              <td><code>@include focus</code></td>
              <td>Accessible focus outline</td>
            </tr>
            <tr>
              <td><code>@include sr-only</code></td>
              <td>Screen reader only text</td>
            </tr>
            <tr>
              <td><code>@include sr-only-focusable</code></td>
              <td>Visible on focus</td>
            </tr>
            <tr>
              <td rowspan="4">Utilities</td>
              <td><code>@include text-truncate</code></td>
              <td>Ellipsis for long text</td>
            </tr>
            <tr>
              <td><code>@include aspect-ratio($w, $h)</code></td>
              <td>Maintain aspect ratio</td>
            </tr>
            <tr>
              <td><code>@include clearfix</code></td>
              <td>Clear floats</td>
            </tr>
            <tr>
              <td><code>@include unstyled-list</code></td>
              <td>Remove list styling</td>
            </tr>
            <tr>
              <td rowspan="4">States</td>
              <td><code>@include hover</code></td>
              <td>Hover state</td>
            </tr>
            <tr>
              <td><code>@include hover-focus</code></td>
              <td>Hover + Focus states</td>
            </tr>
            <tr>
              <td><code>@include hover-focus-active</code></td>
              <td>All interactive states</td>
            </tr>
            <tr>
              <td><code>@include plain-hover-focus</code></td>
              <td>Same styles for all states</td>
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
          'Complete reference of all available SCSS mixins in the design system.',
      },
    },
  },
};

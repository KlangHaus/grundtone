import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Foundation/Shadows',
  parameters: {
    docs: {
      description: {
        component: `
# Shadow System

Haspen UI provides a comprehensive shadow system for creating depth and elevation in your UI.
Shadows help establish visual hierarchy and indicate interactive elements.

## Shadow Levels

### none
No shadow, flat appearance

### subtle
Very light shadow for minimal depth
- Use for: Subtle hover states, slight elevation

### light
Light shadow for basic depth
- Use for: Cards, dropdowns, tooltips

### medium
Medium shadow for moderate elevation
- Use for: Modals, popovers, raised panels

### large
Large shadow for significant elevation
- Use for: Dialogs, full-screen overlays

### extra-large
Maximum shadow for dramatic elevation
- Use for: Major UI elements, hero sections

### inner
Inset shadow for depressed appearance
- Use for: Active buttons, input fields, wells

### focus
Specialized shadow for focus indicators
- Use for: Keyboard navigation, accessibility

## Usage

\`\`\`scss
@use '@ipeeon/design-tokens/core/shadows' as shadows;

.card {
  box-shadow: map.get(shadows.$shadows, 'light');

  &:hover {
    box-shadow: map.get(shadows.$shadows, 'medium');
  }
}
\`\`\`

\`\`\`css
/* Using CSS variables */
.card {
  box-shadow: var(--shadow-light);
}

.card:hover {
  box-shadow: var(--shadow-medium);
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

export const AllShadows: Story = {
  render: () => ({
    setup() {
      const shadows = [
        { name: 'none', value: 'none', description: 'No shadow' },
        {
          name: 'subtle',
          value: '0 1px 3px rgba(0, 0, 0, 0.1)',
          description: 'Very light depth',
        },
        {
          name: 'light',
          value: '0 2px 4px rgba(0, 0, 0, 0.1)',
          description: 'Basic depth',
        },
        {
          name: 'medium',
          value: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
          description: 'Moderate elevation',
        },
        {
          name: 'large',
          value: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
          description: 'Significant elevation',
        },
        {
          name: 'extra-large',
          value:
            '0 16px 32px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
          description: 'Maximum elevation',
        },
        {
          name: 'inner',
          value: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
          description: 'Depressed appearance',
        },
        {
          name: 'focus',
          value: '0 0 0 3px rgba(116, 116, 116, 0.5)',
          description: 'Focus indicator',
        },
      ];
      return { shadows };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Shadow Scale</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          All available shadow tokens for creating depth and elevation.
        </p>

        <div style="display: grid; gap: 2rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
          <div
            v-for="shadow in shadows"
            :key="shadow.name"
            style="display: flex; align-items: center; gap: 2rem;"
          >
            <div style="flex: 1;">
              <div style="margin-bottom: 0.5rem;">
                <code style="font-family: monospace; font-size: 0.875rem; color: #2563eb; font-weight: 600;">
                  {{ shadow.name }}
                </code>
              </div>
              <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">
                {{ shadow.description }}
              </div>
              <div style="font-family: monospace; font-size: 0.75rem; color: #999;">
                {{ shadow.value }}
              </div>
            </div>

            <div
              :style="{
                width: '200px',
                height: '120px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: shadow.value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                color: '#666',
              }"
            >
              {{ shadow.name }}
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Usage Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>subtle-light</strong>: Cards, panels, subtle elevation</li>
            <li><strong>medium</strong>: Dropdowns, popovers, tooltips</li>
            <li><strong>large</strong>: Modals, dialogs, overlays</li>
            <li><strong>extra-large</strong>: Major UI elements, hero sections</li>
            <li><strong>inner</strong>: Active states, input fields</li>
            <li><strong>focus</strong>: Keyboard focus indicators</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const InteractiveShadows: Story = {
  render: () => ({
    setup() {
      const cards = [
        {
          title: 'Subtle Card',
          shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          hoverShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        {
          title: 'Light Card',
          shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          hoverShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
        {
          title: 'Medium Card',
          shadow:
            '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
          hoverShadow:
            '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      ];
      return { cards };
    },
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Interactive Shadow Examples</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Hover over the cards to see shadow transitions.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
          <div
            v-for="card in cards"
            :key="card.title"
            :style="{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: card.shadow,
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              cursor: 'pointer',
            }"
            @mouseenter="e => e.currentTarget.style.boxShadow = card.hoverShadow"
            @mouseleave="e => e.currentTarget.style.boxShadow = card.shadow"
          >
            <h3 style="margin-bottom: 0.5rem; font-size: 1.125rem; font-weight: 600;">{{ card.title }}</h3>
            <p style="color: #666; font-size: 0.875rem;">
              Hover to see the shadow transition effect.
            </p>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Shadow Interaction Tips:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li>Use transitions for smooth shadow changes</li>
            <li>Increase shadow on hover to indicate interactivity</li>
            <li>Reduce shadow on active state (pressed)</li>
            <li>Keep shadow transitions under 300ms</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const ComponentShadows: Story = {
  render: () => ({
    template: `
      <div style="font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 1rem;">Component-Specific Shadows</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Recommended shadows for common UI components.
        </p>

        <div style="display: grid; gap: 2rem;">
          <!-- Card -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Cards</h3>
            <div style="padding: 2rem; background: #f9fafb; border-radius: 8px;">
              <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); max-width: 400px;">
                <h4 style="margin-bottom: 0.5rem; font-weight: 600;">Card Title</h4>
                <p style="color: #666; font-size: 0.875rem;">
                  Cards use light shadow for subtle elevation.
                </p>
              </div>
              <code style="display: block; margin-top: 1rem; font-family: monospace; font-size: 0.75rem; color: #666;">
                box-shadow: var(--shadow-card)
              </code>
            </div>
          </div>

          <!-- Dropdown -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Dropdown</h3>
            <div style="padding: 2rem; background: #f9fafb; border-radius: 8px;">
              <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08); max-width: 250px;">
                <div style="padding: 0.5rem 0.75rem; border-radius: 4px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='transparent'">
                  Option 1
                </div>
                <div style="padding: 0.5rem 0.75rem; border-radius: 4px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='transparent'">
                  Option 2
                </div>
                <div style="padding: 0.5rem 0.75rem; border-radius: 4px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='transparent'">
                  Option 3
                </div>
              </div>
              <code style="display: block; margin-top: 1rem; font-family: monospace; font-size: 0.75rem; color: #666;">
                box-shadow: var(--shadow-dropdown)
              </code>
            </div>
          </div>

          <!-- Modal -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Modal</h3>
            <div style="padding: 2rem; background: #f9fafb; border-radius: 8px;">
              <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 500px;">
                <h4 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Modal Title</h4>
                <p style="color: #666; margin-bottom: 1.5rem;">
                  Modals use large shadow for prominent elevation above other content.
                </p>
                <div style="display: flex; gap: 0.75rem;">
                  <button style="padding: 0.5rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                    Confirm
                  </button>
                  <button style="padding: 0.5rem 1.5rem; background: white; color: #666; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-weight: 500;">
                    Cancel
                  </button>
                </div>
              </div>
              <code style="display: block; margin-top: 1rem; font-family: monospace; font-size: 0.75rem; color: #666;">
                box-shadow: var(--shadow-modal)
              </code>
            </div>
          </div>

          <!-- Button States -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Button States</h3>
            <div style="padding: 2rem; background: #f9fafb; border-radius: 8px;">
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; box-shadow: none;">
                  Default
                </button>
                <button style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                  Hover
                </button>
                <button style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);">
                  Active
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; font-size: 0.875rem;">
          <strong>Component Shadow Guidelines:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
            <li><strong>Cards</strong>: Light shadow for subtle separation</li>
            <li><strong>Dropdowns</strong>: Medium shadow to float above content</li>
            <li><strong>Modals</strong>: Large shadow for highest elevation</li>
            <li><strong>Tooltips</strong>: Light shadow, similar to cards</li>
            <li><strong>Buttons hover</strong>: Subtle shadow on interaction</li>
            <li><strong>Buttons active</strong>: Inner shadow for pressed state</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

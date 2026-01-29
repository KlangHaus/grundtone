import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Design Tokens/Functions',
  parameters: {
    docs: {
      description: {
        component: `
# DKFDS Functions

SCSS functions til nem adgang til design tokens i din kode.

## Import
\`\`\`scss
@use '@ipeeon/design-tokens' as tokens;

// Brug functions
.my-component {
  color: tokens.func.color('primary');
  padding: tokens.func.units(4);
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

export const ColorFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>color() Function</h2>
        <p>Hent farver fra design systemet.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>// Basic colors
func.color('primary')    // #747474
func.color('success')    // #358815
func.color('error')      // #cc0000

// Gray scale
func.color('gray-100')   // #f5f5f5
func.color('gray-600')   // #747474

// With variants
func.color('primary', 'dark')   // Mørkere variant
func.color('primary', 'darker') // Endnu mørkere</code></pre>
        </div>

        <div class="demo-grid">
          <div class="demo-item">
            <div class="color-box" style="background: #747474"></div>
            <code>func.color('primary')</code>
          </div>
          <div class="demo-item">
            <div class="color-box" style="background: #358815"></div>
            <code>func.color('success')</code>
          </div>
          <div class="demo-item">
            <div class="color-box" style="background: #cc0000"></div>
            <code>func.color('error')</code>
          </div>
          <div class="demo-item">
            <div class="color-box" style="background: #1878ca"></div>
            <code>func.color('info')</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const FontSizeFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>font-size() Function</h2>
        <p>Hent font størrelser fra typografi skalaen.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.font-size('sm')  // 1.4rem (14px)
func.font-size('md')  // 1.6rem (16px)
func.font-size('lg')  // 1.8rem (18px)
func.font-size('xl')  // 2rem (20px)</code></pre>
        </div>

        <div class="demo-list">
          <p style="font-size: 1.2rem"><code>func.font-size('2xs')</code> - 1.2rem (12px)</p>
          <p style="font-size: 1.3rem"><code>func.font-size('xs')</code> - 1.3rem (13px)</p>
          <p style="font-size: 1.4rem"><code>func.font-size('sm')</code> - 1.4rem (14px)</p>
          <p style="font-size: 1.6rem"><code>func.font-size('md')</code> - 1.6rem (16px)</p>
          <p style="font-size: 1.8rem"><code>func.font-size('lg')</code> - 1.8rem (18px)</p>
          <p style="font-size: 2rem"><code>func.font-size('xl')</code> - 2rem (20px)</p>
          <p style="font-size: 2.4rem"><code>func.font-size('3xl')</code> - 2.4rem (24px)</p>
          <p style="font-size: 3.2rem"><code>func.font-size('5xl')</code> - 3.2rem (32px)</p>
        </div>
      </div>
    `,
  }),
};

export const UnitsFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>units() Function</h2>
        <p>Konverter spacing enheder til pixels baseret på 8px system.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>// Med tal
func.units(1)   // 8px
func.units(2)   // 16px
func.units(4)   // 32px

// Med spacing nøgler
func.units(3)   // 8px
func.units(5)   // 24px
func.units(8)   // 48px

// Med pixel værdier
func.units(20px) // 20px (uændret)</code></pre>
        </div>

        <div class="spacing-demo">
          <div class="spacing-row">
            <div class="spacing-visual" style="width: 8px; height: 8px;"></div>
            <code>func.units(1)</code> = 8px
          </div>
          <div class="spacing-row">
            <div class="spacing-visual" style="width: 16px; height: 16px;"></div>
            <code>func.units(2)</code> = 16px
          </div>
          <div class="spacing-row">
            <div class="spacing-visual" style="width: 24px; height: 24px;"></div>
            <code>func.units(3)</code> = 24px
          </div>
          <div class="spacing-row">
            <div class="spacing-visual" style="width: 32px; height: 32px;"></div>
            <code>func.units(4)</code> = 32px
          </div>
          <div class="spacing-row">
            <div class="spacing-visual" style="width: 48px; height: 48px;"></div>
            <code>func.units(6)</code> = 48px
          </div>
        </div>
      </div>
    `,
  }),
};

export const BorderFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>border() Function</h2>
        <p>Hent foruddefinerede border styles.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.border('default')       // 1px solid #aaa
func.border('light')         // 1px solid #bfbfbf
func.border('dark')          // 1px solid #747474
func.border('high-contrast') // 3px solid #1a1a1a
func.border('none')          // none</code></pre>
        </div>

        <div class="border-demo">
          <div class="border-box" style="border: 1px solid #aaa">
            <code>func.border('default')</code>
          </div>
          <div class="border-box" style="border: 1px solid #bfbfbf">
            <code>func.border('light')</code>
          </div>
          <div class="border-box" style="border: 1px solid #747474">
            <code>func.border('dark')</code>
          </div>
          <div class="border-box" style="border: 3px solid #1a1a1a">
            <code>func.border('high-contrast')</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ShadowFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>shadow() Function</h2>
        <p>Hent foruddefinerede box shadows.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.shadow('subtle')      // 0 1px 3px rgba(0,0,0,0.1)
func.shadow('light')       // 0 2px 4px rgba(0,0,0,0.1)
func.shadow('medium')      // Multiple shadows
func.shadow('large')       // Større shadow
func.shadow('extra-large') // Ekstra stor
func.shadow('inner')       // Inset shadow</code></pre>
        </div>

        <div class="shadow-demo">
          <div class="shadow-box" style="box-shadow: 0 1px 3px rgba(0,0,0,0.1)">
            <code>func.shadow('subtle')</code>
          </div>
          <div class="shadow-box" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
            <code>func.shadow('light')</code>
          </div>
          <div class="shadow-box" style="box-shadow: 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)">
            <code>func.shadow('medium')</code>
          </div>
          <div class="shadow-box" style="box-shadow: 0 8px 16px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)">
            <code>func.shadow('large')</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const RadiusFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>radius() Function</h2>
        <p>Hent border radius værdier.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.radius('none')    // 0
func.radius('xs')      // 2px
func.radius('sm')      // 4px
func.radius('default') // 6px
func.radius('md')      // 8px
func.radius('lg')      // 12px
func.radius('xl')      // 16px
func.radius('round')   // 50%
func.radius('full')    // 9999px</code></pre>
        </div>

        <div class="radius-demo">
          <div class="radius-box" style="border-radius: 0">
            <code>none</code>
          </div>
          <div class="radius-box" style="border-radius: 2px">
            <code>xs</code>
          </div>
          <div class="radius-box" style="border-radius: 4px">
            <code>sm</code>
          </div>
          <div class="radius-box" style="border-radius: 6px">
            <code>default</code>
          </div>
          <div class="radius-box" style="border-radius: 12px">
            <code>lg</code>
          </div>
          <div class="radius-box" style="border-radius: 50%">
            <code>round</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const BreakpointFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>breakpoint() Function</h2>
        <p>Hent breakpoint værdier til responsive designs.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.breakpoint('xs')  // 0
func.breakpoint('sm')  // 576px
func.breakpoint('md')  // 768px
func.breakpoint('lg')  // 992px
func.breakpoint('xl')  // 1200px</code></pre>
        </div>

        <div class="breakpoint-demo">
          <div class="breakpoint-visual">
            <div class="breakpoint-bar xs">XS: 0px</div>
            <div class="breakpoint-bar sm">SM: 576px</div>
            <div class="breakpoint-bar md">MD: 768px</div>
            <div class="breakpoint-bar lg">LG: 992px</div>
            <div class="breakpoint-bar xl">XL: 1200px</div>
          </div>
        </div>

        <h3>Container Width Function</h3>
        <pre><code>func.container-width('sm')  // 540px
func.container-width('md')  // 720px
func.container-width('lg')  // 960px
func.container-width('xl')  // 1140px</code></pre>
      </div>
    `,
  }),
};

export const ZIndexFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>z-index() Function</h2>
        <p>Hent z-index værdier til layering.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.z-index('negative')  // -1
func.z-index('default')   // 0
func.z-index('above')     // 100
func.z-index('dropdown')  // 200
func.z-index('sticky')    // 300
func.z-index('overlay')   // 400
func.z-index('modal')     // 500
func.z-index('popover')   // 600
func.z-index('tooltip')   // 700
func.z-index('top')       // 900</code></pre>
        </div>

        <div class="z-index-demo">
          <div class="z-stack">
            <div class="z-item" style="z-index: 0; top: 0; left: 0;">Default (0)</div>
            <div class="z-item" style="z-index: 100; top: 20px; left: 20px;">Above (100)</div>
            <div class="z-item" style="z-index: 200; top: 40px; left: 40px;">Dropdown (200)</div>
            <div class="z-item" style="z-index: 500; top: 60px; left: 60px;">Modal (500)</div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const GutterFunction: Story = {
  render: () => ({
    template: `
      <div class="function-demo">
        <h2>gutter() Function</h2>
        <p>Hent gutter værdier til grid layouts.</p>
        
        <div class="code-example">
          <h3>Syntax</h3>
          <pre><code>func.gutter('none')    // 0
func.gutter('sm')      // 16px
func.gutter('default') // 32px
func.gutter('lg')      // 48px
func.gutter('xl')      // 64px</code></pre>
        </div>

        <div class="gutter-demo">
          <div class="gutter-example">
            <div class="gutter-row" style="gap: 0">
              <div class="gutter-col">None</div>
              <div class="gutter-col">0px</div>
            </div>
          </div>
          <div class="gutter-example">
            <div class="gutter-row" style="gap: 16px">
              <div class="gutter-col">Small</div>
              <div class="gutter-col">16px</div>
            </div>
          </div>
          <div class="gutter-example">
            <div class="gutter-row" style="gap: 32px">
              <div class="gutter-col">Default</div>
              <div class="gutter-col">32px</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

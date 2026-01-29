import type { Meta, StoryObj } from '@storybook/vue3-vite';
import './ContainerQueries.stories.scss';

// Container Queries Demo Component
const ContainerQueriesDemo = {
  template: `
    <div class="container-queries-demo">
      <h2>Container Queries</h2>
      <p class="intro">
        Container queries enable responsive design based on container size instead of viewport size, 
        allowing components to adapt to their available space regardless of viewport dimensions.
      </p>
      
      <!-- Browser Support Notice -->
      <div class="support-notice">
        <h3>🌐 Browser Support</h3>
        <p>Container queries are supported in:</p>
        <ul>
          <li>Chrome 105+, Safari 16+, Firefox 110+</li>
          <li>Fallback support provided for older browsers using ResizeObserver</li>
        </ul>
      </div>

      <!-- Basic Container Query Examples -->
      <section class="demo-section">
        <h3>Basic Container Queries</h3>
        
        <div class="example-container">
          <h4>Responsive Card</h4>
          <p>Resize this container to see the card adapt:</p>
          
          <div class="resizable-container haspen-container">
            <div class="responsive-card">
              <div class="card-header">Responsive Card</div>
              <div class="card-content haspen-cq-sm:flex haspen-cq-sm:flex-row haspen-cq-lg:p-8">
                <div class="card-image haspen-cq-sm:flex-shrink-0">
                  <div class="image-placeholder">📷</div>
                </div>
                <div class="card-body">
                  <h5 class="haspen-cq-md:text-xl haspen-cq-lg:text-2xl">Container-Aware Content</h5>
                  <p class="haspen-cq-sm:text-sm haspen-cq-md:text-base">
                    This card changes layout based on its container size, not the viewport. 
                    The image moves to the side and text size increases as the container grows.
                  </p>
                  <div class="card-actions haspen-cq-sm:flex haspen-cq-sm:justify-between haspen-cq-md:gap-4">
                    <button class="demo-button haspen-cq-lg:p-4">Primary Action</button>
                    <button class="demo-button secondary haspen-cq-sm:hidden haspen-cq-md:block">Secondary</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="example-container">
          <h4>Grid Layout Adaptation</h4>
          <p>Grid changes column count based on container width:</p>
          
          <div class="resizable-container haspen-container">
            <div class="responsive-grid haspen-grid haspen-cq-sm:grid-cols-2 haspen-cq-md:grid-cols-3 haspen-cq-lg:grid-cols-4 haspen-gap-4">
              <div class="grid-item">Item 1</div>
              <div class="grid-item">Item 2</div>
              <div class="grid-item">Item 3</div>
              <div class="grid-item">Item 4</div>
              <div class="grid-item">Item 5</div>
              <div class="grid-item">Item 6</div>
              <div class="grid-item">Item 7</div>
              <div class="grid-item">Item 8</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Named Container Examples -->
      <section class="demo-section">
        <h3>Named Containers</h3>
        
        <div class="example-container">
          <h4>Card Container</h4>
          <p>Different styling based on named container size:</p>
          
          <div class="resizable-container haspen-container-card">
            <div class="named-card">
              <h5 class="card-title">Named Container Card</h5>
              <p>This card uses a named container to apply different styles.</p>
              <div class="card-compact">Compact when small</div>
              <div class="card-normal">Normal when medium</div>
              <div class="card-spacious">Spacious when large</div>
            </div>
          </div>
        </div>

        <div class="example-container">
          <h4>Sidebar Container</h4>
          <p>Sidebar that collapses based on its own width:</p>
          
          <div class="resizable-container haspen-container-sidebar">
            <nav class="responsive-sidebar">
              <div class="sidebar-item">
                <span class="sidebar-icon">🏠</span>
                <span class="sidebar-text">Home</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-icon">👤</span>
                <span class="sidebar-text">Profile</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-icon">⚙️</span>
                <span class="sidebar-text">Settings</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-icon">📊</span>
                <span class="sidebar-text">Analytics</span>
              </div>
            </nav>
          </div>
        </div>
      </section>

      <!-- Container Query vs Media Query Comparison -->
      <section class="demo-section">
        <h3>Container Queries vs Media Queries</h3>
        
        <div class="comparison-grid">
          <div class="comparison-item">
            <h4>Media Query Approach</h4>
            <div class="media-query-container">
              <div class="old-responsive-card">
                <div class="card-content">
                  <h5>Media Query Card</h5>
                  <p>This card responds to viewport size, not container size.</p>
                  <button class="demo-button">Fixed Response</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="comparison-item">
            <h4>Container Query Approach</h4>
            <div class="container-query-container haspen-container">
              <div class="new-responsive-card">
                <div class="card-content haspen-cq-md:flex haspen-cq-md:flex-row haspen-cq-md:gap-4">
                  <div class="card-text">
                    <h5 class="haspen-cq-md:text-lg">Container Query Card</h5>
                    <p class="haspen-cq-sm:text-sm">This card responds to its container size.</p>
                  </div>
                  <button class="demo-button haspen-cq-sm:block haspen-cq-md:flex-shrink-0">Smart Response</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-world Patterns -->
      <section class="demo-section">
        <h3>Real-world Patterns</h3>
        
        <div class="example-container">
          <h4>Dashboard Widget</h4>
          <p>Widget that adapts its layout based on available space:</p>
          
          <div class="widget-showcase">
            <div class="widget-container small haspen-container">
              <div class="dashboard-widget">
                <h5 class="widget-title haspen-cq-sm:text-lg">Sales Data</h5>
                <div class="widget-content haspen-cq-sm:flex haspen-cq-sm:flex-col haspen-cq-md:flex-row haspen-cq-md:items-center">
                  <div class="widget-metric">
                    <span class="metric-value haspen-cq-md:text-2xl">$24,591</span>
                    <span class="metric-label haspen-cq-sm:text-xs haspen-cq-md:text-sm">This Month</span>
                  </div>
                  <div class="widget-chart haspen-cq-sm:mt-2 haspen-cq-md:mt-0 haspen-cq-md:ml-4">
                    <div class="chart-placeholder">📈</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="widget-container medium haspen-container">
              <div class="dashboard-widget">
                <h5 class="widget-title haspen-cq-sm:text-lg">Sales Data</h5>
                <div class="widget-content haspen-cq-sm:flex haspen-cq-sm:flex-col haspen-cq-md:flex-row haspen-cq-md:items-center">
                  <div class="widget-metric">
                    <span class="metric-value haspen-cq-md:text-2xl">$24,591</span>
                    <span class="metric-label haspen-cq-sm:text-xs haspen-cq-md:text-sm">This Month</span>
                  </div>
                  <div class="widget-chart haspen-cq-sm:mt-2 haspen-cq-md:mt-0 haspen-cq-md:ml-4">
                    <div class="chart-placeholder">📈</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="widget-container large haspen-container">
              <div class="dashboard-widget">
                <h5 class="widget-title haspen-cq-sm:text-lg">Sales Data</h5>
                <div class="widget-content haspen-cq-sm:flex haspen-cq-sm:flex-col haspen-cq-md:flex-row haspen-cq-md:items-center">
                  <div class="widget-metric">
                    <span class="metric-value haspen-cq-md:text-2xl">$24,591</span>
                    <span class="metric-label haspen-cq-sm:text-xs haspen-cq-md:text-sm">This Month</span>
                  </div>
                  <div class="widget-chart haspen-cq-sm:mt-2 haspen-cq-md:mt-0 haspen-cq-md:ml-4">
                    <div class="chart-placeholder">📈</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="example-container">
          <h4>Product Card Grid</h4>
          <p>Cards that maintain optimal content density regardless of grid layout:</p>
          
          <div class="product-grid">
            <div class="product-card haspen-container">
              <div class="product-content">
                <div class="product-image haspen-cq-sm:h-32 haspen-cq-md:h-40">
                  <div class="image-placeholder">🛍️</div>
                </div>
                <div class="product-info haspen-cq-sm:p-3 haspen-cq-md:p-4">
                  <h6 class="product-title haspen-cq-sm:text-sm haspen-cq-md:text-base">Smart Watch</h6>
                  <p class="product-description haspen-cq-sm:text-xs haspen-cq-md:text-sm haspen-cq-lg:block">
                    High-quality smartwatch with advanced features
                  </p>
                  <div class="product-price haspen-cq-sm:text-lg haspen-cq-md:text-xl">$299</div>
                </div>
              </div>
            </div>
            
            <div class="product-card haspen-container">
              <div class="product-content">
                <div class="product-image haspen-cq-sm:h-32 haspen-cq-md:h-40">
                  <div class="image-placeholder">🎧</div>
                </div>
                <div class="product-info haspen-cq-sm:p-3 haspen-cq-md:p-4">
                  <h6 class="product-title haspen-cq-sm:text-sm haspen-cq-md:text-base">Wireless Headphones</h6>
                  <p class="product-description haspen-cq-sm:text-xs haspen-cq-md:text-sm haspen-cq-lg:block">
                    Premium noise-canceling headphones
                  </p>
                  <div class="product-price haspen-cq-sm:text-lg haspen-cq-md:text-xl">$199</div>
                </div>
              </div>
            </div>
            
            <div class="product-card haspen-container">
              <div class="product-content">
                <div class="product-image haspen-cq-sm:h-32 haspen-cq-md:h-40">
                  <div class="image-placeholder">📱</div>
                </div>
                <div class="product-info haspen-cq-sm:p-3 haspen-cq-md:p-4">
                  <h6 class="product-title haspen-cq-sm:text-sm haspen-cq-md:text-base">Smartphone</h6>
                  <p class="product-description haspen-cq-sm:text-xs haspen-cq-md:text-sm haspen-cq-lg:block">
                    Latest flagship smartphone with AI features
                  </p>
                  <div class="product-price haspen-cq-sm:text-lg haspen-cq-md:text-xl">$899</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CSS Classes Reference -->
      <section class="demo-section">
        <h3>CSS Classes Reference</h3>
        
        <div class="reference-grid">
          <div class="reference-section">
            <h4>Container Types</h4>
            <ul class="class-list">
              <li><code>.haspen-container</code> - Basic inline-size container</li>
              <li><code>.haspen-container-size</code> - Size container (width + height)</li>
              <li><code>.haspen-container-card</code> - Named "card" container</li>
              <li><code>.haspen-container-sidebar</code> - Named "sidebar" container</li>
            </ul>
          </div>
          
          <div class="reference-section">
            <h4>Display Utilities</h4>
            <ul class="class-list">
              <li><code>.haspen-cq-sm:flex</code> - Flex at small container size</li>
              <li><code>.haspen-cq-md:grid</code> - Grid at medium container size</li>
              <li><code>.haspen-cq-lg:hidden</code> - Hide at large container size</li>
            </ul>
          </div>
          
          <div class="reference-section">
            <h4>Grid Utilities</h4>
            <ul class="class-list">
              <li><code>.haspen-cq-sm:grid-cols-2</code> - 2 columns at small size</li>
              <li><code>.haspen-cq-md:grid-cols-3</code> - 3 columns at medium size</li>
              <li><code>.haspen-cq-lg:grid-cols-4</code> - 4 columns at large size</li>
            </ul>
          </div>
          
          <div class="reference-section">
            <h4>Typography</h4>
            <ul class="class-list">
              <li><code>.haspen-cq-sm:text-sm</code> - Small text at small size</li>
              <li><code>.haspen-cq-md:text-base</code> - Base text at medium size</li>
              <li><code>.haspen-cq-lg:text-lg</code> - Large text at large size</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Performance & Best Practices -->
      <section class="demo-section">
        <h3>Performance & Best Practices</h3>
        
        <div class="best-practices">
          <div class="practice-item">
            <h4>✅ Do</h4>
            <ul>
              <li>Use container queries for component-level responsive design</li>
              <li>Set <code>container-type: inline-size</code> on parent containers</li>
              <li>Use named containers for complex layouts</li>
              <li>Combine with CSS Grid for powerful layout systems</li>
              <li>Test with browser fallbacks for older browsers</li>
            </ul>
          </div>
          
          <div class="practice-item">
            <h4>❌ Don't</h4>
            <ul>
              <li>Use container queries for page-level layouts (use media queries)</li>
              <li>Nest too many container query contexts</li>
              <li>Forget to test in browsers without support</li>
              <li>Override with !important unless necessary</li>
            </ul>
          </div>
        </div>
        
        <div class="performance-info">
          <h4>🚀 Performance Benefits</h4>
          <ul>
            <li><strong>Modular Components:</strong> Components work in any layout context</li>
            <li><strong>Reduced JavaScript:</strong> No need for resize listeners in many cases</li>
            <li><strong>Better Encapsulation:</strong> Component styles don't depend on page layout</li>
            <li><strong>Intrinsic Design:</strong> Layouts adapt naturally to content and context</li>
          </ul>
        </div>
      </section>
    </div>
  `,
};

const meta: Meta = {
  title: 'Design Tokens/Container Queries',
  component: ContainerQueriesDemo,
  parameters: {
    docs: {
      description: {
        component: `
# Container Queries

Modern responsive design utilities that enable components to adapt based on their container size instead of viewport size.

## Overview

Container queries represent a paradigm shift in responsive design, allowing components to be truly modular by responding to their available space rather than the browser viewport.

## Key Features

### Container Types
- **\`.haspen-container\`** - Basic inline-size container
- **\`.haspen-container-size\`** - Size container (both width and height)
- **Named containers** - \`.haspen-container-card\`, \`.haspen-container-sidebar\`

### Responsive Utilities
- **Display:** \`.haspen-cq-sm:flex\`, \`.haspen-cq-md:grid\`, \`.haspen-cq-lg:hidden\`
- **Grid:** \`.haspen-cq-sm:grid-cols-2\`, \`.haspen-cq-md:grid-cols-3\`
- **Typography:** \`.haspen-cq-sm:text-sm\`, \`.haspen-cq-lg:text-xl\`
- **Spacing:** \`.haspen-cq-md:p-4\`, \`.haspen-cq-lg:m-8\`

### Container Query Breakpoints
- **sm:** 24rem (384px)
- **md:** 32rem (512px)  
- **lg:** 48rem (768px)
- **xl:** 64rem (1024px)

## Browser Support

- **Modern browsers:** Chrome 105+, Safari 16+, Firefox 110+
- **Fallback support:** ResizeObserver-based detection for older browsers
- **Progressive enhancement:** Graceful degradation when not supported

## Usage Examples

\`\`\`html
<!-- Basic responsive card -->
<div class="haspen-container">
  <div class="card haspen-cq-sm:flex haspen-cq-md:grid">
    <div class="content haspen-cq-lg:p-8">
      <h3 class="haspen-cq-md:text-xl">Title</h3>
      <p class="haspen-cq-sm:text-sm">Content that adapts to container size</p>
    </div>
  </div>
</div>

<!-- Named container -->
<div class="haspen-container-card">
  <div class="responsive-content">
    <div class="card-compact">Compact layout</div>
    <div class="card-normal">Normal layout</div>
    <div class="card-spacious">Spacious layout</div>
  </div>
</div>
\`\`\`

## Vue Composable

Use the \`useContainerQuery\` composable for programmatic container query detection:

\`\`\`vue
<template>
  <div ref="containerRef" class="haspen-container">
    <div v-if="matches">Large container content</div>
    <div v-else>Small container content</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useContainerQuery } from '@ipeeon/composables'

const containerRef = ref()
const { matches } = useContainerQuery({
  container: containerRef,
  query: '(min-width: 400px)'
})
</script>
\`\`\`

## Benefits

- **Component Modularity:** Components work in any layout context
- **Intrinsic Design:** Layouts adapt naturally to available space
- **Performance:** Reduced need for JavaScript resize handling
- **Maintainability:** Cleaner, more predictable responsive behavior
        `,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => ContainerQueriesDemo,
  parameters: {
    docs: {
      description: {
        story:
          'Complete overview of container query utilities with interactive examples and real-world patterns.',
      },
    },
  },
};

export const BasicExamples: Story = {
  render: () => ({
    template: `
      <div class="container-queries-demo">
        <h3>Basic Container Query Examples</h3>
        
        <div class="example-container">
          <h4>Responsive Card Layout</h4>
          <div class="resizable-container haspen-container">
            <div class="responsive-card">
              <div class="card-content haspen-cq-sm:flex haspen-cq-sm:flex-row haspen-cq-lg:p-8">
                <div class="card-image haspen-cq-sm:flex-shrink-0">
                  <div class="image-placeholder">📷</div>
                </div>
                <div class="card-body">
                  <h5 class="haspen-cq-md:text-xl">Container-Aware Card</h5>
                  <p class="haspen-cq-sm:text-sm haspen-cq-md:text-base">
                    This card adapts its layout based on container size, not viewport size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="example-container">
          <h4>Responsive Grid</h4>
          <div class="resizable-container haspen-container">
            <div class="haspen-grid haspen-cq-sm:grid-cols-2 haspen-cq-md:grid-cols-3 haspen-cq-lg:grid-cols-4 haspen-gap-4">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
              <div class="grid-item">5</div>
              <div class="grid-item">6</div>
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
          'Basic container query examples showing cards and grids that adapt to their container size.',
      },
    },
  },
};

export const NamedContainers: Story = {
  render: () => ({
    template: `
      <div class="container-queries-demo">
        <h3>Named Container Examples</h3>
        
        <div class="example-container">
          <h4>Card Container</h4>
          <div class="resizable-container haspen-container-card">
            <div class="named-card">
              <h5>Named Container Card</h5>
              <div class="card-compact">Compact styling when small</div>
              <div class="card-normal">Normal styling when medium</div>
              <div class="card-spacious">Spacious styling when large</div>
            </div>
          </div>
        </div>
        
        <div class="example-container">
          <h4>Sidebar Container</h4>
          <div class="resizable-container haspen-container-sidebar">
            <nav class="responsive-sidebar">
              <div class="sidebar-item">
                <span class="sidebar-icon">🏠</span>
                <span class="sidebar-text">Home</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-icon">👤</span>
                <span class="sidebar-text">Profile</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-icon">⚙️</span>
                <span class="sidebar-text">Settings</span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Examples using named containers for specific styling patterns and behaviors.',
      },
    },
  },
};

# Containers

Container utilities for creating centered, responsive page layouts with consistent horizontal
padding.

## Container Classes

### Base Container

| Class        | Behavior                                           |
| ------------ | -------------------------------------------------- |
| `.container` | Responsive fixed-width container (standard choice) |

The `.container` class provides a responsive fixed-width container that centers content and adapts
to different screen sizes:

| Breakpoint    | Max Width |
| ------------- | --------- |
| `< 576px`     | 100%      |
| `≥ 576px` sm  | 540px     |
| `≥ 768px` md  | 720px     |
| `≥ 992px` lg  | 960px     |
| `≥ 1200px` xl | 1140px    |

### Fluid Container

| Class                  | Max Width | Description                |
| ---------------------- | --------- | -------------------------- |
| `.container-fluid`     | 100%      | Full-width at all sizes    |
| `.container-sm`        | 540px     | Max width from `sm` up     |
| `.container-md`        | 720px     | Max width from `md` up     |
| `.container-lg`        | 960px     | Max width from `lg` up     |
| `.container-xl`        | 1140px    | Max width from `xl` up     |
| `.container-narrow`    | 768px     | Narrow for article/prose   |
| `.container-tight`     | 640px     | Tight for focused content  |
| `.container-wide`      | 1400px    | Wide for dashboards        |
| `.container-ultrawide` | 1600px    | Extra wide for data tables |

## Hvordan Bruger Man

### Standard Page Layout

```html
<div class="container">
  <h1>Page Title</h1>
  <p>Content goes here...</p>
</div>
```

### Full-Width Layout

```html
<div class="container-fluid">
  <h1>Full Width Content</h1>
  <p>Spans entire viewport width</p>
</div>
```

### Article/Blog Layout

```html
<article class="container-narrow">
  <h1>Article Title</h1>
  <p>Optimized line length for reading (768px max)</p>
</article>
```

### Dashboard Layout

```html
<div class="container-wide">
  <div class="grid grid-cols-4 gap-4">
    <div>Chart 1</div>
    <div>Chart 2</div>
    <div>Chart 3</div>
    <div>Chart 4</div>
  </div>
</div>
```

## Praktiske Eksempler

### Standard Website Header

```html
<header class="bg-primary">
  <div class="container">
    <nav class="d-flex justify-content-between py-4">
      <div class="logo">Logo</div>
      <ul class="d-flex gap-4">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### Hero Section with Full-Width Background

```html
<section class="bg-light py-6">
  <div class="container">
    <div class="grid grid-cols-2 gap-6">
      <div>
        <h1 class="mb-4">Welcome to Our Site</h1>
        <p class="mb-4">This content is centered with max-width</p>
        <button>Get Started</button>
      </div>
      <div>
        <img src="hero.jpg" alt="Hero image" />
      </div>
    </div>
  </div>
</section>
```

### Blog Post

```html
<article class="py-6">
  <div class="container-narrow">
    <h1 class="mb-4">Blog Post Title</h1>
    <p class="mb-3">
      Narrow container ensures optimal line length (50-75 characters) for comfortable reading.
    </p>
    <p class="mb-3">More content here...</p>
  </div>
</article>
```

### Mixed Width Sections

```html
<!-- Full-width hero -->
<section class="bg-primary py-6">
  <div class="container-fluid text-center">
    <h1 class="text-white">Full Width Hero</h1>
  </div>
</section>

<!-- Standard content -->
<section class="py-6">
  <div class="container">
    <h2 class="mb-4">Features</h2>
    <div class="grid grid-cols-3 gap-4">
      <div>Feature 1</div>
      <div>Feature 2</div>
      <div>Feature 3</div>
    </div>
  </div>
</section>

<!-- Narrow content -->
<section class="py-6">
  <div class="container-tight">
    <h2 class="mb-4 text-center">Testimonials</h2>
    <blockquote>"Great product!"</blockquote>
  </div>
</section>
```

### Data Dashboard

```html
<div class="container-wide py-6">
  <h1 class="mb-4">Analytics Dashboard</h1>

  <!-- Stats grid -->
  <div class="grid grid-cols-4 gap-4 mb-6">
    <div class="p-4 bg-light">
      <h3>Users</h3>
      <p class="h2">1,234</p>
    </div>
    <div class="p-4 bg-light">
      <h3>Revenue</h3>
      <p class="h2">$56,789</p>
    </div>
    <div class="p-4 bg-light">
      <h3>Orders</h3>
      <p class="h2">890</p>
    </div>
    <div class="p-4 bg-light">
      <h3>Conversion</h3>
      <p class="h2">3.2%</p>
    </div>
  </div>

  <!-- Wide data table -->
  <div class="p-4 bg-light">
    <table class="w-100">
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2024-01-30</td>
          <td>John Doe</td>
          <td>$123.45</td>
          <td>Completed</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Responsive Container Switching

```html
<!-- Use different container sizes at different breakpoints -->
<div class="container-fluid md:container-md lg:container">
  <h1>Responsive Container</h1>
  <p>Fluid on mobile, medium width on tablet, standard width on desktop</p>
</div>
```

### Nested Containers

```html
<!-- Outer fluid container -->
<section class="container-fluid bg-light py-6">
  <!-- Inner standard container -->
  <div class="container">
    <h2 class="mb-4">Section Title</h2>
    <p>Content with full-width background but centered content</p>
  </div>
</section>
```

### Form Layout

```html
<div class="container-tight py-6">
  <h1 class="mb-4">Sign Up</h1>
  <form>
    <div class="mb-4">
      <label class="mb-2">Full Name</label>
      <input type="text" class="w-100" />
    </div>
    <div class="mb-4">
      <label class="mb-2">Email</label>
      <input type="email" class="w-100" />
    </div>
    <div class="mb-4">
      <label class="mb-2">Password</label>
      <input type="password" class="w-100" />
    </div>
    <button type="submit" class="w-100">Create Account</button>
  </form>
</div>
```

### Sidebar Layout

```html
<div class="container py-6">
  <div class="grid grid-cols-12 gap-6">
    <!-- Main content (8 columns) -->
    <main class="col-span-12 lg:col-span-8">
      <h1 class="mb-4">Main Content</h1>
      <p>Primary content area with wider width</p>
    </main>

    <!-- Sidebar (4 columns) -->
    <aside class="col-span-12 lg:col-span-4">
      <div class="p-4 bg-light">
        <h3 class="mb-3">Sidebar</h3>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </div>
    </aside>
  </div>
</div>
```

## Container Guide

### When to Use Each Container

| Container                | Use Case                    | Example                    |
| ------------------------ | --------------------------- | -------------------------- |
| `.container`             | Standard page content       | Most pages, sections       |
| `.container-fluid`       | Full-width layouts          | Hero sections, backgrounds |
| `.container-narrow`      | Articles, blog posts        | Long-form text content     |
| `.container-tight`       | Forms, modals, focus areas  | Login forms, signup modals |
| `.container-wide`        | Dashboards, admin panels    | Analytics, data views      |
| `.container-ultrawide`   | Data tables, spreadsheets   | Wide datasets, comparisons |
| `.container-sm/md/lg/xl` | Specific breakpoint control | Custom responsive behavior |

### Choosing Container Width

```html
<!-- Optimal reading (prose) -->
<article class="container-narrow">
  <p>45-75 characters per line for comfortable reading</p>
</article>

<!-- Standard web content -->
<section class="container">
  <div class="grid grid-cols-3 gap-4">Cards, features, etc.</div>
</section>

<!-- Data-heavy interfaces -->
<div class="container-wide">
  <table>
    Large data table with many columns
  </table>
</div>
```

## Container Padding

All containers include horizontal padding:

- **Padding**: 16px on each side (32px total gutter)
- **Purpose**: Prevents content from touching screen edges on mobile
- **Responsive**: Consistent at all breakpoints

## SCSS Usage

```scss
@use '@grundtone/design-tokens' as tokens;

// Custom container
.custom-container {
  max-width: 900px;
  padding-right: calc(tokens.$grid-gutter-width / 2);
  padding-left: calc(tokens.$grid-gutter-width / 2);
  margin-right: auto;
  margin-left: auto;
}

// Container with custom padding
.custom-padding-container {
  @extend .container;
  padding-right: 2rem;
  padding-left: 2rem;
}

// Responsive container
.responsive-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @include tokens.media-breakpoint-up('md') {
    max-width: 720px;
  }

  @include tokens.media-breakpoint-up('lg') {
    max-width: 960px;
  }
}
```

## Best Practices

::: tip Do

- Use `.container` for most standard page layouts
- Use `.container-narrow` for articles and long-form text
- Use `.container-fluid` for full-width sections with background colors
- Nest containers inside full-width backgrounds for centered content
- Combine containers with grid/flexbox for complex layouts
- Use consistent containers throughout your site

:::

::: warning Don't

- Don't nest containers inside containers (causes double padding)
- Don't override container max-widths inconsistently
- Don't forget horizontal padding on custom containers
- Don't use containers for components (use for page-level layout only)
- Don't mix container types without purpose

:::

## Common Patterns

### Full-Width Background, Centered Content

```html
<section class="bg-primary py-6">
  <div class="container">
    <h2>Centered content with full-width background</h2>
  </div>
</section>
```

### Alternating Container Widths

```html
<div class="container py-6">
  <h1>Standard Width</h1>
</div>

<div class="container-fluid bg-light py-6">
  <h2>Full Width Section</h2>
</div>

<div class="container-narrow py-6">
  <article>Narrow article content</article>
</div>
```

### Breakout Content

```html
<div class="container">
  <h1>Main Content</h1>
  <p>Regular container content...</p>
</div>

<!-- Breakout to full width -->
<div class="container-fluid py-6">
  <img src="wide-image.jpg" alt="Full width image" class="w-100" />
</div>

<div class="container">
  <p>Back to regular container...</p>
</div>
```

## Browser Support

Container utilities use standard CSS and work in all modern browsers:

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

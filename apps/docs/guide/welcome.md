# Welcome to Grundtone Design Tokens

Grundtone's design tokens provide a comprehensive foundation for building consistent, accessible,
and maintainable user interfaces. Design tokens are the visual design atoms of the design system -
they define colors, typography, spacing, and other fundamental design decisions.

## What are Design Tokens?

Design tokens are named entities that store visual design attributes. Instead of hard-coding values
like `#0059b3` or `16px` throughout your application, you use semantic names like `primary` or
`spacing-md`. This approach provides several key benefits:

### Single Source of Truth

All design decisions are centralized in one place, making it easy to maintain consistency across
your entire application.

### Easy Updates

Change a token value once, and it updates everywhere it's used. No more hunting through code to
update colors or spacing.

### Platform Agnostic

Export tokens to any platform - web, iOS, Android, or design tools like Figma - ensuring consistency
across all touchpoints.

### Type Safety

Full TypeScript support with autocomplete and type checking helps prevent errors and improves
developer experience.

## Token Categories

Grundtone organizes tokens into logical categories:

### Colors

- **10-shade palettes**: Each color has 10 shades from 50 (lightest) to 900 (darkest)
- **Semantic colors**: Primary, secondary, success, warning, error, info
- **Neutral colors**: Comprehensive grayscale palette
- **WCAG compliant**: All color combinations meet accessibility standards

### Typography

- **Font families**: System fonts with fallbacks
- **Font sizes**: Harmonious type scale from xs to 5xl
- **Font weights**: Light, normal, medium, semibold, bold
- **Line heights**: Optimized for readability

### Spacing

- **Consistent scale**: 4px-based spacing system
- **Semantic names**: xs, sm, md, lg, xl, 2xl, etc.
- **Layout utilities**: Margin, padding, and gap values

### Visual Effects

- **Shadows**: Elevation system with sm, md, lg shadows
- **Border radius**: Consistent corner rounding from none to full
- **Transitions**: Animation timing and easing functions

### Responsive

- **Breakpoints**: Mobile-first responsive design
- **Container widths**: Optimized for different screen sizes

## Key Features

### WCAG Accessibility Built-in

All color tokens include contrast ratio calculations and WCAG compliance indicators. The system
automatically validates that text colors meet AA or AAA standards against their backgrounds.

### Performance Optimized

Uses CSS registered properties (`@property`) for enhanced performance with transitions and
animations. Falls back gracefully in browsers that don't support it.

### Developer Experience

- Full TypeScript definitions with IntelliSense
- Comprehensive documentation with interactive examples
- SCSS functions and mixins for easy usage
- Vue 3 composables for reactive theme management

### Framework Agnostic

While optimized for Vue 3, the core tokens work with any framework:

- **SCSS**: Import and use directly in your stylesheets
- **TypeScript**: Import token objects for programmatic access
- **CSS Variables**: Auto-generated custom properties
- **JSON**: Export tokens for design tools

## Browser Support

Grundtone design tokens support all modern browsers:

- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions

Advanced features like CSS registered properties gracefully degrade in older browsers.

## Getting Started

Ready to start using Grundtone design tokens? Follow these steps:

1. **[Install the Package](/guide/installation)** - Add @grundtone/design-tokens to your project
2. **[Learn Basic Usage](/guide/usage)** - See how to use tokens in your code
3. **[Explore Colors](/tokens/colors)** - Browse the full color palette
4. **[View Typography](/tokens/typography)** - Discover the type scale

## Package Information

- **Package**: `@grundtone/design-tokens`
- **Version**: 1.0.0
- **License**: MIT
- **Repository**: [GitHub](https://github.com/allanasp/grundtone)

## Philosophy

Grundtone design tokens are built on three core principles:

### 1. Consistency Over Flexibility

We provide a carefully curated set of tokens that work together harmoniously. While you can
customize values, the default tokens ensure visual consistency out of the box.

### 2. Accessibility First

Every design decision prioritizes accessibility. Color contrasts meet WCAG standards, font sizes are
readable, and spacing provides clear visual hierarchy.

### 3. Developer Happiness

Tokens are named semantically, documented thoroughly, and integrate seamlessly with modern
development workflows. TypeScript support and comprehensive examples make adoption easy.

## Support

Need help? Have questions? Found a bug?

- **Documentation**: Browse these docs for detailed guides
- **GitHub Issues**: [Report bugs or request features](https://github.com/allanasp/grundtone/issues)
- **GitHub Discussions**:
  [Ask questions and share ideas](https://github.com/allanasp/grundtone/discussions)

---

**Let's build something beautiful together.**

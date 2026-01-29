# Storybook Documentation Index

Welcome to the Haspen UI Storybook documentation. This directory contains comprehensive guides for
creating and maintaining Storybook documentation for the design system.

## Quick Navigation

### 📚 Main Documentation

- **[README.md](./README.md)** - Complete overview of the documentation structure
- **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - 4-week phased implementation plan
- **[HELPER_COMPONENTS.md](./HELPER_COMPONENTS.md)** - Documentation for helper Vue components
- **[STORY_TEMPLATES.md](./STORY_TEMPLATES.md)** - Templates and examples for stories

### 🎯 Quick Start

1. Read [README.md](./README.md) for overall structure
2. Review [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for phased approach
3. Check [HELPER_COMPONENTS.md](./HELPER_COMPONENTS.md) for component specs
4. Use [STORY_TEMPLATES.md](./STORY_TEMPLATES.md) as reference when writing

## Documentation Structure

```
docs/storybook/
├── INDEX.md                      # This file - navigation and overview
├── README.md                     # Main documentation overview
├── IMPLEMENTATION_PLAN.md        # Phased implementation approach
├── HELPER_COMPONENTS.md          # Helper component specifications
└── STORY_TEMPLATES.md            # Story templates and examples
```

## What's Inside

### README.md

**Purpose**: Overview of the entire Storybook documentation structure

**Contents**:

- Documentation philosophy
- Directory structure
- Section descriptions (00-introduction through 06-examples)
- Writing guidelines for MDX and .stories.ts files
- Best practices
- Testing strategy
- Deployment information
- Maintenance guidelines

**Use When**: You need to understand the overall structure or find where something should go

---

### IMPLEMENTATION_PLAN.md

**Purpose**: Detailed phased approach for implementing the documentation

**Contents**:

- 4-week timeline
- Phase 1: Foundation & Helper Components
- Phase 2: Functions & Mixins Documentation
- Phase 3: Advanced Features & Accessibility
- Phase 4: Polish, Testing & Deployment
- Success criteria for each phase
- Risk mitigation strategies
- Success metrics

**Use When**: Planning implementation work or tracking progress

---

### HELPER_COMPONENTS.md

**Purpose**: Specifications for all helper Vue components

**Contents**:

- ColorSwatch component
- ColorPalette component
- TypeScale component
- SpacingVisualizer component
- ContrastChecker component
- CodeBlock component
- TokenTable component
- Implementation guidelines
- Example code for each component

**Use When**: Building helper components or using them in stories

---

### STORY_TEMPLATES.md

**Purpose**: Templates and patterns for writing consistent stories

**Contents**:

- Token story template
- Function story template
- Mixin story template
- Tool story template
- Example story template
- MDX documentation template
- Best practices
- Code examples

**Use When**: Writing new stories or need a reference for story structure

---

## Implementation Phases

### Phase 1 (Week 1): Foundation

**Focus**: Helper components and core tokens

**Deliverables**:

- 7 helper Vue components
- Introduction section (4 MDX files)
- Foundation tokens (7 .stories.ts files)

**Status**: Not started

---

### Phase 2 (Week 2): Functions & Mixins

**Focus**: SCSS functions and mixins documentation

**Deliverables**:

- Functions documentation (5 .stories.ts files)
- Mixins documentation (4 .stories.ts files)

**Status**: Not started

---

### Phase 3 (Week 3): Advanced Features

**Focus**: Accessibility and advanced features

**Deliverables**:

- Accessibility stories (3 .stories.ts files)
- Advanced features (3 .stories.ts files)
- Real-world examples (3 .stories.ts files)

**Status**: Not started

---

### Phase 4 (Week 4): Polish & Deploy

**Focus**: Testing, refinement, and deployment

**Deliverables**:

- Visual regression testing setup
- Accessibility compliance verification
- Production deployment to Vercel
- Maintenance documentation

**Status**: Not started

---

## Quick Reference

### Story Types

| Type     | Purpose                 | Template                                                   |
| -------- | ----------------------- | ---------------------------------------------------------- |
| Token    | Document design tokens  | [Token Template](./STORY_TEMPLATES.md#token-stories)       |
| Function | Document SCSS functions | [Function Template](./STORY_TEMPLATES.md#function-stories) |
| Mixin    | Document SCSS mixins    | [Mixin Template](./STORY_TEMPLATES.md#mixin-stories)       |
| Tool     | Interactive tools       | [Tool Template](./STORY_TEMPLATES.md#tool-stories)         |
| Example  | Real-world examples     | [Example Template](./STORY_TEMPLATES.md#example-stories)   |
| MDX      | Narrative documentation | [MDX Template](./STORY_TEMPLATES.md#mdx-documentation)     |

### Helper Components

| Component         | Purpose                  | Documentation                                     |
| ----------------- | ------------------------ | ------------------------------------------------- |
| ColorSwatch       | Single color display     | [Specs](./HELPER_COMPONENTS.md#colorswatch)       |
| ColorPalette      | Color palette display    | [Specs](./HELPER_COMPONENTS.md#colorpalette)      |
| TypeScale         | Typography visualization | [Specs](./HELPER_COMPONENTS.md#typescale)         |
| SpacingVisualizer | Spacing demonstration    | [Specs](./HELPER_COMPONENTS.md#spacingvisualizer) |
| ContrastChecker   | WCAG contrast checking   | [Specs](./HELPER_COMPONENTS.md#contrastchecker)   |
| CodeBlock         | Syntax-highlighted code  | [Specs](./HELPER_COMPONENTS.md#codeblock)         |
| TokenTable        | Token tables             | [Specs](./HELPER_COMPONENTS.md#tokentable)        |

### Documentation Sections

| Section       | Path                | Contents                                  |
| ------------- | ------------------- | ----------------------------------------- |
| Introduction  | `00-introduction/`  | Welcome, installation, usage guides       |
| Foundation    | `01-foundation/`    | Core tokens (colors, typography, spacing) |
| Functions     | `02-functions/`     | SCSS function documentation               |
| Mixins        | `03-mixins/`        | SCSS mixin documentation                  |
| Accessibility | `04-accessibility/` | A11y tools and guidelines                 |
| Advanced      | `05-advanced/`      | Registered properties, theming            |
| Examples      | `06-examples/`      | Real-world implementation examples        |

### File Naming Conventions

| Type      | Pattern             | Example             |
| --------- | ------------------- | ------------------- |
| Story     | `{Name}.stories.ts` | `Colors.stories.ts` |
| MDX       | `{Name}.mdx`        | `Welcome.mdx`       |
| Component | `{Name}.vue`        | `ColorSwatch.vue`   |
| Types     | `types.ts`          | `types.ts`          |

---

## Common Tasks

### Starting New Story

1. Choose appropriate template from [STORY_TEMPLATES.md](./STORY_TEMPLATES.md)
2. Determine story location based on [README.md](./README.md) structure
3. Import required helper components from [HELPER_COMPONENTS.md](./HELPER_COMPONENTS.md)
4. Follow best practices from templates
5. Test in Storybook locally

### Creating Helper Component

1. Review specs in [HELPER_COMPONENTS.md](./HELPER_COMPONENTS.md)
2. Create Vue 3 component with Composition API
3. Add TypeScript prop definitions
4. Style with design tokens
5. Write unit tests
6. Document usage

### Planning Sprint Work

1. Review [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
2. Identify current phase
3. Check task list and priorities
4. Review success criteria
5. Estimate and commit to tasks

---

## Resources

### Internal

- [Main README](../../README.md) - Project overview
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines
- [CLAUDE.md](../../CLAUDE.md) - Development commands and standards

### External

- [Storybook Documentation](https://storybook.js.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

---

## FAQ

### Q: Where do I start?

**A**: Read [README.md](./README.md) first to understand the structure, then review
[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the phased approach.

### Q: How do I create a new story?

**A**: Check [STORY_TEMPLATES.md](./STORY_TEMPLATES.md) for templates and examples. Choose the
appropriate template for your story type.

### Q: What helper components are available?

**A**: See [HELPER_COMPONENTS.md](./HELPER_COMPONENTS.md) for all 7 helper components with props,
usage, and examples.

### Q: How long will implementation take?

**A**: The [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) estimates 4-5 weeks for complete
implementation across 4 phases.

### Q: Where should new token documentation go?

**A**: Token documentation goes in `packages/design-tokens/src/stories/01-foundation/`. See
[README.md](./README.md#01-foundation) for details.

### Q: How do I test Storybook changes?

**A**: Run `pnpm storybook` locally. See
[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md#phase-4-polish-testing--deployment) for full
testing strategy.

### Q: Where is Storybook deployed?

**A**: Storybook is deployed to Vercel. Configuration is in `/vercel.json` at the repository root.

---

## Next Steps

1. ✅ Review this index
2. 📖 Read [README.md](./README.md) for structure overview
3. 📋 Review [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
4. 🔧 Start Phase 1 implementation
5. 📝 Follow [STORY_TEMPLATES.md](./STORY_TEMPLATES.md) when writing

---

## Maintenance

This documentation should be updated when:

- New helper components are added
- Story patterns change
- New sections are added to Storybook
- Implementation phases complete
- Best practices evolve

Last Updated: 2026-01-29

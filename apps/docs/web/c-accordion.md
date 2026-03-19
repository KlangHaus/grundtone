# Accordion

A graphical element that lets users show and hide sections of related content on a page. Only one or more sections are visible at a time — the rest is hidden behind interactive headings.

Be aware that hidden content risks being overlooked by users. Accordions should only be used when they genuinely improve the user experience — not as a way to tidy up a long page.

<CodePreview name="c-accordion-default" />

---

## When to use

- Content has clear, logical groupings that benefit from chunking into collapsible sections
- Users typically need only a few sections at a time, not all content simultaneously
- The page is long and accordions help users scan and find what they need faster
- Sections are parallel — different aspects of the same topic, not sequential steps
- Mobile views where screen space is limited and progressive disclosure helps
- Regular service users who need quick access to familiar tasks

## When not to use

- Content is short enough to show directly — don't use accordions to "tidy up"
- Most users need all the content — show it visibly on the page instead
- Content is sequential (step 1 → 2 → 3) — use a step indicator or separate pages
- Users need to compare content across sections — show everything or use a table
- More than 7 sections — consider splitting across multiple pages
- For collapsing search results or dynamic lists
- As a replacement for individual pages in a self-service solution or website
- When the content would cause slow page load times even when collapsed

**Alternatives to consider:** simplify and shorten the content, split across multiple pages, use headings with anchor links, use the [Details](/web/c-details) component for a single section, or use [Tabs](/web/c-tabs) for quick switching between a few parallel views.

---

## Guidance

### General

Accordions are displayed vertically with visible headings. Clicking a heading expands its content. Clicking again collapses it.

**Consider whether accordions are the right solution.** Hiding content to make a page more digestible is generally not a good approach. If the content is too long, rewrite it or distribute it across multiple pages. Accordions work best for supplementary content — not primary content that most users need (NNGroup, 2020).

**Leave the most important section open by default.** This ensures users encounter the critical information without needing to interact. When JavaScript is not available, all content should be displayed with section labels as headings — progressive enhancement.

### Icon placement

**Place icons on the left.** Research shows users complete tasks faster when the expand/collapse icon is placed to the left of the heading. Users perceive the icon and label as a single unit, reducing scanning distance (UX Movement, 2014).

**Use plus/minus icons, not arrows.** Users interpret the plus symbol as "expand" (adding content), while arrows suggest navigation to a new page. GOV.UK initially used arrows but found that plus/minus with explicit "Show/Hide" labels tested better with screen readers and voice control software (GOV.UK, 2021).

### Interaction behavior

**Allow multiple open sections.** Don't force users to close one section to open another. Forcing single-section mode increases cognitive load and interaction cost (NNGroup, 2020). Use the `data-bs-parent` pattern only when you have a specific reason.

**Don't react to selection immediately.** If the accordion is part of a form or configuration, let the user make their choices and then apply them via a separate action button.

**Remember expanded state.** Consider using session storage to remember which sections the user had open, so they persist across page navigations. GOV.UK enables this by default (GOV.UK Design System).

### Content

**Keep headings short and scannable.** Use 1–3 words with plain language. Make the content predictable from the label alone — users will skip sections with unclear headings.

**Use parallel categories.** All headings in the same accordion should have a consistent level of abstraction. Don't mix "Pricing" with "Click here for more info" (NNGroup, 2016).

**Use short, concise content.** Accordions work best with lists, data, and overviews — not long prose. If you find yourself writing paragraphs inside accordions, the content probably belongs on its own page.

---

## Do's and don'ts

<DosDonts>
  <DoItem>

Use accordions for parallel content — different aspects of the same topic. Open the most important section by default.

<div class="accordion" role="region">
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Delivery</span></button>
    <div class="accordion__panel accordion__panel--open"><div class="accordion__body"><p>Estimated 2–5 business days.</p></div></div>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Returns</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Payment</span></button>
  </div>
</div>

  </DoItem>
  <DontItem>

Don't use accordions for sequential flows. Steps should be visible or use a step indicator.

<div class="accordion" role="region">
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Step 1: Fill form</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Step 2: Review</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Step 3: Submit</span></button>
  </div>
</div>

  </DontItem>
</DosDonts>

<DosDonts>
  <DoItem>

Keep headings short, descriptive, and parallel in abstraction level.

<div class="accordion" role="region">
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Pricing</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Features</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Support</span></button>
  </div>
</div>

  </DoItem>
  <DontItem>

Don't mix vague and specific headings. Don't use labels that fail to communicate what's inside.

<div class="accordion" role="region">
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Section 1</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">More info</span></button>
  </div>
  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Detailed pricing and feature comparison for enterprise</span></button>
  </div>
</div>

  </DontItem>
</DosDonts>

<DosDonts>
  <DoItem>

Allow multiple sections open simultaneously. Place the most important content first.

<div class="accordion" role="region">
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Overview</span></button>
    <div class="accordion__panel accordion__panel--open"><div class="accordion__body"><p>Key metrics and status.</p></div></div>
  </div>
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Configuration</span></button>
    <div class="accordion__panel accordion__panel--open"><div class="accordion__body"><p>Current settings.</p></div></div>
  </div>
</div>

  </DoItem>
  <DontItem>

Don't nest accordions inside other accordions. It confuses users and is very difficult to navigate with assistive technology.

<div class="accordion" role="region">
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Parent section</span></button>
    <div class="accordion__panel accordion__panel--open"><div class="accordion__body">
      <div class="accordion" role="region" style="margin-top: 0.5rem">
        <div class="accordion__item">
          <button class="accordion__header" aria-expanded="false"><span class="accordion__icon" aria-hidden="true"></span><span class="accordion__heading">Nested child</span></button>
        </div>
      </div>
    </div></div>
  </div>
</div>

  </DontItem>
</DosDonts>

---

## Variants

### Default (separators)

Clean and flat — integrated into the page content with separators between sections.

<CodePreview name="c-accordion-default" />

### Bordered

Border around the entire group. Clearly delineated as a standalone block. Good for settings panels and form sections.

<CodePreview name="c-accordion-bordered" />

### Card

Surface-alt background with rounded corners. For standalone blocks like FAQ, help sections, or knowledge bases.

<CodePreview name="c-accordion-card" />

---

## Usage

### Basic HTML structure

```html
<div class="accordion" role="region" aria-label="Frequently asked questions">
  <button class="accordion__toggle-all">Show all</button>

  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true" aria-controls="panel-1" id="heading-1">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Section heading</span>
    </button>
    <div id="panel-1" class="accordion__panel" role="region" aria-labelledby="heading-1">
      <div class="accordion__body">
        <p>Section content here.</p>
      </div>
    </div>
  </div>

  <div class="accordion__item">
    <button class="accordion__header" aria-expanded="false" aria-controls="panel-2" id="heading-2">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">
        Closed section
        <span class="accordion__summary">Short description</span>
      </span>
    </button>
    <div id="panel-2" class="accordion__panel" role="region" aria-labelledby="heading-2">
      <div class="accordion__body">
        <p>Hidden content here.</p>
      </div>
    </div>
  </div>
</div>
```

### Show all / Hide all

Place the toggle button before accordion items. It switches between opening and closing all sections. Label should read "Show all sections" / "Hide all sections" for clarity (GOV.UK, 2021).

```html
<div class="accordion accordion--bordered" role="region" aria-label="Settings">
  <button class="accordion__toggle-all">Show all sections</button>
  <!-- accordion__item elements -->
</div>
```

### With summary

A short description below the heading that provides extra context without expanding the section. Keep summaries very brief — long summaries are problematic for screen reader users (GOV.UK Design System).

```html
<span class="accordion__heading">
  Delivery times
  <span class="accordion__summary">Estimated 2–5 business days</span>
</span>
```

### Progressive enhancement

When JavaScript is not available, all content should be visible with section labels as standard headings. The accordion behavior is an enhancement — the content must be accessible without it.

---

## CSS Classes

| Class | Element | Description |
| --- | --- | --- |
| `.accordion` | Root | Container with font and color |
| `.accordion--bordered` | Root | Outlined variant with border and radius |
| `.accordion--card` | Root | Boxed variant with surface-alt background |
| `.accordion__toggle-all` | Button | Show/hide all toggle |
| `.accordion__item` | Div | Single section with top border |
| `.accordion__item--open` | Div | Open state — rotates plus to minus |
| `.accordion__header` | Button | Clickable trigger with flex layout |
| `.accordion__icon` | Span | Plus/minus icon drawn with CSS `::before`/`::after` |
| `.accordion__heading` | Span | Heading text (semibold) |
| `.accordion__summary` | Span | Optional short description below heading |
| `.accordion__panel` | Div | Content panel with overflow hidden |
| `.accordion__body` | Div | Inner content with padding |

---

## Accessibility

### ARIA pattern

- Headings are `<button>` elements with `aria-expanded` (true/false) and `aria-controls` (referencing panel ID)
- Content panels have `role="region"` and `aria-labelledby` referencing the heading button ID
- Plus/minus icon is decorative (`aria-hidden="true"`)
- The entire header area (icon + heading) is clickable — not just the icon

### Keyboard interaction

- **Tab**: Move focus between accordion headers
- **Enter / Space**: Toggle the focused section open/closed
- Multiple sections can be open simultaneously

### Screen readers

GOV.UK found that explicit "Show this section" / "Hide this section" labels (visually hidden) significantly improve the experience for screen reader and voice control users. Icons alone are not sufficient — users need text labels to understand the interaction (GOV.UK, 2021).

### Visual design for accessibility

- Don't use colored headings that resemble links — it misleads users about functionality (WCAG 1.3.1)
- Use consistent visual treatment across all accordions in the solution (WCAG 3.2.4)
- Icons must scale proportionally with text when users zoom — use `em` units, not `px` (WCAG 1.4.4, 1.4.10)
- Respect `prefers-reduced-motion` for animations

### Heading levels

The accordion heading level should match the document outline. If the accordion sits under an `<h2>`, use `<h3>` for accordion headings. Incorrect heading levels break the document structure for screen reader users.

### Disabled state

Disabled accordions are **not recommended**. Disabled elements have no contrast requirements, cannot receive focus, and are invisible to screen readers. Remove the section entirely instead of disabling it.

---

## Error handling

When an accordion section contains a form with errors:

1. Show an error summary above the accordion
2. Expand the section containing the error automatically
3. Use `aria-describedby` to connect the error message to the accordion header
4. Consider adding a visual error indicator (icon or border) to the header

---

## References

- [Accordions Are Not Always the Answer for Complex Content on Desktop](https://www.nngroup.com/articles/accordions-complex-content/) — NNGroup (2020)
- [Where to Place Your Accordion Menu Icons](http://uxmovement.com/navigation/where-to-place-your-accordion-menu-icons/) — UX Movement (2014)
- [How we made the GOV.UK accordion component more accessible](https://insidegovuk.blog.gov.uk/2021/10/29/how-we-made-the-gov-uk-accordion-component-more-accessible/) — GOV.UK (2021)
- [GOV.UK Accordion Component](https://design-system.service.gov.uk/components/accordion/) — GOV.UK Design System
- [DKFDS Accordion](https://designsystem.dk/komponenter/accordions/) — Det Fælles Designsystem
- [Bootstrap Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) — Bootstrap 5.3
- [Tabs Used Right](https://www.nngroup.com/articles/tabs-used-right/) — NNGroup (2016)

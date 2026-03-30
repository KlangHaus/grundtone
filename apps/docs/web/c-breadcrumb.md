# Breadcrumb

Navigation breadcrumb trail with semantic markup and accessible structure.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.breadcrumb` | Container on `<ol>` — flex layout, gap, reset list styles |
| `.breadcrumb__item` | `<li>` — inline-flex alignment |
| `.breadcrumb__link` | `<a>` — primary color, underline on hover |
| `.breadcrumb__separator` | Separator span — tertiary color, `user-select: none` |
| `.breadcrumb__current` | Current page span — text color, medium weight |

### Preview

<CodePreview name="c-breadcrumb" />

---

## Usage

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="/blog" class="breadcrumb__link">Blog</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
      <a href="/blog/design" class="breadcrumb__link">Design</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
      <span class="breadcrumb__current" aria-current="page">Current Post</span>
    </li>
  </ol>
</nav>
```

---

## Accessibility

- Wrap in `<nav>` with `aria-label="Breadcrumb"`
- Use `<ol>` (ordered list) to convey hierarchy
- Mark the current page with `aria-current="page"`
- Add `aria-hidden="true"` to separators

---

## Responsive

On small screens, consider showing only the parent and current item to avoid overflow. The Vue component ([`GTBreadcrumb`](/vue/breadcrumb)) handles this automatically.

---

## Best practices

- Always place breadcrumbs near the top of the page, above the main heading
- Keep labels short — use the page title, not a description
- The current page should not be a link
- Don't use breadcrumbs as the only navigation — they supplement primary nav
- Don't use breadcrumbs for flat structures with only one level

---

## References

- [Nielsen Norman Group — Breadcrumbs: 11 Design Guidelines for Desktop and Mobile](https://www.nngroup.com/articles/breadcrumbs/)
- [Smashing Magazine — Breadcrumbs In Web Design: Examples And Best Practices](https://www.smashingmagazine.com/2009/03/breadcrumbs-in-web-design-examples-and-best-practices/)
- [GOV.UK Design System — Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/)
- [W3C WAI-ARIA Authoring Practices — Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

# External Link

External links open in a new tab and are marked with a ↗ icon,
so the user knows they are leaving the current page.

---

## Class

| Class            | Effect                                    |
| ---------------- | ----------------------------------------- |
| `.external-link` | Appends ↗ icon after the link text        |

### Preview

<CodePreview name="c-external-link" />

---

## Usage

```html
<a href="https://borger.dk" target="_blank" rel="noopener" class="external-link">
  Read more on borger.dk
</a>
```

### Link to file

If a link leads to a file, write the file type in parentheses:

```html
<a href="/guide.pdf" target="_blank" rel="noopener" class="external-link">
  Self-service guide (pdf)
</a>
```

---

## Guidelines

- External links should always open in a new tab (`target="_blank"`).
- Always add `rel="noopener"` for security.
- If the link leads to a file, write the file type in parentheses after the link text, if not already apparent.
- If the purpose is a download, use the `download` attribute instead.

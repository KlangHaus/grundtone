# Links

Links allow the user to navigate to other pages in the solution or to external resources.

---

## Accessibility

- Link text must be meaningful to the user and indicate where the link leads.
- Links must be underlined or otherwise visually marked. A link must not be indicated by color alone.
- Users must be able to focus on links and activate them using the keyboard.
- Links must have a defined `href` attribute in the code.
- If the link has a hover state, it must be activatable with both keyboard and mouse.

---

## Use for

- Use links to let the user navigate to other pages in your solution.
- Use links to link to pages outside your solution. Remember to mark this with an icon (see [External Link](#external-link)).

See also [Skip Link](/web/c-skip-link) and [Back Link](/web/c-back-link).

## Usability

- If a link leads away from the current page and the user may lose data or risk having to re-enter the same section, warn the user with a browser prompt. Ask the user to confirm or cancel leaving the page.
- Use links thoughtfully. Linking too much to external websites can be disruptive to the flow and take the user out of context. Conversely, it can provide great value if you link to relevant information that supports the user's journey through the solution.

---

## Usage

```html
<a href="/page">Internal navigation</a>
```

---

## External link

External links should always open in a new tab and be marked with an external link icon.

- Links to files (e.g. pdf) should always use the external link icon.
- If the purpose of the link is to download a file, it should be marked with a download icon.
- If a link leads to a file, make the user aware by writing the file type in parentheses, if not already apparent from the link text.

```html
<!-- External link -->
<a href="https://example.com" target="_blank" rel="noopener">
  External website ↗
</a>

<!-- Link to file -->
<a href="/document.pdf" target="_blank" rel="noopener">
  Document name (pdf) ↗
</a>

<!-- Download link -->
<a href="/archive.zip" download>
  Download archive (zip file) ↓
</a>
```

---

## Secondary links

Secondary links are used to create a visual distinction between links to functions and special types of navigation.

### Use for

- Function links
- [Breadcrumb](/web/c-breadcrumb)
- Footer links

### Do not use for

Do not use secondary links within or between paragraphs of text or for general navigation between pages — use a standard link instead.

### Guidelines

Do not be creative with the use of secondary links, as they are less prominent than standard links. Alternative usage can create doubt and confusion among users about what is clickable.

---

## Images as links

Links have `display: inline` styling by default. If you want to use an image as a link, you should choose a different display value (e.g. `d-inline-block` or `d-block`), otherwise no focus ring will appear around the image when the link is focused.

```html
<a href="/product" class="d-inline-block">
  <img src="product.jpg" alt="Product name" />
</a>
```

---

## References

- [Marieke McCloskey: Writing Hyperlinks: Salient, Descriptive, Start with Keyword (NN/g, 2014)](https://www.nngroup.com/articles/writing-links/)

# Form Text

Text classes for form labels, hints, and error messages.

---

## Help Text

Sometimes it is necessary to explain or exemplify a field label.
This is where you can use help text. You can also use help text to explain
why you are requesting particularly sensitive information — for example, if it
could be a barrier to getting a response from the user.

### Class

| Class        | Size            | Color              |
| ------------ | --------------- | ------------------ |
| `.help-text` | 0.875rem (14px) | `--color-text-secondary` |

### Preview

<CodePreview name="c-help-text" />

### Usage

Place `.help-text` directly below a label (before the input) or below
the input — whichever reads most naturally in context.

```html
<label>Social security number</label>
<p class="help-text">
  We need your social security number to verify your identity.
</p>
<input type="text" />
```

#### Below the input

<CodePreview name="c-help-text-field" />

```html
<label>Email</label>
<input type="email" />
<p class="help-text">We will send a confirmation to this address.</p>
```

### Guidelines

- Use help text to provide additional explanation — for example, to support field labels.
- Use help text to explain why you are requesting sensitive information, if it could be a barrier for the user.
- Keep help text short — one to two sentences.
- Do not use help text as a replacement for a clear label.

### SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.custom-hint {
  @include gt.form-hint;
}
```

---

## Error Text

It is important that users receive feedback on their actions. This is especially
true when something fails — error text is a critical element for forms.
Ensure that error messages are sharp and precisely communicate what the error
is and what the user should do to proceed.

### Class

| Class         | Size            | Color            | Weight   |
| ------------- | --------------- | ---------------- | -------- |
| `.error-text` | 0.875rem (14px) | `--color-error`  | semibold |

### Preview

<CodePreview name="c-error-text" />

### Usage

Place `.error-text` directly below the field where the error occurred.
Combine with a red border on the input to make the error visually clear.

```html
<label>Email</label>
<input type="email" style="border-color: var(--color-error)" />
<p class="error-text">
  Please enter a valid email address, e.g. name@example.com
</p>
```

#### Required field

<CodePreview name="c-error-text-required" />

### Guidelines

- Write clear and precise error text in language the user understands.
- Be polite ("Please enter your address") and do not be accusatory ("You forgot to enter your address"). Help the user resolve the error.
- Do not write technical or jargon-heavy error messages.
- Place the error text where the error occurs.
- Where possible, combine the error message and guidance into a single sentence.
- Error text is red by default. In forms, indicate error text with a red border. Outside of forms, indicate error text with an error icon.

### Further reading

- [Errors in forms design guidelines (NN/g)](https://www.nngroup.com/articles/errors-forms-design-guidelines/)

### SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.custom-error {
  @include gt.form-error;
}
```

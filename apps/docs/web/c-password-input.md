# Password Input

Input with show/hide toggle using eye icons. Prevents spellcheck and autocapitalize.

---

## When to use

Use whenever users need to create or enter a password. Do not use for other security info (MFA codes, security questions) — use text input or OTP input for those.

---

## Usage

```html
<div class="input-field">
  <label class="input-label" for="pw">Adgangskode</label>
  <div class="password-input">
    <input id="pw" class="input input--md" type="password"
      autocomplete="current-password" spellcheck="false" autocapitalize="off" />
    <button type="button" class="password-input__toggle" aria-label="Vis adgangskode">
      <!-- eye icon -->
    </button>
  </div>
</div>
```

---

## Do's and don'ts

<DosDonts>
  <DoItem>Hide password by default — user may not be in private space</DoItem>
  <DoItem>Allow copy and paste in password fields</DoItem>
  <DoItem>Use autocomplete="new-password" for registration, "current-password" for login</DoItem>
  <DoItem>Set spellcheck="false" and autocapitalize="off"</DoItem>
  <DontItem>Add a "confirm password" field — show/hide makes it unnecessary</DontItem>
  <DontItem>Use maxlength — show validation error instead</DontItem>
  <DontItem>Reveal whether username or password was wrong on login failure</DontItem>
  <DontItem>Restrict special characters in passwords</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.password-input` | Wrapper (position: relative) |
| `.password-input__toggle` | Show/hide button with eye icon |

Reuses `.input`, `.input-field`, `.input-label` from Input component.

---

## References

- [GOV.UK Password Input](https://design-system.service.gov.uk/components/password-input/)

# OTP Input

Sequence of single-digit fields for one-time verification codes (2FA, SMS, email).

---

## When to use

Use for entering one-time codes received via SMS, email, or authenticator app. Do not use for passwords or other multi-character input.

---

## Usage

```html
<div class="input-field">
  <label class="input-label">Bekræftelseskode</label>
  <div class="otp-input" role="group" aria-label="Bekræftelseskode">
    <input class="otp-input__field" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="1" autocomplete="one-time-code" />
    <input class="otp-input__field" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="1" />
    <input class="otp-input__field" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="1" />
    <input class="otp-input__field" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="1" />
    <input class="otp-input__field" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="1" />
    <input class="otp-input__field" type="text" inputmode="numeric"
      pattern="[0-9]*" maxlength="1" />
  </div>
</div>
```

---

## Classes

| Class | Description |
| --- | --- |
| `.otp-input` | Flex container with gap |
| `.otp-input__field` | Single digit field (3rem × 3rem, centered, mono font) |
| `.otp-input__field--filled` | Has a digit (subtle primary tint) |
| `.otp-input__field--error` | Error state |

---

## Accessibility

- `role="group"` with `aria-label` on container
- `inputmode="numeric"` for numeric keyboard
- `autocomplete="one-time-code"` for SMS autofill
- Auto-advance on digit entry, backspace returns to previous
- Paste distributes code across fields

---
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/utils': minor
'@grundtone/icons': minor
---

Add FileUpload, PasswordInput, OtpInput, Fieldset, and password/OTP validators

- **design-system**: Add `_file-upload.scss` (modern drop zone), `_password-input.scss` (show/hide
  toggle), `_otp-input.scss` (single-digit fields), `_fieldset.scss` (form grouping). Web docs for
  all four with CodePreview.
- **vue**: Add `GTFileUpload` (drag-and-drop, file validation, 12 tests), `GTPasswordInput`
  (eye/eye-off icon toggle, spellcheck=false, 12 tests), `GTOtpInput` (auto-advance, paste, filled
  state, 12 tests)
- **utils**: Add `isStrongPassword`, `getPasswordStrength`, `isValidOtp` validation functions +
  `password()`, `passwordStrength()`, `otp()` validator factories
- **icons**: Add eye, eye-off, upload, file SVG icons (17 total)

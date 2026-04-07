# CLAUDE.md Reference

Copy-paste this section into your project's `CLAUDE.md` file to give AI assistants (Claude Code, Cursor, etc.) full knowledge of Grundtone's components, utility classes, and design tokens.

---

## Usage

Create a `CLAUDE.md` file in your project root and paste the reference below. Adjust the "Stack" and "Styling Rules" sections to match your project.

````markdown
## Grundtone Design System Reference

### Components (auto-imported with GT prefix)

#### Atoms
- `GTAutocomplete` — modelValue, suggestions, size, placeholder, label, helpText, errorText, required, disabled, loading, minChars
- `GTBackLink` — href, label
- `GTBackToTop` — label, threshold, smooth
- `GTBadge` — variant(info/success/warning/error/neutral), size(sm/md), icon, dot. Slots: default
- `GTButton` — variant(primary/secondary/outlined/negative/unstyled), size(sm/md/lg), rounded(none/sm/md/lg/full), as, disabled, loading, block. Slots: default
- `GTCheckbox` — modelValue, label, helpText, disabled
- `GTDateInput` — modelValue, size(sm/md/lg), label, helpText, errorText, required, disabled
- `GTDetails` — summary, variant(default/subtle/card), open. Slots: default
- `GTFileUpload` — label, helpText, errorText, accept, maxSize, multiple, disabled, required
- `GTIcon` — icon, name, size(xs/sm/md/lg/xl/2xl), label, color
- `GTInput` — modelValue, type, size(sm/md/lg), rounded, placeholder, label, helpText, errorText, disabled, readonly, required, block, width, charWidth, prefix, suffix
- `GTOtpInput` — modelValue, length, label, helpText, errorText, disabled
- `GTPasswordInput` — modelValue, label, helpText, errorText, size(sm/md/lg), required, disabled
- `GTSelect` — modelValue, options, size(sm/md/lg), placeholder, label, helpText, errorText, disabled, required
- `GTSkipLink` — href(default: '#main'). Slots: default
- `GTSlider` — modelValue, min, max, step, range, orientation(horizontal/vertical), disabled, label, showValue
- `GTSpinner` — size(sm/lg), variant(light/dark), text, backdrop
- `GTTag` — label, value, icon, dismissible, selected, size(sm/md), disabled
- `GTTextarea` — modelValue, label, helpText, errorText, placeholder, required, disabled, readonly, rows, maxChars, block
- `GTToggle` — modelValue, label, size, disabled
- `GTTooltip` — content, position(top/bottom), trigger(click/hover), delay. Slots: trigger

#### Molecules
- `GTAccordion` + `GTAccordionItem` — variant(default/bordered/card), transition(none/slide/fade), showToggleAll. Item: heading, summary, open. Slots: default
- `GTAddressInput` — modelValue, type(adresse/vejnavn/postnummer), size, label, helpText, errorText, required, disabled
- `GTAlert` — variant(info/success/warning/error), heading, icon, dismissible. Slots: default, footer
- `GTAnchorLinks` — items, heading, activeHighlight
- `GTBreadcrumb` — items, separator
- `GTCard` — variant(raised/bordered/flat), nav, href, external, horizontal, subheading, title, image, imageAlt, imageAspect. Slots: media, default, footer
- `GTCarousel` + `GTCarouselSlide` — modelValue, autoplay, interval, loop, fade, showControls, showIndicators, pauseOnHover
- `GTChartContainer` + `GTChartLegend` — config. Slots: default
- `GTCheckboxGroup` — modelValue, options, name, label, helpText, errorText, required, disabled
- `GTCookieMessage` — heading, icon, acceptLabel, rejectLabel, settingsLabel, persistent. Slots: default, actions, settings
- `GTDatePicker` — modelValue(ISO), label, helpText, errorText, placeholder, format, min, max, disabled, required
- `GTErrorPage` — code, title, description, showHomeLink, homeHref, homeLabel, debug. Slots: illustration
- `GTMasonry` — items, gap(default 24), columnWidth(default 300), ssrColumns(default 3). Slots: default(scoped: item, index)
- `GTModal` — open(v-model), title, persistent, transition(fade/scale/slide-up/slide-down/slide-right/none). Slots: default, footer
- `GTOverflowMenu` — items, label, align(left/right)
- `GTRadioGroup` — modelValue, options, name, label, helpText, errorText, required, disabled
- `GTSearchField` — modelValue, placeholder, label, buttonLabel, size(md/lg), disabled, suggestions, loading
- `GTStepper` — steps, activeStep, allClickable, simple, simpleLabel
- `GTSummaryList` + `GTSummaryItem` — variant(default/borderless/card), title. Item: label, action, actionLabel. Slots: default, actions
- `GTTable` — columns, rows, variant(default/borderless/zebra), density(normal/compact/extra-compact), responsive, selectable, modelValue, caption, sortBy, sortDirection. Slots: cell-{key}
- `GTTabs` + `GTTabPanel` — tabs, modelValue, variant(underline/segment/pill). Panel: id. Slots: default
- `GTToast` + `GTToastContainer` — variant(default/success/warning/error/info), message, description, icon, duration, dismissible. Container: position, visibleToasts

### Composables (auto-imported)
- `useTheme()` — isDark, mode, setMode, toggleMode
- `useField()` — reactive field validation
- `useDateField()` — date field validation
- `useFormValidation()` — aggregate form validation
- `useToast()` — toast notifications

### Utility Classes

**Display:** `.block`, `.inline-block`, `.inline`, `.flex`, `.inline-flex`, `.grid`, `.inline-grid`, `.contents`, `.hidden`
**Flex:** `.flex-row`, `.flex-col`, `.flex-row-reverse`, `.flex-col-reverse`, `.flex-wrap`, `.flex-nowrap`, `.flex-1`, `.flex-auto`, `.flex-initial`, `.flex-none`, `.grow`, `.grow-0`, `.shrink`, `.shrink-0`
**Alignment:** `.justify-{start/end/center/between/around/evenly}`, `.items-{start/end/center/baseline/stretch}`, `.self-{auto/start/end/center/stretch}`, `.content-{start/end/center/between/around/evenly/stretch}`
**Grid:** `.grid-cols-{1-12}`, `.col-span-{1-12}`, `.col-span-full`, `.row-span-{1-6}`, `.gap-{size}`, `.gap-x-{size}`, `.gap-y-{size}`, `.grid-sidebar-left`, `.grid-sidebar-right`, `.grid-auto-fit`, `.grid-auto-fill`, `.grid-cards`, `.grid-cards-sm`, `.grid-cards-lg`
**Spacing:** `.m-{size}`, `.mx-{size}`, `.my-{size}`, `.mt-{size}`, `.mb-{size}`, `.ms-{size}`, `.me-{size}`, `.p-{size}`, `.px-{size}`, `.py-{size}`, `.pt-{size}`, `.pb-{size}`, `.ps-{size}`, `.pe-{size}`, `.m{dir}-auto` — Sizes: `0`, `px`, `0-5`, `1`, `1-5`, `2`, `2-5`, `3`, `3-5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`
**Typography:** `.text-{xs/sm/base/lg/xl/2xl/3xl/4xl/5xl}`, `.font-{thin/light/normal/medium/semibold/bold/extrabold}`, `.leading-{none/tight/snug/normal/relaxed/loose}`, `.font-{base/heading/mono}`
**Text align:** `.text-{left/right/center/justify}`
**Text color:** `.text-{default/secondary/tertiary/inverse/placeholder/disabled/primary/on-primary/success/warning/error/info/inherit}`
**Background:** `.bg-{background/background-alt/surface/surface-alt/surface-raised/overlay/backdrop/primary/primary-light/primary-dark/secondary/success/warning/error/info/transparent}` + light variants
**Text decoration:** `.underline`, `.overline`, `.line-through`, `.no-underline`
**Text transform:** `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`
**Letter spacing:** `.tracking-{tighter/tight/normal/wide/wider/widest}`
**Width:** `.w-{auto/full/screen/min/max/fit}`, `.w-{10/20/25/30/33/40/50/60/66/70/75/80/90}`
**Height:** `.h-{auto/full/screen/min/max/fit/0/4/6/8/10/12/14/16/20/24/32/40/48/56/64/72/80/96}`
**Min/Max width:** `.min-w-{0/full/min/max/fit}`, `.max-w-{none/xs/sm/md/lg/xl/2xl/3xl/4xl/full/prose}`
**Position:** `.static`, `.relative`, `.absolute`, `.fixed`, `.sticky`, `.inset-0`, `.top-0`, `.bottom-0`, `.start-0`, `.end-0`, `.fixed-top`, `.fixed-bottom`, `.sticky-top`
**Z-index:** `.z-{auto/0/10/20/30/40/50}`, `.z-{dropdown/sticky/fixed/modal-backdrop/modal/popover/tooltip/toast}`
**Border:** `.border`, `.border-0`, `.border-{t/b/s/e}`, `.border-{light/medium/strong/inverse}`
**Border radius:** `.rounded-{none/xs/sm/md/lg/xl/2xl/3xl/full}`
**Shadow:** `.shadow-{xs/sm/md/lg/xl/2xl/inner}`, `.shadow-none`
**Opacity:** `.opacity-{0/5/10/15/20/25/50/75/85/90/100}`
**Overflow:** `.overflow-{auto/hidden/visible/scroll}`, `.overflow-{x/y}-auto`
**Transitions:** `.transition-{colors/shadow/transform/opacity/all/none}`
**Aspect ratio:** `.aspect-{square/video/cinema/photo/portrait/golden/wide/ultra-wide}`
**Order:** `.order-{first/last/none/1-12}`
**Container:** `.container`, `.container-fluid`, `.container-{sm/md/lg/xl/2xl}`, `.container-{narrow/tight/wide/ultrawide/prose}`, `.breakout`
**Visibility:** `.visible`, `.invisible`

**Responsive prefixes:** All utilities support `.sm:`, `.md:`, `.lg:`, `.xl:`, `.2xl:` breakpoint prefixes.

### CSS Custom Properties (from theme)
**Colors:** `--color-{primary/primary-light/primary-dark/on-primary/secondary/text/text-secondary/text-tertiary/text-inverse/background/background-alt/surface/surface-alt/surface-raised/border-light/border-medium/border-strong/success/warning/error/info/focus/focus-ring/neutral}`
**Typography:** `--font-family-{base/heading/mono}`, `--font-size-{xs/sm/base/lg/xl/2xl/3xl/4xl/5xl}`, `--font-weight-{thin/light/normal/medium/semibold/bold/extrabold}`, `--line-height-{none/tight/snug/normal/relaxed/loose}`
**Spacing:** `--space-{xs/sm/md/lg/xl/2xl/3xl/4xl}`
**Radius:** `--radius-{none/xs/sm/md/lg/xl/2xl/3xl/full}`
**Shadow:** `--shadow-{xs/sm/md/lg/xl/2xl/inner/none}`
**Transitions:** `--duration-{fast/base/slow}`, `--ease`, `--ease-in`, `--ease-out`, `--ease-in-out`
**Z-index:** `--z-{dropdown/sticky/fixed/modal-backdrop/modal/popover/tooltip/toast}`
````

---

## Why this matters

AI coding assistants (Claude Code, Cursor, GitHub Copilot) read `CLAUDE.md` files to understand your project's conventions. Without this reference, the assistant will guess at component names and prop signatures — often incorrectly.

With this file, the assistant knows:
- Every available component and its exact props
- All utility classes and their responsive variants
- All CSS custom properties from your theme
- Your project's styling rules (tokens only, no inline styles)

export const spacingExamples: Record<string, string> = {
  // ── Margin all sides ──────────────────────────────────────────────────
  'sp-margin': `<div style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 2px;">
  <div class="m-4" style="background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.75rem; text-align: center;">
    .m-4 &mdash; 1rem margin on all sides
  </div>
</div>`,

  // ── Directional margin ────────────────────────────────────────────────
  'sp-margin-dir': `<div style="display: flex; flex-direction: column; gap: 0.25rem;">
  <div style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 2px;">
    <div class="ms-8" style="background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.5rem 0.75rem;">
      .ms-8 &mdash; margin-inline-start: 2rem (left in LTR)
    </div>
  </div>
  <div style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 2px;">
    <div class="me-8" style="background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.5rem 0.75rem; text-align: right;">
      .me-8 &mdash; margin-inline-end: 2rem (right in LTR)
    </div>
  </div>
  <div style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 2px;">
    <div class="mt-6" style="background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.5rem 0.75rem;">
      .mt-6 &mdash; margin-top: 1.5rem
    </div>
  </div>
</div>`,

  // ── Auto margins (centering) ──────────────────────────────────────────
  'sp-mx-auto': `<div style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="mx-auto" style="max-width: 280px; background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.75rem; text-align: center;">
    .mx-auto &mdash; centered with auto inline margins
  </div>
</div>`,

  // ── Auto margin push ──────────────────────────────────────────────────
  'sp-mt-auto': `<div class="flex flex-col" style="min-height: 160px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.5rem 0.75rem;">
    Header
  </div>
  <div class="mt-auto" style="background: var(--vp-c-brand-soft); border-radius: 4px; padding: 0.5rem 0.75rem;">
    Footer &mdash; .mt-auto pushes to bottom
  </div>
</div>`,

  // ── Padding ───────────────────────────────────────────────────────────
  'sp-padding': `<div style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="p-8" style="background: var(--vp-c-brand-soft); border-radius: 6px;">
    <div style="background: var(--vp-c-bg); border-radius: 4px; padding: 0.5rem 0.75rem; text-align: center;">
      .p-8 &mdash; 2rem padding on all sides
    </div>
  </div>
</div>`,

  // ── Axis padding ──────────────────────────────────────────────────────
  'sp-padding-axis': `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <div class="px-12" style="background: var(--vp-c-brand-soft); border-radius: 6px;">
    <div style="background: var(--vp-c-bg); border-radius: 4px; padding: 0.5rem 0.75rem; text-align: center;">
      .px-12 &mdash; padding-inline: 3rem
    </div>
  </div>
  <div class="py-6" style="background: var(--vp-c-brand-soft); border-radius: 6px;">
    <div style="background: var(--vp-c-bg); border-radius: 4px; padding: 0.5rem 0.75rem; text-align: center;">
      .py-6 &mdash; padding-block: 1.5rem
    </div>
  </div>
</div>`,

  // ── Responsive spacing ────────────────────────────────────────────────
  'sp-responsive': `<div class="p-2 md:p-6 lg:p-10" style="background: var(--vp-c-brand-soft); border-radius: 6px;">
  <div style="background: var(--vp-c-bg); border-radius: 4px; padding: 0.75rem; text-align: center;">
    .p-2 md:p-6 lg:p-10 &mdash; padding grows with viewport
  </div>
</div>`,

  // ── Spacing composition ───────────────────────────────────────────────
  'sp-composition': `<div class="flex flex-col gap-2" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="px-4 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .px-4 .py-2 &mdash; different horizontal and vertical padding
  </div>
  <div class="ps-8 pe-2 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .ps-8 .pe-2 &mdash; more start padding, less end padding
  </div>
  <div class="ms-auto me-4 px-4 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .ms-auto .me-4 &mdash; pushed right with end margin
  </div>
</div>`,

  // ── Visibility ────────────────────────────────────────────────────────
  'sp-visibility': `<div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Visible</div>
  <div class="invisible" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Invisible (space kept)</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Visible</div>
</div>`,

  'sp-hidden-vs-invisible': `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
    <div class="invisible" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B (.invisible)</div>
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C &mdash; gap preserved</div>
  </div>
  <div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
    <div class="hidden" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B (.hidden)</div>
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C &mdash; B removed from layout</div>
  </div>
</div>`,
};

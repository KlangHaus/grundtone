export const zIndexExamples: Record<string, string> = {
  // ── Utility scale ───────────────────────────────────────────────────
  'zi-scale': `<div class="relative p-3" style="height: 120px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="absolute z-0 px-2 py-1" style="top: 12px; left: 12px; width: 100px; height: 60px; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand-1); border-radius: 4px; font-size: 0.75rem;">.z-0</div>
  <div class="absolute z-10 px-2 py-1" style="top: 24px; left: 40px; width: 100px; height: 60px; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand-1); border-radius: 4px; font-size: 0.75rem;">.z-10</div>
  <div class="absolute z-20 px-2 py-1" style="top: 36px; left: 68px; width: 100px; height: 60px; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand-1); border-radius: 4px; font-size: 0.75rem;">.z-20</div>
  <div class="absolute z-30 px-2 py-1" style="top: 48px; left: 96px; width: 100px; height: 60px; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand-1); border-radius: 4px; font-size: 0.75rem;">.z-30</div>
</div>`,

  // ── Reorder with z-index ────────────────────────────────────────────
  'zi-reorder': `<div class="relative p-3" style="height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="absolute z-30 px-2 py-1" style="top: 16px; left: 12px; width: 120px; height: 60px; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand-1); border-radius: 4px; font-size: 0.75rem;">First in DOM, .z-30</div>
  <div class="absolute z-20 px-2 py-1" style="top: 24px; left: 50px; width: 120px; height: 60px; background: var(--vp-c-default-soft); border: 2px solid var(--vp-c-default-1); border-radius: 4px; font-size: 0.75rem;">Second, .z-20</div>
  <div class="absolute z-10 px-2 py-1" style="top: 32px; left: 88px; width: 120px; height: 60px; background: var(--vp-c-success-soft); border: 2px solid var(--vp-c-success-1); border-radius: 4px; font-size: 0.75rem;">Third, .z-10</div>
</div>`,

  // ── Semantic layers ─────────────────────────────────────────────────
  'zi-semantic': `<div class="relative p-3" style="height: 140px; background: var(--vp-c-bg-alt); border-radius: 6px; overflow: hidden;">
  <div class="z-dropdown absolute p-1" style="top: 60px; left: 12px; width: 140px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 4px; font-size: 0.75rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <div class="px-2 py-1">.z-dropdown</div>
    <div class="px-2 py-1" style="opacity: 0.6;">Menu item</div>
    <div class="px-2 py-1" style="opacity: 0.6;">Menu item</div>
  </div>
  <div class="z-sticky absolute px-3 py-2" style="top: 0; left: 0; right: 0; background: var(--vp-c-brand-soft); font-size: 0.75rem; border-bottom: 1px solid var(--vp-c-divider);">.z-sticky &mdash; sticky header stays above dropdown</div>
  <div class="z-tooltip absolute px-2 py-1" style="top: 48px; left: 170px; background: var(--vp-c-neutral); color: var(--vp-c-bg); border-radius: 4px; font-size: 0.75rem;">.z-tooltip</div>
</div>`,

  // ── Position utilities ──────────────────────────────────────────────
  'zi-position': `<div class="relative p-3" style="height: 120px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="absolute top-0 end-0 px-2 py-1" style="background: var(--vp-c-brand-soft); border-radius: 0 6px 0 4px; font-size: 0.75rem;">.absolute .top-0 .end-0</div>
  <div class="absolute bottom-0 start-0 px-2 py-1" style="background: var(--vp-c-brand-soft); border-radius: 0 4px 0 6px; font-size: 0.75rem;">.absolute .bottom-0 .start-0</div>
  <div class="align-text-center pt-10" style="font-size: 0.875rem; opacity: 0.7;">parent is .relative</div>
</div>`,

  // ── Inset utilities ─────────────────────────────────────────────────
  'zi-inset': `<div class="relative" style="height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="absolute inset-0 flex items-center justify-center" style="background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 0.875rem;">
    .absolute .inset-0 &mdash; fills entire parent
  </div>
</div>`,

  // ── Overlay pattern ─────────────────────────────────────────────────
  'zi-overlay': `<div class="relative p-4" style="height: 120px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div style="font-size: 0.875rem;">Background content</div>
  <div class="mt-1" style="font-size: 0.75rem; opacity: 0.6;">This text is behind the overlay</div>
  <div class="absolute inset-0 z-modal-backdrop flex items-center justify-center" style="background: rgba(0,0,0,0.4); border-radius: 6px;">
    <div class="z-modal p-4 align-text-center" style="background: var(--vp-c-bg); border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); font-size: 0.875rem;">
      .z-modal on top of .z-modal-backdrop
    </div>
  </div>
</div>`,

  // ── Sticky header ───────────────────────────────────────────────────
  'zi-sticky-header': `<div style="height: 120px; overflow-y: auto; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="sticky top-0 z-sticky px-3 py-2" style="background: var(--vp-c-brand-soft); font-size: 0.75rem; border-bottom: 1px solid var(--vp-c-divider);">.sticky .top-0 .z-sticky &mdash; scroll down &darr;</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 1</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 2</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 3</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 4</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 5</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 6</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 7</div>
  <div class="px-3 py-2" style="font-size: 0.75rem;">Item 8</div>
</div>`,

  // ── Responsive z-index ──────────────────────────────────────────────
  'zi-responsive': `<div class="relative p-3" style="height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="absolute z-10 md:z-30 px-2 py-1" style="top: 12px; left: 12px; width: 140px; height: 60px; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand-1); border-radius: 4px; font-size: 0.75rem;">.z-10 .md:z-30</div>
  <div class="absolute z-20 px-2 py-1" style="top: 24px; left: 60px; width: 140px; height: 60px; background: var(--vp-c-default-soft); border: 2px solid var(--vp-c-default-1); border-radius: 4px; font-size: 0.75rem;">.z-20 (stays at 20)</div>
</div>`,
};

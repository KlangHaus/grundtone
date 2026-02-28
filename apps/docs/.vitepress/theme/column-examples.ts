export const columnExamples: Record<string, string> = {
  // ── Vertical alignment (align-items) ──────────────────────────────────
  'align-items': `<div class="flex gap-4 items-start" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">items-start</div>
  <div style="padding: 1.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">tall</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">short</div>
</div>`,

  'align-center': `<div class="flex gap-4 items-center" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">items-center</div>
  <div style="padding: 1.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">tall</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">short</div>
</div>`,

  'align-end': `<div class="flex gap-4 items-end" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">items-end</div>
  <div style="padding: 1.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">tall</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">short</div>
</div>`,

  'align-stretch': `<div class="flex gap-4 items-stretch" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">items-stretch</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">stretches</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">to fill</div>
</div>`,

  // ── Horizontal alignment (justify-content) ────────────────────────────
  'justify-between': `<div class="flex justify-between" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  'justify-center': `<div class="flex justify-center gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  'justify-evenly': `<div class="flex justify-evenly" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  // ── Individual item alignment (align-self) ────────────────────────────
  'align-self': `<div class="flex gap-4 items-start" style="min-height: 120px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="self-start" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">self-start</div>
  <div class="self-center" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">self-center</div>
  <div class="self-end" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">self-end</div>
  <div class="self-stretch" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">self-stretch</div>
</div>`,

  // ── Grid alignment (place-items, justify-items) ───────────────────────
  'grid-align': `<div class="grid grid-cols-3 gap-4 items-center" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">centered</div>
  <div class="self-start" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">self-start</div>
  <div class="self-end" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">self-end</div>
</div>`,

  'place-items-center': `<div class="grid grid-cols-3 gap-4 place-items-center" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  // ── Display utilities ─────────────────────────────────────────────────
  'display-flex': `<div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Flex item 1</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Flex item 2</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Flex item 3</div>
</div>`,

  'display-responsive': `<div style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="hidden md:block" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center; margin-bottom: 0.5rem;">
    Visible from md (768px) and up &mdash; <code>hidden md:block</code>
  </div>
  <div class="block md:hidden" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    Visible only below md &mdash; <code>block md:hidden</code>
  </div>
</div>`,

  // ── Flex direction ────────────────────────────────────────────────────
  'flex-direction': `<div class="flex flex-col gap-2" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">flex-col: A</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">flex-col: B</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">flex-col: C</div>
</div>`,

  'flex-responsive': `<div class="flex flex-col md:flex-row gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1; text-align: center;">Stacked on mobile</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1; text-align: center;">Row from md up</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1; text-align: center;">flex-col md:flex-row</div>
</div>`,

  // ── Flex wrap ──────────────────────────────────────────────────────────
  'flex-wrap': `<div class="flex flex-wrap gap-2" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem; max-width: 300px;">
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">One</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Two</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Three</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Four</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Five</div>
</div>`,

  // ── Order ─────────────────────────────────────────────────────────────
  'order-basic': `<div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="order-3" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A (order-3)</div>
  <div class="order-1" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B (order-1)</div>
  <div class="order-2" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C (order-2)</div>
</div>`,

  'order-first-last': `<div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="order-last" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">A (order-last)</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">B (no order)</div>
  <div class="order-first" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">C (order-first)</div>
</div>`,

  'order-responsive': `<div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="order-last md:order-first" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">Sidebar (last on mobile, first from md)</div>
  <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1;">Main content</div>
</div>`,

  // ── Offset replacement: col-start/col-end ─────────────────────────────
  'offset-basic': `<div class="grid grid-cols-12 gap-4">
  <div class="col-start-4 col-span-6" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    col-start-4 col-span-6 (offset of 3)
  </div>
</div>`,

  'offset-responsive': `<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    Full on mobile, offset-2 from md, offset-3 from lg
  </div>
</div>`,

  'offset-center': `<div class="grid grid-cols-12 gap-4">
  <div class="col-start-4 col-end-10" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    col-start-4 col-end-10 &mdash; centered in the grid
  </div>
</div>`,

  // ── Grow & shrink ─────────────────────────────────────────────────────
  'flex-grow': `<div class="flex gap-4" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <div class="grow" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">grow (fills space)</div>
  <div class="grow-0" style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px;">grow-0 (fixed)</div>
</div>`,

  // ── Combined layout ───────────────────────────────────────────────────
  combined: `<div class="flex flex-col md:flex-row gap-4 items-stretch" style="background: var(--vp-c-bg-alt); border-radius: 6px; padding: 0.75rem;">
  <aside class="shrink-0 order-last md:order-first" style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; min-width: 120px; text-align: center;">
    Sidebar (shrink-0, reordered)
  </aside>
  <main class="grow" style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    Main content (grow)
  </main>
</div>`,
};

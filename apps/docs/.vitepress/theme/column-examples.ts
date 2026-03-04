export const columnExamples: Record<string, string> = {
  // ── Vertical alignment (align-items) ──────────────────────────────────
  'align-items': `<div class="flex gap-4 items-start p-3" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">items-start</div>
  <div class="px-3 py-6" style="background: var(--vp-c-brand-soft); border-radius: 4px;">tall</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">short</div>
</div>`,

  'align-center': `<div class="flex gap-4 items-center p-3" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">items-center</div>
  <div class="px-3 py-6" style="background: var(--vp-c-brand-soft); border-radius: 4px;">tall</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">short</div>
</div>`,

  'align-end': `<div class="flex gap-4 items-end p-3" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">items-end</div>
  <div class="px-3 py-6" style="background: var(--vp-c-brand-soft); border-radius: 4px;">tall</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">short</div>
</div>`,

  'align-stretch': `<div class="flex gap-4 items-stretch p-3" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">items-stretch</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">stretches</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">to fill</div>
</div>`,

  // ── Horizontal alignment (justify-content) ────────────────────────────
  'justify-between': `<div class="flex justify-between p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  'justify-center': `<div class="flex justify-center gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  'justify-evenly': `<div class="flex justify-evenly p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  // ── Individual item alignment (align-self) ────────────────────────────
  'align-self': `<div class="flex gap-4 items-start p-3" style="min-height: 120px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="self-start px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">self-start</div>
  <div class="self-center px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">self-center</div>
  <div class="self-end px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">self-end</div>
  <div class="self-stretch px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">self-stretch</div>
</div>`,

  // ── Grid alignment (place-items, justify-items) ───────────────────────
  'grid-align': `<div class="grid grid-cols-3 gap-4 items-center p-3" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">centered</div>
  <div class="self-start px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">self-start</div>
  <div class="self-end px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">self-end</div>
</div>`,

  'place-items-center': `<div class="grid grid-cols-3 gap-4 place-items-center p-3" style="min-height: 100px; background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">A</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">B</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">C</div>
</div>`,

  // ── Display utilities ─────────────────────────────────────────────────
  'display-flex': `<div class="flex gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Flex item 1</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Flex item 2</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Flex item 3</div>
</div>`,

  'display-responsive': `<div class="p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="hidden md:block px-3 py-2 align-text-center mb-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    Visible from md (768px) and up &mdash; <code>hidden md:block</code>
  </div>
  <div class="block md:hidden px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    Visible only below md &mdash; <code>block md:hidden</code>
  </div>
</div>`,

  // ── Flex direction ────────────────────────────────────────────────────
  'flex-direction': `<div class="flex flex-col gap-2 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">flex-col: A</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">flex-col: B</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">flex-col: C</div>
</div>`,

  'flex-responsive': `<div class="flex flex-col md:flex-row gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1;">Stacked on mobile</div>
  <div class="px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1;">Row from md up</div>
  <div class="px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1;">flex-col md:flex-row</div>
</div>`,

  // ── Flex wrap ──────────────────────────────────────────────────────────
  'flex-wrap': `<div class="flex flex-wrap gap-2 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px; max-width: 300px;">
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">One</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Two</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Three</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Four</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Five</div>
</div>`,

  // ── Order ─────────────────────────────────────────────────────────────
  'order-basic': `<div class="flex gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="order-3 px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">A (order-3)</div>
  <div class="order-1 px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">B (order-1)</div>
  <div class="order-2 px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">C (order-2)</div>
</div>`,

  'order-first-last': `<div class="flex gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="order-last px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">A (order-last)</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">B (no order)</div>
  <div class="order-first px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">C (order-first)</div>
</div>`,

  'order-responsive': `<div class="flex gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="order-last md:order-first px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Sidebar (last on mobile, first from md)</div>
  <div class="px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px; flex: 1;">Main content</div>
</div>`,

  // ── Offset replacement: col-start/col-end ─────────────────────────────
  'offset-basic': `<div class="grid grid-cols-12 gap-4">
  <div class="col-start-4 col-span-6 px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    col-start-4 col-span-6 (offset of 3)
  </div>
</div>`,

  'offset-responsive': `<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    Full on mobile, offset-2 from md, offset-3 from lg
  </div>
</div>`,

  'offset-center': `<div class="grid grid-cols-12 gap-4">
  <div class="col-start-4 col-end-10 px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    col-start-4 col-end-10 &mdash; centered in the grid
  </div>
</div>`,

  // ── Grow & shrink ─────────────────────────────────────────────────────
  'flex-grow': `<div class="flex gap-4 p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <div class="grow px-3 py-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">grow (fills space)</div>
  <div class="grow-0 px-3 py-2" style="background: var(--vp-c-brand-soft); border-radius: 4px;">grow-0 (fixed)</div>
</div>`,

  // ── Combined layout ───────────────────────────────────────────────────
  combined: `<div class="flex flex-col md:flex-row gap-4 items-stretch p-3" style="background: var(--vp-c-bg-alt); border-radius: 6px;">
  <aside class="shrink-0 order-last md:order-first p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; min-width: 120px;">
    Sidebar (shrink-0, reordered)
  </aside>
  <main class="grow p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    Main content (grow)
  </main>
</div>`,
};

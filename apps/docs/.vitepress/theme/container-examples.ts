export const containerExamples: Record<string, string> = {
  'ct-basic': `<div class="container" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .container &mdash; centered, fluid gutters, max-width steps up at each breakpoint
  </div>
</div>`,

  'ct-fluid': `<div class="container-fluid" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .container-fluid &mdash; always 100% width, no max-width cap
  </div>
</div>`,

  'ct-responsive': `<!-- 100% until lg (1024px), then steps up -->
<div class="container-lg" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .container-lg &mdash; fluid until 1024px, then constrained
  </div>
</div>`,

  'ct-narrow': `<div class="container-narrow" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .container-narrow &mdash; max 768px
  </div>
</div>`,

  'ct-tight': `<div class="container-tight" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .container-tight &mdash; max 640px
  </div>
</div>`,

  'ct-wide': `<div class="container-wide" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    .container-wide &mdash; max 1400px
  </div>
</div>`,

  'ct-prose': `<div class="container-prose" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4">
    <p class="m-0">
      The .container-prose class constrains content to 65ch &mdash; the typographic
      standard for optimal line length. This keeps paragraphs comfortable to read
      regardless of viewport width. No fixed pixel value; it adapts to the font.
    </p>
  </div>
</div>`,

  'ct-custom-prop': `<!-- Override --container-max inline -->
<div class="container" style="--container-max: 480px; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    --container-max: 480px (runtime override)
  </div>
</div>`,

  'ct-custom-gutter': `<!-- Override --container-gutter inline -->
<div class="container" style="--container-gutter: 3rem; --container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">
    --container-gutter: 3rem (large gutters)
  </div>
</div>`,

  'ct-breakout': `<div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="py-4">
    <p class="px-4 m-0 mb-3">Normal content inside .container</p>
    <div class="breakout p-6 align-text-center" style="background: var(--vp-c-brand-soft);">
      .breakout &mdash; full viewport width, breaks out of container
    </div>
    <p class="px-4 mt-3 mb-0">Back to normal container width</p>
  </div>
</div>`,

  'ct-cq': `<!-- Container is automatically a CQ context -->
<div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="p-4 align-text-center">
    <p class="m-0 mb-2">Every .container has <code>container-type: inline-size</code> built in.</p>
    <p class="m-0">Use <code>cq-sm:</code>, <code>cq-md:</code>, <code>cq-lg:</code> utilities on children &mdash; no extra class needed.</p>
  </div>
</div>`,

  'ct-grid-inside': `<div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="grid grid-cols-3 gap-4 py-2">
    <div class="py-2 px-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">1</div>
    <div class="py-2 px-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">2</div>
    <div class="py-2 px-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">3</div>
  </div>
</div>`,

  'ct-cq-vs-viewport': `<!-- Two containers side by side: same children, different container widths -->
<div class="grid gap-4 items-start" style="grid-template-columns: 280px 1fr;">
  <div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <p class="mt-0 mb-2" style="font-size: 0.75rem; font-weight: 600; opacity: 0.6;">Narrow container (280px)</p>
    <div class="grid cq-md:grid-cols-2 gap-2">
      <div class="p-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; font-size: 0.8125rem;">A</div>
      <div class="p-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; font-size: 0.8125rem;">B</div>
    </div>
  </div>
  <div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <p class="mt-0 mb-2" style="font-size: 0.75rem; font-weight: 600; opacity: 0.6;">Wide container (remaining space)</p>
    <div class="grid cq-md:grid-cols-2 gap-2">
      <div class="p-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; font-size: 0.8125rem;">A</div>
      <div class="p-2 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px; font-size: 0.8125rem;">B</div>
    </div>
  </div>
</div>`,

  'ct-cq-grid': `<!-- Cards that reflow based on container width -->
<div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="grid cq-sm:grid-cols-2 cq-lg:grid-cols-4 gap-3">
    <div class="p-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Card 1</div>
    <div class="p-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Card 2</div>
    <div class="p-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Card 3</div>
    <div class="p-3 align-text-center" style="background: var(--vp-c-brand-soft); border-radius: 4px;">Card 4</div>
  </div>
</div>`,

  'ct-cq-display': `<!-- Show/hide elements based on container width -->
<div class="grid gap-4 items-start" style="grid-template-columns: 250px 1fr;">
  <div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <p class="mt-0 mb-2" style="font-size: 0.75rem; font-weight: 600; opacity: 0.6;">Narrow</p>
    <div class="flex items-center gap-2">
      <span style="font-size: 1.25rem;">&#9776;</span>
      <span class="hidden cq-md:block" style="font-size: 0.8125rem;">Menu label (hidden &lt; md)</span>
    </div>
  </div>
  <div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <p class="mt-0 mb-2" style="font-size: 0.75rem; font-weight: 600; opacity: 0.6;">Wide</p>
    <div class="flex items-center gap-2">
      <span style="font-size: 1.25rem;">&#9776;</span>
      <span class="hidden cq-md:block" style="font-size: 0.8125rem;">Menu label (hidden &lt; md)</span>
    </div>
  </div>
</div>`,

  'ct-cq-flex': `<!-- Flex direction changes based on container width -->
<div class="grid gap-4 items-start" style="grid-template-columns: 300px 1fr;">
  <div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="flex flex-col cq-md:flex-row gap-3">
      <div style="width: 60px; height: 60px; background: var(--vp-c-brand-soft); border-radius: 4px; flex-shrink: 0;"></div>
      <div>
        <p class="m-0" style="font-weight: 600; font-size: 0.875rem;">Card Title</p>
        <p class="m-0 mt-1" style="font-size: 0.8125rem; opacity: 0.7;">Stacks vertically in narrow container</p>
      </div>
    </div>
  </div>
  <div class="container-fluid p-3" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="flex flex-col cq-md:flex-row gap-3">
      <div style="width: 60px; height: 60px; background: var(--vp-c-brand-soft); border-radius: 4px; flex-shrink: 0;"></div>
      <div>
        <p class="m-0" style="font-weight: 600; font-size: 0.875rem;">Card Title</p>
        <p class="m-0 mt-1" style="font-size: 0.8125rem; opacity: 0.7;">Goes horizontal when container is wide enough</p>
      </div>
    </div>
  </div>
</div>`,

  'ct-cq-named': `<!-- Named containers: .cq-card sets container-name: card -->
<div class="grid grid-cols-2 gap-4">
  <div class="cq-card" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="card-compact card-normal card-spacious">
      Named container &mdash; padding and font-size adapt to container width
    </div>
  </div>
  <div class="cq-card" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px; max-width: 250px;">
    <div class="card-compact card-normal card-spacious">
      Same classes, narrower container
    </div>
  </div>
</div>`,

  'ct-sizes': `<div class="flex flex-col gap-2">
  <div class="container-tight" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="p-2 align-text-center" style="font-size: 0.8125rem;">.container-tight (640px)</div>
  </div>
  <div class="container-narrow" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="p-2 align-text-center" style="font-size: 0.8125rem;">.container-narrow (768px)</div>
  </div>
  <div class="container-prose" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="p-2 align-text-center" style="font-size: 0.8125rem;">.container-prose (65ch)</div>
  </div>
  <div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="p-2 align-text-center" style="font-size: 0.8125rem;">.container (responsive)</div>
  </div>
  <div class="container-wide" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div class="p-2 align-text-center" style="font-size: 0.8125rem;">.container-wide (1400px)</div>
  </div>
</div>`,
};

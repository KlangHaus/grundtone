export const containerExamples: Record<string, string> = {
  'ct-basic': `<div class="container" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .container &mdash; centered, fluid gutters, max-width steps up at each breakpoint
  </div>
</div>`,

  'ct-fluid': `<div class="container-fluid" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .container-fluid &mdash; always 100% width, no max-width cap
  </div>
</div>`,

  'ct-responsive': `<!-- 100% until lg (1024px), then steps up -->
<div class="container-lg" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .container-lg &mdash; fluid until 1024px, then constrained
  </div>
</div>`,

  'ct-narrow': `<div class="container-narrow" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .container-narrow &mdash; max 768px
  </div>
</div>`,

  'ct-tight': `<div class="container-tight" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .container-tight &mdash; max 640px
  </div>
</div>`,

  'ct-wide': `<div class="container-wide" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    .container-wide &mdash; max 1400px
  </div>
</div>`,

  'ct-prose': `<div class="container-prose" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem;">
    <p style="margin: 0;">
      The .container-prose class constrains content to 65ch &mdash; the typographic
      standard for optimal line length. This keeps paragraphs comfortable to read
      regardless of viewport width. No fixed pixel value; it adapts to the font.
    </p>
  </div>
</div>`,

  'ct-custom-prop': `<!-- Override --container-max inline -->
<div class="container" style="--container-max: 480px; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    --container-max: 480px (runtime override)
  </div>
</div>`,

  'ct-custom-gutter': `<!-- Override --container-gutter inline -->
<div class="container" style="--container-gutter: 3rem; --container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">
    --container-gutter: 3rem (large gutters)
  </div>
</div>`,

  'ct-breakout': `<div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem 0;">
    <p style="padding: 0 1rem; margin: 0 0 0.75rem;">Normal content inside .container</p>
    <div class="breakout" style="background: var(--vp-c-brand-soft); padding: 1.5rem; text-align: center;">
      .breakout &mdash; full viewport width, breaks out of container
    </div>
    <p style="padding: 0 1rem; margin: 0.75rem 0 0;">Back to normal container width</p>
  </div>
</div>`,

  'ct-cq': `<!-- Container is automatically a CQ context -->
<div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div style="padding: 1rem; text-align: center;">
    <p style="margin: 0 0 0.5rem;">Every .container has <code>container-type: inline-size</code> built in.</p>
    <p style="margin: 0;">Use <code>cq-sm:</code>, <code>cq-md:</code>, <code>cq-lg:</code> utilities on children &mdash; no extra class needed.</p>
  </div>
</div>`,

  'ct-grid-inside': `<div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
  <div class="grid grid-cols-3 gap-4" style="padding: 0.5rem 0;">
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">1</div>
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">2</div>
    <div style="padding: 0.5rem 0.75rem; background: var(--vp-c-brand-soft); border-radius: 4px; text-align: center;">3</div>
  </div>
</div>`,

  'ct-sizes': `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <div class="container-tight" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div style="padding: 0.5rem; text-align: center; font-size: 0.8125rem;">.container-tight (640px)</div>
  </div>
  <div class="container-narrow" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div style="padding: 0.5rem; text-align: center; font-size: 0.8125rem;">.container-narrow (768px)</div>
  </div>
  <div class="container-prose" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div style="padding: 0.5rem; text-align: center; font-size: 0.8125rem;">.container-prose (65ch)</div>
  </div>
  <div class="container" style="--container-max: 100%; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div style="padding: 0.5rem; text-align: center; font-size: 0.8125rem;">.container (responsive)</div>
  </div>
  <div class="container-wide" style="background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
    <div style="padding: 0.5rem; text-align: center; font-size: 0.8125rem;">.container-wide (1400px)</div>
  </div>
</div>`,
};

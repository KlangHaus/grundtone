export const borderExamples: Record<string, string> = {
  'bd-all': `<div class="flex gap-2">
  <div class="border rounded-md p-3 w-full">.border</div>
  <div class="border-0 p-3 w-full" style="background: var(--color-background-alt)">.border-0</div>
</div>`,

  'bd-sides': `<div class="flex flex-col gap-2">
  <div class="border-t p-3 bg-alt">.border-t</div>
  <div class="border-b p-3 bg-alt">.border-b</div>
  <div class="border-s p-3 bg-alt">.border-s (inline-start)</div>
  <div class="border-e p-3 bg-alt">.border-e (inline-end)</div>
</div>`,

  'bd-colors': `<div class="flex flex-col gap-2">
  <div class="border border-light p-3 rounded-sm">.border-light</div>
  <div class="border border-medium p-3 rounded-sm">.border-medium</div>
  <div class="border border-strong p-3 rounded-sm">.border-strong</div>
  <div class="border border-inverse p-3 rounded-sm" style="background: var(--color-text)">.border-inverse</div>
</div>`,

  'bd-radius': `<div class="flex flex-wrap gap-2">
  <div class="border p-3 rounded-none" style="width: 80px; text-align: center">none</div>
  <div class="border p-3 rounded-xs" style="width: 80px; text-align: center">xs</div>
  <div class="border p-3 rounded-sm" style="width: 80px; text-align: center">sm</div>
  <div class="border p-3 rounded-md" style="width: 80px; text-align: center">md</div>
  <div class="border p-3 rounded-lg" style="width: 80px; text-align: center">lg</div>
  <div class="border p-3 rounded-xl" style="width: 80px; text-align: center">xl</div>
  <div class="border p-3 rounded-2xl" style="width: 80px; text-align: center">2xl</div>
  <div class="border p-3 rounded-3xl" style="width: 80px; text-align: center">3xl</div>
  <div class="border p-3 rounded-full" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center">full</div>
</div>`,

  'bd-combined': `<div class="border border-strong rounded-lg p-3">
  <div class="border-b border-light p-2">Item 1</div>
  <div class="border-b border-light p-2">Item 2</div>
  <div class="p-2">Item 3</div>
</div>`,
};

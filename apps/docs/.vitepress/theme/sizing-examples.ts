export const sizingExamples: Record<string, string> = {
  'sz-height': `<div class="flex gap-2 items-end">
  <div class="h-8 bg-primary rounded-md p-1 text-inverse text-xs" style="width:4rem">h-8</div>
  <div class="h-12 bg-primary rounded-md p-1 text-inverse text-xs" style="width:4rem">h-12</div>
  <div class="h-16 bg-primary rounded-md p-1 text-inverse text-xs" style="width:4rem">h-16</div>
  <div class="h-24 bg-primary rounded-md p-1 text-inverse text-xs" style="width:4rem">h-24</div>
  <div class="h-32 bg-primary rounded-md p-1 text-inverse text-xs" style="width:4rem">h-32</div>
</div>`,

  'sz-max-width': `<div class="flex flex-col gap-2">
  <div class="max-w-xs bg-surface-alt p-2 rounded-md border">.max-w-xs (20rem)</div>
  <div class="max-w-sm bg-surface-alt p-2 rounded-md border">.max-w-sm (24rem)</div>
  <div class="max-w-md bg-surface-alt p-2 rounded-md border">.max-w-md (28rem)</div>
  <div class="max-w-lg bg-surface-alt p-2 rounded-md border">.max-w-lg (32rem)</div>
  <div class="max-w-prose bg-surface-alt p-2 rounded-md border">.max-w-prose (65ch)</div>
</div>`,
};

export const shadowExamples: Record<string, string> = {
  'sh-scale': `<div class="flex flex-wrap gap-3">
  <div class="shadow-xs rounded-md p-4" style="background: var(--color-surface-raised); min-width: 100px; text-align: center">shadow-xs</div>
  <div class="shadow-sm rounded-md p-4" style="background: var(--color-surface-raised); min-width: 100px; text-align: center">shadow-sm</div>
  <div class="shadow-md rounded-md p-4" style="background: var(--color-surface-raised); min-width: 100px; text-align: center">shadow-md</div>
  <div class="shadow-lg rounded-md p-4" style="background: var(--color-surface-raised); min-width: 100px; text-align: center">shadow-lg</div>
  <div class="shadow-xl rounded-md p-4" style="background: var(--color-surface-raised); min-width: 100px; text-align: center">shadow-xl</div>
  <div class="shadow-2xl rounded-md p-4" style="background: var(--color-surface-raised); min-width: 100px; text-align: center">shadow-2xl</div>
</div>`,

  'sh-special': `<div class="flex flex-wrap gap-3">
  <div class="shadow-inner rounded-md p-4" style="background: var(--color-surface); min-width: 140px; text-align: center">shadow-inner</div>
  <div class="shadow-none rounded-md p-4 border" style="min-width: 140px; text-align: center">shadow-none</div>
</div>`,

  'sh-combined': `<div class="flex flex-wrap gap-3">
  <div class="shadow-md rounded-lg p-4 transition-shadow" style="background: var(--color-surface-raised); min-width: 160px; text-align: center; cursor: pointer" onmouseover="this.className='shadow-xl rounded-lg p-4 transition-shadow'" onmouseout="this.className='shadow-md rounded-lg p-4 transition-shadow'">Hover me (md &rarr; xl)</div>
  <div class="shadow-lg rounded-full p-4" style="background: var(--color-surface-raised); width: 100px; height: 100px; display: flex; align-items: center; justify-content: center">Circle</div>
</div>`,
};

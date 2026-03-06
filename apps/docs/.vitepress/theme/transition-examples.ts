export const transitionExamples: Record<string, string> = {
  'tr-colors': `<div class="flex gap-2">
  <button class="transition-colors border rounded-md p-2" style="cursor: pointer" onmouseover="this.style.background='var(--color-primary)';this.style.color='var(--color-on-primary)';this.style.borderColor='var(--color-primary)'" onmouseout="this.style.background='';this.style.color='';this.style.borderColor=''">Hover: transition-colors</button>
  <button class="transition-shadow border rounded-md p-2" style="cursor: pointer" onmouseover="this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.boxShadow=''">Hover: transition-shadow</button>
</div>`,

  'tr-opacity': `<div class="flex gap-2">
  <div class="transition-opacity rounded-md p-3" style="background: var(--color-primary); color: var(--color-on-primary); cursor: pointer" onmouseover="this.style.opacity='0.5'" onmouseout="this.style.opacity='1'">Hover: transition-opacity</div>
  <div class="transition-transform rounded-md p-3" style="background: var(--color-success); color: #fff; cursor: pointer" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform=''">Hover: transition-transform</div>
</div>`,
};

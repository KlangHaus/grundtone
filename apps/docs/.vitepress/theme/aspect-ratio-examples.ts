export const aspectRatioExamples: Record<string, string> = {
  'ar-ratios': `<div class="flex flex-wrap gap-2">
  <div class="aspect-square rounded-md" style="width: 100px; background: #3b82f6; display: flex; align-items: center; justify-content: center; color: #fff">1:1</div>
  <div class="aspect-photo rounded-md" style="width: 100px; background: #8b5cf6; display: flex; align-items: center; justify-content: center; color: #fff">4:3</div>
  <div class="aspect-video rounded-md" style="width: 140px; background: #ec4899; display: flex; align-items: center; justify-content: center; color: #fff">16:9</div>
  <div class="aspect-wide rounded-md" style="width: 140px; background: #f59e0b; display: flex; align-items: center; justify-content: center; color: #fff">2:1</div>
  <div class="aspect-portrait rounded-md" style="width: 80px; background: #10b981; display: flex; align-items: center; justify-content: center; color: #fff">3:4</div>
</div>`,

  'ar-custom': `<div class="flex gap-2">
  <div class="aspect-custom rounded-md" style="--aspect-ratio: 3/2; width: 150px; background: #6366f1; display: flex; align-items: center; justify-content: center; color: #fff">3:2</div>
  <div class="aspect-custom rounded-md" style="--aspect-ratio: 5/4; width: 150px; background: #0ea5e9; display: flex; align-items: center; justify-content: center; color: #fff">5:4</div>
</div>`,

  'ar-responsive': `<div class="aspect-square md:aspect-video rounded-md p-3" style="max-width: 300px; background: var(--color-primary); color: var(--color-on-primary); display: flex; align-items: center; justify-content: center">
  Square on mobile, 16:9 from <code>md</code> up
</div>`,
};

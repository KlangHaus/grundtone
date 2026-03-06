export const textAlignExamples: Record<string, string> = {
  'ta-basic': `<div class="bg-surface-alt rounded-md overflow-hidden">
  <div class="text-left p-3 border-b">.text-left</div>
  <div class="text-center p-3 border-b">.text-center</div>
  <div class="text-right p-3">.text-right</div>
</div>`,

  'ta-responsive': `<div class="text-left md:text-center p-3 bg-surface-alt rounded-md">
  Left on mobile, centered from <code>md</code> up &mdash; resize your browser to see
</div>`,
};

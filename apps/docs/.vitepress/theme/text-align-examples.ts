export const textAlignExamples: Record<string, string> = {
  'ta-basic': `<div class="bg-alt rounded-md overflow-hidden">
  <div class="align-text-left p-3 border-b">.align-text-left</div>
  <div class="align-text-center p-3 border-b">.align-text-center</div>
  <div class="align-text-right p-3">.align-text-right</div>
</div>`,

  'ta-responsive': `<div class="align-text-left md:align-text-center p-3 bg-alt rounded-md">
  Left on mobile, centered from <code>md</code> up &mdash; resize your browser to see
</div>`,
};

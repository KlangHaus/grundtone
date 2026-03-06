export const componentExamples: Record<string, string> = {
  'c-skip-link': `<div style="position: relative; height: 60px; overflow: hidden; background: var(--color-surface); border-radius: 8px">
  <a href="#" class="skip-link" style="left: 1rem">Skip to content</a>
</div>`,

  'c-prose': `<div class="prose" style="font-size: var(--font-size-sm)">
  <h2 style="margin-top: 0">Heading Level 2</h2>
  <p>Paragraph with <code>inline code</code> and normal text content for demonstration.</p>
  <h3>Heading Level 3</h3>
  <ul>
    <li>First list item</li>
    <li>Second list item</li>
  </ul>
</div>`,

  'c-callout-info': `<div class="callout callout--info" style="font-size: var(--font-size-sm)">
  <span>&#x2139;&#xFE0F;</span>
  <p>This is an informational callout using <code>.callout--info</code>.</p>
</div>`,

  'c-callout-warning': `<div class="callout callout--warning" style="font-size: var(--font-size-sm)">
  <span>&#x26A0;&#xFE0F;</span>
  <p>This is a warning callout using <code>.callout--warning</code>.</p>
</div>`,

  'c-article-card': `<article class="article-card shadow-sm" style="max-width: 420px">
  <div class="article-meta" style="font-size: var(--font-size-xs); color: var(--color-text-tertiary)">
    <span class="article-tag" style="font-size: var(--font-size-xs)">Design</span>
    <time>1 March 2026</time>
  </div>
  <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold)">Article Title</h2>
  <p class="article-excerpt" style="font-size: var(--font-size-sm); color: var(--color-text-secondary)">A short excerpt describing the article content.</p>
</article>`,

  'c-article-meta': `<div class="article-meta" style="font-size: var(--font-size-sm); color: var(--color-text-secondary)">
  <span class="article-tag" style="font-size: var(--font-size-xs)">Design</span>
  <time>1 March 2026</time>
  <span>&middot;</span>
  <span>6 min read</span>
</div>`,

  'c-breadcrumb': `<nav class="breadcrumb" style="font-size: var(--font-size-sm); color: var(--color-text-tertiary)">
  <a href="#">Blog</a>
  <span aria-hidden="true">/</span>
  <span>Current Page</span>
</nav>`,

  'c-author-card': `<aside class="author-card" style="background: var(--color-surface)">
  <div class="author-avatar" style="background: var(--color-primary); color: var(--color-on-primary); font-weight: var(--font-weight-bold); font-size: var(--font-size-xl)">AH</div>
  <div>
    <div style="font-weight: var(--font-weight-semibold)">Allan Hansen</div>
    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary)">Designer and frontend architect.</div>
  </div>
</aside>`,

  'c-back-link': `<a href="#" class="back-link" style="font-size: var(--font-size-sm); color: var(--color-primary); font-weight: var(--font-weight-medium)">&larr; All posts</a>`,

  'c-bq-quotes': `<blockquote class="blockquote--quotes">
  <p>Tokens are contracts between design and implementation. Name them by function — not color.</p>
</blockquote>`,

  'c-bq-gradient': `<blockquote class="blockquote--gradient">
  <p>Tokens are contracts between design and implementation. Name them by function — not color.</p>
</blockquote>`,

  'c-bq-pull': `<blockquote class="blockquote--pull">
  <p>Tokens are contracts between design and implementation.</p>
</blockquote>`,
};

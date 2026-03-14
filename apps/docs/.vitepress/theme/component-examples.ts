export const componentExamples: Record<string, string> = {
  'c-external-link': `<div class="flex flex-col gap-2">
  <a href="#" class="external-link">Read more on borger.dk</a>
  <a href="#" class="external-link">Self-service guide (pdf)</a>
</div>`,

  'c-function-link': `<div class="flex flex-col gap-2">
  <button type="button" class="function-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg> Add another person</button>
  <button type="button" class="function-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 4H5v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"/></svg> Print receipt</button>
</div>`,

  'c-display-text': `<div class="flex flex-col gap-1">
  <p class="body-text-sm text-secondary">Your tax statement</p>
  <p class="display-text">23,450 kr</p>
</div>`,

  'c-facit': `<div class="flex flex-col gap-1" style="max-width: 280px">
  <div class="flex justify-between body-text"><span>Subtotal</span><span>1,200 kr</span></div>
  <div class="flex justify-between body-text"><span>VAT (25%)</span><span>300 kr</span></div>
  <hr style="margin: var(--space-xs) 0" />
  <div class="flex justify-between body-text"><span>Total</span><span class="facit">1,500 kr</span></div>
</div>`,

  'c-error-text': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Email</label>
  <input type="email" value="user@" style="padding: var(--space-sm) var(--space-md); border: 2px solid var(--color-error); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
  <p class="error-text">Please enter a valid email address, e.g. name@example.com</p>
</div>`,

  'c-error-text-required': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Phone number</label>
  <input type="tel" style="padding: var(--space-sm) var(--space-md); border: 2px solid var(--color-error); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
  <p class="error-text">Please enter your phone number</p>
</div>`,

  'c-caption': `<figure style="max-width: 360px">
  <div style="width: 100%; aspect-ratio: 16/9; background: var(--color-surface-alt); border-radius: var(--radius-md)"></div>
  <figcaption class="caption" style="margin-top: var(--space-xs)">Grundtone color palette in light and dark mode.</figcaption>
</figure>`,

  'c-body-text': `<div class="flex flex-col gap-2">
  <p class="body-text">Body text — standard (1rem / 16px, normal weight)</p>
  <p class="body-text-sm">Small body text — secondary text (0.875rem / 14px)</p>
  <p class="body-text-bold">Bold body text — emphasized text (1rem / 16px, bold)</p>
</div>`,

  'c-body-text-usage': `<div class="flex flex-col gap-2">
  <p class="body-text">Fill out the form below to create your account. You can always change your details later under <span class="body-text-bold">Settings</span>.</p>
  <p class="body-text-sm text-secondary">All fields marked with * are required.</p>
</div>`,

  'c-help-text': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Social security number</label>
  <p class="help-text">We need your social security number to verify your identity.</p>
  <input type="text" placeholder="000000-0000" style="padding: var(--space-sm) var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
</div>`,

  'c-help-text-field': `<div class="flex flex-col gap-1" style="max-width: 360px">
  <label style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium)">Email</label>
  <input type="email" placeholder="you@email.com" style="padding: var(--space-sm) var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-base)" />
  <p class="help-text">We will send a confirmation to this address.</p>
</div>`,

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

  'c-breadcrumb': `<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Home</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
      <a href="#" class="breadcrumb__link">Blog</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
      <span class="breadcrumb__current" aria-current="page">Current Page</span>
    </li>
  </ol>
</nav>`,

  'c-author-card': `<aside class="author-card" style="background: var(--color-surface)">
  <div class="author-avatar" style="background: var(--color-primary); color: var(--color-on-primary); font-weight: var(--font-weight-bold); font-size: var(--font-size-xl)">AH</div>
  <div>
    <div style="font-weight: var(--font-weight-semibold)">Allan Hansen</div>
    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary)">Designer and frontend architect.</div>
  </div>
</aside>`,

  'c-back-link': `<a href="#" class="back-link" style="font-size: var(--font-size-sm); color: var(--color-primary); font-weight: var(--font-weight-medium)">&larr; All posts</a>`,

  'c-product-card': `<a href="#" class="product-card shadow-sm" style="max-width: 280px; text-decoration: none">
  <div style="width: 100%; aspect-ratio: 1/1; background: var(--color-surface-alt); border-radius: var(--radius-md)"></div>
  <div class="product-card__body">
    <div style="font-size: var(--font-size-xs); font-weight: var(--font-weight-medium); color: var(--color-primary)">T-shirt</div>
    <div style="font-size: var(--font-size-base); font-weight: var(--font-weight-semibold)">Design Tokens Tee</div>
    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary)">Organic cotton with semantic color print.</div>
    <div class="product-card__price" style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold)">349 kr</div>
  </div>
</a>`,

  'c-product-gallery': `<div class="product-gallery" style="max-width: 400px">
  <div class="product-gallery__main" style="background: var(--color-surface-alt)"></div>
  <div class="product-gallery__thumbs">
    <div class="product-gallery__thumb product-gallery__thumb--active" style="background: var(--color-surface-alt)"></div>
    <div class="product-gallery__thumb" style="background: var(--color-surface-alt)"></div>
    <div class="product-gallery__thumb" style="background: var(--color-surface-alt)"></div>
    <div class="product-gallery__thumb" style="background: var(--color-surface-alt)"></div>
  </div>
</div>`,

  'c-lead': `<div>
  <h2 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-sm)">Page Title</h2>
  <p class="lead">A short introductory paragraph that sets the context for the content below.</p>
</div>`,

  'c-lead-prose': `<div class="prose">
  <p>This first paragraph is automatically styled as a lead inside .prose — no extra class needed.</p>
  <p>Subsequent paragraphs use the normal body text size and line height.</p>
</div>`,

  'c-header': `<header class="header">
  <a href="#">Brand</a>
  <nav>
    <a href="#">About</a>
    <a href="#">Blog</a>
  </nav>
</header>`,

  'c-footer': `<footer class="footer text-xs text-tertiary text-center">
  <p>&copy; 2026 Example. All rights reserved.</p>
</footer>`,

  'c-input-sizes': `<div class="flex flex-col gap-2" style="max-width: 360px">
  <input class="input input--sm" placeholder="Small input" />
  <input class="input input--md" placeholder="Medium input" />
  <input class="input input--lg" placeholder="Large input" />
</div>`,

  'c-input-label': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" for="preview-name">Full name <span class="input-label__required">*</span></label>
  <input id="preview-name" class="input input--md" type="text" placeholder="John Doe" required aria-required="true" />
  <p class="input-help">Enter your full legal name</p>
</div>`,

  'c-input-error': `<div class="input-field" style="max-width: 360px">
  <label class="input-label" for="preview-user">Username</label>
  <input id="preview-user" class="input input--md input--error" type="text" value="admin" aria-invalid="true" aria-describedby="preview-user-err" />
  <p id="preview-user-err" class="input-error" role="alert">Username is already taken</p>
</div>`,

  'c-input-states': `<div class="flex flex-col gap-3" style="max-width: 360px">
  <div class="input-field">
    <label class="input-label" for="preview-dis">Disabled</label>
    <input id="preview-dis" class="input input--md" disabled value="Cannot edit" />
  </div>
  <div class="input-field">
    <label class="input-label" for="preview-ro">Readonly</label>
    <input id="preview-ro" class="input input--md" readonly value="Read only value" />
  </div>
</div>`,
};

export const elementExamples: Record<string, string> = {
  'el-body': `<div style="font-family: var(--font-family-base); font-size: var(--font-size-base); line-height: var(--line-height-normal); color: var(--color-text); background: var(--color-background); padding: 1rem; border-radius: 8px">
  <p style="margin: 0">This text inherits <code>body</code> base styles: font-family, font-size, line-height, color, and background.</p>
</div>`,

  'el-blockquote': `<blockquote>
  <p>Design tokens are contracts between design and implementation.</p>
</blockquote>`,

  'el-bq-quotes': `<blockquote class="blockquote--quotes">
  <p>Tokens are contracts between design and implementation. Name them by function — not color.</p>
</blockquote>`,

  'el-bq-gradient': `<blockquote class="blockquote--gradient">
  <p>Tokens are contracts between design and implementation. Name them by function — not color.</p>
</blockquote>`,

  'el-bq-pull': `<blockquote class="blockquote--pull">
  <p>Tokens are contracts between design and implementation.</p>
</blockquote>`,

  'el-button': `<button style="padding: 0.5rem 1rem; font-family: inherit; font-size: inherit">A reset button (no browser chrome)</button>`,

  'el-btn-primary': `<button class="btn-primary">Add to Cart</button>`,

  'el-btn-secondary': `<button class="btn-secondary">Save Draft</button>`,

  'el-btn-outlined': `<button class="btn-outlined">Learn More</button>`,

  'el-btn-negative': `<button class="btn-negative">Delete Account</button>`,

  'el-btn-unstyled': `<span>This is a <button class="btn-unstyled" style="color: var(--color-primary); text-decoration: underline">button that looks like a link</button> inside text.</span>`,

  'el-size-selector': `<div class="size-selector">
  <button class="size-btn">XS</button>
  <button class="size-btn size-btn--active">S</button>
  <button class="size-btn">M</button>
  <button class="size-btn">L</button>
  <button class="size-btn">XL</button>
  <button class="size-btn" disabled>XXL</button>
</div>`,

  'el-filter-chip': `<div class="filter-bar">
  <span style="font-size: var(--font-size-sm); color: var(--color-text-tertiary)">Filter:</span>
  <button class="filter-chip filter-chip--active">All</button>
  <button class="filter-chip">T-shirts</button>
  <button class="filter-chip">Posters</button>
  <button class="filter-chip">Accessories</button>
</div>`,

  'el-list': `<div style="display: flex; gap: 2rem">
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ul>
  <ol>
    <li>Step one</li>
    <li>Step two</li>
    <li>Step three</li>
  </ol>
</div>`,

  'el-dl': `<dl>
  <dt>Term</dt>
  <dd>Definition of the term.</dd>
</dl>`,

  'el-detail-row': `<dl>
  <div class="detail-row">
    <dt>Material</dt>
    <dd>100% organic cotton, 180g/m&sup2;</dd>
  </div>
  <div class="detail-row">
    <dt>Fit</dt>
    <dd>Regular fit, unisex</dd>
  </div>
  <div class="detail-row">
    <dt>Print</dt>
    <dd>Water-based screen print</dd>
  </div>
</dl>`,

  'el-hr': `<div>
  <p style="margin: 0 0 var(--space-md)">Content above the divider.</p>
  <hr style="border: none; border-top: 1px solid var(--color-border-light); margin: var(--space-2xl) 0" />
  <p style="margin: var(--space-md) 0 0">Content below the divider.</p>
</div>`,

  'el-headings': `<div>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</div>`,

  'el-hgroup': `<hgroup>
  <h2>Product Launch</h2>
  <p>Introducing our latest design tokens collection</p>
</hgroup>`,

  'el-address': `<address>
  Allan Hansen<br />
  Copenhagen, Denmark<br />
  <a href="mailto:hello@example.com">hello@example.com</a>
</address>`,
};

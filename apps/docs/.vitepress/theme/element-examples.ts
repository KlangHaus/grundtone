export const elementExamples: Record<string, string> = {
  'el-body': `<div style="font-family: var(--font-family-base); font-size: var(--font-size-base); line-height: var(--line-height-normal); color: var(--color-text); background: var(--color-background); padding: 1rem; border-radius: 8px">
  <p style="margin: 0">This text inherits <code>body</code> base styles: font-family, font-size, line-height, color, and background.</p>
</div>`,

  'el-header': `<header style="display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--space-md); margin-bottom: var(--space-xl); border-bottom: 1px solid var(--color-border-light)">
  <a href="#" style="color: var(--color-text); text-decoration: none; font-weight: var(--font-weight-bold); font-size: var(--font-size-lg)">Brand</a>
  <nav>
    <a href="#" style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-left: var(--space-md); text-decoration: none">About</a>
    <a href="#" style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-left: var(--space-md); text-decoration: none">Blog</a>
  </nav>
</header>`,

  'el-footer': `<footer style="margin-top: var(--space-2xl); padding-top: var(--space-md); border-top: 1px solid var(--color-border-light); font-size: var(--font-size-xs); color: var(--color-text-tertiary); text-align: center">
  <p>&copy; 2026 Example. All rights reserved.</p>
</footer>`,

  'el-blockquote': `<blockquote>
  <p>Design tokens are contracts between design and implementation.</p>
</blockquote>`,

  'el-hr': `<div>
  <p style="margin: 0 0 var(--space-md)">Content above the divider.</p>
  <hr style="border: none; border-top: 1px solid var(--color-border-light); margin: var(--space-2xl) 0" />
  <p style="margin: var(--space-md) 0 0">Content below the divider.</p>
</div>`,
};

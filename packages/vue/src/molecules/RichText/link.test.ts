import { describe, it, expect } from 'vitest';
import { isSafeLinkUrl } from './link';

describe('isSafeLinkUrl', () => {
  it('accepts https, http, mailto, relative paths and anchors', () => {
    expect(isSafeLinkUrl('https://klanghaus.dk/blog')).toBe(true);
    expect(isSafeLinkUrl('http://localhost:3000/x')).toBe(true);
    expect(isSafeLinkUrl('mailto:hello@grundtone.com')).toBe(true);
    expect(isSafeLinkUrl('/docs/install')).toBe(true);
    expect(isSafeLinkUrl('/')).toBe(true);
    expect(isSafeLinkUrl('#section-2')).toBe(true);
  });

  it('rejects javascript: and data: in any casing/spacing', () => {
    expect(isSafeLinkUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeLinkUrl('JaVaScRiPt:alert(1)')).toBe(false);
    expect(isSafeLinkUrl('  javascript:alert(1)  ')).toBe(false);
    expect(isSafeLinkUrl('data:text/html,<script>alert(1)</script>')).toBe(
      false,
    );
  });

  it('rejects other schemes and malformed shapes (allow-list semantics)', () => {
    expect(isSafeLinkUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isSafeLinkUrl('file:///etc/passwd')).toBe(false);
    expect(isSafeLinkUrl('ftp://x.dk/f')).toBe(false);
    expect(isSafeLinkUrl('//protocol-relative.dk')).toBe(false);
    expect(isSafeLinkUrl('klanghaus.dk')).toBe(false); // bare domain — no scheme
    expect(isSafeLinkUrl('')).toBe(false);
    expect(isSafeLinkUrl('   ')).toBe(false);
    expect(isSafeLinkUrl('https:// space.dk')).toBe(false);
  });

  it('caps length', () => {
    expect(isSafeLinkUrl('https://x.dk/' + 'a'.repeat(2100))).toBe(false);
  });
});

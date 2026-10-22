import { describe, expect, it } from 'vitest';
import { resolveStudioTokensUrl } from './studio-tokens';

describe('resolveStudioTokensUrl', () => {
  it.each([undefined, '', '   '])('returns no URL for %j', raw => {
    expect(resolveStudioTokensUrl(raw)).toBe('');
  });

  it.each([
    'https://cdn.grundtone.com/k/pk_live_x/tokens.css',
    'http://localhost:3000/k/pk_live_x/tokens.css',
    'http://127.0.0.1:3000/k/pk_live_x/tokens.css',
    'http://[::1]:3000/k/pk_live_x/tokens.css',
  ])('accepts %s', raw => {
    expect(resolveStudioTokensUrl(`  ${raw} `)).toBe(raw);
  });

  it.each([
    'http://evil.example/tokens.css',
    'http://localhost.evil.example/tokens.css',
    'javascript:alert(1)',
    'data:text/css,body{}',
    '//cdn.example/tokens.css',
    'not a url',
  ])('rejects %s and names the variable', raw => {
    expect(() => resolveStudioTokensUrl(raw)).toThrow(
      /GRUNDTONE_STUDIO_TOKENS_URL/,
    );
  });
});

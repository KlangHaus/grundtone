import { describe, it, expect } from 'vitest';
import { createTheme, defaultColorPreset } from '@grundtone/core';
import { resolveEmailTheme, IBM_PLEX_SANS } from './theme';

describe('resolveEmailTheme', () => {
  it('maps core tokens into the email theme', () => {
    const t = resolveEmailTheme();
    expect(t.colors.primary).toBe(defaultColorPreset.primary);
    expect(t.colors.onPrimary).toBe(defaultColorPreset.onPrimary);
    expect(t.colors.border).toBe(defaultColorPreset.borderMedium);
    expect(t.mode).toBe('light');
  });

  it('converts rem token lengths to px for the email medium', () => {
    const t = resolveEmailTheme();
    expect(t.fontSize.base).toBe('16px'); // 1rem
    expect(t.spacing.md).toBe('16px'); // 1rem
    expect(t.radius.md).toBe('6px'); // 0.375rem
  });

  it('registers IBM Plex Sans as the default web font', () => {
    expect(resolveEmailTheme().webFonts).toEqual([IBM_PLEX_SANS]);
  });

  it('lets web fonts be disabled', () => {
    expect(resolveEmailTheme(undefined, { webFonts: [] }).webFonts).toEqual([]);
  });

  it('honours a custom container width', () => {
    expect(
      resolveEmailTheme(undefined, { containerWidth: '480px' }).layout
        .containerWidth,
    ).toBe('480px');
  });

  it('carries a branded primary colour through from createTheme', () => {
    const branded = createTheme({ light: { primary: '#996600' } });
    expect(resolveEmailTheme(branded.light).colors.primary).toBe('#996600');
  });

  it('resolves the dark preset as mode dark', () => {
    const branded = createTheme({ dark: { primary: '#cc9966' } });
    const t = resolveEmailTheme(branded.dark);
    expect(t.mode).toBe('dark');
    expect(t.colors.primary).toBe('#cc9966');
  });
});

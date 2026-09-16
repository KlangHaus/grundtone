import { describe, it, expect } from 'vitest';
import {
  createTheme,
  defaultRadius,
  defaultSpacing,
  defaultTypography,
} from './theme-preset';

// createTheme accepts two forms per mode (riff qw9kcvy4x7whhmzcur84km4s):
//
// - a bare colour preset: { light: { primary } }
// - an override object: { light: { colors, typography, radius, spacing, transitions } }
//
// 2.22.0 accepted both. 3.0.0 dropped the override form without declaring it:
// every value in such an object silently resolved to the defaults, and the
// group objects were spread into the colour map. Consumers passing published
// tenant tokens (Studio's SDK among them) would ship the default brand.

describe('createTheme — override object form', () => {
  const overrides = {
    colors: { primary: '#123456', background: '#fafafa' },
    typography: { fontFamily: { mono: "'Contract Mono', monospace" } },
    radius: { md: '9px' },
    spacing: { md: '13px' },
    transitions: { duration: { fast: '75ms' } },
  };

  it('applies colours, radius, spacing, typography and transitions in light mode', () => {
    const { light } = createTheme({ light: overrides });
    expect({
      mode: light.mode,
      primary: light.colors.primary,
      background: light.colors.background,
      radius: light.radius.md,
      spacing: light.spacing.md,
      mono: light.typography.fontFamily.mono,
      fast: light.transitions.duration.fast,
    }).toEqual({
      mode: 'light',
      primary: '#123456',
      background: '#fafafa',
      radius: '9px',
      spacing: '13px',
      mono: "'Contract Mono', monospace",
      fast: '75ms',
    });
  });

  it('applies the same override form in dark mode', () => {
    const { dark } = createTheme({ dark: overrides });
    expect([
      dark.mode,
      dark.colors.primary,
      dark.radius.md,
      dark.spacing.md,
    ]).toEqual(['dark', '#123456', '9px', '13px']);
  });

  it('merges partial groups with the defaults instead of replacing them', () => {
    const { light } = createTheme({ light: overrides });
    expect(light.typography.fontFamily.base).toBe(
      defaultTypography.fontFamily.base,
    );
    expect(light.typography.fontSize).toEqual(defaultTypography.fontSize);
    expect(light.radius.sm).toBe(defaultRadius.sm);
    expect(light.spacing.lg).toBe(defaultSpacing.lg);
  });

  it('never spreads a token group into the colour map', () => {
    const { light, dark } = createTheme({ light: overrides, dark: overrides });
    for (const theme of [light, dark]) {
      for (const group of [
        'colors',
        'typography',
        'radius',
        'spacing',
        'transitions',
      ]) {
        expect(Object.keys(theme.colors)).not.toContain(group);
      }
    }
  });

  it('accepts an override object with only one group', () => {
    const { light } = createTheme({ light: { radius: { md: '2px' } } });
    expect(light.radius.md).toBe('2px');
    expect(light.colors.primary).toBe(createTheme({}).light.colors.primary);
  });
});

describe('createTheme — bare colour preset form (unchanged)', () => {
  it('applies colours per mode', () => {
    const { light, dark } = createTheme({
      light: { primary: '#0a0a0a' },
      dark: { primary: '#f5f5f5' },
    });
    expect([light.colors.primary, dark.colors.primary]).toEqual([
      '#0a0a0a',
      '#f5f5f5',
    ]);
  });

  it('uses the defaults for everything else', () => {
    const { light } = createTheme({ light: { primary: '#0a0a0a' } });
    expect(light.radius).toEqual(defaultRadius);
    expect(light.spacing).toEqual(defaultSpacing);
  });

  it('accepts an empty call', () => {
    const { light, dark } = createTheme({});
    expect([light.mode, dark.mode]).toEqual(['light', 'dark']);
  });
});

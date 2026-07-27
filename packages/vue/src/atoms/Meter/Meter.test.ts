import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Meter from './Meter.vue';

const BASE = 'gt-meter';

function mountMeter(props: Record<string, unknown>) {
  return mount(Meter, { props: props as never });
}

function fillStyle(wrapper: ReturnType<typeof mountMeter>) {
  return wrapper.find(`.${BASE}__fill`).attributes('style') ?? '';
}

describe('Meter', () => {
  describe('value / a11y', () => {
    it('exposes progressbar semantics', () => {
      const el = mountMeter({ value: 40, max: 200, label: 'Kapacitet' });
      const bar = el.find(`.${BASE}`);
      expect(bar.attributes('role')).toBe('progressbar');
      expect(bar.attributes('aria-valuenow')).toBe('40');
      expect(bar.attributes('aria-valuemin')).toBe('0');
      expect(bar.attributes('aria-valuemax')).toBe('200');
      expect(bar.attributes('aria-label')).toBe('Kapacitet');
    });

    it('fills to value/max percent, clamped to [0,100]', () => {
      expect(fillStyle(mountMeter({ value: 50, max: 200 }))).toContain(
        'inline-size: 25%',
      );
      expect(fillStyle(mountMeter({ value: 999, max: 100 }))).toContain(
        'inline-size: 100%',
      );
      expect(fillStyle(mountMeter({ value: -5, max: 100 }))).toContain(
        'inline-size: 0%',
      );
    });
  });

  describe('variants', () => {
    it('determinate uses the tone colour var', () => {
      const s = fillStyle(
        mountMeter({ value: 50, variant: 'determinate', tone: 'success' }),
      );
      expect(s).toContain('var(--color-success)');
    });

    it('accent uses the provided colour', () => {
      // jsdom normalises the inline hex to rgb().
      const s = fillStyle(
        mountMeter({ value: 50, variant: 'accent', accent: '#ff00aa' }),
      );
      expect(s).toContain('rgb(255, 0, 170)');
    });
  });

  describe('threshold (bidirectional)', () => {
    const bands = [
      { at: 70, tone: 'warning' as const },
      { at: 90, tone: 'error' as const },
    ];

    it('asc: value ≥ at → highest crossed band wins (high = bad)', () => {
      // 50 → below all → base tone
      expect(
        fillStyle(
          mountMeter({
            value: 50,
            variant: 'threshold',
            thresholds: bands,
            tone: 'success',
          }),
        ),
      ).toContain('var(--color-success)');
      // 75 → crossed 70 → warning
      expect(
        fillStyle(
          mountMeter({ value: 75, variant: 'threshold', thresholds: bands }),
        ),
      ).toContain('var(--color-warning)');
      // 95 → crossed 90 → error
      expect(
        fillStyle(
          mountMeter({ value: 95, variant: 'threshold', thresholds: bands }),
        ),
      ).toContain('var(--color-error)');
    });

    it('desc: value ≤ at → lowest crossed band wins (low = bad)', () => {
      const desc = [
        { at: 50, tone: 'error' as const },
        { at: 80, tone: 'warning' as const },
      ];
      // 90 → above all → base
      expect(
        fillStyle(
          mountMeter({
            value: 90,
            variant: 'threshold',
            direction: 'desc',
            thresholds: desc,
            tone: 'success',
          }),
        ),
      ).toContain('var(--color-success)');
      // 70 → ≤80 → warning
      expect(
        fillStyle(
          mountMeter({
            value: 70,
            variant: 'threshold',
            direction: 'desc',
            thresholds: desc,
          }),
        ),
      ).toContain('var(--color-warning)');
      // 40 → ≤50 → error (most severe)
      expect(
        fillStyle(
          mountMeter({
            value: 40,
            variant: 'threshold',
            direction: 'desc',
            thresholds: desc,
          }),
        ),
      ).toContain('var(--color-error)');
    });
  });
});

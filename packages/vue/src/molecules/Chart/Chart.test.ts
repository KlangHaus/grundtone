import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ChartContainer from './ChartContainer.vue';
import ChartLegend from './ChartLegend.vue';
import type { ChartConfig } from './types';

const config: ChartConfig = {
  revenue: { label: 'Omsætning', color: 'var(--chart-1)' },
  expenses: { label: 'Udgifter', color: 'var(--chart-2)' },
};

describe('GTChartContainer', () => {
  it('renders with chart class', () => {
    const w = mount(ChartContainer, {
      props: { config },
      slots: { default: '<div class="test-chart">chart</div>' },
    });
    expect(w.find('.chart').exists()).toBe(true);
  });

  it('sets CSS custom properties from config', () => {
    const w = mount(ChartContainer, {
      props: { config },
      slots: { default: 'chart' },
    });
    const style = w.find('.chart').attributes('style');
    expect(style).toContain('--color-revenue');
    expect(style).toContain('--color-expenses');
  });

  it('applies aria-label', () => {
    const w = mount(ChartContainer, {
      props: { config, ariaLabel: 'Revenue chart' },
      slots: { default: 'chart' },
    });
    expect(w.find('.chart').attributes('aria-label')).toBe('Revenue chart');
  });

  it('has role="img"', () => {
    const w = mount(ChartContainer, {
      props: { config },
      slots: { default: 'chart' },
    });
    expect(w.find('.chart').attributes('role')).toBe('img');
  });
});

describe('GTChartLegend', () => {
  it('renders all config entries', () => {
    const w = mount(ChartLegend, {
      global: {
        provide: {
          'gt-chart-config': { value: config },
        },
      },
    });
    const items = w.findAll('.chart__legend-item');
    expect(items).toHaveLength(2);
    expect(items[0].text()).toBe('Omsætning');
    expect(items[1].text()).toBe('Udgifter');
  });

  it('filters by keys prop', () => {
    const w = mount(ChartLegend, {
      props: { keys: ['revenue'] },
      global: {
        provide: {
          'gt-chart-config': { value: config },
        },
      },
    });
    expect(w.findAll('.chart__legend-item')).toHaveLength(1);
  });
});

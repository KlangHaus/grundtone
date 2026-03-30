import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Slider from './Slider.vue';

describe('GTSlider', () => {
  it('renders with default props', () => {
    const w = mount(Slider);
    expect(w.find('.slider').exists()).toBe(true);
    expect(w.find('.slider__thumb').exists()).toBe(true);
    expect(w.find('.slider__track').exists()).toBe(true);
    expect(w.find('.slider__range').exists()).toBe(true);
  });

  it('renders label', () => {
    const w = mount(Slider, { props: { label: 'Volume' } });
    expect(w.find('.slider__label').text()).toBe('Volume');
  });

  it('shows value when showValue is true', () => {
    const w = mount(Slider, {
      props: { modelValue: 42, showValue: true },
    });
    expect(w.find('.slider__value').text()).toBe('42');
  });

  it('sets aria attributes', () => {
    const w = mount(Slider, {
      props: { modelValue: 50, min: 0, max: 100, label: 'Test' },
    });
    const thumb = w.find('[role="slider"]');
    expect(thumb.attributes('aria-valuenow')).toBe('50');
    expect(thumb.attributes('aria-valuemin')).toBe('0');
    expect(thumb.attributes('aria-valuemax')).toBe('100');
    expect(thumb.attributes('aria-label')).toBe('Test');
  });

  it('applies disabled class and aria', () => {
    const w = mount(Slider, { props: { disabled: true } });
    expect(w.find('.slider').classes()).toContain('slider--disabled');
    expect(w.find('[role="slider"]').attributes('aria-disabled')).toBe('true');
  });

  it('applies vertical class', () => {
    const w = mount(Slider, { props: { orientation: 'vertical' } });
    expect(w.find('.slider').classes()).toContain('slider--vertical');
    expect(w.find('[role="slider"]').attributes('aria-orientation')).toBe(
      'vertical',
    );
  });

  it('renders two thumbs in range mode', () => {
    const w = mount(Slider, {
      props: { range: true, modelValue: [20, 80] },
    });
    const thumbs = w.findAll('[role="slider"]');
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0].attributes('aria-valuenow')).toBe('20');
    expect(thumbs[1].attributes('aria-valuenow')).toBe('80');
  });

  it('displays range value', () => {
    const w = mount(Slider, {
      props: { range: true, modelValue: [10, 90], showValue: true },
    });
    expect(w.find('.slider__value').text()).toBe('10 – 90');
  });

  it('emits on keyboard ArrowRight', async () => {
    const w = mount(Slider, { props: { modelValue: 50, step: 5 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });
    expect(w.emitted('update:modelValue')?.[0]).toEqual([55]);
  });

  it('emits on keyboard ArrowLeft', async () => {
    const w = mount(Slider, { props: { modelValue: 50, step: 5 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' });
    expect(w.emitted('update:modelValue')?.[0]).toEqual([45]);
  });

  it('clamps to min on Home', async () => {
    const w = mount(Slider, { props: { modelValue: 50, min: 10 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'Home' });
    expect(w.emitted('update:modelValue')?.[0]).toEqual([10]);
  });

  it('clamps to max on End', async () => {
    const w = mount(Slider, { props: { modelValue: 50, max: 200 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'End' });
    expect(w.emitted('update:modelValue')?.[0]).toEqual([200]);
  });

  it('range mode low thumb cannot exceed high', async () => {
    const w = mount(Slider, {
      props: { range: true, modelValue: [50, 60], step: 20 },
    });
    const thumbs = w.findAll('[role="slider"]');
    // Try to move low past high
    await thumbs[0].trigger('keydown', { key: 'End' });
    const emitted = w.emitted('update:modelValue')?.[0]?.[0] as [
      number,
      number,
    ];
    expect(emitted[0]).toBeLessThanOrEqual(emitted[1]);
  });

  it('does not render header when no label or showValue', () => {
    const w = mount(Slider);
    expect(w.find('.slider__header').exists()).toBe(false);
  });

  it('applies range class', () => {
    const w = mount(Slider, {
      props: { range: true, modelValue: [0, 100] },
    });
    expect(w.find('.slider').classes()).toContain('slider--range');
  });
});

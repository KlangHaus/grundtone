import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Carousel from './Carousel.vue';
import CarouselSlide from './CarouselSlide.vue';
import { h, nextTick } from 'vue';

async function mountCarousel(props = {}, slideCount = 3) {
  const slides = Array.from({ length: slideCount }, (_, i) =>
    h(CarouselSlide, { key: i }, () => `Slide ${i + 1}`),
  );

  const w = mount(Carousel, {
    props,
    slots: { default: () => slides },
  });

  // Wait for children to register via onMounted
  await nextTick();
  await nextTick();

  return w;
}

describe('GTCarousel', () => {
  it('renders slides', async () => {
    const w = await mountCarousel();
    const slides = w.findAll('.carousel__slide');
    expect(slides).toHaveLength(3);
  });

  it('renders controls by default', async () => {
    const w = await mountCarousel();
    expect(w.find('.carousel__prev').exists()).toBe(true);
    expect(w.find('.carousel__next').exists()).toBe(true);
  });

  it('hides controls when showControls is false', async () => {
    const w = await mountCarousel({ showControls: false });
    expect(w.find('.carousel__prev').exists()).toBe(false);
  });

  it('renders indicators', async () => {
    const w = await mountCarousel();
    const indicators = w.findAll('.carousel__indicator');
    expect(indicators).toHaveLength(3);
  });

  it('hides indicators when showIndicators is false', async () => {
    const w = await mountCarousel({ showIndicators: false });
    expect(w.findAll('.carousel__indicator')).toHaveLength(0);
  });

  it('applies fade class', async () => {
    const w = await mountCarousel({ fade: true });
    expect(w.find('.carousel').classes()).toContain('carousel--fade');
  });

  it('navigates to next slide on click', async () => {
    const w = await mountCarousel();
    await w.find('.carousel__next').trigger('click');
    expect(w.emitted('update:modelValue')?.[0]).toEqual([1]);
  });

  it('navigates to prev slide on click', async () => {
    const w = await mountCarousel({ modelValue: 1 });
    await w.find('.carousel__prev').trigger('click');
    expect(w.emitted('update:modelValue')?.[0]).toEqual([0]);
  });

  it('loops around at end', async () => {
    const w = await mountCarousel({ modelValue: 2, loop: true });
    await w.find('.carousel__next').trigger('click');
    expect(w.emitted('update:modelValue')?.[0]).toEqual([0]);
  });

  it('does not loop when loop is false', async () => {
    const w = await mountCarousel({ modelValue: 2, loop: false });
    await w.find('.carousel__next').trigger('click');
    expect(w.emitted('update:modelValue')?.[0]).toEqual([2]);
  });

  it('navigates via indicator click', async () => {
    const w = await mountCarousel();
    const indicators = w.findAll('.carousel__indicator');
    await indicators[2].trigger('click');
    expect(w.emitted('update:modelValue')?.[0]).toEqual([2]);
  });

  it('marks active indicator', async () => {
    const w = await mountCarousel({ modelValue: 1 });
    const indicators = w.findAll('.carousel__indicator');
    expect(indicators[1].classes()).toContain('carousel__indicator--active');
  });

  it('applies aria-roledescription', async () => {
    const w = await mountCarousel();
    expect(w.find('.carousel').attributes('aria-roledescription')).toBe(
      'carousel',
    );
  });

  it('applies custom aria-label', async () => {
    const w = await mountCarousel({ ariaLabel: 'Product gallery' });
    expect(w.find('.carousel').attributes('aria-label')).toBe(
      'Product gallery',
    );
  });

  it('sets transform style for slide mode', async () => {
    const w = await mountCarousel({ modelValue: 1 });
    const track = w.find('.carousel__track');
    expect(track.attributes('style')).toContain('translateX(-100%)');
  });

  it('does not set transform for fade mode', async () => {
    const w = await mountCarousel({ fade: true, modelValue: 1 });
    const track = w.find('.carousel__track');
    const style = track.attributes('style');
    expect(!style || !style.includes('translateX')).toBe(true);
  });

  it('responds to keyboard navigation', async () => {
    const w = await mountCarousel();
    await w.find('.carousel').trigger('keydown', { key: 'ArrowRight' });
    expect(w.emitted('update:modelValue')?.[0]).toEqual([1]);
  });

  it('hides controls with single slide', async () => {
    const w = await mountCarousel({}, 1);
    expect(w.find('.carousel__prev').exists()).toBe(false);
    expect(w.findAll('.carousel__indicator')).toHaveLength(0);
  });
});

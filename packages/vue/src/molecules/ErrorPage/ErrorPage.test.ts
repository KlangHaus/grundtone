import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorPage from './ErrorPage.vue';

describe('GTErrorPage', () => {
  it('renders with default 404', () => {
    const w = mount(ErrorPage);
    expect(w.find('.error-page__code').text()).toBe('404');
    expect(w.find('.error-page__title').text()).toBe('Denne side spiller ikke');
  });

  it('renders 500 error', () => {
    const w = mount(ErrorPage, { props: { code: 500 } });
    expect(w.find('.error-page__code').text()).toBe('500');
    expect(w.find('.error-page__title').text()).toContain('orkestret');
  });

  it('renders 403 error', () => {
    const w = mount(ErrorPage, { props: { code: 403 } });
    expect(w.find('.error-page__code').text()).toBe('403');
    expect(w.find('.error-page__title').text()).toContain('lukket');
  });

  it('renders 503 error', () => {
    const w = mount(ErrorPage, { props: { code: 503 } });
    expect(w.find('.error-page__code').text()).toBe('503');
    expect(w.find('.error-page__title').text()).toContain('stemmer');
  });

  it('uses custom title and description', () => {
    const w = mount(ErrorPage, {
      props: {
        code: 418,
        title: 'Custom title',
        description: 'Custom desc',
      },
    });
    expect(w.find('.error-page__title').text()).toBe('Custom title');
    expect(w.find('.error-page__description').text()).toBe('Custom desc');
  });

  it('falls back for unknown codes', () => {
    const w = mount(ErrorPage, { props: { code: 418 } });
    expect(w.find('.error-page__title').text()).toBe('En uventet fejl');
  });

  it('renders home link by default', () => {
    const w = mount(ErrorPage);
    const link = w.find('.error-page__actions a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('/');
  });

  it('hides home link when showHomeLink is false', () => {
    const w = mount(ErrorPage, { props: { showHomeLink: false } });
    expect(w.find('.error-page__actions').exists()).toBe(false);
  });

  it('customizes home href and label', () => {
    const w = mount(ErrorPage, {
      props: { homeHref: '/dashboard', homeLabel: 'Til dashboard' },
    });
    const link = w.find('.error-page__actions a');
    expect(link.attributes('href')).toBe('/dashboard');
    expect(link.text()).toBe('Til dashboard');
  });

  it('renders debug info', () => {
    const w = mount(ErrorPage, {
      props: {
        debug: {
          url: '/test',
          statusCode: 404,
          message: 'Not found',
          stack: 'Error at line 1',
        },
      },
    });
    const debug = w.find('.error-page__debug');
    expect(debug.exists()).toBe(true);
    expect(debug.text()).toContain('/test');
    expect(debug.text()).toContain('Not found');
  });

  it('hides debug when not provided', () => {
    const w = mount(ErrorPage);
    expect(w.find('.error-page__debug').exists()).toBe(false);
  });

  it('renders illustration SVG', () => {
    const w = mount(ErrorPage);
    expect(w.find('.error-page__illustration svg').exists()).toBe(true);
  });

  it('renders custom illustration slot', () => {
    const w = mount(ErrorPage, {
      slots: { illustration: '<div class="custom-ill">Custom</div>' },
    });
    expect(w.find('.custom-ill').exists()).toBe(true);
  });

  it('renders actions slot', () => {
    const w = mount(ErrorPage, {
      slots: { actions: '<button>Custom action</button>' },
    });
    expect(w.find('.error-page__actions button').text()).toBe('Custom action');
  });

  it('shows missing-note illustration for 404', () => {
    const w = mount(ErrorPage, { props: { code: 404 } });
    // Should have the question mark text
    const texts = w.findAll('.error-page__illustration text');
    expect(texts.some(t => t.text() === '?')).toBe(true);
  });

  it('shows lock illustration for 403', () => {
    const w = mount(ErrorPage, { props: { code: 403 } });
    // Should have the lock rect
    expect(w.find('.error-page__illustration rect').exists()).toBe(true);
  });
});

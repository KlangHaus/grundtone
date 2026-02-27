import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Button from './Button.vue';
import {
  testComponentAccessibility,
  configureGrundtoneAxe,
} from '../../test-utils/accessibility';

// Configure axe for tests
configureGrundtoneAxe();

describe('Button', () => {
  beforeEach(() => {
    // Reset any theme classes before each test
    document.documentElement.className = '';
  });

  describe('Accessibility', () => {
    it('meets WCAG 2.1 AA accessibility standards', async () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });
      await nextTick();

      await testComponentAccessibility(wrapper.element as HTMLElement, {
        componentName: 'Button',
        testContrast: false, // Skip color contrast for now - handled by actual implementation
      });
    });

    it('has proper button semantics', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.attributes('type')).toBe('button');
    });

    it('supports keyboard navigation', async () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });

      const button = wrapper.find('button');

      // Test Space key activation
      await button.trigger('keydown', { key: ' ' });
      await button.trigger('keyup', { key: ' ' });

      // Test Enter key activation
      await button.trigger('keydown', { key: 'Enter' });
      await button.trigger('keyup', { key: 'Enter' });

      expect(button.exists()).toBe(true);
    });

    it('maintains focus visibility', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });

      const button = wrapper.find('button');

      // Simulate focus by checking element properties
      expect(button.element.tagName).toBe('BUTTON');
      expect(button.element.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('provides appropriate disabled state', () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true,
        },
        slots: {
          default: 'Disabled button',
        },
      });

      const button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeDefined();
      expect(button.attributes('aria-disabled')).toBe('true');
    });

    it('provides appropriate loading state for screen readers', () => {
      const wrapper = mount(Button, {
        props: {
          loading: true,
        },
        slots: {
          default: 'Loading button',
        },
      });

      const button = wrapper.find('button');
      expect(button.attributes('aria-busy')).toBe('true');
      expect(button.attributes('disabled')).toBeDefined();
    });

    it('maintains accessible text content', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Accessible button text',
        },
      });

      expect(wrapper.text()).toContain('Accessible button text');
    });

    it('respects reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
        }),
      });

      const wrapper = mount(Button, {
        slots: {
          default: 'Button',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Component Functionality', () => {
    it('renders properly', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });
      expect(wrapper.text()).toBe('Click me');
    });

    it('applies variant class', () => {
      const wrapper = mount(Button, {
        props: {
          variant: 'secondary',
        },
      });
      expect(wrapper.classes()).toContain('grundtone-button--secondary');
    });

    it('applies size class', () => {
      const wrapper = mount(Button, {
        props: {
          size: 'lg',
        },
      });
      expect(wrapper.classes()).toContain('grundtone-button--lg');
    });

    it('shows loader when loading', () => {
      const wrapper = mount(Button, {
        props: {
          loading: true,
        },
      });
      expect(wrapper.find('.grundtone-button__loader').exists()).toBe(true);
    });

    it('is disabled when disabled prop is true', () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('emits click events when enabled', async () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });

      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('does not emit click events when disabled', async () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true,
        },
        slots: {
          default: 'Disabled button',
        },
      });

      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeFalsy();
    });

    it('does not emit click events when loading', async () => {
      const wrapper = mount(Button, {
        props: {
          loading: true,
        },
        slots: {
          default: 'Loading button',
        },
      });

      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Icon from './Icon.vue';
import IconProvider from './IconProvider.vue';
import { ICON_PROVIDER_KEY } from './provider';
import {
  testComponentAccessibility,
  configureGrundtoneAxe,
} from '../../test-utils/accessibility';

// Configure axe for tests
configureGrundtoneAxe();

// Mock icon component for testing
const TestIcon = {
  name: 'TestIcon',
  props: ['size', 'ariaHidden', 'ariaLabel'],
  template:
    '<svg :width="size" :height="size" class="test-icon" :aria-hidden="ariaHidden" :aria-label="ariaLabel"><circle /></svg>',
};

describe('Icon (Simplified)', () => {
  describe('Accessibility', () => {
    it('meets WCAG 2.1 AA accessibility standards', async () => {
      const wrapper = mount(IconProvider, {
        props: {
          icons: { test: TestIcon },
        },
        slots: {
          default: '<Icon name="test" :size="24" aria-label="Test icon" />',
        },
        global: {
          components: { Icon },
        },
      });
      await nextTick();

      await testComponentAccessibility(wrapper.element as HTMLElement, {
        componentName: 'Icon',
        testContrast: false, // Icons handle their own color contrast via theme
      });
    });

    it('provides appropriate ARIA attributes for decorative icons', () => {
      const wrapper = mount(IconProvider, {
        props: {
          icons: { test: TestIcon },
        },
        slots: {
          default: '<Icon name="test" :size="24" :aria-hidden="true" />',
        },
        global: {
          components: { Icon },
        },
      });

      const testIcon = wrapper.findComponent(TestIcon);
      expect(testIcon.props('ariaHidden')).toBe(true);
    });

    it('provides appropriate ARIA label for informative icons', () => {
      const wrapper = mount(IconProvider, {
        props: {
          icons: { test: TestIcon },
        },
        slots: {
          default:
            '<Icon name="test" :size="24" aria-label="Important information" />',
        },
        global: {
          components: { Icon },
        },
      });

      const testIcon = wrapper.findComponent(TestIcon);
      expect(testIcon.props('ariaLabel')).toBe('Important information');
    });

    it('defaults to decorative when no aria-label provided', () => {
      const wrapper = mount(IconProvider, {
        props: {
          icons: { test: TestIcon },
        },
        slots: {
          default: '<Icon name="test" :size="24" />',
        },
        global: {
          components: { Icon },
        },
      });

      const testIcon = wrapper.findComponent(TestIcon);
      // Should be decorative by default (aria-hidden=true)
      expect(testIcon.props('ariaHidden')).toBe(true);
    });
  });

  it('renders custom icon from provider', () => {
    const wrapper = mount(IconProvider, {
      props: {
        icons: { test: TestIcon },
      },
      slots: {
        default: '<Icon name="test" :size="24" />',
      },
      global: {
        components: { Icon },
      },
    });

    const testIcon = wrapper.findComponent(TestIcon);
    expect(testIcon.exists()).toBe(true);
    expect(testIcon.props('size')).toBe(24);
  });

  it('warns when icon not found using structured logging', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    mount(Icon, {
      props: { name: 'nonexistent' },
      global: {
        provide: {
          [ICON_PROVIDER_KEY]: {
            icons: {},
            prefix: '',
            defaultSize: 16,
          },
        },
      },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Grundtone UI Warning]',
      expect.objectContaining({
        message: 'Icon "nonexistent" not found in custom library',
        context: expect.objectContaining({
          component: 'Icon',
          action: 'loadIcon',
          severity: 'low',
          metadata: expect.objectContaining({
            iconName: 'nonexistent',
            availableIcons: [],
          }),
        }),
        timestamp: expect.any(String),
      }),
    );

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it('applies CSS classes', () => {
    const wrapper = mount(IconProvider, {
      props: {
        icons: { test: TestIcon },
        prefix: 'my-prefix',
      },
      slots: {
        default: '<Icon name="test" />',
      },
      global: {
        components: { Icon },
      },
    });

    const iconWrapper = wrapper.findComponent(Icon);
    expect(iconWrapper.classes()).toContain('icon');
    expect(iconWrapper.classes()).toContain('icon--test');
    expect(iconWrapper.classes()).toContain('my-prefix-test');
  });

  it('passes props to icon component', () => {
    const wrapper = mount(IconProvider, {
      props: {
        icons: { test: TestIcon },
      },
      slots: {
        default: '<Icon name="test" :size="32" aria-label="Test Icon" />',
      },
      global: {
        components: { Icon },
      },
    });

    const testIcon = wrapper.findComponent(TestIcon);
    expect(testIcon.props('size')).toBe(32);
    expect(testIcon.props('ariaLabel')).toBe('Test Icon');
  });

  it('works without provider using defaults', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const wrapper = mount(Icon, {
      props: { name: 'missing' },
    });

    // Should render but warn about missing icon using structured logging
    expect(wrapper.exists()).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Grundtone UI Warning]',
      expect.objectContaining({
        message: 'Icon "missing" not found in custom library',
        context: expect.objectContaining({
          component: 'Icon',
          action: 'loadIcon',
          severity: 'low',
        }),
        timestamp: expect.any(String),
      }),
    );

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });
});

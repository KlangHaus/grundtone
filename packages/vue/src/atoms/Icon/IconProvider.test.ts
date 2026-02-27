import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconProvider from './IconProvider.vue';
import { ICON_PROVIDER_KEY } from './provider';
import { inject } from 'vue';

describe('IconProvider', () => {
  it('renders correctly with slot content', () => {
    const wrapper = mount(IconProvider, {
      slots: {
        default: '<div data-testid="child">Child content</div>',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="child"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Child content');
  });

  it('provides icon configuration to child components', () => {
    const childComponent = {
      template: '<div>{{ iconConfig?.defaultSize || "no config" }}</div>',
      setup() {
        const iconConfig = inject(ICON_PROVIDER_KEY);
        return { iconConfig };
      },
    };

    const wrapper = mount(IconProvider, {
      props: {
        defaultSize: 20,
      },
      slots: {
        default: childComponent,
      },
    });

    expect(wrapper.text()).toContain('20');
  });

  it('applies default props correctly', () => {
    const wrapper = mount(IconProvider);

    // IconProvider should exist and render without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('passes prefix prop to provide', () => {
    const prefix = 'test-prefix';
    const childComponent = {
      template: '<div>{{ iconConfig?.prefix || "no-prefix" }}</div>',
      setup() {
        const iconConfig = inject(ICON_PROVIDER_KEY);
        return { iconConfig };
      },
    };

    const wrapper = mount(IconProvider, {
      props: { prefix },
      slots: {
        default: childComponent,
      },
    });

    expect(wrapper.text()).toBe(prefix);
  });

  it('passes defaultSize prop to provide', () => {
    const defaultSize = 24;
    const childComponent = {
      template: '<div>{{ iconConfig?.defaultSize }}</div>',
      setup() {
        const iconConfig = inject(ICON_PROVIDER_KEY);
        return { iconConfig };
      },
    };

    const wrapper = mount(IconProvider, {
      props: { defaultSize },
      slots: {
        default: childComponent,
      },
    });

    expect(wrapper.text()).toBe(String(defaultSize));
  });

  it('handles multiple nested providers correctly', () => {
    const innerChild = {
      template: '<div>{{ iconConfig?.prefix || "no-prefix" }}</div>',
      setup() {
        const iconConfig = inject(ICON_PROVIDER_KEY);
        return { iconConfig };
      },
    };

    const outerProvider = mount(IconProvider, {
      props: { prefix: 'outer' },
      slots: {
        default: {
          template: `
            <IconProvider prefix="inner">
              <inner-child />
            </IconProvider>
          `,
          components: { 'inner-child': innerChild, IconProvider },
        },
      },
    });

    // Inner provider should override outer provider
    expect(outerProvider.text()).toBe('inner');
  });
});

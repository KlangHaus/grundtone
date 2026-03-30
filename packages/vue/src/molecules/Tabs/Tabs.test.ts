import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tabs from './Tabs.vue';
import TabPanel from './TabPanel.vue';
import { GT_ICON_REGISTRY_KEY } from '../../atoms/Icon/types';
import { iconRegistry } from '@grundtone/icons';

const BASE = 'gt-tabs';

const tabs = [
  { id: 'one', label: 'Tab One' },
  { id: 'two', label: 'Tab Two' },
  { id: 'three', label: 'Tab Three' },
];

function mountTabs(props = {}) {
  return mount(Tabs, {
    props: { tabs, ...props },
    slots: { default: '<div>Panel content</div>' },
    global: {
      provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
    },
  });
}

describe('Tabs', () => {
  it('renders with base class', () => {
    const wrapper = mountTabs();
    expect(wrapper.classes()).toContain(BASE);
  });

  it('defaults to underline variant', () => {
    const wrapper = mountTabs();
    expect(wrapper.classes()).toContain(`${BASE}--underline`);
  });

  it('renders all variant classes', () => {
    for (const variant of ['underline', 'segment', 'pill'] as const) {
      const wrapper = mountTabs({ variant });
      expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
    }
  });

  it('renders all tab buttons', () => {
    const wrapper = mountTabs();
    expect(wrapper.findAll(`[role="tab"]`)).toHaveLength(3);
  });

  it('renders tab labels', () => {
    const wrapper = mountTabs();
    const tabEls = wrapper.findAll(`[role="tab"]`);
    expect(tabEls[0].text()).toContain('Tab One');
    expect(tabEls[1].text()).toContain('Tab Two');
  });

  it('first tab is active by default', () => {
    const wrapper = mountTabs();
    const first = wrapper.find(`[role="tab"]`);
    expect(first.attributes('aria-selected')).toBe('true');
    expect(first.classes()).toContain(`${BASE}__tab--active`);
  });

  it('respects modelValue', () => {
    const wrapper = mountTabs({ modelValue: 'two' });
    const tabEls = wrapper.findAll(`[role="tab"]`);
    expect(tabEls[1].attributes('aria-selected')).toBe('true');
    expect(tabEls[0].attributes('aria-selected')).toBe('false');
  });

  it('emits update:modelValue on tab click', async () => {
    const wrapper = mountTabs();
    await wrapper.findAll(`[role="tab"]`)[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['two']);
  });

  it('changes active tab on click', async () => {
    const wrapper = mountTabs();
    await wrapper.findAll(`[role="tab"]`)[2].trigger('click');
    const tabEls = wrapper.findAll(`[role="tab"]`);
    expect(tabEls[2].classes()).toContain(`${BASE}__tab--active`);
    expect(tabEls[0].classes()).not.toContain(`${BASE}__tab--active`);
  });

  it('tablist has role="tablist"', () => {
    const wrapper = mountTabs();
    expect(wrapper.find(`[role="tablist"]`).exists()).toBe(true);
  });

  it('tablist has aria-label', () => {
    const wrapper = mountTabs();
    expect(wrapper.find(`[role="tablist"]`).attributes('aria-label')).toBe(
      'Faner',
    );
  });

  it('tabs have aria-controls', () => {
    const wrapper = mountTabs();
    const tab = wrapper.find(`[role="tab"]`);
    expect(tab.attributes('aria-controls')).toBe('panel-one');
  });

  it('active tab has tabindex=0, others -1', () => {
    const wrapper = mountTabs();
    const tabEls = wrapper.findAll(`[role="tab"]`);
    expect(tabEls[0].attributes('tabindex')).toBe('0');
    expect(tabEls[1].attributes('tabindex')).toBe('-1');
  });

  it('renders icons when provided', () => {
    const iconTabs = [
      { id: 'a', label: 'A', icon: 'check' },
      { id: 'b', label: 'B', icon: 'close' },
    ];
    const wrapper = mount(Tabs, {
      props: { tabs: iconTabs },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.findAll(`.${BASE}__icon`)).toHaveLength(2);
  });
});

describe('TabPanel', () => {
  it('renders when active', () => {
    const wrapper = mount(
      {
        template: `
          <Tabs :tabs="tabs" model-value="one">
            <TabPanel id="one"><p>Content one</p></TabPanel>
            <TabPanel id="two"><p>Content two</p></TabPanel>
          </Tabs>
        `,
        components: { Tabs, TabPanel },
        setup: () => ({ tabs }),
      },
      {
        global: {
          provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
        },
      },
    );
    expect(wrapper.find(`[role="tabpanel"]`).text()).toContain('Content one');
  });

  it('hides inactive panel', () => {
    const wrapper = mount(
      {
        template: `
          <Tabs :tabs="tabs" model-value="one">
            <TabPanel id="one"><p>One</p></TabPanel>
            <TabPanel id="two"><p>Two</p></TabPanel>
          </Tabs>
        `,
        components: { Tabs, TabPanel },
        setup: () => ({ tabs }),
      },
      {
        global: {
          provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
        },
      },
    );
    const panels = wrapper.findAll(`[role="tabpanel"]`);
    expect(panels).toHaveLength(1);
    expect(panels[0].text()).toContain('One');
  });

  it('panel has aria-labelledby linking to tab', () => {
    const wrapper = mount(
      {
        template: `
          <Tabs :tabs="tabs" model-value="one">
            <TabPanel id="one"><p>Content</p></TabPanel>
          </Tabs>
        `,
        components: { Tabs, TabPanel },
        setup: () => ({ tabs }),
      },
      {
        global: {
          provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
        },
      },
    );
    expect(
      wrapper.find(`[role="tabpanel"]`).attributes('aria-labelledby'),
    ).toBe('tab-one');
  });

  it('switches panel on tab click', async () => {
    const wrapper = mount(
      {
        template: `
          <Tabs :tabs="tabs">
            <TabPanel id="one"><p>First</p></TabPanel>
            <TabPanel id="two"><p>Second</p></TabPanel>
          </Tabs>
        `,
        components: { Tabs, TabPanel },
        setup: () => ({ tabs }),
      },
      {
        global: {
          provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
        },
      },
    );
    await wrapper.findAll(`[role="tab"]`)[1].trigger('click');
    expect(wrapper.find(`[role="tabpanel"]`).text()).toContain('Second');
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OverflowMenu from './OverflowMenu.vue';

const items = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete', danger: true },
];

function mountMenu(props = {}) {
  return mount(OverflowMenu, { props: { items, ...props } });
}

describe('OverflowMenu', () => {
  it('renders trigger button', () => {
    const wrapper = mountMenu();
    expect(wrapper.find('.gt-overflow-menu__trigger').exists()).toBe(true);
  });

  it('panel is hidden by default', () => {
    const wrapper = mountMenu();
    expect(wrapper.find('.gt-overflow-menu__panel').exists()).toBe(false);
  });

  it('opens on trigger click', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.find('.gt-overflow-menu__panel').exists()).toBe(true);
    expect(wrapper.find('.gt-overflow-menu--open').exists()).toBe(true);
  });

  it('renders all items when open', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.findAll('.gt-overflow-menu__link')).toHaveLength(3);
  });

  it('renders item labels', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    const links = wrapper.findAll('.gt-overflow-menu__link');
    expect(links[0].text()).toBe('Edit');
    expect(links[2].text()).toBe('Delete');
  });

  it('emits select on item click', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    await wrapper.findAll('.gt-overflow-menu__link')[0].trigger('click');
    expect(wrapper.emitted('select')![0][0]).toEqual(items[0]);
  });

  it('closes after selection', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    await wrapper.findAll('.gt-overflow-menu__link')[0].trigger('click');
    expect(wrapper.find('.gt-overflow-menu__panel').exists()).toBe(false);
  });

  it('applies danger class', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.findAll('.gt-overflow-menu__link')[2].classes()).toContain(
      'gt-overflow-menu__link--danger',
    );
  });

  it('applies active class', async () => {
    const activeItems = [
      { label: 'Newest', active: true },
      { label: 'Oldest' },
    ];
    const wrapper = mount(OverflowMenu, { props: { items: activeItems } });
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.findAll('.gt-overflow-menu__link')[0].classes()).toContain(
      'gt-overflow-menu__link--active',
    );
  });

  it('applies disabled class and aria-disabled', async () => {
    const disabledItems = [{ label: 'Locked', disabled: true }];
    const wrapper = mount(OverflowMenu, {
      props: { items: disabledItems },
    });
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    const link = wrapper.find('.gt-overflow-menu__link');
    expect(link.classes()).toContain('gt-overflow-menu__link--disabled');
    expect(link.attributes('aria-disabled')).toBe('true');
  });

  it('does not emit select for disabled items', async () => {
    const disabledItems = [{ label: 'Locked', disabled: true }];
    const wrapper = mount(OverflowMenu, {
      props: { items: disabledItems },
    });
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    await wrapper.find('.gt-overflow-menu__link').trigger('click');
    expect(wrapper.emitted('select')).toBeFalsy();
  });

  it('has aria-haspopup and aria-expanded', () => {
    const wrapper = mountMenu();
    const trigger = wrapper.find('.gt-overflow-menu__trigger');
    expect(trigger.attributes('aria-haspopup')).toBe('menu');
    expect(trigger.attributes('aria-expanded')).toBe('false');
  });

  it('renders custom label on trigger', () => {
    const wrapper = mountMenu({ label: 'Sortér' });
    expect(wrapper.find('.gt-overflow-menu__trigger').text()).toBe('Sortér');
  });

  it('accepts align prop', () => {
    const wrapper = mountMenu({ align: 'left' });
    expect(wrapper.exists()).toBe(true);
  });

  it('applies bordered class when label is provided', () => {
    const wrapper = mountMenu({ label: 'Sortér' });
    expect(wrapper.find('.gt-overflow-menu--bordered').exists()).toBe(true);
  });

  it('renders panel with role="menu"', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.find('[role="menu"]').exists()).toBe(true);
  });

  it('renders links as <a> when href provided', async () => {
    const linkItems = [{ label: 'Go', href: '/page' }];
    const wrapper = mount(OverflowMenu, { props: { items: linkItems } });
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.find('.gt-overflow-menu__link').element.tagName).toBe('A');
  });

  it('closes on Escape key', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.gt-overflow-menu__trigger').trigger('click');
    expect(wrapper.find('.gt-overflow-menu__panel').exists()).toBe(true);
    await wrapper
      .find('.gt-overflow-menu')
      .trigger('keydown', { key: 'Escape' });
    expect(wrapper.find('.gt-overflow-menu__panel').exists()).toBe(false);
  });
});

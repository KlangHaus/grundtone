import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SummaryList from './SummaryList.vue';
import SummaryItem from './SummaryItem.vue';

const _slots = {
  default: () => [
    {
      setup: () => ({}),
      render: () => null,
    },
  ],
};

function mountList(props = {}, listSlots = {}) {
  return mount(SummaryList, {
    props,
    slots: listSlots,
  });
}

describe('GTSummaryList', () => {
  it('renders as dl element', () => {
    const w = mountList();
    expect(w.find('dl').exists()).toBe(true);
  });

  it('applies base class', () => {
    const w = mountList();
    expect(w.find('dl').classes()).toContain('summary-list');
  });

  it('applies borderless variant', () => {
    const w = mountList({ variant: 'borderless' });
    expect(w.find('dl').classes()).toContain('summary-list--borderless');
  });

  it('renders card wrapper', () => {
    const w = mountList({ variant: 'card', title: 'Profile' });
    expect(w.find('.summary-card').exists()).toBe(true);
    expect(w.find('.summary-card__title').text()).toBe('Profile');
    expect(w.find('dl').exists()).toBe(true);
  });

  it('renders card title with correct tag', () => {
    const w = mountList({ variant: 'card', title: 'Test', titleTag: 'h3' });
    expect(w.find('h3.summary-card__title').exists()).toBe(true);
  });

  it('renders card actions slot', () => {
    const w = mountList(
      { variant: 'card', title: 'Test' },
      { actions: () => 'Delete', default: () => '' },
    );
    expect(w.find('.summary-card__actions').text()).toBe('Delete');
  });
});

describe('GTSummaryItem', () => {
  it('renders key and value', () => {
    const w = mount(SummaryItem, {
      props: { label: 'Name' },
      slots: { default: () => 'Alice' },
    });
    expect(w.find('.summary-list__key').text()).toBe('Name');
    expect(w.find('.summary-list__value').text()).toBe('Alice');
  });

  it('renders action button', () => {
    const w = mount(SummaryItem, {
      props: { label: 'Name', action: 'Change' },
      slots: { default: () => 'Alice' },
    });
    const btn = w.find('.summary-list__action');
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toContain('Change');
  });

  it('renders visually hidden action label', () => {
    const w = mount(SummaryItem, {
      props: { label: 'Name', action: 'Change', actionLabel: 'name' },
      slots: { default: () => 'Alice' },
    });
    expect(w.find('.sr-only').text()).toBe(', name');
  });

  it('emits action event on click', async () => {
    const w = mount(SummaryItem, {
      props: { label: 'Name', action: 'Change' },
      slots: { default: () => 'Alice' },
    });
    await w.find('.summary-list__action').trigger('click');
    expect(w.emitted('action')).toHaveLength(1);
  });

  it('adds no-actions class when no action', () => {
    const w = mount(SummaryItem, {
      props: { label: 'Name' },
      slots: { default: () => 'Alice' },
    });
    expect(w.find('.summary-list__row').classes()).toContain(
      'summary-list__row--no-actions',
    );
  });

  it('renders custom actions slot', () => {
    const w = mount(SummaryItem, {
      props: { label: 'Name' },
      slots: {
        default: () => 'Alice',
        actions: () => 'Custom action',
      },
    });
    expect(w.find('.summary-list__actions').text()).toBe('Custom action');
  });
});

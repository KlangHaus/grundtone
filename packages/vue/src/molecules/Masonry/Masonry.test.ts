import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Masonry from './Masonry.vue';

const BASE = 'gt-masonry';

const items = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('Masonry', () => {
  it('renders with base class', () => {
    const wrapper = mount(Masonry, {
      props: { items },
    });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders correct number of items', () => {
    const wrapper = mount(Masonry, {
      props: { items },
      slots: {
        default: ({ item }: { item: string }) => item,
      },
    });
    const itemEls = wrapper.findAll(`.${BASE}__item`);
    expect(itemEls).toHaveLength(items.length);
  });

  it('distributes items across ssrColumns columns', () => {
    const wrapper = mount(Masonry, {
      props: { items, ssrColumns: 2 },
    });
    const cols = wrapper.findAll(`.${BASE}__column`);
    expect(cols).toHaveLength(2);
  });

  it('applies gap style', () => {
    const wrapper = mount(Masonry, {
      props: { items, gap: 30 },
    });
    expect(wrapper.attributes('style')).toContain('gap: 30px');
  });

  it('has list role for accessibility', () => {
    const wrapper = mount(Masonry, {
      props: { items },
    });
    expect(wrapper.attributes('role')).toBe('list');
  });

  it('items have listitem role', () => {
    const wrapper = mount(Masonry, {
      props: { items },
      slots: {
        default: ({ item }: { item: string }) => item,
      },
    });
    const firstItem = wrapper.find(`.${BASE}__item`);
    expect(firstItem.attributes('role')).toBe('listitem');
  });

  it('provides item and index to scoped slot', () => {
    const slotArgs: Array<{ item: unknown; index: number }> = [];
    mount(Masonry, {
      props: { items: ['x', 'y'], ssrColumns: 1 },
      slots: {
        default: (props: { item: unknown; index: number }) => {
          slotArgs.push(props);
          return String(props.item);
        },
      },
    });
    expect(slotArgs).toHaveLength(2);
    expect(slotArgs[0]).toEqual({ item: 'x', index: 0 });
    expect(slotArgs[1]).toEqual({ item: 'y', index: 1 });
  });

  it('renders empty when no items', () => {
    const wrapper = mount(Masonry, {
      props: { items: [] },
    });
    expect(wrapper.findAll(`.${BASE}__item`)).toHaveLength(0);
  });
});

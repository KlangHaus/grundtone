import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from './Table.vue';
import type { TableColumn } from './types';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age', numeric: true },
];

const rows = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Carol', age: 35 },
];

describe('GTTable', () => {
  it('renders columns and rows', () => {
    const w = mount(Table, { props: { columns, rows } });
    const ths = w.findAll('th');
    expect(ths).toHaveLength(2);
    expect(ths[0].text()).toBe('Name');
    expect(ths[1].text()).toBe('Age');

    const tds = w.findAll('tbody td');
    expect(tds).toHaveLength(6);
    expect(tds[0].text()).toBe('Alice');
    expect(tds[1].text()).toBe('30');
  });

  it('applies variant class', () => {
    const w = mount(Table, {
      props: { columns, rows, variant: 'borderless' },
    });
    expect(w.find('table').classes()).toContain('table--borderless');
  });

  it('applies zebra variant', () => {
    const w = mount(Table, {
      props: { columns, rows, variant: 'zebra' },
    });
    expect(w.find('table').classes()).toContain('table--zebra');
  });

  it('applies density classes', () => {
    const compact = mount(Table, {
      props: { columns, rows, density: 'compact' },
    });
    expect(compact.find('table').classes()).toContain('table--compact');

    const extraCompact = mount(Table, {
      props: { columns, rows, density: 'extra-compact' },
    });
    expect(extraCompact.find('table').classes()).toContain(
      'table--extra-compact',
    );
  });

  it('striped prop maps to zebra variant', () => {
    const w = mount(Table, {
      props: { columns, rows, striped: true },
    });
    expect(w.find('table').classes()).toContain('table--zebra');
  });

  it('sorts on click and emits events', async () => {
    const sortColumns: TableColumn[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'age', label: 'Age', numeric: true, sortable: true },
    ];
    const w = mount(Table, { props: { columns: sortColumns, rows } });

    // Click name sort button
    const sortBtn = w.find('.table__sort');
    await sortBtn.trigger('click');

    expect(w.emitted('update:sortBy')?.[0]).toEqual(['name']);
    expect(w.emitted('update:sortDirection')?.[0]).toEqual(['asc']);

    // Verify aria-sort is set
    const th = w.findAll('th')[0];
    expect(th.attributes('aria-sort')).toBe('ascending');

    // Verify active class
    expect(sortBtn.classes()).toContain('table__sort--active');

    // Click again to toggle desc
    await sortBtn.trigger('click');
    expect(w.emitted('update:sortDirection')?.[1]).toEqual(['desc']);
  });

  it('renders checkboxes when selectable', () => {
    const w = mount(Table, {
      props: { columns, rows, selectable: true, modelValue: [] },
    });

    // Header checkbox + 3 row checkboxes
    const checkboxes = w.findAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(4);
  });

  it('emits selection on checkbox click', async () => {
    const w = mount(Table, {
      props: { columns, rows, selectable: true, modelValue: [] },
    });

    // Click first row checkbox
    const rowCheckboxes = w.findAll('tbody input[type="checkbox"]');
    await rowCheckboxes[0].setValue(true);

    expect(w.emitted('update:modelValue')?.[0]).toEqual([[0]]);
  });

  it('select-all toggles all rows', async () => {
    const w = mount(Table, {
      props: { columns, rows, selectable: true, modelValue: [] },
    });

    const headerCheckbox = w.find('thead input[type="checkbox"]');
    await headerCheckbox.trigger('change');

    expect(w.emitted('update:modelValue')?.[0]).toEqual([[0, 1, 2]]);
  });

  it('renders data-label for responsive mode', () => {
    const w = mount(Table, {
      props: { columns, rows, responsive: true },
    });

    const td = w.find('tbody td');
    expect(td.attributes('data-label')).toBe('Name');
  });

  it('renders caption with sr-only by default', () => {
    const w = mount(Table, {
      props: { columns, rows, caption: 'Users' },
    });

    const caption = w.find('caption');
    expect(caption.exists()).toBe(true);
    expect(caption.text()).toBe('Users');
    expect(caption.classes()).toContain('sr-only');
  });

  it('renders visible caption', () => {
    const w = mount(Table, {
      props: { columns, rows, caption: 'Users', captionVisible: true },
    });

    const caption = w.find('caption');
    expect(caption.classes()).not.toContain('sr-only');
  });

  it('applies numeric class to cells', () => {
    const w = mount(Table, { props: { columns, rows } });

    const ageTh = w.findAll('th')[1];
    expect(ageTh.classes()).toContain('table__num');

    const ageTd = w.findAll('tbody tr:first-child td')[1];
    expect(ageTd.classes()).toContain('table__num');
  });

  it('renders scoped slot content', () => {
    const w = mount(Table, {
      props: { columns, rows },
      slots: {
        'cell-name': ({ value }: { value: unknown }) => `Custom: ${value}`,
      },
    });

    const td = w.find('tbody td');
    expect(td.text()).toBe('Custom: Alice');
  });

  it('selected indices remain stable across sort', async () => {
    const sortColumns: TableColumn[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'age', label: 'Age', numeric: true },
    ];
    // Select Alice (index 0)
    const w = mount(Table, {
      props: {
        columns: sortColumns,
        rows,
        selectable: true,
        modelValue: [0],
      },
    });

    // Sort by name — order changes but selection stays on original index 0
    await w.find('.table__sort').trigger('click');

    // Alice is still at original index 0, so first row in sorted view should be selected
    const selectedRows = w.findAll('.table__row--selected');
    expect(selectedRows).toHaveLength(1);
  });
});

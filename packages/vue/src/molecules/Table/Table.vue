<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import type { TableProps, SortDirection } from './types';

  const props = withDefaults(defineProps<TableProps>(), {
    variant: 'default',
    density: 'normal',
    responsive: false,
    selectable: false,
    modelValue: () => [],
    caption: undefined,
    captionVisible: false,
    sortBy: undefined,
    sortDirection: undefined,
    striped: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [indices: number[]];
    'update:sortBy': [key: string];
    'update:sortDirection': [dir: SortDirection];
  }>();

  // Internal sort state
  const internalSortBy = ref(props.sortBy ?? '');
  const internalSortDir = ref<SortDirection>(props.sortDirection ?? 'asc');

  watch(
    () => props.sortBy,
    val => {
      if (val !== undefined) internalSortBy.value = val;
    },
  );
  watch(
    () => props.sortDirection,
    val => {
      if (val !== undefined) internalSortDir.value = val;
    },
  );

  const effectiveVariant = computed(() =>
    props.striped ? 'zebra' : props.variant,
  );

  const tableClasses = computed(() => {
    const classes = ['table'];
    if (effectiveVariant.value !== 'default') {
      classes.push(`table--${effectiveVariant.value}`);
    }
    if (props.density !== 'normal') {
      classes.push(`table--${props.density}`);
    }
    return classes;
  });

  // Sorted row indices (indices into original rows array)
  const sortedIndices = computed(() => {
    const indices = props.rows.map((_, i) => i);

    if (!internalSortBy.value) return indices;

    const key = internalSortBy.value;
    const dir = internalSortDir.value;

    indices.sort((a, b) => {
      const aVal = props.rows[a][key];
      const bVal = props.rows[b][key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let cmp: number;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal;
      } else {
        cmp = String(aVal).localeCompare(String(bVal), 'da');
      }

      return dir === 'asc' ? cmp : -cmp;
    });

    return indices;
  });

  function toggleSort(key: string) {
    if (internalSortBy.value === key) {
      const newDir = internalSortDir.value === 'asc' ? 'desc' : 'asc';
      internalSortDir.value = newDir;
      emit('update:sortDirection', newDir);
    } else {
      internalSortBy.value = key;
      internalSortDir.value = 'asc';
      emit('update:sortBy', key);
      emit('update:sortDirection', 'asc');
    }
  }

  function ariaSortValue(key: string) {
    if (internalSortBy.value !== key) return undefined;
    return internalSortDir.value === 'asc' ? 'ascending' : 'descending';
  }

  // Selection
  const selected = computed(() => new Set(props.modelValue));

  const allSelected = computed(
    () =>
      props.rows.length > 0 && props.modelValue.length === props.rows.length,
  );

  const someSelected = computed(
    () => props.modelValue.length > 0 && !allSelected.value,
  );

  function toggleRow(originalIndex: number) {
    const current = new Set(props.modelValue);
    if (current.has(originalIndex)) {
      current.delete(originalIndex);
    } else {
      current.add(originalIndex);
    }
    emit('update:modelValue', Array.from(current));
  }

  function toggleAll() {
    if (allSelected.value) {
      emit('update:modelValue', []);
    } else {
      emit('update:modelValue', props.rows.map((_, i) => i));
    }
  }
</script>

<template>
  <div
    :class="[
      'table-wrapper',
      { 'table-wrapper--responsive': responsive },
    ]"
  >
    <table :class="tableClasses">
      <caption
        v-if="caption"
        :class="{ 'sr-only': !captionVisible }"
      >
        {{ caption }}
      </caption>

      <thead>
        <tr>
          <th v-if="selectable" class="table__select">
            <input
              type="checkbox"
              :checked="allSelected"
              :indeterminate="someSelected"
              :aria-label="`Vælg alle rækker`"
              @change="toggleAll"
            />
          </th>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="{ table__num: col.numeric }"
            :style="col.width ? { width: col.width } : undefined"
            :aria-sort="ariaSortValue(col.key)"
          >
            <button
              v-if="col.sortable"
              type="button"
              :class="[
                'table__sort',
                {
                  'table__sort--active': internalSortBy === col.key,
                },
              ]"
              @click="toggleSort(col.key)"
            >
              {{ col.label }}
              <span class="table__sort-icon" aria-hidden="true">
                <template v-if="internalSortBy === col.key">
                  {{ internalSortDir === 'asc' ? '▲' : '▼' }}
                </template>
                <template v-else>⇅</template>
              </span>
            </button>
            <template v-else>{{ col.label }}</template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="origIdx in sortedIndices"
          :key="origIdx"
          :class="{
            'table__row--selected': selectable && selected.has(origIdx),
          }"
        >
          <td v-if="selectable" class="table__select">
            <input
              type="checkbox"
              :checked="selected.has(origIdx)"
              :aria-label="`Vælg række ${origIdx + 1}`"
              @change="toggleRow(origIdx)"
            />
          </td>
          <td
            v-for="col in columns"
            :key="col.key"
            :class="{ table__num: col.numeric }"
            :data-label="responsive ? col.label : undefined"
          >
            <slot
              :name="`cell-${col.key}`"
              :row="rows[origIdx]"
              :value="rows[origIdx][col.key]"
            >
              {{ rows[origIdx][col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
  // Table styles are provided by the design system (_table.scss).
  // No scoped styles needed — the component uses BEM classes directly.
</style>

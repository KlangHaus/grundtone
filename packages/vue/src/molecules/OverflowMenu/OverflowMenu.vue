<script setup lang="ts">
  import { ref, nextTick, onBeforeUnmount } from 'vue';
  import { generateId } from '@grundtone/utils';
  import type { OverflowMenuProps, OverflowMenuItem } from './types';

  const props = withDefaults(defineProps<OverflowMenuProps>(), {
    label: undefined,
    align: 'right',
    ariaLabel: 'Flere muligheder',
  });

  const emit = defineEmits<{
    select: [item: OverflowMenuItem];
  }>();

  const menuId = generateId('overflow');
  const isOpen = ref(false);
  const triggerRef = ref<HTMLElement | null>(null);
  const panelRef = ref<HTMLElement | null>(null);
  const panelPosition = ref<Record<string, string>>({});

  function toggle() {
    if (isOpen.value) close();
    else open();
  }

  function computePosition() {
    if (!triggerRef.value) return;
    const rect = triggerRef.value.getBoundingClientRect();
    const viewH = window.innerHeight;
    const viewW = window.innerWidth;
    const style: Record<string, string> = { display: 'block' };

    // Vertical: open upward if trigger is in the bottom 40% of viewport
    if (rect.bottom > viewH * 0.6) {
      style.bottom = '100%';
      style.top = 'auto';
      style.marginBottom = '0.125rem';
      style.marginTop = '0';
    } else {
      style.top = '100%';
      style.bottom = 'auto';
      style.marginTop = '0.125rem';
      style.marginBottom = '0';
    }

    // Horizontal: flip to left-aligned if trigger is in the right 30% of viewport
    if (props.align === 'left' || rect.left < viewW * 0.3) {
      style.left = '0';
      style.right = 'auto';
    } else {
      style.right = '0';
      style.left = 'auto';
    }

    panelPosition.value = style;
  }

  function open() {
    isOpen.value = true;
    document.addEventListener('click', onOutsideClick);
    nextTick(() => {
      computePosition();
      const first = panelRef.value?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      );
      first?.focus();
    });
  }

  function close() {
    isOpen.value = false;
    document.removeEventListener('click', onOutsideClick);
    triggerRef.value?.focus();
  }

  function onOutsideClick(e: Event) {
    const target = e.target as HTMLElement;
    if (triggerRef.value?.contains(target) || panelRef.value?.contains(target))
      return;
    close();
  }

  function onSelect(item: OverflowMenuItem) {
    if (item.disabled) return;
    emit('select', item);
    close();
  }

  function onKeydown(e: Event) {
    const ke = e as { key?: string };
    if (!ke.key) return;
    const items = Array.from(
      panelRef.value?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ) ?? [],
    );
    const idx = items.indexOf(document.activeElement as HTMLElement);

    switch (ke.key) {
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', onOutsideClick);
  });
</script>

<template>
  <div
    :class="[
      'overflow-menu',
      {
        'overflow-menu--open': isOpen,
        'overflow-menu--bordered': !!label,
      },
    ]"
    @keydown="onKeydown"
  >
    <button
      ref="triggerRef"
      class="overflow-menu__trigger"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      :aria-controls="menuId"
      :aria-label="label ? undefined : ariaLabel"
      @click.stop="toggle"
    >
      <span v-if="label">{{ label }}</span>
      <span v-else aria-hidden="true">&#x22EF;</span>
    </button>

    <div
      v-if="isOpen"
      :id="menuId"
      ref="panelRef"
      class="overflow-menu__panel"
      role="menu"
      :style="panelPosition"
    >
      <ul class="overflow-menu__list">
        <li v-for="(item, i) in items" :key="i" class="overflow-menu__item">
          <component
            :is="item.href ? 'a' : 'button'"
            :href="item.href"
            :class="[
              'overflow-menu__link',
              {
                'overflow-menu__link--active': item.active,
                'overflow-menu__link--danger': item.danger,
                'overflow-menu__link--disabled': item.disabled,
              },
            ]"
            role="menuitem"
            :tabindex="item.disabled ? -1 : 0"
            :aria-disabled="item.disabled || undefined"
            @click.prevent="onSelect(item)"
          >
            {{ item.label }}
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

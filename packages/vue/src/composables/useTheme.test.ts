import { describe, it, expect } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { THEME_INJECTION_KEY } from '@grundtone/core';
import { useTheme } from './useTheme';

const TestConsumer = defineComponent({
  setup() {
    const ctx = useTheme();
    return { ctx };
  },
  render() {
    return h('div', this.ctx.mode.value);
  },
});

describe('useTheme', () => {
  it('throws when no provider exists', () => {
    expect(() => {
      mount(TestConsumer);
    }).toThrow('useTheme() requires a Grundtone ThemeProvider ancestor');
  });

  it('returns context when provider exists', () => {
    const mode = ref<'light' | 'dark' | 'auto'>('light');
    const mockContext = {
      theme: ref({}) as any,
      mode,
      isDark: ref(false),
      isLight: ref(true),
      setMode: () => {},
      toggleMode: () => {},
      applyTheme: () => {},
    };

    const wrapper = mount(TestConsumer, {
      global: {
        provide: { [THEME_INJECTION_KEY as symbol]: mockContext },
      },
    });

    expect(wrapper.text()).toBe('light');
  });
});

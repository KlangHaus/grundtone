import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import AppShell from './AppShell.vue';

const BASE = 'gt-app-shell';

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
}

async function mountShell(props: Record<string, unknown> = {}) {
  const wrapper = mount(AppShell, {
    props: { toasts: false, ...props },
    slots: {
      sidebar: '<a href="#" class="nav-item">Projekter</a>',
      topbar: '<span class="crumb">Overblik</span>',
      default: '<p class="screen">Skærm-indhold</p>',
    },
    global: { stubs: { Teleport: true } },
  });
  await flushPromises();
  return wrapper;
}

afterEach(() => vi.unstubAllGlobals());

describe('AppShell', () => {
  describe('desktop (≥ breakpoint)', () => {
    it('renders a persistent sidebar nav, topbar and main content', async () => {
      stubMatchMedia(false);
      const wrapper = await mountShell();
      const nav = wrapper.find(`.${BASE}__nav`);
      expect(nav.exists()).toBe(true);
      expect(nav.attributes('aria-label')).toBe('Hovednavigation');
      expect(nav.text()).toContain('Projekter');
      expect(wrapper.find(`.${BASE}__topbar-content`).text()).toContain(
        'Overblik',
      );
      const main = wrapper.find('main');
      expect(main.attributes('id')).toBe('main');
      expect(main.text()).toContain('Skærm-indhold');
    });

    it('renders a skip link to the main region', async () => {
      stubMatchMedia(false);
      const wrapper = await mountShell();
      // GTSkipLink renders an anchor to #main
      expect(wrapper.html()).toContain('#main');
    });

    it('shows no hamburger on desktop', async () => {
      stubMatchMedia(false);
      const wrapper = await mountShell();
      expect(wrapper.find(`.${BASE}__hamburger`).exists()).toBe(false);
    });

    it('applies the collapsed modifier only on desktop', async () => {
      stubMatchMedia(false);
      const wrapper = await mountShell({ collapsed: true });
      expect(wrapper.classes()).toContain(`${BASE}--collapsed`);
    });

    it('exposes collapsed + toggleCollapsed to the sidebar slot', async () => {
      stubMatchMedia(false);
      const wrapper = mount(AppShell, {
        props: { toasts: false, collapsed: false },
        slots: {
          sidebar: `<template #sidebar="{ collapsed, toggleCollapsed }">
            <button class="collapse-btn" :data-collapsed="collapsed" @click="toggleCollapsed">x</button>
          </template>`,
        },
        global: { stubs: { Teleport: true } },
      });
      await flushPromises();
      const btn = wrapper.find('.collapse-btn');
      expect(btn.attributes('data-collapsed')).toBe('false');
      await btn.trigger('click');
      expect(wrapper.emitted('update:collapsed')![0]).toEqual([true]);
    });
  });

  describe('mobile (< breakpoint)', () => {
    it('moves the sidebar into a drawer with a hamburger toggle', async () => {
      stubMatchMedia(true);
      const wrapper = await mountShell();
      expect(wrapper.classes()).toContain(`${BASE}--mobile`);

      const burger = wrapper.find(`.${BASE}__hamburger`);
      expect(burger.exists()).toBe(true);
      expect(burger.attributes('aria-expanded')).toBe('false');
      const controls = burger.attributes('aria-controls');
      expect(controls).toBeTruthy();

      // No persistent sidebar aside on mobile.
      expect(wrapper.find(`.${BASE}__sidebar`).exists()).toBe(false);
    });

    it('opens the drawer + flips aria-expanded when the hamburger is clicked', async () => {
      stubMatchMedia(true);
      const wrapper = await mountShell();
      const burger = wrapper.find(`.${BASE}__hamburger`);
      await burger.trigger('click');
      expect(burger.attributes('aria-expanded')).toBe('true');
      // Drawer dialog now present, wrapping the nav landmark.
      const dialog = wrapper.find('[role="dialog"]');
      expect(dialog.exists()).toBe(true);
      expect(dialog.find('nav').attributes('aria-label')).toBe(
        'Hovednavigation',
      );
    });

    it('does not apply the collapsed modifier on mobile', async () => {
      stubMatchMedia(true);
      const wrapper = await mountShell({ collapsed: true });
      expect(wrapper.classes()).not.toContain(`${BASE}--collapsed`);
    });
  });
});

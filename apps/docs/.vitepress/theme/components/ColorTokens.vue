<script setup lang="ts">
  import { computed } from 'vue';
  import { defaultColorPreset, defaultColorPresetDark } from '@grundtone/core';

  type Category = 'brand' | 'status' | 'surface' | 'text' | 'border' | 'focus';

  const props = withDefaults(
    defineProps<{
      category: Category;
      mode?: 'light' | 'compare';
      showCssVar?: boolean;
    }>(),
    { mode: 'light', showCssVar: false },
  );

  const CATEGORIES: Record<Category, string[]> = {
    brand: [
      'primary',
      'primaryLight',
      'primaryDark',
      'onPrimary',
      'secondary',
      'secondaryLight',
      'secondaryDark',
    ],
    status: [
      'success',
      'successLight',
      'successDark',
      'warning',
      'warningLight',
      'warningDark',
      'error',
      'errorLight',
      'errorDark',
      'info',
      'infoLight',
      'infoDark',
    ],
    surface: [
      'background',
      'backgroundAlt',
      'surface',
      'surfaceAlt',
      'surfaceRaised',
      'surfaceOverlay',
      'modalBackdrop',
    ],
    text: [
      'text',
      'textSecondary',
      'textTertiary',
      'textInverse',
      'textPlaceholder',
      'textDisabled',
    ],
    border: ['borderLight', 'borderMedium', 'borderStrong', 'borderInverse'],
    focus: ['focus', 'focusRing', 'neutral'],
  };

  const PURPOSE: Record<string, string> = {
    primary: 'Primary brand color',
    primaryLight: 'Lighter shade (hover, tints)',
    primaryDark: 'Darker shade (active, pressed)',
    onPrimary: 'Text on primary background',
    secondary: 'Secondary brand color',
    secondaryLight: 'Lighter secondary shade',
    secondaryDark: 'Darker secondary shade',
    success: 'Success state',
    successLight: 'Success background tint',
    successDark: 'Darker success shade',
    warning: 'Warning state',
    warningLight: 'Warning background tint',
    warningDark: 'Darker warning shade',
    error: 'Error state',
    errorLight: 'Error background tint',
    errorDark: 'Darker error shade',
    info: 'Info state',
    infoLight: 'Info background tint',
    infoDark: 'Darker info shade',
    background: 'Page background',
    backgroundAlt: 'Alternate sections, zebra rows',
    surface: 'Cards, panels',
    surfaceAlt: 'Hover state, zebra',
    surfaceRaised: 'Modals, FABs',
    surfaceOverlay: 'Semi-transparent overlay',
    modalBackdrop: 'Modal backdrop scrim',
    text: 'Primary text',
    textSecondary: 'Secondary text',
    textTertiary: 'Tertiary / hint text',
    textInverse: 'Text on dark backgrounds',
    textPlaceholder: 'Input placeholders',
    textDisabled: 'Disabled elements',
    borderLight: 'Subtle dividers',
    borderMedium: 'Default inputs',
    borderStrong: 'Focus, emphasized',
    borderInverse: 'On dark backgrounds',
    focus: 'Focus indicator',
    focusRing: 'Focus ring shadow',
    neutral: 'Neutral UI elements',
  };

  function toKebab(str: string): string {
    return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
  }

  const light = defaultColorPreset as Record<string, string>;
  const dark = defaultColorPresetDark as Record<string, string>;

  const keys = computed(() => CATEGORIES[props.category] ?? []);
</script>

<template>
  <div class="color-token-table">
    <table v-if="mode === 'light'">
      <thead>
        <tr>
          <th>Color</th>
          <th>Token</th>
          <th v-if="showCssVar">CSS Variable</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in keys" :key="key">
          <td class="color-token-color">
            <span
              class="color-token-swatch"
              :style="{ '--swatch': light[key] }"
              :data-color="light[key]"
            />
            <code>{{ light[key] }}</code>
          </td>
          <td>{{ key }}</td>
          <td v-if="showCssVar">
            <code>--color-{{ toKebab(key) }}</code>
          </td>
          <td>{{ PURPOSE[key] ?? '' }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else>
      <thead>
        <tr>
          <th>Color</th>
          <th>Token</th>
          <th>Light</th>
          <th>Dark</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in keys" :key="key">
          <td class="color-token-color">
            <span
              class="color-token-swatch"
              :style="{ '--swatch': light[key] }"
              :data-color="light[key]"
            />
            <code>{{ light[key] }}</code>
          </td>
          <td>{{ key }}</td>
          <td class="color-token-color">
            <span
              class="color-token-swatch"
              :style="{ '--swatch': light[key] }"
              :data-color="light[key]"
            />
            <code>{{ light[key] }}</code>
          </td>
          <td class="color-token-color">
            <span
              class="color-token-swatch"
              :style="{ '--swatch': dark[key] }"
              :data-color="dark[key]"
            />
            <code>{{ dark[key] }}</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

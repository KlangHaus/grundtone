<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { StepperProps } from './types';

  const props = withDefaults(defineProps<StepperProps>(), {
    activeStep: 0,
    allClickable: false,
    simple: false,
    simpleLabel: 'Trin {current} af {total}',
  });

  const emit = defineEmits<{
    'update:activeStep': [index: number];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-stepper`);

  const simpleText = computed(() =>
    props.simpleLabel
      .replace('{current}', String(props.activeStep + 1))
      .replace('{total}', String(props.steps.length)),
  );

  function isCompleted(index: number): boolean {
    return index < props.activeStep;
  }

  function isClickable(index: number): boolean {
    if (props.allClickable) return true;
    return isCompleted(index);
  }

  function handleClick(index: number) {
    if (!isClickable(index) && index !== props.activeStep) return;
    emit('update:activeStep', index);
  }
</script>

<template>
  <!-- Simple variant -->
  <p v-if="simple" :class="[base, `${base}--simple`]">
    {{ simpleText }}
  </p>

  <!-- Full stepper -->
  <ol v-else :class="base" role="list">
    <li
      v-for="(step, i) in steps"
      :key="i"
      :class="[
        `${base}__step`,
        {
          [`${base}__step--active`]: i === activeStep,
          [`${base}__step--completed`]: isCompleted(i) && !step.error,
          [`${base}__step--error`]: step.error,
          [`${base}__step--clickable`]: isClickable(i),
          [`${base}__step--disabled`]: !isClickable(i) && i !== activeStep,
        },
      ]"
      :aria-current="i === activeStep ? 'step' : undefined"
      @click="handleClick(i)"
    >
      <span :class="`${base}__dot`" />
      <span :class="`${base}__label`">{{ step.label }}</span>
      <span v-if="step.info" :class="`${base}__info`">{{ step.info }}</span>
    </li>
  </ol>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-stepper {
    display: flex;
    align-items: flex-start;
    list-style: none !important;
    padding: 0;
    margin: 0;

    &__step {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      text-align: center;
      list-style: none;
      padding: 0;

      &::before,
      &::marker {
        content: none;
      }
    }

    // Connecting line — spans from previous dot center to this dot center
    &__step + &__step::after {
      content: '';
      position: absolute;
      top: calc(0.75rem - 1px); // vertically center on dot (1.5rem / 2)
      left: calc(-50% + 0.75rem); // start at previous dot center
      right: calc(50% + 0.75rem); // end at this dot center
      height: 2px;
      background: tokens.color('border-medium');
      z-index: 0;
    }

    &__step--completed + &__step::after {
      background: tokens.color('primary');
    }

    // Dot
    &__dot {
      position: relative;
      z-index: 1;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: tokens.radius('full');
      border: 2px solid tokens.color('border-medium');
      background: tokens.color('background');
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        border-color tokens.duration('fast') tokens.ease('ease'),
        background-color tokens.duration('fast') tokens.ease('ease');
      flex-shrink: 0;
    }

    // Active
    &__step--active &__dot {
      border-color: tokens.color('primary');

      &::after {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: tokens.radius('full');
        background: tokens.color('primary');
      }
    }

    // Completed
    &__step--completed &__dot {
      border-color: tokens.color('primary');
      background: tokens.color('primary');

      &::after {
        content: '';
        width: 0.5rem;
        height: 0.3rem;
        border-left: 2px solid tokens.color('background');
        border-bottom: 2px solid tokens.color('background');
        transform: rotate(-45deg) translateY(-0.0625rem);
      }
    }

    // Error — must reset completed checkmark styles
    &__step--error &__dot {
      border-color: tokens.color('error');
      background: tokens.color('error');

      &::after {
        content: '×';
        color: tokens.color('background');
        font-size: tokens.font-size('xs');
        font-weight: tokens.font-weight('bold');
        line-height: 1;
        // Reset any checkmark styles
        width: auto;
        height: auto;
        border: none;
        border-radius: 0;
        transform: none;
      }
    }

    // Clickable
    &__step--clickable {
      cursor: pointer;

      &:hover .#{$prefix}-stepper__dot {
        border-color: tokens.color('primary');
      }
    }

    &__step--disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    // Label
    &__label {
      margin-top: tokens.space('xs');
      font-size: tokens.font-size('xs');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text-secondary');
      line-height: tokens.line-height('normal');
    }

    &__step--active &__label {
      color: tokens.color('text');
      font-weight: tokens.font-weight('semibold');
    }

    &__step--error &__label {
      color: tokens.color('error');
    }

    // Info
    &__info {
      font-size: tokens.font-size('xs');
      color: tokens.color('text-secondary');
      margin-top: tokens.space('xs');
    }

    // Simple
    &--simple {
      display: block;
      font-size: tokens.font-size('sm');
      color: tokens.color('text-secondary');
      font-weight: tokens.font-weight('medium');
    }
  }
</style>

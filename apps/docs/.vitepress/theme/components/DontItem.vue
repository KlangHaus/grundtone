<template>
  <div class="dos-donts-item dos-donts-item--dont">
    <div class="dos-donts-item__header">
      <span class="dos-donts-item__icon">✗</span>
      <span class="dos-donts-item__label">Don't</span>
    </div>
    <div class="dos-donts-item__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .dos-donts-item--dont {
    border-left: 3px solid var(--color-error, #dc2626);
    background: color-mix(in srgb, var(--color-error, #dc2626) 6%, transparent);
  }

  .dos-donts-item--dont .dos-donts-item__icon {
    color: var(--color-error, #dc2626);
  }

  .dos-donts-item--dont .dos-donts-item__label {
    color: var(--color-error, #dc2626);
  }
</style>

<script setup lang="ts">
  import { GTButton } from '../../atoms/Button';
  import GTToastContainer from './ToastContainer.vue';
  import { useToast } from '../../composables/useToast';

  const toast = useToast();
</script>

<template>
  <div class="gt-demo">
    <GTToastContainer position="bottom-right" />

    <section class="gt-demo__section">
      <h3>Variants</h3>
      <div class="flex flex-wrap gap-2">
        <GTButton
          size="sm"
          variant="primary"
          @click="toast.success('Din ansøgning er afsendt', { icon: 'check' })"
        >
          Success
        </GTButton>
        <GTButton
          size="sm"
          variant="secondary"
          @click="
            toast.warning('Dette er en advarsel', {
              description: 'Sed ut perspiciatis unde omnis iste natus error.',
            })
          "
        >
          Warning
        </GTButton>
        <GTButton
          size="sm"
          variant="negative"
          @click="toast.error('Der opstod en fejl')"
        >
          Error
        </GTButton>
        <GTButton
          size="sm"
          @click="
            toast.info('Du har fået en besked', {
              description: 'Yderligere detaljer her.',
            })
          "
        >
          Info
        </GTButton>
        <GTButton
          size="sm"
          variant="outlined"
          @click="toast('Dine ændringer er blevet gemt')"
        >
          Default
        </GTButton>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Persistent (no auto-hide)</h3>
      <GTButton
        size="sm"
        @click="toast.error('Kritisk fejl', { duration: 0, icon: 'close' })"
      >
        Persistent error
      </GTButton>
    </section>
  </div>
</template>

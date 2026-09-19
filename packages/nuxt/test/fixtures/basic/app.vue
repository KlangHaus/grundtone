<script setup lang="ts">
  // The consumer pattern the module has to support: the composable comes from
  // the package ENTRY, the container is auto-imported by the module. If those
  // are two module instances, the container renders nothing and no error is
  // raised (riff zh3ayeik).
  import { useToast } from '@grundtone/vue';

  const toast = useToast();
  toast.success('toast from the package entry');
</script>

<template>
  <div>
    <GTToastContainer />
  </div>
</template>

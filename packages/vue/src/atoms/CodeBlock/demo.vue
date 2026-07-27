<script setup lang="ts">
  import GTCodeBlock from './CodeBlock.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Install-snippet</h3>
      <GTCodeBlock
        label="Install"
        code="pnpm add @grundtone/vue @grundtone/design-system"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Token-JSON (uden kopier)</h3>
      <GTCodeBlock
        language="json"
        :copyable="false"
        :code="'{\n  &quot;colors&quot;: {\n    &quot;primary&quot;: &quot;#0059b3&quot;\n  }\n}'"
      />
    </section>
  </div>
</template>

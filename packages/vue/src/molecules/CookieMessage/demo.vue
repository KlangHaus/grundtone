<script setup lang="ts">
  import { ref } from 'vue';
  import GTCookieMessage from './CookieMessage.vue';
  import { GTToggle } from '../../atoms/Toggle';

  const showBasic = ref(true);
  const showFull = ref(true);
  const showSettings = ref(true);
  const statsEnabled = ref(false);
  const marketingEnabled = ref(false);

  function resetBasic() {
    showBasic.value = true;
  }
  function resetFull() {
    showFull.value = true;
  }
  function resetSettings() {
    showSettings.value = true;
    statsEnabled.value = false;
    marketingEnabled.value = false;
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic (static)</h3>
      <GTCookieMessage
        v-if="showBasic"
        heading="Vi bruger cookies"
        :persistent="false"
        @accept="showBasic = false"
      >
        <p>
          Vi bruger cookies til at forbedre din oplevelse.
          <a href="#">Læs mere om cookies</a>.
        </p>
      </GTCookieMessage>
      <button v-else type="button" @click="resetBasic">Vis igen</button>
    </section>

    <section class="gt-demo__section">
      <h3>With reject &amp; settings (static)</h3>
      <GTCookieMessage
        v-if="showFull"
        heading="Cookies på dette site"
        reject-label="Afvis alle"
        settings-label="Cookie-indstillinger"
        :persistent="false"
        @accept="showFull = false"
        @reject="showFull = false"
      >
        <p>
          Vi bruger cookies til statistik og personalisering. Du kan til enhver
          tid ændre dine præferencer.
        </p>
      </GTCookieMessage>
      <button v-else type="button" @click="resetFull">Vis igen</button>
    </section>

    <section class="gt-demo__section">
      <h3>With inline settings panel (static)</h3>
      <GTCookieMessage
        v-if="showSettings"
        heading="Cookies på dette site"
        settings-label="Cookie-indstillinger"
        :persistent="false"
        @accept="showSettings = false"
      >
        <p>Vælg hvilke typer cookies du vil acceptere.</p>
        <template #settings>
          <div class="flex flex-col gap-2">
            <GTToggle v-model="statsEnabled" label="Statistik" />
            <GTToggle v-model="marketingEnabled" label="Marketing" />
          </div>
        </template>
      </GTCookieMessage>
      <button v-else type="button" @click="resetSettings">Vis igen</button>
    </section>

    <section class="gt-demo__section">
      <h3>With icon (static)</h3>
      <GTCookieMessage heading="Cookies" icon="check" :persistent="false">
        <p>Vi bruger kun funktionelt nødvendige cookies.</p>
      </GTCookieMessage>
    </section>
  </div>
</template>

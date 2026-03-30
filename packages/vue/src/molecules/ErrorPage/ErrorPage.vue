<script setup lang="ts">
  import { computed } from 'vue';
  import type { ErrorPageProps } from './types';

  const props = withDefaults(defineProps<ErrorPageProps>(), {
    code: 404,
    title: undefined,
    description: undefined,
    showHomeLink: true,
    homeHref: '/',
    homeLabel: 'Gå til forsiden',
    debug: undefined,
  });

  const defaults: Record<number, { title: string; description: string }> = {
    400: {
      title: 'Forkert takt',
      description:
        'Forespørgslen kunne ikke forstås. Tjek at adressen er korrekt.',
    },
    403: {
      title: 'Øverummet er lukket',
      description: 'Du har ikke adgang til denne side.',
    },
    404: {
      title: 'Denne side spiller ikke',
      description:
        'Vi kunne ikke finde den node, du ledte efter. Den er måske blevet flyttet eller slettet.',
    },
    500: {
      title: 'Noget gik galt i orkestret',
      description:
        'En uventet fejl opstod. Vi arbejder på at stemme instrumenterne.',
    },
    502: {
      title: 'Dirigenten svarer ikke',
      description: 'Serveren modtog et ugyldigt svar. Prøv igen om et øjeblik.',
    },
    503: {
      title: 'Vi stemmer instrumenterne',
      description: 'Siden er midlertidigt utilgængelig. Prøv igen om lidt.',
    },
  };

  const fallback = {
    title: 'En uventet fejl',
    description: 'Noget gik galt. Prøv igen eller gå til forsiden.',
  };

  const resolvedTitle = computed(
    () => props.title ?? defaults[props.code]?.title ?? fallback.title,
  );
  const resolvedDescription = computed(
    () =>
      props.description ??
      defaults[props.code]?.description ??
      fallback.description,
  );

  // Determine illustration type from code range
  const illustrationType = computed(() => {
    if (props.code === 403) return 'locked';
    if (props.code === 503) return 'pause';
    if (props.code >= 500) return 'broken';
    return 'missing'; // 4xx
  });
</script>

<template>
  <div class="error-page">
    <!-- Illustration -->
    <div class="error-page__illustration">
      <slot name="illustration">
        <!-- Staff lines with musical metaphor -->
        <svg
          viewBox="0 0 240 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          :aria-label="`Fejl ${code}`"
        >
          <!-- Five staff lines -->
          <line
            v-for="i in 5"
            :key="`line-${i}`"
            x1="20"
            :y1="30 + (i - 1) * 16"
            x2="220"
            :y2="30 + (i - 1) * 16"
            stroke="currentColor"
            :stroke-width="illustrationType === 'broken' ? 1.5 : 1"
            :stroke-dasharray="illustrationType === 'broken' ? '6 4' : 'none'"
            stroke-opacity="0.3"
          />

          <!-- 404: Missing note with question mark -->
          <template v-if="illustrationType === 'missing'">
            <!-- Ghost note outline (dashed) -->
            <ellipse
              cx="120"
              cy="70"
              rx="12"
              ry="9"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 3"
              fill="none"
              opacity="0.4"
            />
            <!-- Question mark -->
            <text
              x="120"
              y="76"
              text-anchor="middle"
              fill="currentColor"
              font-size="16"
              font-weight="600"
              opacity="0.6"
            >
              ?
            </text>
            <!-- Stem hint -->
            <line
              x1="132"
              y1="70"
              x2="132"
              y2="36"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 3"
              opacity="0.3"
            />
            <!-- Decorative notes (faded, correct ones) -->
            <ellipse
              cx="60"
              cy="62"
              rx="8"
              ry="6"
              fill="currentColor"
              opacity="0.15"
            />
            <line
              x1="68"
              y1="62"
              x2="68"
              y2="34"
              stroke="currentColor"
              stroke-width="1.5"
              opacity="0.15"
            />
            <ellipse
              cx="180"
              cy="78"
              rx="8"
              ry="6"
              fill="currentColor"
              opacity="0.15"
            />
            <line
              x1="188"
              y1="78"
              x2="188"
              y2="50"
              stroke="currentColor"
              stroke-width="1.5"
              opacity="0.15"
            />
          </template>

          <!-- 500: Broken/wavy lines, dissonance -->
          <template v-if="illustrationType === 'broken'">
            <!-- Zigzag crack across staff -->
            <path
              d="M 90 30 L 100 55 L 110 40 L 120 65 L 130 45 L 140 70 L 150 50"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              opacity="0.5"
              stroke-linecap="round"
            />
            <!-- Scattered notes (fallen) -->
            <ellipse
              cx="80"
              cy="100"
              rx="7"
              ry="5"
              fill="currentColor"
              opacity="0.2"
              transform="rotate(-20 80 100)"
            />
            <ellipse
              cx="155"
              cy="105"
              rx="7"
              ry="5"
              fill="currentColor"
              opacity="0.2"
              transform="rotate(15 155 105)"
            />
            <text
              x="120"
              y="120"
              text-anchor="middle"
              fill="currentColor"
              font-size="11"
              opacity="0.35"
            >
              ♯ ♭
            </text>
          </template>

          <!-- 403: Lock on staff -->
          <template v-if="illustrationType === 'locked'">
            <!-- Lock body -->
            <rect
              x="106"
              y="62"
              width="28"
              height="22"
              rx="4"
              fill="currentColor"
              opacity="0.25"
            />
            <!-- Lock shackle -->
            <path
              d="M 112 62 V 52 a 8 8 0 0 1 16 0 V 62"
              stroke="currentColor"
              stroke-width="2.5"
              fill="none"
              opacity="0.35"
              stroke-linecap="round"
            />
            <!-- Keyhole -->
            <circle cx="120" cy="72" r="3" fill="currentColor" opacity="0.4" />
            <!-- Faded notes behind lock -->
            <ellipse
              cx="65"
              cy="62"
              rx="8"
              ry="6"
              fill="currentColor"
              opacity="0.1"
            />
            <ellipse
              cx="175"
              cy="70"
              rx="8"
              ry="6"
              fill="currentColor"
              opacity="0.1"
            />
          </template>

          <!-- 503: Pause symbol -->
          <template v-if="illustrationType === 'pause'">
            <!-- Fermata/pause: thick bar + dot -->
            <rect
              x="108"
              y="50"
              width="24"
              height="6"
              rx="1"
              fill="currentColor"
              opacity="0.35"
            />
            <rect
              x="108"
              y="60"
              width="24"
              height="6"
              rx="1"
              fill="currentColor"
              opacity="0.35"
            />
            <!-- Decorative: resting notes -->
            <text
              x="70"
              y="90"
              fill="currentColor"
              font-size="18"
              opacity="0.2"
            >
              𝄾
            </text>
            <text
              x="170"
              y="90"
              fill="currentColor"
              font-size="18"
              opacity="0.2"
            >
              𝄾
            </text>
          </template>

          <!-- Bottom decorative: thin line -->
          <line
            x1="60"
            y1="130"
            x2="180"
            y2="130"
            stroke="currentColor"
            stroke-width="0.5"
            opacity="0.15"
          />
        </svg>
      </slot>
    </div>

    <!-- Code -->
    <div class="error-page__code">{{ code }}</div>

    <!-- Title -->
    <h1 class="error-page__title">{{ resolvedTitle }}</h1>

    <!-- Description -->
    <p class="error-page__description">{{ resolvedDescription }}</p>

    <!-- Actions -->
    <div v-if="showHomeLink || $slots.actions" class="error-page__actions">
      <slot name="actions">
        <a :href="homeHref" class="gt-btn gt-btn--primary gt-btn--md">
          {{ homeLabel }}
        </a>
      </slot>
    </div>

    <!-- Extra content -->
    <slot />

    <!-- Debug info -->
    <div v-if="debug" class="error-page__debug">
      <template v-if="debug.url"
        ><strong>URL:</strong> {{ debug.url }}
      </template>
      <template v-if="debug.statusCode"
        ><strong>Status:</strong> {{ debug.statusCode }}
      </template>
      <template v-if="debug.message"
        ><strong>Message:</strong> {{ debug.message }}
      </template>
      <template v-if="debug.stack"
        ><strong>Stack:</strong> {{ debug.stack }}</template
      >
    </div>
  </div>
</template>

<style lang="scss">
  // Styles provided by design system (_error-page.scss)
</style>

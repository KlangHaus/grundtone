import { ref, watch, type Ref } from 'vue';

export type DawaType = 'adresse' | 'adgangsadresse' | 'vejnavn' | 'postnummer';

export interface DawaResult {
  /** Display text for the suggestion */
  text: string;
  /** Full suggestion text with formatting */
  forslagstekst: string;
  /** Type of result */
  type: string;
  /** Raw DAWA data object */
  data: Record<string, unknown>;
}

export interface UseDawaAutocompleteOptions {
  /** DAWA result type */
  type?: DawaType;
  /** Minimum characters before searching */
  minChars?: number;
  /** Debounce delay in ms */
  debounce?: number;
  /** Max results to return */
  maxResults?: number;
}

export interface UseDawaAutocompleteReturn {
  query: Ref<string>;
  results: Ref<DawaResult[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  search: (q: string) => void;
  clear: () => void;
}

const DAWA_API = 'https://api.dataforsyningen.dk/autocomplete';

/**
 * Composable for DAWA (Danish Address Web API) autocomplete.
 *
 * @example
 * const { query, results, loading } = useDawaAutocomplete({ type: 'adresse' });
 * watch(query, (q) => search(q));
 */
export function useDawaAutocomplete(
  options: UseDawaAutocompleteOptions = {},
): UseDawaAutocompleteReturn {
  const {
    type = 'adresse',
    minChars = 2,
    debounce: debounceMs = 250,
    maxResults = 10,
  } = options;

  const query = ref('');
  const results = ref<DawaResult[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  let abortController: AbortController | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  async function fetchResults(q: string) {
    // Cancel previous request
    abortController?.abort();
    abortController = new AbortController();

    if (q.length < minChars) {
      results.value = [];
      loading.value = false;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams({
        q,
        type,
        per_side: String(maxResults),
      });
      const response = await fetch(`${DAWA_API}?${params}`, {
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error(`DAWA API error: ${response.status}`);

      const data = await response.json();
      results.value = data.map(
        (item: {
          tekst: string;
          forslagstekst: string;
          type: string;
          data: Record<string, unknown>;
        }) => ({
          text: item.tekst,
          forslagstekst: item.forslagstekst,
          type: item.type,
          data: item.data,
        }),
      );
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        error.value = (err as Error).message;
        results.value = [];
      }
    } finally {
      loading.value = false;
    }
  }

  function search(q: string) {
    query.value = q;
  }

  function clear() {
    query.value = '';
    results.value = [];
    loading.value = false;
    error.value = null;
  }

  // Debounced watch on query
  watch(query, q => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (q.length < minChars) {
      results.value = [];
      return;
    }
    debounceTimer = setTimeout(() => fetchResults(q), debounceMs);
  });

  return { query, results, loading, error, search, clear };
}

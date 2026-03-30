import { useState, useRef, useCallback } from 'react';

export type DawaType = 'adresse' | 'adgangsadresse' | 'vejnavn' | 'postnummer';

export interface DawaResult {
  text: string;
  forslagstekst: string;
  type: string;
  data: Record<string, unknown>;
}

export interface UseDawaAutocompleteOptions {
  type?: DawaType;
  minChars?: number;
  debounce?: number;
  maxResults?: number;
}

const DAWA_API = 'https://api.dataforsyningen.dk/autocomplete';

/**
 * Hook for DAWA (Danish Address Web API) autocomplete.
 */
export function useDawaAutocomplete(options: UseDawaAutocompleteOptions = {}) {
  const {
    type = 'adresse',
    minChars = 2,
    debounce: debounceMs = 250,
    maxResults = 10,
  } = options;

  const [results, setResults] = useState<DawaResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(
    (q: string) => {
      // Clear pending
      if (timerRef.current) clearTimeout(timerRef.current);
      abortRef.current?.abort();

      if (q.length < minChars) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      timerRef.current = setTimeout(async () => {
        abortRef.current = new AbortController();
        try {
          const params = new URLSearchParams({
            q,
            type,
            per_side: String(maxResults),
          });
          const response = await fetch(`${DAWA_API}?${params}`, {
            signal: abortRef.current.signal,
          });
          if (!response.ok)
            throw new Error(`DAWA API error: ${response.status}`);

          const data = await response.json();
          setResults(
            data.map(
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
            ),
          );
          setError(null);
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            setError((err as Error).message);
            setResults([]);
          }
        } finally {
          setLoading(false);
        }
      }, debounceMs);
    },
    [type, minChars, debounceMs, maxResults],
  );

  const clear = useCallback(() => {
    setResults([]);
    setLoading(false);
    setError(null);
    abortRef.current?.abort();
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return { results, loading, error, search, clear };
}

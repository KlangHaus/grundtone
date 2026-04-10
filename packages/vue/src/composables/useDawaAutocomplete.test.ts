import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { nextTick } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { useDawaAutocomplete } from './useDawaAutocomplete';

// Helper: advance fake timers and flush all pending microtasks/promises
async function tick(ms: number) {
  await vi.advanceTimersByTimeAsync(ms);
  await flushPromises();
}

const sampleResponse = [
  {
    tekst: 'Eksempelvej 1, 6000 Kolding',
    forslagstekst: 'Eksempelvej 1, 6000 Kolding',
    type: 'adresse',
    data: { id: 'abc', vejnavn: 'Eksempelvej' },
  },
  {
    tekst: 'Eksempelvej 2, 6000 Kolding',
    forslagstekst: 'Eksempelvej 2, 6000 Kolding',
    type: 'adresse',
    data: { id: 'def', vejnavn: 'Eksempelvej' },
  },
];

describe('useDawaAutocomplete', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => sampleResponse,
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns expected refs and functions', () => {
    const api = useDawaAutocomplete();
    expect(api.query.value).toBe('');
    expect(api.results.value).toEqual([]);
    expect(api.loading.value).toBe(false);
    expect(api.error.value).toBeNull();
    expect(typeof api.search).toBe('function');
    expect(typeof api.clear).toBe('function');
  });

  it('does nothing when query is shorter than minChars', async () => {
    const { query, results } = useDawaAutocomplete({ minChars: 3 });
    query.value = 'ab';
    await nextTick();
    await tick(500);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(results.value).toEqual([]);
  });

  it('fetches results after debounce', async () => {
    const { query, results, loading } = useDawaAutocomplete({ debounce: 250 });
    query.value = 'Eksempel';
    await nextTick();

    // Not called yet (debounced)
    expect(fetchMock).not.toHaveBeenCalled();

    await tick(250);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(results.value).toHaveLength(2);
    expect(results.value[0].text).toBe('Eksempelvej 1, 6000 Kolding');
    expect(results.value[0].data.id).toBe('abc');
    expect(loading.value).toBe(false);
  });

  it('passes type and maxResults to API', async () => {
    const { query } = useDawaAutocomplete({
      type: 'vejnavn',
      maxResults: 5,
      debounce: 100,
    });
    query.value = 'Eksempel';
    await nextTick();
    await tick(100);

    expect(fetchMock).toHaveBeenCalled();
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('type=vejnavn');
    expect(url).toContain('per_side=5');
    expect(url).toContain('q=Eksempel');
  });

  it('debounces rapid query changes', async () => {
    const { query } = useDawaAutocomplete({ debounce: 250 });
    query.value = 'Ek';
    await nextTick();
    await tick(100);
    query.value = 'Eks';
    await nextTick();
    await tick(100);
    query.value = 'Ekse';
    await nextTick();
    await tick(250);

    expect(fetchMock).toHaveBeenCalledOnce();
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('q=Ekse');
  });

  it('handles API error response', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });
    const { query, error, results } = useDawaAutocomplete({ debounce: 100 });
    query.value = 'Test';
    await nextTick();
    await tick(100);

    expect(error.value).not.toBeNull();
    expect(error.value).toContain('500');
    expect(results.value).toEqual([]);
  });

  it('ignores AbortError', async () => {
    const abortErr = new Error('aborted');
    abortErr.name = 'AbortError';
    fetchMock.mockRejectedValueOnce(abortErr);
    const { query, error } = useDawaAutocomplete({ debounce: 100 });
    query.value = 'Test';
    await nextTick();
    await tick(100);

    expect(fetchMock).toHaveBeenCalled();
    expect(error.value).toBeNull();
  });

  it('clear resets state', async () => {
    const { query, results, error, loading, clear } = useDawaAutocomplete({
      debounce: 100,
    });
    query.value = 'Test';
    await nextTick();
    await tick(100);

    expect(results.value.length).toBeGreaterThan(0);

    clear();
    expect(query.value).toBe('');
    expect(results.value).toEqual([]);
    expect(error.value).toBeNull();
    expect(loading.value).toBe(false);
  });

  it('search updates query', () => {
    const { query, search } = useDawaAutocomplete();
    search('Hello');
    expect(query.value).toBe('Hello');
  });

  it('clears results when query drops below minChars', async () => {
    const { query, results } = useDawaAutocomplete({
      debounce: 100,
      minChars: 2,
    });
    query.value = 'Test';
    await nextTick();
    await tick(100);

    expect(results.value.length).toBeGreaterThan(0);

    query.value = 'T';
    await nextTick();
    expect(results.value).toEqual([]);
  });

  it('defaults type to adresse', async () => {
    const { query } = useDawaAutocomplete({ debounce: 100 });
    query.value = 'Test';
    await nextTick();
    await tick(100);

    expect(fetchMock).toHaveBeenCalled();
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('type=adresse');
  });
});

/**
 * Shared bookkeeping for the space the bar reserves at the bottom of the page.
 *
 * 🔴 This lives in its own module for a reason that is easy to get wrong: the
 * top level of a `<script setup>` block IS the setup function, so a `Map`
 * declared there is created once PER INSTANCE, not once per module. A first
 * attempt at this fix did exactly that and looked shared while being nothing of
 * the sort.
 *
 * The reservation itself is a single custom property on `document.body`, so it
 * has to be reconciled between instances rather than overwritten: releasing it
 * on one bar's unmount used to strip it from every other bar too — including
 * one still on screen, whose last row then slid underneath it.
 */
const CUSTOM_PROPERTY = '--gt-bulk-action-bar-space';

const reservations = new Map<symbol, number>();

function commit(): void {
  if (typeof document === 'undefined') return;
  // The largest requirement wins: any bar still on screen must stay clear of
  // the page content, and the tallest one bounds them all.
  let largest = 0;
  for (const value of reservations.values()) largest = Math.max(largest, value);
  document.body.style.setProperty(CUSTOM_PROPERTY, `${largest}px`);
}

/** Reserve `height` pixels for `id`, replacing any previous claim it held. */
export function reserveSpace(id: symbol, height: number): void {
  reservations.set(id, height);
  commit();
}

/** Drop `id`'s claim. The property only returns to 0 when the last one goes. */
export function releaseSpace(id: symbol): void {
  reservations.delete(id);
  commit();
}

/** Number of instances currently holding a reservation. Exposed for tests. */
export function reservationCount(): number {
  return reservations.size;
}

/**
 * Drop every claim. TESTS ONLY.
 *
 * Module state outlives a single test case, so a wrapper left mounted by an
 * earlier test keeps its reservation and the next one measures the leftover.
 * That is the same failure mode as an environment variable leaking between
 * tests: a case that passes because of what ran before it is indistinguishable
 * from one that passes on its own.
 */
export function resetReservations(): void {
  reservations.clear();
  commit();
}

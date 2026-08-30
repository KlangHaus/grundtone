import { describe, it, expect, beforeEach } from 'vitest';
import {
  releaseSpace,
  reservationCount,
  reserveSpace,
  resetReservations,
} from './reserved-space';

// The bar's own tests cover it through the component. These cover the
// reconciliation rules per rule — mutation testing showed that "largest wins"
// was indistinguishable from "last wins" when only exercised through mounting,
// because the test DOM gives every element the same stubbed height.

const reserved = () =>
  document.body.style.getPropertyValue('--gt-bulk-action-bar-space');
const a = Symbol('a');
const b = Symbol('b');

beforeEach(() => resetReservations());

describe('reserved-space', () => {
  it('reserves nothing when no one has claimed', () => {
    expect(reserved()).toBe('0px');
    expect(reservationCount()).toBe(0);
  });

  it('reserves a single claim', () => {
    reserveSpace(a, 56);
    expect(reserved()).toBe('56px');
  });

  // 🔴 The largest claim wins, not the most recent one. Any bar still on screen
  // must clear the page content, and the tallest bounds them all — "last wins"
  // would leave the taller one overlapping the last row.
  it('reserves the LARGEST claim, not the last', () => {
    reserveSpace(a, 80);
    reserveSpace(b, 40);
    expect(reserved()).toBe('80px');
  });

  it('reserves the largest regardless of the order claims arrive', () => {
    reserveSpace(a, 40);
    reserveSpace(b, 80);
    expect(reserved()).toBe('80px');
  });

  // 🔴 The finding that started this: releasing one claim used to strip the
  // property for everyone, including a bar still on screen.
  it('keeps the remaining claim when one is released', () => {
    reserveSpace(a, 80);
    reserveSpace(b, 40);
    releaseSpace(a);
    expect(reserved()).toBe('40px');
    expect(reservationCount()).toBe(1);
  });

  it('returns to zero only when the last claim goes', () => {
    reserveSpace(a, 56);
    reserveSpace(b, 56);
    releaseSpace(a);
    expect(reserved()).toBe('56px');
    releaseSpace(b);
    expect(reserved()).toBe('0px');
  });

  it('replaces a claim rather than stacking it', () => {
    reserveSpace(a, 56);
    reserveSpace(a, 72);
    expect(reservationCount()).toBe(1);
    expect(reserved()).toBe('72px');
  });

  it('ignores a release from an id that never claimed', () => {
    reserveSpace(a, 56);
    releaseSpace(b);
    expect(reserved()).toBe('56px');
  });
});

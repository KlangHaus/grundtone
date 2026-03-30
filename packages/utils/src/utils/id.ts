let counter = 0;

/**
 * Generates a unique ID string for associating labels with form inputs.
 * Shared between Vue and React Native components.
 */
export function generateId(prefix = 'gt'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

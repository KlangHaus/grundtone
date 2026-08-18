export type HeroAlign = 'center' | 'left';
export type HeroBackground = 'none' | 'dot-grid' | 'gradient-mesh';

export interface HeroProps {
  /**
   * Main heading. Optional when the `title` slot is used (the slot enables
   * partial accent colouring via `<mark>`) — first consumer (#130) had to
   * write `title=""` to satisfy a prop the slot made dead. Provide one of
   * the two; with neither, the heading renders empty and unlabelled.
   */
  title?: string;
  /** Supporting text under the title */
  subtitle?: string;
  /** Horizontal alignment of the content */
  align?: HeroAlign;
  /** Token-driven background treatment rendered behind the content */
  background?: HeroBackground;
  /** Heading level: 1 on landing pages, 2 when the page already has an h1 */
  headingLevel?: 1 | 2;
}

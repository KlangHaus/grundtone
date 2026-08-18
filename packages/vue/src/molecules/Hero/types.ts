export type HeroAlign = 'center' | 'left';
export type HeroBackground = 'none' | 'dot-grid' | 'gradient-mesh';

export interface HeroProps {
  /** Main heading. Override with the `title` slot for partial accent colouring via `<mark>` */
  title: string;
  /** Supporting text under the title */
  subtitle?: string;
  /** Horizontal alignment of the content */
  align?: HeroAlign;
  /** Token-driven background treatment rendered behind the content */
  background?: HeroBackground;
  /** Heading level: 1 on landing pages, 2 when the page already has an h1 */
  headingLevel?: 1 | 2;
}

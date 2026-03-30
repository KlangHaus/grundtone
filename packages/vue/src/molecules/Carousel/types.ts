export interface CarouselProps {
  /** Active slide index (v-model) */
  modelValue?: number;
  /** Auto-advance slides */
  autoplay?: boolean;
  /** Autoplay interval in ms */
  interval?: number;
  /** Wrap around at ends */
  loop?: boolean;
  /** Fade transition instead of slide */
  fade?: boolean;
  /** Show prev/next buttons */
  showControls?: boolean;
  /** Show dot indicators */
  showIndicators?: boolean;
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
  /** Accessible label */
  ariaLabel?: string;
}

export interface CarouselSlideProps {
  /** Accessible label for slide */
  ariaLabel?: string;
}

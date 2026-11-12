export interface SliderProps {
  /** Current value — number for single, [min, max] for range */
  modelValue?: number | [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Enable dual-thumb range mode */
  range?: boolean;
  /** Slider orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  label?: string;
  /** Show current value display */
  showValue?: boolean;
  /** Accessible label for the lower thumb in range mode; receives `label` */
  minimumThumbLabel?: (label: string | undefined) => string;
  /** Accessible label for the upper thumb in range mode; receives `label` */
  maximumThumbLabel?: (label: string | undefined) => string;
}

export interface StepperStep {
  /** Step label */
  label: string;
  /** Extra information below label */
  info?: string;
  /** Error state on this step */
  error?: boolean;
}

export interface StepperProps {
  /** Steps configuration */
  steps: StepperStep[];
  /** Active step index (0-based, v-model) */
  activeStep?: number;
  /** Make all steps clickable (not just completed ones) */
  allClickable?: boolean;
  /** Simple variant: just "Trin X af Y" text */
  simple?: boolean;
  /** Label template for simple variant. Use {current} and {total} placeholders. */
  simpleLabel?: string;
}

export interface StepperStep {
  label: string;
  info?: string;
  error?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep?: number;
  allClickable?: boolean;
  onStepPress?: (index: number) => void;
}

export type TooltipPosition = 'top' | 'bottom';
export type TooltipTrigger = 'click' | 'hover';

export interface TooltipProps {
  /** Tooltip text content */
  content: string;
  /** Preferred position (auto-flips if no space) */
  position?: TooltipPosition;
  /** Trigger mode */
  trigger?: TooltipTrigger;
  /** Hover delay in ms (only for trigger="hover") */
  delay?: number;
}

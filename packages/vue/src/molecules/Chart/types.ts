export interface ChartConfigItem {
  /** Display label */
  label: string;
  /** CSS color value or custom property reference */
  color: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

export interface ChartContainerProps {
  /** Chart configuration — keys map to data series */
  config: ChartConfig;
  /** Accessible chart description */
  ariaLabel?: string;
}

export interface ChartLegendProps {
  /** Config keys to show in legend (defaults to all) */
  keys?: string[];
}

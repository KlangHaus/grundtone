export type TableVariant = 'default' | 'borderless' | 'zebra';
export type TableDensity = 'normal' | 'compact' | 'extra-compact';
export type SortDirection = 'asc' | 'desc';
/**
 * A named step of the breakpoint scale. `sm` is 40rem (640px), the default;
 * md 768px, lg 1024px, xl 1280px, 2xl 1536px.
 */
export type TableStackBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface TableColumn {
  /** Unique key matching the row data property */
  key: string;
  /** Column header label */
  label: string;
  /** Right-align numeric column */
  numeric?: boolean;
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Fixed width (CSS value) */
  width?: string;
}

export interface TableProps {
  /** Column definitions */
  columns: TableColumn[];
  /** Row data — array of objects keyed by column.key */
  rows: Record<string, unknown>[];
  /** Visual variant */
  variant?: TableVariant;
  /** Row density */
  density?: TableDensity;
  /** Stack rows on mobile */
  responsive?: boolean;
  /**
   * With `responsive`, stack rows below this breakpoint instead of the default
   * `sm` (40rem). Has no effect without `responsive`.
   */
  stackBelow?: TableStackBreakpoint;
  /** Enable row selection with checkboxes */
  selectable?: boolean;
  /** Selected row indices (v-model) */
  modelValue?: number[];
  /** Table caption (screen readers) */
  caption?: string;
  /** Show caption visually */
  captionVisible?: boolean;
  /** Currently sorted column key */
  sortBy?: string;
  /** Current sort direction */
  sortDirection?: SortDirection;
  /** Striped rows (shorthand for variant="zebra") */
  striped?: boolean;
}

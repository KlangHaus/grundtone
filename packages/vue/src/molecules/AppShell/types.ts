export interface AppShellProps {
  /** Sidebar inline size when expanded. */
  sidebarWidth?: string;
  /** Sidebar inline size when collapsed to an icon rail. */
  railWidth?: string;
  /**
   * Collapsed ↔ expanded (v-model:collapsed). Applies only at/above
   * `breakpoint`; below it the sidebar is a drawer and this is ignored. Seed
   * the initial value from the user's persisted preference in the parent.
   */
  collapsed?: boolean;
  /** Max-width media query below which the sidebar becomes a drawer. */
  breakpoint?: string;
  /** Accessible name for the sidebar `<nav>` landmark (and the mobile drawer). */
  navLabel?: string;
  /** id of the `<main>` content region — the skip-link target. */
  mainId?: string;
  /** Render a shared ToastContainer inside the shell. */
  toasts?: boolean;
}

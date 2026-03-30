export interface BackLinkProps {
  /** Link text (optional on RN — shows chevron icon alone if omitted) */
  label?: string;
  /** Navigation callback */
  onPress: () => void;
}

export interface SelectedFile {
  file: File;
  id: string;
}

export interface FileUploadProps {
  /** Visible label */
  label?: string;
  /** Help text (accepted formats, max size) */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Accepted MIME types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Max file size in bytes */
  maxSize?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** HTML id */
  id?: string;
}

//* Component Props
export interface PropPathPickerProps {
  disabled?: boolean;
  label: string;
  template?: string;
  value?: string;
  onChange?: (value: string) => void;
}

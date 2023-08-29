//* Variables
export type PropPathOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Component Props
export interface PropPathPickerProps {
  disabled?: boolean;
  label: string;
  template?: string;
  value?: string;
  onChange?: (value: string) => void;
}

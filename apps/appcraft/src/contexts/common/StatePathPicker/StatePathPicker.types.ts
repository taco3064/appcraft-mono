export interface StatePathPickerProps {
  disabled?: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;

  options: {
    primary: string;
    secondary?: string;
    value: string;
  }[];
}

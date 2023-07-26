export interface WidgetSelectProps {
  disabled?: boolean;
  exclude?: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
}

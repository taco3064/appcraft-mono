export interface WrapTodoSelectProps {
  disabled?: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onTodoView?: (id: string) => void;
}

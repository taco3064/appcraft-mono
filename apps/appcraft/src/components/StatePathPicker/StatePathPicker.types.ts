import type { MainWidget } from '@appcraft/types';

//* Component Props
export interface StatePathPickerProps {
  disabled?: boolean;
  label: string;
  states: Omit<MainWidget['state'], 'todos'>;
  value: string;
  onChange: (value: string) => void;
}

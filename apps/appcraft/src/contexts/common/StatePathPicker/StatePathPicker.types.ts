import type { MainWidget } from '@appcraft/types';

//* Variables
export type StatePathOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Component Props
export interface StatePathPickerProps {
  disabled?: boolean;
  label: string;
  states: Omit<MainWidget['state'], 'todos'>;
  value: string;
  onChange: (value: string) => void;
}

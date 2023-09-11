import type { OneOfProp } from '@appcraft/types';

export interface TodoSourceSelectProps {
  disabled?: boolean;
  label: string;
  options: OneOfProp['options'];
  value: string;
  onChange: (value: string) => void;
}

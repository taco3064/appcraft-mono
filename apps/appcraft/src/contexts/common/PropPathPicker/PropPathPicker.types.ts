import TextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';

//* Variables
export type PropPathOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Component Props
export interface PropPathPickerProps
  extends Omit<
    ComponentProps<typeof TextField>,
    | 'InputProps'
    | 'SelectProps'
    | 'children'
    | 'select'
    | 'defaultValue'
    | 'value'
    | 'onChange'
  > {
  template?: string;
  value?: string;
  onChange?: (value: string) => void;
}

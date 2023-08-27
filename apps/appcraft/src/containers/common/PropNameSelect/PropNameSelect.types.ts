import TextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';

//* Variables
export type PropNameOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Component Props
export interface PropNameSelectProps
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

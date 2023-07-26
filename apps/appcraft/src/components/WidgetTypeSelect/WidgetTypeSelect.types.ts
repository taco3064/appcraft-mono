import type { TextFieldProps } from '@mui/material/TextField';

export interface WidgetTypeSelectProps
  extends Omit<
    TextFieldProps,
    'SelectProps' | 'children' | 'select' | 'variant'
  > {
  variant: TextFieldProps['variant'];
}

import type { TextFieldProps } from '@mui/material/TextField';

export interface WidgetSelectProps
  extends Omit<
    TextFieldProps,
    'SelectProps' | 'children' | 'select' | 'variant'
  > {
  variant: TextFieldProps['variant'];
}

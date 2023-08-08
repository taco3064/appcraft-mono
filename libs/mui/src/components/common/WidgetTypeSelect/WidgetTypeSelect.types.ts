import type { TextFieldProps } from '@mui/material/TextField';
import type { FixedT } from '../../../contexts';

export interface WidgetTypeSelectProps
  extends Omit<
    TextFieldProps,
    'SelectProps' | 'children' | 'select' | 'variant'
  > {
  ct: FixedT;
  variant: TextFieldProps['variant'];
}

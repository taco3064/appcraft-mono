import Checkbox from '@mui/material/Checkbox';
import type { ComponentProps } from 'react';

export { Checkbox };

export type CheckboxProps = Pick<
  ComponentProps<typeof Checkbox>,
  | 'checked'
  | 'checkedIcon'
  | 'color'
  | 'defaultChecked'
  | 'disabled'
  | 'disableRipple'
  | 'icon'
  | 'indeterminate'
  | 'indeterminateIcon'
  | 'name'
  | 'onChange'
  | 'required'
  | 'size'
  | 'value'
>;

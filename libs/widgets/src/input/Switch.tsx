import Switch from '@mui/material/Switch';
import type { ComponentProps } from 'react';

export { Switch };

export type SwitchProps = Pick<
  ComponentProps<typeof Switch>,
  | 'checked'
  | 'checkedIcon'
  | 'color'
  | 'defaultChecked'
  | 'disabled'
  | 'disableRipple'
  | 'edge'
  | 'icon'
  | 'onChange'
  | 'required'
  | 'value'
>;
